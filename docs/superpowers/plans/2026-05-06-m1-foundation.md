# M1 Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold the new Devotion mobile app — Expo + NativeWind + Supabase + Expo Router — with brand tokens applied, a working splash + 5-tap dev menu, four empty tabs that route correctly, and full auth (email + Apple + Google) wired through Supabase. Ship a development EAS build that Owen can install on his phone.

**Architecture:** Single new repo `devotion-mobile` (separate from the existing `devotion_app` marketing-site repo). Expo SDK 52 + RN 0.76 + TypeScript + Expo Router (file-based routes). NativeWind for Tailwind-style styling using Devotion's `coal/iron/paper/ember` tokens. Supabase for auth (email + Apple OAuth + Google OAuth) and the future backend; auth session persisted via `expo-secure-store`. Dev menu lives in a hidden modal triggered by 5 taps on the splash logo; flags persisted in `AsyncStorage` and stripped from production builds via `EAS_BUILD_PROFILE`. EAS Build for iOS/Android binaries from Windows.

**Tech Stack:** Expo SDK 52, React Native 0.76, TypeScript (strict), Expo Router 4, NativeWind 4, Tailwind CSS 3.4, Supabase JS 2.x, `@supabase/auth-helpers`, `expo-apple-authentication`, `expo-auth-session`, `expo-secure-store`, `@react-native-async-storage/async-storage`, Zustand 5, Jest + React Native Testing Library, EAS CLI.

---

## Owen action items (real-world signups required)

These block parts of the plan and need Owen to do them outside the codebase. The plan calls them out where they're needed, but here's the full list so Owen can start them in parallel:

| # | Action | Cost | Time | Blocks |
|---|---|---|---|---|
| O1 | Create Supabase project at supabase.com (free tier) | Free | 2 min | Phase B onwards |
| O2 | Create new GitHub repo `Optionallll/devotion-mobile` (private) | Free | 1 min | Phase A push |
| O3 | Enroll Apple Developer Program (personal account) | $99/yr | ~24h | Phase E (Apple Sign-In) + EAS Submit |
| O4 | Create Google Cloud project + OAuth client | Free | 10 min | Phase E (Google Sign-In) |
| O5 | Install Expo Go app on iPhone (App Store) | Free | 1 min | Local testing throughout |

If O3 takes longer than expected, M1 can ship without Apple Sign-In and add it later — it's the only blocker.

---

## File structure

This plan creates a new directory `c:\Users\Owen\Documents\devotion-mobile` containing:

```
devotion-mobile/
├── app/                              # Expo Router file-based routes
│   ├── _layout.tsx                   # Root layout + auth gate
│   ├── (auth)/                       # Auth route group
│   │   ├── _layout.tsx
│   │   ├── sign-in.tsx
│   │   └── sign-up.tsx
│   ├── (tabs)/                       # Authed tab group
│   │   ├── _layout.tsx               # Bottom tab bar
│   │   ├── index.tsx                 # Home tab
│   │   ├── train.tsx                 # Train tab
│   │   ├── eat.tsx                   # Eat tab (placeholder)
│   │   └── you.tsx                   # You tab
│   ├── splash.tsx                    # Custom splash with 5-tap
│   └── +not-found.tsx
├── components/
│   ├── DevMenu.tsx                   # Hidden dev menu modal
│   ├── TapDetector.tsx               # 5-tap gesture detector
│   └── Brand/                        # Reusable branded primitives
│       ├── Button.tsx
│       └── Card.tsx
├── lib/
│   ├── supabase.ts                   # Supabase client singleton
│   ├── auth.ts                       # Auth helpers + session hooks
│   ├── devFlags.ts                   # Dev flag store (Zustand)
│   └── theme.ts                      # Devotion design tokens
├── stores/
│   └── auth.ts                       # Auth state (Zustand)
├── __tests__/                        # Jest tests
│   ├── devFlags.test.ts
│   ├── tapDetector.test.tsx
│   └── auth.test.ts
├── assets/
│   ├── logo.png                      # Devotion V-bar logo
│   ├── splash.png
│   └── icon.png
├── app.config.ts                     # Expo config (env-aware)
├── eas.json                          # EAS Build profiles
├── tailwind.config.js                # Brand tokens
├── babel.config.js
├── metro.config.js
├── tsconfig.json
├── jest.config.js
├── jest.setup.js
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

**Files this plan does NOT create** (deferred to later milestones):
- Workout/routine/session UI (M2)
- Onboarding screens (M3)
- AI Edge Functions (M3/M4)
- Database migrations beyond `users` + `user_profile` (M2 onwards)

---

## Conventions used in this plan

- **🔑 Owen action** = step requires Owen doing something outside the codebase
- **🤖 Claude action** = step Claude (or any engineer) can execute
- **All `cd` paths use Windows backslashes** since you're on PowerShell. WSL/Bash users should adjust.
- **Tests use Jest + RNTL.** TDD where it adds value (logic units), skipped for pure scaffolding/config.
- **Commit after every meaningful step** — granular history makes review and rollback trivial.

---

## Phase A — Repo + Expo scaffold

### Task A1: Create the project directory and Expo app

**Files:**
- Create: `c:\Users\Owen\Documents\devotion-mobile\` (entire scaffolded project)

🤖 **Claude action**

- [ ] **Step 1: Create the project via Expo's tabs template**

Run from `c:\Users\Owen\Documents\`:
```powershell
npx create-expo-app@latest devotion-mobile --template tabs@52
```

Expected output: scaffolded project at `c:\Users\Owen\Documents\devotion-mobile` with example tabs working. Takes ~2 minutes.

- [ ] **Step 2: Verify it runs**

Run from `c:\Users\Owen\Documents\devotion-mobile\`:
```powershell
npx expo start
```

Expected: dev server starts, shows QR code. Press `q` to quit. (Owen will scan from Expo Go later — for now we just confirm the scaffold works.)

- [ ] **Step 3: Initialize git and first commit**

```powershell
cd c:\Users\Owen\Documents\devotion-mobile
git init
git add -A
git commit -m "chore: initial Expo tabs scaffold"
```

### Task A2: Add GitHub remote

**Files:** none

🔑 **Owen action: O2 — create empty GitHub repo `Optionallll/devotion-mobile` (private)**

- [ ] **Step 1: Owen creates the repo**

Owen goes to https://github.com/new
- Owner: `Optionallll`
- Name: `devotion-mobile`
- Private
- Do NOT initialize with README/license (we already have files)
- Click Create

- [ ] **Step 2: Add remote and push**

🤖 **Claude action**

```powershell
git remote add origin https://github.com/Optionallll/devotion-mobile.git
git branch -M main
git push -u origin main
```

Expected: push succeeds, branch tracking `origin/main`.

### Task A3: Configure TypeScript strict mode

**Files:**
- Modify: `tsconfig.json`

🤖 **Claude action**

- [ ] **Step 1: Update tsconfig.json**

Replace contents of `tsconfig.json`:

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx", ".expo/types/**/*.ts", "expo-env.d.ts"]
}
```

- [ ] **Step 2: Verify type check passes**

Run:
```powershell
npx tsc --noEmit
```

Expected: no errors. (If template files have implicit-any errors, add explicit types — do not relax strict.)

- [ ] **Step 3: Commit**

```powershell
git add tsconfig.json
git commit -m "chore: enable TS strict + path aliases"
```

### Task A4: Install runtime dependencies

**Files:**
- Modify: `package.json`

🤖 **Claude action**

- [ ] **Step 1: Install runtime deps**

```powershell
npx expo install nativewind tailwindcss@3.4.17 react-native-reanimated@~3.16.1
npx expo install @supabase/supabase-js @react-native-async-storage/async-storage expo-secure-store
npx expo install expo-apple-authentication expo-auth-session expo-crypto expo-web-browser
npm install zustand
```

Expected: all install. `npx expo install` resolves SDK-compatible versions automatically.

- [ ] **Step 2: Install dev deps**

```powershell
npm install -D jest @types/jest jest-expo @testing-library/react-native @testing-library/jest-native
```

- [ ] **Step 3: Commit**

```powershell
git add package.json package-lock.json
git commit -m "chore: install nativewind, supabase, auth, zustand, jest"
```

### Task A5: Configure Tailwind + NativeWind with Devotion brand tokens

**Files:**
- Create: `tailwind.config.js`
- Create: `lib/theme.ts`
- Create: `global.css`
- Modify: `babel.config.js`
- Modify: `metro.config.js`
- Modify: `app/_layout.tsx`

🤖 **Claude action**

- [ ] **Step 1: Create tailwind.config.js**

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        coal: {
          DEFAULT: '#0A0A0B',
          50: '#1A1A1C',
          100: '#141416',
        },
        iron: {
          DEFAULT: '#3A3A3F',
          50: '#2A2A2E',
          100: '#4A4A50',
          200: '#6A6A70',
        },
        paper: {
          DEFAULT: '#F5F1E8',
          dim: '#C8C3B7',
          mute: '#8A8678',
        },
        ember: {
          DEFAULT: '#FF6A1F',
          50: '#FF8347',
          100: '#E55A0F',
        },
      },
      fontFamily: {
        display: ['ArchivoBlack-Regular'],
        body: ['Manrope-Regular'],
        bodyBold: ['Manrope-Bold'],
        bodyMed: ['Manrope-Medium'],
      },
      borderRadius: {
        'sharp': '0px',
        'soft': '6px',
        'btn': '8px',
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 2: Create lib/theme.ts (token constants for non-className use)**

```typescript
export const tokens = {
  color: {
    coal: '#0A0A0B',
    coal50: '#1A1A1C',
    coal100: '#141416',
    iron: '#3A3A3F',
    iron50: '#2A2A2E',
    iron100: '#4A4A50',
    iron200: '#6A6A70',
    paper: '#F5F1E8',
    paperDim: '#C8C3B7',
    paperMute: '#8A8678',
    ember: '#FF6A1F',
    ember50: '#FF8347',
    ember100: '#E55A0F',
  },
  radius: {
    sharp: 0,
    soft: 6,
    btn: 8,
  },
  font: {
    display: 'ArchivoBlack-Regular',
    body: 'Manrope-Regular',
    bodyBold: 'Manrope-Bold',
    bodyMed: 'Manrope-Medium',
  },
} as const;

export type Tokens = typeof tokens;
```

- [ ] **Step 3: Create global.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 4: Update babel.config.js**

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
    ],
    plugins: [],
  };
};
```

(NativeWind v4 only needs the `jsxImportSource` option on `babel-preset-expo`; no separate `nativewind/babel` preset.)

- [ ] **Step 5: Update metro.config.js**

```javascript
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './global.css' });
```

- [ ] **Step 6: Import global.css in app/_layout.tsx**

Add at top of `app/_layout.tsx`:
```typescript
import '../global.css';
```

- [ ] **Step 7: Verify NativeWind compiles**

```powershell
npx expo start --clear
```

Expected: dev server starts without metro/nativewind errors. Stop with `q`.

- [ ] **Step 8: Commit**

```powershell
git add tailwind.config.js lib/theme.ts global.css babel.config.js metro.config.js app/_layout.tsx
git commit -m "feat(theme): NativeWind + Devotion brand tokens (coal/iron/paper/ember)"
```

### Task A6: Add Devotion fonts

**Files:**
- Create: `assets/fonts/ArchivoBlack-Regular.ttf`
- Create: `assets/fonts/Manrope-Regular.ttf`
- Create: `assets/fonts/Manrope-Medium.ttf`
- Create: `assets/fonts/Manrope-Bold.ttf`
- Modify: `app/_layout.tsx`

🤖 **Claude action**

- [ ] **Step 1: Install expo-font**

```powershell
npx expo install expo-font
```

- [ ] **Step 2: Download font files**

Download from Google Fonts (https://fonts.google.com):
- Archivo Black → `ArchivoBlack-Regular.ttf`
- Manrope → `Manrope-Regular.ttf`, `Manrope-Medium.ttf`, `Manrope-Bold.ttf`

Place all four `.ttf` files in `c:\Users\Owen\Documents\devotion-mobile\assets\fonts\`.

- [ ] **Step 3: Load fonts in app/_layout.tsx**

Replace `app/_layout.tsx`:

```typescript
import '../global.css';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { View, ActivityIndicator } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'ArchivoBlack-Regular': require('../assets/fonts/ArchivoBlack-Regular.ttf'),
    'Manrope-Regular': require('../assets/fonts/Manrope-Regular.ttf'),
    'Manrope-Medium': require('../assets/fonts/Manrope-Medium.ttf'),
    'Manrope-Bold': require('../assets/fonts/Manrope-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return (
      <View className="flex-1 items-center justify-center bg-coal">
        <ActivityIndicator color="#FF6A1F" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
```

- [ ] **Step 4: Verify fonts render**

Run `npx expo start`. In `app/(tabs)/index.tsx`, temporarily add:
```typescript
<Text className="font-display text-paper text-4xl">DEVOTION</Text>
```
Verify it renders in Archivo Black on phone via Expo Go. Revert the test text after.

- [ ] **Step 5: Commit**

```powershell
git add assets/fonts app/_layout.tsx package.json
git commit -m "feat(fonts): Archivo Black + Manrope loaded via expo-font"
```

### Task A7: Configure Jest

**Files:**
- Create: `jest.config.js`
- Create: `jest.setup.js`
- Modify: `package.json` (test script)

🤖 **Claude action**

- [ ] **Step 1: Create jest.config.js**

```javascript
module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEach: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|nativewind))',
  ],
};
```

- [ ] **Step 2: Create jest.setup.js**

```javascript
require('@testing-library/jest-native/extend-expect');

jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
```

- [ ] **Step 3: Add test script to package.json**

Edit `package.json` scripts section:
```json
"scripts": {
  "start": "expo start",
  "android": "expo start --android",
  "ios": "expo start --ios",
  "web": "expo start --web",
  "test": "jest",
  "test:watch": "jest --watch",
  "typecheck": "tsc --noEmit"
}
```

- [ ] **Step 4: Verify Jest runs (no tests yet)**

```powershell
npm test
```

Expected: "No tests found." Exits cleanly with code 0 or 1 (Jest's "no tests" exit). That's fine.

- [ ] **Step 5: Commit**

```powershell
git add jest.config.js jest.setup.js package.json
git commit -m "chore(test): jest + RNTL configured"
```

---

## Phase B — Supabase project + client

### Task B1: Create Supabase project

🔑 **Owen action: O1**

- [ ] **Step 1: Owen creates Supabase project**

Owen:
1. Goes to https://supabase.com/dashboard
2. Click "New Project"
3. Org: personal (or DeskWolf if it exists)
4. Project name: `devotion-prod` (yes "prod" — we'll add `devotion-staging` later)
5. Database password: generate strong, save in 1Password/Bitwarden
6. Region: `eu-west-2` (London — closest to Owen)
7. Pricing plan: Free
8. Click Create
9. Wait ~2 minutes for provisioning

- [ ] **Step 2: Owen copies credentials**

After provisioning:
- Project Settings → API
- Copy `URL` → save as `SUPABASE_URL`
- Copy `anon public` key → save as `SUPABASE_ANON_KEY`
- Copy `service_role` key → save as `SUPABASE_SERVICE_ROLE_KEY` (secret — never commit)

Owen pastes these to Claude. (Or runs `setx SUPABASE_URL "..."` etc. and lets Claude read from env.)

### Task B2: Configure environment variables

**Files:**
- Create: `.env.example`
- Create: `.env.local`
- Create: `app.config.ts`
- Delete: `app.json` (replaced by app.config.ts)
- Modify: `.gitignore`

🤖 **Claude action**

- [ ] **Step 1: Create .env.example (committed)**

```
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

- [ ] **Step 2: Create .env.local (gitignored, real values)**

Replace placeholders with values from B1 step 2:
```
EXPO_PUBLIC_SUPABASE_URL=https://abcdefgh.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

- [ ] **Step 3: Update .gitignore**

Add lines:
```
.env.local
.env.*.local
```

- [ ] **Step 4: Migrate app.json → app.config.ts**

Read existing `app.json`, then create `app.config.ts`:

```typescript
import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Devotion',
  slug: 'devotion-mobile',
  version: '0.1.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  scheme: 'devotion',
  userInterfaceStyle: 'dark',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#0A0A0B',
  },
  ios: {
    supportsTablet: false,
    bundleIdentifier: 'fitness.devotion.app',
    usesAppleSignIn: true,
  },
  android: {
    package: 'fitness.devotion.app',
    adaptiveIcon: {
      foregroundImage: './assets/icon.png',
      backgroundColor: '#0A0A0B',
    },
  },
  web: {
    bundler: 'metro',
  },
  plugins: ['expo-router', 'expo-font', 'expo-secure-store'],
  experiments: { typedRoutes: true },
  extra: {
    eas: { projectId: '' },
  },
});
```

Then delete `app.json`.

- [ ] **Step 5: Verify the app still runs**

```powershell
npx expo start --clear
```

Expected: starts without config errors.

- [ ] **Step 6: Commit**

```powershell
git add .env.example .gitignore app.config.ts
git rm app.json
git commit -m "chore(config): app.config.ts with env-driven Supabase + iOS/Android bundle IDs"
```

### Task B3: Create Supabase client

**Files:**
- Create: `lib/supabase.ts`

🤖 **Claude action**

- [ ] **Step 1: Create lib/supabase.ts**

```typescript
import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase env vars. Set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY in .env.local',
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
```

- [ ] **Step 2: Install URL polyfill**

```powershell
npx expo install react-native-url-polyfill
```

- [ ] **Step 3: Smoke test connection**

Add temporarily to `app/(tabs)/index.tsx`:
```typescript
import { supabase } from '@/lib/supabase';
import { useEffect } from 'react';

useEffect(() => {
  supabase.from('_health').select('*').limit(1).then(({ error }) => {
    console.log('Supabase reachable:', !error || error.code === 'PGRST116');
  });
}, []);
```

Run `npx expo start`, scan in Expo Go. Console should log `Supabase reachable: true`. Then revert the test code from `index.tsx`.

- [ ] **Step 4: Commit**

```powershell
git add lib/supabase.ts package.json
git commit -m "feat(supabase): client singleton with AsyncStorage session persistence"
```

### Task B4: Initial database migration — users + user_profile

**Files:**
- Create: `supabase/migrations/0001_users.sql`

🤖 **Claude action**

- [ ] **Step 1: Create migration SQL**

```sql
-- supabase/migrations/0001_users.sql

create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  username text unique,
  display_name text,
  avatar_url text,
  bio text,
  created_at timestamptz not null default now()
);

create table public.user_profile (
  user_id uuid primary key references public.users(id) on delete cascade,
  sex text check (sex in ('male', 'female', 'other', 'prefer_not_to_say')),
  height_cm numeric,
  weight_kg numeric,
  experience_level text check (experience_level in ('beginner', 'intermediate', 'advanced')),
  goals text[] default '{}',
  equipment text[] default '{}',
  days_per_week int check (days_per_week between 0 and 7),
  injuries text,
  units_pref text default 'metric' check (units_pref in ('metric', 'imperial')),
  updated_at timestamptz not null default now()
);

alter table public.users enable row level security;
alter table public.user_profile enable row level security;

create policy "users: select own"
  on public.users for select using (auth.uid() = id);

create policy "users: update own"
  on public.users for update using (auth.uid() = id);

create policy "users: insert own"
  on public.users for insert with check (auth.uid() = id);

create policy "user_profile: select own"
  on public.user_profile for select using (auth.uid() = user_id);

create policy "user_profile: insert own"
  on public.user_profile for insert with check (auth.uid() = user_id);

create policy "user_profile: update own"
  on public.user_profile for update using (auth.uid() = user_id);

-- Auto-create users + user_profile rows when auth.users insert fires
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email);
  insert into public.user_profile (user_id) values (new.id);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
```

- [ ] **Step 2: Apply migration in Supabase Studio**

🔑 **Owen action**

Owen:
1. Opens Supabase project → SQL Editor
2. Pastes the full SQL above
3. Click Run
4. Verify under Database → Tables that `users` and `user_profile` exist with RLS enabled

- [ ] **Step 3: Commit migration file**

🤖 **Claude action**

```powershell
git add supabase/migrations/0001_users.sql
git commit -m "feat(db): users + user_profile tables with RLS + auto-provision trigger"
```

---

## Phase C — Brand tokens + tab shell

### Task C1: Replace template tab routes with Devotion 4-tab layout

**Files:**
- Modify: `app/(tabs)/_layout.tsx`
- Delete: `app/(tabs)/index.tsx` (template version)
- Create: `app/(tabs)/index.tsx` (Home)
- Create: `app/(tabs)/train.tsx`
- Create: `app/(tabs)/eat.tsx`
- Create: `app/(tabs)/you.tsx`
- Delete: any template `explore.tsx` or other extra tabs

🤖 **Claude action**

- [ ] **Step 1: Replace app/(tabs)/_layout.tsx**

```typescript
import { Tabs } from 'expo-router';
import { tokens } from '@/lib/theme';
import { Text, View } from 'react-native';

const tabIcon = (label: string) => ({ focused }: { focused: boolean }) => (
  <View className="items-center justify-center pt-1">
    <Text
      className="font-bodyMed text-[10px] uppercase tracking-widest"
      style={{ color: focused ? tokens.color.ember : tokens.color.paperMute }}
    >
      {label}
    </Text>
  </View>
);

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: tokens.color.coal,
          borderTopColor: tokens.color.iron50,
          borderTopWidth: 1,
          height: 64,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen name="index" options={{ tabBarIcon: tabIcon('Home') }} />
      <Tabs.Screen name="train" options={{ tabBarIcon: tabIcon('Train') }} />
      <Tabs.Screen name="eat" options={{ tabBarIcon: tabIcon('Eat') }} />
      <Tabs.Screen name="you" options={{ tabBarIcon: tabIcon('You') }} />
    </Tabs>
  );
}
```

- [ ] **Step 2: Create app/(tabs)/index.tsx (Home)**

```typescript
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeTab() {
  return (
    <SafeAreaView className="flex-1 bg-coal">
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Text className="font-display text-paper text-3xl uppercase tracking-tight">
          Today
        </Text>
        <Text className="font-body text-paperDim mt-2">
          Welcome. Your dashboard lands here in M2.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
```

- [ ] **Step 3: Create app/(tabs)/train.tsx**

```typescript
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TrainTab() {
  return (
    <SafeAreaView className="flex-1 bg-coal">
      <View className="p-6">
        <Text className="font-display text-paper text-3xl uppercase tracking-tight">
          Train
        </Text>
        <Text className="font-body text-paperDim mt-2">
          Routines, library, explore — coming in M2/M5.
        </Text>
      </View>
    </SafeAreaView>
  );
}
```

- [ ] **Step 4: Create app/(tabs)/eat.tsx**

```typescript
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EatTab() {
  return (
    <SafeAreaView className="flex-1 bg-coal">
      <View className="flex-1 items-center justify-center p-6">
        <Text className="font-display text-ember text-5xl uppercase tracking-tight">
          Eat
        </Text>
        <Text className="font-body text-paperDim mt-4 text-center">
          Food tracking is coming. Workouts first.
        </Text>
        <Text className="font-bodyMed text-paper mt-8 text-xs uppercase tracking-widest">
          Notify me — Phase 2
        </Text>
      </View>
    </SafeAreaView>
  );
}
```

- [ ] **Step 5: Create app/(tabs)/you.tsx**

```typescript
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function YouTab() {
  return (
    <SafeAreaView className="flex-1 bg-coal">
      <View className="p-6">
        <Text className="font-display text-paper text-3xl uppercase tracking-tight">
          You
        </Text>
        <Text className="font-body text-paperDim mt-2">
          Profile, settings, premium — M5/M6.
        </Text>
      </View>
    </SafeAreaView>
  );
}
```

- [ ] **Step 6: Install safe-area-context if not already**

```powershell
npx expo install react-native-safe-area-context
```

- [ ] **Step 7: Delete any leftover template tab files**

Check `app/(tabs)/` for files other than the four listed above (e.g. template's `explore.tsx`). Delete them.

```powershell
# only if explore.tsx exists from template
git rm app/(tabs)/explore.tsx
```

- [ ] **Step 8: Verify all four tabs render**

Run `npx expo start`. On Expo Go, tap through Home / Train / Eat / You. Each should show its label in Archivo Black. Tab bar should be coal with ember active label.

- [ ] **Step 9: Commit**

```powershell
git add app/(tabs)
git commit -m "feat(tabs): Devotion 4-tab shell — Home, Train, Eat, You"
```

---

## Phase D — Splash + 5-tap dev menu

### Task D1: Dev flag store (Zustand) — TDD

**Files:**
- Create: `lib/devFlags.ts`
- Create: `__tests__/devFlags.test.ts`

🤖 **Claude action**

- [ ] **Step 1: Write the failing test**

Create `__tests__/devFlags.test.ts`:

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDevFlags, hydrateDevFlags } from '@/lib/devFlags';

beforeEach(async () => {
  await AsyncStorage.clear();
  useDevFlags.setState({
    skipOnboarding: false,
    forcePremium: false,
    prefillHistory: false,
    hydrated: false,
  });
});

test('default flags are all false', () => {
  const state = useDevFlags.getState();
  expect(state.skipOnboarding).toBe(false);
  expect(state.forcePremium).toBe(false);
  expect(state.prefillHistory).toBe(false);
});

test('setSkipOnboarding persists to AsyncStorage', async () => {
  await useDevFlags.getState().setSkipOnboarding(true);
  expect(useDevFlags.getState().skipOnboarding).toBe(true);
  const persisted = await AsyncStorage.getItem('devFlags');
  expect(JSON.parse(persisted!)).toMatchObject({ skipOnboarding: true });
});

test('hydrateDevFlags loads persisted values', async () => {
  await AsyncStorage.setItem(
    'devFlags',
    JSON.stringify({ skipOnboarding: true, forcePremium: true, prefillHistory: false }),
  );
  await hydrateDevFlags();
  const state = useDevFlags.getState();
  expect(state.skipOnboarding).toBe(true);
  expect(state.forcePremium).toBe(true);
  expect(state.hydrated).toBe(true);
});

test('reset clears all flags and AsyncStorage', async () => {
  await useDevFlags.getState().setSkipOnboarding(true);
  await useDevFlags.getState().reset();
  expect(useDevFlags.getState().skipOnboarding).toBe(false);
  const persisted = await AsyncStorage.getItem('devFlags');
  expect(persisted).toBeNull();
});
```

- [ ] **Step 2: Run tests, verify they fail**

```powershell
npm test -- devFlags
```

Expected: FAIL with "Cannot find module '@/lib/devFlags'".

- [ ] **Step 3: Implement lib/devFlags.ts**

```typescript
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'devFlags';

interface DevFlagsState {
  skipOnboarding: boolean;
  forcePremium: boolean;
  prefillHistory: boolean;
  hydrated: boolean;
  setSkipOnboarding: (v: boolean) => Promise<void>;
  setForcePremium: (v: boolean) => Promise<void>;
  setPrefillHistory: (v: boolean) => Promise<void>;
  reset: () => Promise<void>;
}

export const useDevFlags = create<DevFlagsState>((set, get) => ({
  skipOnboarding: false,
  forcePremium: false,
  prefillHistory: false,
  hydrated: false,
  setSkipOnboarding: async (v) => {
    set({ skipOnboarding: v });
    await persist(get());
  },
  setForcePremium: async (v) => {
    set({ forcePremium: v });
    await persist(get());
  },
  setPrefillHistory: async (v) => {
    set({ prefillHistory: v });
    await persist(get());
  },
  reset: async () => {
    set({ skipOnboarding: false, forcePremium: false, prefillHistory: false });
    await AsyncStorage.removeItem(STORAGE_KEY);
  },
}));

async function persist(state: DevFlagsState) {
  await AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      skipOnboarding: state.skipOnboarding,
      forcePremium: state.forcePremium,
      prefillHistory: state.prefillHistory,
    }),
  );
}

export async function hydrateDevFlags() {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (raw) {
    const parsed = JSON.parse(raw);
    useDevFlags.setState({ ...parsed, hydrated: true });
  } else {
    useDevFlags.setState({ hydrated: true });
  }
}

export const DEV_BUILD = process.env.EAS_BUILD_PROFILE !== 'production';
```

- [ ] **Step 4: Run tests, verify they pass**

```powershell
npm test -- devFlags
```

Expected: 4 tests pass.

- [ ] **Step 5: Commit**

```powershell
git add lib/devFlags.ts __tests__/devFlags.test.ts
git commit -m "feat(dev): dev flag store with AsyncStorage persistence (TDD)"
```

### Task D2: 5-tap detector — TDD

**Files:**
- Create: `components/TapDetector.tsx`
- Create: `__tests__/tapDetector.test.tsx`

🤖 **Claude action**

- [ ] **Step 1: Write the failing test**

Create `__tests__/tapDetector.test.tsx`:

```typescript
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { TapDetector } from '@/components/TapDetector';

test('fires onUnlock after exactly 5 taps within window', () => {
  const onUnlock = jest.fn();
  const { getByText } = render(
    <TapDetector taps={5} windowMs={3000} onUnlock={onUnlock}>
      <Text>tap-target</Text>
    </TapDetector>,
  );
  for (let i = 0; i < 5; i++) {
    fireEvent.press(getByText('tap-target'));
  }
  expect(onUnlock).toHaveBeenCalledTimes(1);
});

test('does not fire on 4 taps', () => {
  const onUnlock = jest.fn();
  const { getByText } = render(
    <TapDetector taps={5} windowMs={3000} onUnlock={onUnlock}>
      <Text>tap-target</Text>
    </TapDetector>,
  );
  for (let i = 0; i < 4; i++) {
    fireEvent.press(getByText('tap-target'));
  }
  expect(onUnlock).not.toHaveBeenCalled();
});

test('resets counter after window expires', () => {
  jest.useFakeTimers();
  const onUnlock = jest.fn();
  const { getByText } = render(
    <TapDetector taps={5} windowMs={1000} onUnlock={onUnlock}>
      <Text>tap-target</Text>
    </TapDetector>,
  );
  fireEvent.press(getByText('tap-target'));
  fireEvent.press(getByText('tap-target'));
  jest.advanceTimersByTime(1500);
  fireEvent.press(getByText('tap-target'));
  fireEvent.press(getByText('tap-target'));
  fireEvent.press(getByText('tap-target'));
  expect(onUnlock).not.toHaveBeenCalled();
  jest.useRealTimers();
});
```

- [ ] **Step 2: Run tests, verify they fail**

```powershell
npm test -- tapDetector
```

Expected: FAIL with "Cannot find module".

- [ ] **Step 3: Implement components/TapDetector.tsx**

```typescript
import { Pressable, type PressableProps } from 'react-native';
import { useRef, type ReactNode } from 'react';

interface Props {
  taps: number;
  windowMs: number;
  onUnlock: () => void;
  children: ReactNode;
  hitSlop?: PressableProps['hitSlop'];
}

export function TapDetector({ taps, windowMs, onUnlock, children, hitSlop }: Props) {
  const count = useRef(0);
  const firstTapAt = useRef(0);

  const handlePress = () => {
    const now = Date.now();
    if (count.current === 0 || now - firstTapAt.current > windowMs) {
      count.current = 1;
      firstTapAt.current = now;
    } else {
      count.current += 1;
    }
    if (count.current >= taps) {
      count.current = 0;
      onUnlock();
    }
  };

  return (
    <Pressable onPress={handlePress} hitSlop={hitSlop}>
      {children}
    </Pressable>
  );
}
```

- [ ] **Step 4: Run tests, verify they pass**

```powershell
npm test -- tapDetector
```

Expected: 3 tests pass.

- [ ] **Step 5: Commit**

```powershell
git add components/TapDetector.tsx __tests__/tapDetector.test.tsx
git commit -m "feat(dev): 5-tap detector component (TDD)"
```

### Task D3: Splash screen with 5-tap unlock

**Files:**
- Create: `app/splash.tsx`
- Create: `assets/logo.png` (Devotion V-bar logo)
- Modify: `app/_layout.tsx`
- Modify: `app.config.ts`

🤖 **Claude action**

- [ ] **Step 1: Add Devotion logo asset**

Copy the existing Devotion V-bar logo from the marketing site (the file used in the recent "Logo fix — bring back classic serif V with bar sitting on the tips" commit, likely under `c:\Users\Owen\Documents\GymFit app\public\` or `src/`) into `c:\Users\Owen\Documents\devotion-mobile\assets\logo.png`. If unavailable, use a placeholder PNG of the wordmark for now.

🔑 **Owen action if asset missing:** confirm where the source logo lives or hand Claude a fresh export.

- [ ] **Step 2: Create app/splash.tsx**

```typescript
import { View, Image, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { TapDetector } from '@/components/TapDetector';
import { DevMenu } from '@/components/DevMenu';
import { hydrateDevFlags } from '@/lib/devFlags';
import { useAuth } from '@/stores/auth';
import { DEV_BUILD } from '@/lib/devFlags';

export default function Splash() {
  const router = useRouter();
  const [devOpen, setDevOpen] = useState(false);
  const session = useAuth((s) => s.session);
  const sessionLoaded = useAuth((s) => s.loaded);

  useEffect(() => {
    hydrateDevFlags();
  }, []);

  useEffect(() => {
    if (!sessionLoaded) return;
    const t = setTimeout(() => {
      if (session) router.replace('/(tabs)');
      else router.replace('/(auth)/sign-in');
    }, 800);
    return () => clearTimeout(t);
  }, [session, sessionLoaded, router]);

  return (
    <View className="flex-1 items-center justify-center bg-coal">
      <TapDetector
        taps={5}
        windowMs={3000}
        onUnlock={() => DEV_BUILD && setDevOpen(true)}
        hitSlop={20}
      >
        <Image
          source={require('../assets/logo.png')}
          style={{ width: 120, height: 120 }}
          resizeMode="contain"
        />
      </TapDetector>
      <Text className="font-display text-paper text-4xl uppercase tracking-tight mt-6">
        DEVOTION
      </Text>
      <DevMenu visible={devOpen} onClose={() => setDevOpen(false)} />
    </View>
  );
}
```

- [ ] **Step 3: Set splash as the initial route in app/_layout.tsx**

Replace the Stack content in `app/_layout.tsx`:

```typescript
return (
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="splash" />
    <Stack.Screen name="(auth)" />
    <Stack.Screen name="(tabs)" />
  </Stack>
);
```

And ensure `initialRouteName` is `splash` — since Expo Router defaults to file order, also rename `app/index.tsx` (if it exists from template) to ensure the splash is what loads first. Cleanest: delete `app/index.tsx` (template's root index) so `splash.tsx` is reached via redirect from a tiny `app/index.tsx`:

```typescript
// app/index.tsx
import { Redirect } from 'expo-router';
export default function Index() {
  return <Redirect href="/splash" />;
}
```

- [ ] **Step 4: Verify splash renders**

(DevMenu doesn't exist yet — temporarily comment its import + JSX in splash.tsx, run, confirm splash shows logo + DEVOTION wordmark, redirects to sign-in after 800ms. Then uncomment in next task.)

- [ ] **Step 5: Commit**

```powershell
git add app/splash.tsx app/index.tsx app/_layout.tsx assets/logo.png
git commit -m "feat(splash): splash screen with logo + DEVOTION wordmark + tap unlock hook"
```

### Task D4: DevMenu modal

**Files:**
- Create: `components/DevMenu.tsx`

🤖 **Claude action**

- [ ] **Step 1: Implement components/DevMenu.tsx**

```typescript
import { Modal, View, Text, Pressable, Switch } from 'react-native';
import { useDevFlags } from '@/lib/devFlags';
import { tokens } from '@/lib/theme';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export function DevMenu({ visible, onClose }: Props) {
  const flags = useDevFlags();

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable className="flex-1 bg-coal/80" onPress={onClose}>
        <View
          className="absolute bottom-0 w-full bg-coal100 p-6 pb-12"
          style={{ borderTopWidth: 1, borderTopColor: tokens.color.iron50 }}
        >
          <Text className="font-display text-ember text-2xl uppercase tracking-tight mb-1">
            Dev Menu
          </Text>
          <Text className="font-body text-paperDim text-xs mb-6">
            Local only. Stripped from production.
          </Text>

          <Row
            label="Skip onboarding"
            value={flags.skipOnboarding}
            onChange={flags.setSkipOnboarding}
          />
          <Row
            label="Force premium"
            value={flags.forcePremium}
            onChange={flags.setForcePremium}
          />
          <Row
            label="Prefill history"
            value={flags.prefillHistory}
            onChange={flags.setPrefillHistory}
          />

          <Pressable
            className="bg-iron rounded-btn py-3 mt-6"
            onPress={async () => {
              await flags.reset();
              onClose();
            }}
          >
            <Text className="font-bodyBold text-paper text-center uppercase tracking-widest text-sm">
              Reset all
            </Text>
          </Pressable>

          <Pressable className="py-3 mt-2" onPress={onClose}>
            <Text className="font-bodyMed text-paperMute text-center uppercase tracking-widest text-xs">
              Close
            </Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}

function Row({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <View className="flex-row items-center justify-between py-3 border-b border-iron50">
      <Text className="font-bodyMed text-paper text-base">{label}</Text>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: tokens.color.iron, true: tokens.color.ember100 }}
        thumbColor={value ? tokens.color.ember : tokens.color.paperDim}
      />
    </View>
  );
}
```

- [ ] **Step 2: Re-enable DevMenu in splash.tsx (revert the commenting from D3 step 4)**

- [ ] **Step 3: Manual smoke test**

Run `npx expo start`. On Expo Go:
- Tap the logo 5 times within 3 seconds
- Expect: dev menu sheet slides up from bottom
- Toggle each switch — verify visual change
- Tap Reset — verify all toggles return to off
- Tap Close — verify dismisses

- [ ] **Step 4: Commit**

```powershell
git add components/DevMenu.tsx app/splash.tsx
git commit -m "feat(dev): DevMenu modal with skip/premium/prefill toggles + reset"
```

---

## Phase E — Authentication

### Task E1: Auth state store — TDD

**Files:**
- Create: `stores/auth.ts`
- Create: `__tests__/auth.test.ts`

🤖 **Claude action**

- [ ] **Step 1: Write the failing test**

```typescript
// __tests__/auth.test.ts
import { useAuth, initAuthListener } from '@/stores/auth';
import { supabase } from '@/lib/supabase';

jest.mock('@/lib/supabase', () => {
  const listeners: Array<(event: string, session: any) => void> = [];
  return {
    supabase: {
      auth: {
        getSession: jest.fn().mockResolvedValue({ data: { session: null } }),
        onAuthStateChange: jest.fn((cb: (event: string, session: any) => void) => {
          listeners.push(cb);
          return { data: { subscription: { unsubscribe: jest.fn() } } };
        }),
        __emit: (event: string, session: any) => listeners.forEach((l) => l(event, session)),
      },
    },
  };
});

beforeEach(() => {
  useAuth.setState({ session: null, loaded: false });
});

test('initAuthListener sets loaded=true after fetching session', async () => {
  await initAuthListener();
  expect(useAuth.getState().loaded).toBe(true);
  expect(useAuth.getState().session).toBeNull();
});

test('auth state listener updates session on SIGNED_IN', async () => {
  await initAuthListener();
  const fakeSession = { user: { id: 'u1', email: 'a@b.com' } };
  // @ts-ignore
  supabase.auth.__emit('SIGNED_IN', fakeSession);
  expect(useAuth.getState().session).toEqual(fakeSession);
});

test('auth state listener clears session on SIGNED_OUT', async () => {
  await initAuthListener();
  // @ts-ignore
  supabase.auth.__emit('SIGNED_IN', { user: { id: 'u1' } });
  // @ts-ignore
  supabase.auth.__emit('SIGNED_OUT', null);
  expect(useAuth.getState().session).toBeNull();
});
```

- [ ] **Step 2: Run tests, verify they fail**

```powershell
npm test -- auth
```

Expected: FAIL — module missing.

- [ ] **Step 3: Implement stores/auth.ts**

```typescript
import { create } from 'zustand';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface AuthState {
  session: Session | null;
  loaded: boolean;
  setSession: (s: Session | null) => void;
}

export const useAuth = create<AuthState>((set) => ({
  session: null,
  loaded: false,
  setSession: (s) => set({ session: s }),
}));

export async function initAuthListener() {
  const { data } = await supabase.auth.getSession();
  useAuth.setState({ session: data.session, loaded: true });
  supabase.auth.onAuthStateChange((_event, session) => {
    useAuth.setState({ session });
  });
}

export async function signOut() {
  await supabase.auth.signOut();
}
```

- [ ] **Step 4: Run tests, verify they pass**

```powershell
npm test -- auth
```

Expected: 3 tests pass.

- [ ] **Step 5: Wire `initAuthListener` into root layout**

In `app/_layout.tsx`, after fonts load:

```typescript
import { initAuthListener } from '@/stores/auth';

useEffect(() => {
  initAuthListener();
}, []);
```

- [ ] **Step 6: Commit**

```powershell
git add stores/auth.ts __tests__/auth.test.ts app/_layout.tsx
git commit -m "feat(auth): auth state store with Supabase session listener (TDD)"
```

### Task E2: Sign-up + sign-in screens (email/password)

**Files:**
- Create: `app/(auth)/_layout.tsx`
- Create: `app/(auth)/sign-in.tsx`
- Create: `app/(auth)/sign-up.tsx`
- Create: `components/Brand/Button.tsx`
- Create: `components/Brand/TextField.tsx`

🤖 **Claude action**

- [ ] **Step 1: Create components/Brand/Button.tsx**

```typescript
import { Pressable, Text, ActivityIndicator } from 'react-native';

interface Props {
  label: string;
  onPress: () => void | Promise<void>;
  variant?: 'primary' | 'secondary';
  loading?: boolean;
  disabled?: boolean;
}

export function Button({ label, onPress, variant = 'primary', loading, disabled }: Props) {
  const base = 'rounded-btn py-4 items-center justify-center';
  const tone =
    variant === 'primary'
      ? `bg-ember ${disabled || loading ? 'opacity-50' : ''}`
      : `bg-iron ${disabled || loading ? 'opacity-50' : ''}`;
  return (
    <Pressable
      className={`${base} ${tone}`}
      onPress={() => !loading && !disabled && onPress()}
      disabled={loading || disabled}
    >
      {loading ? (
        <ActivityIndicator color="#0A0A0B" />
      ) : (
        <Text className="font-bodyBold text-coal uppercase tracking-widest text-sm">
          {label}
        </Text>
      )}
    </Pressable>
  );
}
```

- [ ] **Step 2: Create components/Brand/TextField.tsx**

```typescript
import { TextInput, View, Text, type TextInputProps } from 'react-native';
import { tokens } from '@/lib/theme';

interface Props extends TextInputProps {
  label: string;
  error?: string;
}

export function TextField({ label, error, ...rest }: Props) {
  return (
    <View className="mb-4">
      <Text className="font-bodyMed text-paperDim uppercase tracking-widest text-xs mb-2">
        {label}
      </Text>
      <TextInput
        className="bg-coal100 text-paper font-body text-base px-4 py-3 border border-iron50 rounded-soft"
        placeholderTextColor={tokens.color.paperMute}
        {...rest}
      />
      {error ? (
        <Text className="font-body text-ember text-xs mt-1">{error}</Text>
      ) : null}
    </View>
  );
}
```

- [ ] **Step 3: Create app/(auth)/_layout.tsx**

```typescript
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
```

- [ ] **Step 4: Create app/(auth)/sign-in.tsx**

```typescript
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Button } from '@/components/Brand/Button';
import { TextField } from '@/components/Brand/TextField';
import { supabase } from '@/lib/supabase';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    setLoading(true);
    setError(null);
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) setError(err.message);
    else router.replace('/(tabs)');
  };

  return (
    <SafeAreaView className="flex-1 bg-coal">
      <View className="flex-1 px-6 pt-16">
        <Text className="font-display text-paper text-4xl uppercase tracking-tight mb-2">
          Sign In
        </Text>
        <Text className="font-body text-paperDim mb-8">Welcome back.</Text>

        <TextField
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextField
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error ? (
          <Text className="font-body text-ember text-sm mb-3">{error}</Text>
        ) : null}

        <Button label="Sign In" onPress={onSubmit} loading={loading} />

        <Pressable className="mt-6" onPress={() => router.push('/(auth)/sign-up')}>
          <Text className="font-bodyMed text-paperDim text-center uppercase tracking-widest text-xs">
            New here? <Text className="text-ember">Create an account</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
```

- [ ] **Step 5: Create app/(auth)/sign-up.tsx**

```typescript
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Button } from '@/components/Brand/Button';
import { TextField } from '@/components/Brand/TextField';
import { supabase } from '@/lib/supabase';

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const onSubmit = async () => {
    setLoading(true);
    setError(null);
    setInfo(null);
    const { error: err } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (err) setError(err.message);
    else setInfo('Check your inbox for a confirmation link.');
  };

  return (
    <SafeAreaView className="flex-1 bg-coal">
      <View className="flex-1 px-6 pt-16">
        <Text className="font-display text-paper text-4xl uppercase tracking-tight mb-2">
          Create Account
        </Text>
        <Text className="font-body text-paperDim mb-8">
          Start your devotion.
        </Text>

        <TextField
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextField
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error ? (
          <Text className="font-body text-ember text-sm mb-3">{error}</Text>
        ) : null}
        {info ? (
          <Text className="font-body text-paperDim text-sm mb-3">{info}</Text>
        ) : null}

        <Button label="Sign Up" onPress={onSubmit} loading={loading} />

        <Pressable className="mt-6" onPress={() => router.replace('/(auth)/sign-in')}>
          <Text className="font-bodyMed text-paperDim text-center uppercase tracking-widest text-xs">
            Have an account? <Text className="text-ember">Sign in</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
```

- [ ] **Step 6: Smoke test full email auth flow**

🔑 **Owen action partial:**
- In Supabase project → Authentication → Providers → Email — confirm "Enable Email signups" is ON (default)
- For dev convenience: Authentication → Email Templates → toggle "Enable email confirmations" OFF temporarily so we don't need real email validation. (Re-enable before launch.)

🤖 **Claude verifies:** run app, sign up with `test@devotion.dev` / `password123`, verify it routes to tabs. Sign out (manual via Supabase dashboard for now), sign in again, verify it works.

- [ ] **Step 7: Commit**

```powershell
git add app/(auth) components/Brand/Button.tsx components/Brand/TextField.tsx
git commit -m "feat(auth): email sign-in + sign-up screens with Devotion styling"
```

### Task E3: Apple Sign-In

**Files:**
- Modify: `app/(auth)/sign-in.tsx`
- Modify: `app/(auth)/sign-up.tsx`
- Create: `lib/auth.ts`

🔑 **Owen action: O3 (Apple Developer enrollment) must be complete + Supabase Apple provider configured**

- [ ] **Step 1: Owen configures Apple Sign-In**

Owen, once enrolled in Apple Developer Program:
1. Go to https://developer.apple.com/account
2. Certificates, Identifiers & Profiles → Identifiers → register App ID `fitness.devotion.app` with Sign In with Apple capability enabled
3. Identifiers → Services IDs → register `fitness.devotion.app.signin` (Web service ID) — required by Supabase
4. Generate a Sign in with Apple key (.p8 file), note Key ID and Team ID
5. In Supabase project → Authentication → Providers → Apple — enable, paste Service ID, Team ID, Key ID, key contents
6. Add Supabase callback URL to Apple's Service ID (shown by Supabase)

- [ ] **Step 2: Create lib/auth.ts**

🤖 **Claude action**

```typescript
import * as AppleAuthentication from 'expo-apple-authentication';
import { supabase } from '@/lib/supabase';
import { Platform } from 'react-native';

export async function signInWithApple() {
  if (Platform.OS !== 'ios') throw new Error('Apple Sign-In is iOS only');
  const credential = await AppleAuthentication.signInAsync({
    requestedScopes: [
      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      AppleAuthentication.AppleAuthenticationScope.EMAIL,
    ],
  });
  if (!credential.identityToken) throw new Error('No identity token from Apple');
  const { error } = await supabase.auth.signInWithIdToken({
    provider: 'apple',
    token: credential.identityToken,
  });
  if (error) throw error;
}

export async function isAppleSignInAvailable(): Promise<boolean> {
  if (Platform.OS !== 'ios') return false;
  return AppleAuthentication.isAvailableAsync();
}
```

- [ ] **Step 3: Add Apple button to sign-in.tsx**

In `app/(auth)/sign-in.tsx`, add below the email Button:

```typescript
import * as AppleAuthentication from 'expo-apple-authentication';
import { signInWithApple, isAppleSignInAvailable } from '@/lib/auth';
// ... existing imports

const [appleAvailable, setAppleAvailable] = useState(false);
useEffect(() => { isAppleSignInAvailable().then(setAppleAvailable); }, []);

// In JSX, after email Button:
{appleAvailable && (
  <View className="mt-4">
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
      cornerRadius={8}
      style={{ width: '100%', height: 52 }}
      onPress={async () => {
        try { await signInWithApple(); router.replace('/(tabs)'); }
        catch (e: any) { setError(e.message); }
      }}
    />
  </View>
)}
```

Mirror the same in `sign-up.tsx`.

- [ ] **Step 4: Smoke test**

Apple Sign-In requires a real iOS device build (not Expo Go). Defer testing to Phase F when EAS dev build is installed. For now, verify TypeScript compiles:

```powershell
npm run typecheck
```

Expected: no errors.

- [ ] **Step 5: Commit**

```powershell
git add lib/auth.ts app/(auth)
git commit -m "feat(auth): Apple Sign-In via supabase signInWithIdToken (test in EAS dev build)"
```

### Task E4: Google Sign-In

**Files:**
- Modify: `lib/auth.ts`
- Modify: `app/(auth)/sign-in.tsx`
- Modify: `app/(auth)/sign-up.tsx`

🔑 **Owen action: O4**

- [ ] **Step 1: Owen sets up Google OAuth**

Owen:
1. Go to https://console.cloud.google.com → New Project → name "Devotion"
2. APIs & Services → OAuth consent screen → External → fill in app name, support email, dev contact
3. Credentials → Create OAuth client ID:
   - Application type: iOS → bundle: `fitness.devotion.app` → save Client ID
   - Application type: Android → package: `fitness.devotion.app` + SHA-1 (Owen runs `eas credentials` later to get this; placeholder for now)
   - Application type: Web (for Supabase) → save Client ID + Secret
4. In Supabase project → Authentication → Providers → Google — enable, paste Web Client ID + Secret

- [ ] **Step 2: Add Google sign-in helper to lib/auth.ts**

🤖 **Claude action**

Add to `lib/auth.ts`:
```typescript
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export async function signInWithGoogle() {
  const redirectTo = AuthSession.makeRedirectUri({
    scheme: 'devotion',
    path: 'auth-callback',
  });
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo, skipBrowserRedirect: true },
  });
  if (error) throw error;
  if (!data?.url) throw new Error('No OAuth URL');
  const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
  if (result.type !== 'success') throw new Error('Cancelled');
  const url = new URL(result.url);
  const code = url.searchParams.get('code');
  if (!code) throw new Error('No OAuth code');
  const { error: exErr } = await supabase.auth.exchangeCodeForSession(code);
  if (exErr) throw exErr;
}
```

- [ ] **Step 3: Add Google button**

In both sign-in.tsx and sign-up.tsx, add below Apple button (or below email Button on Android):

```typescript
import { signInWithGoogle } from '@/lib/auth';

<View className="mt-3">
  <Button
    label="Continue with Google"
    variant="secondary"
    onPress={async () => {
      try { await signInWithGoogle(); router.replace('/(tabs)'); }
      catch (e: any) { setError(e.message); }
    }}
  />
</View>
```

- [ ] **Step 4: Configure scheme handler in app.config.ts**

Already added (`scheme: 'devotion'` in B2 step 4). Verify it's there.

- [ ] **Step 5: Verify types compile**

```powershell
npm run typecheck
```

- [ ] **Step 6: Commit**

```powershell
git add lib/auth.ts app/(auth)
git commit -m "feat(auth): Google Sign-In via expo-auth-session + supabase OAuth"
```

### Task E5: Auth gate in root layout

**Files:**
- Modify: `app/_layout.tsx`

🤖 **Claude action**

- [ ] **Step 1: Add redirect logic**

Replace `app/_layout.tsx` with:

```typescript
import '../global.css';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { View, ActivityIndicator } from 'react-native';
import { initAuthListener, useAuth } from '@/stores/auth';
import { useDevFlags } from '@/lib/devFlags';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'ArchivoBlack-Regular': require('../assets/fonts/ArchivoBlack-Regular.ttf'),
    'Manrope-Regular': require('../assets/fonts/Manrope-Regular.ttf'),
    'Manrope-Medium': require('../assets/fonts/Manrope-Medium.ttf'),
    'Manrope-Bold': require('../assets/fonts/Manrope-Bold.ttf'),
  });

  useEffect(() => { initAuthListener(); }, []);

  useEffect(() => {
    if (fontsLoaded || fontError) SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return (
      <View className="flex-1 items-center justify-center bg-coal">
        <ActivityIndicator color="#FF6A1F" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="splash" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
```

The auth-aware redirects already happen in `splash.tsx`. Add an active gate so a signed-out user landing on a `(tabs)` URL is redirected:

Update `app/(tabs)/_layout.tsx` to redirect unauthed users:
```typescript
import { Redirect, Tabs } from 'expo-router';
import { useAuth } from '@/stores/auth';
// ... existing imports

const session = useAuth((s) => s.session);
const loaded = useAuth((s) => s.loaded);

if (!loaded) return null;
if (!session) return <Redirect href="/(auth)/sign-in" />;

return (<Tabs ... />);  // existing
```

- [ ] **Step 2: Smoke test**

Sign out (delete user via Supabase dashboard), restart app. Should land on sign-in. Sign in → tabs.

- [ ] **Step 3: Commit**

```powershell
git add app/_layout.tsx app/(tabs)/_layout.tsx
git commit -m "feat(auth): auth gate redirects unauthed users to sign-in"
```

---

## Phase F — EAS dev build

### Task F1: Initialize EAS

**Files:**
- Create: `eas.json`
- Modify: `app.config.ts`

🔑 **Owen action: free Expo account at expo.dev (signup if needed)**

- [ ] **Step 1: Install EAS CLI globally**

🤖 **Claude action**

```powershell
npm install -g eas-cli
```

- [ ] **Step 2: Log in**

🔑 **Owen action**

```powershell
eas login
```

Owen enters Expo account credentials (or signs up at expo.dev if no account).

- [ ] **Step 3: Initialize EAS project**

🤖 **Claude action**

From `c:\Users\Owen\Documents\devotion-mobile\`:
```powershell
eas init
```

Expected: creates `extra.eas.projectId` in app.config.ts and sets up project on expo.dev.

- [ ] **Step 4: Create eas.json**

```json
{
  "cli": { "version": ">= 7.0.0", "appVersionSource": "remote" },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": { "simulator": false },
      "env": { "EAS_BUILD_PROFILE": "development" }
    },
    "preview": {
      "distribution": "internal",
      "ios": { "simulator": false },
      "env": { "EAS_BUILD_PROFILE": "preview" }
    },
    "production": {
      "autoIncrement": true,
      "env": { "EAS_BUILD_PROFILE": "production" }
    }
  },
  "submit": {
    "production": {}
  }
}
```

- [ ] **Step 5: Commit**

```powershell
git add eas.json app.config.ts
git commit -m "chore(eas): initialize EAS Build profiles (dev/preview/prod)"
```

### Task F2: Build first iOS dev client

🔑 **Owen action: O3 must be complete (Apple Developer Program enrolled)**

- [ ] **Step 1: Run dev build**

🤖 **Claude action triggers, Owen completes prompts**

```powershell
eas build --profile development --platform ios
```

EAS prompts (Owen answers):
- "Generate a new Apple Distribution Certificate?" → Yes
- "Generate a new Apple Provisioning Profile?" → Yes
- "Apple ID" → Owen's Apple ID
- "App-specific password" → Owen generates at appleid.apple.com if 2FA on
- "Push key?" → Skip for now (notifications are post-M1)

Build runs in EAS cloud (~15-20 min). Owen gets a `.ipa` URL when done.

- [ ] **Step 2: Install on Owen's iPhone**

🔑 **Owen action**

EAS gives a QR code + URL after build. Owen:
1. On iPhone, opens the URL in Safari
2. Taps Install
3. Settings → General → VPN & Device Management → Trust the developer profile
4. Opens "Devotion (Dev)" from home screen

- [ ] **Step 3: Smoke test full M1 flow on real device**

Owen:
- App opens → splash with logo
- Tap logo 5× → Dev menu appears
- Toggle "Force premium" → close → reopen → confirm persisted
- Sign up with email
- Receives confirmation email (if confirmations re-enabled), or auto-signs-in
- Lands on Home tab → switch through Train/Eat/You
- Apple Sign-In works (if E3 was completed before this build)
- Google Sign-In works (if E4 was completed before this build)

- [ ] **Step 4: Commit any device-test fixes if needed**

If issues surface during F2 step 3, fix them and commit each fix separately.

### Task F3: README + handoff doc

**Files:**
- Modify: `README.md`

🤖 **Claude action**

- [ ] **Step 1: Write README.md**

```markdown
# Devotion Mobile

Native Devotion app — workout-first fitness tracker built on Expo + Supabase.

## Status
M1 (Foundation) — auth, tab shell, dev menu, EAS dev build working.

## Local development

```bash
git clone https://github.com/Optionallll/devotion-mobile
cd devotion-mobile
npm install
cp .env.example .env.local  # fill in Supabase URL + anon key
npx expo start
```

Scan QR with Expo Go (iPhone) for in-flight changes. For Apple/Google sign-in, install the EAS dev client (`eas build --profile development --platform ios`).

## Scripts

- `npm start` — Expo dev server
- `npm test` — Jest test suite
- `npm run typecheck` — TypeScript strict
- `eas build --profile development --platform ios` — dev client build
- `eas build --profile production --platform all` — store build (do not run yet)

## Dev menu

Tap the splash logo 5× within 3 seconds. Toggles persist locally. Stripped from production builds via `EAS_BUILD_PROFILE === 'production'`.

## Stack

- Expo SDK 52, React Native 0.76, TypeScript strict
- Expo Router (file-based)
- NativeWind (Tailwind on RN) with Devotion `coal/iron/paper/ember` tokens
- Supabase (auth + Postgres + RLS)
- Zustand (client state)
- Jest + React Native Testing Library

## Spec & roadmap

Master design spec: `../GymFit app/docs/superpowers/specs/2026-05-06-devotion-app-v1-design.md`
M1 plan: `../GymFit app/docs/superpowers/plans/2026-05-06-m1-foundation.md`
```

- [ ] **Step 2: Commit**

```powershell
git add README.md
git commit -m "docs: README with local dev + dev-menu + spec links"
git push
```

---

## M1 Acceptance criteria

The M1 milestone is complete when ALL of the following are true:

- [ ] `c:\Users\Owen\Documents\devotion-mobile` repo exists, pushed to `Optionallll/devotion-mobile` on GitHub
- [ ] `npm test` passes — at least 10 tests across devFlags, tapDetector, auth
- [ ] `npm run typecheck` passes with zero errors
- [ ] App launches on Expo Go and renders the Devotion-themed splash + 4 tabs
- [ ] Splash 5-tap opens the Dev Menu; toggles persist after app restart
- [ ] Email signup → confirmation → sign-in works end-to-end against Supabase
- [ ] Apple Sign-In works on EAS dev build (skip if O3 still pending — flag for follow-up)
- [ ] Google Sign-In works on EAS dev build
- [ ] Auth gate: signing out returns user to sign-in screen
- [ ] EAS dev build is installed on Owen's iPhone
- [ ] README documents local dev + dev menu

When all boxes ticked, M2 plan can be written.

---

## Self-review notes

**Spec coverage check (M1 portion of spec):**
- ✅ Expo + EAS scaffold (Section 1) → Phase A + F
- ✅ NativeWind with Devotion tokens (Section 1, Section 6 brand) → Phase A5
- ✅ Supabase + RLS (Section 1, Section 3) → Phase B
- ✅ users + user_profile tables (Section 3) → Task B4
- ✅ Auth: email + Apple + Google (Section 1) → Phase E
- ✅ Splash + 5-tap dev menu with skip-onboarding/force-premium toggles (Section 2) → Phase D
- ✅ 4-tab shell with Eat placeholder (Section 2) → Phase C
- ✅ Auth gate (Section 2) → Task E5
- ✅ EAS dev build to Owen's phone (Section 6 M1) → Phase F

**Open dependencies on Owen actions:**
- O1 Supabase project — blocks Phase B onwards
- O2 GitHub repo — blocks Phase A push
- O3 Apple Developer — blocks E3, F2 fully tested
- O4 Google Cloud OAuth — blocks E4 tested
- O5 Expo Go install — needed for in-flight testing

If O3 is delayed, ship M1 without Apple Sign-In and add as a small follow-up. Everything else can proceed.

**Not in M1, in spec for later milestones:**
- Workout/exercise/routine/session tables (M2)
- Onboarding screens (M3)
- AI Edge Functions (M3/M4)
- Curated library + community (M5)
- RevenueCat + paywall (M6)
- App Store submission (M7)
