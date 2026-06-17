# Golden Task Viewer

An interactive educational platform that turns **Golden Tasks** into guided learning
experiences. Contributors don't just see *what* a good task looks like — they follow the
full reasoning behind it, step by step, all the way to every rubric and *why* it exists.

Built with **React + TypeScript + Vite + Tailwind CSS + Framer Motion**.

---

## What's inside

**The Method** (home page) — an interactive walkthrough of the 12-step Golden Task
workflow (persona → brainstorm → build the reality → prompt → GTFA → silver trajectory →
rubrics), cross-linked to the three guiding principles and the Complexity Playbook levers.

**Golden Tasks** (library) — a scalable catalog of reconstructed tasks. Today it holds one
fully reconstructed example: *Emergency Social Media Recovery*.

**Task reconstruction** — a top-to-bottom, drill-down walkthrough of a single task:

| Section | What you can do |
| --- | --- |
| Persona | See the highlights + open the full `persona_context.md` |
| Brainstorm | Compare the 3 ideas; see why one was chosen |
| Build the reality | The "design the world first" reasoning + MM strategy |
| MM inputs | Spotlighted SSOT notes, a filterable image gallery with per-asset rationale, and the untangled caption file |
| The prompt | The natural prompt with hover-to-decode intent annotations |
| Ground Truth | An interactive output folder tree, the `MEMORY.md` log, removed items, and the team email |
| Friction map | Every planted friction point and why it works |
| Silver trajectory | The follow-up sequence that guides the model to correct |
| Unit tests | The reviewer-only structural checks |
| Rubrics | All 27 criteria with **authored rationale**, weights, categories, and the ≥50% fail bar |
| Raw artifacts | Every source `.md`, rendered verbatim |

> The task rationale asked the viewer to supply the rubric rationale itself. Each rubric in
> the Rubrics section includes an authored explanation of why it exists, what prompt
> requirement it enforces, and how its weight reflects the failure mode it targets.

---

## Running it

### Windows (Google Drive) — recommended

The project lives on a Google Drive path. Drive's virtual filesystem **cannot** host a
`node_modules` folder (npm crashes with `EBADF`/`ENOTEMPTY`, and Windows junctions aren't
allowed on the Drive mount). The included launcher works around this by mirroring the
project to local disk and running it there.

1. Open **PowerShell**.
2. `cd "G:\My Drive\Openclaw MM Rubrics\Golden Tasks Viewer\viewer"`
3. `.\run.ps1`

The first run installs dependencies (~30s) into
`%LOCALAPPDATA%\golden-task-viewer`, then starts the dev server. Open the printed URL
(**http://localhost:5173/**). Re-run `.\run.ps1` any time — it re-syncs and relaunches.

> If PowerShell blocks the script, run once:
> `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` and try again.

### Any machine on a local (NTFS) disk

If the project is on a normal local disk (not a Drive mount), no workaround is needed:

```bash
cd viewer
npm install
npm run dev      # http://localhost:5173
```

### Production build / preview

```bash
npm run build    # outputs static files to dist/
npm run preview  # serves the built site locally
```

---

## Deploying (optional)

The build is fully static and uses **hash routing** + **relative asset paths**, so it works
from any sub-path with no server config.

- **Vercel** — import the repo, set the project root to `viewer/`, framework preset *Vite*.
  Build command `npm run build`, output dir `dist`. Done.
- **GitHub Pages** — run `npm run build`, then publish the `dist/` folder (e.g. via the
  `gh-pages` branch). Add an empty `.nojekyll` file alongside it so asset folders serve.
- **Netlify / static host** — drop the `dist/` folder in. No redirects needed (hash router).

---

## Adding a new Golden Task (scalability)

The platform is data-driven. To add a task:

1. Copy its assets into `public/tasks/<task-id>/` (`mm_input/` for images + the caption file,
   `artifacts/` for the markdown documents).
2. Create `src/data/tasks/<task-id>.ts` exporting a `Task` object (use `task1.ts` as a
   template — the `Task` type in `src/data/types.ts` documents every field).
3. Register it in `src/data/index.ts`.

It automatically appears in the library and gets its own reconstruction page.

---

## Project structure

```
viewer/
├─ public/tasks/task1/        # copied task assets (images, captions, artifacts)
├─ src/
│  ├─ data/                   # the content layer (types, method, per-task data)
│  ├─ components/             # gallery, folder tree, rubric explorer, markdown, layout…
│  ├─ pages/                  # Home (method), Tasks (library), TaskDetail
│  └─ lib/                    # asset URLs, role styling, scroll-spy
├─ run.ps1                    # Windows/Drive launcher
└─ …config (vite, tailwind, ts)
```
