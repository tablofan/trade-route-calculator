# Trade Route Calculator

A standalone browser tool for calculating Travian trade routes across multiple villages. Designed for **x3 speed** servers running **Travian T4.6**.

## Overview

Players paste their production overview page from Travian, and the tool parses village names and production rates. It then calculates net resource surplus/deficit per village after accounting for celebration costs and troop training costs, showing exactly how much to send per trade route interval.

## File Structure

| File | Purpose |
|------|---------|
| `index.html` | Main application — UI, parsing, calculation logic, styling |
| `troops.js` | Troop data for all 5 playable tribes (Romans, Teutons, Gauls, Egyptians, Huns) |
| `DOCS.md` | This documentation file |

## How It Works

### 1. Paste & Parse

The user navigates to their Travian village overview → Resources → Production tab (`*/village/statistics/resources/production`), selects all, and pastes into the textarea.

The parser:
- Strips Unicode directional markers (`\u202d`, `\u202c`, `\u200e`, `\u200f`, `\u2212`)
- Scans each line for 4+ numbers — takes the last 4 as lumber/clay/iron/crop production
- Extracts the text before those numbers as the village name
- Skips non-data lines (headers, navigation, coordinates, footers) via regex patterns

### 2. Production Tab

Displays raw production per village with per-village configuration:
- **Town Hall level** (1-20)
- **Celebration type** (None / Small / Large — Large requires TH 10+)
- **Active toggle** — disabled villages show 0 in trade routes

### 3. Troops Tab

Per-village troop training configuration. Each village has:
- **5 buildings** × 2 columns each (level + troop type):
  - Barracks (infantry)
  - Great Barracks / GB (same troops as Barracks, 3x resource cost)
  - Stable (cavalry)
  - Great Stable / GS (same troops as Stable, 3x resource cost)
  - Workshop (siege)
- **Infantry Helmet** — applies to Barracks and GB (0% / 10% / 15% / 20%)
- **Cavalry Helmet** — applies to Stable and GS (0% / 10% / 15% / 20%)
- **Artifact** — applies to all buildings (None / 75% / 50%)

### 4. Trade Routes Tab

Final output showing per-send amounts for each village:

```
send = (production - celebration_cost_per_hr) × interval_hours - training_cost_for_interval
```

Positive = surplus to send away. Negative = deficit that needs to be received.

## Game Mechanics

### Celebrations

Celebrations consume resources over their duration. Cost per hour = total cost / duration in hours.

| Type | Lumber | Clay | Iron | Crop | TH Required |
|------|--------|------|------|------|-------------|
| Small | 6,400 | 6,650 | 5,940 | 1,340 | 1+ |
| Large | 29,700 | 33,250 | 32,000 | 6,700 | 10+ |

Durations are pre-calculated for x3 speed at each Town Hall level (stored in `CELEB_DURATION` in index.html). Higher TH levels have shorter durations, increasing resource cost per hour.

### Training Time Formula

```
unit_time = (base_time / server_speed) × tribe_mod × 0.9^(level - 1) / (1 + helmet_bonus) / (1 + alliance_bonus) × artifact_factor
```

Where:
- `base_time` — from `troops.js`, in seconds at 1x speed
- `server_speed` — 3 (hardcoded for x3)
- `tribe_mod` — **0.8** for barracks/stable units of Romans, Teutons, Gauls; **1.0** for Egyptians, Huns, and all workshop (siege) units
- `0.9^(level - 1)` — building level reduction (each level compounds a 10% speed increase)
- `alliance_bonus` — 0 to 0.10 in 0.02 increments (global setting, applied as speed divisor)
- `helmet_bonus` — 0 / 0.10 / 0.15 / 0.20 (per-village, applied as speed divisor)
- `artifact_factor` — 1.0 / 0.75 / 0.50 (per-village, direct time multiplier)

**Verified examples:**

Mercenary (Huns, base=810, tribe_mod=1.0):
| Config | Result |
|--------|--------|
| Lvl 1, no bonus | 4:30 |
| Lvl 20, no bonus | 0:36 |
| Lvl 20, 20% helm + 10% alliance | 0:27 |
| Lvl 20, all + 50% artifact | 0:14 |

Praetorian (Romans, base=2200, tribe_mod=0.8):
| Config | Result |
|--------|--------|
| Lvl 1, no bonus | 9:47 |
| Lvl 20, no bonus | 1:20 |
| Lvl 20, 20% helm + 10% alliance | 1:01 |
| Lvl 20, all + 50% artifact | 0:31 |

Troops trained per interval: `floor(interval_seconds / unit_time)`

Training resource cost: `troops_trained × unit_cost × cost_multiplier`
- Cost multiplier is 1x for normal buildings, 3x for GB/GS

### Helmet Rules

- **Infantry helmet** (3 tiers: 10%/15%/20%) — applies to Barracks and Great Barracks
- **Cavalry helmet** (3 tiers: 10%/15%/20%) — applies to Stable and Great Stable
- **No helmet** for Workshop (siege units)

### Great Barracks / Great Stable

- Train the same troop types as their normal counterparts
- Resource cost is **3x** the normal cost per unit
- Training time uses the GB/GS building level (independent of normal building)
- Can run simultaneously alongside normal Barracks/Stable

### Artifacts

Training time multipliers:
- **None** — 1.0 (no change)
- **75%** — troops train in 75% of normal time
- **50%** — troops train in 50% of normal time

### Alliance Recruitment Bonus

Reduces training time for all buildings in all villages:
- 0%, 2%, 4%, 6%, 8%, or 10%

## Troop Data

Source: `travian.kirilloid.ru` (T4.6 1x speed data), via Ash-Warden project's `troops_t46.json`.

5 playable tribes supported:
- **Romans** — 3 barracks, 3 stable, 2 workshop
- **Teutons** — 4 barracks (incl. Scout), 2 stable, 2 workshop
- **Gauls** — 2 barracks, 4 stable, 2 workshop
- **Egyptians** — 3 barracks, 3 stable, 2 workshop
- **Huns** — 2 barracks, 4 stable, 2 workshop

Settlers and tribe leaders (Senator/Chief/Chieftain/etc.) are excluded as they're not relevant for ongoing trade route calculations.

Each troop entry in `troops.js` contains:
- `name` — display name
- `cost` — `[lumber, clay, iron, crop]` at 1x cost
- `time` — base training time in seconds at 1x speed, level 1 building
- `upkeep` — crop consumption per hour (not currently used in calculations)

## Technical Notes

- Single-page app, no build step — open `index.html` directly in a browser
- All state is in-memory (the `villages` array) — nothing is persisted
- `troops.js` is loaded as a separate `<script>` tag, exposing `TRIBE_LIST` and `TROOPS` globals
- Container max-width is 1400px to accommodate the wide troops table
- Tables use `overflow-x: auto` for horizontal scrolling on small screens
