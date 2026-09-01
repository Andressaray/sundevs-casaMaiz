# Running CasaMaizApp on iOS and Android

This guide explains how to run the CasaMaizApp React Native application on both iOS and Android platforms, matching the versions currently pinned in this repo (`package.json`, `android/build.gradle`, `ios/Podfile`).

This is a **bare React Native CLI project** (not Expo), using **Yarn** as the package manager (`yarn.lock` is the source of truth — there is no `package-lock.json`).

## Prerequisites

Before you start, make sure you have the following installed:

### Required for Both Platforms
- **Node.js**: v22.11.0 or higher (see `engines.node` in `package.json`)
- **Yarn**: primary package manager for this repo (npm can still install, but always run `yarn install` to match `yarn.lock`)
- **Git** (for version control)

### Required for Android
- **Android SDK Platform**: API level 37 (`compileSdkVersion`), targeting API level 36 (`targetSdkVersion`), min API level 24 (`minSdkVersion`)
- **Android NDK**: Version `27.1.12297006`
- **Android Build Tools**: Version `37.0.0`
- **Kotlin**: `2.2.0`
- **Gradle**: `9.4.1` (managed automatically via the Gradle Wrapper, no manual install needed)
- **Java Development Kit (JDK)**: Version 17 (required by current Android Gradle Plugin / Gradle 9.x toolchains)
- **Android Emulator** or a physical Android device

### Required for iOS (macOS only)
- **Xcode**: Latest stable version from the App Store (required to build against current React Native/iOS SDKs)
- **CocoaPods**: managed via Bundler (see `Gemfile` — `cocoapods >= 1.13`, excluding `1.15.0`/`1.15.1`)
- **Ruby**: `>= 2.6.10` (see `Gemfile`)
- **iOS Deployment Target**: iOS 15.1 or higher (`IPHONEOS_DEPLOYMENT_TARGET` in the Xcode project)
- **Apple Developer Account** (optional, for physical device deployment)

## Installation Steps

### 1. Clone and Install Dependencies

```bash
# Navigate to your project directory
cd ~/Documents/interviews/CasaMaizApp

# Install JavaScript dependencies (always use Yarn — yarn.lock is authoritative)
yarn install

# Install Ruby gems (CocoaPods, etc.)
bundle install

# Install native iOS dependencies
cd ios
bundle exec pod install
cd ..
```

### 2. Android Setup

#### Install Android SDK and NDK

If you don't have the Android SDK installed, follow these steps:

**Option A: Using Android Studio (Recommended)**
1. Download [Android Studio](https://developer.android.com/studio)
2. Open Android Studio and go to **Settings → Appearance & Behavior → System Settings → Android SDK**
3. Under **SDK Tools**, install:
   - NDK (Side by side) - Select version `27.1.12297006`
   - Android Build Tools - Version `37.0.0`
   - Android SDK Platform - API Level 37 (compile) with API Level 36 available for target
4. Android Studio will automatically set the `ANDROID_HOME` environment variable

**Option B: Manual Installation**
```bash
# Create SDK directory
mkdir -p ~/Library/Android/sdk

# Add to your shell profile (~/.zshrc or ~/.bash_profile)
export ANDROID_HOME=~/Library/Android/sdk
export ANDROID_SDK_ROOT=~/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools

# Apply changes
source ~/.zshrc
```

#### Verify Android Setup

```bash
# Check if ANDROID_HOME is set
echo $ANDROID_HOME

# Verify NDK installation
ls ~/Library/Android/sdk/ndk/27.1.12297006/

# Verify JDK version (should report 17.x)
java -version
```

### 3. iOS Setup

#### Install CocoaPods via Bundler

This repo pins CocoaPods through the `Gemfile`, so use Bundler rather than a global `gem install cocoapods`:

```bash
bundle install

cd ios
bundle exec pod install
cd ..
```

---

## Running the Application

### Running on Android

#### Using Android Emulator

```bash
# Start the Android emulator first (from Android Studio)
# Then in your project root:

yarn android
```

#### Using Physical Android Device

1. Enable **USB Debugging** on your Android device:
   - Go to Settings → About Phone → tap Build Number 7 times
   - Go to Settings → Developer Options → Enable USB Debugging

2. Connect your device via USB cable

3. Run:
```bash
# List connected devices
adb devices

# Run the app
yarn android
```

#### Manual Android Build

```bash
cd android
./gradlew assembleDebug
# or for release
./gradlew assembleRelease
cd ..
```

### Running on iOS

#### Using iOS Simulator

```bash
# Start Metro Bundler (in a separate terminal)
yarn start

# In another terminal, run the app
yarn ios
```

#### On a Specific iPhone Model

```bash
# List available simulators
xcrun simctl list devices

# Run on a specific simulator (example: iPhone 16)
yarn ios -- --simulator="iPhone 16"
```

#### Using Physical iOS Device

1. Connect your iPhone via USB cable

2. Open the iOS project in Xcode:
```bash
open ios/CasaMaizApp.xcworkspace
```

3. In Xcode:
   - Select your physical device from the scheme selector
   - Select your Apple Team for signing
   - Click the "Run" button or press `⌘R`

#### Manual iOS Build

```bash
cd ios
xcodebuild -workspace CasaMaizApp.xcworkspace -scheme CasaMaizApp -configuration Debug
cd ..
```

---

## Metro Bundler

The Metro Bundler is the JavaScript bundler for React Native. You can start it separately for debugging:

```bash
yarn start

# Additional options
yarn start -- --reset-cache  # Clear cache
yarn start -- --max-workers=4  # Specify number of workers
```

Once the Metro Bundler is running, you can press:
- `a` to open on Android
- `i` to open on iOS
- `r` to reload the app
- `d` to open the developer menu (React Native DevTools)

---

## New Architecture & Hermes

This project runs with React Native's **New Architecture** (Fabric + TurboModules) and **Hermes** enabled by default — see `android/gradle.properties`:

```properties
newArchEnabled=true
hermesEnabled=true
edgeToEdgeEnabled=true
```

Native modules and third-party libraries added to this project should be New Architecture–compatible.

---

## Quality Checks Before Committing

A Husky `pre-commit` hook runs TypeScript typechecking automatically:

```bash
npm run typecheck
```

Other useful checks used in this repo:

```bash
yarn lint            # ESLint
yarn test            # Jest
yarn test:watch      # Jest in watch mode
yarn test:coverage   # Jest with coverage report
```

---

## Common Issues and Troubleshooting

### Android Issues

#### "NDK not found" Error
```
[CXX1101] NDK at /Users/.../ndk/27.1.12297006 did not have a source.properties file
```

**Solution**: Install the NDK version specified in `android/build.gradle`:
```bash
sdkmanager "ndk;27.1.12297006"
```

#### "Gradle build failed"
```bash
# Clear Gradle cache
cd android
./gradlew clean
cd ..

# Rebuild
yarn android
```

#### "JAVA_HOME not set" / wrong JDK version
```bash
# Add to ~/.zshrc or ~/.bash_profile
export JAVA_HOME=$(/usr/libexec/java_home -v 17)

# Apply changes
source ~/.zshrc
```

### iOS Issues

#### "Pod install failed"
```bash
# Clear CocoaPods cache and reinstall
cd ios
rm -rf Pods
rm Podfile.lock
bundle exec pod install
cd ..
```

#### "Xcode build failed"
```bash
# Clean Xcode build folder
cd ios
xcodebuild clean -workspace CasaMaizApp.xcworkspace -scheme CasaMaizApp
cd ..

# Reinstall pods
cd ios
bundle exec pod install
cd ..
```

#### "No developer team selected"
1. Open `ios/CasaMaizApp.xcworkspace` in Xcode
2. Select the project in the navigator
3. Select the target
4. Go to **Signing & Capabilities** tab
5. Select your Apple Team

### General Issues

#### Metro Bundler Port Already in Use
```bash
# Find process using port 8081
lsof -i :8081

# Kill the process (replace PID with actual process ID)
kill -9 <PID>

# Or use a different port
yarn start -- --port 8082
```

#### Clear Cache and Reinstall

```bash
# Remove node_modules and lockfile
rm -rf node_modules

# Clear React Native / Watchman cache
watchman watch-del-all
yarn start -- --reset-cache

# Reinstall dependencies
yarn install

# For Android
cd android && ./gradlew clean && cd ..

# For iOS
cd ios && rm -rf Pods Podfile.lock && bundle exec pod install && cd ..
```

---

## Building for Production

### Android Release Build

```bash
cd android
./gradlew assembleRelease
cd ..

# The APK will be located at: android/app/build/outputs/apk/release/
```

### iOS Release Build

```bash
cd ios
xcodebuild archive -workspace CasaMaizApp.xcworkspace \
  -scheme CasaMaizApp \
  -configuration Release \
  -archivePath ~/Desktop/CasaMaizApp.xcarchive

cd ..
```

---

## Environment Configuration

### Android Environment Variables

Add to `~/.zshrc`, `~/.bash_profile`, or `~/.bashrc`:

```bash
# Android SDK
export ANDROID_HOME=~/Library/Android/sdk
export ANDROID_SDK_ROOT=~/Library/Android/sdk

# Android NDK
export NDK_HOME=~/Library/Android/sdk/ndk/27.1.12297006

# Java (JDK 17)
export JAVA_HOME=$(/usr/libexec/java_home -v 17)

# PATH
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$JAVA_HOME/bin
```

### Verify Setup

```bash
# Test Android
adb version

# Test Java (should be 17.x)
java -version

# Test Node (should be >= 22.11.0)
node --version

# Test Yarn
yarn --version
```

---

## Useful Commands

```bash
# Start development server
yarn start

# Run on Android
yarn android

# Run on iOS
yarn ios

# Run both simultaneously (in separate terminals)
yarn start
yarn android  # in another terminal
yarn ios      # in another terminal

# Clear all caches
watchman watch-del-all

# View Metro logs
yarn start -- --verbose

# Reset Metro cache
yarn start -- --reset-cache

# List connected devices
adb devices

# Install app on specific device
adb -s <device-id> install <apk-path>

# Lint, typecheck, and test
yarn lint
npm run typecheck
yarn test
```

---

## Debugging

React Native's old "Debug JS Remotely" (Chrome DevTools over the JS bridge) and Flipper are deprecated on current React Native versions. Use these instead:

### React Native DevTools

1. With Metro running, press `d` in the terminal (or `Cmd+D` on iOS Simulator / `Cmd+M` on Android Emulator) to open the in-app Dev Menu
2. Select **"Open DevTools"** to launch React Native DevTools — it gives you the Elements/Components tree, console, network inspector, and JS debugger in one window, without any extra install

### Standalone

```bash
# Opens React Native DevTools directly, if Metro is already running
yarn start
# then press 'd' or 'j' depending on the CLI version
```

---

## Additional Resources

- [React Native Documentation](https://reactnative.dev/)
- [Android Developer Guide](https://developer.android.com/guide)
- [iOS Developer Guide](https://developer.apple.com/ios/)
- [React Native CLI Documentation](https://github.com/react-native-community/cli)
- [React Native New Architecture](https://reactnative.dev/docs/new-architecture-intro)

---

## Support

If you encounter issues not covered in this guide:

1. Check the official [React Native documentation](https://reactnative.dev/docs/troubleshooting)
2. Search [Stack Overflow](https://stackoverflow.com/questions/tagged/react-native)
3. Check [React Native GitHub Issues](https://github.com/facebook/react-native/issues)
4. Review `README.md`, `ARCHITECTURE_RATIONALE.md`, and `RULES.md` in this repo for project-specific conventions

---

**Last Updated**: August 2026 (React Native 0.87.0, React 19.2.3, Node >= 22.11.0)
