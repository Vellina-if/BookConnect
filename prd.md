# PRD.md

# BookConnect Authentication & Workspace Onboarding

## Project Overview

BookConnect adalah frontend UI project berbasis:

* HTML5
* CSS3
* Vanilla JavaScript

Project ini berfokus pada pembuatan:

* Authentication pages
* Multi-step workspace onboarding
* Dashboard UI
* Multi-language interface

Project hanya berupa frontend design tanpa backend integration.

---

# Project Goals

Membuat UI modern dan responsive untuk:

* Login system
* Forgot password flow
* Workspace onboarding
* Team management setup
* Dashboard interface

Dengan tampilan:

* Clean
* Professional
* SaaS-style
* Enterprise-ready
* Beginner-friendly code structure

---

# Technical Scope

## Frontend Stack

* HTML5
* CSS3
* Vanilla JavaScript

---

# Out of Scope

Project tidak mencakup:

* Backend
* Database
* API integration
* Real authentication
* Real email sending
* Real Google login
* Real map integration

Semua data dan interaction bersifat dummy/demo UI only.

---

# Main Features

# 1. Login Page

## Purpose

Halaman autentikasi pengguna.

---

## Components

* Logo
* Welcome text
* Email input
* Password input
* Show/hide password
* Remember me checkbox
* Login button
* Google login button (dummy)
* Forgot password link
* Register link
* Language switcher

---

## UI Behavior

* Password visibility toggle
* Input focus animation
* Hover effects
* Responsive layout
* Multi-language support

---

# 2. Forgot Password Page

## Purpose

Halaman reset password.

---

## Components

* Back button
* Page title
* Email input
* Send reset link button
* Success notification
* Language switcher

---

## UI Behavior

* Success box appears after button click
* Responsive layout
* Smooth animation

---

# 3. Multi-Step Register / Workspace Onboarding

## Purpose

Guided onboarding process untuk membuat workspace dan mengatur team.

---

# Total Steps

7 onboarding steps.

---

# Step 1 — Account Setup

## Fields

* Full Name
* Email Address
* Country
* Phone Number
* Password
* Agree to Terms checkbox

---

## Features

* Password toggle
* Form validation UI
* Responsive form layout

---

# Step 2 — Workspace Name

## Title

Name your workspace

---

## Description

This will be the name of your BookConnect workspace — choose something your team will recognize.

---

## Fields

* Workspace Name

---

# Step 3 — Workspace Location

## Title

Where is your workspace?

---

## Fields

* Country
* State
* City
* Timezone
* Address & Location

---

## Additional Components

* Map preview card (dummy UI)

---

# Step 4 — Class Name

## Title

What's your class name?

---

## Description

The class name represents the type of service or activity your workspace offers.

---

## Fields

* Class Name

---

# Step 5 — Team Name

## Title

What's your team name?

---

## Description

Give your team a name. This helps organize your staff within the workspace.

---

## Fields

* Team Name

---

# Step 6 — Team Positions

## Title

Define team positions

---

## Description

Define the roles/positions available in your team. You can add more later.

---

## Features

* Add new position
* Remove position
* Dynamic position list

---

## Example Positions

* Manager
* Staff
* Admin
* Supervisor

---

# Step 7 — Team Members

## Title

Add team members

---

## Description

Add your team members. They'll receive an invitation to set up their login.

---

## Step 8 

* Add member
* Remove member
* Empty state UI
* Member card UI

---

## Member Fields

* Full Name
* Email
* Position

---

# 4. Dashboard Page

## Purpose

Main workspace dashboard after onboarding.

---

# Layout Structure

## Sidebar

Contains:

* Dashboard
* Workspace
* Team
* Analytics
* Settings
* Logout

---

## Top Navbar

Contains:

* Workspace name
* Search
* Notifications
* Language switcher
* User profile

---

## Main Dashboard Content

### Welcome Section

* Greeting
* Workspace overview

---

### Statistic Cards

* Total Members
* Teams
* Activity
* Notifications

---

### Recent Activity

Dummy activity list UI.

---

### Analytics Section

Dummy chart placeholder UI.

---

# Multi Language System

## Supported Languages

* English
* Indonesian

---

# Language Switching

## Features

* Instant language change
* No reload required
* Save selected language to localStorage

---

# Translation Method

Using JavaScript object-based translations.

Example:

```javascript
const translations = {
  en: {},
  id: {}
}
```

---

# Responsive Design

# Mobile (<900px)

* Single column layout
* Sidebar becomes drawer
* Form becomes stacked

---

# Tablet

* Adaptive spacing
* Flexible grid

---

# Desktop

* Two-column onboarding layout
* Fixed sidebar dashboard

---

# JavaScript Interactions

## Required Interactions

* Password toggle
* Multi-step navigation
* Step indicator update
* Add/remove positions
* Add/remove members
* Language switching
* Sidebar toggle
* Dummy notifications

---

# Folder Structure

```plaintext
/project
│
├── login.html
├── forgot-password.html
├── register.html
├── dashboard.html
│
├── /css
│   └── style.css
│
├── /js
│   ├── script.js
│   └── language.js
│
├── /assets
│   ├── /images
│   └── /icons
│
└── README.md
```

---

# Deliverables

## Required Pages

* Login Page
* Forgot Password Page
* Register Multi-Step Page
* Dashboard Page

---

# Success Criteria

Project dianggap selesai apabila:

* Semua halaman responsive
* Semua interaction berjalan
* Multi-step onboarding smooth
* Multi-language bekerja
* UI konsisten
* Tidak membutuhkan backend
* Code clean dan mudah dipahami
