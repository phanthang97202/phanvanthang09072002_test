export const useLocalStorage = () => {
  const setLocalStorage = <T>(key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const getLocalStorage = (key: string) => {
    if (localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key) ?? "");
    } else {
      return null;
    }
  };

  const removeLocalStorage = (key: string) => {
    localStorage.removeItem(key);
  };

  return {
    setLocalStorage,
    getLocalStorage,
    removeLocalStorage,
  };
};
