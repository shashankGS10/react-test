# React & Node.js Skill Test

## Estimated Time

- **60 minutes**

## Requirements

### 1. Bug Fix: Login Issues (20 minutes)
- Ensure the login functionality works without any issues.
- No need to modify or add new login functions.
- Set up the correct environment based on your experience with project structures.
- **Login Credentials:**
  - **Email:** admin@gmail.com
  - **Password:** admin123

### 2. Implement Restful API for "Meeting" (40 minutes)
- Develop the "Meeting" API on both server and client sides.
- Focus on **code style** and **optimization**.
- Reference existing functions for guidance.

---

### Steps Taken

#### 1. Environment Variables and Initial Debugging
- **What I Did:**
  - Inspected the codebase and identified `.env` variables for backend configuration (e.g., MongoDB connection string, API base URLs).
  - Noticed frontend and backend were running on different ports (React: 3000, Express: 5001).
  - Fixed incorrect API calls from the frontend (3000) to the backend (5001) to resolve 404 errors.
- **Why:**
  - Environment variables separate configuration from code and support dev/prod environments.
  - Correct API routing ensures seamless client-server communication.

#### 2. MongoDB Atlas Setup and Connection
- **What I Did:**
  - Used MongoDB Atlas as the cloud database provider.
  - Installed the Node.js driver (`npm install mongodb`) and configured the connection string:
    ```
    mongodb+srv://<db_username>:<db_password>@cluster0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    ```
  - Stored the connection string in `.env` as `DB_URL`.
- **Why:**
  - Atlas provides scalable and secure database hosting.
  - Using the recommended connection string ensures compatibility and security.

#### 3. Backend Routing and API Debugging
- **What I Did:**
  - Fixed incorrect route mounting in Express (`router.use('/meeting', meetingRoutes)`).
  - Mounted routes directly on the Express app in `index.js`:
    ```js
    app.use('/api', meetingRoutes);
    ```
  - Defined all meeting-related endpoints in `routes/meeting.js`.
- **Why:**
  - Proper route mounting ensures API endpoints are accessible at expected URLs (e.g., `/api/meeting`).

#### 4. Meeting Model and Controller Best Practices
- **What I Did:**
  - Refactored the Mongoose model to follow conventions (e.g., singular, capitalized name: `Meeting`).
  - Ensured controller methods handled errors gracefully and returned appropriate HTTP status codes.
  - Used population for references (`attendees`, `attendeesLead`, `createdBy`) to return meaningful related data.
- **Why:**
  - Naming conventions and best practices improve code maintainability.
  - Proper error handling enhances API reliability.

#### 5. Frontend Integration and Testing
- **What I Did:**
  - Updated the frontend API service to use the correct base URL from `.env`:
    ```js
    export const constant = {
      baseUrl: process.env.REACT_APP_BASE_URL || "http://localhost:5001/"
    };
    ```
  - Tested backend endpoints independently using Postman.
  - Verified frontend integration after fixing backend routes.
- **Why:**
  - Decoupling frontend from hardcoded URLs simplifies environment switching.
  - Postman testing isolates backend issues from frontend bugs.

#### 6. Best Practices for Production
- **What I Did:**
  - Suggested modularizing routes using a main `route.js` or `routes/index.js` for scalability.
- **Why:**
  - Modular routing keeps the codebase organized and easier to maintain.

#### 7. MongoDB Atlas Health and Monitoring
- **What I Did:**
  - Verified MongoDB Atlas cluster health via the dashboard (connections, data size, read/write activity).
- **Why:**
  - Monitoring ensures database stability and helps catch issues early.

Backend .env:
```PORT=5001
NODE_ENV=development
HTTPS=false

# MongoDB Atlas Config
DB_URL=mongodb+srv://gsshashank:asdf.1234@cluster0.wdybsjz.mongodb.net
DB=Prolink

# Auth
USER=admin@gmail.com
PASS=admin123

# Stripe
STRIPE_PRIVATE_KEY=sk_test_your_test_key_here

# Default Seed Users (if required by app startup logic)
DEFAULT_USERS=[{"email":"admin@gmail.com","password":"admin123"}]
```

Frontend .env:```REACT_APP_BASE_URL=http://localhost:5001/
PUBLIC_URL=http://localhost:5001/```