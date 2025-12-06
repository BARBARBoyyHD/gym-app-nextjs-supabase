# Standardized PUT and DELETE Routes Specification

## ADDED Requirements

### Requirement: PUT Route with ID in URL Path
The system SHALL implement PUT routes with the resource ID in the URL path.

#### Scenario: Client updates a specific resource
- **WHEN** a client makes a PUT request to `/api/{name}/put/[id]` with update data
- **THEN** the system identifies the resource by the ID in the URL path
- **AND** updates the specified resource with the data provided in the request body

#### Scenario: API processes PUT request
- **WHEN** an API route receives a PUT request at `/api/{name}/put/[id]/route.ts`
- **THEN** the ID parameter is extracted from the URL path
- **AND** the update data is extracted from the request body
- **AND** the resource is updated using the ID and data

### Requirement: DELETE Route with ID in URL Path
The system SHALL implement DELETE routes with the resource ID in the URL path.

#### Scenario: Client deletes a specific resource
- **WHEN** a client makes a DELETE request to `/api/{name}/delete/[id]`
- **THEN** the system identifies the resource by the ID in the URL path
- **AND** deletes the specified resource

#### Scenario: API processes DELETE request
- **WHEN** an API route receives a DELETE request at `/api/{name}/delete/[id]/route.ts`
- **THEN** the ID parameter is extracted from the URL path
- **AND** the specified resource is deleted using the ID

### Requirement: Consistent API Structure
The system SHALL maintain consistent API structure across all endpoints.

#### Scenario: Developer creates new PUT endpoint
- **WHEN** a developer implements a new PUT endpoint following project guidelines
- **THEN** the endpoint uses the `/api/{name}/put/[id]/route.ts` structure
- **AND** the resource ID is extracted from the URL path parameter

#### Scenario: Developer creates new DELETE endpoint
- **WHEN** a developer implements a new DELETE endpoint following project guidelines
- **THEN** the endpoint uses the `/api/{name}/delete/[id]/route.ts` structure
- **AND** the resource ID is extracted from the URL path parameter