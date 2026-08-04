import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Button } from "./retroui/Button";

export default function NavBar() {
  const { auth, logout } = useAuth();

  return (
    <header className="flex items-center justify-between border-b border-neutral-200 px-8 py-4">
      <Link to="/" className="text-xl font-bold">
        ⬡
      </Link>

      {auth && (
        <nav className="flex gap-2">
          <Link to="/dashboard" className="rounded px-3 py-1 hover:bg-neutral-100">
            Dashboard
          </Link>
          <Link to="/hub" className="rounded px-3 py-1 hover:bg-neutral-100">
            Hub
          </Link>
        </nav>
      )}

      <div className="flex gap-2">
        {auth ? (
          <>
            <span className="rounded px-3 py-1">{auth.name}</span>
            <Button variant="primary" onClick={logout}>
              Sair
            </Button>
          </>
        ) : (
          <>
            <Button variant="secondary" asChild>
              <Link to="/login">Entrar</Link>
            </Button>
            <Button variant="primary" asChild>
              <Link to="/register">Registrar</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
