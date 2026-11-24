# Alegria Pay — Case Study 6 Submission Pack

**Course:** WUCS305 / WICT405 Software Engineering  
**Institution:** West End University College  
**Case Study:** 6 — Banking and Financial Transactions  
**Product:** Alegria Pay (academic banking simulation)

---

## Submission checklist (zip these)

| # | Deliverable | Location |
|---|-------------|----------|
| 1 | Documentation / Report (PDF) | `docs/Alegria_Pay_SRS_SDS_Report.html` → **Print to PDF** (see below) |
| 2 | Draw.io diagrams | `diagrams/Alegria_Pay_Diagrams.drawio` |
| 3 | Software (source + build) | `software/` (source) + `software/dist/` (built app) |
| 4 | PowerPoint (≤ 8 slides) | `presentation/Alegria_Pay_Presentation.pptx` |

**Zip name:** use your **first name** (per brief), upload to **Google Classroom**.  
**Fill in** student names/IDs on the report title page and slide 1 before submitting.

---

## 1) Export the report to PDF

1. Open `docs/Alegria_Pay_SRS_SDS_Report.html` in Chrome or Edge.
2. Press `Ctrl+P` → Destination: **Save as PDF**.
3. Enable **Background graphics** if available.
4. Save as `Alegria_Pay_SRS_SDS_Report.pdf` in the `docs/` folder.

Markdown twin: `docs/Alegria_Pay_SRS_SDS_Report.md`

---

## 2) Draw.io diagrams

Open `diagrams/Alegria_Pay_Diagrams.drawio` at [https://app.diagrams.net](https://app.diagrams.net).

Tabs included:

1. Deployment Diagram  
2. Use Case Diagram  
3. Sequence — Transfer Funds  
4. Sequence — Loan Application  
5. Class Diagram  

Export images from Draw.io into your report appendix if required by your lecturer.

---

## 3) Run the software (simulation)

### Requirements
- Node.js 18+ (npm)

### Development mode
```bash
cd software
npm install
npm run dev
```
Open the URL shown (usually `http://localhost:5173`).

### Production build (executable-style web build)
```bash
cd software
npm install
npm run build
npm run preview
```
Built files are in `software/dist/` — include **source + dist** in your zip.

### Demo logins

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@alegriapay.gh | admin123 |
| Manager | manager@alegriapay.gh | manager123 |
| Teller | teller@alegriapay.gh | teller123 |
| Customer | akosua@email.com | customer123 |

Use **Reset** in the sidebar to restore seed data during demos.

### Features covered
- Customer registration / multi-role login  
- Accounts: savings, current, fixed deposit  
- Deposits, withdrawals, transfers (incl. inter-branch)  
- Loan apply / approve / reject / repay  
- Credit card issuance  
- Customers, branches (Accra, Kumasi, Tema), staff admin  
- Reports: balances, loan performance, branch snapshot, top staff  

---

## 4) Presentation

- File: `presentation/Alegria_Pay_Presentation.pptx`  
- **7 content slides + title** (within the max of 8)  
- Oral: ~10 min demo + 5 min Q&A  
- Regenerate slides: `python presentation/create_pptx.py`

---

## Suggested demo script (10 minutes)

1. Login as **Customer (Akosua)** → show accounts & balance.  
2. **Transfer** funds to Kofi’s account.  
3. Logout → login as **Manager** → **approve pending loan** for Kofi.  
4. Open **Reports** → branch profitability & top staff.  
5. Briefly point to architecture (client–server) and Draw.io diagrams.

---

## Project structure

```
Alegria Pay/
├── docs/                  # SRS + SDS report
├── diagrams/              # Draw.io file
├── software/              # React simulation app
├── presentation/          # PowerPoint
├── README.md              # This file
└── End of Semester Project (Software Engineering).pdf
```

---

## Academic note

This is an **educational simulation** for Case Study 6. It is not connected to real banks, Mobile Money, or live payment processors.
