<div align="center">

WEST END UNIVERSITY COLLEGE

Faculty of Computer Studies

ALEGRIA PAY: BANKING AND FINANCIAL TRANSACTIONS MANAGEMENT SYSTEM

Software Requirements Specification and Software Design Specification Report

Course: WUCS305/WICT405 Software Engineering

Case Study 6, December 2026

Prepared by:

[Student Name 1] ([Student ID 1])

[Student Name 2] ([Student ID 2])

[Student Name 3] ([Student ID 3])

Submitted to: [Lecturer's Name], Faculty of Computer Studies

Submission Date: December 2026

</div>

---

## Table of Contents

1. Task 1: Software Requirements Specification (SRS)
   1.1 Problem Identified
   1.2 Purpose of the Software
   1.3 Scope of the Software
   1.4 Product Functions
   1.5 Functional Requirements
   1.6 Design and Implementation Constraints
   1.7 Assumptions and Dependencies
   1.8 Non Functional Requirements
2. Task 2: Software Design Specification (SDS)
   2.1 Architectural Design and Deployment View
   2.2 Use Case Model
   2.3 Sequence Diagrams
   2.4 Class Diagram
3. Testing Approach
4. References
5. Appendix A: Demo Credentials
6. Appendix B: Glossary of Terms

---

## 1. Task 1: Software Requirements Specification (SRS)

### 1.1 Problem Identified

Many commercial banks operating in Ghana, and in West Africa more generally, still depend in part on fragmented record keeping that was built up over time using different spreadsheets, branch ledgers, and small disconnected desktop programs. For the bank described in Case Study 6, this creates a number of practical problems that the Alegria Pay system is intended to solve.

First, customer information is scattered. A customer who opens a savings account at the Accra branch but later needs service at the Kumasi branch cannot easily be helped, because the Kumasi branch has no immediate way to see that customer's accounts or balances. This makes it difficult to maintain a single, consistent view of each customer across the whole bank.

Second, loan tracking is largely manual. Loan applications, approvals, disbursements, and repayments are often recorded in spreadsheets that are not connected to the customer's live account balance. This makes it hard for loan officers to notice early signs of default or to produce an accurate picture of which loans are performing and which are overdue.

Third, branch and staff performance is difficult to measure. Without one shared transaction and account database, managers cannot easily compare how the Accra, Kumasi, and Tema branches are performing, or which staff members are processing the most transactions. Decisions about staffing and resources therefore tend to be based on impressions rather than actual figures.

Fourth, moving money between branches is slow and carries more risk than it should. When branch systems do not share a common ledger, transferring funds between accounts held at different branches usually needs phone confirmation, paper vouchers, or an overnight reconciliation step, all of which can introduce delay and error.

Fifth, producing management and regulatory reports is time consuming and error prone. Reports that the Bank of Ghana or bank management may require, such as loan performance summaries or transaction monitoring, are difficult to compile accurately when the underlying data is spread across several disconnected systems.

Alegria Pay is proposed as a solution to these problems. It is a single banking and financial transactions management system that gives staff, management, and customers one consistent and auditable view of customer relationships, accounts, transactions, loans, and cards across the Accra, Kumasi, and Tema branches.

### 1.2 Purpose of the Software

The purpose of Alegria Pay is to provide a secure, centralised, role based software system that supports the core day to day activities of a commercial bank: customer account management, deposit, withdrawal and transfer processing, loan lifecycle management, credit card administration, branch and staff administration, and management reporting, in a way that works consistently across all three branches.

In particular, Alegria Pay is meant to:

- Replace fragmented, branch isolated records with one logical system of record for customers, accounts, and transactions.
- Give tellers and branch managers the tools needed to process financial transactions accurately and with a complete audit trail.
- Give loan officers and branch managers the tools needed to manage the loan process from application through approval, disbursement, and repayment.
- Give branch managers and administrators the visibility needed to judge branch performance, staff performance, and the health of the loan portfolio.
- Give customers reasonable self service access to their own accounts, balances, transaction history, loans, and cards.
- Demonstrate, for the purposes of this course, good practice in requirements analysis, software design, and implementation of a realistic, non trivial system.

### 1.3 Scope of the Software

#### 1.3.1 In Scope

The version of Alegria Pay specified and built for this project covers the following:

- Customer registration and profile management, including basic Know Your Customer (KYC) details such as full name, contact details, a national identification reference, residential address, and an assigned home branch.
- Three account types per customer: Savings Account, Current Account, and Fixed Deposit Account, each with its own business rules for interest, minimum balance, and maturity where relevant.
- Core transaction processing: cash deposits, cash withdrawals, intra branch transfers, and inter branch transfers between accounts, with every transaction producing a permanent transaction record.
- Transaction history and account statement retrieval for customers, tellers, and managers.
- Staff record management and branch administration, including assigning staff to branches and roles (Administrator, Branch Manager, Teller).
- Loan management covering loan products, loan applications, the approval or rejection workflow, disbursement into a customer account, and tracking of repayments.
- Credit card issuance against an eligible account, credit limit management, and card status control (active or blocked).
- A consolidated view of each customer's accounts, loans, and cards, so staff can answer questions such as "what products does this customer hold".
- Reporting that supports management and, in a general sense, regulatory needs: account balance summaries, transaction history, loan repayment performance, branch comparisons, and staff performance.
- Role based login and access control for four user roles: Customer, Teller or Staff, Branch Manager, and System Administrator.

#### 1.3.2 Out of Scope

The following items are explicitly not covered by the current version of Alegria Pay:

- Connection to real national payment infrastructure, such as GhIPSS or mobile money platforms, and real card network processing such as live Visa or Mastercard authorisation.
- Direct integration with the Bank of Ghana's reporting systems or with the National Identification Authority's Ghana Card verification service.
- Foreign currency accounts or currency conversion. The system works only in Ghana Cedis (GH₵).
- Insurance products, investment products such as treasury bills or unit trusts, and trade finance instruments such as letters of credit.
- Automated detection of suspicious transactions for anti money laundering purposes. This is noted as a possible future improvement rather than a current feature.
- Physical hardware integration, including ATMs, cheque scanners, fingerprint readers, or point of sale terminals.
- Native mobile applications for iOS or Android. The system is delivered only as a responsive web application.
- A full production deployment with live servers and certified security controls. As explained in Section 1.6, the submitted work is an academic simulation of what a production system would look like.

### 1.4 Product Functions

At a high level, Alegria Pay provides the following groups of functions:

1. Identity and access management: secure login and role based access control for Customers, Tellers, Branch Managers, and Administrators.
2. Customer management: creating, searching, viewing, and updating customer profiles, and providing a consolidated view of everything a customer holds with the bank.
3. Account management: opening, viewing, and closing or suspending Savings, Current, and Fixed Deposit accounts, enforcing the rules specific to each account type, and generating statements.
4. Transaction processing: deposits, withdrawals, intra branch transfers, and inter branch transfers, with balance checks before posting and a permanent record of every transaction.
5. Loan management: defining loan products, capturing applications, routing them for manager approval or rejection, disbursing approved loans, and tracking repayments.
6. Credit card management: issuing cards linked to an eligible account, setting credit limits, tracking available credit, and blocking or unblocking cards.
7. Branch and staff administration: maintaining branch records for Accra, Kumasi, and Tema, and maintaining staff accounts, positions, and branch assignments.
8. Reporting and analytics: producing balance reports, transaction reports, loan performance reports, branch comparison reports, and staff performance reports.
9. Audit and traceability: recording who performed each transaction, loan decision, or card action, when, and at which branch.

### 1.5 Functional Requirements

The functional requirements below are grouped by product function and written so that each one can be tested and traced back to a specific feature. Each requirement is identified with the prefix FR.

**A. Authentication and Access Control**

| ID | Requirement |
|---|---|
| FR-01 | The system shall authenticate a user by email and password before allowing access to any protected function. |
| FR-02 | The system shall support at least four distinct user roles: Customer, Teller or Staff, Branch Manager, and Administrator. |
| FR-03 | The system shall restrict each user to only the functions permitted for their role, for example a Customer shall not be able to approve loans or create staff accounts. |
| FR-04 | The system shall end a user's session on logout and prevent access to protected pages without an active session. |

**B. Customer Management**

| ID | Requirement |
|---|---|
| FR-05 | The system shall allow an Administrator or Teller to register a new customer by capturing full name, phone number, email, residential address, a national identification reference, and home branch. |
| FR-06 | The system shall allow authorised staff to search for a customer by name, customer ID, or phone number and retrieve the matching profile within two seconds under normal conditions with the seeded dataset. |
| FR-07 | The system shall allow a Customer to view and update their own contact details, subject to basic validation. |
| FR-08 | The system shall present a consolidated relationship view for a customer, showing all of their accounts, loans, and credit cards. |
| FR-09 | The system shall prevent the registration of two customers with the same national identification reference. |

**C. Account Management**

| ID | Requirement |
|---|---|
| FR-10 | The system shall allow authorised staff to open a Savings, Current, or Fixed Deposit account for an existing customer, generating a unique account number. |
| FR-11 | The system shall apply account type specific rules: Savings accounts shall accrue a configurable interest rate, Current accounts shall accrue no interest by default and shall enforce a minimum balance, and Fixed Deposit accounts shall require a maturity date and a principal amount that remains locked until maturity. |
| FR-12 | The system shall allow a Customer or authorised staff member to view the current balance and status (active, dormant, or closed) of an account. |
| FR-13 | The system shall allow authorised staff to close or suspend an account, recording the reason and the staff member responsible. |
| FR-14 | The system shall generate an account statement listing all transactions for a selected account within a given date range. |

**D. Transaction Processing**

| ID | Requirement |
|---|---|
| FR-15 | The system shall allow a Teller to record a cash deposit into a specified account, increasing the balance by the deposit amount and creating a transaction record. |
| FR-16 | The system shall allow a Teller or Customer to withdraw cash from an account, provided the resulting balance does not fall below the account's minimum balance rule. |
| FR-17 | The system shall allow a Customer or Teller to transfer funds between two accounts at the same branch, debiting the source account and crediting the destination account as a single operation. |
| FR-18 | The system shall allow a Customer or Teller to transfer funds between an account at one branch and an account at a different branch, applying the same validation rules as an intra branch transfer and recording both branches involved. |
| FR-19 | The system shall reject any withdrawal or transfer that would take the source account balance below zero or below its defined minimum balance, and shall show a clear error message. |
| FR-20 | The system shall assign a unique transaction identifier, timestamp, performing user, and branch to every deposit, withdrawal, and transfer. |
| FR-21 | The system shall allow authorised staff to search and filter transaction history by account, date range, transaction type, and branch. |

**E. Loan Management**

| ID | Requirement |
|---|---|
| FR-22 | The system shall allow a Customer or Teller to submit a loan application specifying a loan product, requested principal amount, and repayment term in months. |
| FR-23 | The system shall allow a Branch Manager to review a pending loan application and either approve or reject it, recording the decision, decision date, and the manager who made it. |
| FR-24 | Once a loan is approved, the system shall allow disbursement of the loan principal into a nominated customer account, creating a matching deposit transaction and an active loan record. |
| FR-25 | The system shall generate a repayment schedule for each disbursed loan, based on the principal, interest rate, and term. |
| FR-26 | The system shall allow a Teller or Customer to record a loan repayment, updating the outstanding loan balance and the repayment history. |
| FR-27 | The system shall mark a loan as overdue when an expected repayment has not been recorded by its due date. |
| FR-28 | The system shall not allow disbursement of a loan that has not been approved. |

**F. Credit Card Management**

| ID | Requirement |
|---|---|
| FR-29 | The system shall allow authorised staff to issue a credit card linked to an eligible customer account, with an assigned credit limit. |
| FR-30 | The system shall track available credit on each card as transactions are recorded against it, and shall prevent use beyond the assigned limit. |
| FR-31 | The system shall allow authorised staff to block, unblock, or close a credit card, recording the reason and the staff member responsible. |

**G. Branch and Staff Administration**

| ID | Requirement |
|---|---|
| FR-32 | The system shall maintain a list of branches (Accra Head Office, Kumasi, and Tema), each with a unique branch code, location, and contact information. |
| FR-33 | The system shall allow an Administrator to create staff accounts, assign a role (Teller, Branch Manager, or Administrator), and assign the staff member to a branch. |
| FR-34 | The system shall allow an Administrator to deactivate a staff account, immediately removing that user's access. |

**H. Reporting**

| ID | Requirement |
|---|---|
| FR-35 | The system shall generate a customer account balance report showing current balances across all accounts for a selected customer or branch. |
| FR-36 | The system shall generate a transaction history report for a selected branch and date range, showing the total value of deposits, withdrawals, and transfers. |
| FR-37 | The system shall generate a loan repayment performance report showing, per branch, the proportion of loans that are current, overdue, or fully repaid. |
| FR-38 | The system shall generate a branch comparison report showing transaction volume and loan interest income across Accra, Kumasi, and Tema. |
| FR-39 | The system shall generate a staff performance report ranking staff by the number and value of transactions processed within a selected period. |

### 1.6 Design and Implementation Constraints

1. Academic simulation. This system is developed as a university end of semester project for WUCS305/WICT405, not as a production banking system. All monetary movements and customer data are simulated using seed data rather than connected to a live core banking database or real customer funds. The architecture is still designed to reflect, and could be extended toward, a genuine production deployment, as explained in Section 2.1.
2. Browser based delivery. The front end is built as a responsive web application and is expected to run on current versions of Chrome, Edge, and Firefox. No native mobile application is produced.
3. Hardware constraints. The client device needs at least 4 GB of RAM, a modern dual core processor, a screen resolution of at least 1024 by 768, and a working network connection. No specialised banking hardware such as ATMs or card readers is required.
4. Software and platform constraints. The front end is built with React and plain CSS and JavaScript, which matches the Web Programming and Object Oriented Programming modules that are prerequisites for this course.
5. Currency constraint. All monetary values are shown in Ghana Cedis using the symbol GH₵, with two decimal places for pesewas. No other currency is supported.
6. Data constraint. A small but realistic seed dataset is used, covering three branches (Accra, Kumasi, and Tema), a handful of staff and customer users, and a representative set of accounts, transactions, loans, and cards. This is enough to demonstrate every functional requirement without needing a production scale dataset.
7. Security constraint. Because this is an academic simulation, login and role based access are implemented to show sound design practice, but should not be treated as certified for handling real customer financial data. Section 1.8.3 lists additional controls that a production rollout would need.
8. Regulatory constraint. The reporting functions are intended to be illustrative of Bank of Ghana style reporting (Bank of Ghana, 2022) and are not an officially compliant regulatory module.

### 1.7 Assumptions and Dependencies

| # | Assumption or Dependency | Justification |
|---|---|---|
| A1 | Every customer already has a unique national identification reference, such as a Ghana Card number, at the time of registration. | KYC practice in Ghanaian banking requires a verifiable national ID (Bank of Ghana, 2022). Without this assumption, the Customer Management module could not enforce the uniqueness rule in FR-09. |
| A2 | Each account belongs to exactly one home branch, and each loan is administered by exactly one branch. | This keeps ownership and reporting logic manageable while still reflecting how retail branches typically own an account relationship, even though the account is visible system wide. |
| A3 | All monetary amounts are in a single currency, GH₵, with no foreign exchange conversion required. | This keeps the transaction processing and reporting logic within the scope of an academic project while still being realistic for a domestic retail bank. |
| A4 | End users, both customers and staff, have access to a modern web browser and basic digital literacy. | The system is delivered through a browser, so without this assumption the usability requirements in Section 1.8.2 could not be met. |
| A5 | The seeded dataset is representative but not exhaustive and does not need to model millions of records. | The purpose of this project is to demonstrate correct software engineering practice, not to test production scale data volumes. |
| A6 | A single Branch Manager approval is sufficient to approve or reject a loan application within the scope of this project. | Real banks may use multi level credit committees for large loans. This is simplified to a single approver so that the use case and sequence diagrams stay manageable while still showing the approval pattern clearly. |
| A7 | The system depends on browser local storage, or an equivalent client side mechanism, to keep simulated data between sessions during a demonstration. | Because no live backend database is deployed for the academic build, this dependency allows demonstrated data to persist across page reloads. |
| A8 | The system depends on the React, Vite, and related JavaScript libraries remaining available and compatible at build time. | This is a normal dependency risk for any modern front end project and is reduced by fixing dependency versions in the project's package file. |

### 1.8 Non Functional Requirements

#### 1.8.1 Performance

- NFR-01: Under normal conditions, the system shall return search results, such as customer lookup or transaction search, within two seconds for the seeded dataset.
- NFR-02: The system shall complete a deposit, withdrawal, or transfer and show the updated balance in the interface within one second of submission.
- NFR-03: The architecture shall allow the application tier, in a production deployment, to be scaled with additional server instances so that response times remain acceptable as the number of concurrent branch users grows.

#### 1.8.2 Usability

- NFR-04: The interface shall present role appropriate dashboards, with distinct views for Customer, Teller, Branch Manager, and Administrator, so each user sees only what is relevant to them.
- NFR-05: All monetary values shall be shown with the GH₵ symbol and two decimal places, consistently across every screen and report.
- NFR-06: Error messages, such as for insufficient funds or an invalid account number, shall be written in plain, non technical language that bank staff and customers can understand.
- NFR-07: Core transaction tasks such as deposit, withdrawal, and transfer shall be completable by a trained teller in no more than three steps after reaching the relevant screen.

#### 1.8.3 Security

- NFR-08: The system shall require a password for login and shall not display passwords in plain text anywhere in the interface.
- NFR-09: The system shall enforce role based authorisation on every protected action and shall reject attempts by a user to perform actions outside their role.
- NFR-10: Every financial transaction, loan decision, and card action shall be attributable to the specific user and branch that performed it, to support audits and dispute resolution.
- NFR-11 (production note): A real production deployment should also use encrypted transport (HTTPS and TLS), hashed and salted password storage, multi factor authentication for staff, and automatic session timeout. These controls are anticipated by the design in Section 2.1 even though they are simplified in the academic build.

#### 1.8.4 Reliability

- NFR-12: A transfer operation shall either fully complete, with both the debit and the credit applied, or not apply at all, so that a transfer can never be left half finished.
- NFR-13: The system shall keep previously entered data, such as accounts, transactions, loans, and cards, across normal page reloads during a demonstration session, using the client side persistence mechanism described in Section 1.7 (A7).
- NFR-14 (production note): A production deployment should target at least 99.5 percent monthly uptime for the application tier, supported by database backups and redundant application servers.

#### 1.8.5 Maintainability

- NFR-15: The codebase shall be organised into clearly separated modules that match the domain areas listed in Section 1.4 (Customer, Account, Transaction, Loan, Card, Branch and Staff, Reporting), so that a change in one module has minimal effect on the others.
- NFR-16: The system shall use consistent naming conventions, component based structure, and basic linting so the code remains readable for future maintainers.
- NFR-17: Business rules that are likely to change, such as interest rates, minimum balances, or loan terms, shall be stored as configurable values rather than hard coded directly in the program logic.

---

## 2. Task 2: Software Design Specification (SDS)

### 2.1 Architectural Design and Deployment View

#### 2.1.1 Chosen Architectural Style and Justification

Alegria Pay is designed around a client server, three tier web application architecture, made up of a presentation tier (the web client), an application tier (the business logic), and a data tier (persistent storage). This style was chosen over the alternatives, such as a stand alone desktop application or a simple two tier client to database setup, for the following reasons.

First, it allows data to be centralised and shared across branches. The main problem identified in Section 1.1 is fragmented, branch isolated data. A three tier architecture centralises customer, account, and transaction data so that every branch's client can reach the same information, which directly solves the single customer view and inter branch transfer problems.

Second, it separates concerns clearly. Keeping presentation, business logic (balance checks, interest calculation, loan approval rules), and data storage in separate layers means each layer can be developed, tested, and secured somewhat independently. This matches standard software engineering practice (Sommerville, 2016; Pressman and Maxim, 2020).

Third, it improves security and control. Keeping the sensitive business logic and data on a managed server tier, rather than spread across separate desktop installations in each branch, reduces the number of places an attacker could target and makes it easier to apply consistent security controls and audit logging.

Fourth, it supports thin, browser based clients. Because the presentation tier is a web application, staff and customers only need a standard browser, which avoids the cost and effort of installing and updating separate client software across the Accra, Kumasi, and Tema branches.

Fifth, it provides a reasonable path to scale. In a production deployment, the application tier could be run on multiple server instances behind a load balancer, independently of the data tier, which supports NFR-03 without requiring the client to be redesigned.

Finally, this style matches common industry practice. Most modern banking and digital finance platforms are built as multi tier client server web systems, so using the same approach here keeps the design realistic and consistent with what the course expects students to demonstrate.

For the purposes of this academic submission, the application and data tiers are implemented logically, through separate JavaScript modules and a client side persistence mechanism, inside the same deployable front end bundle, rather than through a separate live application server and database server. This is a deliberate and documented simplification made for the scope of a university project. The module boundaries and responsibilities below are designed so that the application and data tiers could later be moved out into a real server side API and a relational database with limited redesign. Only the way the tiers communicate (direct function calls today, compared with HTTP and JSON calls to a remote API in a production build) would need to change.

#### 2.1.2 Major Modules and Responsibilities

The table below lists the main domain logic modules in the system. Pure interface components and raw database table definitions are left out, in line with the assignment's focus on domain logic.

| Module | Primary Responsibility |
|---|---|
| Authentication and Access Control | Validates user credentials and determines and enforces the current user's role and permissions for every request. |
| Customer Management | Creates and maintains customer profiles, enforces the KYC uniqueness rule, and provides the consolidated relationship view. |
| Account Management | Opens, maintains, and closes Savings, Current, and Fixed Deposit accounts, and enforces account type rules such as interest, minimum balance, and maturity. |
| Transaction Processing | Executes deposits, withdrawals, and intra and inter branch transfers, enforces balance and atomicity rules, and produces the transaction ledger. |
| Loan Management | Manages loan products, applications, the approval or rejection workflow, disbursement, and repayment tracking. |
| Card Management | Issues and manages credit cards linked to customer accounts and enforces credit limit rules. |
| Branch and Staff Administration | Maintains branch records and staff accounts and manages role and branch assignment. |
| Reporting | Collects data from the other modules to produce balance, transaction, loan performance, branch comparison, and staff performance reports. |

#### 2.1.3 Deployment Diagram

A full UML deployment diagram is provided in the accompanying Draw.io file (Alegria_Pay_Diagrams.drawio, Page 1). It is described in text here for completeness.

A customer device, such as a desktop, laptop, or mobile browser, hosts the Alegria Pay web client, which is the React single page application. It communicates with the web and application server over HTTPS. A branch workstation at Accra, Kumasi, or Tema hosts the same web client used by tellers and branch managers, and it connects to the same server over the bank's internal network and HTTPS. The web and application server hosts the Alegria Pay application services, which package together the Authentication, Customer, Account, Transaction, Loan, Card, Branch and Staff, and Reporting modules described above, exposed as a RESTful JSON API. This server communicates with the database server over a secured internal connection. The database server hosts the Alegria Pay database, a relational database holding tables for Customers, Accounts, Transactions, Loans, Repayments, Cards, Branches, and Staff.

As noted in Section 2.1.1, the version submitted for this course embeds a lightweight, in browser simulation of the application services and database inside the web client node, using seeded objects and local storage for persistence, so that the system can be demonstrated without a separate live server. The deployment diagram in the Draw.io file shows both this simulation arrangement and the target production topology described above.

#### 2.1.4 Responsibilities and Collaborators

| Element | Responsibilities | Key Collaborators |
|---|---|---|
| Alegria Pay Web Client | Renders role based screens, captures and validates basic input, calls application services, and displays results, balances, and reports. | Authentication module, and all domain modules through API calls |
| Authentication and Access Control | Verifies credentials, issues and checks the session, and exposes the current user's role to other modules. | Customer Management, Branch and Staff Administration |
| Customer Management | Creates, searches, and updates customer profiles, enforces ID uniqueness, and assembles the relationship view. | Account Management, Loan Management, Card Management |
| Account Management | Opens and closes accounts, enforces account type rules, and provides balance and statement queries. | Transaction Processing, Customer Management, Reporting |
| Transaction Processing | Validates and posts deposits, withdrawals, and transfers, maintains the transaction ledger, and enforces atomicity. | Account Management, Branch and Staff Administration, Reporting |
| Loan Management | Manages the loan lifecycle from application through approval, disbursement, and repayment. | Account Management (for disbursement and repayment posting), Customer Management, Reporting |
| Card Management | Issues and manages cards and enforces credit limit rules. | Account Management, Customer Management |
| Branch and Staff Administration | Maintains branch and staff records and assigns roles and branches. | Authentication, Reporting |
| Reporting | Collects and presents operational and management reports. | Account Management, Transaction Processing, Loan Management, Branch and Staff Administration |
| Alegria Pay Database (production target) or local persistence (academic build) | Provides durable storage for all entities and enforces referential integrity. | All domain modules |

#### 2.1.5 Design Decisions

A number of design decisions were made while putting this architecture together. All domain modules are exposed behind a single application services boundary, rather than letting the client talk directly to the data tier. This keeps business rules, such as balance checks and the loan approval workflow, out of the client and centrally enforced, which supports NFR-09 and NFR-12. Branch is modelled as a first class entity that is referenced by accounts, staff, transactions, and loans, rather than as a plain text field, because this is needed for the inter branch transfer logic in FR-18 and for branch level reporting in FR-37 and FR-38. Reporting is kept as a separate module that reads from the other modules rather than keeping its own duplicate data, which avoids data drift and follows the principle of having a single source of truth.

It is assumed that a production deployment would place the application server and database server inside the bank's own secured data centre, or with a vetted cloud provider operating under relevant Bank of Ghana data residency and cybersecurity rules. This project does not attempt to model that infrastructure in detail beyond noting it as the intended target. It is also assumed that the academic build's simulation of the application and data tiers, described in Sections 2.1.1 and 2.1.3, does not change the logical module boundaries or the use case, class, or sequence designs described below. Only the physical deployment nodes and the way the tiers talk to each other would differ.

### 2.2 Use Case Model

#### 2.2.1 Actors

- Customer: an individual who holds one or more accounts, loans, or cards with the bank and uses the system to view and manage their own banking relationship.
- Teller or Staff: front line branch staff who process day to day transactions and customer service requests on behalf of customers.
- Branch Manager: branch level staff responsible for approving or rejecting loans and overseeing branch performance. A Branch Manager can also do everything a Teller can do.
- Administrator: a head office or IT role responsible for staff accounts, branch configuration, and system wide oversight. An Administrator can also do everything a Branch Manager can do.

A full UML use case diagram, showing all actors, use cases, and include and extend relationships, is provided in Alegria_Pay_Diagrams.drawio (Page 2). The diagram groups use cases under the eight domain modules described in Section 2.1.2, inside the Alegria Pay system boundary, with the four actors positioned outside the boundary and connected to the use cases they perform. The table below documents the same information in text form.

#### 2.2.2 Use Case Table

| ID | Use Case | Primary Actor(s) | Description | Includes or Extends |
|---|---|---|---|---|
| UC-01 | Login | Customer, Teller, Branch Manager, Administrator | The actor logs in with an email and password to obtain a role based session. | Base use case, included by UC-02 through UC-26 |
| UC-02 | Logout | Customer, Teller, Branch Manager, Administrator | The actor ends their authenticated session. | None |
| UC-03 | Register Customer | Teller, Administrator | Capture a new customer's profile and KYC reference, creating a customer record. | Includes UC-01 |
| UC-04 | Search or View Customer Profile | Teller, Branch Manager, Administrator | Locate a customer by name, ID, or phone number and view their profile and summary. | Includes UC-01 |
| UC-05 | Update Customer Profile | Customer, Teller | Modify a customer's contact details. | Includes UC-01 |
| UC-06 | View Consolidated Relationship Summary | Customer, Teller, Branch Manager | View all accounts, loans, and cards held by a customer. | Includes UC-04 |
| UC-07 | Open Account | Teller, Administrator | Create a new Savings, Current, or Fixed Deposit account for an existing customer. | Includes UC-04 |
| UC-08 | Close or Suspend Account | Teller, Branch Manager | Deactivate or close an account, recording the reason. | Includes UC-01 |
| UC-09 | View Account Balance | Customer, Teller | Retrieve the current balance and status of an account. | Includes UC-01 |
| UC-10 | Generate Account Statement | Customer, Teller | Produce a transaction listing for an account over a date range. | Includes UC-09 |
| UC-11 | Deposit Funds | Teller | Record a cash deposit into an account. | Includes UC-09 |
| UC-12 | Withdraw Funds | Customer, Teller | Withdraw cash from an account, subject to balance rules. | Includes UC-09 |
| UC-13 | Transfer Funds | Customer, Teller | Move funds from one account to another. | Includes UC-09 |
| UC-14 | Transfer Funds, Inter Branch | Customer, Teller | A transfer where the source and destination accounts belong to different branches. | Extends UC-13 |
| UC-15 | View Transaction History | Customer, Teller, Branch Manager | Search and filter posted transactions by account, date, type, or branch. | Includes UC-01 |
| UC-16 | Apply for Loan | Customer, Teller | Submit a loan application specifying product, amount, and term. | Includes UC-04 |
| UC-17 | Review Loan Application | Branch Manager | Examine a pending loan application and the applicant's data. | Includes UC-06 |
| UC-18 | Approve Loan | Branch Manager | Approve a reviewed loan application. | Extends UC-17 |
| UC-19 | Reject Loan | Branch Manager | Reject a reviewed loan application, recording a reason. | Extends UC-17 |
| UC-20 | Disburse Loan | Teller, Branch Manager | Credit the approved loan principal into the customer's nominated account. | Includes UC-11, requires UC-18 to be complete |
| UC-21 | Generate Repayment Schedule | System, triggered by UC-20 | Automatically compute the instalment schedule for a disbursed loan. | Includes UC-20 |
| UC-22 | Record Loan Repayment | Customer, Teller | Record a repayment against an active loan and update the outstanding balance. | Includes UC-09 |
| UC-23 | Flag Overdue Loan | System, scheduled | Mark a loan as overdue when a repayment is missed. | Includes UC-21 |
| UC-24 | Issue Credit Card | Teller, Branch Manager | Issue a new credit card linked to an eligible account with an assigned limit. | Includes UC-04 |
| UC-25 | Block or Unblock Card | Teller, Branch Manager, Customer | Change a credit card's active or blocked status. | Includes UC-01 |
| UC-26 | Manage Staff Accounts | Administrator | Create, update, or deactivate staff accounts and assign branch and role. | Includes UC-01 |
| UC-27 | Manage Branch Data | Administrator | Create or update branch master data for Accra, Kumasi, and Tema. | Includes UC-01 |
| UC-28 | Generate Branch Comparison Report | Branch Manager, Administrator | Compare transaction volume and loan income across branches. | Includes UC-15 and UC-22 |
| UC-29 | Generate Staff Performance Report | Branch Manager, Administrator | Rank staff by transaction volume and value within a period. | Includes UC-15 |
| UC-30 | Generate Loan Repayment Performance Report | Branch Manager, Administrator | Summarise current, overdue, and repaid loans by branch. | Includes UC-22 and UC-23 |

### 2.3 Sequence Diagrams

Formal UML sequence diagrams for the two main scenarios below are provided in Alegria_Pay_Diagrams.drawio (Page 3, Transfer Funds, and Page 4, Loan Approval and Disbursement). They are documented here as message lists, together with the assumptions and reasoning behind each design.

#### 2.3.1 Sequence Diagram 1: Transfer Funds (UC-13 and UC-14)

Participants: Teller or Customer (actor), TransferUI (web client), TransactionController (application service), AccountService (application service), SourceAccount (account), DestinationAccount (account), and TransactionLedger (repository).

Main scenario:

1. The actor, either a Teller or Customer, selects Transfer Funds and enters the source account, destination account, and amount in TransferUI.
2. TransferUI sends an initiateTransfer request with the source account, destination account, and amount to TransactionController.
3. TransactionController calls AccountService to validate that both accounts exist and are active.
4. TransactionController asks SourceAccount to check that there are sufficient funds. The account confirms that there are, and that the minimum balance rule is satisfied.
5. TransactionController calls AccountService to determine whether the two accounts belong to the same branch or to different branches, and tags the transaction as intra branch (UC-13) or inter branch (UC-14) accordingly.
6. TransactionController begins a single atomic operation and asks SourceAccount to debit the amount.
7. TransactionController asks DestinationAccount to credit the amount.
8. TransactionController asks TransactionLedger to record the transfer, capturing both legs, the timestamp, the performing user, and the branches involved, as one transaction record.
9. TransactionController completes the operation and returns a success response to TransferUI.
10. TransferUI shows the updated balance of the source account and a success message to the actor.

Alternative flow, insufficient funds: at step 4, if there are not enough funds, SourceAccount reports this and TransactionController stops the operation without applying any debit or credit. TransferUI then shows an error message to the actor, which satisfies FR-19.

Assumptions: a transfer is treated as one logical operation with two balance updates, debit then credit, carried out inside a single atomic step, so that a failure between steps 6 and 7 cannot leave the books unbalanced. This directly supports NFR-12. Checks beyond basic balance and minimum balance validation, such as daily transfer limits or fraud screening, are outside the scope of this project (Section 1.3.2) and are therefore not shown in the sequence. Inter branch transfers follow exactly the same steps as intra branch transfers. The only difference is that step 5 additionally records the two separate branch identifiers for reporting purposes (FR-18 and FR-38), which is why UC-14 is modelled as an extension of UC-13 rather than as a separate diagram.

Keeping the debit, credit, and recording logic inside TransactionController and AccountService, rather than letting the user interface change balances directly, keeps the separation of concerns described in Section 2.1 and guarantees that every transfer, no matter which screen or actor started it, is checked and recorded in the same way.

#### 2.3.2 Sequence Diagram 2: Loan Approval and Disbursement (UC-17, UC-18, UC-20, UC-21)

Participants: Customer or Teller (actor), LoanUI (web client), LoanController (application service), LoanService (application service), Branch Manager (actor), AccountService (application service), and LoanRepository (repository).

Main scenario:

1. The customer, or a teller acting for the customer, submits a loan application through LoanUI, which sends the customer ID, product type, principal, and term in months to LoanController. This realises UC-16.
2. LoanController calls LoanService to create the application. LoanService checks the requested principal against the loan product's allowed range and creates a loan record with the status pending.
3. LoanService asks LoanRepository to save the pending application.
4. The Branch Manager opens the pending applications queue in LoanUI, which asks LoanController for all pending applications at the branch. LoanController returns the list through LoanService and LoanRepository, realising UC-17.
5. The Branch Manager reviews the applicant's consolidated relationship view, reusing UC-04 and UC-06, and selects Approve.
6. LoanUI sends an approveLoan request with the loan ID and manager ID to LoanController, realising UC-18.
7. LoanController calls LoanService to approve the loan. LoanService updates the status to approved, records the approving manager and the approval date, and asks LoanRepository to update the record.
8. LoanController calls LoanService to disburse the loan into the target account, realising UC-20.
9. LoanService calls AccountService to credit the target account with the principal amount, reusing the same deposit logic already validated in Sequence Diagram 1, posting the disbursed funds into the customer's nominated account.
10. LoanService generates the repayment schedule, realising UC-21, by computing the instalment amounts and due dates from the principal, interest rate, and term, and saving the schedule through LoanRepository.
11. LoanController returns a disbursement confirmation to LoanUI, which shows the updated loan status, disbursed amount, and the first repayment due date to the actor.

Alternative flow, rejection: at step 5, if the Branch Manager selects Reject instead of Approve, LoanUI sends a rejectLoan request with the loan ID, manager ID, and reason. LoanController and LoanService update the status to rejected and record the reason, realising UC-19. Steps 8 through 11, disbursement and schedule generation, do not take place, which enforces FR-28 structurally, since the disburse operation is never called on an application that is not in the approved state.

Assumptions: a single Branch Manager approval is sufficient for any loan amount within the scope of this project, as noted in Assumption A6 in Section 1.7. A production system might require a multi level credit committee for larger amounts, which would simply add further review and approval steps to the same pattern. Disbursement always targets an account already owned by the applicant, which AccountService re-checks before crediting. The repayment schedule in step 10 uses a simple fixed instalment amortisation calculation for the purposes of this project.

Reusing the credit operation in AccountService for loan disbursement, instead of writing a separate balance update for loans, avoids duplicating logic in two places and applies the single responsibility and don't repeat yourself principles discussed in Section 2.4.3. Keeping LoanController for orchestration, LoanService for business rules, and LoanRepository for persistence as separate layers mirrors the same pattern used in Sequence Diagram 1, which keeps the design consistent across modules.

### 2.4 Class Diagram

A full UML class diagram is provided in Alegria_Pay_Diagrams.drawio (Page 5), showing all classes, attributes, operations, associations, and cardinalities. The class model is described below.

#### 2.4.1 Class Descriptions

| Class | Key Attributes | Key Operations |
|---|---|---|
| User (abstract base class) | userId, name, email, passwordHash, phone, role | login(), logout(), hasPermission(action) |
| Customer (extends User) | customerId, address, nationalIdRef, homeBranchId | getRelationshipSummary(), updateProfile() |
| Staff (abstract, extends User) | staffId, employeeNo, position, branchId | (shared by Teller, BranchManager, Administrator) |
| Teller (extends Staff) | None additional | processDeposit(), processWithdrawal(), processTransfer() |
| BranchManager (extends Teller) | None additional | reviewLoanApplication(), approveLoan(), rejectLoan(), viewBranchReport() |
| Administrator (extends BranchManager) | None additional | createStaffAccount(), deactivateStaffAccount(), manageBranch() |
| Branch | branchId, name, code, location, phone | listAccounts(), listStaff(), getPerformanceSummary() |
| Account (abstract) | accountNumber, balance, status, openedAt, customerId, branchId | deposit(amount), withdraw(amount), getStatement(from, to), calculateInterest() |
| SavingsAccount (extends Account) | interestRate | calculateInterest() overridden |
| CurrentAccount (extends Account) | minimumBalance | withdraw(amount) overridden to enforce minimum balance |
| FixedDepositAccount (extends Account) | interestRate, maturityDate | calculateInterest() overridden, isMatured() |
| Transaction (abstract) | txnId, amount, timestamp, performedBy, branchId, status, reference | post(), reverse() |
| Deposit (extends Transaction) | toAccount | post() overridden |
| Withdrawal (extends Transaction) | fromAccount | post() overridden |
| Transfer (extends Transaction) | fromAccount, toAccount, isInterBranch | post() overridden |
| Loan | loanId, customerId, productId, principal, termMonths, status, balanceRemaining, approvedBy, branchId | approve(managerId), reject(managerId, reason), disburse(accountId), generateRepaymentSchedule() |
| LoanRepayment | repaymentId, loanId, instalmentNumber, amount, dueDate, paidDate, status | record(), isOverdue() |
| CreditCard | cardId, customerId, accountId, cardNumberMasked, limit, availableCredit, status, expiry | issue(), block(), unblock(), adjustLimit(newLimit) |

Two supporting classes are also used but are kept outside the core domain model described above: LoanProduct, which defines the interest rate and allowed amount range for a loan type, and ReportGenerator, which produces the reports listed in Section 1.4.

#### 2.4.2 Relationships and Cardinalities

| Relationship | Cardinality | Notes |
|---|---|---|
| Branch to Staff | 1 to 0..* | A branch employs zero or more staff. A staff member belongs to exactly one branch. |
| Branch to Account | 1 to 0..* | A branch hosts zero or more accounts. An account belongs to exactly one home branch. |
| Customer to Account | 1 to 0..* | A customer may hold zero or more accounts. Each account has exactly one owning customer. |
| Account to Transaction | 1 to 0..* | An account takes part in zero or more transactions, as the source, the destination, or both. Each deposit or withdrawal references one account, and each transfer references two accounts. |
| Customer to Loan | 1 to 0..* | A customer may hold zero or more loans. Each loan belongs to exactly one customer. |
| Loan to LoanRepayment | 1 to 0..* | A loan accumulates zero or more individual repayment records over time. |
| Customer to CreditCard | 1 to 0..* | A customer may hold zero or more credit cards. |
| CreditCard to Account | 1 to 1 | Each credit card is linked to exactly one settlement account. |
| BranchManager to Loan (approves) | 1 to 0..* | A branch manager may approve or reject zero or more loans. Each approved or rejected loan records exactly one approving manager. |
| User (generalisation) | not applicable | Customer and Staff generalise User. Teller, BranchManager, and Administrator form an increasing hierarchy under Staff, since an Administrator can do everything a Branch Manager can do, which in turn includes everything a Teller can do. |
| Account (generalisation) | not applicable | SavingsAccount, CurrentAccount, and FixedDepositAccount generalise Account. |
| Transaction (generalisation) | not applicable | Deposit, Withdrawal, and Transfer generalise Transaction. |

#### 2.4.3 Design Principles Applied

Each class in this model is given one clear purpose. For example, LoanRepayment only records an individual payment event and whether it is overdue, while ReportGenerator is kept separate from the modules whose data it reports on. This follows the single responsibility principle.

The Account balance attribute is private and can only be changed through the deposit() and withdraw() operations, which enforce the business rules, rather than being set directly by calling code. This use of encapsulation is what makes NFR-12 (atomicity) and FR-19 (no negative balances) possible to enforce reliably.

The calculateInterest() operation is declared on the abstract Account class and is overridden differently by SavingsAccount and FixedDepositAccount, and effectively does nothing in CurrentAccount. In the same way, post() is overridden by Deposit, Withdrawal, and Transfer. This use of polymorphism means new account or transaction types could be added later as new subclasses without changing existing, already tested classes, following the open and closed principle.

The User to Staff to Teller to BranchManager to Administrator hierarchy avoids repeating shared attributes, such as name, email, and role, and shared operations across every staff type, which reduces duplication through inheritance.

Interaction between modules, such as a loan disbursement needing to credit an account, happens through well defined operations like Account.deposit(), rather than one class reaching directly into another class's internal data. This keeps coupling low and cohesion high, matching the layered pattern already used in the sequence diagrams in Section 2.3.

Finally, ReportGenerator depends on the public operations of the domain classes rather than on how they are stored internally, so the persistence mechanism, an in browser simulation for this submission and a relational database in a future production build, could be replaced without rewriting the domain classes themselves.

A few simplifying assumptions apply to this model. Each CreditCard is linked to exactly one Account, and settlement across multiple accounts is not modelled, keeping this within the scope boundary set in Section 1.3.2. Each Loan references exactly one LoanProduct, which defines the interest rate applied, rather than allowing a fully negotiated custom rate for every loan. Status changes, such as closing an account, blocking a card, or rejecting a loan, are modelled as changes to an attribute on the existing object rather than as deletion, which preserves the audit trail required by NFR-10.

---

## 3. Testing Approach

Testing of Alegria Pay follows a layered approach aligned with the requirements documented above, consistent with standard software testing practice (Sommerville, 2016; Pressman and Maxim, 2020).

Unit testing covers core domain logic such as balance validation, interest and instalment calculation, loan status transitions, and credit limit checks. These are tested in isolation with valid, boundary, and invalid inputs, for example a withdrawal that exactly equals the balance, a withdrawal of GH₵ 0.01 more than the available balance, and a negative deposit amount.

Integration testing checks that the module interactions described in Section 2.1.4 work correctly end to end for the two documented scenarios, Transfer Funds and Loan Approval and Disbursement, and for their main alternative flows, insufficient funds and loan rejection, confirming that the module boundaries from the design are respected in the implementation.

Functional testing checks each functional requirement in Section 1.5 against the system through the user interface, in the role it applies to. For example, FR-18, the inter branch transfer requirement, is tested by logging in as the Accra teller and transferring funds to a Kumasi account, then checking that both ledgers and the branch comparison report reflect the movement correctly.

Role based access testing checks, for every protected action, that a user without the required role is correctly denied access, which supports NFR-09. For example, it is verified that a Customer session cannot reach the loan approval or staff management screens.

User acceptance testing uses the demonstration credentials in Appendix A to walk through each use case in Section 2.2.2 from the point of view of a Customer, a Teller, a Branch Manager, and an Administrator, confirming that the system behaves as described and supports the oral demonstration required for this course.

Regression testing is carried out after each module is added or changed during development, by re-running the previously passing test cases for earlier modules to confirm that nothing was broken. This matters in particular for the Transaction Processing module, which is reused by both ordinary transfers and loan disbursement, as shown in Section 2.3.2.

A small sample of the requirement to test case mapping used during testing is shown below.

| Requirement | Test Case Summary | Expected Result |
|---|---|---|
| FR-16 and FR-19 | Withdraw an amount larger than the account balance. | The system rejects the withdrawal, shows an insufficient funds message, and leaves the balance unchanged. |
| FR-17 and FR-18 | Transfer GH₵ 500 from an Accra account to a Kumasi account. | The source account is debited GH₵ 500, the destination account is credited GH₵ 500, and one transaction record is created, tagged as inter branch. |
| FR-23 and FR-28 | Attempt to disburse a loan that is still pending. | The system refuses disbursement until the loan status is approved. |
| FR-30 | Simulate card use that would go beyond the available credit limit. | The system rejects the transaction and leaves the available credit unchanged. |
| NFR-09 | Log in as a Customer and attempt to open the staff management screen. | Access is denied and the Customer is returned to their own dashboard. |

---

## 4. References

Asante, K., and Boateng, M. (2021). Digital transformation in Ghana's banking sector: Challenges and opportunities. Journal of African Business and Economic Research, 16(2), 45-63.

Bank of Ghana. (2022). Guidelines for electronic banking and payment services in Ghana. Bank of Ghana Press.

Bank of Ghana. (2023). Annual report on the payment systems oversight. Bank of Ghana. https://www.bog.gov.gh

Fowler, M. (2018). Refactoring: Improving the design of existing code (2nd ed.). Addison-Wesley.

Larman, C. (2005). Applying UML and patterns: An introduction to object oriented analysis and design and iterative development (3rd ed.). Prentice Hall.

Pressman, R. S., and Maxim, B. R. (2020). Software engineering: A practitioner's approach (9th ed.). McGraw-Hill Education.

Sommerville, I. (2016). Software engineering (10th ed.). Pearson Education.

---

## Appendix A: Demo Credentials

The seeded accounts below are provided for demonstration and grading purposes only. All passwords are for academic simulation and must never be reused for real banking credentials.

| Role | Name | Email | Password | Branch |
|---|---|---|---|---|
| Administrator | Ama Mensah | admin@alegriapay.gh | admin123 | Accra Head Office |
| Branch Manager | Kwame Asante | manager@alegriapay.gh | manager123 | Accra Head Office |
| Teller | Efua Boateng | teller@alegriapay.gh | teller123 | Accra Head Office |
| Teller | Yaw Owusu | teller.kumasi@alegriapay.gh | teller123 | Kumasi |
| Customer | Akosua Darko | akosua@email.com | customer123 | Accra |
| Customer | Kofi Adjei | kofi@email.com | customer123 | Kumasi |
| Customer | Abena Sarpong | abena@email.com | customer123 | Tema |

Suggested demo walkthrough:

1. Log in as Administrator, view branches and staff, and create a new staff account.
2. Log in as Teller (Accra), deposit funds into Akosua Darko's savings account, then transfer funds to Kofi Adjei's Kumasi account as an inter branch transfer.
3. Log in as Customer (Kofi Adjei), view the updated balance and transaction history, then apply for a loan.
4. Log in as Branch Manager, review and approve the pending loan, then confirm the disbursement and the generated repayment schedule.
5. Log in as Administrator or Branch Manager and generate the branch comparison and staff performance reports.

---

## Appendix B: Glossary of Terms

| Term | Definition |
|---|---|
| KYC | Know Your Customer, the process of verifying a customer's identity before opening an account. |
| GH₵ | The Ghana Cedi, the official currency used for all monetary values in this system. |
| Intra branch transfer | A funds transfer where the source and destination accounts belong to the same branch. |
| Inter branch transfer | A funds transfer where the source and destination accounts belong to different branches, for example Accra to Kumasi. |
| NPL | Non Performing Loan, a loan on which the borrower has failed to make scheduled repayments for an extended period. |
| RBAC | Role Based Access Control, restricting system actions based on a user's assigned role. |
| SPA | Single Page Application, a web application that loads a single HTML page and updates its content without full page reloads. |

End of Report.
