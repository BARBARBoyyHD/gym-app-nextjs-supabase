# Memberships CRUD API Specification

This specification defines the API endpoints for membership management following the established patterns in the project.

## ADDED Requirements

### Requirement: Memberships Management API
The system SHALL provide complete CRUD operations for memberships that connect members to membership plans with proper handler usage and standardized API structure.

#### Scenario: Client requests all memberships
- **WHEN** a GET request is made to `/api/admin/memberships/get`
- **THEN** the API returns all memberships with pagination, search, and sorting options
- **AND** the response follows standard success format

#### Scenario: Client requests a specific membership by ID
- **WHEN** a GET request is made to `/api/admin/memberships/get/{id}`
- **THEN** the API returns the specific membership matching the ID
- **AND** the response follows standard success format or 404 if not found

#### Scenario: Client creates a new membership
- **WHEN** a POST request is made to `/api/admin/memberships/post`
- **THEN** the API creates a new membership in the database
- **AND** returns the created membership with success status

#### Scenario: Client updates an existing membership
- **WHEN** a PUT request is made to `/api/admin/memberships/put/{id}`
- **THEN** the API updates the specified membership in the database using the ID from the path
- **AND** returns the updated membership with success status

#### Scenario: Client deletes an existing membership
- **WHEN** a DELETE request is made to `/api/admin/memberships/delete/{id}`
- **THEN** the API removes the specified membership from the database using the ID from the path
- **AND** returns a success message

### Requirement: Membership Validation
The system SHALL validate required fields when creating or updating memberships.

#### Scenario: Creating a membership with required fields
- **WHEN** a POST request is made to `/api/admin/memberships/post` with memberId, membershipPlanId, startDate, and endDate
- **THEN** the API creates the membership in the database
- **AND** returns the created membership

#### Scenario: Creating a membership without required fields
- **WHEN** a POST request is made to `/api/admin/memberships/post` without required fields (memberId, membershipPlanId, etc.)
- **THEN** the API returns a validation error
- **AND** does not create the membership

#### Scenario: Updating a membership with invalid data
- **WHEN** a PUT request is made to `/api/admin/memberships/put` with invalid membership data
- **THEN** the API returns a validation error
- **AND** does not update the membership

### Requirement: Handler Usage for API Consistency
The system SHALL use handlers from the handlers directory to maintain consistency and avoid duplicating business logic.

#### Scenario: API route implementation using handlers
- **WHEN** an API endpoint is implemented
- **THEN** it must use appropriate handlers from `/src/handlers`
- **AND** should not duplicate business logic in the route file

### Requirement: TypeScript Type Definitions for Memberships
The system SHALL define proper TypeScript interfaces for membership entities that follow established patterns.

#### Scenario: Membership type definition
- **WHEN** membership data is defined
- **THEN** it must conform to the Membership and MembershipInput interfaces
- **AND** these interfaces follow the base entity patterns with proper omit usage

### Requirement: Standardized API Directory Structure
The system SHALL follow the established API directory structure pattern for all endpoints.

#### Scenario: New API endpoint directory structure
- **WHEN** a new API endpoint is created
- **THEN** it must follow the pattern `/api/admin/{name}/get`, `/api/admin/{name}/post`, etc.
- **AND** maintain consistency with other API endpoints