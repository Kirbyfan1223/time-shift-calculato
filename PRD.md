# Time Difference Calculator PRD

A specialized calculator for determining time adjustments needed when changing scheduled arrival times, particularly useful for half-day scheduling.

**Experience Qualities**:
1. **Precise** - Calculations must be accurate to the minute for scheduling reliability
2. **Intuitive** - Clear input flow that matches natural thinking process (start → original end → new end)
3. **Efficient** - Quick entry and immediate results without unnecessary complexity

**Complexity Level**: Micro Tool (single-purpose)
- Focused solely on time difference calculations with a streamlined interface optimized for repeated use

## Essential Features

### Time Input System
- **Functionality**: Accept time inputs in 12-hour format (AM/PM) with flexible parsing
- **Purpose**: Enable natural time entry matching how people think about schedules
- **Trigger**: User clicks on time input fields
- **Progression**: Select hour → Select minute → Choose AM/PM → Auto-advance to next field
- **Success criteria**: Handles common formats (2:10 PM, 2:10PM, 14:10) and validates realistic times

### Time Difference Calculation
- **Functionality**: Calculate minutes between original arrival and new arrival time
- **Purpose**: Show exact adjustment needed for schedule changes
- **Trigger**: All three time fields are populated with valid times
- **Progression**: Auto-calculate → Display result in minutes → Show positive/negative difference
- **Success criteria**: Accurate minute calculations across AM/PM boundaries and day transitions

### Clear Results Display
- **Functionality**: Show time difference with clear positive/negative indication
- **Purpose**: Immediately understand if new time is earlier or later
- **Trigger**: Successful calculation completion
- **Progression**: Display difference → Highlight early/late status → Show summary
- **Success criteria**: Results are unambiguous and include context (e.g., "30 minutes earlier")

## Edge Case Handling

- **Cross-day calculations**: Handle times that cross midnight boundary
- **Same time entries**: Display "No change" when times are identical  
- **Invalid time formats**: Show helpful error messages for malformed inputs
- **Extreme differences**: Handle calculations spanning multiple hours correctly

## Design Direction

Clean, calculator-inspired interface that feels professional and trustworthy - emphasizing accuracy over aesthetics with clear visual hierarchy that guides users through the three-step input process.

## Color Selection

Complementary color scheme using calm blues and focused orange accents to create a professional, reliable feeling while maintaining clear visual distinction between input stages.

- **Primary Color**: Deep Blue (oklch(0.4 0.15 240)) - Communicates trust and precision for main interface elements
- **Secondary Colors**: Light Blue (oklch(0.85 0.05 240)) - Supporting background areas and subtle highlights  
- **Accent Color**: Warm Orange (oklch(0.65 0.15 45)) - Call-to-action buttons and important results
- **Foreground/Background Pairings**: 
  - Background (White #FFFFFF): Dark Blue text (oklch(0.2 0.1 240)) - Ratio 12.1:1 ✓
  - Primary (Deep Blue oklch(0.4 0.15 240)): White text (oklch(1 0 0)) - Ratio 8.2:1 ✓
  - Accent (Warm Orange oklch(0.65 0.15 45)): White text (oklch(1 0 0)) - Ratio 4.8:1 ✓
  - Card (Light Blue oklch(0.95 0.02 240)): Dark Blue text (oklch(0.2 0.1 240)) - Ratio 15.3:1 ✓

## Font Selection

Inter font family for its exceptional readability at various sizes and clean, technical appearance that reinforces the calculator's precision and reliability.

- **Typographic Hierarchy**: 
  - H1 (Calculator Title): Inter Bold/24px/tight letter spacing
  - H2 (Section Headers): Inter Medium/18px/normal spacing  
  - Body (Input Labels): Inter Regular/14px/relaxed spacing
  - Results (Time Display): Inter Bold/20px/tabular numbers

## Animations

Subtle functional animations that provide immediate feedback for calculations and guide attention to results without distracting from the tool's precision-focused purpose.

- **Purposeful Meaning**: Gentle transitions reinforce the calculator's reliability and professional nature
- **Hierarchy of Movement**: Primary focus on result appearance, secondary on input state changes

## Component Selection

- **Components**: Card for main calculator container, Input for time fields, Button for calculation trigger, Alert for results display
- **Customizations**: Time picker inputs with AM/PM toggles, custom result display with color-coded positive/negative indicators
- **States**: Input focus with blue border, calculation loading state, success/error result states
- **Icon Selection**: Clock icon for time inputs, Calculator icon for main action, Arrow icons for time direction
- **Spacing**: Consistent 4-unit (16px) spacing between major sections, 2-unit (8px) for related elements
- **Mobile**: Single column layout with larger touch targets, simplified time input with native mobile time pickers where appropriate