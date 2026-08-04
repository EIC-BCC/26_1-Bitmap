import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/retroui/Button";
import { Input } from "../components/retroui/Input";

export default function Login() {
  const [email, setEmail] = useState("aluno@exemplo.com");
  const [password, setPassword] = useState("senha123");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch {
      setError("E-mail ou senha inválidos.");
    }
  }

  return (
    <div className="mx-auto mt-16 max-w-sm px-8">
      <h1 className="mb-6 text-3xl font-bold">Entrar</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" variant="primary" className="w-full justify-center">
          Entrar
        </Button>
      </form>
      <p className="mt-4 text-sm text-neutral-600">
        Não tem conta? <Link to="/register" className="underline">Registrar</Link>
      </p>
      <p className="mt-2 text-xs text-neutral-400">
        Conta de demonstração pré-preenchida.
      </p>
    </div>
  );
}
