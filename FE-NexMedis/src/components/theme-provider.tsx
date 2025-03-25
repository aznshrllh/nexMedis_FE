import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "nexmedis-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    console.log("Before removing classes:", root.className);

    // Remove both classes first
    root.classList.remove("light", "dark");

    console.log("After removing classes:", root.className);

    // Set the theme class
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      console.log("System theme detected as:", systemTheme);
      root.classList.add(systemTheme);
    } else {
      console.log("Setting explicit theme:", theme);
      root.classList.add(theme);
    }

    console.log("Final classes:", root.className);

    // Force a re-render of the app to ensure theme changes are applied
    document.body.style.display = "none";
    setTimeout(() => {
      document.body.style.display = "";
    }, 0);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      console.log("Setting theme to:", theme);
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
