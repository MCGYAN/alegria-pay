# Alegria Pay — Testing Summary

Aligned with Task 3 implementation / testing marks.

## Test environment
- Browser: Chrome / Edge
- App: React + Vite simulation (`npm run dev` or `npm run preview`)
- Data: seeded local store (Reset restores defaults)

## Functional test cases

| ID | Requirement area | Steps | Expected | Result |
|----|------------------|-------|----------|--------|
| T01 | Auth | Login as admin / manager / teller / customer | Role-appropriate dashboard & nav | Pass |
| T02 | Auth fail | Wrong password | Error message, no session | Pass |
| T03 | Register | Create new customer | Profile created, redirected in | Pass |
| T04 | Open account | Open savings with deposit | New account + opening txn | Pass |
| T05 | Deposit | Deposit to account | Balance increases; txn logged | Pass |
| T06 | Withdraw | Withdraw within balance | Balance decreases | Pass |
| T07 | Withdraw fail | Withdraw more than balance | Insufficient balance message | Pass |
| T08 | Fixed rule | Withdraw from fixed deposit | Blocked with message | Pass |
| T09 | Transfer | Transfer Accra → Kumasi account | Both balances update; inter-branch note | Pass |
| T10 | Loan apply | Customer/staff submit loan | Status = pending | Pass |
| T11 | Loan approve | Manager approves + picks account | Status active; funds disbursed | Pass |
| T12 | Loan reject | Manager rejects | Status rejected | Pass |
| T13 | Repayment | Post repayment ≤ remaining | Remaining reduced / closed at 0 | Pass |
| T14 | Credit card | Staff issues card | Card appears with limit | Pass |
| T15 | Reports | Open Reports as manager | Balances, loans, branches, staff metrics | Pass |
| T16 | Reset | Click Reset | Seed data restored | Pass |

## Traceability (sample)
- T05–T09 ↔ FR deposit/withdraw/transfer  
- T10–T13 ↔ FR loan lifecycle  
- T15 ↔ FR reporting / Case Study suggested queries  

## Defects found & fixed during build
- Nested route role guards simplified with `RequireRole`
- Fixed-deposit withdrawal blocked per business rule
- Transfer same-account rejected
