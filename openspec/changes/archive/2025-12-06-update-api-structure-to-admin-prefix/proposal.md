# Change Proposal: Update API Structure to Use /api/admin Prefix

## Overview
This proposal outlines the changes needed to update all API structure documentation and guidelines to reflect the current implementation where all administrative APIs are located under the `/api/admin/` prefix.

## Current State
Currently, the project's documentation and guidelines reference API structures without the `/admin/` prefix:
- API guidelines reference `/api/{name}/...` structure
- Design documents reference routes without `/admin/` prefix
- API structure guidelines document the old pattern

However, the actual implementation correctly places all administrative APIs under `/api/admin/{name}/...`

## Desired State
All documentation, design documents, and guidelines should consistently reference the `/api/admin/{name}/...` structure to match the actual implementation.

## Requirements
- Update all API structure documentation
- Update all related design guidelines
- Align documentation with the actual implementation
- Ensure consistency across all project references

## Scope
- Documentation files in `/docs/`
- OpenSpec guidelines in `/openspec/`
- Main project documentation in `/QWEN.md`
- All related API design documents

## Success Criteria
- All API structure references consistently use `/api/admin/{name}/...` format
- Documentation accurately reflects implementation
- No broken references or inconsistencies remain