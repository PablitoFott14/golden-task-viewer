# What the Model Can and Cannot Reliably Do

Use this reference when deciding where a Golden Task should get its complexity. Reliable capabilities are good foundations, but they are not enough by themselves. Genuine task difficulty usually comes from combining reliable skills with one or more known failure modes in a realistic scenario.

## What the Model Can Reliably Do

These are capabilities contributors can usually assume will work correctly. A task that exercises only these abilities, without combining them into a harder reconciliation problem, will usually be too easy to meet the `>=50%` rubric-failure requirement.

| Capability | What this means for task design |
| --- | --- |
| Reads and reasons over text inputs with high accuracy | PDFs, Markdown, plain text, JSON, CSV, and similar text files are parsed reliably. The model can extract values, do arithmetic, and cross-reference text files. |
| Uses tools when they are present in the loadout | Calendar lookups, contact lookups, email reads, file writes, and code execution work when the relevant skill is registered in the system prompt. |
| Executes code through the exec tool | The model can run shell commands, Python scripts, ffmpeg, Whisper, pip installs, file-system operations, and available command-line tools. |
| Extracts content from images with the read tool | When the model reads a `.jpg`, `.png`, or `.webp`, OpenClaw returns visual content for reasoning. This works for receipts, screenshots, handwritten notes, photos, charts, and diagrams, with caveats for handwriting. |
| Extracts frames from video with ffmpeg | A useful pattern is `ffmpeg -ss <timestamp> -i video.mp4 -vframes 1 frame.jpg`, followed by reading the extracted frame. |
| Transcribes short clean audio with local Whisper | Clean recordings under 60 seconds are usually transcribed accurately. |
| Writes deliverable files to the workspace | Markdown, CSV, JSON, plain text, HTML, and similar outputs are reliable. The model can also create directories and organize files into subfolders. |
| Performs structured reasoning across multiple sources when explicitly prompted | If the prompt naturally tells the model to check both source A and source B, it will usually do so. The failure mode is forgetting to ask for that reconciliation clearly. |
| Follows explicit formatting constraints | Exact column names, section order, and file naming work when stated clearly in the prompt itself, not only in the Desired Outcome. |
| Handles policy-driven reasoning from input files | Threshold rules, exclusion lists, and conditional logic in reference documents are usually applied correctly when the model is instructed to consult them. |

## What the Model Cannot Reliably Do

These weaknesses are useful task levers. A strong Golden Task can require one or more of these behaviors in a way that feels natural to the persona, category, and scenario.

| Failure mode | How to use it as a task lever |
| --- | --- |
| Single-source reliance | The model may read one source and skip a second source that contradicts it. Force a natural cross-source or cross-modal check. |
| Fabricating precise numbers | The model may invent exact lengths, dates, dollar amounts, or measurements when no clear source exists. Remove rulers, scales, or explicit values if precision should be impossible. |
| Filename-as-evidence | The model may treat filenames as evidence instead of opening the file. Use misleading but plausible filenames when the pixels prove something different. |
| Handwritten digit confusion | The model may confuse digits such as 6 vs 8, 1 vs 7, or 3 vs 8. This can cascade through calculations, dates, and rankings. |
| Auto-correcting protected user content | The model may "fix" typos, slang, or casual wording even when the task asks it to preserve the original. Embed content where preservation matters. |
| Skipped conditional logic | The model may perform an action even when a condition resolves to "no action needed." Use conditional branches where the correct result is to avoid an action. |
| Failing to discover the correct available tool | If multiple channels are available, the model may default to the wrong one. Require a specific channel and verify it used that route. |
| First-text-match wins over visual evidence | The model may anchor on the first written option and ignore later visual evidence. Place a plausible wrong answer before the visual truth. |
| Missing implicit prerequisites | The model may estimate instead of querying required background information mentioned indirectly. Make the missing prerequisite discoverable through tools or context. |
