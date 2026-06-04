<<<<<<< HEAD
# DESIGN-SYSTEM.md

# BookConnect Design System

# Design Philosophy

BookConnect menggunakan style modern SaaS onboarding dengan tampilan:

* Clean
* Professional
* Minimal
* Soft enterprise aesthetic
* High readability
* Lightweight interaction

---

# Visual Direction

Inspirasi visual:

* Stripe
* Slack
* Notion
* Linear
* HubSpot
* ClickUp

---

# Typography

## Primary Font

```css
font-family: 'Poppins', sans-serif;
```

---

# Color System

# Primary Color

```css
#01629B
```

Used for:

* Primary buttons
* Active state
* Focus state
* Links
* Progress indicator

---

# Primary Hover

```css
#014d7a
```

---

# Background Colors

## Main Background

```css
#f0f4f8
```

## Soft Background

```css
#f8fafc
```

## Card Background

```css
#ffffff
```

---

# Text Colors

## Main Text

```css
#0f172a
```

## Secondary Text

```css
#64748b
```

## Muted Text

```css
#94a3b8
```

---

# Border Colors

## Default Border

```css
#e2e8f0
```

## Focus Border

```css
#01629B
```

---

# Radius System

## Small Radius

```css
8px
```

## Default Radius

```css
10px
```

## Large Radius

```css
16px
```

## Pill Radius

```css
20px
```

---

# Shadow System

## Main Layout Shadow

```css
box-shadow: 0 20px 50px rgba(0,0,0,0.1);
```

---

## Button Shadow

```css
box-shadow: 0 2px 8px rgba(1, 98, 155, 0.15);
```

---

# Layout System

# Main Page Layout

## Desktop

```plaintext
| Left Branding | Right Form |
```

---

## Mobile

```plaintext
| Single Column |
```

---

# Left Section

## Characteristics

* Sticky layout
* Decorative background
* Branding area
* Intro content
* Workspace statistics

---

## Decorative Elements

Using soft circular blur shapes:

```css
rgba(1, 98, 155, 0.08)
```

---

# Right Section

## Characteristics

* White workspace
* Scrollable content
* Form-focused layout
* Compact spacing

---

# Form System

# Input Design

## Characteristics

* Rounded corners
* Soft gray background
* Blue focus state
* Smooth transition

---

## Input Height

```css
46px
```

---

## Input Focus

```css
box-shadow: 0 0 0 3px rgba(1, 98, 155, 0.1);
```

---

# Select Design

Select components must visually match text inputs:

* Same height
* Same border
* Same spacing
* Same focus state

---

# Button System

# Primary Button

## Characteristics

* Solid blue background
* White text
* Rounded corners
* Medium shadow
* Smooth hover animation

---

# Secondary Button

## Characteristics

* White background
* Gray text
* Light border
* Minimal style

---

# Step Indicator

## Characteristics

* Small animated dots
* Active blue state
* Smooth transition

---

# Animation System

# Transition Duration

```css
0.15s – 0.2s
```

---

# Fade Animation

```css
@keyframes fadeIn
```

Used for:

* Step transition
* Notification appearance
* Dynamic content

---

# Language Switcher

## Style

* Small pill buttons
* Minimalist
* Blue active state

---

# Responsive Rules

# Desktop (>900px)

* Two-column onboarding
* Sticky left panel
* Spacious layout

---

# Tablet

* Adaptive spacing
* Flexible grid layout

---

# Mobile (<900px)

* Single column
* Vertical form layout
* Simplified spacing

---

# Dashboard Style

# Dashboard Characteristics

* Card-based layout
* Minimal sidebar
* Soft shadows
* Spacious content
* Clean navigation

---

# UI Components

## Required Components

* Inputs
* Selects
* Buttons
* Cards
* Sidebar
* Navbar
* Progress Indicator
* Language Switcher
* Notification Box
* Dynamic List Item

---

# UX Principles

UI harus terasa:

* Professional
* Trustworthy
* Modern
* Easy to use
* Enterprise-ready
* Consistent
* Beginner-friendly

---

# Frontend Restrictions

## Allowed

* HTML
* CSS
* Vanilla JavaScript

---

## Not Allowed

* Bootstrap
* Tailwind
* React
* Vue
* Backend integration
* Database
* API integration
=======
# DESIGN-SYSTEM.md

# BookConnect Design System

# Design Philosophy

BookConnect menggunakan style modern SaaS onboarding dengan tampilan:

* Clean
* Professional
* Minimal
* Soft enterprise aesthetic
* High readability
* Lightweight interaction

---

# Visual Direction

Inspirasi visual:

* Stripe
* Slack
* Notion
* Linear
* HubSpot
* ClickUp

---

# Typography

## Primary Font

```css
font-family: 'Poppins', sans-serif;
```

---

# Color System

# Primary Color

```css
#01629B
```

Used for:

* Primary buttons
* Active state
* Focus state
* Links
* Progress indicator

---

# Primary Hover

```css
#014d7a
```

---

# Background Colors

## Main Background

```css
#f0f4f8
```

## Soft Background

```css
#f8fafc
```

## Card Background

```css
#ffffff
```

---

# Text Colors

## Main Text

```css
#0f172a
```

## Secondary Text

```css
#64748b
```

## Muted Text

```css
#94a3b8
```

---

# Border Colors

## Default Border

```css
#e2e8f0
```

## Focus Border

```css
#01629B
```

---

# Radius System

## Small Radius

```css
8px
```

## Default Radius

```css
10px
```

## Large Radius

```css
16px
```

## Pill Radius

```css
20px
```

---

# Shadow System

## Main Layout Shadow

```css
box-shadow: 0 20px 50px rgba(0,0,0,0.1);
```

---

## Button Shadow

```css
box-shadow: 0 2px 8px rgba(1, 98, 155, 0.15);
```

---

# Layout System

# Main Page Layout

## Desktop

```plaintext
| Left Branding | Right Form |
```

---

## Mobile

```plaintext
| Single Column |
```

---

# Left Section

## Characteristics

* Sticky layout
* Decorative background
* Branding area
* Intro content
* Workspace statistics

---

## Decorative Elements

Using soft circular blur shapes:

```css
rgba(1, 98, 155, 0.08)
```

---

# Right Section

## Characteristics

* White workspace
* Scrollable content
* Form-focused layout
* Compact spacing

---

# Form System

# Input Design

## Characteristics

* Rounded corners
* Soft gray background
* Blue focus state
* Smooth transition

---

## Input Height

```css
46px
```

---

## Input Focus

```css
box-shadow: 0 0 0 3px rgba(1, 98, 155, 0.1);
```

---

# Select Design

Select components must visually match text inputs:

* Same height
* Same border
* Same spacing
* Same focus state

---

# Button System

# Primary Button

## Characteristics

* Solid blue background
* White text
* Rounded corners
* Medium shadow
* Smooth hover animation

---

# Secondary Button

## Characteristics

* White background
* Gray text
* Light border
* Minimal style

---

# Step Indicator

## Characteristics

* Small animated dots
* Active blue state
* Smooth transition

---

# Animation System

# Transition Duration

```css
0.15s – 0.2s
```

---

# Fade Animation

```css
@keyframes fadeIn
```

Used for:

* Step transition
* Notification appearance
* Dynamic content

---

# Language Switcher

## Style

* Small pill buttons
* Minimalist
* Blue active state

---

# Responsive Rules

# Desktop (>900px)

* Two-column onboarding
* Sticky left panel
* Spacious layout

---

# Tablet

* Adaptive spacing
* Flexible grid layout

---

# Mobile (<900px)

* Single column
* Vertical form layout
* Simplified spacing

---

# Dashboard Style

# Dashboard Characteristics

* Card-based layout
* Minimal sidebar
* Soft shadows
* Spacious content
* Clean navigation

---

# UI Components

## Required Components

* Inputs
* Selects
* Buttons
* Cards
* Sidebar
* Navbar
* Progress Indicator
* Language Switcher
* Notification Box
* Dynamic List Item

---

# UX Principles

UI harus terasa:

* Professional
* Trustworthy
* Modern
* Easy to use
* Enterprise-ready
* Consistent
* Beginner-friendly

---

# Frontend Restrictions

## Allowed

* HTML
* CSS
* Vanilla JavaScript

---

## Not Allowed

* Bootstrap
* Tailwind
* React
* Vue
* Backend integration
* Database
* API integration
>>>>>>> 2fd0ac2 (first commit)
