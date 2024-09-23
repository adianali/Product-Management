# Product Management Application

This is a **Product Management** web application built using **React** on the frontend and **Laravel** on the backend. The application allows users to manage products through a user-friendly interface with features such as authentication, real-time product updates, and formatted prices in Indonesian Rupiah. The backend API is secured using **Bearer Tokens** for authentication, and the UI is enhanced with **SweetAlert2** for interactive alerts.

## Features
- **CRUD Operations**: Users can create, read, update, and delete products through a responsive interface.
- **Authentication**: Secure login and registration using **Laravel Sanctum** and **Bearer Tokens**.
- **Responsive UI**: The frontend is built using **Bootstrap**, making it fully responsive.
- **Formatted Prices**: Product prices are displayed in Indonesian Rupiah format.
- **SweetAlert2 Integration**: All actions like product updates and deletions trigger SweetAlert popups for better user experience.
- **Discount Management**: Display product discounts with a percentage symbol (`%`).

## Technologies Used

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: Type-safe JavaScript for better development practices.
- **Redux Toolkit**: For managing application state.
- **Axios**: For making HTTP requests to the backend API.
- **React Router**: For client-side routing.
- **Bootstrap**: For a responsive and modern UI.
- **SweetAlert2**: For beautiful alert dialogs and confirmations.

### Backend
- **Laravel 11**: A robust PHP framework for building the REST API.
- **Laravel Sanctum**: Provides API token authentication.
- **MySQL**: Database to store product and user information.
- **PHP 8.x**: Backend programming language.

## Project Setup

### Prerequisites
- **Node.js**: Required for the frontend (React).
- **PHP and Composer**: Required for the backend (Laravel).
- **MySQL**: Database for storing product and user data.


- **Clone the Repository**

   ```bash
   git clone https://github.com/adianali/Product-Management.git

### Frontend Setup

1. **Install Dependencies**

   ```bash
   cd Product-Management
   cd frontend
   npm install
   
2. **Start the Frontend Development Server**

   ```bash
   npm start

The app should now be running on http://localhost:3000.

### Backend Setup
1. **Install Dependencies**

   ```bash
   cd ..
   cd backend
   composer install
   
2. **Configure .env**

   ```bash
   APP_URL=http://127.0.0.1:8000
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_database
   DB_USERNAME=your_username
   DB_PASSWORD=your_password

3. **Run Migrations**
    ```bash
   php artisan migrate

5. **Generate API Keys**
   ```bash
   php artisan key:generate

7. **Run the Backend Server**
   ```bash
   php artisan serve
   
The backend should be running on http://127.0.0.1:8000

# API Documentation

## Authentication Endpoints

### POST /api/login

Authenticate the user and return a Bearer token.

**Request:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Request:**

```json
{
  "access_token": "your_token",
  "token_type": "Bearer"
}
```

