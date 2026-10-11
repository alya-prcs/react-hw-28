import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import css from './Layout.module.css';

const linkClass = ({ isActive }) =>
  isActive ? `${css.link} ${css.active}` : css.link;

export default function Layout() {
  return (
    <>
      <header className={css.header}>
        <nav className={css.nav}>
          <NavLink to="/" end className={linkClass}>
            Головна
          </NavLink>
          <NavLink to="/movies" className={linkClass}>
            Фільми
          </NavLink>
        </nav>
      </header>
      <main className={css.main}>
        <Suspense fallback={<p>Завантаження…</p>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}
