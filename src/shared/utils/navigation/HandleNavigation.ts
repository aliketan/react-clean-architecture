import type { NavigateFunction } from 'react-router';

export function handleNavigation(
  event: React.MouseEvent<HTMLAnchorElement>,
  path: string,
  navigate: NavigateFunction
): void {
  event.preventDefault(); // Sayfanın yenilenmesini engeller
  navigate(path); // React Router ile yönlendirme yapar
}