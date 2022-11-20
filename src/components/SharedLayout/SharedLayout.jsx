import css from './SharedLayout.module.css';
import { NavItem } from './SharedLayout.styled';

export default function SharedLayout() {
  return (
    <nav className={css.nav}>
      <NavItem to="/">Home</NavItem>
      <NavItem to="/movies">Movies</NavItem>
    </nav>
  );
}
