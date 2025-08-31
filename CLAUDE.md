# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based nail salon website for Thays Ramos Nail Design. It's a single-page application built with Create React App that showcases nail services, allows booking appointments, and provides multilingual support (Portuguese and English).

## Development Commands

- `npm start` - Start development server (localhost:3000)
- `npm run build` - Create production build
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (irreversible)

## Architecture & Structure

### Core Application Structure
- **App.jsx** - Main application component that orchestrates all sections
- **index.js** - React application entry point
- **data/data.json** - Central data store for all content (services, contact info, gallery)

### Component Organization
```
src/components/
├── navigation.jsx     # Top navigation with language switcher
├── header.jsx         # Hero section
├── services.jsx       # Services showcase
├── gallery.jsx        # Portfolio gallery
├── booking.jsx        # Appointment booking system
├── contact.jsx        # Contact information
├── why.jsx           # Why choose us section
├── register.jsx      # Registration/signup
└── ui/               # Reusable UI components
    ├── calendar/     # Full booking calendar system
    ├── icon.jsx      # Icon component
    └── image.jsx     # Image component
```

### Key Features & Integrations

**Booking System**
- Google Calendar integration for availability checking
- Multi-step booking flow: service selection → calendar → time slots → confirmation
- WhatsApp integration for appointment confirmation
- Location-based pricing (currently supports "ajuda" location)

**Internationalization**
- `providers/language/` - React Context for i18n
- `src/providers/language/i18n/messages.js` - Translation messages
- Default locale: Portuguese ("pt"), supports English ("en")
- Uses translation keys throughout components with `t()` function

**External Services**
- Google Calendar API for booking availability
- EmailJS for contact form submissions
- WhatsApp API for appointment confirmations
- Smooth scrolling navigation

### Data Management
All content is stored in `src/data/data.json` including:
- Service definitions with pricing per location
- Gallery images and portfolio items
- Contact information and social media links
- Booking configuration (allowed days/hours per location)
- Localized content keys

### Styling
- Bootstrap CSS framework (public/css/bootstrap.css)
- Custom styles in public/css/style.css
- Component-specific styles in App.css and index.css
- Custom fonts: Kalam, Lato, Playwrite DK Loopet
- Font Awesome icons

### Calendar System Architecture
The booking calendar is a complex multi-step component:
1. **Service Selection** - Choose from available services
2. **Date Selection** - Calendar view with availability
3. **Time Slot Selection** - Available hourly slots
4. **Confirmation** - Review and WhatsApp booking

**Google Calendar Integration:**
- API Key and Calendar ID configured in `src/components/ui/calendar/index.jsx`
- Fetches events to determine availability
- Respects location-specific working hours from data.json

### Development Notes
- Uses React 17 with functional components and hooks
- No TypeScript - pure JavaScript/JSX
- Create React App configuration with standard ESLint rules
- Service worker disabled by default
- Smooth scrolling implemented globally via smooth-scroll library

### Content Management
To modify content:
1. **Services** - Edit `data.json` Services array
2. **Gallery** - Add images to public/img/portfolio/ and update Gallery array
3. **Contact Info** - Modify Contact object in data.json
4. **Translations** - Update messages.js for new languages/content
5. **Booking Hours** - Modify allowedDays in Booking section

### API Keys & Configuration
The application includes API integrations that require configuration:
- Google Calendar API key (currently hardcoded)
- EmailJS configuration for contact forms
- WhatsApp business number for booking confirmations

When working with this codebase, always maintain the existing component patterns and respect the internationalization system by using translation keys rather than hardcoded text.