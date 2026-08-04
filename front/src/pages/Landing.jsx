export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 px-8 py-24 text-center">
      <div className="flex h-64 w-96 items-center justify-center border-2 border-black bg-neutral-200 text-6xl">
        🖥️
      </div>
      <h1 className="text-5xl font-bold">Boas Vindas!</h1>
      <p className="max-w-md text-neutral-600">
        Plataforma de apoio ao estudo autônomo de Matemática Discreta.
      </p>
    </div>
  );
}
