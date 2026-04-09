# 🏥 MediBook — Doctor Appointment System

<div align="center">
**A full-stack web application for managing doctor appointments, patients, and hospital operations.**

*COMSATS University Islamabad, Vehari Campus*
*CSC337 — Advanced Web Technologies | Spring 2026*
*Instructor: Yasmeen Jana*

</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [API Endpoints](#-api-endpoints)
- [Installation & Setup](#-installation--setup)
- [Screenshots](#-screenshots)
- [Developer](#-developer)

---

## 🎯 About the Project

**MediBook** is a complete hospital management web application that allows healthcare staff to efficiently manage patients, doctors, and appointments. Built using the MEN stack (MongoDB, Express.js, Node.js) with EJS templating and Bootstrap 5 for a responsive, professional UI.

The system includes secure user authentication, role-based access, real-time dashboard analytics, and printable appointment slips — making it a production-ready healthcare solution.

---
Video of my project :
https://drive.google.com/file/d/1FWDBP7jYJ_s2fEuSLRnm76XHFEXmnHTl/view?usp=sharing

## ✨ Features

### 🔐 Authentication
- User Signup & Login with encrypted passwords (bcryptjs)
- Session-based authentication (express-session)
- Flash messages for success/error feedback
- Role-based access (Admin / Receptionist)
- Protected routes via middleware

### 📊 Dashboard
- Live statistics: Total Patients, Doctors, Appointments, Pending count
- Interactive Doughnut Chart (Chart.js) showing appointment status
- Recent Appointments table (last 5)
- Quick Action buttons for fast navigation

### 👥 Patient Management
- Add, Edit, Delete patients (full CRUD)
- Search patients by name (real-time)
- Medical History: Blood Group, Allergies, Past conditions
- Personal info: Name, Email, Phone, Age, Gender, Address

### 🩺 Doctor Management
- Add, Edit, Delete doctors (full CRUD)
- Search by name or specialization
- Doctor profiles: Specialization, Email, Phone, Fee
- Available Days selection (Monday–Sunday)

### 📅 Appointment Management
- Book, Edit, Cancel appointments (full CRUD)
- Filter appointments by status (Pending / Confirmed / Cancelled)
- Patient–Doctor relationship with MongoDB references
- Time slot selection (9 AM – 5 PM)
- Status badges with color coding

### 🖨️ Print Appointment Slip
- Professional printable appointment slip
- Shows patient info, doctor info, date, time, fee, status
- Browser print support with clean print styling

### 🌙 Dark Mode
- Toggle between Light and Dark mode
- Preference saved in localStorage (persists after refresh)

### 👤 User Profile
- View and update profile name
- Shows role, member since date, account status
- Password encrypted — cannot be changed from UI

### 🌐 Landing Page
- Professional hero section with gradient background
- Feature cards, stats section, footer
- Login / Signup navigation

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js v20.x |
| Framework | Express.js v4.x |
| Database | MongoDB (local) |
| ODM | Mongoose |
| View Engine | EJS (Express Generator) |
| Frontend | Bootstrap 5.3, Bootstrap Icons |
| Charts | Chart.js |
| Authentication | bcryptjs, express-session |
| Flash Messages | connect-flash |
| Environment | dotenv |

---

## 📁 Project Structure

```
medibook/
├── bin/
│   └── www                          # Server entry point
├── config/
│   └── db.js                        # MongoDB connection
├── controllers/
│   ├── patientController.js         # Patient CRUD logic
│   ├── doctorController.js          # Doctor CRUD logic
│   └── appointmentController.js     # Appointment CRUD + print logic
├── middleware/
│   └── auth.js                      # Authentication middleware
├── models/
│   ├── User.js                      # User schema (auth)
│   ├── Patient.js                   # Patient schema + medical history
│   ├── Doctor.js                    # Doctor schema
│   └── Appointment.js               # Appointment schema with references
├── routes/
│   ├── index.js                     # Dashboard + profile routes
│   ├── auth.js                      # Login / Signup / Logout
│   ├── patients.js                  # Patient routes
│   ├── doctors.js                   # Doctor routes
│   └── appointments.js              # Appointment routes + print
├── views/
│   ├── partials/
│   │   ├── header.ejs               # Sidebar + topbar + dark mode
│   │   └── footer.ejs               # Scripts + dark mode JS
│   ├── auth/
│   │   ├── login.ejs                # Login page
│   │   └── signup.ejs               # Signup page
│   ├── patients/
│   │   ├── index.ejs                # Patients list + search
│   │   └── form.ejs                 # Add/Edit patient form
│   ├── doctors/
│   │   ├── index.ejs                # Doctors list + search
│   │   └── form.ejs                 # Add/Edit doctor form
│   ├── appointments/
│   │   ├── index.ejs                # Appointments list + filter
│   │   ├── form.ejs                 # Book/Edit appointment form
│   │   └── print.ejs                # Printable appointment slip
│   ├── index.ejs                    # Dashboard
│   ├── profile.ejs                  # User profile page
│   ├── landing.ejs                  # Public landing page
│   └── error.ejs                    # 404 error page
├── public/
│   └── stylesheets/
│       └── style.css
├── .env                             # Environment variables (not uploaded)
├── .gitignore
├── app.js                           # Express app configuration
├── package.json
└── README.md
```

---

## 🗄️ Database Schema

### User
```javascript
{
  name:     String (required),
  email:    String (required, unique),
  password: String (required, bcrypt hashed),
  role:     String (enum: ['admin', 'receptionist'], default: 'receptionist'),
  timestamps: true
}
```

### Patient
```javascript
{
  name:       String (required),
  email:      String (required, unique),
  phone:      String (required),
  age:        Number,
  gender:     String (enum: ['Male', 'Female', 'Other']),
  address:    String,
  bloodGroup: String (enum: ['A+','A-','B+','B-','AB+','AB-','O+','O-']),
  allergies:  String,
  medHistory: String,
  timestamps: true
}
```

### Doctor
```javascript
{
  name:           String (required),
  specialization: String (required),
  email:          String (required, unique),
  phone:          String,
  availableDays:  [String],
  fee:            Number (default: 0),
  timestamps: true
}
```

### Appointment
```javascript
{
  patient:  ObjectId (ref: 'Patient', required),
  doctor:   ObjectId (ref: 'Doctor', required),
  date:     Date (required),
  timeSlot: String (required),
  status:   String (enum: ['pending','confirmed','cancelled'], default: 'pending'),
  notes:    String,
  timestamps: true
}
```

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /auth/login | Login page |
| POST | /auth/login | Process login |
| GET | /auth/signup | Signup page |
| POST | /auth/signup | Create new account |
| GET | /auth/logout | Logout user |

### Dashboard & Profile
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | / | Dashboard with stats & chart |
| GET | /profile | User profile page |
| POST | /profile | Update profile name |
| GET | /landing | Public landing page |

### Patients
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /patients | Get all patients (with search) |
| GET | /patients/add | Add patient form |
| POST | /patients/add | Create new patient |
| GET | /patients/edit/:id | Edit patient form |
| POST | /patients/edit/:id | Update patient |
| POST | /patients/delete/:id | Delete patient |

### Doctors
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /doctors | Get all doctors (with search) |
| GET | /doctors/add | Add doctor form |
| POST | /doctors/add | Create new doctor |
| GET | /doctors/edit/:id | Edit doctor form |
| POST | /doctors/edit/:id | Update doctor |
| POST | /doctors/delete/:id | Delete doctor |

### Appointments
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /appointments | Get all appointments (with filter) |
| GET | /appointments/add | Book appointment form |
| POST | /appointments/add | Create appointment |
| GET | /appointments/edit/:id | Edit appointment form |
| POST | /appointments/edit/:id | Update appointment |
| POST | /appointments/delete/:id | Cancel appointment |
| GET | /appointments/print/:id | Print appointment slip |

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js v16 or higher
- MongoDB installed and running locally
- Git

### Steps

**1. Clone the repository**
```bash
git clone https://github.com/taibamunir3373-hub/tayyaba-munir.git
cd tayyaba-munir
```

**2. Install dependencies**
```bash
npm install
```

**3. Create `.env` file in root directory**
```env
MONGODB_URI=mongodb://localhost:27017/medibook
PORT=3000
SESSION_SECRET=medibook_secret_key
```

**4. Make sure MongoDB is running**
```bash
# Windows
net start MongoDB

# Or start mongod manually
mongod
```

**5. Start the server**
```bash
npm start
```

**6. Open in browser**
```
http://localhost:3000/landing     ← Landing page
http://localhost:3000/auth/signup ← Create account
http://localhost:3000/auth/login  ← Login
http://localhost:3000             ← Dashboard
```

---

## 📸 Screenshots

| Page | Description |
### 1. Landing Page
The professional landing page with hero section, feature cards, and stats.
Shows MediBook branding, Get Started and Login buttons.
<img width="1355" height="687" alt="landing page" src="https://github.com/user-attachments/assets/57187681-111a-47cc-ab2a-bd74531e5a73" />
<img width="1297" height="685" alt="landing 2" src="https://github.com/user-attachments/assets/b59d05b0-ad5d-4a1c-8e92-ac2af0dfcefa" />
<img width="1348" height="648" alt="landing 3" src="https://github.com/user-attachments/assets/310c708e-fe3d-4196-86a4-8c2480cee315" />

### 3. Login Page
Secure login form with email and password.
Uses bcryptjs for password verification and express-session for auth.
|<img width="511" height="621" alt="login" src="https://github.com/user-attachments/assets/40caf5e8-6b3a-4c07-9da7-ce839802ae9c" />

<img width="1366" height="698" alt="dashboard 1" src="https://github.com/user-attachments/assets/82b75d28-e9d3-4c50-b819-23670df820b2" />

<img width="1362" height="690" alt="dashboard 2" src="https://github.com/user-attachments/assets/677e82f3-f3d1-40d2-9f79-ff5e95f9adda" />

<img width="1364" height="682" alt="patients" src="https://github.com/user-attachments/assets/2cfcd310-05bb-4d2e-8beb-37bfb609c2a0" />

<img width="627" height="641" alt="app" src="https://github.com/user-attachments/assets/41406e77-b741-4242-be61-fffed0dcd79f" />
<img width="727" height="646" alt="add patients" src="https://github.com/user-attachments/assets/ecc56d32-04ae-4eef-a45d-55d0d98be814" />
<img width="1136" height="623" alt="doc" src="https://github.com/user-attachments/assets/d7ad53f2-65f1-462c-875e-1281e867d7e9" />
<img width="614" height="642" alt="add doctor" src="https://github.com/user-attachments/assets/d4f980f4-8188-43dd-ae59-b4ac216051f2" />
<img width="1126" height="622" alt="appoint" src="https://github.com/user-attachments/assets/c0a6a643-ef0e-4b8a-b59b-dfc4fe22532c" />
<img width="1365" height="692" alt="dark mode" src="https://github.com/user-attachments/assets/c12061a2-4e80-4752-a03b-9ebde4cf504c" />
<img width="1203" height="675" alt="print slip" src="https://github.com/user-attachments/assets/fa3e43f6-48a1-44a6-816a-098d87fa5c0b" />


<img width="1136" height="629" alt="profile" src="https://github.com/user-attachments/assets/7fe9b8c4-f971-4d5b-a9ca-42308133be09" />


---

## 👩‍💻 Developer

| Field | Detail |
|-------|--------|
| **Name** | Tayyaba Munir |
| **University** | COMSATS University Islamabad, Vehari Campus |
| **Department** | Computer Science |
| **Class** | BSSE |
| **Course** | CSC337 — Advanced Web Technologies |
| **Instructor** | Yasmeen Jana |
| **Semester** | Spring 2026 |
| **GitHub** | [@taibamunir3373-hub](https://github.com/taibamunir3373-hub) |

---

<div align="center">

Made with ❤️ for CSC337 Lab Mid Term Exam — Spring 2026

**MediBook — Smart Doctor Appointment System**

</div>
