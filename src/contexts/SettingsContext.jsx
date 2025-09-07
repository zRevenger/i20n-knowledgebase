import { createContext, useContext } from "react";
import UseLocalStorage from "../utils/UseLocalStorage";
import { themes } from "../utils/theme.js";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
    // Tema (light/dark)
    const [theme, setTheme] = UseLocalStorage("theme", "dark");
    const [sortOption, setSortOption] = UseLocalStorage("sortOption", "");

    // Tema corrente dal file themes.js
    const currentTheme = themes[theme];

    return (
        <SettingsContext.Provider
            value={{
                theme,
                setTheme,
                sortOption,
                setSortOption,
                currentTheme,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    return useContext(SettingsContext);
}