# 75 Challenge App 🎯

A comprehensive React Native app designed to help users complete the 75 Hard Challenge - a transformative 75-day mental toughness program. Track your daily habits, monitor progress, and stay committed to your personal development journey.

![React Native](https://img.shields.io/badge/React%20Native-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

## 🌟 Features

### 📅 **Challenge Tracking**
- **75-Day Journey**: Complete challenge tracking with daily progress
- **Visual Calendar**: Interactive calendar with challenge day indicators
- **Progress Statistics**: Real-time progress percentage and completion metrics
- **Streak Counter**: Track consecutive days and maintain momentum

### 📋 **Habit Management**
- **Custom Habits**: Create and configure personalized daily habits
- **Daily Checklist**: Mark habits as complete with intuitive UI
- **Habit Icons**: Visual icons for easy habit identification
- **Progress Sync**: Automatic day completion based on habit completion

### 👤 **User Profile**
- **Profile Management**: Complete user profile with image support
- **Settings Pages**: Comprehensive settings for notifications, privacy, and more
- **Image Picker**: Camera and gallery integration for profile pictures
- **Personal Stats**: View your challenge history and achievements

### 🔔 **Smart Notifications**
- **Daily Reminders**: Customizable notification settings
- **Challenge Alerts**: Progress updates and milestone notifications
- **Quiet Hours**: Respect user's preferred notification times
- **Habit Reminders**: Individual habit completion reminders

### 🎨 **User Experience**
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Responsive Design**: Optimized for all screen sizes
- **Accessibility**: Full accessibility support for all users

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (Mac) or Android Emulator

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/75-challenge-app.git
   cd 75-challenge-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app for physical device

## 📱 Screenshots

| Home Screen | Challenge Calendar | Habits Configuration |
|-------------|-------------------|---------------------|
| 🏠 Daily overview with progress | 📅 Interactive challenge calendar | ⚙️ Customize your daily habits |

| Profile Settings | Notifications | Challenge Modal |
|-----------------|---------------|-----------------|
| 👤 Manage profile and settings | 🔔 Configure notifications | 🎯 Start/manage challenge |

<!-- ## 🏗️ Project Structure

```
75-challenge-app/
├── app/                     # Main application screens
│   ├── (tabs)/             # Tab-based navigation
│   │   ├── index.tsx       # Home/Challenge screen
│   │   ├── explore.tsx     # Explore features
│   │   ├── habitsconfig.tsx # Habit configuration
│   │   └── profile.tsx     # User profile
│   ├── settings/           # Settings pages
│   │   ├── edit-profile.tsx
│   │   ├── notifications.tsx
│   │   ├── privacy.tsx
│   │   └── about.tsx
│   ├── _layout.tsx         # Root layout
│   └── modal.tsx          # Modal screens
├── components/             # Reusable components
│   ├── ui/                # UI components
│   ├── challenge-modal.tsx
│   ├── month-selector-modal.tsx
│   ├── day-circle.tsx
│   ├── habit-item.tsx
│   └── themed-*.tsx       # Themed components
├── contexts/              # React Context providers
│   ├── ChallengeContext.tsx
│   ├── HabitsContext.tsx
│   └── UserContext.tsx
├── utils/                 # Utility functions
│   ├── calendar.ts        # Calendar utilities
│   ├── image-picker.ts    # Image picker utilities
│   └── index.ts          # Utils barrel exports
├── constants/             # App constants
│   └── theme.ts          # Theme configuration
├── docs/                  # Documentation
│   ├── database-schema.md
│   └── database-implementation.md
└── assets/               # Static assets
    └── images/           # App images and icons
``` -->

## 🛠️ Technology Stack

### **Frontend**
- **React Native 0.74.x**: Cross-platform mobile development
- **Expo SDK 51.x**: Development platform and tools
- **TypeScript**: Type-safe JavaScript development
- **Expo Router**: File-based navigation system

### **State Management**
- **React Context API**: Global state management
- **AsyncStorage**: Local data persistence
- **React Hooks**: Component state management

### **UI/UX**
- **Expo Image**: Optimized image handling
- **Expo Vector Icons**: Comprehensive icon library
- **React Native Safe Area Context**: Safe area handling
- **Custom Components**: Reusable UI components

### **Device Integration**
- **Expo Image Picker**: Camera and gallery access
- **Expo Notifications**: Push notification system
- **React Native Reanimated**: Smooth animations

## 🎯 Core Features Deep Dive

### Challenge System
The app implements a comprehensive 75-day challenge tracking system:

- **Challenge State**: Managed through `ChallengeContext`
- **Day Completion**: Automatic completion based on habit fulfillment
- **Progress Tracking**: Real-time progress calculations
- **Visual Feedback**: Calendar integration with completion indicators

### Habit Management
Flexible habit system allowing users to:

- **Create Custom Habits**: Add personalized daily activities
- **Visual Icons**: Choose from extensive icon library
- **Daily Tracking**: Mark habits complete/incomplete
- **Progress Sync**: Habits sync with challenge progress

### Data Persistence
All user data is persisted locally using AsyncStorage:

- **User Profile**: Name, email, phone, profile image
- **Challenge Data**: Start date, completion status, progress
- **Habits**: Custom habits and daily completion status
- **Settings**: User preferences and configuration

<!-- ## 🔧 Configuration -->

<!-- ### Environment Setup
Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_APP_NAME=75 Challenge App
EXPO_PUBLIC_VERSION=1.0.0
``` -->

<!-- ### Notification Configuration
Configure notification settings in `app.json`:

```json
{
  "expo": {
    "notification": {
      "icon": "./assets/images/notification-icon.png",
      "color": "#007AFF"
    }
  }
}
``` -->

## 📱 Platform Support

- ✅ **iOS**: Full support (iOS 13+)
- ✅ **Android**: Full support (API level 21+)

## 🚦 Development Workflow

### Available Scripts
```bash
# Start development server
npm run dev

# Start with iOS simulator
npm run ios

# Start with Android emulator
npm run android

# Type checking
npm run typecheck

# Reset project
npm run reset-project
```

### Code Quality
The project includes:

- **TypeScript**: Strict type checking
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Component Architecture**: Modular, reusable components

<!-- ## 📊 Database Schema

The app uses a comprehensive data structure documented in `/docs/`:

### Core Entities
- **Users**: Profile information and settings
- **Challenges**: Challenge instances and progress
- **Habits**: Custom habit definitions
- **HabitLogs**: Daily habit completion records
- **Notifications**: User notification preferences

For detailed schema information, see [Database Schema Documentation](./docs/database-schema.md). -->

## 🔐 Privacy & Security

### Data Handling
- **Local Storage**: All data stored locally using AsyncStorage
- **No External APIs**: Complete offline functionality
- **User Control**: Full control over data export/deletion
- **Privacy Settings**: Comprehensive privacy controls

### Permissions
The app requests minimal permissions:
- **Camera**: Profile picture capture
- **Photo Library**: Profile picture selection
- **Notifications**: Challenge reminders (optional)

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Write clear, descriptive commit messages
- Add tests for new features
- Update documentation as needed

## 🙏 Acknowledgments

- **75 Hard Challenge**: Inspired by Andy Frisella's 75 Hard program
- **Expo Team**: For the amazing development platform
- **React Native Community**: For continuous innovation
- **Contributors**: Thank you to all contributors who help improve this app

## 📞 Support

If you encounter any issues or have questions:

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/yourusername/75-challenge-app/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/75-challenge-app/discussions)


**Made with ❤️ for personal transformation and mental toughness**

*Start your 75-day journey today and transform your life through consistency and dedication!*
