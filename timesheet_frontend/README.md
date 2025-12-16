# Timesheet Tracker

A modern, feature-rich timesheet tracking application built with React. Track your work hours with a beautiful Ocean Professional themed interface.

## Features

- **Modern UI**: Clean, professional design with Ocean Professional color scheme
- **Theme Support**: Toggle between light and dark modes
- **Form Validation**: Comprehensive client-side validation for all inputs
- **CRUD Operations**: Create, read, update, and delete timesheet entries
- **Local Storage**: Automatic persistence of entries and theme preference
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Accessibility**: ARIA labels and keyboard-friendly navigation

## Project Structure

```
src/
├── components/
│   ├── Header.js              # Application header with theme toggle
│   ├── Header.css            # Header component styles
│   ├── TimesheetForm.js      # Form for adding entries
│   ├── TimesheetForm.css     # Form component styles
│   ├── TimesheetTable.js     # Table displaying entries with edit/delete
│   └── TimesheetTable.css    # Table component styles
├── App.js                    # Main application component
├── App.css                   # Global styles and theme variables
├── index.js                  # Application entry point
└── index.css                 # Base styles

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

```bash
npm install
```

### Development

Run the app in development mode:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Testing

Launch the test runner:

```bash
npm test
```

### Production Build

Build the app for production:

```bash
npm run build
```

## Usage

### Adding Entries

1. Fill in the required fields in the form:
   - **Date**: Select the date for the work
   - **Project**: Enter the project name
   - **Task**: Describe the task performed
   - **Hours**: Enter hours worked (0.5 increments, max 24)
   - **Description**: (Optional) Add additional details

2. Click "Add Entry" to save

### Managing Entries

- **Edit**: Click the ✎ icon to edit an entry
- **Delete**: Click the 🗑 icon to delete an entry (with confirmation)
- **Total Hours**: View total hours worked across all entries

### Theme Toggle

Click the theme button in the header to switch between light and dark modes. Your preference is automatically saved.

## Data Persistence

All timesheet entries and theme preferences are automatically saved to browser localStorage. Your data persists across browser sessions.

## Validation Rules

- **Date**: Required, cannot be in the future
- **Project**: Required, must not be empty
- **Task**: Required, must not be empty
- **Hours**: Required, must be positive number, maximum 24 hours
- **Description**: Optional

## Ocean Professional Theme

The application uses a carefully crafted color palette:

- **Primary**: Blue (#2563EB) - Headers, buttons, accents
- **Secondary**: Amber (#F59E0B) - Highlights, success states
- **Background**: Light gray (#f9fafb) / Dark (#111827)
- **Surface**: White (#ffffff) / Dark gray (#1f2937)
- **Text**: Dark gray (#111827) / Light (#F9FAFB)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Technologies Used

- **React 18.2.0**: UI framework
- **CSS3**: Styling with CSS variables for theming
- **localStorage API**: Data persistence
- **Modern JavaScript (ES6+)**: Clean, maintainable code

## Accessibility Features

- Semantic HTML5 elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus indicators for keyboard users
- Responsive form validation feedback

## Performance Optimizations

- Efficient React state management
- CSS transitions for smooth animations
- Optimized re-renders with proper React hooks
- Minimal external dependencies

## Learn More

To learn more about React, check out the [React documentation](https://reactjs.org/).

## License

This project is part of the KAVIA AI platform.
```
