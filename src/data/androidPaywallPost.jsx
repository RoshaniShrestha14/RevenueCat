const androidPaywallPost = {
  id: "android-paywall-conversion-gap",
  label:
    "The Android paywall conversion gap: why the problem isn’t your trial, it’s your funnel entrance",
  category: "GROWTH",
  image: "/src/images/android.webp",

  toc: [
    {
      id: "two-stage",
      label: "The fundamental problem: Two stages, one broken",
    },
    {
      id: "stage-one",
      label: "Stage one: What determines whether users see a trial",
      children: [
        {
          id: "paywall-type",
          label: "The paywall type gap",
        },
        {
          id: "paywall-timing",
          label: "The paywall timing gap",
        },
      ],
    },

    {
      id: "offer-failure",
      label: "The hidden failure: Offer misconfiguration suppressing trials",
      children: [
        {
          id: "play-offers",
          label: "How Google Play structures subscription offers",
        },
        {
          id: "default-offer",
          label: "How RevenueCat selects the default offer",
        },
        {
          id: "offer-check",
          label: "Detecting what your paywall is actually showing",
        },
      ],
    },

    {
      id: "platform-gap",
      label: "One structural difference to be aware of",
    },

    {
      id: "context-tracking",
      label: "Tracking paywall performance with PresentedOfferingContext",
    },

    {
      id: "trial-impact",
      label: "Trial duration impact on conversion",
    },

    {
      id: "experiments",
      label: "Measuring and iterating with RevenueCat Experiments",
    },

    {
      id: "summary",
      label: "Putting it together",
    },
  ],

  content: `
    <p>This article breaks down the Android paywall funnel, including where users drop off and how subscription options are actually selected.</p>


    <div class="author-meta">
      <div class="author-left">
        <img src="/src/images/Jaewoong-Eum.3.webp" class="author-avatar" />
        <div class="author-info">
          <p class="author-name">Jaewoong Eum</p>
        </div>
      </div>

      <div class="author-right">
        <span>Published <time>March 25, 2026</time></span>
      </div>
    </div>
    <p>Android’s subscription conversion rate, compared to iOS, looks like a platform problem. When RevenueCat analyzed over 115,000 apps and $16 billion in revenue for the&nbsp;<a href="https://www.revenuecat.com/state-of-subscription-apps/">2026 State of Subscription Apps report</a>, the numbers were clear: on Android, the median download to paid conversion at day 35 sits at 0.9%, while iOS lands at 2.6%. That’s a nearly threefold gap. The instinct is to blame the trial, or the audience, or some fundamental difference in how Android users behave. The data says otherwise.</p>
    <p>Looking one level deeper in the same dataset, trial to paid conversion on Android is 32.5%. On iOS, it’s 32.6%. Once a user starts a trial on either platform, they convert at statistically the same rate. There is an important caveat: Android’s trial-starter pool is likely more filtered. Because Android surfaces fewer trials overall, the users who do start one tend to be higher-intent. That selection effect partly explains why the rates equalize. Even so, the primary lever is clear: Android apps are sending far fewer users into that first stage. Closing the gap starts with getting more users to begin a trial in the first place.</p>
    <p>In this article, you’ll explore the two-stage Android paywall funnel and where Android apps lose users, how Google Play’s offer and tag system controls which subscription option is surfaced to users, how RevenueCat’s&nbsp;<code>SubscriptionOptions</code>&nbsp;selection works and where silent misconfigurations occur, what the data shows about hard paywalls versus freemium models, and how to use <a href="https://www.revenuecat.com/docs/tools/experiments-v1">RevenueCat Experiments</a> to close the gap systematically.</p>

      <h2 class="heading-with-copy" id="two-stage">
The fundamental problem: Two stages, one broken

  <button class="copy-btn" onclick="copyHeadingLink('two-stage')">
    🔗
    <span class="tooltip">Copy link to this section</span>
  </button>
</h2>
<p>The download to paid journey has two distinct stages, and they behave differently.</p>
<p>The first stage is download to trial start: the user installs your app, reaches your paywall, and decides whether to begin a free trial. The second stage is trial start to paid: the trial ends, and the user decides whether to continue as a subscriber.</p>
<p>The RevenueCat data shows these two stages behave very differently on Android. A user who starts a trial converts at 32.5%, close to the 32.6% on iOS. But Android apps are sending far fewer users into that first stage. The bulk of the conversion gap lives in stage one.</p>
<p>One data point makes this concrete: 89.4% of all trial starts happen on the day of install. Users who download with high intent act immediately. Users who do not start a trial on install day rarely return to do so later. That makes the first paywall impression on Android the moment that determines most subscription revenue. Everything downstream from that moment, including your trial experience, your onboarding, your product, performs about as well on Android as on iOS. The question is whether users reach that moment at all.</p>


 <h2 class="heading-with-copy" id="stage-one">
Stage one: What determines whether users see a trial

  <button class="copy-btn" onclick="copyHeadingLink('stage-one')">
    🔗
    <span class="tooltip">Copy link to this section</span>
  </button>
</h2>

<p>Two things control whether a user is presented with a free trial on Android: what you show (the paywall type) and when you show it (the timing). Both are fully within your control.</p>

<h3 class="heading-with-copy" id="paywall-type">
The paywall type gap

  <button class="copy-btn" onclick="copyHeadingLink('paywall-type')">
    🔗
    <span class="tooltip">Copy link to this section</span>
  </button>
</h3>
<p>The RevenueCat data breaks down paywall models by D35 download to paid conversion, RevenueCat’s measurement window for capturing conversion across trial lengths up to one month. Hard paywalls, where users must interact with a subscription offer before accessing core features, achieve a median D35 conversion of 10.7%. The top 10% of hard paywall apps reach 38.7%. Freemium models, where users get some access without paying, convert at a median of 2.1%.</p>
<p>That’s a fivefold difference in conversion with nearly identical annual retention. Hard paywalls retain 27% of subscribers at 12 months. Freemium retains 28%. For most app categories, the hard paywall numbers are substantially better. If your product delivers clear, immediate value in a single session, a hard paywall is almost certainly the right model. Categories where freemium remains appropriate are those with network effects or long value-discovery cycles, such as social apps and community tools, where acquiring a broad user base matters before monetization.</p>
<figure class="wp-block-table">
  <table class="custom-table">
    <thead>
      <tr>
        <th>Paywall model</th>
        <th>Median D35 conversion</th>
        <th>Top 10% D35 conversion</th>
        <th>12 month retention</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Hard paywall</td>
        <td>10.7%</td>
        <td>38.7%</td>
        <td>27%</td>
      </tr>
      <tr>
        <td>Freemium</td>
        <td>2.1%</td>
        <td>—</td>
        <td>28%</td>
      </tr>
    </tbody>
  </table>
</figure>
<p>There is one case where freemium shows a late-conversion advantage: at week six, freemium apps convert 22.9% of that cohort compared to 15.3% for hard paywalls. If your product has a long discovery cycle where value builds gradually over weeks, freemium captures users that a hard paywall would lose.</p>
    


<h3 class="heading-with-copy" id="paywall-timing">
The paywall timing gap

  <button class="copy-btn" onclick="copyHeadingLink('paywall-timing')">
    🔗
    <span class="tooltip">Copy link to this section</span>
  </button>
</h3>
<p>The 89.4% Day 0 trial start rate has a direct implication for timing: show your paywall in the first session. Every session after the first is a sharply diminishing return.</p>
<p>This doesn’t mean presenting the paywall before any onboarding. Apps that show a paywall before a user understands the product’s value typically see worse opt-in rates. The pattern that works is: deliver one compelling value moment first (a single completed task, a key feature reveal, a concrete output), then present the paywall. On Day 0.</p>




  <h2 class="heading-with-copy" id="offer-failure">
The hidden failure: When offer misconfiguration silently suppresses trials

  <button class="copy-btn" onclick="copyHeadingLink('offer-failure')">
    🔗
    <span class="tooltip">Copy link to this section</span>
  </button>
</h2>

<p>Even if your paywall type and timing are right, there’s a second source of trial failures on Android that is harder to spot: the subscription offer itself may not be visible. This is a Google Play configuration issue, and it can happen without any error.</p>




<h3 class="heading-with-copy" id="play-offers">
How Google Play structures subscription offers

  <button class="copy-btn" onclick="copyHeadingLink('play-offers')">
    🔗
    <span class="tooltip">Copy link to this section</span>
  </button>
</h3>
<p>Every subscription on Google Play consists of a base plan and, optionally, one or more offers. An offer defines a promotional pricing phase (a free trial, an introductory price, or both) that precedes the base plan price. Offers are represented in the Billing Library as&nbsp;<code>ProductDetails.SubscriptionOfferDetails</code>.</p>
<p>Each&nbsp;<code>SubscriptionOfferDetails</code>&nbsp;object has a list of pricing phases, a set of offer tags, and an offer token used to initiate the purchase. The pricing phases tell you the price and duration of each stage. The offer tags are strings you define in the Play Console at either the base plan level or the offer level. The Billing Library returns the union of both sets in&nbsp;<code>getOfferTags()</code>, so a tag set on the base plan automatically appears on all offers under it.</p>
<p>When RevenueCat fetches your products, each&nbsp;<code>SubscriptionOfferDetails</code>&nbsp;is converted to a&nbsp;<code>GoogleSubscriptionOption</code>. Looking at the conversion in&nbsp;<code>subscriptionOptionConversions.kt</code>:</p>

<pre class="line-numbers">
<code class="language-kotlin">
internal fun ProductDetails.SubscriptionOfferDetails.toSubscriptionOption(
    productId: String,
    productDetails: ProductDetails,
): GoogleSubscriptionOption {
    val pricingPhases = pricingPhases.pricingPhaseList.map {
        it.toRevenueCatPricingPhase()
    }
    return GoogleSubscriptionOption(
        productId,
        basePlanId,
        offerId,
        pricingPhases,
        offerTags,
        productDetails,
        offerToken,
        presentedOfferingContext = null,
        installmentPlanDetails?.installmentsInfo,
    )
}
</code>
</pre>
<p>The&nbsp;<code>offerId</code>&nbsp;is null for base plans and set for offer-based options. The&nbsp;<code>offerToken</code>&nbsp;is what gets passed to the billing flow when the user taps “Start free trial.” The&nbsp;<code>offerTags</code>&nbsp;carry the labels you assigned in the Play Console.</p>

<h3 class="heading-with-copy" id="default-offer">
How RevenueCat selects the default offer

  <button class="copy-btn" onclick="copyHeadingLink('default-offer')">
    🔗
    <span class="tooltip">Copy link to this section</span>
  </button>
</h3>
<p>Once your product has a list of&nbsp;<code>GoogleSubscriptionOption</code>&nbsp;objects, RevenueCat groups them in a&nbsp;<code>SubscriptionOptions</code>&nbsp;collection and exposes a&nbsp;<code>defaultOffer</code>&nbsp;property. This is the option your paywall shows unless you explicitly select a different one.</p>
<p>The selection algorithm in&nbsp;<code>SubscriptionOptions.kt</code>&nbsp;works as follows:</p>

<pre class="line-numbers">
<code class="language-kotlin">
public val defaultOffer: SubscriptionOption?
    get() {
        val basePlan = this.firstOrNull { it.isBasePlan } ?: return null

        val validOffers = this
            .filter { !it.isBasePlan }
            .filter { !it.tags.contains(RC_IGNORE_OFFER_TAG) }
            .filter { !it.tags.contains(SharedConstants.RC_CUSTOMER_CENTER_TAG) }

        return findLongestFreeTrial(validOffers) ?: findLowestNonFreeOffer(validOffers) ?: basePlan
    }

</code>
</pre>
<p>The algorithm filters out any offer tagged&nbsp;<code>rc-ignore-offer</code>&nbsp;or&nbsp;<code>rc-customer-center</code>, then selects the offer with the longest free trial. If there is no free trial, it selects the offer with the lowest introductory price. If no offers pass those checks, it falls back to the base plan with no promotional phase at all.</p>
<p>That fallback is the silent failure. If your trial offer is tagged&nbsp;<code>rc-ignore-offer</code>, if it is not attached to the right base plan, or if it simply has no offer tags at all and your app relies on tag-based filtering,&nbsp;<code>defaultOffer</code>&nbsp;returns the base plan. Your paywall renders. Everything looks fine. No error appears. But the trial is gone.</p>




<h3 class="heading-with-copy" id="offer-check">
Detecting what your paywall is actually showing

  <button class="copy-btn" onclick="copyHeadingLink('offer-check')">
    🔗
    <span class="tooltip">Copy link to this section</span>
  </button>
</h3>
<p>Before optimizing anything else, verify that&nbsp;<code>defaultOffer</code>&nbsp;on your product resolves to an offer with a free trial. The&nbsp;<code>SubscriptionOption</code>&nbsp;interface exposes a&nbsp;<code>freePhase</code>&nbsp;property for exactly this check:</p>

<pre class="line-numbers">
<code class="language-kotlin">
val freePhase: PricingPhase?
    get() = pricingPhases.dropLast(1).firstOrNull {
        it.price.amountMicros == 0L
    }
</code>
</pre>
<p>A non-null&nbsp;<code>freePhase</code>&nbsp;means the option includes a free trial phase.&nbsp;<code>introPhase</code>&nbsp;similarly checks for introductory paid phases. If your&nbsp;<code>defaultOffer</code>&nbsp;has a null&nbsp;<code>freePhase</code>&nbsp;and a null&nbsp;<code>introPhase</code>, no promotional phase will be shown. You can also check&nbsp;<code>defaultOffer?.isBasePlan</code>&nbsp;directly: a true value means the SDK found no eligible offer and fell back to the base plan. Either way, inspect your offer configuration in the Play Console.</p>
<p>You can check this in code after fetching offerings:</p>



<pre class="line-numbers">
<code class="language-kotlin">
Purchases.sharedInstance.getOfferingsWith(
    onError = { error -> /* handle */ },
    onSuccess = { offerings ->
        val currentOffering = offerings.current ?: return@getOfferingsWith
        val monthlyPackage = currentOffering.monthly ?: return@getOfferingsWith
        val subscriptionOptions = monthlyPackage.product.subscriptionOptions

        val defaultOffer = subscriptionOptions?.defaultOffer
        val hasFreeTrialOption = defaultOffer?.freePhase != null
        val hasIntroductoryOffer = defaultOffer?.introPhase != null

        Log.d("Paywall", "Default offer: $defaultOffer?.id}")
        Log.d("Paywall", "Has free trial: $hasFreeTrialOption")
        Log.d("Paywall", "Has intro offer: $hasIntroductoryOffer")
    }
)
</code>
</pre>
<p>Run this during development and confirm the output matches your Play Console offer configuration. If&nbsp;<code>hasFreeTrialOption</code>&nbsp;is false and you expected a trial, the offer is not being selected. Check offer tags, verify the offer is in the correct base plan, and confirm the offer is active in the Play Console.</p>



 <h2 class="heading-with-copy" id="platform-gap">
One structural difference to be aware of

  <button class="copy-btn" onclick="copyHeadingLink('platform-gap')">
    🔗
    <span class="tooltip">Copy link to this section</span>
  </button>
</h2>
<p>Before moving to tracking and experimentation, it is worth naming one platform-level difference that the Android-iOS comparison does not fully capture.</p>
<p>On iOS, Apple sends a system-level push notification before a trial ends, reminding the user it will convert to paid. Google Play does not send an equivalent system notification. This means iOS gets a built-in re-engagement nudge at the critical trial to paid moment, and Android does not. On Android, that reminder is entirely your responsibility: an in-app banner, a push notification from your own backend, or a re-engagement flow triggered when the user returns near the end of their trial.</p>
<p>This structural difference partially explains why the trial to paid rates look similar despite the very different trial-starter pool sizes: iOS has a platform assist at the conversion moment. On Android, the same result requires explicit implementation. If your Android trial to paid rate is below your iOS rate, the absence of a trial-end reminder in your app is a likely contributor.</p>


<h2 class="heading-with-copy" id="context-tracking">
Tracking paywall performance with PresentedOfferingContext

  <button class="copy-btn" onclick="copyHeadingLink('context-tracking')">
    🔗
    <span class="tooltip">Copy link to this section</span>
  </button>
</h2>
<p>Once your offer configuration is correct, the next step is understanding which paywall placement drives the most trial starts. RevenueCat’s&nbsp;<code>PresentedOfferingContext</code>&nbsp;lets you attach a placement identifier to every purchase, so your analytics can segment by where in the app the paywall appeared.</p>
<p><code>PresentedOfferingContext</code>&nbsp;carries three fields:</p>

<pre class="line-numbers">
<code class="language-kotlin">
public class PresentedOfferingContext(
    public val offeringIdentifier: String,
    public val placementIdentifier: String?,
    public val targetingContext: TargetingContext?,
)
</code>
</pre>
<p>The&nbsp;<code>offeringIdentifier</code>&nbsp;is the offering from your RevenueCat dashboard. The&nbsp;<code>placementIdentifier</code>&nbsp;is a string you define to label the surface:&nbsp;<code>"onboarding_paywall"</code>,&nbsp;<code>"settings_upgrade"</code>,&nbsp;<code>"feature_gate"</code>, and so on. The&nbsp;<code>targetingContext</code>&nbsp;carries rule data when you are using RevenueCat’s targeting feature.</p>
<p>When you initiate a purchase, this context travels with the transaction and appears in your RevenueCat dashboard and webhook events. You can then compare trial start rates and D35 conversion across placements and determine which surface is worth optimizing first.</p>

<h2 class="heading-with-copy" id="trial-impact">
<p>Beyond offer visibility and paywall type, trial duration has a measurable impact on trial to paid conversion. The RevenueCat data shows a clear pattern:</p>

  <button class="copy-btn" onclick="copyHeadingLink('trial-impact')">
    🔗
    <span class="tooltip">Copy link to this section</span>
  </button>
</h2>
Beyond offer visibility and paywall type, trial duration has a measurable impact on trial to paid conversion. The RevenueCat data shows a clear pattern:

<figure class="wp-block-table">
  <table class="custom-table">
    <thead>
      <tr>
        <th>Trial length</th>
        <th>Trial-to-paid conversion</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>4 days or fewer</td>
        <td>25.5%</td>
      </tr>
      <tr>
        <td>17 to 32 days</td>
        <td>42.5%</td>
      </tr>
    </tbody>
  </table>
</figure>
<p>Yet 55% of all trials in the dataset are now 4 days or shorter, up from 42% the previous year. Only 5% of apps offer 17 or more days.</p>
<p>If your trial to paid rate is below the 32.5% Android median, trial length is worth testing. It is one of the higher-leverage variables to run through RevenueCat Experiments without needing to ship new code.</p>


<h2 class="heading-with-copy" id="experiments">
Measuring and iterating with RevenueCat Experiments

  <button class="copy-btn" onclick="copyHeadingLink('experiments')">
    🔗
    <span class="tooltip">Copy link to this section</span>
  </button>
</h2>
<p>All of the variables discussed so far (paywall type, timing, trial length, offer selection) interact in ways that are hard to reason about without measurement. What works depends on your specific product, your audience, and your category.</p>
<p><a href="https://www.revenuecat.com/docs/tools/experiments-v1">RevenueCat Experiments</a> lets you run A/B tests against these variables without shipping code changes or building backend infrastructure. You create a variant offering in the RevenueCat dashboard with a different configuration: a different trial length, a different default offer, or a different package lineup. RevenueCat randomly assigns users to control or variant, tracks their behavior through the full trial and conversion cycle, and surfaces D35 conversion, LTV, and trial start rate broken down by variant.</p>
<p>Once your experiment is running, you can monitor trial state per user via&nbsp;<code>EnlabelmentInfo.periodType</code>&nbsp;in&nbsp;<code>CustomerInfo</code>:</p>

<pre class="line-numbers">
<code class="language-kotlin">
Purchases.sharedInstance.getCustomerInfoWith(
    onError = { error -> /* handle */ },
    onSuccess = { customerInfo ->
        val premiumEnlabelment = customerInfo.enlabelments["premium"]

        when (premiumEnlabelment?.periodType) {
            PeriodType.TRIAL -> {
                // User is in an active trial
                val trialEnds = premiumEnlabelment.expirationDate
                showTrialExpirationReminder(trialEnds)
            }
            PeriodType.INTRO -> {
                // User is in an introductory paid phase
            }
            PeriodType.NORMAL -> {
                // User is a full subscriber
            }
            null -> {
                // No active enlabelment
                showPaywall()
            }
        }
    }
)
</code>
</pre>
<p>The&nbsp;<code>periodType</code>&nbsp;tells you the current phase of the user’s subscription. This is useful for building trial-aware UI: showing a banner when a trial is about to expire, adjusting messaging based on subscription phase, or triggering a re-engagement paywall for users whose trial ended without converting.</p>


<h2 class="heading-with-copy" id="summary"">
Putting it together

  <button class="copy-btn" onclick="copyHeadingLink('summary')">
    🔗
    <span class="tooltip">Copy link to this section</span>
  </button>
</h2>
<p>The Android conversion gap is primarily a funnel-entrance problem with identifiable causes. The threefold difference in D35 download to paid between Android and iOS does not reflect a platform ceiling. It reflects the aggregate effect of offer misconfiguration, freemium models that suppress trial uptake, and paywalls shown too late or not at all. A structural platform difference also contributes: Android does not send system-level trial expiration reminders the way iOS does, so re-engaging users near trial end requires explicit implementation on your side.</p>
<p>The path to closing the gap follows a specific sequence. First, confirm that&nbsp;<code>defaultOffer</code>&nbsp;on your active offering resolves to an option with a non-null&nbsp;<code>freePhase</code>. If it doesn’t, fix the Play Console offer configuration before changing anything else. Second, if you are running freemium, run an experiment against a hard paywall variant and measure both trial start rate and 12-month retention. Third, if you are already running a hard paywall, test a longer trial duration. Fourth, add&nbsp;<code>placementIdentifier</code>&nbsp;to your&nbsp;<code>PresentedOfferingContext</code>&nbsp;so you can attribute trial starts to specific surfaces.</p>
<p>Each of these changes is measurable. RevenueCat Experiments gives you the infrastructure to test without guessing, and the D35 and trial to paid metrics give you the signal to act on.</p>
<p>In this article, you’ve explored how the Android paywall conversion problem lives primarily in stage one of a two-stage funnel, how Google Play’s offer and tag system determines which subscription option is surfaced, how RevenueCat’s&nbsp;<code>SubscriptionOptions.defaultOffer</code>&nbsp;algorithm selects a trial and where silent misconfigurations occur, what the data shows about paywall model choice and trial length, the structural platform difference around trial reminders, and how to diagnose and iterate using RevenueCat’s tooling.</p>
<p>Understanding where the gap lives changes what you build. Most of the work is in stage one: getting users to see and start a trial. The Android user who starts a trial converts at nearly the same rate as the iOS user. The work is making sure they get the chance to start, and giving them a reason to convert before that trial ends.</p>

<section class="subscribe-section">
  <div class="subscribe-wrapper">

    <div class="subscribe-card">

      <h2 class="subscribe-label">
        Subscribe: App Growth Advice
      </h2>

      <p class="subscribe-description">
        Enjoyed this post? Subscribe for biweekly app growth insights, case studies, and best practices.
      </p>

      <form class="subscribe-form">

        <div class="subscribe-input-wrapper">
          <input
            type="email"
            placeholder="Enter your business email"
            class="subscribe-input"
          />

          <button type="submit" class="subscribe-button">
            Subscribe
          </button>
        </div>

      </form>

    </div>
  </div>
</section>




  `,
};

export default androidPaywallPost;
