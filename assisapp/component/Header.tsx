"use client";
import { useRouter } from "next/navigation";

export default function Header({ title }: { title: string }) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-3 mb-6">
      <button onClick={() => router.back()} className="text-xl">←</button>
      <h1 className="text-2xl font-bold flex-1 text-center">
        ⭐ {title} ⭐
      </h1>
    </div>
  );
}
