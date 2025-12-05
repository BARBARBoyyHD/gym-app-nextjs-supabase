# FitTrack Gym Management API Documentation

## Overview
This document provides documentation for the FitTrack Gym Management API. The API allows management of gym members, memberships, check-ins, workout programs, and user metrics.

## Base URL
```
https://gym-app.example.com/api
```

## Authentication
Most endpoints require authentication using a JWT token. Include this token in the Authorization header:

```
Authorization: Bearer <token>
```

For endpoints that don't require authentication, this header is not needed.

## Endpoints

### Authentication

#### POST /auth/sign-up
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "fullName": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "uuid-string",
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "member",
    "created_at": "2023-01-01T00:00:00Z"
  }
}
```

#### POST /auth/sign-in
Authenticate an existing user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "success": true,
  "session": {
    "access_token": "jwt-token-string"
  }
}
```

#### POST /auth/sign-out
Sign out the authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully signed out"
}
```

### Users

#### GET /users
Retrieve a list of all users. Admin access required.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `role` (optional): Filter by user role (admin, staff, member)
- `limit` (optional): Number of results to return (max 100, default 20)
- `offset` (optional): Number of records to skip (default 0)

**Response:**
```json
{
  "users": [
    {
      "id": "uuid-string",
      "email": "user@example.com",
      "full_name": "John Doe",
      "role": "member",
      "created_at": "2023-01-01T00:00:00Z"
    }
  ],
  "total_count": 1
}
```

#### POST /users
Create a new user. Admin access required.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "full_name": "Jane Doe",
  "role": "member"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "uuid-string",
    "email": "newuser@example.com",
    "full_name": "Jane Doe",
    "role": "member",
    "created_at": "2023-01-01T00:00:00Z"
  }
}
```

#### GET /users/{id}
Get details for a specific user by ID.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": "uuid-string",
  "email": "user@example.com",
  "full_name": "John Doe",
  "role": "member",
  "created_at": "2023-01-01T00:00:00Z"
}
```

#### PATCH /users/{id}
Update a specific user by ID.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "full_name": "John Updated Doe",
  "role": "staff"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User updated successfully"
}
```

#### DELETE /users/{id}
Delete a specific user by ID.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

### Memberships

#### GET /memberships
Retrieve a list of all memberships. Admin access required, users can retrieve their own memberships.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `user_id` (optional): Filter by user ID
- `status` (optional): Filter by membership status (active, expired, cancelled)
- `limit` (optional): Number of results to return (max 100, default 20)
- `offset` (optional): Number of records to skip (default 0)

**Response:**
```json
{
  "memberships": [
    {
      "id": "uuid-string",
      "user_id": "user-uuid",
      "plan_id": 1,
      "start_date": "2023-01-01",
      "end_date": "2023-12-31",
      "status": "active",
      "payment_method": "credit_card",
      "created_at": "2023-01-01T00:00:00Z"
    }
  ],
  "total_count": 1
}
```

#### POST /memberships
Create a new membership for a user.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "user_id": "user-uuid",
  "plan_id": 1,
  "start_date": "2023-01-01",
  "end_date": "2023-12-31",
  "status": "active",
  "payment_method": "credit_card"
}
```

**Response:**
```json
{
  "success": true,
  "membership": {
    "id": "uuid-string",
    "user_id": "user-uuid",
    "plan_id": 1,
    "start_date": "2023-01-01",
    "end_date": "2023-12-31",
    "status": "active",
    "payment_method": "credit_card",
    "created_at": "2023-01-01T00:00:00Z"
  }
}
```

#### GET /memberships/{id}
Get details for a specific membership by ID.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": "uuid-string",
  "user_id": "user-uuid",
  "plan_id": 1,
  "start_date": "2023-01-01",
  "end_date": "2023-12-31",
  "status": "active",
  "payment_method": "credit_card",
  "created_at": "2023-01-01T00:00:00Z"
}
```

#### PATCH /memberships/{id}
Update a specific membership by ID.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "status": "expired",
  "end_date": "2023-06-30"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Membership updated successfully"
}
```

#### DELETE /memberships/{id}
Delete a specific membership by ID.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Membership deleted successfully"
}
```

### Membership Plans

#### GET /membership-plans
Retrieve a list of all membership plans.

**Query Parameters:**
- `limit` (optional): Number of results to return (max 100, default 20)
- `offset` (optional): Number of records to skip (default 0)

**Response:**
```json
{
  "plans": [
    {
      "id": 1,
      "name": "Basic Monthly",
      "price": 29.99,
      "duration_days": 30,
      "description": "Basic gym access",
      "created_at": "2023-01-01T00:00:00Z"
    }
  ],
  "total_count": 1
}
```

#### POST /membership-plans
Create a new membership plan. Admin access required.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Premium Annual",
  "price": 299.99,
  "duration_days": 365,
  "description": "Full access including classes and facilities"
}
```

**Response:**
```json
{
  "success": true,
  "plan": {
    "id": 2,
    "name": "Premium Annual",
    "price": 299.99,
    "duration_days": 365,
    "description": "Full access including classes and facilities",
    "created_at": "2023-01-01T00:00:00Z"
  }
}
```

#### GET /membership-plans/{id}
Get details for a specific membership plan by ID.

**Response:**
```json
{
  "id": 1,
  "name": "Basic Monthly",
  "price": 29.99,
  "duration_days": 30,
  "description": "Basic gym access",
  "created_at": "2023-01-01T00:00:00Z"
}
```

#### PUT /membership-plans/{id}
Update a specific membership plan by ID. Admin access required.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "price": 34.99,
  "description": "Basic gym access with limited hours"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Membership plan updated successfully"
}
```

#### DELETE /membership-plans/{id}
Delete a specific membership plan by ID. Admin access required.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Membership plan deleted successfully"
}
```

### Check-ins

#### GET /check-ins
Retrieve a list of check-in logs.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `user_id` (optional): Filter by user ID
- `date` (optional): Filter by date (YYYY-MM-DD)
- `limit` (optional): Number of results to return (max 100, default 20)
- `offset` (optional): Number of records to skip (default 0)

**Response:**
```json
{
  "check_ins": [
    {
      "id": "uuid-string",
      "user_id": "user-uuid",
      "check_in_time": "2023-01-01T08:30:00Z",
      "device": "mobile-app",
      "check_in_method": "qr-scan"
    }
  ],
  "total_count": 1
}
```

#### POST /check-ins
Record a new check-in for a user.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "user_id": "user-uuid",
  "device": "mobile-app",
  "check_in_method": "qr-scan"
}
```

**Response:**
```json
{
  "success": true,
  "check_in": {
    "id": "uuid-string",
    "user_id": "user-uuid",
    "check_in_time": "2023-01-01T08:30:00Z",
    "device": "mobile-app",
    "check_in_method": "qr-scan"
  }
}
```

### User Metrics

#### GET /user-metrics
Retrieve a list of user metrics.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `user_id` (optional): Filter by user ID
- `date_from` (optional): Filter from date (YYYY-MM-DD)
- `date_to` (optional): Filter to date (YYYY-MM-DD)
- `limit` (optional): Number of results to return (max 100, default 20)
- `offset` (optional): Number of records to skip (default 0)

**Response:**
```json
{
  "metrics": [
    {
      "id": "uuid-string",
      "user_id": "user-uuid",
      "weight": 75.5,
      "height": 175.0,
      "bmi": 24.5,
      "date_recorded": "2023-01-01"
    }
  ],
  "total_count": 1
}
```

#### POST /user-metrics
Record new user metrics.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "user_id": "user-uuid",
  "weight": 75.5,
  "height": 175.0,
  "bmi": 24.5
}
```

**Response:**
```json
{
  "success": true,
  "metric": {
    "id": "uuid-string",
    "user_id": "user-uuid",
    "weight": 75.5,
    "height": 175.0,
    "bmi": 24.5,
    "date_recorded": "2023-01-01"
  }
}
```

#### GET /user-metrics/{id}
Get details for a specific user metric by ID.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": "uuid-string",
  "user_id": "user-uuid",
  "weight": 75.5,
  "height": 175.0,
  "bmi": 24.5,
  "date_recorded": "2023-01-01"
}
```

### Workout Programs

#### GET /workout-programs
Retrieve a list of all workout programs.

**Query Parameters:**
- `level` (optional): Filter by difficulty level (beginner, intermediate, advanced)
- `limit` (optional): Number of results to return (max 100, default 20)
- `offset` (optional): Number of records to skip (default 0)

**Response:**
```json
{
  "programs": [
    {
      "id": "uuid-string",
      "title": "Beginner Full Body",
      "description": "A full body workout for beginners",
      "level": "beginner",
      "created_at": "2023-01-01T00:00:00Z"
    }
  ],
  "total_count": 1
}
```

#### POST /workout-programs
Create a new workout program. Admin access required.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Advanced HIIT",
  "description": "High-intensity interval training",
  "level": "advanced"
}
```

**Response:**
```json
{
  "success": true,
  "program": {
    "id": "uuid-string",
    "title": "Advanced HIIT",
    "description": "High-intensity interval training",
    "level": "advanced",
    "created_at": "2023-01-01T00:00:00Z"
  }
}
```

#### GET /workout-programs/{id}
Get details for a specific workout program by ID.

**Response:**
```json
{
  "id": "uuid-string",
  "title": "Beginner Full Body",
  "description": "A full body workout for beginners",
  "level": "beginner",
  "created_at": "2023-01-01T00:00:00Z"
}
```

### Workout Progress

#### GET /workout-progress
Retrieve a list of workout progress records.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `user_id` (optional): Filter by user ID
- `program_id` (optional): Filter by program ID
- `date_from` (optional): Filter from date (YYYY-MM-DD)
- `date_to` (optional): Filter to date (YYYY-MM-DD)
- `limit` (optional): Number of results to return (max 100, default 20)
- `offset` (optional): Number of records to skip (default 0)

**Response:**
```json
{
  "progress_records": [
    {
      "id": "uuid-string",
      "user_id": "user-uuid",
      "program_id": "program-uuid",
      "date": "2023-01-01",
      "progress_note": "Felt great today!",
      "completed": true
    }
  ],
  "total_count": 1
}
```

#### POST /workout-progress
Record new workout progress.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "user_id": "user-uuid",
  "program_id": "program-uuid",
  "date": "2023-01-01",
  "progress_note": "Felt great today!",
  "completed": true
}
```

**Response:**
```json
{
  "success": true,
  "progress": {
    "id": "uuid-string",
    "user_id": "user-uuid",
    "program_id": "program-uuid",
    "date": "2023-01-01",
    "progress_note": "Felt great today!",
    "completed": true
  }
}
```

## Error Responses
All error responses follow the same structure:

```json
{
  "success": false,
  "error": "Error message explaining what went wrong"
}
```

## Status Codes
- `200`: Success for GET, PUT, PATCH requests
- `201`: Success for POST requests (resource created)
- `400`: Bad request (invalid input)
- `401`: Unauthorized (authentication required)
- `403`: Forbidden (insufficient permissions)
- `404`: Not found (resource doesn't exist)
- `500`: Internal server error