# Design Document - Booking Page Feature

## Overview

The Booking Page feature enables users to create and customize public-facing booking pages for their workspace. The interface follows a split-screen design pattern with a live preview panel on the left and a customization panel on the right. Users can modify the page title, description, and images while seeing real-time updates in the preview. The booking page displays a calendar widget that allows clients to view available time slots and schedule appointments. The feature integrates seamlessly with the existing BookConnect component architecture and design system.

## Architecture

### High-Level Architecture

The Booking Page feature follows a client-side MVC-like pattern:

```
┌─────────────────────────────────────────────────────────┐
│                    Booking Page UI                       │
│  ┌──────────────────┐      ┌──────────────────────┐    │
│  │  Live Preview    │      │  Customize Panel     │    │
│  │  - Page Title    │      │  - Title Input       │    │
│  │  - Description   │      │  - Description Editor│    │
│  │  - Calendar      │      │  - Image Upload      │    │
│  │  - Images        │      │  - Preview Button    │    │
│  │                  │      │  - Share Link Button │    │
│  └──────────────────┘      └──────────────────────┘    │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│              BookingPageController.js                    │
│  - handleTitleChange()                                   │
│  - handleDescriptionChange()                             │
│  - handleImageUpload()                                   │
│  - handlePreview()                                       │
│  - handleShareLink()                                     │
│  - updateLivePreview()                                   │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                BookingPageService.js                     │
│  - saveBookingPage(data)                                 │
│  - loadBookingPage(workspaceId)                          │
│  - generatePublicUrl(workspaceId)                        │
│  - uploadImage(file)                                     │
│  - validateInput(data)                                   │
└─────────────────────────────────────────────────────────┐
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                  LocalStorage / API                      │
│  - bookingPages: { workspaceId: {...} }                  │
└─────────────────────────────────────────────────────────┘
```

### Component Integration

The Booking Page integrates with existing BookConnect components:
- **Sidebar Component** (`js/components/sidebar.js`): Navigation with "Booking Page" menu item
- **Topbar Component** (`js/components/topbar.js`): Page header with breadcrumb
- **Design System** (`css/dashboard.css`): Consistent blue theme and styling

## Components and Interfaces

### 1. BookingPageController

**Responsibility**: Manages user interactions and coordinates between UI and service layer

```javascript
class BookingPageController {
  constructor() {
    this.currentWorkspace = null;
    this.bookingPageData = {};
  }

  // Initialize the booking page editor
  init(workspaceId)

  // Handle title input changes
  handleTitleChange(newTitle)

  // Handle description input changes  
  handleDescriptionChange(newDescription)

  // Handle image file upload
  handleImageUpload(file)

  // Handle calendar month navigation
  handleMonthChange(direction)

  // Handle date selection
  handleDateSelect(date)

  // Open preview in new tab
  handlePreview()

  // Generate and copy share link
  handleShareLink()

  // Update live preview panel
  updateLivePreview()
}
```

### 2. BookingPageService

**Responsibility**: Business logic and data persistence

```javascript
class BookingPageService {
  // Save booking page configuration
  saveBookingPage(workspaceId, data)

  // Load booking page configuration
  loadBookingPage(workspaceId)

  // Generate unique public URL
  generatePublicUrl(workspaceId)

  // Upload and store image
  uploadImage(file)

  // Validate user inputs
  validateInput(field, value)

  // Sanitize HTML content
  sanitizeHtml(content)
}
```

### 3. CalendarWidget

**Responsibility**: Display and manage calendar interactions

```javascript
class CalendarWidget {
  constructor(containerId) {
    this.currentMonth = new Date();
    this.selectedDate = null;
  }

  // Render calendar for current month
  render()

  // Navigate to previous month
  previousMonth()

  // Navigate to next month
  nextMonth()

  // Handle date selection
  selectDate(date)

  // Get available schedules for date
  getSchedulesForDate(date)
}
```

### 4. UI Components

**booking-page.html Structure**:
```html
<div class="booking-page-container">
  <aside id="app-sidebar" data-page="booking-page"></aside>
  
  <main class="main-content">
    <div id="app-topbar" data-title="Booking Settings"></div>
    
    <div class="booking-editor">
      <!-- Live Preview Panel -->
      <div class="preview-panel">
        <div class="preview-header">Live Preview</div>
        <div class="preview-content">
          <h1 id="preview-title"></h1>
          <p id="preview-description"></p>
          <div id="preview-images"></div>
          <div id="preview-calendar"></div>
        </div>
      </div>
      
      <!-- Customize Panel -->
      <div class="customize-panel">
        <div class="customize-header">
          <svg>...</svg>
          Customize
        </div>
        
        <div class="customize-section">
          <label>Page Title</label>
          <input type="text" id="page-title-input" />
        </div>
        
        <div class="customize-section">
          <label>Page Description</label>
          <div class="editor-toolbar">...</div>
          <textarea id="page-description-input"></textarea>
        </div>
        
        <div class="customize-section">
          <label>Images</label>
          <button id="upload-image-btn">Upload New Image</button>
          <input type="file" id="image-file-input" hidden />
        </div>
        
        <div class="customize-actions">
          <button id="preview-btn">Preview</button>
          <button id="share-link-btn">Share Link</button>
        </div>
      </div>
    </div>
  </main>
</div>
```

## Data Models

### BookingPage

```javascript
{
  workspaceId: string,          // Unique workspace identifier
  pageTitle: string,            // Max 100 characters
  pageDescription: string,      // Max 500 characters, HTML allowed
  images: [                     // Array of image objects
    {
      id: string,
      url: string,
      filename: string,
      uploadedAt: timestamp
    }
  ],
  publicUrl: string,            // Generated unique URL
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### CalendarData

```javascript
{
  currentMonth: Date,
  selectedDate: Date | null,
  schedules: {
    [dateString]: [            // e.g., "2026-05-15"
      {
        time: string,          // e.g., "09:00"
        available: boolean,
        duration: number       // minutes
      }
    ]
  }
}
```

## Correctne
ss Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Real-time preview synchronization

*For any* text input to the Page Title or Page Description fields, the Live Preview SHALL update to display the exact same content immediately
**Validates: Requirements 2.1, 2.2**

### Property 2: Formatting preservation

*For any* text formatting operation applied to the Page Description, the Live Preview SHALL reflect the same formatting
**Validates: Requirements 2.4**

### Property 3: Data persistence

*For any* customization change (title, description, or image), the system SHALL persist the change to storage immediately
**Validates: Requirements 2.5**

### Property 4: File type validation

*For any* file selected for upload, the system SHALL accept the file if and only if it is a valid image format (JPG, PNG, or GIF), and SHALL display an error message for invalid file types
**Validates: Requirements 3.2, 3.4**

### Property 5: Image display after upload

*For any* valid image file successfully uploaded, the Live Preview SHALL display the uploaded image
**Validates: Requirements 3.3**

### Property 6: Calendar month navigation

*For any* calendar state, clicking the previous or next month arrow SHALL navigate to the adjacent month in the correct direction
**Validates: Requirements 4.2, 4.3**

### Property 7: Date selection displays schedules

*For any* date selected in the calendar, the system SHALL display the available time slots for that specific date
**Validates: Requirements 4.4**

### Property 8: Preview content completeness

*For any* set of customizations (title, description, images), the preview SHALL include all customizations exactly as they were configured
**Validates: Requirements 5.2, 5.3**

### Property 9: Unique URL generation

*For any* workspace, the system SHALL generate a unique public URL that is different from all other workspace URLs
**Validates: Requirements 6.1, 6.4**

### Property 10: Keyboard accessibility

*For any* interactive element on the booking page, the element SHALL be accessible and operable via keyboard navigation
**Validates: Requirements 7.5**

### Property 11: XSS prevention

*For any* text input containing potentially malicious HTML or JavaScript, the system SHALL sanitize the input to prevent XSS attacks
**Validates: Requirements 8.1**

### Property 12: File size validation

*For any* file uploaded, the system SHALL reject files larger than 5MB and accept files 5MB or smaller
**Validates: Requirements 8.2**

## Error Handling

### Input Validation Errors

**Title Length Exceeded**:
- **Trigger**: User enters more than 100 characters in Page Title
- **Response**: Prevent additional input or truncate at 100 characters
- **User Feedback**: Display character count indicator (e.g., "95/100")

**Description Length Exceeded**:
- **Trigger**: User enters more than 500 characters in Page Description
- **Response**: Prevent additional input or truncate at 500 characters
- **User Feedback**: Display character count indicator (e.g., "485/500")

**Invalid File Type**:
- **Trigger**: User selects non-image file for upload
- **Response**: Reject upload, do not modify current state
- **User Feedback**: Display error message "Please select a valid image file (JPG, PNG, or GIF)"

**File Size Exceeded**:
- **Trigger**: User selects image file larger than 5MB
- **Response**: Reject upload, do not modify current state
- **User Feedback**: Display error message "File size must be 5MB or less"

### System Errors

**Storage Failure**:
- **Trigger**: LocalStorage quota exceeded or unavailable
- **Response**: Display error, allow user to continue editing (in-memory only)
- **User Feedback**: "Unable to save changes. Please try again or contact support."

**Image Upload Failure**:
- **Trigger**: Network error or storage error during image upload
- **Response**: Revert to previous state, do not show broken image
- **User Feedback**: "Image upload failed. Please try again."

**Calendar Load Failure**:
- **Trigger**: Unable to load schedule data
- **Response**: Display calendar with no available slots
- **User Feedback**: "Unable to load schedules. Please refresh the page."

### Recovery Strategies

1. **Auto-save**: Implement debounced auto-save (500ms delay) to persist changes without explicit save button
2. **Optimistic UI**: Update UI immediately, rollback on error
3. **Graceful Degradation**: If calendar fails to load, still allow page customization
4. **Error Boundaries**: Isolate errors to prevent full page crashes

## Testing Strategy

### Unit Testing

The Booking Page feature will use **Jest** as the testing framework for unit tests.

**Unit Test Coverage**:

1. **BookingPageService Tests**:
   - Test `validateInput()` with valid and invalid inputs
   - Test `sanitizeHtml()` with malicious and safe HTML
   - Test `generatePublicUrl()` returns properly formatted URLs
   - Test `saveBookingPage()` and `loadBookingPage()` with LocalStorage

2. **CalendarWidget Tests**:
   - Test `render()` displays correct month and year
   - Test `previousMonth()` and `nextMonth()` change month correctly
   - Test `selectDate()` updates selected date state
   - Test edge cases: leap years, month boundaries

3. **BookingPageController Tests**:
   - Test `handleTitleChange()` updates preview
   - Test `handleImageUpload()` with valid and invalid files
   - Test `handleShareLink()` generates and copies URL

4. **Integration Tests**:
   - Test complete flow: load page → customize → preview → share
   - Test data persistence across page reloads
   - Test responsive layout at different viewport sizes

### Property-Based Testing

The Booking Page feature will use **fast-check** as the property-based testing library for JavaScript.

**Property-Based Test Configuration**:
- Each property test MUST run a minimum of 100 iterations
- Each property test MUST be tagged with a comment referencing the correctness property from this design document
- Tag format: `// Feature: booking-page, Property {number}: {property_text}`
- Each correctness property MUST be implemented by a SINGLE property-based test

**Property Test Coverage**:

1. **Property 1 Test**: Real-time preview synchronization
   - Generate random strings for title and description
   - Verify preview content matches input exactly

2. **Property 2 Test**: Formatting preservation
   - Generate random formatting operations (bold, italic, etc.)
   - Verify preview HTML contains correct formatting tags

3. **Property 3 Test**: Data persistence
   - Generate random booking page configurations
   - Verify all changes are saved to storage

4. **Property 4 Test**: File type validation
   - Generate random file types (valid and invalid)
   - Verify only valid image formats are accepted

5. **Property 5 Test**: Image display after upload
   - Generate random valid image files
   - Verify images appear in preview

6. **Property 6 Test**: Calendar month navigation
   - Generate random starting months
   - Verify navigation moves to correct adjacent month

7. **Property 7 Test**: Date selection displays schedules
   - Generate random dates
   - Verify schedules are displayed for selected date

8. **Property 8 Test**: Preview content completeness
   - Generate random combinations of customizations
   - Verify all customizations appear in preview

9. **Property 9 Test**: Unique URL generation
   - Generate multiple workspace IDs
   - Verify all generated URLs are unique

10. **Property 10 Test**: Keyboard accessibility
    - Generate random sequences of keyboard inputs
    - Verify all interactive elements can be accessed

11. **Property 11 Test**: XSS prevention
    - Generate random strings with malicious HTML/JS
    - Verify all malicious content is sanitized

12. **Property 12 Test**: File size validation
    - Generate random file sizes
    - Verify files over 5MB are rejected

### Test Execution Strategy

1. **Development**: Run unit tests on file save
2. **Pre-commit**: Run all unit tests and property tests
3. **CI/CD**: Run full test suite including integration tests
4. **Coverage Target**: Aim for 80%+ code coverage

## Implementation Notes

### Technology Stack

- **HTML5**: Semantic markup for booking page structure
- **CSS3**: Responsive design with existing BookConnect theme
- **Vanilla JavaScript**: No framework dependencies for simplicity
- **LocalStorage**: Client-side data persistence (can be upgraded to API later)
- **File API**: Handle image uploads

### Browser Compatibility

- **Target**: Modern browsers (Chrome, Firefox, Safari, Edge)
- **Minimum**: ES6 support required
- **Polyfills**: None required for target browsers

### Performance Considerations

1. **Debouncing**: Debounce text input handlers (500ms) to reduce update frequency
2. **Image Optimization**: Compress uploaded images before storage
3. **Lazy Loading**: Load calendar schedules only when date is selected
4. **Memory Management**: Limit stored images to 10 per workspace

### Security Considerations

1. **XSS Prevention**: Sanitize all user inputs using DOMPurify library
2. **File Validation**: Validate file type and size on client-side (server-side validation recommended for production)
3. **URL Generation**: Use cryptographically secure random strings for public URLs
4. **Content Security Policy**: Implement CSP headers to prevent inline script execution

### Accessibility Considerations

1. **ARIA Labels**: Add appropriate ARIA labels to all interactive elements
2. **Keyboard Navigation**: Ensure tab order is logical and all actions are keyboard-accessible
3. **Screen Reader Support**: Provide descriptive text for images and icons
4. **Color Contrast**: Maintain WCAG AA contrast ratios (existing theme complies)
5. **Focus Indicators**: Visible focus indicators for all interactive elements

### Future Enhancements

1. **Rich Text Editor**: Replace textarea with full WYSIWYG editor
2. **Multiple Images**: Support image gallery with carousel
3. **Custom Branding**: Allow custom colors and fonts
4. **Analytics**: Track booking page views and conversions
5. **A/B Testing**: Test different page layouts and content
6. **API Integration**: Replace LocalStorage with backend API
7. **Email Notifications**: Send confirmation emails for bookings
8. **Payment Integration**: Add payment processing for paid services
