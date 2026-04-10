const aiSubscriptionMarginsPost = {
  id: "ai-subscription-margins",
  title:
    "AI features are eroding your subscription app’s margins — here’s how to fix it",
  category: "GROWTH",
  image: "/src/images/subscription.webp",

  toc: [
    {
      id: "user-engagement",
      label: "User engagement isn’t free anymore",
    },

    {
      id: "ai-spend-fix",
      label: "5 Ways to reduce AI spend in your app",
      children: [
        {
          id: "ai-infrastructure",
          label: "Apps should buy AI infrastructure, rather than build it",
        },
        {
          id: "ai-spend",
          label: "Treat AI usage like paid media spend",
        },
        {
          id: "cheap-model",
          label: "Use the cheapest AI model that gets the job done",
        },
        {
          id: "reuse-results",
          label: "Reuse AI results instead of regenerating them",
        },
        {
          id: "monetization",
          label: "Gate AI features behind monetization",
        },
      ],
    },

    {
      id: "unit-economics",
      label: "The unit economics of AI",
    },
    { id: "roi-question", label: "Is the AI feature worth the cost?" },

    {
      id: "retention",
      label: "Everyone is fixated on AI, but no one is fixing retention",
    },
    {
      id: "dashboard",
      label: "Reading AI’s value: AI cost belongs in your revenue dashboard",
    },
    { id: "blended-arpu", label: "Blended ARPU in hybrid monetization" },
    {
      id: "checklist",
      label: "Operator checklist: before shipping AI",
    },

    {
      id: "conclusion",
      label: "AI only works if the economics do",
    },
  ],

  content: `
  <p >
  On the hidden cost of AI features, and why you should treat AI usage like paid media spend
</p>
      <!-- 👇 ADD AUTHOR BLOCK HERE -->
  <div class="author-meta">
    <div class="author-left">
      <img src="/src/images/alice-muir-kocourkova.1.webp" alt="author" class="author-avatar" />
      <div class="author-info">
        <p class="author-name">Alice Muir Kocourkova</p>
      </div>
    </div>

    <div class="author-right">
      <span>
        Published <time class="publish-date">March 31, 2026</time>
      </span>
    </div>
  </div>

<section id="summary" class="summary">
  <h2>Summary</h2>

  <div class="summary-content">
    <p>
      AI features introduce variable costs that scale with user engagement, disrupting the near-zero marginal cost model of subscription apps. Protecting margins requires usage modeling, model optimization, caching strategies, and tiered AI access.
    </p>
  </div>
</section>
  
<p ">
  Right now, many subscription apps are adding AI features as quickly as possible. And it’s working — the product demo looks impressive, engagement spikes, the feature quickly becomes central to the app and user experience. But something else starts happening underneath the surface. With every generation, every prompt, and every “generate again” button click, the cost of serving your users is quietly (but rapidly) increasing.
</p>
<p>Working with several AI-powered subscription apps recently, I started noticing this pattern. The very behavior you are trying to encourage — more usage, more exploration, more interaction — can now compress your margins if monetization and infrastructure are not designed in tandem.&nbsp;</p>
<p>AI is not just another product feature. It is <em>infrastructure</em>. So if you’re not modeling AI usage against ARPU, churn, and LTV before you ship it, you may be <strong>increasing engagement while quietly destroying your economics</strong>.</p>


 <h2 class="heading-with-copy" id="user-engagement">
  User engagement isn’t free anymore

  <button class="copy-btn" onclick="copyHeadingLink('user-engagement')">
    🔗
    <span class="tooltip">Copy link</span>
  </button>
</h2>


<p>Subscription businesses are structurally efficient. Or they used to be. Once you’ve built the core product experience, the marginal cost of serving an additional subscriber inside the app is typically close to zero, and the economics compound as you scale. (Thomas Petit talks about this in his blog on <a href="https://www.revenuecat.com/blog/growth/ai-hybrid-monetization/#h-why-now-the-variable-cost-of-ai-is-an-ignition-towards-hybrid-monetization"><em>why hybrid monetization should now be the default for subscription apps</em></a><em>.</em>)</p>
<p>Subscription businesses are structurally efficient. Or they used to be. Once you’ve built the core product experience, the marginal cost of serving an additional subscriber inside the app is typically close to zero, and the economics compound as you scale. (Thomas Petit talks about this in his blog on <a href="https://www.revenuecat.com/blog/growth/ai-hybrid-monetization/#h-why-now-the-variable-cost-of-ai-is-an-ignition-towards-hybrid-monetization"><em>why hybrid monetization should now be the default for subscription apps</em></a><em>.</em>)</p>
<p>In short, your cost structure becomes inextricably linked to usage.&nbsp;</p>
<p>This creates a subtle but important tension — the same engagement you’ve worked so hard to increase now <strong>drives incremental cost</strong>. Higher engagement increases AI calls → more AI calls increase infrastructure spend. And unless revenue expands proportionally, your gross margin begins to shrink.&nbsp;</p>



 <h2 class="heading-with-copy" id="ai-spend-fix">
  5 Ways to reduce AI spend in your app

  <button class="copy-btn" onclick="copyHeadingLink('ai-spend-fix')">
    🔗
    <span class="tooltip">Copy link</span>
  </button>
</h2>

<p>So what does this mean? AI features are inherently a margin shrinker? No, not quite. AI means subscription businesses need to think more like cloud infrastructure businesses. Meaning usage is no longer just a growth metric, but also a cost driver.</p>

<h3 class="heading-with-copy" id="ai-infrastructure">
1. Apps should buy AI infrastructure, rather than build it

  <button class="copy-btn" onclick="copyHeadingLink('ai-infrastructure')">
    🔗
    <span class="tooltip">Copy link</span>
  </button>
</h3>
<p>I recently spoke with a portfolio Ops Manager working across several AI products and they described a familiar problem — the music generation API powering one of their apps became unstable, and suddenly even paying users couldn’t access the core feature. Complaints rose, reviews worsened, and monetization performance became harder to interpret.</p>
<p>This is what makes AI different from traditional app features. The question isn’t just whether users <em>want</em> the feature, it’s whether your infrastructure can deliver it reliably enough to support retention and revenue (without breaking your economics).</p>
<p>This is why I’d generally encourage thinking carefully about the infrastructure you choose. Training large datasets or creating your own models can make sense if you’re running a large-scale AI platform, but most subscription apps are far better served by using third-party APIs (e.g. Open AI’s ChatGPT, Google’s Gemini, Anthropic’s Claude) — particularly if you’re still experimenting with monetization and feature or <a href="https://www.revenuecat.com/blog/growth/product-market-fit-subscription-apps/">product-market fit</a>.</p>
<p>Running your own models introduces a number of challenges:</p>

<ul class="wp-block-list">
  <li>GPU overhead</li>
  <li>DevOps complexity</li>
  <li>Model maintenance risk</li>
  <li>Fixed monthly burn (regardless of usage)</li>
</ul>

<p>It’s a dangerous position to be in. So for many growth-stage subscription apps, using API-based foundation models makes more sense:&nbsp;</p>
<ol class="wp-block-list">
  <li>Paying per token converts AI into a variable cost that scales with actual usage</li>
  <li>If a feature fails to move install-to-paid conversion, trial starts, ARPU, or retention, you can shut it down and your cost disappears with it</li>
</ol>

<p>TL;DR: Variable cost preserves strategic agility. Fixed infrastructure locks you into experiments that may not justify themselves.</p>


<h2 class="heading-with-copy" id="ai-spend">
  2. Treat AI usage like paid media spend

  <button class="copy-btn" onclick="copyHeadingLink('ai-spend')">
    🔗
    <span class="tooltip">Copy link</span>
  </button>
</h2>

<p>
  Subscription teams are usually obsessive about acquisition cost. They track CAC, payback periods, and 
  <a href="http://revenuecat.com/blog/growth/creative-fatigue-mobile-apps-roas">ROAS</a> 
  down to the decimal. But many of the same teams treat AI usage casually, even though 
  <strong>AI tokens are just another form of spend</strong>.
</p>
<p>Every time a user triggers an AI feature, you pay for it. The longer the prompt, the longer the response, and the more often users hit ‘regenerate’, the higher your cost becomes. Think of it the same way you think about paid ads: every impression costs money, every click costs money. AI works the same way — every request has a price.</p>
<p>One AI team I spoke with saw this effect immediately when they changed their credit system. They moved from a restrictive daily allowance to a flexible monthly pool. Generation volume increased overnight. Some users burned through a large portion of their credits on the first day. The feature hadn’t changed, the <strong>usage constraints</strong> had. And with AI products, <strong>usage constraints directly affect infrastructure cost.</strong></p>
<p>Smart teams design AI features with cost in mind. They limit how long responses can be, and avoid unnecessary explanations from the model unless the user actually needs them. Small decisions here matter more than you think. For example, asking an AI model to write a 600-word explanation is far more expensive than asking it to return a structured, 30-word answer.</p>
<p>At scale, those choices can significantly reduce AI costs. Across millions of requests, that is not a small optimization. <strong>It is a meaningful gross margin lever.</strong></p>

<h3 class="heading-with-copy" id="cheap-models">
3. Use the cheapest AI model that gets the job done

  <button class="copy-btn" onclick="copyHeadingLink('cheap-models')">
    🔗
    <span class="tooltip">Copy link</span>
  </button>
</h3>

<p>Another common cost leak is sending every AI request to the most powerful model available. It feels safe. Teams assume the best model will produce the best experience. But in many cases, it just produces the highest bill.</p>
<p>Not every task requires a powerful model. Many AI features are doing relatively simple work; things like tagging content, formatting text, summarizing information, or generating short outputs. Smaller, cheaper models can handle these tasks perfectly well and deliver the same user satisfaction. Users won’t be able to tell the difference between a premium and mid-tier model, but your infrastructure bill will definitely show it.</p>
<p><strong>Reserve expensive models for complex work that genuinely requires deeper reasoning, and use cheaper models for everything else.</strong> Choosing the right model for each task is one of the highest-leverage cost optimizations available to AI-powered apps.</p>

<h3 class="heading-with-copy" id="reuse-results">
4. Reuse AI results instead of regenerating them

  <button class="copy-btn" onclick="copyHeadingLink('reuse-results')">
    🔗
    <span class="tooltip">Copy link</span>
  </button>
</h3>
<p>User behavior is more repetitive than most teams expect. Especially in productivity and utility apps, users tend to ask for the same kinds of things again and again. Similar prompts, similar transformations, similar workflows. If your app generates a brand new AI response every time, you may be paying repeatedly for answers that have already been generated. Similarly, users may ask something then come back another time and ask again, rather than scrolling back to find the original conversation.&nbsp;</p>
<p>These are prime times to <strong>reuse results whenever possible</strong>: save common outputs, store reusable templates, and pre-generate responses for frequent requests so they can be served instantly instead of regenerated. Even small improvements here can have a big impact. If you can reuse results for just 20% of requests, your AI costs can drop significantly.</p>

<h3 class="heading-with-copy" id="monetization">
5. Gate AI features behind monetization

  <button class="copy-btn" onclick="copyHeadingLink('monetization')">
    🔗
    <span class="tooltip">Copy link</span>
  </button>
</h3>
<p>We’re already seeing a pattern of apps limiting AI usage in their free tier and gating advanced capabilities behind subscription plans — typically spread across pricing tiers to reflect compute cost, as well. Changes like this are not shocking to users, but can make a big financial impact to you.</p>
<p>Some apps even implement daily or monthly usage caps to prevent a small group of heavy users from driving disproportionate infrastructure cost. Consider a heavy AI user that costs you $0.15 per month, but later purchases an annual plan that generates $29.99; the economics are comfortable. But if that same user never converts and continues consuming AI indefinitely, the economics quietly deteriorate.</p>
<p>One team I spoke with introduced a quota system in their AI-powered learning product. New users received an initial credit allowance, with additional usage unlocked through paid packages. Models like this understand that usage and cost are relative.&nbsp;</p>
<p>Another AI app team I worked with chose not to offer a traditional free trial, since trial users were able to generate large volumes of output, consume API cost, then churn before ever paying. Instead, the team tested a one-time credit allowance that let users evaluate the quality of the product without exposing the business to unlimited inference cost.</p>
<p>The real risk with free AI credits is not simply that users use them. It’s that they use them before the product is good enough to make them convert. In that case, you’re funding churn, not activation.</p>
<p>This is what makes <a href="https://www.revenuecat.com/blog/growth/ai-subscription-app-pricing/">AI monetization for subscription apps</a> fundamentally different from traditional subscription packaging — you’re not just pricing access to value. Every change made to monetization or pricing and packaging affects a wider infrastructure economy. Usage and retention analysis are invaluable; work to understand who uses what, how often, and why, then revisit your P&amp;P and compute costs hand-in-hand.&nbsp;</p>

 <h2 class="heading-with-copy" id="unit-economics">
 The unit economics of AI

  <button class="copy-btn" onclick="copyHeadingLink('unit-economics')">
    🔗
    <span class="tooltip">Copy link</span>
  </button>
</h2>
<p>Assume you have a subscription app with these stats:</p>

<ul class="wp-block-list">
  <li>Monthly ARPU: $6.00 </li>
  <li>Normalized annual ARPU: $4.20</li>
  <li>Blended ARPU across the user base: $5.10</li>
  <li>Monthly churn: 5% </li>
  <li>Gross margin (before AI): 85% </li>

</ul>
<p>You then introduce an AI feature. The average AI-active user makes 10 requests per month, each consuming 1,000 tokens. Each token costs you $0.002, making the cost per active AI user (and 1,000 tokens) $0.02.</p>
<p>With 300,000 MAU and 15 percent AI engagement, you have 45,000 AI-active users. That results in a monthly AI cost of $900, or $10,800 annually. That is manageable.</p>
<p><em>Now</em> imagine usage increases and routing shifts toward more expensive models. Cost per active AI user rises to $0.10 per month. With the same 45,000 AI-active users, monthly cost becomes $4,500, or $54,000 annually.&nbsp;</p>
<p>Whether or not that sounds like a lot depends on many factors. But ultimately, it depends on whether the AI feature increases LTV more than it increases cost per user. In other words…&nbsp;</p>


 <h2 class="heading-with-copy" id="roi-question">
 Is the AI feature worth the cost?

  <button class="copy-btn" onclick="copyHeadingLink('roi-question')">
    🔗
    <span class="tooltip">Copy link</span>
  </button>
</h2>
<p>Suppose install-to-paid conversion is 4% across one million annual installs, producing 40,000 paying users. With an average LTV of $42, baseline annual subscription revenue is $1.68 million.</p>
<p>If the AI feature increases install-to-paid conversion by just 0.5 percentage points, paid users rise to 45,000. That is 5,000 incremental subscribers, representing $210,000 in additional revenue.</p>
<p>Against $54,000 in annual AI infrastructure cost, the feature generates far more revenue than it costs to run. Ergo, <strong>it’s worth the cost</strong>.&nbsp;</p>
<p>However, if conversion doesn’t move <em>enough </em>and retention does not improve, <strong>you’re spending $54,000 to increase engagement metrics that do not affect revenue</strong>. Gross margin declines, contribution margin per MAU shrinks, and the feature becomes an expensive distraction.</p>
<p>This is how AI quietly kills subscription businesses.</p>


 <h2 class="heading-with-copy" id="retention">
Everyone is fixated on AI, but no one is fixing retention

  <button class="copy-btn" onclick="copyHeadingLink('retention')">
    🔗
    <span class="tooltip">Copy link</span>
  </button>
</h2>
Everyone is fixated on AI, but no one is fixing retention

<p>Does this mean AI needs to increase conversion in order to justify its cost? Ideally, yes. But it can also improve retention.&nbsp;</p>
<p>With monthly ARPU of $6 and churn of 5%, theoretical steady-state LTV is approximately $120. If AI reduces churn to 4.6%, LTV rises to roughly $130. That is a $10 increase per subscriber, and across 20,000 subscribers, that’s $200,000 in incremental value.</p>
<p>Going back to the original figure, if AI costs $54,000 annually but produces even modest retention improvements (in the example, a 0.4% reduction), <strong>it can be one of the highest-return investments available</strong>.&nbsp;</p>
<p>Before getting too excited and adding new AI features, it’s worth remembering that retention improvements need to be observed in cohort data, not inferred from engagement alone. The improvements from AI need to be <em>measurable</em>.</p>

 <h2 class="heading-with-copy" id="dashboard">
Reading AI’s value: AI cost belongs in your revenue dashboard

  <button class="copy-btn" onclick="copyHeadingLink('dashboard')">
    🔗
    <span class="tooltip">Copy link</span>
  </button>
</h2>
<p>RevenueCat already gives you a clear view of the metrics that drive subscription performance: ARPU, churn, LTV, and cohort retention. That’s half of the puzzle. If your app includes AI features, you need to be analyzing your AI infrastructure costs alongside those metrics.</p>
<p>In practice, this means combining your AI usage data with your subscription metrics to understand how usage affects margins.</p>
<p>You should know things like:</p>
<ul class="wp-block-list">
  <li>AI cost per MAU </li>
  <li>AI cost per AI-active user</li>
  <li>AI cost per paying user</li>
  <li>AI cost as a percentage of ARPU</li>
  <li>AI cost relative to blended ARPU</li>

</ul>
<p>Looking at these numbers next to your subscription metrics makes it much easier to understand whether AI is strengthening your business or quietly eroding your margins.</p>
<p>At $6 ARPU and $0.18 AI cost, you’re spending ~3% of revenue. Fine. At $3.50 ARPU and $0.60 cost, that jumps to 17%. That’s not a feature cost, it’s a structural margin problem.</p>

 <h2 class="heading-with-copy" id="blended-arpu">
Blended ARPU in hybrid monetization

  <button class="copy-btn" onclick="copyHeadingLink('blended-arpu')">
    🔗
    <span class="tooltip">Copy link</span>
  </button>
</h2>
<p>In <a href="https://www.revenuecat.com/blog/growth/hybrid-monetization-techniques/">hybrid monetization models</a> combining ads and subscriptions, the analysis becomes more nuanced — if AI cost applies broadly to free users as well as subscribers, then cost per MAU needs to be evaluated against blended ARPU.</p>
<p>Putting that into numbers, imagine subscriber ARPU is $6, ad ARPU is $0.20, and blended ARPU across MAU is $0.95. If AI costs $0.06 per MAU, then that is ~6% of revenue. If AI costs $0.20 per MAU, it consumes &gt;20% of blended revenue.</p>
<p>Analyzing the metrics is crucial in understanding how AI is reshaping your monetization model. Hybrid operators must be especially disciplined in protecting blended margin, but any teams working with AI features must be conscious of how it impacts margins.&nbsp;</p>



 <h2 class="heading-with-copy" id="checklist">
Operator checklist: before shipping AI

  <button class="copy-btn" onclick="copyHeadingLink('checklist')">
    🔗
    <span class="tooltip">Copy link</span>
  </button>
</h2>
<p>Before launching any AI feature, you should be able to answer the following <strong>with numbers</strong>:</p>
<ul class="wp-block-list">
<li>Which metric are you targeting? Install-to-paid conversion, trial starts, trial conversion, retention, or ARPU expansion?</li>



<li>What lift do you hypothesize? A 0.3 conversion increase? A 0.2 churn reduction?</li>



<li>What is the projected AI cost per active user and per paying user?</li>



<li>What percentage of ARPU will AI consume at expected usage levels?</li>



<li>At what usage threshold does AI push gross margin below your acceptable range?</li>
</ul>



<h2 class="heading-with-copy" id="conclusion">
AI only works if the economics do

  <button class="copy-btn" onclick="copyHeadingLink('conclusion')">
    🔗
    <span class="tooltip">Copy link</span>
  </button>
</h2>
<p>For years, subscription apps benefited from a simple economic model, and more engagement usually meant more value and better retention, with barely any increased cost. AI has changed that for good.</p>
<p>This doesn’t mean AI is bad for subscription businesses. In many cases, it can improve retention, increase conversion, and expand LTV. But those outcomes aren’t guarantees; they happen <strong>when teams treat AI as both a product feature and a cost layer</strong>.</p>
<p>Teams need to manage AI the same way they manage acquisition spend or infrastructure. Reuse results, route tasks to cheaper models, gate access behind monetization, and track AI cost alongside subscription metrics like ARPU and LTV. The most successful AI apps are not simply adding features, they are designing the entire system around the economics of usage.</p>



<section class="subscribe-section">
  <div class="subscribe-wrapper">

    <div class="subscribe-card">

      <h2 class="subscribe-title">
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

export default aiSubscriptionMarginsPost;
