## Student Management System API Documentation

### Admin Panel Endpoints:


#### 1. **Admin Login:**

- **Route:** `/admin/login`
- **Method:** POST
- **Description:** Admin logs in with email and password. If valid, generate a JWT token.
- **Payload:**
  ```json
  {
    "email": "admin@admin.com",
    "password": "admin"
  }
  ```
- **Response:**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

#### 2. **Add Student:**

- **Route:** `/admin/students`
- **Method:** POST
- **Description:** Admin adds a new student.
- **Payload:**
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "department": "Computer Science",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Student added successfully"
  }
  ```

#### 3. **Assign Task:**

- **Route:** `/admin/assign-task`
- **Method:** POST
- **Description:** Admin assigns a task to a student with a due time.
- **Payload:**
  ```json
  {
    "studentId": "1234567890",
    "description": "Complete Assignment",
    "dueTime": "2023-11-01T12:00:00Z"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Task assigned successfully"
  }
  ```

### Student Interface Endpoints:

#### 1. **Student Login:**

- **Route:** `/students/login`
- **Method:** POST
- **Description:** Student logs in with email and password. If valid, generate a JWT token.
- **Payload:**
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

#### 2. **Get Assigned Tasks:**

- **Route:** `/students/tasks`
- **Method:** GET
- **Description:** Student retrieves their assigned tasks.
- **Authorization Header:** `Bearer <token>`
- **Response:**
  ```json
  [
    {
      "taskId": "abc123",
      "description": "Complete Assignment",
      "dueTime": "2023-11-01T12:00:00Z",
      "status": "pending"
    },
    {
      "taskId": "def456",
      "description": "Read Chapter 5",
      "dueTime": "2023-10-28T15:00:00Z",
      "status": "overdue"
    }
  ]
  ```

#### 3. **Update Task Status:**

- **Route:** `/students/tasks/status-update`
- **Method:** PUT
- **Description:** Student updates the status of a specific task.
- **Authorization Header:** `Bearer <token>`
- **Payload:**
  ```json
    {
    "taskId": "6536448c4e7f6418f40eabc3",
    "status": "completed"
  }
  ```
- **Response:**
  ```json
    {
      "message": "Task status updated successfully",
      "task": {
          "_id": "6536448c4e7f6418f40eabc3",
          "studentId": "65363542e4b89057a841bdaa",
          "description": "Research for Group Project Topic",
          "status": "pending",
          "dueTime": "2023-11-25T00:00:00.000Z",
          "__v": 0
      }
  }
  ```

These endpoints allow the admin to manage students and tasks, and students to view and update their assigned tasks.

### Environment Variables:

- **MONGODB_URI:** mongodb+srv://hossainchisty11:jQ9x0AVhCRpTLx30@cluster0.fqiufd9.mongodb.net/student-management?retryWrites=true&w=majority
- **JWT_SECRET:** whocare

### Sample API Usage:
```bash
# Admin Login Request
curl -X POST -H "Content-Type: application/json" -d '{"email": "admin@admin.com", "password": "admin"}' https://example.com/api/v1/admin/login

# Get Tasks Request (Token should be included in the Authorization header)
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" https://example.com/api/v1/student/tasks

# Update Task Status Request (Token should be included in the Authorization header)
curl -X PATCH -H "Authorization: Bearer YOUR_JWT_TOKEN" https://example.com/api/v1/student/update-task-status/1
```

