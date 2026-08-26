# 🚀 Selesai — Project & Task Management Platform

<p align="center">
  <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="300" alt="Laravel Logo">
</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/Laravel-12.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel 12"></a>
  <a href="#"><img src="https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 18"></a>
  <a href="#"><img src="https://img.shields.io/badge/Inertia.js-2.0-9553E9?style=for-the-badge&logo=inertia&logoColor=white" alt="Inertia.js"></a>
  <a href="#"><img src="https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"></a>
  <a href="#"><img src="https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge" alt="License"></a>
</p>

---

## 📌 Overview

**Selesai** is a modern, intuitive project and task management web application designed to help teams collaborate seamlessly, track task progress, handle deadline exceptions, and streamline workflows.

Powered by **Laravel 12**, **Inertia.js**, **React 18**, and **Tailwind CSS**, Selesai combines the full-stack power of Laravel with a fluid Single-Page Application (SPA) user interface.

---

## ✨ Key Features

- 📂 **Project Management & Collaboration**
  - Create and manage projects.
  - Invite team members via project invitations.
  - Manage member roles, accept or reject project invites, and remove members when necessary.

- 📋 **Comprehensive Task Tracking**
  - Assign tasks to specific team members with priorities, due dates, and detailed descriptions.
  - Real-time status updates and progress tracking.

- ⏳ **Late Submission & Approval Workflow**
  - Automatic detection of overdue tasks (`is_late`).
  - Team members can submit reasons for delay (`late_reason`).
  - Project managers/leads can review, approve, or decline late task completion requests with feedback.

- 📧 **Quick Action via Signed Email Links**
  - Complete tasks directly from email notifications via secure Laravel **Signed URLs** without needing to log in manually.

- 📊 **Bulk Excel Task Import**
  - Effortlessly import lists of tasks from spreadsheet files (`.xlsx`, `.csv`) using `maatwebsite/excel`.

- 🔔 **Task Reminders & Notifications**
  - Timed notifications (`time_notif`) and tracking to ensure deadline awareness.

- 🖥️ **Modern & Responsive UI**
  - Dynamic interactive views built with **Inertia.js React** and styled with **Tailwind CSS** and **Headless UI**.

---

## 🛠️ Tech Stack

### **Backend**
- **Framework**: [Laravel 12](https://laravel.com)
- **Language**: PHP 8.2+
- **Authentication**: Laravel Breeze & Sanctum
- **Database**: SQLite / MySQL / PostgreSQL (managed via Doctrine DBAL)
- **Excel Processor**: `maatwebsite/excel`

### **Frontend**
- **Framework**: [React 18](https://react.dev) via [Inertia.js 2.0](https://inertiajs.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) & Headless UI
- **Build Tool**: [Vite 7](https://vitejs.dev)
- **Route Helper**: `tightenco/ziggy`

---

## 🚀 Getting Started

Follow these steps to get a local development environment up and running.

### **Prerequisites**
- **PHP**: `>= 8.2`
- **Composer**: `>= 2.x`
- **Node.js**: `>= 18.x` & **npm**

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/syahrul35/Selesai.git
   cd Selesai
   ```

2. **Install Backend Dependencies**
   ```bash
   composer install
   ```

3. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

4. **Environment Setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Run Migrations & Seeders**
   ```bash
   php artisan migrate --seed
   ```

6. **Start the Development Environment**
   Selesai provides a unified `composer dev` script that starts the Laravel server, queue listener, log viewer (Pail), and Vite dev server simultaneously using `concurrently`:
   ```bash
   composer run dev
   ```

   Alternatively, you can run the services separately:
   ```bash
   # Terminal 1: Laravel Web Server
   php artisan serve

   # Terminal 2: Vite Dev Server
   npm run dev

   # Terminal 3: Queue Listener
   php artisan queue:listen
   ```

7. **Access the Application**
   Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

---

## 🧪 Running Tests

To execute the automated test suite powered by PHPUnit:

```bash
composer run test
```

---

## 📜 Folder Structure Highlights

```
Selesai/
├── app/
│   ├── Http/Controllers/    # Dashboard, Project, Task, Invite, & Profile Controllers
│   ├── Models/              # User, Project, Task, Schedule Models
│   └── Imports/             # Excel import handlers
├── database/
│   ├── migrations/          # Schema migrations for projects, tasks, invites
│   └── seeders/             # Database seeders
├── resources/
│   └── js/                  # Inertia React components & pages
├── routes/
│   ├── web.php              # Web routes & signed URL email handlers
│   └── auth.php             # Breeze authentication routes
└── vite.config.js           # Vite configuration
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
