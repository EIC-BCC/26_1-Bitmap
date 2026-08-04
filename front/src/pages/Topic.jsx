import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useApiQuery } from "../hooks/useApiQuery";
import api from "../lib/axios";
import { Button } from "../components/retroui/Button";

export default function Topic() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data: topic } = useApiQuery(["topic", id], `/topics/${id}`);
  const [selected, setSelected] = useState({});
  const [results, setResults] = useState({});

  async function submit(stepId) {
    const answer = selected[stepId];
    if (answer === undefined) return;

    const { data: result } = await api.post(`/steps/${stepId}/submit`, { answer: String(answer) });
    setResults((prev) => ({ ...prev, [stepId]: result }));
    queryClient.invalidateQueries({ queryKey: ["trail"] });
  }

  if (!topic) return null;

  return (
    <div className="mx-auto max-w-2xl px-8 py-10">
      <Link to="/hub" className="text-sm text-neutral-500">← Voltar ao Hub</Link>
      <h1 className="mt-2 mb-6 text-3xl font-bold">{topic.title}</h1>

      {topic.theoreticalContent && (
        <div className="mb-8 whitespace-pre-line rounded bg-neutral-100 p-5 text-neutral-800">
          {topic.theoreticalContent}
        </div>
      )}

      <div className="flex flex-col gap-6">
        {topic.steps.map((step, i) => {
          const result = results[step.id];
          return (
            <div key={step.id} className="rounded border border-neutral-300 p-5">
              <p className="mb-3 font-medium">{i + 1}. {step.statement}</p>
              <div className="flex flex-col gap-2">
                {step.options.map((opt, idx) => (
                  <label
                    key={idx}
                    className={`flex items-center gap-2 rounded border px-3 py-2 ${
                      selected[step.id] === idx ? "border-black" : "border-neutral-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`step-${step.id}`}
                      checked={selected[step.id] === idx}
                      onChange={() => setSelected((prev) => ({ ...prev, [step.id]: idx }))}
                    />
                    {opt}
                  </label>
                ))}
              </div>

              <Button variant="primary" className="mt-3 text-sm" onClick={() => submit(step.id)}>
                Responder
              </Button>

              {result && (
                <p className={`mt-2 text-sm font-medium ${result.correct ? "text-green-600" : "text-red-600"}`}>
                  {result.correct ? "Correto!" : `Incorreto. Resposta certa: ${step.options[result.correctAnswer]}`}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
