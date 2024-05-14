import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useReducer } from "react";

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null]
): UseStateHook<T> {
  return useReducer(
    (
      state: [boolean, T | null],
      action: T | null = null
    ): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: string | null) {
  if (value == null) {
    await AsyncStorage.removeItem(key);
  } else {
    await AsyncStorage.setItem(key, value);
  }
}

export function useStorageState<T = string>(key: string): UseStateHook<T> {
  // Public
  const [state, setState] = useAsyncState<T>();

  // Get => useQuery?
  useEffect(() => {
    (async () => {
      const item = await AsyncStorage.getItem(key);
      let value;
      try {
        if (!item) throw new Error();
        value = JSON.parse(item);
      } catch {
        value = item;
      }
      setState(value);
    })();
  }, [key]);

  // Set => useMutation?
  const setValue = useCallback(
    async (value: T | null) => {
      setState(value);
      setStorageItemAsync(
        key,
        value === null
          ? null
          : typeof value === "string"
          ? value
          : JSON.stringify(value)
      );
    },
    [key]
  );

  return [state, setValue];
}
