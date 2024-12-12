This is a new [**React Native**](https://reactnative.dev) project using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Snack Dash

SnackDash is a food delivery app that combines convenience with advanced features like Mapbox integration. Built using React Native, SnackDash offers seamless functionality across both Android and iOS platforms.

# Purpose

The purpose of SnackDash is to revolutionize the food delivery experience by providing users with an intuitive interface, real-time tracking of deliveries via Mapbox, and a wide selection of restaurants to choose from. It is designed to make ordering food effortless, transparent, and enjoyable for customers.

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Install Dependencies

Before starting the app, make sure to install all necessary dependencies. From the root of your project, run:

```bash
# using npm
npm install

# OR using Yarn
yarn install
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.


# Building the App

To create production builds of the app:

# Android

1. Generate a signed APK:

```bash
cd android
./gradlew assembleRelease 
```
The build will be located in android/app/build/outputs/apk/release/.

2. To create an Android App Bundle (AAB) for Play Store:

```bash
./gradlew bundleRelease
```

# IOS

1. Open the ios folder in Xcode.

2. Select the target device or simulator.

3. Go to Product > Archive to generate the build.

4. Use the Organizer to export the build for App Store submission or manual installation.

# Modifying your App

Now that you have successfully run the app, let's modify it.

Open App.tsx in your text editor and make changes.

   1. For Android: Press the R key twice or select "Reload" from the Developer Menu (Ctrl + M (Windows/Linux) or Cmd + M (macOS)) to see changes.

   2. For iOS: Press Cmd + R in the iOS Simulator to reload.


## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
