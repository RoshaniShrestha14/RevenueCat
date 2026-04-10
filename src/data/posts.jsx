const posts = [
  {
    id: "kotlin-coroutine-bridge",
    title:
      "Kotlin Coroutine bridges: converting any callback-based Android API to suspend functions",
    category: "ENGINEERING",
    image: "/src/images/Kotlin-Coroutines-bridges.webp",

    toc: [
      {
        id: "problem",
        label: "The fundamental problem: Callbacks do not compose",
      },
      {
        id: "bridge",
        label: "The core bridge: suspendCoroutine",
      },
      {
        id: "two-path-bridge",
        label: "Success and error callbacks: The two-path bridge",
      },
      {
        id: "callback-factory",
        label: "The callback factory: Abstracting interface boilerplate",
      },
      {
        id: "multi-value",
        label: "Multi-value callbacks: Wrapper classes",
      },
      {
        id: "exceptions",
        label: "Exception hierarchies: Preserving error semantics",
      },
      {
        id: "result-variant",
        label: "The Result<T> variant: Exceptions are not always what you want",
      },
      {
        id: "lambda-layer",
        label: "The lambda convenience layer: Bridging before the bridge",
      },
      {
        id: "real-world",
        label: "Real-world application: Bridging Google Play Billing directly",
      },
      {
        id: "suspend-vs-cancellable",
        label: "suspendCoroutine versus suspendCancellableCoroutine",
      },
      {
        id: "beyond-billing",
        label: "Applying the pattern beyond billing",
      },
      {
        id: "mistakes",
        label: "Common mistakes to avoid",
        children: [
          {
            id: "resume-zero",
            label: "Resuming zero times",
          },
          {
            id: "resume-twice",
            label: "Resuming twice",
          },
          {
            id: "losing-error",
            label: "Losing error type information",
          },
        ],
      },
      {
        id: "conclusion",
        label: "Conclusion",
      },
    ],

    content: `
    <p>
    This article explores the suspendCoroutine bridge pattern,
    showing how to convert callback APIs into clean suspend
    functions, handle diverse callback shapes, design proper error
    propagation, and how SDKs like RevenueCat apply it at scale.
    </p>
     <!-- 👇 ADD AUTHOR BLOCK HERE -->
  <div class="author-meta">
    <div class="author-left">
      <img src="/src/images/Jaewoong-Eum.3.webp" alt="author" class="author-avatar" />
      <div class="author-info">
        <p class="author-name">Jaewoong Eum</p>
      </div>
    </div>

    <div class="author-right">
      <span>
        Published <time class="publish-date">March 31, 2026</time>
      </span>
    </div>
  </div>
     <p> Most Android platform APIs and third-party SDKs were designed around callbacks. The Google Play Billing Library uses <code>PurchasesUpdatedListener</code>. Location Services uses <code>LocationCallback</code>. Bluetooth GATT uses <code>BluetoothGattCallback</code>. Camera2 uses <code>CameraCaptureSession.StateCallback</code>. If you have been writing Android code for more than a few months, you have written deeply nested callback chains that are hard to read, hard to test, and hard to reason about when errors occur at any stage. Kotlin coroutines solve this with <code>suspend</code> functions, but the platform and most SDKs do not hand you suspend functions out of the box. You need a bridge. </p> <p>In this article, you’ll explore the&nbsp;<code>suspendCoroutine</code>&nbsp;bridge pattern in detail, tracing how it converts callback-based APIs into clean suspend functions, how to handle different callback shapes from single value results to multi-parameter success and error pairs, how to design exception hierarchies that preserve error semantics across the bridge, and how production SDKs like RevenueCat apply these patterns at scale across 20+ API surfaces.</p> <h2 class="group relative" id="h-the-fundamental-problem-callbacks-do-not-compose">The fundamental problem: Callbacks do not compose</h2> <p>Consider a common billing flow on Android. You need to connect to the billing service, query products, then initiate a purchase. With the raw callback API, this looks like:</p>

     <pre class="line-numbers"><code class="language-kotlin">
       billingClient.startConnection(object : BillingClientStateListener {

       override fun onBillingSetupFinished(result: BillingResult) {
        if (result.responseCode == BillingClient.BillingResponseCode.OK) {
            val params = QueryProductDetailsParams.newBuilder()
                .setProductList(listOf(/* ... */))
                .build()

            billingClient.queryProductDetailsAsync(params) { billingResult, productDetails ->
                if (billingResult.responseCode == BillingClient.BillingResponseCode.OK) {
                    // Now launch the purchase flow...
                }
            }
        }
    }

    override fun onBillingServiceDisconnected() {
    // Retry? Log? Both callbacks share no structured error path.
    }
    })
     </code>
      </pre>
      <p>Each callback nests inside the previous one. Error handling is scattered across&nbsp;<code>if</code>&nbsp;checks and separate override methods. There is no structured way to propagate failures up the chain. And this is only two callbacks deep. A full billing flow, connecting, querying, purchasing, and acknowledging, involves four or five nested levels.</p>
      <p>The suspend function equivalent reads like sequential code:</p>
      

<pre class="line-numbers">
<code class="language-kotlin">
val connected = billingClient.awaitConnect()

val products = billingClient.awaitQueryProducts(productIds)
val result = billingClient.awaitPurchase(activity, products.first())
billingClient.awaitAcknowledge(result.purchaseToken)
      </code>
      </pre>
      <p>This is not a language feature you get for free. Each of those&nbsp;<code>await</code>&nbsp;functions require a bridge that converts the underlying callback into a coroutine suspension point. Let’s trace through exactly how that bridge works.</p>
      <h2 class="heading-with-copy" id="bridge">
  The core bridge: suspendCoroutine

  <button class="copy-btn" onclick="copyHeadingLink('bridge')">
    🔗
    <span class="tooltip">Copy link</span>
  </button>
</h2>
<p>Kotlin provides&nbsp;<code>suspendCoroutine</code>&nbsp;as the primitive for bridging between callback-based code and coroutines. The function suspends the current coroutine and gives you a&nbsp;<code>Continuation&lt;T&gt;</code>&nbsp;object. You call&nbsp;<code>continuation.resume(value)</code>&nbsp;to deliver a result, or&nbsp;<code>continuation.resumeWithException(exception)</code>&nbsp;to deliver an error. The coroutine resumes at exactly the point it was suspended.</p>
<p>The simplest bridge handles a single value callback:</p>

      <pre class="line-numbers"><code class="language-kotlin">
suspend fun BillingClient.awaitConnect(): Boolean {
    return suspendCoroutine { continuation ->
        startConnection(object : BillingClientStateListener {
            override fun onBillingSetupFinished(result: BillingResult) {
                continuation.resume(
                    result.responseCode == BillingClient.BillingResponseCode.OK
                )
            }

            override fun onBillingServiceDisconnected() {
                // Connection lost after setup, not during initial connect
            }
        })
    }
}
      </code></pre>
      <p>The pattern has three parts. First, call&nbsp;<code>suspendCoroutine</code>&nbsp;to pause the coroutine and receive a&nbsp;<code>Continuation</code>. Second, call the callback-based API, passing an anonymous implementation that captures the continuation. Third, inside the callback, call&nbsp;<code>resume</code>&nbsp;or&nbsp;<code>resumeWithException</code>&nbsp;to deliver the result and unfreeze the coroutine.</p>
      <p>One important rule: you must call&nbsp;<code>resume</code>&nbsp;or&nbsp;<code>resumeWithException</code>&nbsp;exactly once. Calling it zero times means the coroutine hangs forever. Calling it twice throws&nbsp;<code>IllegalStateException</code>. Every code path through your callback must reach exactly one resume call.</p>
     <h2 class="heading-with-copy" id="two-path-bridge">
  Success and error callbacks: The two-path bridge

  <button class="copy-btn" onclick="copyHeadingLink('two-path-bridge')">
    🔗
    <span class="tooltip">Copy link</span>
  </button>
</h2>
<p>Most SDK APIs split their callbacks into success and error paths. This maps naturally to&nbsp;<code>resume</code>&nbsp;and&nbsp;<code>resumeWithException</code>. Let’s examine how RevenueCat’s Android SDK bridges its offerings API.</p>
<p>Looking at the&nbsp;<code>awaitOfferings</code>&nbsp;extension function:</p> 
<pre class="line-numbers"><code class="language-kotlin">
@JvmSynthetic
@Throws(PurchasesException::class)
suspend fun Purchases.awaitOfferings(): Offerings {
    return suspendCoroutine { continuation ->
        getOfferingsWith(
            onSuccess = continuation::resume,
            onError = {
                continuation.resumeWithException(PurchasesException(it))
            },
        )
    }
}
</code></pre>
<p>Notice the structure. The&nbsp;<code>onSuccess</code>&nbsp;path uses a method reference&nbsp;<code>continuation::resume</code>&nbsp;directly. When the callback signature matches&nbsp;<code>(T) -&gt; Unit</code>&nbsp;and the continuation expects&nbsp;<code>T</code>, a method reference is the cleanest form. The&nbsp;<code>onError</code>&nbsp;path wraps the raw&nbsp;<code>PurchasesError</code>&nbsp;in a&nbsp;<code>PurchasesException</code>&nbsp;before passing it to&nbsp;<code>resumeWithException</code>. This is necessary because&nbsp;<code>resumeWithException</code>&nbsp;expects a&nbsp;<code>Throwable</code>, but the SDK’s error type is a plain data object, not an exception.</p>
<p>The&nbsp;<code>@JvmSynthetic</code>&nbsp;annotation prevents this extension function from appearing in Java code, since Java callers should use the callback version. The&nbsp;<code>@Throws</code>&nbsp;annotation generates the&nbsp;<code>throws</code>&nbsp;clause in the bytecode so Java interop and documentation tools correctly report what this function can throw.</p>
<p>This is not a language feature you get for free. Each of those&nbsp;<code>await</code>&nbsp;functions require a bridge that converts the underlying callback into a coroutine suspension point. Let’s trace through exactly how that bridge works.</p>
      <h2 class="heading-with-copy" id="callback-factory">
  The callback factory: Abstracting interface boilerplate

  <button class="copy-btn" onclick="copyHeadingLink('callback-factory')">
    🔗
    <span class="tooltip">Copy link</span>
  </button>
</h2>
<p>Before the suspend bridge can work, there is another layer of bridging. Many Android SDK APIs accept typed callback interfaces, not lambda pairs. For example, Google Play Billing uses&nbsp;<code>PurchaseCallback</code>&nbsp;with&nbsp;<code>onCompleted</code>&nbsp;and&nbsp;<code>onError</code>&nbsp;methods. RevenueCat’s internal API uses&nbsp;<code>ReceiveOfferingsCallback</code>&nbsp;with&nbsp;<code>onReceived</code>&nbsp;and&nbsp;<code>onError</code>.</p>
<p>Writing anonymous implementations of these interfaces inside every suspend function creates noise. The solution is a set of factory functions that convert lambda pairs into typed callback objects.</p>
<p>Looking at the callback factory for offerings:</p>
<pre class="line-numbers"><code class="language-kotlin">
internal fun receiveOfferingsCallback(
    onSuccess: (offerings: Offerings) -> Unit,
    onError: (error: PurchasesError) -> Unit,
) = object : ReceiveOfferingsCallback {

    override fun onReceived(offerings: Offerings) {
        onSuccess(offerings)
    }

    override fun onError(error: PurchasesError) {
        onError(error)
    }
}
</code></pre>
<p>This is a small function, but it matters at scale. RevenueCat’s SDK has factory functions for offerings, customer info, store products, purchases, login, sync, and more. Each one converts the&nbsp;<code>(onSuccess, onError)</code>&nbsp;lambda pair into the specific callback interface the underlying API expects.</p>
<p>The purchase callback factory handles a more complex shape:</p>
<pre class="line-numbers"><code class="language-kotlin">
internal fun purchaseCompletedCallback(
    onSuccess: (purchase: StoreTransaction, customerInfo: CustomerInfo) -> Unit,
    onError: (error: PurchasesError, userCancelled: Boolean) -> Unit,
) = object : PurchaseCallback {

    override fun onCompleted(
        storeTransaction: StoreTransaction,
        customerInfo: CustomerInfo
    ) {
        onSuccess(storeTransaction, customerInfo)
    }

    override fun onError(
        error: PurchasesError,
        userCancelled: Boolean
    ) {
        onError(error, userCancelled)
    }
}
</code></pre>
<p>Notice the asymmetry. The success callback delivers two values: the transaction and the updated customer info. The error callback also delivers two values: the error and a boolean indicating whether the user cancelled. This is not a simple&nbsp;<code>(T) -&gt; Unit</code>&nbsp;shape. Bridging this to a suspend function requires additional design decisions.</p>
   <h2 class="heading-with-copy" id="multi-value">
  Multi-value callbacks: Wrapper classes

  <button class="copy-btn" onclick="copyHeadingLink('multi-value')">
    🔗
    <span class="tooltip">Copy link</span>
  </button>
</h2>
<p>When a callback delivers multiple values, you need a container to return them from a single suspend function. The approach is straightforward: define a data class that bundles the values.</p>
<p>Looking at RevenueCat’s&nbsp;<code>PurchaseResult</code>:</p>
<pre class="line-numbers"><code class="language-kotlin">
@Poko
class PurchaseResult(
    val storeTransaction: StoreTransaction,
    val customerInfo: CustomerInfo,
)
</code></pre>
<p>The suspend bridge then constructs this wrapper in the success path:</p>
<pre class="line-numbers"><code class="language-kotlin">
@JvmSynthetic
@Throws(PurchasesTransactionException::class)
suspend fun Purchases.awaitPurchase(
    purchaseParams: PurchaseParams
): PurchaseResult {
    return suspendCoroutine { continuation ->
        purchase(
            purchaseParams = purchaseParams,
            callback = purchaseCompletedCallback(
                onSuccess = { storeTransaction, customerInfo ->
                    continuation.resume(
                        PurchaseResult(storeTransaction, customerInfo)
                    )
                },
                onError = { purchasesError, userCancelled ->
                    continuation.resumeWithException(
                        PurchasesTransactionException(
                            purchasesError,
                            userCancelled
                        )
                    )
                },
            ),
        )
    }
}
</code></pre>
<p>Two things are worth noting here. First, the success path wraps both values into a&nbsp;<code>PurchaseResult</code>&nbsp;so the caller gets a single typed return value. Second, the error path uses&nbsp;<code>PurchasesTransactionException</code>&nbsp;instead of the regular&nbsp;<code>PurchasesException</code>. This is because the error callback carries an extra&nbsp;<code>userCancelled</code>&nbsp;boolean that callers need to distinguish user initiated cancellation from actual errors. The exception hierarchy preserves this information.</p>

<h2 class="heading-with-copy" id="exceptions">
 Exception hierarchies: Preserving error semantics

  <button class="copy-btn" onclick="copyHeadingLink('exceptions')">
    🔗
    <span class="tooltip">Copy link</span>
  </button>
</h2>
<p>A common mistake when bridging callbacks to coroutines is losing error information. Wrapping every error in a generic&nbsp;<code>Exception(message)</code>&nbsp;throws away the structured error code that callers need for programmatic error handling.</p>
<p>Looking at RevenueCat’s exception design:</p>
<pre class="line-numbers"><code class="language-kotlin">
open class PurchasesException internal constructor(
    val error: PurchasesError,
    internal val overridenMessage: String? = null,
) : Exception() {

    val code: PurchasesErrorCode
        get() = error.code

    val underlyingErrorMessage: String?
        get() = error.underlyingErrorMessage

    override val message: String
        get() = overridenMessage ?: error.message
}
</code></pre>
<p>The exception wraps the original&nbsp;<code>PurchasesError</code>&nbsp;object, preserving the typed&nbsp;<code>PurchasesErrorCode</code>&nbsp;enum. Callers can use a&nbsp;when&nbsp;expression on the code to handle specific error conditions:</p>
<pre class="line-numbers"><code class="language-kotlin">
try {
    val offerings = Purchases.sharedInstance.awaitOfferings()
    showPaywall(offerings)
} catch (e: PurchasesException) {
    when (e.code) {
        PurchasesErrorCode.NetworkError -> showRetryDialog()
        PurchasesErrorCode.StoreProblemError -> showStoreErrorMessage()
        else -> showGenericError(e.message)
    }
}
</code></pre>
<p>The transaction exception extends this with the cancellation flag:</p>
<pre class="line-numbers"><code class="language-kotlin">
class PurchasesTransactionException(
    purchasesError: PurchasesError,
    val userCancelled: Boolean,
) : PurchasesException(purchasesError)
</code></pre>
<p>This hierarchy means callers can catch&nbsp;<code>PurchasesException</code>&nbsp;for all errors, or catch&nbsp;<code>PurchasesTransactionException</code>&nbsp;specifically for purchase errors where they need to check whether the user cancelled. The&nbsp;is&nbsp;check works naturally:</p>
<pre class="line-numbers"><code class="language-kotlin">
try {
    val result = Purchases.sharedInstance.awaitPurchase(params)
    grantEntitlement(result.customerInfo)
} catch (e: PurchasesTransactionException) {
    if (e.userCancelled) {
        // User tapped back or dismissed the sheet. Not an error.
        return
    }
    showPurchaseError(e.message)
} catch (e: PurchasesException) {
    showGenericError(e.message)
}
</code></pre>
<p>The key observation: the exception hierarchy mirrors the callback signature shapes. A callback with&nbsp;<code>(error)</code>&nbsp;maps to&nbsp;<code>PurchasesException</code>. A callback with&nbsp;<code>(error, userCancelled)</code>&nbsp;maps to&nbsp;<code>PurchasesTransactionException</code>. This is not accidental. It is a deliberate design that makes the suspend API as expressive as the callback API.</p>

<h2 class="heading-with-copy" id="result-variant">
The Result<T> variant: Exceptions are not always what you want

  <button class="copy-btn" onclick="copyHeadingLink('result-variant')">
    🔗
    <span class="tooltip">Copy link</span>
  </button>
</h2>
<p>Not every caller wants to use try/catch. Some prefer&nbsp;<code>kotlin.Result&lt;T&gt;</code>&nbsp;for composable error handling. RevenueCat provides a second variant for every suspend bridge:</p>
<pre class="line-numbers"><code class="language-kotlin">
@JvmSynthetic
suspend fun Purchases.awaitOfferingsResult(): Result<Offerings> =
    suspendCoroutine { continuation ->
        getOfferingsWith(
            onSuccess = {
                continuation.resume(Result.success(it))
            },
            onError = {
                continuation.resume(
                    Result.failure(PurchasesException(it))
                )
            },
        )
    }
</code></pre>
<p>The key difference: the error path calls&nbsp;<code>continuation.resume(Result.failure(...))</code>&nbsp;instead of&nbsp;<code>continuation.resumeWithException(...)</code>. From the coroutine’s perspective, the function always completes successfully. It returns a&nbsp;<code>Result</code>&nbsp;that the caller unwraps:</p>
<pre class="line-numbers"><code class="language-kotlin" style="white-space:pre">
val result = Purchases.sharedInstance.awaitOfferingsResult()

result.fold(
    onSuccess = { offerings ->
        showPaywall(offerings)
    },
    onFailure = { error ->
        showError(error.message)
    }
)
</code></pre>
<p>This pattern is useful in pipelines where you want to chain operations without try/catch blocks:</p>
<pre class="line-numbers"><code class="language-kotlin">
suspend fun loadPaywallData(): Result&lt;PaywallData&gt; {
    return Purchases.sharedInstance.awaitOfferingsResult()
        .mapCatching { offerings ->
            val currentOffering = offerings.current
                ?: throw IllegalStateException("No current offering")

            PaywallData(currentOffering)
        }
}
</code></pre>
<p>The purchase&nbsp;<code>Result</code>&nbsp;variant follows the same pattern:</p>
<pre class="line-numbers"><code class="language-kotlin">
suspend fun Purchases.awaitPurchaseResult(
    purchaseParams: PurchaseParams
): Result&lt;PurchaseResult&gt; {
    return suspendCoroutine { continuation ->
        purchase(
            purchaseParams = purchaseParams,
            callback = purchaseCompletedCallback(
                onSuccess = { storeTransaction, customerInfo ->
                    continuation.resume(
                        Result.success(
                            PurchaseResult(storeTransaction, customerInfo)
                        )
                    )
                },
                onError = { purchasesError, userCancelled ->
                    continuation.resume(
                        Result.failure(
                            PurchasesTransactionException(purchasesError, userCancelled)
                        )
                    )
                },
            ),
        )
    }
}
</code></pre>
<p>The error information is not lost. The&nbsp;<code>PurchasesTransactionException</code>&nbsp;is still inside the&nbsp;<code>Result.failure</code>, so callers who need the&nbsp;<code>userCancelled</code>&nbsp;flag can check it:</p>
<pre class="line-numbers"><code class="language-kotlin">
val result = Purchases.sharedInstance.awaitPurchaseResult(params)

result.onFailure { error ->
    if (error is PurchasesTransactionException && error.userCancelled) {
        return
    }
    showError(error.message)
}
</code></pre>
<p>This dual API approach, throwing suspend functions and&nbsp;<code>Result</code>&nbsp;returning suspend functions, gives consumers the choice without forcing one style. The SDK does not pick winners. It supports both.</p>

<h2 class="heading-with-copy" id="lambda-layer">
The lambda convenience layer: Bridging before the bridge

  <button class="copy-btn" onclick="copyHeadingLink('lambda-layer')">
    🔗
    <span class="tooltip">Copy link</span>
  </button>
</h2>
<p>There is a middle layer between the raw callback interface API and the suspend bridge that is worth examining. RevenueCat provides extension functions that accept lambda pairs instead of typed callback objects:</p>
<pre class="line-numbers"><code class="language-kotlin">
fun Purchases.getOfferingsWith(
    onError: (error: PurchasesError) -&gt; Unit = ON_ERROR_STUB,
    onSuccess: (offerings: Offerings) -&gt; Unit,
) {
    getOfferings(receiveOfferingsCallback(onSuccess, onError))
}
</code></pre>
<p>This is a two step bridge design. The lambda extension (<code>getOfferingsWith</code>) converts lambdas to a typed callback. The suspend extension (<code>awaitOfferings</code>) converts the lambda extension to a coroutine. Each layer does one thing.</p>
<p>Notice the default error handler:</p>

<pre class="line-numbers"><code>
internal val ON_ERROR_STUB: (error: PurchasesError) -&gt; Unit = {}
</code></pre>
<p>This allows callers who do not care about errors to omit the error handler. This is useful for fire and forget operations, but should be used carefully since silently swallowing errors is a common source of bugs.</p>
<p>The purchase version has its own stub:</p>
<pre class="line-numbers"><code class="language-kotlin">
internal val ON_PURCHASE_ERROR_STUB: (error: PurchasesError, userCancelled: Boolean) -&gt; Unit =
    { _, _ -&gt; }
</code></pre>
<p>Two separate stubs for two different callback shapes. Each matches the exact lambda signature its callback requires.</p>

<h2 class="heading-with-copy" id="real-world">
Real-world application: Bridging Google Play Billing directly

  <button class="copy-btn" onclick="copyHeadingLink('real-world')">
    🔗
    <span class="tooltip">Copy link</span>
  </button>
</h2>
<p>The same&nbsp;<code>suspendCoroutine</code>&nbsp;pattern applies to any callback based Android API. Here is how you would bridge Google Play Billing’s acknowledgment API:</p>
<pre class="line-numbers"><code class="language-kotlin">
suspend fun BillingClient.awaitAcknowledge(purchaseToken: String): Boolean {
    return suspendCoroutine { continuation ->
        val params = AcknowledgePurchaseParams.newBuilder()
            .setPurchaseToken(purchaseToken)
            .build()

        acknowledgePurchase(params) { billingResult ->
            continuation.resume(
                billingResult.responseCode == BillingClient.BillingResponseCode.OK
            )
        }
    }
}
</code></pre>
<p>And the consume API follows the same structure:</p>
<pre class="line-numbers"><code class="language-kotlin">
suspend fun BillingClient.awaitConsume(purchaseToken: String): Boolean {
    return suspendCoroutine { continuation ->
        val params = ConsumeParams.newBuilder()
            .setPurchaseToken(purchaseToken)
            .build()

        consumeAsync(params) { billingResult, _ ->
            continuation.resume(
                billingResult.responseCode == BillingClient.BillingResponseCode.OK
            )
        }
    }
}
</code></pre>
<p>Even the billing client connection, which has two separate callback methods (<code>onBillingSetupFinished</code>&nbsp;and&nbsp;<code>onBillingServiceDisconnected</code>), bridges cleanly:</p>
<pre class="line-numbers"><code class="language-kotlin">
suspend fun BillingClient.awaitConnect(): Boolean {
    if (isReady) return true

    return suspendCoroutine { continuation ->
        startConnection(object : BillingClientStateListener {

            override fun onBillingSetupFinished(billingResult: BillingResult) {
                continuation.resume(
                    billingResult.responseCode == BillingClient.BillingResponseCode.OK
                )
            }

            override fun onBillingServiceDisconnected() {
                // Called when connection is lost after setup, not during setup.
                // The continuation has already been resumed by onBillingSetupFinished.
            }
        })
    }
}
</code></pre>
<p>The&nbsp;<code>onBillingServiceDisconnected</code>&nbsp;method is called after a successful setup when the connection is later lost, not as an alternative to&nbsp;<code>onBillingSetupFinished</code>&nbsp;during the initial connection. This is an important subtlety. If both methods could fire during setup, you would need additional state tracking to ensure exactly one resume call.</p>


<h2 class="heading-with-copy" id="suspend-vs-cancellable">
suspendCoroutine versus suspendCancellableCoroutine

  <button class="copy-btn" onclick="copyHeadingLink('suspend-vs-cancellable')">
    🔗
    <span class="tooltip">Copy link</span>
  </button>
</h2>
<p>There is a more advanced variant:&nbsp;<code>suspendCancellableCoroutine</code>. The difference is that it gives you a&nbsp;<code>CancellableContinuation</code>&nbsp;that responds to coroutine cancellation.</p>
<pre class="line-numbers"><code class="language-kotlin">
suspend fun BillingClient.awaitConnectCancellable(): Boolean {
    if (isReady) return true

    return suspendCancellableCoroutine { continuation ->

        val listener = object : BillingClientStateListener {

            override fun onBillingSetupFinished(billingResult: BillingResult) {
                if (continuation.isActive) {
                    continuation.resume(
                        billingResult.responseCode == BillingClient.BillingResponseCode.OK
                    )
                }
            }

            override fun onBillingServiceDisconnected() {}
        }

        startConnection(listener)

        continuation.invokeOnCancellation {
            // Clean up: end the billing connection if the coroutine is cancelled
            endConnection()
        }
    }
}
</code></pre>
<p>When should you use which? Use&nbsp;<code>suspendCoroutine</code>&nbsp;when the underlying operation cannot be cancelled, or when cancellation cleanup is unnecessary. Most SDK callbacks fall into this category: once you call&nbsp;<code>getOfferings</code>, you cannot un-call it, and letting the callback complete harmlessly is fine.</p>
<p>Use&nbsp;<code>suspendCancellableCoroutine</code>&nbsp;when the underlying operation holds resources that should be released on cancellation. Long running connections, streams, or operations that allocate expensive resources benefit from cancellation support.</p>
<p>RevenueCat’s public coroutine extensions use&nbsp;<code>suspendCoroutine</code>&nbsp;because the underlying SDK calls are short lived network requests. The callback will fire quickly, and the cost of letting it complete (even if the coroutine is cancelled) is negligible compared to the complexity of cancellation handling.</p>

<h2 class="heading-with-copy" id="beyond-billing">
Applying the pattern beyond billing

  <button class="copy-btn" onclick="copyHeadingLink('beyond-billing')">
    🔗
    <span class="tooltip">Copy link</span>
  </button>
</h2>
<p>The bridge pattern is not limited to billing APIs. The same approach works for any callback-based Android API. A few examples:</p>
<p>For FusedLocationProviderClient, which delivers location through&nbsp;<code>LocationCallback</code>:</p>
<pre class="line-numbers"><code class="language-kotlin">
suspend fun FusedLocationProviderClient.awaitLastLocation(): Location? {
    return suspendCoroutine { continuation ->
        lastLocation
            .addOnSuccessListener { location ->
                continuation.resume(location)
            }
            .addOnFailureListener { e ->
                continuation.resumeWithException(e)
            }
    }
}
</code></pre>
<p>For SharedPreferences, which uses&nbsp;<code>OnSharedPreferenceChangeListener</code>&nbsp;for change notifications:</p>
<pre class="line-numbers"><code class="language-kotlin">
suspend fun SharedPreferences.awaitChange(key: String): String? {
    return suspendCancellableCoroutine { continuation ->

        val listener = SharedPreferences.OnSharedPreferenceChangeListener { prefs, changedKey ->
            if (changedKey == key) {
                continuation.resume(prefs.getString(key, null))
            }
        }

        registerOnSharedPreferenceChangeListener(listener)

        continuation.invokeOnCancellation {
            unregisterOnSharedPreferenceChangeListener(listener)
        }
    }
}
</code></pre>
<p>The common structure is always the same: wrap with&nbsp;<code>suspendCoroutine</code>, register the callback, resume when the callback fires. What changes is the callback shape, how many values you need to capture, and whether cancellation cleanup is needed.</p>

<h2 class="heading-with-copy" id="mistakes">
Common mistakes to avoid

  <button class="copy-btn" onclick="copyHeadingLink('mistakes')">
    🔗
    <span class="tooltip">Copy link</span>
  </button>
</h2>
<h3 class="heading-with-copy" id="resume-zero">
Resuming zero times

  <button class="copy-btn" onclick="copyHeadingLink('resume-zero')">
    🔗
    <span class="tooltip">Copy link</span>
  </button>
</h3>
<p>If there is a code path where the callback never fires, the coroutine suspends forever. This is especially common with connection listeners that have multiple callback methods:</p>
<pre class="line-numbers"><code class="language-kotlin">
suspend fun BillingClient.awaitConnectSafe(): Boolean {
    return withTimeout(5_000) {
        suspendCancellableCoroutine { continuation ->

            startConnection(object : BillingClientStateListener {

                override fun onBillingSetupFinished(billingResult: BillingResult) {
                    if (continuation.isActive) {
                        continuation.resume(
                            billingResult.responseCode == BillingClient.BillingResponseCode.OK
                        )
                    }
                }

                override fun onBillingServiceDisconnected() {
                    if (continuation.isActive) {
                        continuation.resume(false)
                    }
                }
            })
        }
    }
}
</code></pre>

<h3 class="heading-with-copy" id="resume-twice">
Resuming twice

  <button class="copy-btn" onclick="copyHeadingLink('resume-twice')">
    🔗
    <span class="tooltip">Copy link</span>
  </button>
</h3>
<p>If a callback can fire multiple times (like a location listener that delivers updates continuously),&nbsp;<code>suspendCoroutine</code>&nbsp;is the wrong tool. Each call to&nbsp;<code>resume</code>&nbsp;after the first throws&nbsp;<code>IllegalStateException</code>. For repeating callbacks, use&nbsp;<code>callbackFlow</code>&nbsp;instead:</p>
<pre class="line-numbers"><code class="language-kotlin">
fun FusedLocationProviderClient.locationUpdates(
    request: LocationRequest
): Flow<Location> = callbackFlow {

    val callback = object : LocationCallback() {

        override fun onLocationResult(result: LocationResult) {
            result.lastLocation?.let { trySend(it) }
        }
    }

    requestLocationUpdates(request, callback, Looper.getMainLooper())

    awaitClose { removeLocationUpdates(callback) }
}
</code></pre>
<p><code>suspendCoroutine</code>&nbsp;is for one shot callbacks.&nbsp;<code>callbackFlow</code>&nbsp;is for streaming callbacks. Choosing the wrong primitive leads to crashes or hangs.</p>

<h3 class="heading-with-copy" id="losing-error">
Losing error type information

  <button class="copy-btn" onclick="copyHeadingLink('losing-error')">
    🔗
    <span class="tooltip">Copy link</span>
  </button>
</h3>
<p>Wrapping all errors as&nbsp;<code>Exception(error.message)</code>&nbsp;strips away the structured error data callers need:</p>
<pre class="line-numbers"><code class="language-kotlin">
// Bad: caller cannot programmatically distinguish error types
onError = { error ->
    continuation.resumeWithException(Exception(error.message))
}

// Good: caller can match on error code
onError = { error ->
    continuation.resumeWithException(PurchasesException(error))
}
</code></pre>
<p>The extra work of defining a typed exception class pays for itself every time a caller needs to handle specific error conditions differently.</p>

<h2 class="heading-with-copy" id="conclusion">
Conclusion

  <button class="copy-btn" onclick="copyHeadingLink('conclusion')">
    🔗
    <span class="tooltip">Copy link</span>
  </button>
</h2>
<p>In this article, you’ve explored the&nbsp;<code>suspendCoroutine</code>&nbsp;bridge pattern from its simplest form, a single value callback, through the production patterns used in RevenueCat’s Android SDK: multi value wrapper classes, typed exception hierarchies, callback factory functions, and dual API styles with both throwing and&nbsp;<code>Result</code>&nbsp;returning variants. The pattern is always the same three steps: suspend the coroutine, register the callback, and resume exactly once.</p>
<p>Understanding this bridge is practical knowledge for any Android developer. Most of the platform APIs you use daily, billing, location, Bluetooth, camera, were designed around callbacks. Converting them to suspend functions makes your code sequential, testable, and composable. The patterns covered here, especially the callback factory layer, the typed exception hierarchy, and the&nbsp;<code>Result&lt;T&gt;</code>&nbsp;variant, are directly reusable in your own projects.</p>
<p>Whether you’re bridging Google Play Billing’s&nbsp;<code>PurchasesUpdatedListener</code>, wrapping a legacy networking library, or building a suspend-friendly API for your own SDK, these patterns provide the foundation for clean, correct coroutine integration on Android.</p>

`,
  },
];

export default posts;
