## Project Name
**🏨 Hostel Booking Web App**

## Purpose
A modern web application for browsing and booking hostels. Users can filter, sort, and view detailed hostel information. Authenticated users can manage their profile and access protected pages.

## Live URL
[https://hotel-management-9rb.pages.dev/]

---

## Key Features

### 1. Home Page
- Browse all hostels loaded from `hotels.json`.
- **Filters:**
  - All Hotels
  - Most Popular (highest rating)
  - Most Luxurious (highest price)
  - Nearby (based on location, e.g., Chittagong)
- **Sorting Options:**
  - Price: Low to High / High to Low
  - Rating: High to Low
  - Rooms: High to Low
- Responsive layout with sticky sidebar on desktop and horizontal scroll on mobile.

### 2. Hostel Details Page (Protected)
- Shows all details of a selected hostel.
- Only accessible for logged-in users.
- Non-authenticated users are redirected to the login page.

### 3. Authentication
- Login and Sign Up functionality using Firebase.
- Session-based access control for protected pages.
- Google login integration.

### 4. Forgot Password
- Accessible via "Forgot Password?" link on login page.
- Email input is pre-filled if previously entered.
- Reset password redirects the user to Gmail (or configured email service).

### 5. Update User Information
- Accessible on `/my-profile`.
- Form allows updating:
  - Photo URL
  - Name
- Clicking **Update** saves changes to the user profile.

### 6. Responsive & Modern UI
- Built with Tailwind CSS.
- Mobile-first design with smooth hover effects.
- Uses React Icons for UI elements.

---

## Routes Overview

| Route                     | Component/Page           | Protected |
|----------------------------|-------------------------|-----------|
| `/`                        | Home                    | No        |
| `/hostel/:id`              | Hostel Details          | Yes       |
| `/login`                   | Login                   | No        |
| `/register`                | Register                | No        |
| `/forgot-password`         | Forgot Password         | No        |
| `/my-profile`              | My Profile              | Yes       |
| `/update-profile`          | Update Profile          | Yes       |

---

## NPM Packages Used
- `react` – Core UI library.
- `react-router-dom` – Page routing and protected routes.
- `firebase` – Authentication and user management.
- `tailwindcss` – Utility-first CSS framework.
- `react-icons` – UI icons.

---

## Installation & Setup

1. Clone the repository:
```bash
git clone YOUR_REPO_URL
cd YOUR_PROJECT_FOLDER
