import { Link } from "react-router-dom";
import { useApiQuery } from "../hooks/useApiQuery";

const TYPE_ICON = {
  THEORETICAL: "📘",
  PRACTICAL: "⚡",
  REVIEW: "🛡️",
};

export default function Hub() {
  const { data: trail } = useApiQuery("trail", "/trail");

  return (
    <div className="px-8 py-10">
      <h1 className="mb-2 text-3xl font-bold">Trilha - Conteúdo</h1>
      {trail && <p className="mb-6 text-neutral-600">{trail.title}</p>}

      <div className="flex flex-col gap-3">
        {trail?.topics.map((topic) => (
          <Link
            key={topic.id}
            to={`/topico/${topic.id}`}
            className={`flex items-center justify-between rounded border px-5 py-4 hover:bg-neutral-50 ${
              topic.completed ? "border-green-400 bg-green-50" : "border-neutral-300"
            }`}
          >
            <span className="flex items-center gap-3">
              <span className="text-xl">{TYPE_ICON[topic.type]}</span>
              <span className="font-medium">{topic.title}</span>
            </span>
            <span>{topic.completed ? "✅ Concluído" : "Acessar →"}</span>
          </Link>
        ))}
      </div>

      {trail && (
        <p className="mt-6 text-lg font-bold">{trail.progressPercent}% concluído</p>
      )}
    </div>
  );
}
