export const THEME_KEY = "aifeiler.theme";

export type Theme = "dark" | "light";

export function getStoredTheme(): Theme {
  try {
    return window.localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

export function applyTheme(theme: Theme) {
  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  try {
    window.localStorage.setItem(THEME_KEY, theme);
  } catch {
    // localStorage unavailable, skip persisting
  }
}

export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_KEY
)});if(t==="light")document.documentElement.setAttribute("data-theme","light");}catch(e){}})();`;
