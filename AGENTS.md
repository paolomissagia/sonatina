This is an Expo/React Native app that also ships as a website. Prioritize mobile-first patterns, performance, and cross-platform compatibility (Android, iOS and web). Brand, voice and content rules are in BRAND.md; follow them in any user-facing text.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

```bash
npx expo install <package>  # ALWAYS use instead of npm add — resolves SDK-compatible versions
npx expo start              # start the dev server
npx expo lint               # lint
npx tsc --noEmit            # typecheck
npm test                    # vitest
npx expo-doctor             # diagnose dependency and config issues
```

Run lint, typecheck and tests before declaring any task done.

## Navigation & Routing

- Use **Expo Router**. Routes live in `src/app/` — every file there is a screen, `_layout.tsx` files define navigators. Keep non-route code outside `src/app/`.
- Since SDK 58 a navigator shows only the screens its layout declares: a new route needs a `Tabs.Screen` in `src/app/_layout.tsx` (or a `Stack.Screen` in its section's layout), or it renders nothing.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.

## Project rules

- Colours, fonts and spacing come from `src/ui/theme.ts`. Never add a raw colour.
- Import icons from `src/ui/icons.ts`, never from `lucide-react-native` directly: the package root bundles every icon.
- Links and buttons go through `Touchable` in `src/ui/kit.tsx` (a real link on the web).
- Keep `src/data`, `src/models` and `src/i18n.ts` free of React Native imports so the tests run in Node. Text a data module builds when it loads must be a getter, so it follows a language switch.
- Screens call `useLanguage()` so they re-render when the language changes.

## Building with EAS

Use EAS to build, sign, and submit (`eas build`, `eas submit`) — no local Xcode or Android Studio required. Run it as `npx eas-cli@latest <command>`.

- `ios/` and `android/` are generated (Continuous Native Generation). Never create or edit them by hand — configure native behaviour in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build.
