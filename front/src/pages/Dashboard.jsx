import { Link } from "react-router-dom";
import { useApiQuery } from "../hooks/useApiQuery";
import ProgressBar from "../components/ProgressBar";
import { Button } from "../components/retroui/Button";

export default function Dashboard() {
  const { data: trail } = useApiQuery("trail", "/trail");

  return (
    <div className="bg-neutral-100 px-8 py-10">
      <h1 className="mb-6 text-3xl font-bold">Dashboard - Trilhas</h1>

      {trail && (
        <div className="rounded bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold">{trail.title}</h2>
          <div className="flex h-40 flex-col items-start justify-end gap-3 rounded bg-neutral-200 p-4">
            <p className="text-neutral-700">{trail.description}</p>
            <div className="flex w-full items-center justify-end gap-4">
              <Button variant="secondary" asChild>
                <Link to="/hub">Acessar</Link>
              </Button>
              <ProgressBar percent={trail.progressPercent} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
