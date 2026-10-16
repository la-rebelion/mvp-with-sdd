## Purpose

Give the director the organization's key donor numbers at a glance.

## ADDED Requirements

### Requirement: Donor KPIs
The system SHALL show the number of active donors, the number of inactive donors, and the total donated, where each donor is counted once by name.

#### Scenario: Donors are counted once
- **WHEN** the data has three donations from "Ana" (active) and one from "Luis" (inactive)
- **THEN** the dashboard shows 1 active donor and 1 inactive donor

#### Scenario: Total donated
- **WHEN** the donations are 100, 250.50 and 49.50
- **THEN** the total donated is 400

### Requirement: Monthly trend
The system SHALL show, for each month with donations, the total amount and the number of donations, oldest month first.

#### Scenario: Two months of donations
- **WHEN** there are two donations in 2026-02 (100 and 50) and one in 2026-01 (20)
- **THEN** the trend lists 2026-01 (20, 1 donation) before 2026-02 (150, 2 donations)

### Requirement: Program ranking
The system SHALL rank programs by total donated, highest first.

#### Scenario: Ranking order
- **WHEN** Education received 300, Food Bank 500 and Health 100
- **THEN** the ranking is Food Bank, Education, Health
