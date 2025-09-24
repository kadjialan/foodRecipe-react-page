# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React recipe management application built with Vite, TypeScript, and Tailwind CSS. It allows users to create, view, edit, and delete recipes with features like search, filtering, and data persistence using localStorage.

## Development Commands

- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## Architecture

### Core Application Structure

- **App.tsx** - Main application component that manages global state and renders the recipe collection interface
- **types/Recipe.ts** - Central Recipe interface definition with all recipe properties (id, name, description, ingredients, instructions, prep/cook times, category, tags, etc.)
- **utils/localStorage.ts** - Data persistence layer using browser localStorage with CRUD operations (getRecipes, addRecipe, updateRecipe, deleteRecipe)

### Component Architecture

All components are located in `src/components/` and follow a modal-based UI pattern:

#### Core Recipe Components
- **RecipeCard.tsx** - Enhanced recipe display card with rating, favorites, sharing, and difficulty indicators
- **RecipeModal.tsx** - Comprehensive form modal for adding/editing recipes with image upload, rating, difficulty, and favorites
- **RecipeDetailModal.tsx** - Rich read-only modal with enhanced recipe details display and star ratings
- **DeleteConfirmModal.tsx** - Confirmation dialog for recipe deletion

#### Utility Components
- **StarRating.tsx** - Interactive 5-star rating component with hover states and click handling
- **ImageUpload.tsx** - Advanced image upload component supporting URL input, drag-and-drop, and base64 conversion
- **ShareModal.tsx** - Social sharing modal with Twitter, Facebook, email, and JSON export options
- **CookingTimer.tsx** - Feature-rich cooking timer with customizable duration, visual progress, and audio notifications

#### Feature Components
- **AdvancedFilters.tsx** - Comprehensive filtering panel with sliders, toggles, and multi-criteria selection
- **ImportExport.tsx** - Recipe data management component for backup, restore, and sharing functionality

#### Component Interactions
- All modals use a consistent backdrop and animation pattern
- Components communicate via callback props (onEdit, onDelete, onShare, onToggleFavorite, etc.)
- Reusable components like StarRating and ImageUpload are designed for composition across multiple contexts

### State Management Pattern

The application uses React's built-in state management with useState and useEffect. The main App component manages:

- Recipe list state (loaded from localStorage on mount)
- Modal visibility states (add, edit, detail, delete modals)
- Search and filter states
- Selected recipe context for modals

### Data Flow

1. Recipes are loaded from localStorage on app initialization
2. All CRUD operations go through localStorage utility functions
3. State updates trigger re-renders and localStorage synchronization
4. Search/filtering is handled via useMemo for performance

### Styling

- Uses Tailwind CSS for all styling
- Follows a modern design system with orange/rose gradient theme
- Responsive design with mobile-first approach
- Uses Lucide React icons throughout the interface

### Key Features

#### Core Recipe Management
- Real-time search across recipe names, descriptions, ingredients, and tags
- Modal-based CRUD operations with comprehensive form validation
- Data persistence using browser localStorage with automatic type conversion
- Statistics dashboard showing total recipes, matching results, and ingredient count

#### Enhanced Recipe Features
- **5-star rating system** with interactive star components
- **3-level difficulty system** (Easy, Medium, Hard) with visual indicators
- **Favorites system** with heart icons and filtering
- **Image upload support** - both URL input and drag-and-drop file upload with base64 conversion
- **Social sharing** - Twitter, Facebook, email, and JSON data export
- **Advanced tagging system** with tag-based filtering

#### Advanced Filtering & Search
- **Advanced filter panel** with multiple criteria:
  - Category and difficulty selection
  - Minimum rating slider (0-5 stars)
  - Maximum prep/cook time sliders
  - Specific serving size filtering
  - Favorites-only toggle
  - Multi-tag selection with visual indicators
- **Real-time filter application** with active filter display
- **Filter state persistence** during session

#### Productivity Tools
- **Cooking Timer** - Customizable timer with visual progress, notifications, and sound alerts
- **Import/Export System** - JSON-based recipe backup and sharing with validation
- **Batch operations** - Import multiple recipes with automatic ID generation and conflict resolution

#### User Experience
- **Responsive design** optimized for desktop, tablet, and mobile
- **Progressive enhancement** with drag-and-drop image uploads
- **Visual feedback** with hover states, transitions, and loading indicators
- **Error handling** with user-friendly messages and recovery options