# Align APIs with ERD

## Overview
Implement missing API endpoints and functionality to fully align the application with the Entity Relationship Diagram (ERD). Currently, the application has documented APIs and database schemas that match the ERD, but several key API endpoints are not yet implemented. Specifically, the memberships API which connects members to membership plans is documented but not yet implemented, creating a gap between the designed architecture and actual implementation.

## Motivation
The gym application currently has a mismatch between its documented architecture (ERD) and actual implementation. The memberships entity, which forms a crucial link between members and membership plans, exists in the database schema and documentation but lacks actual API endpoints. This prevents the application from fully managing the core business relationship between members and their active memberships.

## What Changes
- Implement full CRUD API for memberships entity to connect members with membership plans
- Ensure all implemented APIs fully match the relationships defined in the ERD
- Add proper validation reflecting the ERD constraints (e.g., member_id, plan_id relationships)
- Implement proper error handling and response formatting for new endpoints

## Scope
- Create complete CRUD endpoints for memberships following the established API structure
- Implement GET (list and single item), POST, PUT/PATCH, and DELETE operations for memberships
- Ensure proper handler usage to maintain consistency with other API endpoints
- Define proper TypeScript types for membership entities
- Add appropriate validation for required fields and foreign key relationships

## Out of Scope
- Frontend interface for managing memberships
- Business logic for membership validation (e.g., preventing multiple active memberships)
- Authentication and authorization implementation (relying on existing middleware)
- Database schema changes (as the schema already exists per ERD)