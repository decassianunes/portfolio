# Media Management Ecosystem for a B2B SaaS Platform

**Role:** Product Designer (end-to-end: discovery → UX / UI → hand-off → implementation support → analytics → iterations)
**Timeline:** ~4 years
**Team:** Me (Product Designer), Product Manager, Frontend & Backend engineers, Copywriting
**Platform:** An employee-communication SaaS

<!-- IMAGE: hero shot — the final, polished File Manager UI (the "money shot") -->

---

## Overview

Imagine you need to create content at an enterprise level — you need a dedicated tool, with a set of tools inside it, to do so. In this project, that tool was called Experience Studio. It's where companies build the content their employees read — news, pages, emails, campaigns. And a big chunk of that content is media. The problem started when the Studio couldn't give good support for handling that media. The way people handled the files behind their content was fragmented and frustrating: no way to reuse a file, no way to share approved assets, no way to delete or replace outdated ones, and no visibility into how media performed — on top of diverse, disconnected upload flows.

Over roughly four years I helped design a connected **media-management ecosystem** made of two complementary features — **My Files** (for content editors) and **File Manager** (for admins) — that turned scattered, one-off uploads into a central, permission-aware system for uploading, reusing, organizing, sharing, replacing, and analyzing files.

Today the File Manager sits at roughly **95% adoption** with about **1,500 active business accounts**.

---

## Context: one product, two very different users

The product has two sides:

- **The Studio** — where **admins** and **editors** create content.
- **The App** — where **employees** consume that content.

My scope was the Studio, and specifically the two roles who live there:

- **Claire, the Admin** — responsible for making sure editors use the *correct*, approved, up-to-date assets across the whole company.
- **Joe, the Content Creator / Editor** — focused on creating and publishing content, who just wants to *reuse* the right files without friction.

These two people have genuinely different jobs. Claire needs *control and oversight*. Joe needs *speed and reuse*. Designing one media system that served both — without getting in either's way — became the spine of the whole project.

---

## The problem

When I picked up this work, handling media in the Studio meant:

- **A complex, unfriendly upload flow** — an overloaded editor toolbar with too many media icons and high cognitive load (3 different upload buttons vs. drag-and-drop vs. media widgets).
- **No way to reuse files** — every use meant a fresh upload, even for the same asset.
- **No upload feedback** — no progress indicator, no clear error messages.
- **No way to delete or replace files** — outdated documents lived on across published pages with no clean way to update them.
- **No sharing and no collaboration** — admins couldn't hand editors a curated set of approved assets, so teams leaned on external tools like Google Drive and Canva. That broke the content-creation flow and pulled work outside the Studio.

In short: the Studio had no central, trustworthy home for company media. That was both a daily usability pain *and* a business opportunity — every file managed in an external tool was value leaving the product.

---

## The core challenge: permissions, roles, and "spaces"

The Studio is built on layered roles and permission levels, defined by user groups and tied to structural units called **spaces**. Almost every media decision collided with this system:

- Which files should be saved? From which plugins?
- Where should they be saved?
- Are the content creators (including external creators) allowed to see all files?
- Who is allowed to *delete* a file — and from where? An editor? An admin? What happens to content that already uses it?
- How do you let an admin *share* a curated collection of files without that sharing being blocked or fragmented by space permissions?
- If a file is *replaced*, does it change everywhere it's used — in content, in collections, in someone's personal files?

The single biggest breakthrough was realizing that **collections should not be tied to spaces at all.** The content section was filtered by space definitions, which meant a space-bound approach to sharing would quietly fail for real customers. Decoupling media from the space hierarchy — and eventually moving the File Manager to a *global* place in the Studio — is what finally made sharing and collections possible.

This is the thread I'm proudest of: the visible design work (clean modals, clear icons) sat on top of a much harder, invisible design problem — modeling *who can do what, to which file, in which context.*

---

## Approach & process

This was not a tidy, linear process, and I think that's the honest and valuable part of the story.

**Discovery.** We ran early workshops with PMs and developers to understand how media was actually handled, plus product calls and feedback rounds with customers. A recurring insight: on almost every team — small or large — there's a specific person responsible for defining the "correct" assets, and editors should only ever touch the *final* approved set. That single learning justified the whole admin/editor split.

**Framing with "How Might We."** I used HMW questions to keep reframing the problem as it grew, for example:
- How might we allow content creators to upload and reuse their own files?
- How might we create a central place where admins can create, share, and manage files with editors?
- How might we enable admins to update document files already used in pages and news?
- How might we measure adoption of these features?

**Personas and jobs-to-be-done.** Claire and Joe (above) anchored every flow decision in a real job rather than an abstract feature.

**A feature-architecture map.** Because the ecosystem got genuinely complex, I built a feature-architecture scheme — a diagram translating users' jobs-to-be-done into a connected set of features, showing where My Files and File Manager overlap, connect, or stay separate. This kept the team aligned on *what belonged where.*

**Embracing the non-linear.** The project literally started as a narrow "How might we let users delete files inside My Files?" — and grew, through the realization that deletion touches roles, permissions, and published content, into the much larger File Manager vision. I've kept that origin in the story on purpose: the reframing *is* the design work.

### Usability testing

I validated the riskiest decisions with real users instead of assumptions. A few tests that directly shaped the product:

- **Editor toolbar & the "My Files" icon (Tests 1 & 2).** I tested how people interacted with the media toolbar and which icon best communicated "My Files." Interestingly, the test pointed toward a *folder* icon — a good reminder that my instinct and the evidence don't always agree.
- **Video-insights trigger.** I tested how to reveal a metric's explanation *without* breaking the user's flow. The winner was a persistent support "?" button over fragile hover interactions.
- **Navigation between All Files and All Collections.** I tested whether users could move cleanly between the two sections, which fed the navigation redesign.

<!-- IMAGE: usability test setup / before-and-after of the icon or insights trigger -->

---

## The ecosystem: My Files ↔ File Manager

The core structural decision was to split the experience by role, then connect the two halves:

- **My Files (editor-facing)** — lives inside the content-creation flow. Editors upload new files, reuse their own previous uploads from many entry points (media plugins, email, widgets), and access collections that admins have shared with them. The guiding principle: *in the editor's world, the goal is to create content, not to manage files.*

- **File Manager (admin-facing)** — a dedicated, global interface for admins to upload, search, filter, organize, share, delete, replace, and analyze files across the whole platform. The guiding principle: *give admins real control and oversight, in a space designed for management, not content creation.*

Under the hood I designed shared functions the two features could reuse, so the ecosystem stayed consistent even as each side evolved at its own pace.

---

## ★ Deep dive: File Manager

The File Manager is the heart of this case study — the admin's command center for company media. It grew feature by feature, each with its own design story.

### Collections & sharing — the headline problem
Admins needed to group approved files and share them with specific editors or user groups. The challenge was everything above: spaces and permissions. Key decisions:
- We renamed **"folders" → "collections."** A folder implies *moving* a file; in our system a file is *copied* to exist inside a collection while the original stays put. New name, less confusion.
- For the MVP we deliberately **dropped sub-collections** — a flatter structure meant no breadcrumbs and a simpler back-button navigation.
- Sharing was built on **user groups**, reusing logic the Studio already had, with roles per collection (view-only vs. manage).

<!-- IMAGE: Collections — create/share flow or the collection grid -->

### File deletion — where it all started
The project's original seed. We had to reason carefully about impact: a deleted file might live in My Files, in the content editor, *and* in already-published content. We ended up defining multiple deletion paths (including a "forced deletion" for admins to remove compromised or wrong files across every space) and, importantly, rethought *who* should be allowed to delete, given the downstream impact on published content.

<!-- IMAGE: deletion flow / confirmation modal -->

### Replacement + version history + file usage
A frequently requested capability: let admins swap an outdated document for a new version *without* manually hunting down and re-uploading it everywhere. This raised deep questions — When exactly does the replacement happen? Does it propagate to every usage? Where does version history live? After back-and-forth with engineering, we chose a fullscreen approach over stacking a modal-on-a-modal, which reduced accessibility problems and gave users the context they needed to replace confidently.

<!-- IMAGE: replace flow — fullscreen vs the earlier modal-on-modal -->

### File Insights — measuring media
Contextual analytics per file type, starting with **video** metrics (Total Play, Unique Play, Watch Time), tracked via Pendo. We ran usability tests on how to surface a metric's explanation without interrupting the flow, landing on a support "?" trigger rather than fragile hover interactions. Scope was intentionally trimmed over time as priorities shifted — an honest reflection of real product trade-offs.

<!-- IMAGE: File Insights — video metrics card with the "?" support trigger -->

*(My Files evolved in parallel — condensed upload, reuse from many entry points, access to shared collections — but File Manager is where the system's complexity concentrated.)*

---

## Key decisions & trade-offs

- **Folders → Collections** — language shapes mental models; we chose the word that matched how the system actually behaves.
- **Condensed upload icon** — we collapsed the cluttered toolbar into a single condensed upload. The first icon (a paperclip) confused users, who couldn't tell attachments from media uploads; we switched to an image icon and adoption of the new toolbar settled.
- **Fullscreen over modal-on-modal** — chosen for accessibility and context, and it gave us a flexible, expandable pattern for future features.
- **Scoping and feature priority** — repeatedly cutting scope (no sub-collections, video-only insights first, replacement before version history, no version history for deletion) to ship real value in small, backend-feasible batches.

---

## Where it broke — failures & iterations

The parts I learned the most from didn't work the first time.

- **The paperclip that confused everyone.** The first condensed-upload icon (a paperclip) made users think "attachment," not "media upload." We switched to an image icon and the confusion disappeared.
- **Version history vs. changelog.** Backend started building version history as a *changelog* (every edit), while the design intent was to preserve the file's original registration. It took several cross-team discussions to realign on the same concept.
- **Putting File Manager in the wrong place.** In the first implementation the information architecture wasn't clear, and the global File Manager landed under "content" — even though that clashed with how spaces work. We flagged it, then later moved it to a properly global location.
- **Hover-heavy interactions hurt accessibility.** Early designs leaned on hover and tooltips; testing and review pushed us to reduce hover and add a persistent support "?" trigger instead.
- **Losing the source of truth.** With so many iterations, developers sometimes built from outdated Figma files. I fixed the *process*, not just a screen — consolidating everything into a single Figma Library (documented components, used icons, known issues) so there was one reliable source.

<!-- IMAGE: before → after of one failure, e.g. paperclip vs image icon, or the File Manager relocation -->

---

## Results & honest reflection

<!-- IMAGE: final polished UI of File Manager + the adoption metric, side by side -->

- **~95% adoption** of the File Manager, with about **1,500 active business accounts** — putting it among the platform's most-adopted features when benchmarked against one of the most-used feature flags.

I also want to be honest about the limits. As a design team we don't have complete, refined access to customer usage data, and I'm still growing my own ability to turn analytics into product insight — reading what the numbers and charts actually *mean*, not just what they show. There's an internal effort forming a dedicated team for feature-usage analytics, and better tracking (more Pendo paths: how often a collection is shared, edited, deleted) is a clear next step. I'd rather show that growth edge than pretend the measurement was perfect.

---

## What I took away

This was the most complex system I've designed: four years, two roles, one tangled permission model, and a genuinely non-linear path from "let users delete a file" to "a central media-management ecosystem." The lesson that stuck: **the real design problem was rarely the screen in front of me — it was the invisible model of roles, permissions, and context underneath it.** Getting that model right is what let the visible design finally feel simple.
