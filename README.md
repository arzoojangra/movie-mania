# 🎬 Movie Mania

A modern, responsive movie discovery application built with React and Vite, featuring infinite scrolling, search functionality, and detailed movie information. Discover your next favorite movie with an intuitive and beautiful user interface.

![Movie Mania](https://img.shields.io/badge/React-18.0.0-blue) ![Vite](https://img.shields.io/badge/Vite-5.0.0-purple) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0.0-cyan)

## ✨ Features

### 🎯 Core Functionality
- **Movie Discovery**: Browse popular movies with infinite scrolling
- **Smart Search**: Real-time search with debounced input
- **Trending Movies**: View top trending movies from your Appwrite database
- **Movie Details**: Comprehensive movie information in modal view
- **Responsive Design**: Mobile-first design that works on all devices

### 🚀 Advanced Features
- **Infinite Scrolling**: Seamlessly load more movies as you scroll
- **Modal Overlay**: Detailed movie information without page navigation
- **Click Outside to Close**: Intuitive modal interaction
- **Keyboard Navigation**: Close modals with Escape key
- **Scroll Lock**: Prevents background scrolling when modal is open
- **Performance Optimized**: Efficient rendering with CSS containment

### 🎨 User Experience
- **Modern UI**: Clean, minimalist design with smooth animations
- **Hover Effects**: Interactive movie cards with elevation on hover
- **Loading States**: Spinner indicators for better user feedback
- **Error Handling**: Graceful error messages and fallbacks
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **CSS Modules** - Scoped styling with custom CSS variables

### APIs & Services
- **TMDB API** - The Movie Database for movie data
- **Appwrite** - Backend-as-a-Service for trending movies and search analytics

### Development Tools
- **ESLint** - Code quality and consistency
- **React Hooks** - useState, useEffect
- **Custom Hooks** - useDebounce from react-use package for search optimization

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- TMDB API key
- Appwrite instance (optional, for trending movies)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/movie-mania.git
   cd movie-mania
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Configuration

### TMDB API Setup
1. Visit [TMDB](https://www.themoviedb.org/settings/api)
2. Create an account and request an API key
3. Add your API key to the `.env` file

### Appwrite Setup (Optional)
1. Set up an Appwrite instance
2. Configure your database for trending movies
3. Update the `appwrite.js` configuration file

## 📱 Usage

### Browsing Movies
- Scroll through the main movie grid
- Movies automatically load as you reach the bottom
- Click any movie card to view details

### Searching Movies
- Use the search bar at the top of the page
- Results update in real-time as you type
- Search is debounced for optimal performance

### Movie Details
- Click on any movie card to open the detail modal
- View comprehensive information including:
  - Movie poster and title
  - Rating and vote count
  - Release date and language
  - Full overview
- Close modal by:
  - Clicking the × button
  - Clicking outside the modal
  - Pressing the Escape key

## 🏗️ Project Structure

```
movie-mania/
├── public/                 # Static assets
│   ├── hero-bg.png        # Hero background
│   ├── hero.png           # Hero image
│   ├── logo.png           # App logo
│   ├── no-movie.png       # Fallback movie poster
│   ├── search.svg         # Search icon
│   └── star.svg           # Rating star icon
├── src/
│   ├── components/        # React components
│   │   ├── MovieCard.jsx  # Individual movie card
│   │   ├── MovieDetail.jsx # Movie detail modal
│   │   ├── Search.jsx     # Search input component
│   │   └── Spinner.jsx    # Loading spinner
│   ├── Home.jsx           # Main page component
│   ├── App.jsx            # Root app component
│   ├── appwrite.js        # Appwrite configuration
│   ├── index.css          # Global styles and Tailwind
│   └── main.jsx           # Application entry point
├── .env                   # Environment variables
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
└── README.md              # This file
```

## 🎨 Styling

### Design System
- **Color Palette**: Dark theme with purple accents
- **Typography**: DM Sans for body text, Bebas Neue for accents
- **Spacing**: Consistent spacing using Tailwind's spacing scale
- **Animations**: Smooth transitions and hover effects

### CSS Architecture
- **TailwindCSS**: Utility-first approach for rapid development
- **Custom CSS Variables**: Consistent theming and easy customization
- **Component Scoping**: Scoped styles for component-specific styling
- **Responsive Design**: Mobile-first approach with breakpoint utilities

## 🔍 API Integration

### TMDB API Endpoints
- **Movie Discovery**: `/discover/movie` for popular movies
- **Movie Search**: `/search/movie` for search functionality
- **Pagination**: Support for multiple pages with infinite scrolling

### Data Structure
```javascript
{
  id: number,
  title: string,
  poster_path: string,
  release_date: string,
  vote_average: number,
  vote_count: number,
  original_language: string,
  overview: string
}
```

## 🚀 Performance Features

### Optimization Techniques
- **Infinite Scrolling**: Load movies on-demand
- **Debounced Search**: Reduce API calls during typing
- **Intersection Observer**: Efficient scroll detection
- **CSS Containment**: Optimize rendering performance
- **Lazy Loading**: Images load as they come into view

### Bundle Optimization
- **Vite**: Fast development and optimized builds
- **Tree Shaking**: Remove unused code
- **Code Splitting**: Efficient chunk loading

## 🧪 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Quality
- ESLint configuration for consistent code style
- React best practices and hooks usage
- Component composition and reusability
- Proper error handling and loading states

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow React best practices
- Use functional components with hooks
- Maintain consistent code style
- Add proper error handling
- Test on multiple devices and browsers

## 🙏 Acknowledgments

- **TMDB** for providing the movie database API
- **Appwrite** for backend services
- **TailwindCSS** for the utility-first CSS framework
- **Vite** for the fast build tool
- **React** team for the amazing framework

## 📞 Support

If you have any questions or need help:
- Open an issue on GitHub
- Check the documentation
- Review the code examples

---

**Made with ❤️ by Arzoo Jangra**

*Discover your next favorite movie with Movie Mania! 🎬✨*
