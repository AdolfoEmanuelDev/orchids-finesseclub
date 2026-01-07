import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-black text-white">
      <h2 className="text-4xl font-bold mb-4">404</h2>
      <p className="text-xl mb-8">Página não encontrada</p>
      <Link
        href="/"
        className="rounded-full bg-white px-6 py-2 text-black transition hover:bg-neutral-200"
      >
        Voltar para a Home
      </Link>
    </div>
  );
}
