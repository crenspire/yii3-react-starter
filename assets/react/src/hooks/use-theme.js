import * as React from "react"

const STORAGE_KEY = "theme"
const listeners = new Set()

function systemPrefersDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

function readTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored
    }
  } catch {
    // Storage can be unavailable, e.g. in private browsing.
  }
  return "system"
}

function apply(theme) {
  const dark = theme === "dark" || (theme === "system" && systemPrefersDark())
  document.documentElement.classList.toggle("dark", dark)
}

/**
 * Light, dark or system theme, stored in localStorage and shared by every component that uses the hook.
 * The root view applies the stored theme before React loads to avoid a flash of the wrong theme.
 */
export function useTheme() {
  const [theme, setThemeState] = React.useState(readTheme)

  React.useEffect(() => {
    listeners.add(setThemeState)
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const onSystemChange = () => readTheme() === "system" && apply("system")
    media.addEventListener("change", onSystemChange)

    return () => {
      listeners.delete(setThemeState)
      media.removeEventListener("change", onSystemChange)
    }
  }, [])

  const setTheme = React.useCallback((next) => {
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // The theme still applies for this page.
    }
    apply(next)
    listeners.forEach((listener) => listener(next))
  }, [])

  const resolvedTheme = theme === "system" ? (systemPrefersDark() ? "dark" : "light") : theme

  return { theme, resolvedTheme, setTheme }
}
