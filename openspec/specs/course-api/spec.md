# course-api Specification

## Purpose
TBD - created by archiving change add-payment-and-course-apis. Update Purpose after archive.
## Requirements
### Requirement: Course CRUD Operations
The system SHALL provide complete CRUD operations for courses with proper handler usage and standardized API structure.

#### Scenario: Client requests all courses
- **WHEN** a GET request is made to `/api/courses/get`
- **THEN** the API returns all courses with proper authentication
- **AND** the response follows standard success format

#### Scenario: Client requests a specific course by ID
- **WHEN** a GET request is made to `/api/courses/get/{id}`
- **THEN** the API returns the specific course matching the ID
- **AND** the response follows standard success format or 404 if not found

#### Scenario: Client creates a new course
- **WHEN** a POST request is made to `/api/courses/post`
- **THEN** the API creates a new course in the database
- **AND** returns the created course with success status

#### Scenario: Client updates an existing course
- **WHEN** a PUT request is made to `/api/courses/put`
- **THEN** the API updates the specified course in the database using the ID from the request
- **AND** returns the updated course with success status

#### Scenario: Client deletes an existing course
- **WHEN** a DELETE request is made to `/api/courses/delete`
- **THEN** the API removes the specified course from the database using the ID from the request
- **AND** returns a success message

### Requirement: Course Validation
The system SHALL validate required fields when creating or updating courses.

#### Scenario: Creating a course with required fields
- **WHEN** a POST request is made to `/api/courses/post` with required fields (title, description, instructor, duration, level, category, price)
- **THEN** the API creates the course in the database
- **AND** returns the created course

#### Scenario: Creating a course without required fields
- **WHEN** a POST request is made to `/api/courses/post` without required fields
- **THEN** the API returns a validation error
- **AND** does not create the course

### Requirement: Course Authentication and Authorization
The system SHALL require proper authentication and authorization for all course operations.

#### Scenario: Accessing course endpoints with valid JWT
- **WHEN** a request is made to any course endpoint with a valid JWT token
- **THEN** the API processes the request normally
- **AND** returns the appropriate response

#### Scenario: Accessing course endpoints without JWT
- **WHEN** a request is made to any course endpoint without a valid JWT token
- **THEN** the API returns a 401 Unauthorized response
- **AND** does not process the request

#### Scenario: Non-admin accessing course endpoints
- **WHEN** a non-admin user makes a request to course endpoints with a valid JWT token
- **THEN** the API returns a 403 Forbidden response
- **AND** does not process the request

