import type { Task } from "../types";

const task1: Task = {
  meta: {
    id: "task1",
    serviceId: "6a14c6a002f937bcb61ec0f0",
    title: "Emergency Social Media Recovery",
    category: "Creative & Media",
    subcategory: "Social Media Content Audit",
    universe: "brandon_lewis",
    personaName: "Brandon Lewis",
    oneLiner:
      "Audit and rebuild a fintech startup's lost June content plan from messy, multi-source recovered material.",
    difficulty: "Hard",
    outputType: "Structured folder tree + MEMORY.md + email",
    modalities: ["Handwritten notes", "Mixed caption file", "23 images"],
    status: "Golden",
  },
  assetRoot: "tasks/task1",
  personaDocPath: "tasks/task1/artifacts/persona_context.md",

  personaHighlights: [
    { label: "Role", value: "Product Manager @ Vaulta.io (Boston fintech)" },
    { label: "Team", value: "Brandon, Trevor (lead), Maya (design)" },
    { label: "Phone", value: "(617) 555-0394" },
    { label: "Current project", value: "Merchant analytics dashboard" },
  ],

  brainstorm: [
    {
      title: "Fitness Content Accuracy Audit",
      body: "Audit personal Instagram fitness posts to find which trainings are missing information versus the actual logged workouts.",
      chosen: false,
    },
    {
      title: "Urban Cycling Photo Review",
      body: "Audit a large set of urban-cycling route photos from different sources before posting — some shot by teammates, some mistaken, gathered in a rush.",
      chosen: false,
    },
    {
      title: "Emergency Social Media Recovery",
      body: "The monthly social media plan was lost. After an emergency meeting the team recovered scattered context and now needs to audit it before posting.",
      chosen: true,
      why: "It leaves the most room to create realistic complexity while staying naturally aligned with Creative & Media / Social Media Content Audit. It grounds easily in Brandon's day-to-day at a fintech startup, producing stronger persona adherence and a more believable request.",
    },
  ],

  realityFirst: [
    "The agent must audit a company's full monthly plan spanning multiple platforms — so the context needs to be rich, with many images and supporting materials.",
    "The urgent framing fits a handwritten note made in a rush plus messy multimodal context recovered from different sources.",
    "Because the original plan was lost, the recovered information should come from multiple locations and formats — not one clean source of truth.",
    "Some information should exist in only one source, forcing the agent to genuinely audit and reconcile rather than look up.",
    "The social context should feel believable for a fintech company.",
  ],

  mmStrategy: [
    "Two handwritten notes act as the SSOT, covering three platforms (Instagram, X, LinkedIn) and the planned posting date for each post.",
    "A single text file holds all recovered captions mixed together — matchable to the plan, but not pre-attributed.",
    "Controlled friction is planted: captions exceeding limits, mismatched dates, wrong phone number, Q1-vs-Q2 confusion, a 4am-vs-3am maintenance time.",
    "Images are gathered to match the plan, plus extras: unrelated distractors, a duplicate dashboard, and a carousel image/caption that doesn't match the planned slide.",
    "Nothing is forced — every friction point is the kind of mess that naturally appears in a rushed, multi-source recovery.",
  ],

  assets: [
    // ---- SSOT ----
    {
      filename: "1780566865852.jpeg",
      src: "mm_input/1780566865852.jpeg",
      kind: "handwritten",
      role: "ssot",
      whatItShows:
        "Page 1 of the handwritten draft. Header INSTAGRAM with the 11th (Q2 dinner recap), 5th (5-slide cybersecurity carousel with its five slide topics), and a weekly Friday finance-quote rule. A boxed [X] section below lists the 20th-ish dashboard post, a weekly Wednesday slot (no action), and the 7th support-maintenance post.",
      verdict: "Single source of truth for Instagram + X plans.",
      rationale:
        "Putting Instagram and X on the same page (with X scattered below Instagram) is the planted trap: models tend to lump the X posts under Instagram and miss the X channel entirely. Reading the SSOT correctly is the spine of the whole task.",
      tags: ["SSOT", "Instagram", "X", "rush note"],
    },
    {
      filename: "1780566865892.jpg",
      src: "mm_input/1780566865892.jpg",
      kind: "handwritten",
      role: "ssot",
      whatItShows:
        "Page 2 of the handwritten draft. Header LINKEDIN. The 14th post (with 16th crossed out → 14th) explaining financial ecosystems in <300 words, the 17th mobile-app post that must mention Standard (500/month) and Plus (unlimited) AI tiers, and the 29th Boston-office post that must include Brandon's email and personal phone number.",
      verdict: "Single source of truth for the LinkedIn plan.",
      rationale:
        "The crossed-out 16th→14th date is a deliberate strike-through test (see the playbook). The explicit constraints here — the 300-word limit, the membership tiers, the phone number — are exactly what the recovered captions later violate, creating the mismatches.",
      tags: ["SSOT", "LinkedIn", "strike-through"],
    },
    // ---- captions ----
    {
      filename: "text_post.txt",
      src: "mm_input/text_post.txt",
      kind: "text",
      role: "captions",
      whatItShows:
        "All recovered captions in one file, mixed together and numbered but not attributed: a long financial-ecosystem article, the Personalized Savings Goals announcement, the Boston-office post, a Q1 recap, a July-1 maintenance notice, the 5-part cybersecurity carousel text, and the June-24 dashboard caption.",
      verdict: "Must be split per post and saved as MM-DD.txt files.",
      rationale:
        "Mixing the captions forces the agent to match each block to the right post by reasoning across the SSOT — and several blocks carry the planted mismatches (over the word limit, wrong phone, Q1 vs Q2, 4am vs 3am, missing tiers).",
      tags: ["captions", "cross-reference"],
    },

    // ---- Instagram 06-05 carousel (correct) ----
    {
      filename: "carrousel_1.png",
      src: "mm_input/carrousel_1.png",
      kind: "image",
      role: "correct",
      platform: "Instagram",
      date: "06-05",
      whatItShows: "Carousel slide 1 — 'Use Strong, Unique Passwords'.",
      verdict: "Belongs in Instagram/06-05 (carousel slide 1).",
      rationale: "Matches planned slide 1 (Strong passwords) exactly.",
      tags: ["carousel", "slide 1"],
    },
    {
      filename: "carrousel_2.png",
      src: "mm_input/carrousel_2.png",
      kind: "image",
      role: "correct",
      platform: "Instagram",
      date: "06-05",
      whatItShows: "Carousel slide 2 — 'Enable Two-Factor Authentication'.",
      verdict: "Belongs in Instagram/06-05 (carousel slide 2).",
      rationale: "Matches planned slide 2 (Two-factor authentication).",
      tags: ["carousel", "slide 2"],
    },
    {
      filename: "carrousel_3.png",
      src: "mm_input/carrousel_3.png",
      kind: "image",
      role: "correct",
      platform: "Instagram",
      date: "06-05",
      whatItShows: "Carousel slide 3 — 'Be Cautious of Phishing'.",
      verdict: "Belongs in Instagram/06-05 (carousel slide 3).",
      rationale:
        "The image correctly depicts the planned phishing slide. Note the trap: the corresponding caption block in the text file is about webcam security, not phishing — so the image is kept but its caption is a mismatch.",
      tags: ["carousel", "slide 3", "phishing"],
    },
    {
      filename: "carrsel_4.png",
      src: "mm_input/carrsel_4.png",
      kind: "image",
      role: "correct",
      platform: "Instagram",
      date: "06-05",
      whatItShows: "Carousel slide 4 — 'Keep Your Devices and Apps Updated'.",
      verdict: "Belongs in Instagram/06-05 (carousel slide 4).",
      rationale:
        "Matches planned slide 4 (Software updates). The misspelled filename ('carrsel') mirrors real-world messy inputs.",
      tags: ["carousel", "slide 4"],
    },
    {
      filename: "carrousel_5.png",
      src: "mm_input/carrousel_5.png",
      kind: "image",
      role: "mismatch",
      platform: "Instagram",
      date: "06-05",
      whatItShows: "A slide titled 'Monitor Your Accounts Regularly' (slide 5 styling).",
      verdict: "Mismatch — logged to MEMORY.md and removed.",
      rationale:
        "The planned slide 5 is 'Regular safe browsing habits'. This image is about monitoring accounts, so it does not match the plan even though it looks like a carousel slide. Catching this requires reading the slide topic, not just the slide number.",
      tags: ["carousel", "mismatch"],
    },

    // ---- Instagram 06-11 dinner (correct) ----
    {
      filename: "visual_5960419.png",
      src: "mm_input/visual_5960419.png",
      kind: "image",
      role: "correct",
      platform: "Instagram",
      date: "06-11",
      whatItShows: "Overhead shot of a shared dinner table full of food.",
      verdict: "Belongs in Instagram/06-11 (Q2 dinner recap).",
      rationale: "Matches the planned post recapping the team dinner held June 1st.",
      tags: ["dinner", "Q2"],
    },
    {
      filename: "visual_20260419.png",
      src: "mm_input/visual_20260419.png",
      kind: "image",
      role: "correct",
      platform: "Instagram",
      date: "06-11",
      whatItShows: "A group toasting beers together.",
      verdict: "Belongs in Instagram/06-11 (Q2 dinner recap).",
      rationale: "Second image of the dinner-celebration post.",
      tags: ["dinner", "Q2"],
    },

    // ---- Finance quote images (correct, interchangeable across Fridays) ----
    {
      filename: "Screenshot_2026-05-29 091745.png",
      src: "mm_input/Screenshot_2026-05-29 091745.png",
      kind: "image",
      role: "correct",
      platform: "Instagram",
      whatItShows: "Einstein 'compound interest is the eighth wonder' finance quote.",
      verdict: "A weekly Friday finance-quote image (06-05 / 06-12 / 06-19 / 06-26).",
      rationale:
        "One of four finance-quote images. The plan's weekly Friday rule needs one quote per Friday; which exact Friday each lands on is interchangeable, so the rubric accepts any assignment.",
      tags: ["finance quote", "Friday"],
    },
    {
      filename: "quote_3.png",
      src: "mm_input/quote_3.png",
      kind: "image",
      role: "correct",
      platform: "Instagram",
      whatItShows: "'Consistency in finance creates confidence in life' quote.",
      verdict: "A weekly Friday finance-quote image.",
      rationale: "One of the four interchangeable finance-quote images for the Friday slots.",
      tags: ["finance quote", "Friday"],
    },
    {
      filename: "IMG_33489034.png",
      src: "mm_input/IMG_33489034.png",
      kind: "image",
      role: "correct",
      platform: "Instagram",
      whatItShows: "'Don't chase money, build value and money will follow' quote.",
      verdict: "A weekly Friday finance-quote image.",
      rationale: "One of the four interchangeable finance-quote images for the Friday slots.",
      tags: ["finance quote", "Friday"],
    },
    {
      filename: "visual_3248329.png",
      src: "mm_input/visual_3248329.png",
      kind: "image",
      role: "correct",
      platform: "Instagram",
      whatItShows: "Warren Buffett 'spend what is left after saving' quote.",
      verdict: "A weekly Friday finance-quote image.",
      rationale: "One of the four interchangeable finance-quote images for the Friday slots.",
      tags: ["finance quote", "Friday"],
    },

    // ---- X 06-22 dashboard (correct + duplicate) ----
    {
      filename: "final viasual.png",
      src: "mm_input/final viasual.png",
      kind: "image",
      role: "correct",
      platform: "X",
      date: "06-22",
      whatItShows: "Vaulta financial-analytics dashboard preview.",
      verdict: "Belongs in X/06-22 (dashboard preview).",
      rationale:
        "Matches the planned dashboard post. It is pixel-identical to Dash.jpg — only one should be kept; the other is a duplicate to report.",
      tags: ["dashboard", "X", "duplicate-pair"],
    },
    {
      filename: "Dash.jpg",
      src: "mm_input/Dash.jpg",
      kind: "image",
      role: "duplicate",
      platform: "X",
      date: "06-22",
      whatItShows: "The same Vaulta dashboard preview as 'final viasual.png'.",
      verdict: "Duplicate — keep one, report the other.",
      rationale:
        "Identical content to 'final viasual.png'. The agent should recognize the duplication and report it rather than silently placing both.",
      tags: ["dashboard", "X", "duplicate-pair"],
    },

    // ---- X 06-07 support maintenance ----
    {
      filename: "IMG_398573.png",
      src: "mm_input/IMG_398573.png",
      kind: "image",
      role: "correct",
      platform: "X",
      date: "06-07",
      whatItShows: "Flat illustration of people doing maintenance with a wrench and gears.",
      verdict: "Belongs in X/06-07 (support-maintenance announcement).",
      rationale: "The only image that matches the planned maintenance post.",
      tags: ["maintenance", "X"],
    },

    // ---- LinkedIn ----
    {
      filename: "IMG_20260314_173522.png",
      src: "mm_input/IMG_20260314_173522.png",
      kind: "image",
      role: "correct",
      platform: "LinkedIn",
      date: "06-14",
      whatItShows: "Isometric illustration of a connected banking / financial ecosystem.",
      verdict: "Belongs in LinkedIn/06-14 (financial-ecosystem post).",
      rationale: "Matches the planned <300-word financial-ecosystem explainer post.",
      tags: ["LinkedIn", "ecosystem"],
    },
    {
      filename: "phone.jpg",
      src: "mm_input/phone.jpg",
      kind: "image",
      role: "correct",
      platform: "LinkedIn",
      date: "06-17",
      whatItShows: "Simple flat illustration of a smartphone.",
      verdict: "Belongs in LinkedIn/06-17 (mobile-app update post).",
      rationale: "The plan explicitly calls for a phone image on the 17th mobile-app post.",
      tags: ["LinkedIn", "mobile app"],
    },

    // ---- Distractors ----
    {
      filename: "IMG_39852.png",
      src: "mm_input/IMG_39852.png",
      kind: "image",
      role: "distractor",
      whatItShows: "Red 'HAVE BEEN ENCRYPTED' ransomware / breach warning graphic.",
      verdict: "Remove — unrelated to any planned post.",
      rationale:
        "Has nothing to do with the plan. Including or filing it anywhere is a failure; it must be reported as removed.",
      tags: ["distractor", "remove"],
    },
    {
      filename: "Screenshot_2026-06-03 234708.png",
      src: "mm_input/Screenshot_2026-06-03 234708.png",
      kind: "image",
      role: "distractor",
      whatItShows: "A 'LIVE WEBINAR' badge graphic.",
      verdict: "Remove — unrelated to any planned post.",
      rationale: "No planned post references a webinar; it is noise from the messy recovery.",
      tags: ["distractor", "remove"],
    },
    {
      filename: "visual_8456934.png",
      src: "mm_input/visual_8456934.png",
      kind: "image",
      role: "distractor",
      whatItShows: "A grid of mac-and-cheese recipe step photos.",
      verdict: "Remove — unrelated to any planned post.",
      rationale: "Completely off-topic for a fintech plan; a clear removable distractor.",
      tags: ["distractor", "remove"],
    },
    {
      filename: "update.png",
      src: "mm_input/update.png",
      kind: "image",
      role: "distractor",
      whatItShows: "Hands holding a tablet that reads 'LATEST UPDATE'.",
      verdict: "Remove — unrelated to any planned post.",
      rationale:
        "Looks vaguely product-y, which makes it a tempting false match — but it maps to nothing in the plan and must be removed.",
      tags: ["distractor", "remove"],
    },
  ],

  captions: [
    {
      n: 1,
      excerpt:
        "The financial industry has undergone a remarkable transformation… data has become one of the most valuable assets in modern finance…",
      belongsTo: "LinkedIn › 06-14 (financial ecosystem)",
      status: "mismatch",
      note: "Topic matches the 14th post, but it runs far longer than the planned <300-word limit → logged as a mismatch.",
    },
    {
      n: 2,
      excerpt:
        "Saving for your next big goal just got smarter. We're excited to introduce Personalized Savings Goals…",
      belongsTo: "LinkedIn › 06-17 (mobile app update)",
      status: "mismatch",
      note: "Right post, but it omits the required membership-tier details (Standard 500/month, Plus unlimited) → mismatch.",
    },
    {
      n: 3,
      excerpt: "📍 Boston, we're here… 📞 (617) 555-0537  📧 brandon@vaulta.io",
      belongsTo: "LinkedIn › 06-29 (Boston office)",
      status: "mismatch",
      note: "Phone number is wrong — (617) 555-0537 instead of Brandon's (617) 555-0394 → mismatch. 06-29 has no image, so it lives only in MEMORY.",
    },
    {
      n: 4,
      excerpt: "What a way to close out the first quarter! 🎉 …Here's to an even stronger Q2! #Q1Recap",
      belongsTo: "Instagram › 06-11 (dinner recap)",
      status: "mismatch",
      note: "The 11th post recaps the Q2 dinner, but this caption recaps Q1 → mismatch (wrong quarter).",
    },
    {
      n: 5,
      excerpt: "📢 Scheduled maintenance: July 1, 12 AM–4 AM PST…",
      belongsTo: "X › 06-07 (support maintenance)",
      status: "mismatch",
      note: "The SSOT says maintenance ends at 3am PST; this caption says 4am → mismatch.",
    },
    {
      n: 6,
      excerpt:
        "1. 🔐 Strong passwords… 2. 🔒 Two-factor authentication… 3. 🎥 Your webcam can be a target… 4. 🔄 Keeping your devices updated… 5. 📊 Regularly reviewing your accounts…",
      belongsTo: "Instagram › 06-05 (carousel) — split",
      status: "split",
      note: "Keep only blocks 1, 2, 4 (Strong passwords, 2FA, Software updates). Block 3 is webcam — not the planned phishing slide. Block 5 is account monitoring — not the planned safe-browsing slide. Both are mismatches.",
    },
    {
      n: 7,
      excerpt:
        "🚀 The new Vaulta Dashboard arrives on June 24th. Built to give you clearer insights… #DashboardLaunch",
      belongsTo: "X › 06-22 (dashboard preview)",
      status: "correct",
      note: "Saved as 06-22.txt alongside the dashboard image. (Listed as the second '6' in the recovered file.)",
    },
  ],

  prompt: `Hey, Brandon here. We lost our social media planning for this month with all the posts content inside, and we really need to get a solution. We can't afford to lose our social media momentum now that we are starting to have some more relevancy. We held an emergency meeting today, and this is all we got: the images we all had in our computers or referenced elsewhere and a .txt file with the captions we had ready for that images and managed to rescue.

During the emergency meeting I also jotted down a quick two-page draft I'm uploading as part of the context to help rebuild the monthly content plan, and I'm expecting you to use it as the SSOT to help me audit all the social media content. The goal is to identify what's correct, what's missing, and what's mismatching. Consider missing everything that is not appearing in the context but is part of our planning. Consider mismatching everything appearing but not fully matching the planning expectations. Consider removable everything that is present but has no relationship with our planning.

To restore some order after all this mess, organize everything by platform first. In each platform folder, create a separate folder for every planned publication date using the MM-DD format, with all content related to a given post placed inside. Since all post captions are mixed in a single file, save each one individually as an MM-DD.txt file inside the matching post folder. For anything missing from a post or any content that does not match it, use instead the format Platform > MM-DD > Description of the issue, clearly explaining what's wrong (missing asset, wrong caption, incorrect media, date mismatch, etc.) and append it to MEMORY.md. Any content removed should be included in your final message.

Finally, to keep the whole team looped send Trevor and Maya an email with the mismatches to fix.`,

  promptAnnotations: [
    {
      quote: "use it as the SSOT to help me audit all the social media content",
      meaning:
        "The handwritten two-page draft is the single source of truth. Everything else is graded against it.",
    },
    {
      quote: "Consider missing… mismatching… removable…",
      meaning:
        "Three audit buckets are defined in natural language. The agent must classify every piece of content into exactly one.",
    },
    {
      quote: "organize everything by platform first… a separate folder for every planned publication date using the MM-DD format",
      meaning:
        "Defines the exact output structure: Platform / MM-DD / content. This is what the unit tests check.",
    },
    {
      quote: "save each one individually as an MM-DD.txt file inside the matching post folder",
      meaning:
        "The mixed caption file must be split and each caption attributed to the correct post.",
    },
    {
      quote: "use instead the format Platform > MM-DD > Description of the issue… append it to MEMORY.md",
      meaning:
        "Missing and mismatching items don't go in folders — they get logged to MEMORY.md in a specific format.",
    },
    {
      quote: "Any content removed should be included in your final message.",
      meaning: "Removed distractors and duplicates must be surfaced in the final user-facing message.",
    },
    {
      quote: "send Trevor and Maya an email with the mismatches to fix",
      meaning:
        "A real state-change action: email trevor@vaulta.io and maya@vaulta.io summarizing the mismatches.",
    },
  ],

  deliverableTree: {
    name: "OUTPUT",
    type: "folder",
    children: [
      {
        name: "Instagram",
        type: "folder",
        role: "correct",
        children: [
          {
            name: "06-05",
            type: "folder",
            note: "5-slide cybersecurity carousel + one finance quote",
            children: [
              { name: "carrousel_1.png", type: "image", role: "correct" },
              { name: "carrousel_2.png", type: "image", role: "correct" },
              { name: "carrousel_3.png", type: "image", role: "correct" },
              { name: "carrsel_4.png", type: "image", role: "correct" },
              { name: "‹one finance-quote image›", type: "image", role: "correct", note: "any of the 4 quotes" },
              { name: "06-05.txt", type: "text", role: "correct", note: "captions for slides 1, 2 & 4 only" },
            ],
          },
          {
            name: "06-11",
            type: "folder",
            note: "Q2 dinner recap",
            children: [
              { name: "visual_5960419.png", type: "image", role: "correct" },
              { name: "visual_20260419.png", type: "image", role: "correct" },
            ],
          },
          {
            name: "06-12",
            type: "folder",
            note: "weekly finance quote",
            children: [{ name: "‹one finance-quote image›", type: "image", role: "correct" }],
          },
          {
            name: "06-19",
            type: "folder",
            note: "weekly finance quote",
            children: [{ name: "‹one finance-quote image›", type: "image", role: "correct" }],
          },
          {
            name: "06-26",
            type: "folder",
            note: "weekly finance quote",
            children: [{ name: "‹one finance-quote image›", type: "image", role: "correct" }],
          },
        ],
      },
      {
        name: "X",
        type: "folder",
        role: "correct",
        children: [
          {
            name: "06-22",
            type: "folder",
            note: "dashboard preview",
            children: [
              { name: "final viasual.png", type: "image", role: "correct", note: "or Dash.jpg (one only)" },
              { name: "06-22.txt", type: "text", role: "correct", note: "June-24 dashboard caption" },
            ],
          },
          {
            name: "06-07",
            type: "folder",
            note: "support maintenance",
            children: [{ name: "IMG_398573.png", type: "image", role: "correct" }],
          },
        ],
      },
      {
        name: "LinkedIn",
        type: "folder",
        role: "correct",
        children: [
          {
            name: "06-14",
            type: "folder",
            note: "financial ecosystem explainer",
            children: [{ name: "IMG_20260314_173522.png", type: "image", role: "correct" }],
          },
          {
            name: "06-17",
            type: "folder",
            note: "mobile app update",
            children: [{ name: "phone.jpg", type: "image", role: "correct" }],
          },
        ],
      },
      {
        name: "MEMORY.md",
        type: "doc",
        role: "mismatch",
        note: "all missing + mismatching items, logged in Platform > MM-DD > issue format",
      },
    ],
  },

  memory: [
    { category: "missing", location: "Instagram > 06-05, 06-12, 06-19, 06-26", detail: "All weekly finance-quote captions are missing." },
    { category: "mismatch", location: "Instagram > 06-05", detail: "Caption regarding 'phishing awareness' is mismatching (the recovered block is about webcam security)." },
    { category: "mismatch", location: "Instagram > 06-05", detail: "carrousel_5.png is mismatching (it shows account monitoring, not the planned safe-browsing slide)." },
    { category: "mismatch", location: "Instagram > 06-05", detail: "Image/caption for 'regular safe browsing habits' is mismatching." },
    { category: "mismatch", location: "Instagram > 06-11", detail: "Caption describes a Q1 recap instead of the planned Q2 dinner." },
    { category: "mismatch", location: "LinkedIn > 06-14", detail: "Caption exceeds the <300-word target." },
    { category: "mismatch", location: "LinkedIn > 06-17", detail: "Caption is missing the membership-tier details (Standard 500/month, Plus unlimited)." },
    { category: "mismatch", location: "LinkedIn > 06-29", detail: "Caption contains the wrong phone number ((617) 555-0537 instead of (617) 555-0394)." },
    { category: "mismatch", location: "X > 06-07", detail: "Maintenance end time listed as 4am instead of 3am PST." },
    { category: "mismatch", location: "X > 06-22", detail: "Dashboard caption references June 24th (verify against the planned launch)." },
  ],

  removed: [
    { item: "Caption: 'phishing awareness' block", why: "Does not match the planned phishing slide for Instagram 06-05." },
    { item: "Caption: 'regular safe browsing habits' block", why: "Does not match that topic and must be removed." },
    { item: "carrousel_5.png", why: "Does not match any part of the planning." },
    { item: "final viasual.png or Dash.jpg (one of them)", why: "The two are duplicates — keep one, remove the other." },
    { item: "IMG_39852.png", why: "Ransomware graphic — nothing to do with any context." },
    { item: "Screenshot_2026-06-03 234708.png", why: "'Live webinar' badge — unrelated to any post." },
    { item: "visual_8456934.png", why: "Mac-and-cheese recipe grid — unrelated to any post." },
    { item: "update.png", why: "'Latest update' tablet image — unrelated to any context." },
  ],

  email: {
    to: ["trevor@vaulta.io", "maya@vaulta.io"],
    points: [
      "June 14 LinkedIn post exceeds the 300-word limit.",
      "June 17 LinkedIn post is missing the membership-tier details.",
      "June 29 LinkedIn post contains an incorrect phone number.",
      "June 11 Instagram post references Q1 instead of Q2.",
      "June 7 X post lists 4am instead of 3am as the maintenance end time.",
      "June 22 X dashboard-launch post references June 24th (instead of July 1st).",
    ],
  },

  silver: [
    {
      n: 1,
      label: "Recover the X channel",
      message:
        "Hey, you missed the X platform entirely and included its related posts under Instagram. Please double-check 1780566865852.jpeg and correct this. Additionally, you are not following the prompt's instruction for missing or mismatching content: \"For anything missing from a post or any content that does not match it.\" Make sure the post folders do not include anything that falls under either of those categories.",
      fixes:
        "Forces the model to re-read the SSOT and split Instagram vs X correctly — the headline failure mode the task was designed to elicit.",
    },
    {
      n: 2,
      label: "Remove a leftover mismatch",
      message:
        "It looks like you are still mistakenly including the caption in the 11th Instagram folder, even though it represents mismatching content because it references the wrong quarter.",
      fixes:
        "Pushes the model to treat the Q1-vs-Q2 caption as a mismatch (log + remove) rather than placing it in the folder.",
    },
    {
      n: 3,
      label: "Continue reconciling",
      message: "Additional follow-ups guide the model through the remaining mismatches and removals…",
      fixes: "Each follow-up targets a specific observed gap until the deliverable matches the GTFA.",
    },
    {
      n: 4,
      label: "Correct solution reached",
      message: "Correct solution reached — the deliverable now matches the Ground Truth Final Answer.",
      fixes: "End state: verified-correct trajectory, restored from seed (never started fresh).",
    },
  ],

  unitTests: [
    { ref: "test_output_contains_x_platform_folder", logic: "Verifies the output includes an X/ folder.", group: "Platform folders" },
    { ref: "test_output_contains_instagram_platform_folder", logic: "Verifies the output includes an Instagram/ folder.", group: "Platform folders" },
    { ref: "test_output_contains_linkedin_platform_folder", logic: "Verifies the output includes a LinkedIn/ folder.", group: "Platform folders" },
    { ref: "test_instagram_contains_required_date_folders", logic: "Verifies Instagram/ contains 06-05/, 06-11/, 06-12/, 06-19/, and 06-26/.", group: "Date folders" },
    { ref: "test_linkedin_contains_required_date_folders", logic: "Verifies LinkedIn/ contains 06-14/ and 06-17/.", group: "Date folders" },
    { ref: "test_x_contains_required_date_folders", logic: "Verifies X/ contains 06-22/ and 06-07/.", group: "Date folders" },
  ],

  rubricDesign: [
    {
      title: "Grounded, Atomic Checks",
      body:
        "Each positive rubric maps back to a prompt requirement or SSOT rule. The criteria stay outcome-based and self-contained: one folder, one date, one mismatch, or one state-changing action per check unless the items are the same-level contents of a single post.",
    },
    {
      title: "Bundling Only When It Preserves Signal",
      body:
        "Repeated leaf work is bundled only when it belongs to the same logical unit, such as the four valid carousel images or the two dinner images. Independent date folders and platform folders remain separate so partial failures stay visible in the score.",
    },
    {
      title: "Weights Follow Verification Difficulty",
      body:
        "+5 criteria cover high-impact cross-source or structural failures, +3 criteria cover focused reconciliation across a plan/date/asset or caption, and +1 criteria capture useful but lower-stakes behavior such as duplicate reporting.",
    },
    {
      title: "Negative Rubrics Stay Rare",
      body:
        "The single negative rubric targets an attractive wrong path: inventing an Unassigned section that the prompt did not request. It is intentionally light so it discourages scope creep without outnumbering or overpowering the positive task requirements.",
    },
    {
      title: "Judge Routing Is Text-Oriented",
      body:
        "Even when a criterion depends on understanding an uploaded image, the scored artifact is the model's written or file-system output. These criteria should be verified by the text judge, not routed to a visual judge that only evaluates pixels produced by the agent.",
    },
  ],

  rubrics: [
    {
      n: 1,
      text: "The model extracts the planning information contained in 1780566865852.jpeg and 1780566865892.jpg when rebuilding the social media plan.",
      points: 5,
      category: "Task Completion — Final answer/artifact",
      enforces: "Prompt: 'use it as the SSOT to help me audit all the social media content.'",
      evidence: ["1780566865852.jpeg", "1780566865892.jpg"],
      status: "not-present",
      observed:
        "The model opened both handwritten pages, but did not extract the plan correctly: the boxed [X] section on page 1 was never recognised as its own channel, so the reconstructed plan was missing X entirely.",
      rationale:
        "This is the foundational capability check. Both handwritten pages are the SSOT, and every other rubric depends on the plan being read correctly. It carries the heavier +5 weight because skipping or misreading the notes collapses the entire downstream audit. It is also the most natural place for the model to fail by reading only one page.",
    },
    {
      n: 2,
      text: "The model produces a LinkedIn folder as part of the output.",
      points: 5,
      category: "Task Completion — Final answer/artifact",
      enforces: "Prompt: 'organize everything by platform first.' / SSOT page 2 (LinkedIn).",
      status: "present",
      observed:
        "The model created a LinkedIn/ folder containing 06-14, 06-17 and 06-29 — the only platform besides Instagram it produced.",
      rationale:
        "Each platform folder is an explicit structural requirement, so each gets its own rubric at +5. Bundling the three platforms into one rubric would hide partial failures — and partial failure (missing an entire channel) is exactly the predicted failure mode. Keeping them separate makes the score reflect which channels survived.",
    },
    {
      n: 3,
      text: "The model produces an Instagram folder as part of the output.",
      points: 5,
      category: "Task Completion — Final answer/artifact",
      enforces: "Prompt: 'organize everything by platform first.' / SSOT page 1 (Instagram).",
      status: "present",
      observed:
        "An Instagram/ folder was created, but it was over-filled: the model dumped the X maintenance and dashboard posts inside it under 06-07 and 06-10.",
      rationale:
        "Same structural requirement as the other platforms, scored independently. Instagram is the channel models tend to over-fill (absorbing X content), so verifying it exists in isolation is necessary before checking what is inside it.",
    },
    {
      n: 4,
      text: "The model produces an X folder as part of the output.",
      points: 5,
      category: "Task Completion — Final answer/artifact",
      enforces: "Prompt: 'organize everything by platform first.' / SSOT page 1 (boxed [X] section).",
      status: "not-present",
      observed:
        "No X/ folder existed at all. Its two posts were absorbed into Instagram — the single biggest failure of the run.",
      rationale:
        "This is the rubric that captures the headline trap. Because X is scribbled below Instagram on the same page, models routinely miss it entirely. Giving it a dedicated +5 rubric means the most common failure is heavily penalized and clearly visible in the score.",
    },
    {
      n: 5,
      text: "The model includes only IMG_20260314_173522.png in the LinkedIn/06-14 folder.",
      points: 3,
      category: "Task Completion — Final answer/artifact",
      enforces: "SSOT: 14th LinkedIn post + corresponding image.",
      evidence: ["IMG_20260314_173522.png"],
      status: "not-present",
      observed:
        "LinkedIn/06-14 did hold the right image, but its 351-word over-limit caption stayed in the folder, and the criterion was scored Not Present on the initial run.",
      rationale:
        "Checks correct image-to-post attribution at the date-folder level. The word 'only' matters: it fails the model both for omitting the right image and for padding the folder with extras, enforcing a clean one-image-per-plan mapping.",
    },
    {
      n: 6,
      text: "The model includes only phone.jpg in the LinkedIn/06-17 folder.",
      points: 3,
      category: "Task Completion — Final answer/artifact",
      enforces: "SSOT: 17th post 'with phone image'.",
      evidence: ["phone.jpg"],
      status: "not-present",
      observed:
        "The 06-17 folder kept BOTH phone.jpg and the unrelated tablet image update.png, so it was not only phone.jpg.",
      rationale:
        "The plan explicitly names a phone image for the 17th. This rewards the model for honoring an explicit asset cue and, via 'only', for not leaking unrelated images into the folder.",
    },
    {
      n: 7,
      text: "The model includes only carrousel_1.png, carrousel_2.png, carrousel_3.png, and carrsel_4.png in the Instagram/06-05 folder as content related to the 5-slide carousel post.",
      points: 3,
      category: "Task Completion — Final answer/artifact",
      enforces: "SSOT: 5th Instagram 5-slide cybersecurity carousel.",
      evidence: ["carrousel_1.png", "carrousel_2.png", "carrousel_3.png", "carrsel_4.png"],
      status: "not-present",
      observed:
        "The model kept all five carousel images — including carrousel_5.png (account monitoring), the slide that does not match the planned topic.",
      rationale:
        "Tests whether the model can keep the four genuine carousel slides while rejecting the look-alike fifth slide. It is a same-level bundle (four images, one post, one check) — which is exactly the case the method allows to be combined into a single rubric.",
    },
    {
      n: 8,
      text: "The model includes any of Screenshot_2026-05-29 091745.png, quote_3.png, IMG_33489034.png, or visual_3248329.png financial-quote images in the Instagram/06-05 folder.",
      points: 3,
      category: "Task Completion — Final answer/artifact",
      enforces: "SSOT: weekly Friday finance-quote rule (06-05 is a Friday).",
      evidence: ["Screenshot_2026-05-29 091745.png", "quote_3.png", "IMG_33489034.png", "visual_3248329.png"],
      status: "not-present",
      observed:
        "06-05 received no finance-quote image; the model never realised 06-05 is also a Friday quote day, so the quote slot was left empty.",
      rationale:
        "06-05 is both a carousel day and a Friday quote day, so it needs a finance quote too. Because the four quotes are interchangeable across the four Fridays, the rubric accepts any one of them — encoding the GTFA's deliberate non-uniqueness at the leaf level without breaking overall uniqueness.",
    },
    {
      n: 9,
      text: "The model includes a 06-05.txt file containing only the Strong passwords, Two-factor authentication, and Software updates sections of the 5-slide carousel caption in the Instagram/06-05 folder.",
      points: 3,
      category: "Task Completion — Final answer/artifact",
      enforces: "Prompt: 'save each one individually as an MM-DD.txt file.'",
      status: "not-present",
      observed:
        "The 06-05.txt file contained all five caption blocks, including the webcam (slide 3) and account-monitoring (slide 5) blocks that should have been dropped.",
      rationale:
        "This is the hardest caption-split check. The model must take the multi-part carousel caption, keep blocks 1/2/4, and drop blocks 3 (webcam, not phishing) and 5 (monitoring, not safe browsing). It tests fine-grained topic matching inside a single caption block, not just file-level routing.",
    },
    {
      n: 10,
      text: "The model includes only visual_5960419.png and visual_20260419.png within the Instagram/06-11 folder.",
      points: 3,
      category: "Task Completion — Final answer/artifact",
      enforces: "SSOT: 11th Instagram Q2 dinner recap.",
      evidence: ["visual_5960419.png", "visual_20260419.png"],
      status: "not-present",
      observed:
        "Both dinner images were placed correctly, but the Q1 mismatch caption was left inside the 06-11 folder instead of being logged and removed.",
      rationale:
        "Confirms both dinner images are grouped together and nothing else leaks in. Pairing them in one rubric is valid because they are the same-level content of a single post.",
    },
    {
      n: 11,
      text: "The model includes one of the remaining unused finance-quote images alone in the Instagram/06-12 folder.",
      points: 3,
      category: "Task Completion — Final answer/artifact",
      enforces: "SSOT: weekly Friday finance quote (06-12).",
      status: "present",
      observed:
        "Screenshot_2026-05-29 091745.png (Einstein quote) was placed alone in Instagram/06-12 — one of the few clean passes.",
      rationale:
        "Enforces one-quote-per-Friday distribution. 'Remaining unused' and 'alone' together verify the model treats the four quotes as a set to spread across Fridays rather than dumping them all in one folder.",
    },
    {
      n: 12,
      text: "The model includes one of the remaining unused finance-quote images alone in the Instagram/06-19 folder.",
      points: 3,
      category: "Task Completion — Final answer/artifact",
      enforces: "SSOT: weekly Friday finance quote (06-19).",
      status: "present",
      observed:
        "IMG_33489034.png was placed alone in Instagram/06-19.",
      rationale:
        "Same distribution logic for the third Friday. Kept as a separate rubric (not bundled with 06-12/06-26) because each date folder is an independent placement the model can get right or wrong on its own.",
    },
    {
      n: 13,
      text: "The model includes the remaining unused finance-quote image alone in the Instagram/06-26 folder.",
      points: 3,
      category: "Task Completion — Final answer/artifact",
      enforces: "SSOT: weekly Friday finance quote (06-26).",
      status: "present",
      observed:
        "visual_3248329.png was placed alone in Instagram/06-26; by the fourth Friday only one quote remained, and the model spread them correctly across the three Fridays it did recognise.",
      rationale:
        "Closes the distribution: by the fourth Friday only one quote should remain. Phrasing it as 'the remaining' quietly checks that the previous three were placed correctly, so this rubric also validates the set was exhausted exactly once.",
    },
    {
      n: 14,
      text: "The model includes either final_visual.png or Dash.jpg, or both, in the X/06-22 folder.",
      points: 3,
      category: "Task Completion — Final answer/artifact",
      enforces: "SSOT: 22nd X dashboard preview post.",
      evidence: ["final viasual.png", "Dash.jpg"],
      status: "not-present",
      observed:
        "The dashboard images were filed under Instagram/06-10, not X/06-22 — there was no X folder to receive them.",
      rationale:
        "Tests that the dashboard image lands in the right X date folder. It accepts either duplicate (or both) here because the duplicate-reporting requirement is graded separately by rubric 25 — this keeps each rubric measuring exactly one thing.",
    },
    {
      n: 15,
      text: "The model includes a 06-22.txt caption in X/06-22 referencing the dashboard presentation scheduled for 24th June.",
      points: 3,
      category: "Task Completion — Final answer/artifact",
      enforces: "Prompt: split captions to MM-DD.txt / SSOT dashboard post.",
      status: "not-present",
      observed:
        "The dashboard caption was saved as Instagram/06-10/06-10.txt, again under the wrong platform and date.",
      rationale:
        "Verifies the correct caption (the only block that matches cleanly) is split out and attributed to the dashboard post. It anchors on the concrete '24th June' detail so a vague or wrong caption can't pass.",
    },
    {
      n: 16,
      text: "The model includes only IMG_398573.png in the X/06-07 folder.",
      points: 3,
      category: "Task Completion — Final answer/artifact",
      enforces: "SSOT: 7th X support-maintenance post.",
      evidence: ["IMG_398573.png"],
      status: "not-present",
      observed:
        "The maintenance illustration IMG_398573.png was filed under Instagram/06-07 rather than X/06-07.",
      rationale:
        "Confirms the maintenance illustration is the single image for 06-07. This is the X post most likely to be mis-dated or mis-placed once X is recovered, so isolating it catches partial X reconstruction.",
    },
    {
      n: 17,
      text: "The model logs Instagram missing-information for the weekly finance-quote posts 06-05, 06-12, 06-19, and 06-26 — that captions are missing for all of them.",
      points: 3,
      category: "Task Completion — Final answer/artifact",
      enforces: "Prompt: 'Consider missing everything that is not appearing… but is part of our planning.'",
      status: "not-present",
      observed:
        "The model logged missing captions for 06-12, 06-19 and 06-26 — but omitted 06-05 and tied the rule to an invented under-500-word constraint, so the required four-Friday finding was incomplete.",
      rationale:
        "This is the first 'missing' bucket check. No finance-quote captions were recovered, so the model must positively report their absence in MEMORY.md rather than silently leaving the folders caption-less. It tests recognizing absence, which models often skip.",
    },
    {
      n: 18,
      text: "The model logs the LinkedIn 06-14 mismatch — that the caption exceeds the 300-word limit.",
      points: 3,
      category: "Task Completion — Final answer/artifact",
      enforces: "SSOT: 14th post 'in <300 words'.",
      status: "present",
      observed:
        "Logged correctly: MEMORY.md notes the 06-14 caption is 351 words and exceeds the limit.",
      rationale:
        "A cascade-point check: the prompt sets a length constraint and one caption violates it. The model has to actually evaluate the constraint against the content, not just file the caption — catching the over-length caption is the intended reasoning.",
    },
    {
      n: 19,
      text: "The model logs the LinkedIn 06-17 mismatch — that the caption omits the membership-tier details (Standard 500/month; Plus unlimited).",
      points: 3,
      category: "Task Completion — Final answer/artifact",
      enforces: "SSOT: 17th post must mention Standard 500 + Plus unlimited.",
      status: "present",
      observed:
        "Logged correctly: MEMORY.md flags that the 06-17 caption omits the Standard and Plus membership-tier details.",
      rationale:
        "Tests detection of a content omission, not a wrong value. The plan enumerates required details the caption never mentions; the model must compare the caption against the plan's required points and report what's absent.",
    },
    {
      n: 20,
      text: "The model logs the LinkedIn 06-29 mismatch — wrong phone number (617) 555-0537 instead of Brandon's (617) 555-0394.",
      points: 3,
      category: "Task Completion — Final answer/artifact",
      enforces: "SSOT: 29th post must include Brandon's personal phone number.",
      evidence: ["persona_context.md"],
      status: "present",
      observed:
        "Logged correctly, and then some — the model flagged (617) 555-0537 vs Brandon's (617) 555-0394, and even (incorrectly) attributed the wrong number to Maya.",
      rationale:
        "A cross-source check that reaches outside the plan into the persona/universe: the correct number lives in Brandon's profile. The model must cross-reference the caption's number against the persona to flag the error — and 06-29 is image-less, so it must surface only in MEMORY.",
    },
    {
      n: 21,
      text: "The model logs the Instagram 06-05 mismatches — the 'phishing awareness' and 'regular safe browsing habits' captions, and the carrousel_5.png image.",
      points: 3,
      category: "Task Completion — Final answer/artifact",
      enforces: "Prompt: 'Consider mismatching everything appearing but not fully matching the planning.'",
      evidence: ["carrousel_5.png"],
      status: "present",
      observed:
        "Logged correctly: the slide-3 webcam and slide-5 monitoring caption mismatches and the carrousel_5.png image were all noted.",
      rationale:
        "Bundles the three same-level 06-05 mismatches (two caption blocks + one image) into one rubric, which the method permits because they all belong to the same post. It rewards the model for noticing that look-alike carousel content doesn't actually match the planned slide topics.",
    },
    {
      n: 22,
      text: "The model logs the Instagram 06-11 mismatch — a dinner-post caption referencing Q1 instead of Q2.",
      points: 3,
      category: "Task Completion — Final answer/artifact",
      enforces: "SSOT: 11th post recaps the Q2 dinner held June 1st.",
      status: "present",
      observed:
        "Logged correctly: MEMORY.md notes the 06-11 caption recaps Q1 instead of the planned Q2.",
      rationale:
        "Tests semantic mismatch detection: the caption is topically close (a quarter recap) but wrong (Q1, not Q2). The model must read the caption's content against the plan's intent, not just match it by keyword to the dinner post.",
    },
    {
      n: 23,
      text: "The model logs the X 06-07 mismatch — 4am PST listed as the maintenance end time instead of 3am PST.",
      points: 3,
      category: "Task Completion — Final answer/artifact",
      enforces: "SSOT: support maintenance ends 3am PST.",
      status: "not-present",
      observed:
        "The model logged a maintenance mismatch, but anchored it to an invented plan of 12 AM to 8 AM BST — so the specific 4 AM-vs-3 AM PST finding was never produced.",
      rationale:
        "A value-mismatch check across modalities (handwritten note vs typed caption). The numbers are close, so it tests careful reconciliation — but it is one of several mismatch points, so a single misread here doesn't sink the whole task (avoiding the single-number gotcha).",
    },
    {
      n: 24,
      text: "The model reports in the final assistant message that IMG_39852.png, Screenshot_2026-06-03 234708.png, visual_8456934.png, and update.png were removed.",
      points: 3,
      category: "Task Completion — User-facing message",
      enforces: "Prompt: 'Any content removed should be included in your final message.'",
      evidence: ["IMG_39852.png", "Screenshot_2026-06-03 234708.png", "visual_8456934.png", "update.png"],
      status: "not-present",
      observed:
        "The final message listed visual_8456934.png, IMG_39852.png and Screenshot_2026-06-03 234708.png as removed — but dropped update.png (left in a folder) and wrongly listed quote_3.png, so the required four-distractor set was not reported.",
      rationale:
        "Verifies the 'removable' bucket end-to-end: the four unrelated distractors must be both excluded from folders and explicitly surfaced to the user. Graded on the user-facing message (not the file tree) because the prompt asks for them to be reported, not stored.",
    },
    {
      n: 25,
      text: "The model reports in the final assistant message that final_viasual.jpg or Dash.jpg are duplicated images.",
      points: 1,
      category: "Agent Behaviour — User-facing message",
      enforces: "Implicit good behavior: surface duplicates.",
      evidence: ["final viasual.png", "Dash.jpg"],
      status: "present",
      observed:
        "Caught it: both the final message and MEMORY.md report that Dash.jpg and final viasual.png are byte-identical duplicates.",
      rationale:
        "A lighter +1 'good behavior' reward. Detecting the duplicate isn't strictly required to build the folders, so it carries a small weight — it differentiates careful models without dominating the score. It complements rubric 14, which intentionally accepts either file.",
    },
    {
      n: 26,
      text: "The model emails trevor@vaulta.io and maya@vaulta.io describing the identified mismatches (the six mismatch points across LinkedIn, Instagram, and X).",
      points: 5,
      category: "Task Completion — State change",
      enforces: "Prompt: 'send Trevor and Maya an email with the mismatches to fix.'",
      evidence: ["persona_context.md"],
      status: "not-present",
      observed:
        "The final message claims Email sent to Trevor and Maya, but the trajectory contains no email or send action — only exec, write, read, image and memory_search calls. The state-change never happened.",
      rationale:
        "The only state-change action in the task, weighted +5 to match its importance. It is a capstone: to write a correct email the model must have already found all the mismatches, so this rubric implicitly validates the whole mismatch audit and tests whether the model takes a real action rather than just producing files.",
    },
    {
      n: 27,
      text: "The model includes an 'Unassigned' section in MEMORY.md, despite it not being part of the requested missing/mismatching workflow.",
      points: -1,
      category: "Agent Behaviour — Final answer/artifact",
      enforces: "Prompt defines only missing / mismatching / removable buckets.",
      status: "present",
      observed:
        "Failure: the model invented an UNASSIGNED / EXTRA CONTENT section in MEMORY.md listing quote_3.png, IMG_39852.png and visual_8456934.png — a bucket the prompt never defined.",
      rationale:
        "The single negative rubric. The prompt defines exactly three buckets; inventing an 'Unassigned' catch-all is scope creep that pollutes the deliverable. The −1 penalty discourages the model from inventing structure the user never asked for — rewarding disciplined adherence to the specified format.",
    },
  ],

  friction: [
    {
      id: "x-under-ig",
      title: "X scattered under Instagram",
      type: "perception",
      where: "SSOT page 1 (1780566865852.jpeg)",
      description:
        "The X plan is boxed below the Instagram plan on the same handwritten page, instead of on its own page.",
      whyItWorks:
        "Models lean on page/layout structure and lump X posts under Instagram, missing the entire X channel — the task's primary, reasoning-shaped failure mode.",
    },
    {
      id: "strike-16-14",
      title: "Crossed-out date (16th → 14th)",
      type: "mismatch",
      where: "SSOT page 2 (LinkedIn)",
      description: "The LinkedIn post date is written as 16th, struck out, and rewritten as 14th.",
      whyItWorks:
        "Tests whether the model honors the strike-through. A model that reads the crossed-out value files the post under the wrong date.",
    },
    {
      id: "carousel-caption-split",
      title: "Carousel caption only partly matches",
      type: "mismatch",
      where: "text_post.txt block 6 vs SSOT carousel slides",
      description:
        "The 5-part carousel caption includes webcam (not phishing) and account-monitoring (not safe browsing) blocks.",
      whyItWorks:
        "Forces topic-level matching inside a single caption — keep 3 blocks, drop 2 — rather than routing the whole block to one folder.",
    },
    {
      id: "over-limit",
      title: "Caption over the 300-word limit",
      type: "mismatch",
      where: "text_post.txt block 1 → LinkedIn 06-14",
      description: "The financial-ecosystem caption far exceeds the plan's <300-word constraint.",
      whyItWorks:
        "A cascade point: the prompt sets the limit, the input violates it, and the model must notice and log it instead of silently including it.",
    },
    {
      id: "wrong-phone",
      title: "Wrong phone number",
      type: "mismatch",
      where: "text_post.txt block 3 → LinkedIn 06-29",
      description: "The Boston-office caption lists (617) 555-0537 instead of Brandon's (617) 555-0394.",
      whyItWorks:
        "Requires cross-referencing the caption against the persona/universe — difficulty that lives in the join between sources.",
    },
    {
      id: "q1-q2",
      title: "Q1 vs Q2 caption swap",
      type: "mismatch",
      where: "text_post.txt block 4 → Instagram 06-11",
      description: "The dinner-recap caption celebrates Q1 while the planned post recaps Q2.",
      whyItWorks:
        "Semantically close but wrong — tests reading content meaning rather than keyword-matching to the dinner post.",
    },
    {
      id: "4am-3am",
      title: "4am vs 3am maintenance time",
      type: "mismatch",
      where: "text_post.txt block 5 → X 06-07",
      description: "The maintenance caption ends at 4am PST; the SSOT says 3am.",
      whyItWorks:
        "One of several mismatch points, so the careful number-reconciliation matters without the whole task hinging on a single digit.",
    },
    {
      id: "missing-captions",
      title: "Missing finance-quote captions",
      type: "missing",
      where: "Instagram Fridays (06-05/12/19/26)",
      description: "No captions were recovered for the weekly finance-quote posts.",
      whyItWorks:
        "Tests the 'missing' bucket: the model must positively report absence rather than leaving folders quietly incomplete.",
    },
    {
      id: "duplicate-dash",
      title: "Duplicate dashboard image",
      type: "removable",
      where: "final viasual.png vs Dash.jpg",
      description: "Two pixel-identical dashboard images were recovered from different sources.",
      whyItWorks:
        "Realistic multi-source artifact; rewards the model for deduplicating and reporting it.",
    },
    {
      id: "distractors",
      title: "Four unrelated distractor images",
      type: "removable",
      where: "IMG_39852, Screenshot_2026-06-03, visual_8456934, update",
      description:
        "Ransomware graphic, live-webinar badge, mac-and-cheese recipe, and a 'latest update' tablet — none map to the plan.",
      whyItWorks:
        "Tests the 'removable' bucket: noise that must be excluded and reported, mirroring a real messy recovery.",
    },
  ],

  captionsFile: {
    path: "mm_input/text_post.txt",
    note: "Every recovered caption, mixed together in one numbered file. Note that block 6 contains the whole 5-part carousel caption, and a second block labelled '6.' holds the dashboard caption — the messy numbering is part of the audit.",
  },

  actualRun: {
    summary:
      "A single-turn run from seed. The model audited the content energetically but lost the X channel entirely, mis-dated the dashboard post, left mismatched content sitting inside post folders, invented an 'Unassigned' bucket, and signed off by claiming it had emailed the team — an action it never actually performed. The result lands well below the 50% positive-weight bar, which is exactly the genuine failure the task was engineered to produce and what justifies the Silver Trajectory.",
    toolStats: [
      { label: "exec", value: 23 },
      { label: "image", value: 10 },
      { label: "write", value: 8 },
      { label: "read", value: 6 },
      { label: "memory_search", value: 1 },
    ],
    producedTree: {
      name: "social-media",
      type: "folder",
      children: [
        {
          name: "Instagram",
          type: "folder",
          role: "correct",
          children: [
            {
              name: "06-05",
              type: "folder",
              note: "kept ALL FIVE carousel images + a 5-block caption",
              children: [
                { name: "carrousel_1.png", type: "image", role: "correct" },
                { name: "carrousel_2.png", type: "image", role: "correct" },
                { name: "carrousel_3.png", type: "image", role: "correct" },
                { name: "carrousel_5.png", type: "image", role: "mismatch", note: "should have been removed (account monitoring ≠ safe browsing)" },
                { name: "carrsel_4.png", type: "image", role: "correct" },
                { name: "06-05.txt", type: "text", role: "mismatch", note: "all 5 blocks, incl. webcam + monitoring; no finance quote" },
              ],
            },
            {
              name: "06-07",
              type: "folder",
              role: "mismatch",
              note: "this is an X post — filed under Instagram by mistake",
              children: [
                { name: "IMG_398573.png", type: "image", role: "mismatch" },
                { name: "06-07.txt", type: "text", role: "mismatch", note: "4am vs 3am never caught; invented '8 AM BST'" },
              ],
            },
            {
              name: "06-10",
              type: "folder",
              role: "mismatch",
              note: "the X dashboard post — wrong platform AND wrong date (plan: X/06-22)",
              children: [
                { name: "Dash.jpg", type: "image", role: "duplicate" },
                { name: "final viasual.png", type: "image", role: "duplicate" },
                { name: "06-10.txt", type: "text", role: "mismatch" },
              ],
            },
            {
              name: "06-11",
              type: "folder",
              note: "right images, but the Q1 mismatch caption was left inside",
              children: [
                { name: "visual_5960419.png", type: "image", role: "correct" },
                { name: "visual_20260419.png", type: "image", role: "correct" },
                { name: "06-11.txt", type: "text", role: "mismatch", note: "Q1 recap — should have been logged + removed" },
              ],
            },
            { name: "06-12", type: "folder", note: "one quote, placed correctly", children: [{ name: "Screenshot_2026-05-29 091745.png", type: "image", role: "correct" }] },
            { name: "06-19", type: "folder", note: "one quote, placed correctly", children: [{ name: "IMG_33489034.png", type: "image", role: "correct" }] },
            { name: "06-26", type: "folder", note: "one quote, placed correctly", children: [{ name: "visual_3248329.png", type: "image", role: "correct" }] },
          ],
        },
        {
          name: "LinkedIn",
          type: "folder",
          role: "correct",
          children: [
            {
              name: "06-14",
              type: "folder",
              children: [
                { name: "IMG_20260314_173522.png", type: "image", role: "correct" },
                { name: "06-14.txt", type: "text", role: "mismatch", note: "351 words — over the limit, left in place" },
              ],
            },
            {
              name: "06-17",
              type: "folder",
              note: "kept the wrong asset alongside the right one",
              children: [
                { name: "phone.jpg", type: "image", role: "correct" },
                { name: "update.png", type: "image", role: "distractor", note: "tablet, not a phone — should have been removed" },
                { name: "06-17.txt", type: "text", role: "mismatch" },
              ],
            },
            {
              name: "06-29",
              type: "folder",
              children: [{ name: "06-29.txt", type: "text", role: "mismatch", note: "wrong phone number" }],
            },
          ],
        },
        {
          name: "✗ X  (never created)",
          type: "folder",
          role: "missing",
          note: "the entire X channel was absorbed into Instagram",
        },
        {
          name: "MEMORY.md",
          type: "doc",
          role: "mismatch",
          note: "good mismatch logging, but added an invented 'UNASSIGNED / EXTRA CONTENT' section",
        },
      ],
    },
    observations: [
      {
        id: "no-x",
        title: "The entire X channel vanished",
        impact: "fail",
        rubrics: [4, 14, 15, 16],
        what: "No X/ folder was created. The support-maintenance post landed in Instagram/06-07 and the dashboard post in Instagram/06-10 — both absorbed under Instagram because the X plan is boxed below Instagram on the same handwritten page.",
        lesson: "This is the headline failure the SSOT layout was designed to provoke. Models lean on page/layout structure, so the boxed [X] section gets lumped under Instagram. Four +5/+3 rubrics hinge on it.",
      },
      {
        id: "dashboard-misdate",
        title: "Dashboard post mis-dated to 06-10",
        impact: "fail",
        rubrics: [14, 15],
        what: "Even setting the platform aside, the dashboard preview was filed under date 06-10. The plan places it on the 22nd. The model invented a date instead of reading the planned one.",
        lesson: "Structural placement (platform + date) is graded independently from content. A wrong date fails the date-folder rubrics even when the right files are present.",
      },
      {
        id: "log-but-keep",
        title: "Mismatches logged, but left inside the folders",
        impact: "partial",
        rubrics: [6, 7, 9, 10],
        what: "The model correctly noted several mismatches in MEMORY.md, yet still kept the offending content in the post folders: all five carousel slides, the 5-block 06-05 caption, the Q1 dinner caption, and update.png next to phone.jpg.",
        lesson: "The prompt's 'mismatching' bucket means log AND remove from the post — detection alone is half the job. The 'only …' wording in the rubrics is what catches the leftovers.",
      },
      {
        id: "unassigned",
        title: "Invented an 'Unassigned' bucket",
        impact: "fail",
        rubrics: [27],
        what: "MEMORY.md gained an 'UNASSIGNED / EXTRA CONTENT' section listing quote_3.png, IMG_39852.png and visual_8456934.png — a category the prompt never defined.",
        lesson: "The prompt defines exactly three buckets: missing, mismatching, removable. Inventing a fourth is scope creep — and the run trips the single negative rubric (a negative criterion that is Present is a failure).",
      },
      {
        id: "phantom-email",
        title: "Claimed an email it never sent",
        impact: "hallucination",
        rubrics: [26],
        what: "The final message states 'Email sent to Trevor and Maya.' The trajectory contains no email or send action — only exec, write, read, image and memory_search calls. The one state-change in the task was fabricated.",
        lesson: "Never grade a state-change from the model's self-report. Verify the action in the trajectory. Here the only +5 state-change rubric fails despite a confident claim of success.",
      },
      {
        id: "hallucinated-plan",
        title: "Hallucinated plan details that aren't in the SSOT",
        impact: "hallucination",
        what: "The audit asserted ground truth the handwritten plan never states: maintenance '12 AM–8 AM BST', a 'June 9th' dashboard date, that '(617) 555-0537 is Maya's number', and a 'MARKETING watermark'. Some mismatch reports are anchored to invented facts.",
        lesson: "A few criteria passed for the wrong reason. When cross-referencing GTFA vs. response, separate genuine findings from confident fabrication — it changes which rubrics legitimately count.",
      },
    ],
  },

  artifactDocs: [
    { label: "Persona context", file: "persona_context.md", description: "Full persona profile the contributor built from the universe." },
    { label: "Rationale", file: "rationale.md", description: "The contributor's step-by-step reasoning for the whole task." },
    { label: "Prompt", file: "prompt.md", description: "The final user-facing prompt + category/subcategory." },
    { label: "GTFA", file: "GTFA.md", description: "The Ground Truth Final Answer / Desired Outcome." },
    { label: "Rubrics", file: "rubrics.md", description: "The raw 27-criterion rubric set." },
    { label: "Draft history", file: "draft_history.md", description: "Agent objective and desired outcome notes." },
  ],
};

export default task1;
