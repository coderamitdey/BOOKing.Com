# 🏨 Hostel Booking Web App


## Table of Contents
1. [Project Overview](#project-overview)
2. [Live Demo](#live-demo)
3. [Features](#features)
4. [Routes Overview](#routes-overview)
5. [Screenshots](#screenshots)
6. [Tech Stack & NPM Packages](#tech-stack--npm-packages)
7. [Installation & Setup](#installation--setup)
8. [Firebase Configuration](#firebase-configuration)
9. [Usage](#usage)
10. [Contribution](#contribution)
11. [License](#license)

---

## Project Overview
**Hostel Booking Web App** is a modern web application that allows users to browse, filter, sort, and book hostels. Authenticated users can:
- Access protected pages
- Maintain a wishlist (Favorites)
- Book hotels with check-in/out dates
- Submit and manage reviews
- Update their profile
- View booked hotels in a cart

The app is **responsive**, mobile-first, and includes **smooth UI/UX interactions**.

---

## Live Demo
[🔗https://hotel-management-9rb.pages.dev/]

---

## Features

### Home Page
- Browse hostels from `hotels.json`.
- **Filters:** All, Most Popular, Most Luxurious, Nearby.
- **Sort Options:** Price (Low ↔ High), Rating (High → Low), Rooms (High → Low).
- Sticky sidebar (desktop) and horizontal scroll (mobile).

### Hostel Details Page (Protected)
- Book hostels with check-in/out date selection.
- Add/remove from **wishlist**.
- Cancel bookings.
- Display **user reviews** and review distribution chart.
- Real-time toast notifications for actions.
- **Custom loading spinner** during page fetch.

### Wishlist / Favorites
- Add hostels to wishlist using heart icon.
- Wishlist count shown on navbar.
- View all favorites on `/favorites` page.
- Remove hotels from wishlist with notification.

### Booked Hotels Cart
- Show booked hostels on `/booked-hotels`.
- Cart count displayed on navbar.
- Cancel bookings with confirmation toast.

### Authentication
- Login / Register using Firebase.
- Google login integration.
- Protected routes for logged-in users.

### Forgot Password
- Reset password via email.
- Pre-filled email input if previously entered.

### Update Profile
- Update Photo URL and Name on `/update-profile`.
- Save changes with real-time feedback.

### Responsive & Modern UI
- Built with Tailwind CSS.
- Mobile-first design.
- Smooth hover effects.
- React Icons for UI elements.
- Favicon included.

---

## Routes Overview

| Route                     | Component/Page           | Protected |
|----------------------------|-------------------------|-----------|
| `/`                        | Home                    | No        |
| `/hostel/:id`              | Hostel Details          | Yes       |
| `/favorites`               | Favorites / Wishlist    | Yes       |
| `/booked-hotels`           | Booked Hotels / Cart    | Yes       |
| `/login`                   | Login                   | No        |
| `/register`                | Register                | No        |
| `/forgot-password`         | Forgot Password         | No        |
| `/my-profile`              | My Profile              | Yes       |
| `/update-profile`          | Update Profile          | Yes       |

---


## Tech Stack & NPM Packages
- **Frontend:** React, Tailwind CSS, React Icons
- **Routing:** react-router-dom
- **Auth:** Firebase Authentication
- **Notifications:** react-toastify
- **Charts:** recharts
- **Date Picker:** react-datepicker
- **State Management:** React Context API
- **Hosting:** GitHub Pages / Vite

**NPM Packages Used:**
