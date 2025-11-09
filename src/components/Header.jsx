import './styles/Header.css'
import { ThemeSelector } from './ThemeSelector';

export function Header() {
  return (
    <header id="header">
      <h1>TypiTaka</h1>
      <ThemeSelector />
    </header>
  );
}
