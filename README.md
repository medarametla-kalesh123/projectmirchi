# 🌶️ Mirchi Trading Management Application

A full-stack web application developed to digitize and simplify daily operations for a chilli trading business. The application centralizes farmer and trader records, transaction management, account maintenance, reports, and outstanding dues in one system.

## 📌 Project Overview

Managing a chilli trading business manually involves maintaining farmer and trader details, daily transaction records, financial calculations, account balances, and payment dues.

This application provides a centralized platform to manage these operations, reduce repetitive manual work, organize transaction records, and generate printable business reports.

## ✨ Key Features

- 👨‍🌾 Farmer and trader record management
- 🧾 Farmers Patti and Traders Patti management
- 🌶️ Daily chilli transaction recording through Kata List
- 📊 Daily transaction reports
- 💰 Account maintenance and financial record management
- 📅 Outstanding dues tracking and due reports
- 🖨️ Patti printing and individual bill printing
- 🔢 Automatic serial number and book number progression
- 🔐 User authentication and password-reset functionality
- 🗄️ Persistent storage using a relational database

## 🧩 Application Modules

### 1. Farmers Patti

Manages farmer-related transaction records and settlement calculations.

Key operations include:
- Recording farmer transaction details
- Maintaining quantities, rates, and transaction amounts
- Managing commissions, expenses, advances, loans, and applicable charges
- Calculating final settlement amounts
- Searching and retrieving saved Patti records
- Printing individual bills and Patti records

### 2. Traders Patti

Manages trader-related transaction records and financial details.

Key operations include:
- Maintaining trader transaction records
- Recording and retrieving Patti details
- Organizing bill and transaction information
- Searching saved records
- Printing Traders Patti documents

### 3. Kata List (Daily Transaction Entry)

Supports recording daily chilli trading transactions.

Key operations include:
- Recording daily transaction entries
- Maintaining transaction quantities and rates
- Organizing entries for business reporting
- Providing transaction data for related business operations

### 4. Daily Reports

Provides a consolidated view of daily business transactions.

Key operations include:
- Retrieving transaction records for reporting
- Organizing daily business activity
- Supporting review of transaction information

### 5. Account Maintenance

Maintains account-related information used in business operations.

Key operations include:
- Managing account numbers and account names
- Maintaining account descriptions and group classifications
- Organizing financial account records

### 6. Farmers and Traders Due Reports

Supports tracking outstanding payments associated with farmer and trader transactions.

Key operations include:
- Retrieving relevant due records
- Organizing outstanding amounts
- Supporting follow-up on pending payments

The application's due-date calculation uses a 14-day period from the bill date where applicable.

### 7. Four Column Day Book

Maintains day-book records in a structured four-column format for organizing financial transactions.

### 8. Authentication and Security

Provides user authentication and account-related security features.

Implemented functionality includes:
- Password hashing
- JWT-based authentication
- Password-reset functionality with time-limited reset tokens

## 🔄 Business Workflow

1. **Maintain records:** Manage farmer, trader, and account information.
2. **Record daily transactions:** Enter chilli trading transaction details in the daily transaction module.
3. **Prepare Patti records:** Maintain the relevant Farmers Patti and Traders Patti information.
4. **Manage financial details:** Record applicable charges, expenses, advances, loans, and settlement information.
5. **Track outstanding dues:** Retrieve due records and identify pending payments.
6. **Generate reports:** Review daily activity and organized financial records.
7. **Print documents:** Retrieve and print the required Patti records and individual bills.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend user interface |
| Python | Backend programming |
| FastAPI | REST API development |
| SQLAlchemy | Database ORM and data access |
| MySQL | Relational data storage |
| JWT | Authentication |
| Password hashing | Secure password storage |
| Git and GitHub | Version control and source management |

## 🏗️ Architecture

The application follows a frontend–backend–database architecture.

- **Frontend:** React.js provides the user interface for entering, searching, retrieving, and printing business records.
- **Backend:** FastAPI exposes API endpoints for business operations and processes application requests.
- **Data layer:** SQLAlchemy maps application models to relational database tables and manages database interactions.
- **Database:** MySQL stores business records persistently.

## 📁 Backend Organization

The backend is organized into modular components, including:

- `models/` — SQLAlchemy database models
- `schemas/` — Request and response validation schemas
- `routers/` — API endpoints grouped by business module
- `services/` — Business logic where implemented
- `database.py` — Database engine, session, and base configuration
- `main.py` — FastAPI application initialization and router registration

## 🎯 Key Technical Highlights

- Modular REST API design using FastAPI
- Relational database modeling using SQLAlchemy
- Separation of frontend, backend, and database responsibilities
- Reusable API endpoints for business operations
- Search, retrieval, and printing workflows
- Authentication and password-reset functionality
- Business-oriented transaction and due-date management

## 💡 Project Outcome

The application brings important chilli trading operations into a single digital system. It provides a structured way to maintain records, manage transactions, track outstanding dues, and generate business documents.

## 👨‍💻 Author

**Kaleswararao Medarametla**

- GitHub: [medarametla-kalesh123](https://github.com/medarametla-kalesh123)
- LinkedIn: [kaleswararao-medarametla](https://www.linkedin.com/in/kaleswararao-medarametla)
- Email: medarametlakalesh@gmail.com

- 
## Application Screenshots

![Screenshot 1](Screenshot%202026-09-23%20165806.png)

![Screenshot 2](Screenshot%202026-09-21%20120502.png)

![Screenshot 3](Screenshot%202026-09-21%20120101.png)

![Screenshot 4](Screenshot%202026-09-21%20115723.png)

![Screenshot 5](Screenshot%202026-09-21%20115054.png)

