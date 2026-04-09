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
      { id: "bridge", label: "The core bridge: suspendCoroutine" },
      { id: "factory", label: "The callback factory" },
      { id: "mistakes", label: "Common mistakes to avoid" },
      { id: "conclusion", label: "Conclusion" },
    ],

    content: `
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
      <h2 class="heading-with-copy" id="bridge">
  The callback factory: Abstracting interface boilerplate

  <button class="copy-btn" onclick="copyHeadingLink('bridge')">
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
   <h2 class="heading-with-copy" id="bridge">
  Multi-value callbacks: Wrapper classes

  <button class="copy-btn" onclick="copyHeadingLink('bridge')">
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

<h2 class="heading-with-copy" id="bridge">
 Exception hierarchies: Preserving error semantics

  <button class="copy-btn" onclick="copyHeadingLink('bridge')">
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

<h2 class="heading-with-copy" id="bridge">
The Result<T> variant: Exceptions are not always what you want

  <button class="copy-btn" onclick="copyHeadingLink('bridge')">
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




`,
  },
];

export default posts;
