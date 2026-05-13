---

# ImageGallery

A modern React Native app to browse, like, and view details of images, with authentication and device info features.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Development](#development)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## Features
- Browse a gallery of images fetched via GraphQL
- Like/unlike images (global state with Redux Toolkit)
- View image details
- User authentication (login/registration)
- Device details screen (native integration)

## Project Structure
```
src/
  components/        # Reusable UI components
  graphql/           # Apollo client, queries, types
  hooks/             # Custom React hooks (e.g., usePhotos)
  mappers/           # Data transformation utilities
  native/            # Native modules/interfaces
  screens/           # App screens (Home, ImageDetail, Login, Registration, DeviceDetails)
  theme/             # Theming and styles
  types/             # TypeScript types
  utils/             # Utility functions/constants
```

## Tech Stack
- React Native
- TypeScript
- Apollo Client (GraphQL)
- Redux Toolkit & React Redux
- React Navigation

## Getting Started
1. **Install dependencies**
   ```sh
   npm install
   # or
   yarn install
   ```
2. **Start Metro bundler**
   ```sh
   npm start
   # or
   yarn start
   ```
3. **Run on Android**
   ```sh
   npm run android
   # or
   yarn android
   ```
4. **Run on iOS**
   - Install CocoaPods dependencies (first time or after native deps change):
     ```sh
     bundle install
     bundle exec pod install
     ```
   - Then run:
     ```sh
     npm run ios
     # or
     yarn ios
     ```

## Development
- Edit screens/components in `src/`
- Add GraphQL queries in `src/graphql/queries/`
- Add Redux slices in `src/store/`
- Use Fast Refresh for instant updates

## Troubleshooting
- See the [React Native Troubleshooting Guide](https://reactnative.dev/docs/troubleshooting)
- For environment setup, see [React Native Docs](https://reactnative.dev/docs/environment-setup)

## Contributing
1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---
