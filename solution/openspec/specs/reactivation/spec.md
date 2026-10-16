# reactivation Specification

## Purpose
Help the team decide which inactive donors to contact first.

## Requirements

### Requirement: Reactivation list
The system SHALL list inactive donors sorted by lifetime total donated, highest first, with each donor's last donation date.

#### Scenario: Highest lifetime value first
- **WHEN** inactive "Jorge" gave 2500 in total and inactive "Luis" gave 1200
- **THEN** Jorge is listed before Luis

#### Scenario: Active donors are excluded
- **WHEN** "Ana" is active
- **THEN** Ana does not appear in the reactivation list
