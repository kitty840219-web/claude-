export const DARK_ROUTES = ["/", "/about", "/tarot"];

export function isDarkRoute(pathname: string) {
  return DARK_ROUTES.some((route) => (route === "/" ? pathname === "/" : pathname.startsWith(route)));
}
