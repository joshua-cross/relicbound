# RelicBound - Database Schema (Initial)

Within this document the schema required to achieve the functionality within the specs file will be defined. With a specific focus on the community voting aspect, as this will make up the majority of the functionality for the MVP.

This schema is intentionally minimal and focuses solely on getting the voting mechanism out as soon as possible for the 
bare minimum MVP.

---

## Core entities

### Users
Represents the authenticated users who will be allowed to participate within the loading

> Uses Laravel's default `users` table

**Key Notes**
- Required to prevent duplicate votes from the same user
- No profile or social data will be provided in the MVP
- Eventually, these will contain user entered relic vessels.

---

### Relic effects
Represents individual relic effects that make part of a relic. These are what the user will eventually vote on.

#### Table: `relic_effects`


| Column | Type   | Notes                      |
|--------|--------|----------------------------|
| id     | bigint | Primary Key                |
| name   | string | Short Human readable label |
| details | text | Description of what the effect does |
| created_at | timestamp | |
| updated_at | timestamp | |

##### Examples Records

- Starting equipment inflicts fire damage
- Start with lightning pots

### Votes
Represents a single vote from a user on a single Relic Effect, optionally these can be for a Nightlord, a hero or both.

#### Table: `votes`

| Column | Type   | Notes                                            |
|--------|--------|--------------------------------------------------|
| id | bigint | Primary key                                      |
| user_id | bigint | Foreign key -> users.id                          |
| relic_effect_id | bigint | Foreign key -> relic_effect.id                   |
| hero_id | bigint | Nullable for now, foreign will heroes are added. |
| nightlord_id | bigint | Nullable for now, foreign when heroes are added  |
| value | tinyint | +1 (good) or -1 (bad)                            |
| created_at | timestamp |                                                  |

**Note:** a user can only vote once per attribute.

---

### Summarization

The above highlighs the bare minimum to get the voting system for the different relics up and running. Once this is achieved
and confirmed stable we can continue in adding heroes and nightlords next which will probably be the next possible priorities.

### Notes

- Caching will be added for aggregating the scores for each individual score
- The base score will be 0.5 for all Relic Effects without community engagement
- No vote confidence will be included for the MVP.
- Weapons and power-ups will be added at a later date, getting relics up and running is the priortity.

---

## Design Principles
- Prefer derivation to storage
- Minimize schema complexity early
- Model context via nullable foreign keys
- Enforce correctness at the database level where possible