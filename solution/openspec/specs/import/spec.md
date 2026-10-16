# import Specification

## Purpose
Let the coordinator refresh the dashboard with the latest donations export.

## Requirements

### Requirement: Admin key required
The system MUST reject an import whose `X-Admin-Key` header is missing or wrong, and MUST leave the current data unchanged.

#### Scenario: Missing key
- **WHEN** a CSV is uploaded without the `X-Admin-Key` header
- **THEN** the response status is 401 and the dashboard numbers do not change

### Requirement: Import replaces data
The system SHALL replace all previously loaded donations with the rows of the uploaded file.

#### Scenario: Second import replaces the first
- **WHEN** a file with 3 valid rows is imported and then a file with 2 valid rows is imported
- **THEN** the dashboard reflects only the 2 rows of the second file

### Requirement: Skip invalid rows
The system SHALL skip rows with an empty donor or a non-numeric amount, count them, and still import the valid rows.

#### Scenario: One bad row
- **WHEN** a file has 4 rows and one of them has the amount "abc"
- **THEN** 3 donations are loaded and the result reports 1 skipped row

### Requirement: Import result
The system SHALL report the number of donors loaded, donations loaded, and rows skipped.

#### Scenario: Result stats
- **WHEN** a file with donations from 2 different donors (3 rows, all valid) is imported
- **THEN** the result is 2 donors, 3 donations, 0 skipped
