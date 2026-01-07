'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-black text-white">
      <h2 className="text-2xl font-bold mb-4">Algo deu errado!</h2>
      <button
        onClick={() => reset()}
        className="rounded-full bg-white px-6 py-2 text-black transition hover:bg-neutral-200"
      >
        Tentar novamente
      </button>
    </div>
  );
}
