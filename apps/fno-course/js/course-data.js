const COURSE = {
  title: "F&O Master Course",
  subtitle: "Stock Market Futures & Options — A to Z",
  modules: [
    {
      id: "m1",
      title: "Stock Market Basics",
      titleTe: "stock market parichayam",
      icon: "🏦",
      color: "#3B82F6",
      lessons: [
        {
          id: "m1l1",
          title: "What is Stock Market?",
          titleTe: "stock market antey emiti?",
          content: `<p><strong>Stock Market</strong> antey companies shares buy & sell chese marketplace. India lo <strong>NSE</strong> (National Stock Exchange) mariyu <strong>BSE</strong> (Bombay Stock Exchange) rendu pradhanam exchanges.</p>
          <p>meeru company lo shareholder avutharu — antey aa company yokka bhagaswami. Share price company performance, news, demand-supply pai depend avuthundi.</p>`,
          keyPoints: ["NSE & BSE — India's main exchanges", "Share = company ownership", "Price changes based on demand & supply", "SEBI regulates Indian markets"],
          example: "Reliance Industries share NSE lo RELIANCE ani trade avuthundi. oka share konnaru antey Reliance lo chinna bhagam meedi."
        },
        {
          id: "m1l2",
          title: "How Trading Works",
          titleTe: "Trading ela pani chesthundi?",
          content: `<p>Trading account (Groww, Zerodha, etc.) open chesi demat account link cheyali. Order types:</p>
          <ul>
            <li><strong>Market Order</strong> — current price lo instant buy/sell</li>
            <li><strong>Limit Order</strong> — meeru specify chesina price lo trade</li>
            <li><strong>Stop Loss (SL)</strong> — loss limit cheyadaniki automatic sell</li>
          </ul>
          <p>Trading hours: <strong>9:15 AM – 3:30 PM</strong> (Mon–Fri). Pre-market: 9:00–9:15 AM.</p>`,
          keyPoints: ["Demat + Trading account required", "Market, Limit, Stop Loss orders", "Market hours: 9:15 AM – 3:30 PM", "T+1 settlement for equity"],
          example: "Nifty 22,000 lo undi. Limit order ₹21,950 lo place chesaru — price adhiki reach ayithe buy avuthundi."
        },
        {
          id: "m1l3",
          title: "Indices — Nifty & Sensex",
          titleTe: "Indices — Nifty & Sensex",
          content: `<p><strong>Nifty 50</strong> — NSE lo top 50 companies index. <strong>Sensex</strong> — BSE lo top 30 companies.</p>
          <p>Index market sentiment choopisthundi. F&O trading lo Nifty & Bank Nifty athyamtha popular.</p>
          <p><strong>Bank Nifty</strong> — banking sector 12 stocks. High volatility, F&O traders ki favorite.</p>`,
          keyPoints: ["Nifty 50 = top 50 NSE stocks", "Sensex = top 30 BSE stocks", "Bank Nifty = banking sector index", "F&O mostly on indices & stocks"],
          example: "Nifty 22,500 antey top 50 companies weighted average value ₹22,500 level lo undi."
        },
        {
          id: "m1l4",
          title: "Bull vs Bear Market",
          titleTe: "Bull vs Bear Market",
          content: `<p><strong>Bull Market 🐂</strong> — prices paiki velthunnayi, optimism. Buy & hold strategy.</p>
          <p><strong>Bear Market 🐻</strong> — prices kindaku velthunnayi, pessimism. Short selling / hedging.</p>
          <p>F&O lo bear market lo kooda profit cheyavachchu — options & futures dwaara.</p>`,
          keyPoints: ["Bull = rising market, optimism", "Bear = falling market, pessimism", "F&O allows profit in both directions", "Trend identification is key"],
          example: "2020 COVID crash — Bear market. Nifty 12,000 nundi 7,500 ki padindhi. Put options holders profit chesaru."
        }
      ],
      quiz: [
        { q: "India lo pradhanam stock exchange edi?", options: ["NYSE", "NSE", "LSE", "TSE"], answer: 1 },
        { q: "Nifty 50 enni companies?", options: ["30", "50", "100", "200"], answer: 1 },
        { q: "Market trading hours?", options: ["8 AM – 4 PM", "9:15 AM – 3:30 PM", "10 AM – 5 PM", "24 hours"], answer: 1 },
        { q: "bull market antey?", options: ["Falling prices", "Rising prices", "No change", "High volatility only"], answer: 1 }
      ]
    },
    {
      id: "m2",
      title: "Introduction to Derivatives",
      titleTe: "derivatives parichayam",
      icon: "📊",
      color: "#8B5CF6",
      lessons: [
        {
          id: "m2l1",
          title: "What are Derivatives?",
          titleTe: "derivatives antey emiti?",
          content: `<p><strong>Derivative</strong> — underlying asset (stock, index) value pai based unde contract. Direct asset konadam kaadhu, contract konadam.</p>
          <p>India lo derivatives: <strong>Futures</strong> & <strong>Options</strong> (F&O). NSE F&O segment lo daily crores of turnover.</p>`,
          keyPoints: ["Derivative = contract based on underlying asset", "F&O = Futures + Options", "Traded on NSE & BSE F&O segment", "Higher risk, higher reward potential"],
          example: "Nifty Futures — Nifty index value pai based. Nifty paiki veltethe futures value kooda paiki."
        },
        {
          id: "m2l2",
          title: "Why Trade F&O?",
          titleTe: "F&O enduku trade cheyali?",
          content: `<p><strong>1. Leverage</strong> — thakkuva capital tho ekkuva exposure.</p>
          <p><strong>2. Hedging</strong> — existing portfolio protect cheyadam.</p>
          <p><strong>3. Speculation</strong> — direction predict chesi profit.</p>
          <p><strong>4. Both directions</strong> — market paiki ledha kindaku veltethe kooda profit.</p>`,
          keyPoints: ["Leverage — more with less capital", "Hedging — protect portfolio", "Speculation — profit from predictions", "Profit in rising AND falling markets"],
          example: "₹10L portfolio undi. Nifty Put buy chesi crash nundi protect cheyavachchu — hedging."
        },
        {
          id: "m2l3",
          title: "F&O vs Equity Trading",
          titleTe: "F&O vs Equity Trading",
          content: `<table class="compare-table">
            <tr><th>Feature</th><th>Equity</th><th>F&O</th></tr>
            <tr><td>Ownership</td><td>Yes — shareholder</td><td>No — contract only</td></tr>
            <tr><td>Expiry</td><td>No expiry</td><td>Monthly expiry</td></tr>
            <tr><td>Leverage</td><td>1x (full payment)</td><td>5-15x margin</td></tr>
            <tr><td>Risk</td><td>Limited to investment</td><td>Can lose more than margin</td></tr>
            <tr><td>Direction</td><td>Only profit when up</td><td>Profit up or down</td></tr>
          </table>`,
          keyPoints: ["Equity = ownership, no expiry", "F&O = contract, has expiry", "F&O has leverage (margin)", "F&O risk is higher"],
          example: "Equity: ₹1000 stock konnaru, max loss ₹1000. F&O: ₹50,000 margin, loss unlimited theoretically."
        }
      ],
      quiz: [
        { q: "F&O antey?", options: ["Fixed & Open", "Futures & Options", "Fund & Operations", "Fast & Online"], answer: 1 },
        { q: "Derivatives lo underlying asset undadha?", options: ["avunu", "kaadhu", "Sometimes", "Only in options"], answer: 0 },
        { q: "F&O lo leverage antey?", options: ["No risk", "Less capital, more exposure", "Free money", "Only for experts"], answer: 1 }
      ]
    },
    {
      id: "m3",
      title: "Futures Trading",
      titleTe: "futures trading",
      icon: "📅",
      color: "#10B981",
      lessons: [
        {
          id: "m3l1",
          title: "What is a Futures Contract?",
          titleTe: "Futures Contract antey emiti?",
          content: `<p><strong>Futures</strong> — oka specific price lo future date lo buy/sell cheyadaniki agreement. Expiry date untundi.</p>
          <p>Components: <strong>Underlying</strong> (Nifty, Reliance), <strong>Lot Size</strong>, <strong>Expiry Date</strong>, <strong>Price</strong>.</p>
          <p>Nifty Futures lot size = <strong>25</strong> (2024 onwards). Bank Nifty = <strong>15</strong>.</p>`,
          keyPoints: ["Agreement to buy/sell at future date", "Has fixed expiry (monthly)", "Lot size determines quantity", "Nifty lot = 25, Bank Nifty = 15"],
          example: "Nifty Dec Futures 22,500 — Dec last Thursday expiry. 1 lot = 25 × Nifty value."
        },
        {
          id: "m3l2",
          title: "Long & Short in Futures",
          titleTe: "Long & Short in Futures",
          content: `<p><strong>Long (Buy)</strong> — price paiki velthundi ani expect. Buy low, sell high.</p>
          <p><strong>Short (Sell)</strong> — price kindaku velthundi ani expect. Sell high, buy low.</p>
          <p>futures lo short selling easy — equity lo kante simple. Margin required both sides.</p>`,
          keyPoints: ["Long = Buy, profit when price rises", "Short = Sell, profit when price falls", "Both need margin deposit", "Short selling easier in F&O than equity"],
          example: "Nifty 22,500 lo Short chesaru. 22,000 ki padindhi — 500 points × 25 = ₹12,500 profit per lot."
        },
        {
          id: "m3l3",
          title: "Expiry & Rollover",
          titleTe: "Expiry & Rollover",
          content: `<p><strong>Expiry</strong> — contract last valid date. NSE F&O: <strong>Last Thursday</strong> of every month.</p>
          <p>Expiry day high volatility! Positions close cheyali ledha <strong>rollover</strong> (next month contract ki shift) cheyali.</p>
          <p>Weekly expiry: Nifty & Bank Nifty — every <strong>Thursday</strong> (weekly contracts available).</p>`,
          keyPoints: ["Monthly expiry: Last Thursday", "Weekly expiry available for indices", "Rollover = shift to next month", "Expiry day = high volatility"],
          example: "Nov 28 expiry gadichindhi. Position hold cheyalante Dec futures ki rollover cheyali."
        },
        {
          id: "m3l4",
          title: "Mark to Market (MTM)",
          titleTe: "Mark to Market (MTM)",
          content: `<p><strong>MTM</strong> — daily profit/loss settlement. prathi roju market close lo unrealized P&L account lo reflect avuthundi.</p>
          <p>Profit ayithe margin account lo add, loss ayithe deduct. Margin call — loss ekkuva ayithe extra margin deposit cheyali.</p>`,
          keyPoints: ["Daily P&L settlement", "Profit added, loss deducted daily", "Margin call if losses exceed limit", "Track MTM in broker app"],
          example: "Nifty Futures long, day lo +200 points. MTM = 200 × 25 = ₹5,000 profit (same day credited)."
        }
      ],
      quiz: [
        { q: "Nifty Futures lot size?", options: ["10", "25", "50", "100"], answer: 1 },
        { q: "F&O monthly expiry e roju?", options: ["First Monday", "Last Thursday", "Last Friday", "15th of month"], answer: 1 },
        { q: "short position antey?", options: ["Buy expecting rise", "Sell expecting fall", "Hold forever", "No margin needed"], answer: 1 },
        { q: "MTM antey?", options: ["Monthly Tax", "Mark to Market — daily P&L", "Market Timing", "Maximum Trade Margin"], answer: 1 }
      ]
    },
    {
      id: "m4",
      title: "Options Basics",
      titleTe: "options parichayam",
      icon: "⚡",
      color: "#F59E0B",
      lessons: [
        {
          id: "m4l1",
          title: "What is an Option?",
          titleTe: "option antey emiti?",
          content: `<p><strong>Option</strong> — right (not obligation) to buy/sell at specific price before expiry. Premium pay chesi right konadam.</p>
          <p>Two types: <strong>Call Option (CE)</strong> — buy right. <strong>Put Option (PE)</strong> — sell right.</p>
          <p>Option buyer risk = premium paid only. Seller risk = unlimited (theoretically).</p>`,
          keyPoints: ["Right, not obligation", "Call (CE) = Buy right", "Put (PE) = Sell right", "Buyer risk limited to premium"],
          example: "Nifty 22,500 CE premium ₹150. Nifty 23,000 ki veltethe — (23000-22500) - 150 = ₹350 profit per unit."
        },
        {
          id: "m4l2",
          title: "Call Option (CE) Explained",
          titleTe: "call option (CE) vivarana",
          content: `<p><strong>Call Option</strong> — underlying price paiki velthundi ani expect chesi buy chestharu.</p>
          <p>Bullish trade. Strike price lo buy right untundi. Nifty paiki veltethe profit.</p>
          <p>Max loss = premium paid. Unlimited profit potential (theoretically).</p>`,
          keyPoints: ["CE = Call Option = Buy right", "Bullish — expect price to rise", "Max loss = premium only", "Profit when price > strike + premium"],
          example: "Nifty 22,500 CE @ ₹150. Nifty 23,000 ayithe: Intrinsic value = 500, Profit = 500-150 = ₹350/unit."
        },
        {
          id: "m4l3",
          title: "Put Option (PE) Explained",
          titleTe: "put option (PE) vivarana",
          content: `<p><strong>Put Option</strong> — underlying price kindaku velthundi ani expect chesi buy chestharu.</p>
          <p>Bearish trade. Strike price lo sell right untundi. Nifty kindaku veltethe profit.</p>
          <p>Crash protection kosam portfolio holders Put options buy chestharu — insurance laaga.</p>`,
          keyPoints: ["PE = Put Option = Sell right", "Bearish — expect price to fall", "Max loss = premium only", "Used for hedging portfolio"],
          example: "Nifty 22,500 PE @ ₹120. Nifty 21,500 ayithe: Intrinsic = 1000, Profit = 1000-120 = ₹880/unit."
        },
        {
          id: "m4l4",
          title: "Strike Price & Premium",
          titleTe: "Strike Price & Premium",
          content: `<p><strong>Strike Price</strong> — option contract lo agreed price. Nifty 22,500 CE antey 22,500 strike.</p>
          <p><strong>Premium</strong> — option konadaniki pay chese price. Demand, time, volatility pai depend.</p>
          <p><strong>ITM</strong> (In The Money) — profitable strike. <strong>ATM</strong> (At The Money) — current price near strike. <strong>OTM</strong> (Out of The Money) — not yet profitable.</p>`,
          keyPoints: ["Strike = agreed buy/sell price", "Premium = option purchase price", "ITM, ATM, OTM classifications", "OTM options cheaper but riskier"],
          example: "Nifty 22,500. 22,500 CE = ATM. 22,000 CE = ITM. 23,000 CE = OTM (cheaper premium)."
        }
      ],
      quiz: [
        { q: "Call Option (CE) eppudu use chestharu?", options: ["Price fall expect", "Price rise expect", "No change", "Only expiry day"], answer: 1 },
        { q: "Option buyer max loss?", options: ["Unlimited", "Premium paid", "Strike price", "Lot size"], answer: 1 },
        { q: "ATM antey?", options: ["At The Money", "All Time Maximum", "After Trade Market", "Automatic Trade Mode"], answer: 0 },
        { q: "Put Option bullish or bearish?", options: ["Bullish", "Bearish", "Neutral", "Both"], answer: 1 }
      ]
    },
    {
      id: "m5",
      title: "Option Chain & Pricing",
      titleTe: "option chain & pricing",
      icon: "🔗",
      color: "#EF4444",
      lessons: [
        {
          id: "m5l1",
          title: "Reading Option Chain",
          titleTe: "Option Chain chadavadam",
          content: `<p><strong>Option Chain</strong> — anni strikes lo CE & PE data table. Columns: OI (Open Interest), Volume, LTP, IV, Bid/Ask.</p>
          <p><strong>OI (Open Interest)</strong> — open contracts count. High OI = strong support/resistance level.</p>
          <p><strong>PCR (Put-Call Ratio)</strong> — total PE OI / total CE OI. PCR > 1 = bearish sentiment.</p>`,
          keyPoints: ["Option chain shows all strikes", "OI indicates support/resistance", "Volume = today's trading activity", "PCR indicates market sentiment"],
          example: "Nifty 22,500 lo highest PE OI — strong support. 23,000 highest CE OI — resistance."
        },
        {
          id: "m5l2",
          title: "Intrinsic & Time Value",
          titleTe: "Intrinsic & Time Value",
          content: `<p><strong>Option Premium = Intrinsic Value + Time Value</strong></p>
          <p><strong>Intrinsic Value</strong> — ITM ayithe actual profit value. OTM ayithe zero.</p>
          <p><strong>Time Value</strong> — expiry varaku time unna value. Expiry daggaraaga time value decay avuthundi — <strong>Theta decay</strong>.</p>`,
          keyPoints: ["Premium = Intrinsic + Time Value", "Intrinsic = actual profit if exercised", "Time value decays near expiry", "OTM options lose value fast near expiry"],
          example: "Nifty 22,500 CE, Nifty 23,000. Intrinsic = 500. Premium ₹600 ayithe Time Value = ₹100."
        },
        {
          id: "m5l3",
          title: "Implied Volatility (IV)",
          titleTe: "Implied Volatility (IV)",
          content: `<p><strong>IV</strong> — market's expectation of future price movement. High IV = expensive options. Low IV = cheap options.</p>
          <p>Before events (Budget, RBI policy, results) IV spikes. After event IV crush — premium drops sharply.</p>
          <p><strong>IV Rank / IV Percentile</strong> — current IV vs historical. High IV rank = options expensive, selling favorable.</p>`,
          keyPoints: ["IV = expected future volatility", "High IV = expensive premiums", "IV crush after major events", "Sell options when IV is high"],
          example: "Budget day mundhu Nifty CE premium ₹300. Budget announcement tharuvatha IV crush — premium ₹80 ki padindhi."
        }
      ],
      quiz: [
        { q: "OI antey?", options: ["Order Interest", "Open Interest", "Option Index", "Online Investment"], answer: 1 },
        { q: "time value expiry daggara?", options: ["Increases", "Decreases (decay)", "Same", "Doubles"], answer: 1 },
        { q: "high IV antey?", options: ["Cheap options", "Expensive options", "No change", "Market closed"], answer: 1 }
      ]
    },
    {
      id: "m6",
      title: "Option Greeks",
      titleTe: "option greeks",
      icon: "🔢",
      color: "#6366F1",
      lessons: [
        {
          id: "m6l1",
          title: "Delta — Direction Sensitivity",
          titleTe: "delta — disha sunnithathvam",
          content: `<p><strong>Delta (Δ)</strong> — underlying ₹1 move ayithe option price entha change. Range: 0 to 1 (CE), -1 to 0 (PE).</p>
          <p>ATM option delta ≈ 0.5 (CE). Deep ITM ≈ 1. Deep OTM ≈ 0.</p>
          <p>Delta also = probability of expiring ITM (approximate).</p>`,
          keyPoints: ["Delta = price sensitivity to underlying", "CE delta: 0 to 1", "PE delta: -1 to 0", "ATM delta ≈ 0.5"],
          example: "Nifty CE delta 0.6. Nifty +100 points → option premium +₹60 (approximately)."
        },
        {
          id: "m6l2",
          title: "Theta — Time Decay",
          titleTe: "theta — samaya kshineetha",
          content: `<p><strong>Theta (Θ)</strong> — prathi roju option value entha kshineesthundi. option buyers ki enemy, sellers ki friend.</p>
          <p>Last week expiry daggaraaga theta decay fastest. OTM options expire worthless quickly.</p>`,
          keyPoints: ["Theta = daily time decay", "Bad for option buyers", "Good for option sellers", "Fastest decay in last week"],
          example: "Option theta -₹15. prathi roju market flat ayithe kooda ₹15 premium lose avuthundi."
        },
        {
          id: "m6l3",
          title: "Gamma, Vega & Rho",
          titleTe: "Gamma, Vega & Rho",
          content: `<p><strong>Gamma (Γ)</strong> — delta entha fast change avuthundi. High near ATM.</p>
          <p><strong>Vega (ν)</strong> — IV 1% change ayithe option price change. High IV = high vega.</p>
          <p><strong>Rho (ρ)</strong> — interest rate sensitivity. Less important for short-term traders.</p>`,
          keyPoints: ["Gamma = rate of delta change", "Vega = sensitivity to IV changes", "Rho = interest rate sensitivity", "Gamma highest near ATM"],
          example: "Vega 5. IV 20% nundi 22% (+2%) → option premium +₹10 (5×2)."
        }
      ],
      quiz: [
        { q: "delta 0.5 antey?", options: ["50% price move", "Half point move per ₹1 underlying", "50% probability ITM", "Both B and C approximate"], answer: 3 },
        { q: "Theta decay eppudu fastest?", options: ["Beginning of month", "Last week before expiry", "After expiry", "Never"], answer: 1 },
        { q: "Vega measures sensitivity to?", options: ["Time", "Interest rates", "Implied Volatility", "Delta"], answer: 2 }
      ]
    },
    {
      id: "m7",
      title: "Margin & Leverage",
      titleTe: "margin & leverage",
      icon: "💰",
      color: "#14B8A6",
      lessons: [
        {
          id: "m7l1",
          title: "What is Margin?",
          titleTe: "margin antey emiti?",
          content: `<p><strong>Margin</strong> — broker ki deposit chese security amount. Full contract value kaadhu, fraction pay chesi trade.</p>
          <p><strong>SPAN Margin</strong> — exchange calculated minimum margin. <strong>Exposure Margin</strong> — additional buffer.</p>
          <p>Nifty Futures margin ≈ ₹1.5-2L per lot (varies). Options buying — full premium as margin.</p>`,
          keyPoints: ["Margin = security deposit for trade", "SPAN + Exposure margin required", "Futures need ~10-15% of contract value", "Options buying = premium amount only"],
          example: "Nifty 22,500 × 25 = ₹5.6L contract value. Margin ~₹1.8L (about 32%)."
        },
        {
          id: "m7l2",
          title: "Leverage — Double Edged Sword",
          titleTe: "leverage — rendu vaalla katthi",
          content: `<p><strong>Leverage</strong> — thakkuva money tho ekkuva position. Profit amplify avuthundi, loss kooda!</p>
          <p>5x leverage: 1% move = 5% P&L on your capital. -2% move = -10% capital loss.</p>
          <p>⚠️ Over-leveraging = account wipe out. Always use stop loss!</p>`,
          keyPoints: ["Leverage amplifies both profit AND loss", "5x leverage = 5x P&L impact", "Never use full margin", "Always keep stop loss"],
          example: "₹1L capital, ₹5L position (5x). 2% adverse move = ₹10,000 loss = 10% capital gone."
        },
        {
          id: "m7l3",
          title: "Margin Call & Square Off",
          titleTe: "Margin Call & Square Off",
          content: `<p><strong>Margin Call</strong> — losses margin limit cross ayithe broker extra funds ask chestharu.</p>
          <p>Pay cheyakapothe <strong>auto square-off</strong> — broker force close your position. Big loss!</p>
          <p>Always maintain 30-40% extra margin buffer. Never trade with 100% utilized margin.</p>`,
          keyPoints: ["Margin call when losses exceed limit", "Auto square-off if not funded", "Keep 30-40% margin buffer", "Never max out margin"],
          example: "₹2L margin, loss ₹1.8L. Broker margin call. ₹50K add cheyakapothe position auto close."
        }
      ],
      quiz: [
        { q: "F&O margin antey?", options: ["Broker fee", "Security deposit", "Profit share", "Tax amount"], answer: 1 },
        { q: "5x leverage, 2% adverse move = ?", options: ["2% loss", "5% loss", "10% loss", "No loss"], answer: 2 },
        { q: "margin call ignore chesthe?", options: ["Nothing", "Auto square-off", "Free money", "Bonus shares"], answer: 1 }
      ]
    },
    {
      id: "m8",
      title: "Basic Trading Strategies",
      titleTe: "prathamaika trading vyoohalu",
      icon: "🎯",
      color: "#EC4899",
      lessons: [
        {
          id: "m8l1",
          title: "Buy CE / Buy PE — Directional",
          titleTe: "buy CE / buy PE — disha vyooham",
          content: `<p>Simplest strategies — direction predict chesi option buy.</p>
          <p><strong>Buy CE</strong> — Bullish. Nifty paiki velthundi ani think.</p>
          <p><strong>Buy PE</strong> — Bearish. Nifty kindaku velthundi ani think.</p>
          <p>⚠️ Time decay against you. Quick move kaavaali. Stop loss must!</p>`,
          keyPoints: ["Buy CE = Bullish bet", "Buy PE = Bearish bet", "Time decay works against buyer", "Need quick directional move"],
          example: "Budget day bullish expect → Nifty ATM CE buy. Gap up ayithe profit, flat ayithe theta loss."
        },
        {
          id: "m8l2",
          title: "Bull Call Spread",
          titleTe: "Bull Call Spread",
          content: `<p><strong>Bull Call Spread</strong> — ATM CE buy + OTM CE sell. Cost reduce, profit capped.</p>
          <p>Example: Buy 22,500 CE + Sell 23,000 CE. Net premium pay. Max profit = strike difference - net premium.</p>
          <p>Lower risk than naked CE buy. Limited profit but also limited loss.</p>`,
          keyPoints: ["Buy lower strike CE + Sell higher strike CE", "Reduces cost vs naked buy", "Profit capped at higher strike", "Lower risk strategy"],
          example: "Buy 22500CE ₹150, Sell 23000CE ₹80. Net cost ₹70. Max profit = 500-70 = ₹430/unit."
        },
        {
          id: "m8l3",
          title: "Bear Put Spread",
          titleTe: "Bear Put Spread",
          content: `<p><strong>Bear Put Spread</strong> — ATM PE buy + OTM PE sell. Bearish with limited risk.</p>
          <p>Buy 22,500 PE + Sell 22,000 PE. Net premium. Max profit when below lower strike.</p>`,
          keyPoints: ["Buy higher strike PE + Sell lower strike PE", "Bearish with defined risk", "Profit capped", "Cheaper than naked PE buy"],
          example: "Buy 22500PE ₹130, Sell 22000PE ₹60. Net ₹70. Max profit = 500-70 = ₹430/unit."
        },
        {
          id: "m8l4",
          title: "Straddle & Strangle",
          titleTe: "Straddle & Strangle",
          content: `<p><strong>Long Straddle</strong> — ATM CE + ATM PE buy. Big move either direction expect (but don't know direction).</p>
          <p><strong>Long Strangle</strong> — OTM CE + OTM PE buy. Cheaper than straddle, bigger move needed.</p>
          <p>Best before major events: Budget, Election results, RBI policy.</p>`,
          keyPoints: ["Straddle = ATM CE + ATM PE", "Strangle = OTM CE + OTM PE (cheaper)", "Profit from big move either direction", "Use before high-impact events"],
          example: "RBI policy day. Straddle: Buy 22500CE + 22500PE. Big rate cut → CE profits. Rate hike → PE profits."
        }
      ],
      quiz: [
        { q: "Bull Call Spread eppudu use?", options: ["Bearish", "Bullish with limited risk", "No view", "Expiry day only"], answer: 1 },
        { q: "straddle antey?", options: ["Only CE buy", "Only PE buy", "CE + PE same strike", "CE + PE different strikes OTM"], answer: 2 },
        { q: "Option buyer ki time decay?", options: ["Helpful", "Harmful", "No effect", "Only on expiry"], answer: 1 }
      ]
    },
    {
      id: "m9",
      title: "Advanced Strategies",
      titleTe: "adhunathana vyoohalu",
      icon: "🧠",
      color: "#A855F7",
      lessons: [
        {
          id: "m9l1",
          title: "Iron Condor — Range Bound",
          titleTe: "Iron Condor — Range Bound",
          content: `<p><strong>Iron Condor</strong> — market range lo untundi ani expect. 4 legs:</p>
          <p>Sell OTM CE + Buy further OTM CE + Sell OTM PE + Buy further OTM PE.</p>
          <p>Profit if market stays in range. Option sellers strategy. High probability, limited profit.</p>`,
          keyPoints: ["4-leg range-bound strategy", "Sell options, buy protection", "Profit if price stays in range", "High win rate, limited profit"],
          example: "Nifty 22,000-23,000 range expect. Sell 23000CE, Buy 23200CE, Sell 22000PE, Buy 21800PE."
        },
        {
          id: "m9l2",
          title: "Covered Call — Income Strategy",
          titleTe: "Covered Call — Income Strategy",
          content: `<p><strong>Covered Call</strong> — stock hold chesi OTM CE sell. Extra income from premium.</p>
          <p>Stock upside capped but premium income. Good for stocks you want to hold long term.</p>
          <p>CE expires worthless → keep premium + stock. Stock rises above strike → stock called away.</p>`,
          keyPoints: ["Hold stock + Sell OTM CE", "Generate income from premium", "Caps upside profit", "Good for long-term holdings"],
          example: "Reliance 2500 hold. Sell 2600 CE @ ₹50. Premium ₹50 income. Above 2600 → shares sold at 2600."
        },
        {
          id: "m9l3",
          title: "Protective Put — Portfolio Insurance",
          titleTe: "Protective Put — Portfolio Insurance",
          content: `<p><strong>Protective Put</strong> — portfolio hold + PE buy. Crash protection — insurance.</p>
          <p>Market fall ayithe PE profits offset stock losses. Cost = PE premium (insurance premium).</p>
          <p>long-term investors ki useful before uncertain events.</p>`,
          keyPoints: ["Hold portfolio + Buy PE", "Insurance against crash", "Cost = put premium", "Peace of mind strategy"],
          example: "₹10L portfolio. Nifty 22500 PE buy @ ₹150. Nifty crash 2000 points → PE profit covers stock loss."
        }
      ],
      quiz: [
        { q: "Iron Condor eppudu profitable?", options: ["Big move up", "Big move down", "Market stays in range", "Only on expiry"], answer: 2 },
        { q: "Covered Call evvaru use chestharu?", options: ["Day traders only", "Long-term stock holders", "Only bears", "Only F&O sellers"], answer: 1 }
      ]
    },
    {
      id: "m10",
      title: "Risk Management",
      titleTe: "risk management",
      icon: "🛡️",
      color: "#DC2626",
      lessons: [
        {
          id: "m10l1",
          title: "The 1-2% Rule",
          titleTe: "1-2% Rule",
          content: `<p><strong>Golden Rule:</strong> oke trade lo total capital yokka 1-2% kante ekkuva risk cheyakoodadhu.</p>
          <p>₹5L capital → max ₹5,000-10,000 per trade risk. 10 consecutive losses = only 10-20% down, recoverable.</p>
          <p>Position size = Risk amount / (Entry - Stop Loss)</p>`,
          keyPoints: ["Max 1-2% capital risk per trade", "Position sizing formula", "Survive losing streaks", "Capital preservation first"],
          example: "₹5L capital, 2% risk = ₹10,000. Entry 150, SL 120 (30 points). Position = 10000/30 = 333 units max."
        },
        {
          id: "m10l2",
          title: "Stop Loss & Target",
          titleTe: "Stop Loss & Target",
          content: `<p><strong>Stop Loss (SL)</strong> — predefined exit when wrong. Emotion remove chesthundi. MUST use!</p>
          <p><strong>Target</strong> — predefined profit exit. Greed control.</p>
          <p><strong>Risk:Reward Ratio</strong> — minimum 1:2 maintain. ₹100 risk → ₹200 target.</p>`,
          keyPoints: ["Always use stop loss", "Set target before entry", "Minimum 1:2 risk-reward ratio", "Remove emotions from trading"],
          example: "CE buy ₹150, SL ₹100 (₹50 risk), Target ₹250 (₹100 profit). R:R = 1:2 ✓"
        },
        {
          id: "m10l3",
          title: "Common Mistakes to Avoid",
          titleTe: "thappudu padhdathulu",
          content: `<p>❌ <strong>Overtrading</strong> — too many trades, brokerage eats profit.</p>
          <p>❌ <strong>No stop loss</strong> — one bad trade wipes account.</p>
          <p>❌ <strong>Revenge trading</strong> — loss recover cheyadaniki bigger bet. Disaster!</p>
          <p>❌ <strong>OTM lottery</strong> — cheap OTM options, 90% expire worthless.</p>
          <p>❌ <strong>Expiry day gambling</strong> — last hour OTM buys = pure gamble.</p>`,
          keyPoints: ["Don't overtrade", "Always use stop loss", "No revenge trading", "Avoid cheap OTM lottery tickets", "Don't gamble on expiry day"],
          example: "₹20 OTM option, expiry tomorrow. 95% chance expires worthless. ₹20 → ₹0. Lottery, not trading."
        },
        {
          id: "m10l4",
          title: "Trading Psychology",
          titleTe: "trading manasthathvashaastram",
          content: `<p>Trading 80% psychology, 20% strategy. Fear & Greed control cheyali.</p>
          <p><strong>FOMO</strong> — others profit chooosi random entry. Avoid!</p>
          <p><strong>Journal</strong> — prathi trade record. Review weekly. Patterns identify.</p>
          <p><strong>Paper Trading</strong> — real money ki mundhu 3 months practice.</p>`,
          keyPoints: ["80% psychology, 20% strategy", "Control fear and greed", "Maintain trading journal", "Paper trade before real money"],
          example: "Journal: 'Nov 15 — FOMO entry, no SL, -₹8000. Lesson: Wait for setup, always SL.'"
        }
      ],
      quiz: [
        { q: "oka trade lo max risk?", options: ["10% capital", "1-2% capital", "50% capital", "No limit"], answer: 1 },
        { q: "Risk:Reward minimum?", options: ["1:1", "1:2", "2:1", "No rule"], answer: 1 },
        { q: "revenge trading antey?", options: ["Good strategy", "loss recover kosam bigger bet", "Long term investing", "Hedging"], answer: 1 }
      ]
    },
    {
      id: "m11",
      title: "NSE F&O Rules & Tax",
      titleTe: "NSE F&O niyamalu & pannu",
      icon: "📋",
      color: "#0EA5E9",
      lessons: [
        {
          id: "m11l1",
          title: "NSE F&O Segment Rules",
          titleTe: "NSE F&O segment niyamalu",
          content: `<p><strong>Trading Hours:</strong> 9:15 AM – 3:30 PM. F&O same as equity.</p>
          <p><strong>Lot Sizes:</strong> Nifty 25, Bank Nifty 15, Fin Nifty 25, Midcap Nifty 50.</p>
          <p><strong>Expiry:</strong> Monthly (last Thursday) + Weekly (every Thursday for indices).</p>
          <p><strong>Circuit Limits:</strong> F&O stocks have price bands. No trading beyond limits.</p>`,
          keyPoints: ["Trading: 9:15 AM – 3:30 PM", "Know lot sizes for each index", "Weekly + Monthly expiry", "Circuit limits apply"],
          example: "Bank Nifty weekly expiry every Thursday. Monthly expiry last Thursday of month."
        },
        {
          id: "m11l2",
          title: "F&O Taxation in India",
          titleTe: "India lo F&O tax",
          content: `<p>F&O profits/losses = <strong>Business Income</strong> (speculative). Not capital gains!</p>
          <p><strong>Tax Rate:</strong> As per income slab (if individual). 30% + surcharge if high income.</p>
          <p><strong>Loss Set-off:</strong> F&O loss set off against F&O profit only (within same year). Carry forward 4 years.</p>
          <p><strong>ITR:</strong> File ITR-3. Maintain books of accounts if turnover > ₹25L.</p>
          <p><strong>GST:</strong> Not applicable on F&O trading for individuals.</p>`,
          keyPoints: ["F&O = Business Income (not capital gains)", "Taxed per income slab", "Loss set-off within F&O only", "File ITR-3, maintain records"],
          example: "F&O profit ₹5L + Salary ₹10L = Total ₹15L taxable income. Consult CA for filing."
        },
        {
          id: "m11l3",
          title: "Brokerage & Charges",
          titleTe: "Brokerage & Charges",
          content: `<p><strong>Brokerage:</strong> ₹20/order (flat) or 0.03% — depends on broker.</p>
          <p><strong>STT:</strong> Futures 0.0125% on sell. Options 0.0625% on sell side premium.</p>
          <p><strong>Exchange charges:</strong> ~0.002% + GST 18% on brokerage + charges.</p>
          <p><strong>SEBI charges:</strong> ₹10 per crore. Stamp duty on buy side.</p>
          <p>High frequency trading → charges matter! Calculate breakeven.</p>`,
          keyPoints: ["Brokerage: flat or percentage", "STT on sell side", "GST on brokerage + charges", "Calculate breakeven including all charges"],
          example: "1 Nifty lot futures round trip ≈ ₹60-100 total charges (brokerage + STT + taxes)."
        }
      ],
      quiz: [
        { q: "F&O profit tax category?", options: ["Capital Gains", "Business Income", "No tax", "Gift income"], answer: 1 },
        { q: "F&O ITR form?", options: ["ITR-1", "ITR-2", "ITR-3", "ITR-4"], answer: 2 },
        { q: "STT on options?", options: ["Buy side", "Sell side premium", "Both sides", "No STT"], answer: 1 }
      ]
    },
    {
      id: "m12",
      title: "Practical Trading Guide",
      titleTe: "practical trading guide",
      icon: "🚀",
      color: "#22C55E",
      lessons: [
        {
          id: "m12l1",
          title: "How to Start — Step by Step",
          titleTe: "ela prarambhinchali — Step by Step",
          content: `<p><strong>Step 1:</strong> Stock market basics learn (Module 1-2) ✓</p>
          <p><strong>Step 2:</strong> Demat + Trading account open (Groww, Zerodha, etc.)</p>
          <p><strong>Step 3:</strong> F&O segment activate (income proof may be needed)</p>
          <p><strong>Step 4:</strong> Paper trade 2-3 months (virtual money practice)</p>
          <p><strong>Step 5:</strong> Start small — 1 lot only, strict stop loss</p>
          <p><strong>Step 6:</strong> Journal maintain, weekly review, continuous learning</p>`,
          keyPoints: ["Learn first, trade later", "Activate F&O segment", "Paper trade 2-3 months", "Start with 1 lot, strict SL", "Maintain trading journal"],
          example: "Month 1-2: Course complete. Month 3-5: Paper trading. Month 6: Real trading 1 lot Nifty options."
        },
        {
          id: "m12l2",
          title: "Daily Trading Routine",
          titleTe: "rojuvaari Trading Routine",
          content: `<p><strong>Pre-Market (8:30-9:15):</strong> Global markets check, news read, option chain analysis, plan banao.</p>
          <p><strong>Market Hours (9:15-3:30):</strong> Plan follow, no impulsive trades. SL/Target set before entry.</p>
          <p><strong>Post-Market (3:30-4:30):</strong> Journal update, P&L review, tomorrow plan.</p>
          <p><strong>Weekend:</strong> Week review, learn new strategies, backtest.</p>`,
          keyPoints: ["Pre-market: plan and analysis", "Market hours: execute plan only", "Post-market: journal and review", "Weekend: learn and backtest"],
          example: "8:45 AM: Nifty SGX trend check, support 22400, resistance 22600. Plan: Buy 22500CE if breaks 22600."
        },
        {
          id: "m12l3",
          title: "Tools & Resources",
          titleTe: "Tools & Resources",
          content: `<p><strong>Charting:</strong> TradingView (free), broker charts</p>
          <p><strong>Option Chain:</strong> NSE website, broker app (Groww, Sensibull)</p>
          <p><strong>Analysis:</strong> Sensibull (strategy builder), Opstra (OI analysis)</p>
          <p><strong>News:</strong> Moneycontrol, Economic Times, NSE announcements</p>
          <p><strong>Learning:</strong> NSE Academy (free courses), this app!</p>
          <p><strong>Paper Trading:</strong> Sensibull virtual trading, broker demo accounts</p>`,
          keyPoints: ["TradingView for charts", "NSE website for option chain", "Sensibull for strategy building", "NSE Academy for free courses"],
          example: "TradingView lo Nifty chart open, support/resistance mark, option chain lo OI check, plan entry."
        },
        {
          id: "m12l4",
          title: "Course Completion — Your Journey",
          titleTe: "course poorthi — mee prayam",
          content: `<p>🎉 <strong>Congratulations!</strong> meeru F&O A to Z course complete chesaru!</p>
          <p>meeru nerchukunnadi:</p>
          <ul>
            <li>✅ Stock Market Basics</li>
            <li>✅ Futures & Options fundamentals</li>
            <li>✅ Call/Put, Strike, Premium, Greeks</li>
            <li>✅ Margin, Leverage, Risk Management</li>
            <li>✅ Trading Strategies (Basic to Advanced)</li>
            <li>✅ NSE Rules, Tax, Practical Guide</li>
          </ul>
          <p><strong>Next Steps:</strong> Paper trade → Small real trades → Journal → Continuous learning. Success = Discipline + Patience + Risk Management!</p>
          <p>⚠️ Remember: <em>Risk hai toh ishq hai</em> — but only with proper risk management! 📈</p>`,
          keyPoints: ["Course complete — well done!", "Paper trade before real money", "Discipline + Patience = Success", "Never stop learning"],
          example: "Your journey: Learn → Paper Trade → Small Real → Scale Up → Consistent Profits. Good luck! 🚀"
        }
      ],
      quiz: [
        { q: "real trading ki mundhu?", options: ["Direct big trades", "Paper trade 2-3 months", "Copy others", "Expiry day gambling"], answer: 1 },
        { q: "Trading success key?", options: ["Luck", "Discipline + Risk Management", "Inside information", "More leverage"], answer: 1 },
        { q: "option chain ekkada choodali?", options: ["Only broker app", "NSE website + broker app", "Newspaper only", "Not needed"], answer: 1 }
      ]
    }
  ]
};

const GLOSSARY = [
  { term: "ATM", full: "At The Money", te: "prasthutham dharaku sameepamlo unna strike", def: "Option strike price equal or very close to current market price." },
  { term: "Bear Market", full: "Bear Market", te: "dharalu pade market", def: "Market where prices are falling, pessimism dominates." },
  { term: "Bull Market", full: "Bull Market", te: "dharalu perige market", def: "Market where prices are rising, optimism dominates." },
  { term: "CE", full: "Call Option", te: "call option — kone hakku", def: "Right to buy underlying at strike price before expiry." },
  { term: "Delta", full: "Delta (Δ)", te: "dhara maarpuku sunnithathvam", def: "Rate of change of option price relative to underlying price move." },
  { term: "Derivative", full: "Derivative", te: "utpanna vasthuvu", def: "Financial contract whose value is derived from an underlying asset." },
  { term: "Expiry", full: "Expiry Date", te: "gaduvu thedhi", def: "Last date when an F&O contract is valid. After this it ceases to exist." },
  { term: "F&O", full: "Futures & Options", te: "futures mariyu options", def: "Derivative instruments traded on stock exchanges." },
  { term: "Futures", full: "Futures Contract", te: "futures contract", def: "Agreement to buy/sell an asset at a predetermined price on a future date." },
  { term: "Gamma", full: "Gamma (Γ)", te: "delta maarpu vegam", def: "Rate of change of delta relative to underlying price move." },
  { term: "Hedging", full: "Hedging", te: "rakshana vyooham", def: "Using F&O to protect existing portfolio from adverse price moves." },
  { term: "ITM", full: "In The Money", te: "laabhamlo unna option", def: "Option that would be profitable if exercised right now." },
  { term: "IV", full: "Implied Volatility", te: "anchana chalanam", def: "Market's forecast of likely future price movement of underlying." },
  { term: "Leverage", full: "Leverage", te: "leverage — thakkuva dabbutho ekkuva exposure", def: "Using borrowed capital (margin) to increase position size." },
  { term: "Long", full: "Long Position", te: "konna position — dhara peragaali ani", def: "Buying with expectation that price will rise." },
  { term: "Lot Size", full: "Lot Size", te: "oka lot lo units", def: "Minimum quantity for F&O trade. Nifty = 25, Bank Nifty = 15." },
  { term: "Margin", full: "Margin", te: "bhadratha deposit", def: "Security deposit required by broker to open F&O position." },
  { term: "MTM", full: "Mark to Market", te: "rojuvaari laabhanashtam", def: "Daily settlement of unrealized profit/loss on open positions." },
  { term: "OI", full: "Open Interest", te: "therichina oppandhalu", def: "Total number of outstanding F&O contracts not yet closed." },
  { term: "OTM", full: "Out of The Money", te: "laabhamlo leni option", def: "Option that would NOT be profitable if exercised now." },
  { term: "PE", full: "Put Option", te: "put option — amme hakku", def: "Right to sell underlying at strike price before expiry." },
  { term: "Premium", full: "Option Premium", te: "option dhara", def: "Price paid to buy an option contract." },
  { term: "PCR", full: "Put-Call Ratio", te: "put-call nishpatthi", def: "Ratio of total put OI to call OI. Indicates market sentiment." },
  { term: "Rollover", full: "Rollover", te: "tharuvata nelaku maarpu", def: "Shifting position from expiring contract to next month's contract." },
  { term: "Short", full: "Short Position", te: "ammina position — dhara paadaali ani", def: "Selling with expectation that price will fall." },
  { term: "SL", full: "Stop Loss", te: "nashtam nilipe aadesham", def: "Predefined order to exit position and limit losses." },
  { term: "SPAN", full: "SPAN Margin", te: "kaneesa margin", def: "Standardized Portfolio Analysis of Risk — exchange calculated margin." },
  { term: "STT", full: "Securities Transaction Tax", te: "laavaadevi pannu", def: "Tax on securities transactions. F&O: on sell side." },
  { term: "Strike Price", full: "Strike Price", te: "oppandha dhara", def: "Predetermined price at which option can be exercised." },
  { term: "Theta", full: "Theta (Θ)", te: "samaya kshineetha", def: "Rate of option value decay per day due to time passing." },
  { term: "Vega", full: "Vega (ν)", te: "IV sunnithathvam", def: "Sensitivity of option price to changes in implied volatility." }
];
