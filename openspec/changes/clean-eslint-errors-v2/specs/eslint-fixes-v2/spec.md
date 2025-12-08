# ESLint Fixes V2 Specification

## ADDED Requirements

### REQ-ESLINT-FIX-HTML-LINKS
The application shall not have ESLint errors related to using HTML anchor elements for internal navigation.
#### Scenario:
When a developer runs ESLint on files with internal navigation, then no `@next/next/no-html-link-for-pages` errors should be reported.

### REQ-ESLINT-FIX-UNESCAPED-ENTITIES
The application shall not have ESLint errors related to unescaped entities in JSX components.
#### Scenario:
When a developer runs ESLint on JSX components, then no `react/no-unescaped-entities` errors should be reported.

### REQ-ESLINT-FIX-UNUSED-VARS
The application shall not have ESLint warnings related to unused imports and variables.
#### Scenario:
When a developer runs ESLint across the codebase, then no `@typescript-eslint/no-unused-vars` warnings should be reported for truly unused variables.

### REQ-ESLINT-FIX-SETSTATE-IN-EFFECT
The application shall not have ESLint errors related to calling setState synchronously within effects.
#### Scenario:
When a developer runs ESLint on components with useEffect, then no `react-hooks/set-state-in-effect` errors should be reported.

### REQ-ESLINT-FIX-NO-EXPLICIT-ANY
The application shall not have ESLint errors related to using 'any' type without specification.
#### Scenario:
When a developer runs ESLint on files with type annotations, then no `@typescript-eslint/no-explicit-any` errors should be reported.

### REQ-ESLINT-FIX-PURITY
The application shall not have ESLint errors related to impure functions during render.
#### Scenario:
When a developer runs ESLint on UI components, then no `react-hooks/purity` errors should be reported for impure functions.

## MODIFIED Requirements

### REQ-CODE-STANDARD-COMPLIANCE
The codebase shall comply with all configured ESLint rules as defined in the project conventions.
#### Scenario:
When running the ESLint checker across the codebase, then the output should be free of errors and warnings related to the addressed issues.

## REMOVED Requirements

None.