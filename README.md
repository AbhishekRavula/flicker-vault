# FlickerVault - Movie App 🎥

**FlickerVault** is a user-friendly movie application built with **React Native** that fetches movie data from **The Movie Database (TMDB) API**. This app demonstrates the integration of APIs, creation of a seamless UI, state management, and local storage for features like authentication, favorites, and theming preferences.

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Setup and Configuration](#setup-and-configuration)
4. [Running the App](#running-the-app)
5. [Technologies Used](#technologies-used)
6. [Additional Notes](#additional-notes)

---

## Features

1. **Home Screen**: Displays a list of popular movies with their posters.
2. **Details Screen**: Selecting a movie navigates to a detailed view showcasing:
   - Movie poster, title, overview, release date, rating, genres, and an option to mark it as a favorite.
3. **Search Screen**: Users can search for movies and utilize infinite scrolling to load more results as they scroll.
4. **Favorites**: Users can manage their list of favorite movies.
5. **Settings**: Includes:
   - **Theme Toggle**: Switch between dark and light modes.
   - **Language Settings**: Supports English and Malay (Singapore).
6. **Authentication**: Simulated signup and login features using local storage.

---

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/FlickerVault.git
   cd FlickerVault
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set up Git LFS (for APK tracking)**
   ```bash
   git lfs install
   git lfs track "*.apk"
   ```

---

## Setup and Configuration

1. **API Token**: Obtain a TMDB Read Access Token from [TMDB API](https://www.themoviedb.org/documentation/api) and add it to a `.env` file:
   ```env
   TMDB_API_TOKEN=your_api_token_here
   ```
2. **Environment Variables**: Ensure to load the `.env` file before running the app (handled by the dotenv library).

3. **Language Configuration**: Language files are set up in `src/locales/` for English and Malay (Singapore).

---

## Running the App

1. **For Android**:

   ```bash
   npm run android
   ```

2. **For iOS**:

   ```bash
   npm run ios
   ```

3. **To Build APK**:
   ```bash
   cd android
   ./gradlew assembleRelease
   ```
   The APK will be generated in `android/app/build/outputs/apk/release/app-release.apk`.

---

## Technologies Used

- **React Native** (React Native CLI)
- **TypeScript**
- **React Navigation** for screen navigation
- **MMKV** for fast local storage (authentication and favorites)
- **React Query** for efficient data fetching and caching
- **react-native-paper** for UI components and theming
- **i18n** for internationalization (English and Malay)
- **Git LFS** for managing APK files in the repository

---

## Additional Notes

- **Favorites and Authentication** are stored using MMKV, allowing efficient local data storage.
- **Theming**: FlickerVault supports dark and light themes, customizable from the Settings screen.
- **Infinite Scrolling**: Implemented for loading additional movie search results.
