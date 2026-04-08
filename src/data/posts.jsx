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
      
    `,
  },
];

export default posts;
