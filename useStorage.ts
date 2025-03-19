import { MMKV, useMMKVObject } from 'react-native-mmkv';
import { Storage } from 'redux-persist';
import { storageKeys } from './mmkvKeys';

export const storage = new MMKV();

export const reduxStorage: Storage = {
    setItem: (key, value) => {
        storage.set(key, value);
        return Promise.resolve(true);
    },
    getItem: (key) => {
        const value = storage.getString(key);
        return Promise.resolve(value);
    },
    removeItem: (key) => {
        storage.delete(key);
        return Promise.resolve();
    },
};

export const useStorage = () => {
    const [migratedAsyncStorage, setMigratedAsyncStorage] =
        useMMKVObject<boolean>(storageKeys.kMigratedAsyncStorage);
    const [migratedSecureStorage, setMigratedSecureStorage] =
        useMMKVObject<boolean>(storageKeys.kMigratedSecureStorage);

    return {
        storage,
        migratedAsyncStorage,
        setMigratedAsyncStorage,
        migratedSecureStorage,
        setMigratedSecureStorage,
    };
};
