// Utility functions for access iOS keychain services & Android sharedPreferences encrypted stores.
import * as SecureStore from 'expo-secure-store';

// returns a promise
export const save = (
	key: string,
	value: string,
	secureStoreOptions?: SecureStore.SecureStoreOptions
): Promise<void> => SecureStore.setItemAsync(key, value, secureStoreOptions);

// returns a promise
export const getValueFor = (key: string): Promise<string | null> => SecureStore.getItemAsync(key);
