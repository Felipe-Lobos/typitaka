import './styles/Header.css'
import { ThemeSelector } from './ThemeSelector';

export function Header() {
  return (
    <div className="header">
      <h1>TipyTaka</h1>
      <ThemeSelector />
    </div>
  );
}
