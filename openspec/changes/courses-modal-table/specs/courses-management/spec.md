# Courses Management Spec

## ADDED Requirements

### Requirement: Display Courses Table
- The system SHALL display all courses in a tabular format
- The table SHALL include columns for ID, Title, Description, Category, and Actions
- The table SHALL support pagination with 10 items per page by default
- The table SHALL support sorting by any column
- The table SHALL support searching across title, description, and category

#### Scenario: 
Given an admin user navigates to the courses management page
When the page loads
Then they should see a table with all courses
And the table should display the course ID, title, description, and category
And pagination controls should be available at the bottom

### Requirement: Add Course Modal
- The system SHALL provide an "Add Course" button that opens a modal form
- The form SHALL include fields for title, description, category, and video URL
- The form SHALL validate all inputs using existing Zod schemas
- The system SHALL submit new course data via the usePostData hook
- The system SHALL display success/error notifications after submission

#### Scenario:
Given an admin user on the courses management page
When they click the "Add Course" button
Then a modal form should appear with fields for course information
When they fill out the form and submit valid data
Then the course should be added to the database
And the modal should close
And the table should update to include the new course
And a success notification should appear

### Requirement: Edit Course Modal
- The system SHALL provide an "Edit Course" option in the table row actions
- The edit form SHALL pre-populate with existing course data
- The form SHALL validate updates using existing Zod schemas
- The system SHALL update course data via the useUpdateData hook
- The system SHALL display success/error notifications after update

#### Scenario:
Given an admin user on the courses management page
When they select the "Edit" option for a specific course
Then an edit modal should appear pre-filled with the course's current data
When they modify the data and submit valid changes
Then the course should be updated in the database
And the modal should close
And the table should update to reflect the changes
And a success notification should appear

### Requirement: Delete Course Confirmation
- The system SHALL provide a "Delete Course" option in the table row actions
- The system SHALL require confirmation before deleting a course
- The system SHALL remove the course via the useDeleteData hook
- The system SHALL display success/error notifications after deletion

#### Scenario:
Given an admin user on the courses management page
When they select the "Delete" option for a specific course
Then a confirmation dialog should appear
When they confirm the deletion
Then the course should be removed from the database
And the table should update to remove the course
And a success notification should appear

## MODIFIED Requirements

### Requirement: Courses Management Page
- The system SHALL render the courses management page using the new CourseListComponents
- The page SHALL maintain existing layout and styling patterns

#### Scenario:
Given an admin user navigates to the courses management page
When the page loads
Then it should display the courses table with add/edit/delete functionality
And maintain the same layout and styling as other admin pages