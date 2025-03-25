# NexMedis Frontend

## Author

This project was developed by **Ahmad Zaki Nashirullah**  
Development period: March 25, 2025 - March 26, 2025

## Overview

NexMedis is a modern healthcare management system frontend built with React, TypeScript, and Vite. This application demonstrates integration with RESTful APIs, modern UI design patterns, and responsive user interfaces for healthcare professionals.

## Installation

Follow these steps to set up the project locally:

```bash
# Clone the repository (replace with your repo URL)
git clone https://github.com/yourusername/nexmedis-fe.git

# Navigate to the project directory
cd nexMedis/FE/nexMedis_FE/FE-NexMedis

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Authentication Testing

For testing purposes, you can use:

- Email: eve.holt@reqres.in
- Password: cityslicka

## Features

- **User Management Dashboard**
  - List, create, update, and delete users
  - Pagination for user listing
  - Responsive data table with avatars
  - Search and filter capabilities
- **Profile Management**
  - Detailed user profiles with personal and professional information
  - Profile editing with form validation
  - Activity timeline
  - Avatar display and management
- **Settings Panel**
  - Appearance settings (light/dark/system theme)
  - Language preferences
  - Notification management
  - Security settings
  - Device management
  - Accessibility options
- **Authentication**
  - Login/Register forms
  - Session management
  - Secure routes
- **UI Components**
  - Cards, tables, and form elements
  - Modal dialogs
  - Toast notifications
  - Skeletons for loading states
  - Responsive layouts
- **API Integration**
  - RESTful API interactions with ReqRes
  - Axios instance configuration
  - Error handling and loading states

## Technology Stack

- **React 19**: Latest React version with modern patterns
- **TypeScript**: For type safety
- **Vite**: Fast build tooling and development server
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Accessible and customizable UI components
- **Axios**: HTTP client for API requests
- **React Router 7**: Application routing
- **React Hook Form**: Form validation
- **Zod**: Schema validation
- **Lucide React**: SVG icon library
- **Sonner**: Toast notifications
- **next-themes**: Theme management

## API Integration

This project uses the [ReqRes](https://reqres.in/) API for demonstration. Here are the endpoints used:

### GET USERS

```
GET /api/users?page={page}
```

Response:

```json
{
  "page": 2,
  "per_page": 6,
  "total": 12,
  "total_pages": 2,
  "data": [
    {
      "id": 7,
      "email": "michael.lawson@reqres.in",
      "first_name": "Michael",
      "last_name": "Lawson",
      "avatar": "https://reqres.in/img/faces/7-image.jpg"
    },
    {
      "id": 8,
      "email": "lindsay.ferguson@reqres.in",
      "first_name": "Lindsay",
      "last_name": "Ferguson",
      "avatar": "https://reqres.in/img/faces/8-image.jpg"
    },
    {
      "id": 9,
      "email": "tobias.funke@reqres.in",
      "first_name": "Tobias",
      "last_name": "Funke",
      "avatar": "https://reqres.in/img/faces/9-image.jpg"
    }
  ]
}
```

### CREATE USER

```
POST /api/users
```

Request:

```json
{
  "name": "morpheus",
  "job": "leader"
}
```

Response:

```json
{
  "name": "morpheus",
  "job": "leader",
  "id": "788",
  "createdAt": "2025-03-25T09:52:59.414Z"
}
```

### UPDATE User

```
PUT /api/users/{id}
```

Request:

```json
{
  "name": "morpheus",
  "job": "zion resident"
}
```

Response:

```json
{
  "name": "morpheus",
  "job": "zion resident",
  "updatedAt": "2025-03-25T09:53:13.938Z"
}
```

### DELETE User

```
DELETE /api/users/{id}
```

Response: 204 No Content

### LOGIN

```
POST /api/login
```

Request:

```json
{
  "email": "eve.holt@reqres.in",
  "password": "cityslicka"
}
```

Response:

```json
{
  "token": "QpwL5tke4Pnpja7X4"
}
```

### REGISTER

```
POST /api/register
```

Request:

```json
{
  "email": "eve.holt@reqres.in",
  "password": "pistol"
}
```

Response:

```json
{
  "id": 4,
  "token": "QpwL5tke4Pnpja7X4"
}
```

## Project Structure

```
FE-NexMedis/
├── public/
├── src/
│ ├── assets/ # Static files like images
│ ├── components/
│ │ ├── ui/ # UI components (shadcn/ui)
│ │ ├── Navbar.tsx # Application navigation
│ │ └── [other components]
│ ├── configs/
│ │ └── axiosInstance.ts # Axios configuration for API
│ ├── pages/
│ │ ├── homePage.tsx # User management dashboard
│ │ ├── profilePage.tsx # User profile page
│ │ ├── settingPage.tsx # Application settings
│ │ └── [other pages]
│ ├── App.tsx # Main application component
│ └── main.tsx # Entry point
└── package.json
```

## User Management Features

The User Management page includes:

1. **Listing Users**

   - Paginated view of users
   - Displays avatar, name, email and other details
   - Loading skeletons during data fetch

2. **Creating Users**

   - Dialog form for entering user details
   - Form validation
   - Success/error notifications

3. **Updating Users**

   - Pre-populated edit form
   - Form validation
   - Success/error handling

4. **Deleting Users**
   - Confirmation dialog
   - Proper error handling
   - Success notification

## Profile Page Features

The Profile page includes:

1. **User Information**

   - Personal details (name, email, avatar)
   - Professional information (role, department)
   - Editable sections

2. **Activity Timeline**

   - Recent actions and events
   - Chronological display with timestamps

3. **Account Management**
   - Password management
   - Security settings

## Settings Page Features

The Settings page includes:

1. **Appearance**

   - Theme selection (light/dark/system)
   - Font size options
   - UI customization

2. **Notifications**

   - Email notification preferences
   - In-app notification settings
   - Quiet hours configuration

3. **Privacy & Security**

   - Password management
   - Two-factor authentication setup
   - Data sharing preferences

4. **Device Management**
   - Connected devices list
   - Login history
   - Session management

## Note About ReqRes API

This application uses the ReqRes.in demo API which simulates real API behavior but:

1. Data is not actually persisted between requests
2. The API returns mock data regardless of your input
3. Changes are not reflected in subsequent GET requests
4. It's perfect for frontend demos without needing a backend

This makes it ideal for demonstrating frontend functionality without setting up a real backend server.

---

© 2025 NexMedis. All rights reserved.
