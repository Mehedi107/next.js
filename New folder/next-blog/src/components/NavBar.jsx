import getSessionToken from '@/lib/auth';
import NavLink from './NavLink';
import { logout } from '@/actions/auth';

export default async function NavBar() {
  const user = await getSessionToken();

  return (
    <nav className="flex justify-between items-center p-5 bg-blue-950 text-white">
      {/* Logo */}
      <NavLink href="/" label="Home" />

      {/* Links */}
      <div className="flex justify-end items-center gap-5">
        <NavLink href="/posts/create" label="Create Post" />
        <NavLink href="/dashboard" label="Dashboard" />
        {user && (
          <button className="nav-link" onClick={logout}>
            Logout
          </button>
        )}
        {!user && <NavLink href="/register" label="Register" />}
        {!user && <NavLink href="/login" label="Login" />}
      </div>
    </nav>
  );
}
