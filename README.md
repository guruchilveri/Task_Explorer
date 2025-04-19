This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
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

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

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

# NPM Package Installtion Rule
1. Always use 'yarn'.
2. Remove ^ in package.json from new installed dependency and devDependencies.

# NPM Packages Purpose

1. @react-navigation/native -> Provides native navigation capabilities for React Native applications.
2. react-native-screens -> A dependency required by React Navigation to optimize screen transitions and improve performance.
3. react-native-safe-area-context -> A dependency required by React Navigation to handle safe area insets on devices with notches or other screen cutouts.
4. @react-navigation/native-stack -> Used to implement stack-based navigation with improved performance and native-like animations.
5. axios -> A promise-based HTTP client for making API requests.
6. formik -> A library for building and managing forms with ease in React Native.
7. yup -> A JavaScript schema builder for value parsing and validation, often used with Formik.
8. react-native-svg -> A library for rendering scalable vector graphics (SVG) in React Native.
9. react-native-svg-transformer -> A transformer for React Native that enables importing and using SVG files as components.
10. i18next -> A powerful internationalization framework that simplifies managing translations, language switching, and localization in JavaScript applications. It supports features like interpolation, pluralization, and context-based translations.
11. react-i18next -> A React-specific binding for i18next, providing hooks like useTranslation and other utilities to integrate internationalization seamlessly into React components.

# NPM Packages Need to add in Future
1. react-native-shimmer-placeholder -> For Show Shimmer Effect while Data Loading
2. react-native-linear-gradient -> For Gradient Effect
3. react-native-modal -> For Modal/Popup
4. moment -> For Date Formating
5. react-native-mmkv -> This will use for Local Storage
6. react-native-config -> For multiple Environment

# Reference Docs

1. https://dasuja.medium.com/multiple-environments-setup-in-react-native-for-android-and-ios-app-29ef5cb4656a  /*Used this env setup*/
2. Check .husky folder for commit messages & branch naming conventions.
3. Below is the example for creating branch name
   "❌ Invalid branch name: $BRANCH_NAME"
   "✅ Allowed patterns: feature/*, bugfix/*, hotfix/*, release/*, task/*"
   i.e. git checkout -b bottomtab - Not Allowed ❌
        git checkout -b feature/bottomtav - Allowed ✅
4. For commit message convention please check commitlint.config.js file at root level  of project.
   example.
    - git commit -m "updated files" - Not Allowed ❌
    - git commit -m "feat: updated files" - Allowed ✅

