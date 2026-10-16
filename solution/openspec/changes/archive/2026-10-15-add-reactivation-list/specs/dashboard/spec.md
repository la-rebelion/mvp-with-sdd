## MODIFIED Requirements

### Requirement: Donor KPIs
The system SHALL show the number of active donors, the number of inactive donors, the total donated, and the average gift (total donated divided by the number of donations, rounded to 2 decimals), where each donor is counted once by name.

#### Scenario: Donors are counted once
- **WHEN** the data has three donations from "Ana" (active) and one from "Luis" (inactive)
- **THEN** the dashboard shows 1 active donor and 1 inactive donor

#### Scenario: Total donated
- **WHEN** the donations are 100, 250.50 and 49.50
- **THEN** the total donated is 400

#### Scenario: Average gift
- **WHEN** the donations are 100, 250.50 and 49.50
- **THEN** the average gift is 133.33
