import { combineReducers, configureStore } from '@reduxjs/toolkit';

//Reducers
import onboardingReducers from './features/onboarding';
import homeReducers from './features/pay';
import merchantsReducers from './features/merchants';
import userReducer from './features/user/userSlice';
import authReducer from './features/auth/authSlice';
import commerceReducer from './features/micro-commerce';
import sharedReducer from './features/shared';
import notificationsReducer from './features/notifications/notificationSlice';
import referralsReducer from './features/referrals';
import configReducer from './features/config/ConfigSlice';
import contentCardsReducer from './features/contentCards';
import featureFlagsReducer from './features/feature-flags';
import firstVisitReducer from './features/first-visit';
import benefitsReducer from './features/benefits';

import { persistReducer, createMigrate, persistStore } from 'redux-persist';

//Middlewares
import onboardingStatusMiddleware from './features/onboarding/onboarding-status/onboardingStatus.middleware';
import configSliceMiddleware from './features/config/ConfigSlice.middleware';

//Storage
import { reduxStorage } from '@/utils/hooks/mmkv/useStorage';
import { RESET_STORE } from './store.actions';

//Migrations
import { storeMigrations } from './migrations';

const persistConfig = {
    key: 'root',
    storage: reduxStorage,
    whitelist: ['user', 'config', 'firstVisit'],
    timeout: 0,
    version: 1,
    migrate: createMigrate(storeMigrations, { debug: false }),
};

const notificationsPersistConfig = {
    key: 'notifications',
    storage: reduxStorage,
    whitelist: ['showNewNotificationsBadge', 'lastNotificationDate'],
    timeout: 0,
};

const persistedNotificationsReducer = persistReducer(
    notificationsPersistConfig,
    notificationsReducer,
);

const payPersistConfig = {
    key: 'pay',
    storage: reduxStorage,
    whitelist: [
        'cashinExpressReducer',
        'lastDebitCardReducer',
        'teenAccountsReducer',
        'rechargeReducer',
    ],
    timeout: 0,
};

const persistReferralsConfig = {
    key: 'referrals',
    storage: reduxStorage,
    whitelist: ['referralsProgramReducer'],
    timeout: 0,
};

const persistOnboardingConfig = {
    key: 'onboarding',
    storage: reduxStorage,
    whitelist: ['onboardingPrincipalStatus'],
    timeout: 0,
};

export const appReducer = combineReducers({
    onboarding: persistReducer(persistOnboardingConfig, onboardingReducers),
    auth: authReducer,
    pay: persistReducer(payPersistConfig, homeReducers),
    merchants: merchantsReducers,
    user: userReducer,
    notifications: persistedNotificationsReducer,
    commerce: commerceReducer,
    shared: sharedReducer,
    referrals: persistReducer(persistReferralsConfig, referralsReducer),
    contentCards: contentCardsReducer,
    config: configReducer,
    featureFlags: featureFlagsReducer,
    firstVisit: firstVisitReducer,
    benefits: benefitsReducer,
});

const rootReducer = (state: any, action: any) => {
    if (action.type === RESET_STORE) {
        const config = state?.config;
        const newState = appReducer(undefined, action);

        return {
            ...newState,
            config: config ?? newState.config,
        };
    }
    return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
            .prepend(configSliceMiddleware)
            .prepend(onboardingStatusMiddleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof appReducer>;
export type AppDispatch = typeof store.dispatch;
