"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Evolution } from "@/types/pokemon";

type EvolutionListProps = {
  evolutions: Evolution[] | null;
};

export default function EvolutionList({ evolutions }: EvolutionListProps) {
  const router = useRouter();

  // ถ้าไม่มี evolutions ไม่ render section นี้
  if (!evolutions || evolutions.length === 0) return null;

  function handleEvolutionClick(name: string) {
    // router.push บันทึก history ให้ user กด back กลับได้
    router.push(`/?name=${name.toLowerCase()}`);
  }

  return (
    <div className="evolution-list">
      <h3 className="evolution-title">Evolutions</h3>
      <div className="evolution-items">
        {evolutions.map((evo) => (
          <button
            key={evo.id}
            className="evolution-item"
            onClick={() => handleEvolutionClick(evo.name)}
            title={`ดูข้อมูล ${evo.name}`}
          >
            <Image
              src={evo.image}
              alt={evo.name}
              width={64}
              height={64}
              className="evolution-image"
            />
            <span className="evolution-name">{evo.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
