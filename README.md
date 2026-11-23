# School Register — GitHub Pages deployment

## Apple device installation

The client is prepared for iPhone, iPad, and Mac Safari, with Apple touch icons for common device sizes.

- **iPhone / iPad:** Open the published HTTPS GitHub Pages address in Safari, tap **Share**, then **Add to Home Screen**. If shown, enable **Open as Web App**, then tap **Add**.
- **Mac:** Open the published address in Safari. On macOS versions that support web apps, use **File → Add to Dock** (or the Share menu's Add to Dock option).
- Use Safari for the Apple installation flow. A normal browser tab will still work if installation is unavailable on that device or OS version.


## Weekly & Monthly Finance Reports
**Finance → Weekly & Monthly Finance Reports** is the one page for checking anything about money. Switch between **Weekly** (Monday–Sunday) and **Monthly**, move with **Previous / Next** or pick any date or month.

- **Summary:** total collected, total spent, surplus or deficit, average per active day, plus current debt owed and overpayments held. Each figure is compared with the previous week/month. Totals use the same calculation as the Daily Financial Overview and Profit & Loss pages.
- **Breakdowns:** day-by-day chart and table (with running net), week-by-week split for months, money in by source, and expenses by category (each with share and change vs. the previous period).
- **Find anything:** search a student, receipt number, class, category or description, and filter by class, source, money in/out or payment method. Shows class totals, payment methods, students who owe, and every transaction.
- **Output:** Print / Save PDF, Export summary CSV, Export transactions CSV.

## Page passwords
**Settings → Page Passwords** lists every page in the app. Set a password on any page (min. 4 characters); that page then shows a lock screen until the password is entered. Locked pages are marked with 🔒 in the sidebar, stay unlocked for the browser session, and can be re-locked with **Lock all pages now**. Changing or removing a page password requires its current password. If an App Password is set, it also works as a master key. Passwords are stored hashed (SHA-256 + salt) in this device's local storage. This is a convenience lock for shared devices, not a substitute for server-side security.

## Debt Page: print one student's report
Type any part of a student's name or ID in **Find student** (the full name is not needed), then use **Print Student Debt**, **Save Student Debt as PDF**, or the debt-notice buttons. If several students match, a short list appears so you can tap the right one. Each owing student's row also has its own **Print Report** button. The **Highest debt ranking** at the top of the page has **Print Report** and **Print Notice** buttons on every row, so you can print without scrolling down, and typing in **Find student** narrows the ranking too.

## Report layout (phones and computers)
Every report opened through the in-app print preview (debt statements and notices, receipts, expenditure, assessment and score reports, etc.) is laid out automatically for the screen it is viewed on: wide tables become easy-to-read cards on phones or scroll sideways when they have many columns, and are centred at a comfortable width on computers. Printed and PDF output is unchanged.

## Send a student's PDF to the parent's WhatsApp
Every document can be turned into a real A4 PDF inside the app (no internet or server needed) and handed to WhatsApp for that student's parent.

**Where the 📲 WhatsApp buttons are**
- **Any print preview** (debt statement, debt notice, receipts, class reports…): the green **📲 WhatsApp Parent** button in the preview bar. The student is picked automatically from the document; if it cannot tell, you search for the student.
- **Debt Page:** every student row has **📲 WhatsApp Parent**; the toolbar has **📲 WhatsApp Debt Statement to Parent** for the student typed in *Find student*.
- **Overpayment Balance page:** every student with credit has **📲 WhatsApp Parent**.
- **Student score report page:** **📲 WhatsApp Report to Parent** sends the selected student's termly report.

- **Message Parents — Fee Reminders panel:** each owing student has **📄 Debt PDF**, and **📄 Send debt PDFs one by one** walks through every owing student who has a parent number (following the Term / Class / Search filters), skipping anyone already sent today. After each send tap **➡️ Next parent**.

**In the dialog** choose the document (outstanding payment statement, debt notice, fee invoice, overpayment statement, term report), the term, check or type the parent's name and WhatsApp number (saved to the student), and edit the message.
- **Note:** type an optional note to the parent; it is added under the message in both routes below.
- **Open WhatsApp & share PDF** (phones/tablets): opens WhatsApp with the PDF attached; pick the parent's chat and tap Send.
- **Open parent's WhatsApp chat:** saves the PDF, opens the chat for the parent's number with the message ready; attach the saved PDF with 📎 → Document and tap Send (this is the route on computers).
- **Save PDF only:** just downloads the PDF.

Notes: WhatsApp never lets a web app attach a file to a number or press Send for you, so one tap in WhatsApp is always needed. PDFs are page images (sharp, but the text cannot be selected). Sent documents are logged in `db.messaging.docLog`. Fully automatic sending would need the WhatsApp Business Cloud API and a small server to keep its access token secret; it cannot safely be done from this static app.

## Safety Copy & Merge (emergency / disaster recovery)
**Settings → 🛟 Safety Copy & Merge** keeps your data safe if any device (phone, tablet, iPhone, iPad, Mac, laptop or desktop computer) is lost, damaged or cleared. Safety copies can be shared and merged between any combination of devices.

- **Share Safety Copy:** creates one file with *all* school data (students, attendance, scores, bills, payments, overpayments, expenditure, other collections, feeding fees, business/POS, settings) and opens the device's share sheet where available (WhatsApp, email, Google Drive, AirDrop, Bluetooth). On computers, or wherever sharing is unavailable, it downloads the file instead. Passwords and page locks are never included.
- **Merge a Safety Copy:** shows exactly what will be added, downloads an automatic **BEFORE-MERGE** copy (your undo), then combines the file with this device's data. Records are matched by ID, so nothing is deleted or overwritten, merging the same file twice adds nothing, and files from several devices can be merged in any order. On a new or empty device it simply restores everything.
- If two copies disagree on a value, this device's version is kept, except: a newer `updatedAt` record wins, a "paid" mark is never lost, and an overpayment credit keeps the lower (already-spent) balance.
- Older *Full Backup* and *School data* files can also be merged. Deletions are not carried between devices.
- A red reminder appears if no safety copy was shared for 7 days. Share one weekly.

## Included
- `index.html` — supplied School Register application
- `manifest.webmanifest` — install metadata
- `sw.js` — offline app-shell cache
- `` — PWA and Apple touch icons

## Deploy with GitHub Pages
1. Create a GitHub repository.
2. Upload **all** files and the `icons` folder to the repository root (keep the folder structure).
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then Save.
6. Wait for GitHub Pages to publish the site. Open the HTTPS URL it provides.

Do not open `index.html` directly as a local file when testing installation. PWA installation and service workers require HTTPS (GitHub Pages supplies HTTPS) or localhost.

## Installing
- Android/desktop Chromium browsers: use the visible **INSTALL APP** button where the browser supports its install prompt. Otherwise follow the in-app browser instructions.
- iPhone/iPad: open the HTTPS site in Safari, tap **INSTALL APP**, then use Share → Add to Home Screen.
- Firefox and some other browsers do not expose a web-app install prompt; the app displays browser-specific instructions.

## License activation
The supplied HTML already includes an install button and an install-help panel. The current supplied source does **not** contain an identifiable license-key verification implementation or issuer endpoint. A real license gate must validate keys against your issuer's rules/API (or a signed license format). Please do not put a private issuer secret/API key in browser JavaScript. To finish the license-key gate, provide the issuer's integration instructions/API documentation and specify whether issued licenses are perpetual or have an expiry. The current package does not invent or bypass license validation.
