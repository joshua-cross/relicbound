# Relicbound (relicbound.co.uk) – Product Specification

## Purpose
Community-driven rankings for relics, runes, and weapons within **Elden Ring: Nightreign** to help players make situational decisions based on hero and boss choices.

---

## Problem Statement
Nightreign offers millions of build combinations but provides little guidance on what is effective. Existing resources are anecdotal and restrictive. By ranking individual relic attributes through community voting, players can evaluate relics and builds per hero and Nightlord without relying on fixed, prescriptive guides.

---

## Target Users
Relicbound is designed for players who understand Nightreign’s systems but lack clear, structured guidance on effective builds:

- Intermediate Elden Ring Nightreign players who have accumulated hundreds of relics
- Players stuck on a particular Nightlord
- Players seeking up-to-date builds for their favourite hero

---

## Core Concepts
- **Hero** – playable character (e.g. Ironeye)
- **Relic Attribute** – individual effect (e.g. “Starting equipment inflicts fire damage”)
- **Rune** – relic container with one or more attributes
- **Boss** – encounter with defined weaknesses
- **Vote** – community preference signal (swipe left/right)

---

## MVP Scope

### Voting
**Requirements**
- User registration required to prevent duplicate votes
- Tinder-style interface:
    - Swipe right → attribute is good
    - Swipe left → attribute is poor
- All attributes start with a base score of **0.5**
- Scores increase or decrease based on votes

**Voting Context**
Users may vote on attributes in the following contexts:
- Generic (no hero, no Nightlord)
- Hero-specific
- Nightlord-specific
- Hero + Nightlord combination

Attributes and contexts are presented in **random order** to distribute votes evenly and avoid bias.

---

### User Account
Authenticated users can:
- Participate in attribute voting
- Input their owned Rune Vessels / relics
- View ranked recommendations based on:
    - Generic rankings
    - Hero-specific rankings
    - Nightlord-specific rankings

**MVP Limitation**
- No social features
- No profiles beyond basic authentication
- No public sharing of builds

---

### Pages

#### Nightlord Page
- Boss weaknesses and resistances (icon-based)
- Top-ranked relic attributes for this Nightlord (generic)
- Hero-specific recommendations, including:
    - Best attributes
    - Best powerups
    - Best weapons
- User-specific recommendations (if logged in):
    - Best-ranked runes from the user’s inventory for this Nightlord

#### Hero Page
- Best generic weapons
- Best generic relic attributes
- Best generic powerups
- Links to relevant Nightlord pages for deeper optimisations
- User-specific recommendations (if logged in):
    - Best-ranked generic runes from the user’s inventory for this hero

#### Homepage
High-level discovery and conversion page. Sections include:
- Overview of Nightlords and their key weaknesses (prominently displayed)
- Highlighted “best attribute” per Nightlord (generic)
- Top-ranked generic attributes
- Top-ranked generic weapons
- Top-ranked generic powerups
- Clear call-to-action for signup / login

---

## Explicit MVP Boundaries
Out of scope for the MVP:
- Per-patch versioning
- Anti-brigading beyond authentication
- Build simulation or DPS calculation
- Editorial content or guides
- Pro accounts and pro builds