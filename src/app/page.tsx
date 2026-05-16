"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@apollo/client/react";
import { GET_POKEMON } from "@/lib/queries";
import { PokemonResponse } from "@/types/pokemon";
import SearchInput from "@/components/SearchInput";
import PokemonCard from "@/components/PokemonCard";

export default function HomePage() {
  return (
    <main className="main">
      <div className="container">
        <header className="app-header">
          <h1 className="app-title">Pokémon Search</h1>
          <p className="app-subtitle">ค้นหาข้อมูล Pokémon ด้วยชื่อ</p>
        </header>
        {/* Suspense ครอบส่วนที่ใช้ useSearchParams เพื่อให้ Next.js build ผ่าน */}
        <Suspense fallback={null}>
          <PokemonSearch />
        </Suspense>
      </div>
    </main>
  );
}

// แยก component ที่ใช้ useSearchParams ออกมา เพื่อให้ครอบด้วย Suspense ได้ชัดเจน
function PokemonSearch() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") ?? "";

  // skip: !name — ไม่ยิง query เมื่อยังไม่มี query param
  const { data, loading, error } = useQuery<PokemonResponse>(GET_POKEMON, {
    variables: { name: name.toLowerCase() },
    skip: !name,
  });

  function renderResult() {
    // State 1: ไม่มี query param
    if (!name) {
      return (
        <div className="state-message">
          <p>ค้นหา Pokémon เพื่อเริ่มต้น</p>
        </div>
      );
    }

    // State 2: กำลังโหลด
    if (loading) {
      return (
        <div className="state-message">
          <p>กำลังโหลด...</p>
        </div>
      );
    }

    // State 3: เกิด error
    if (error) {
      return (
        <div className="state-message state-error">
          <p>Something went wrong</p>
          <p className="state-detail">{error.message}</p>
        </div>
      );
    }

    // State 4: ไม่พบ Pokémon
    if (data && data.pokemon === null) {
      return (
        <div className="state-message">
          <p>ไม่พบ Pokémon ชื่อ &ldquo;{name}&rdquo;</p>
        </div>
      );
    }

    // State 5: มีข้อมูล — ส่งเฉพาะ valid data ลง PokemonCard
    if (data?.pokemon) {
      return <PokemonCard pokemon={data.pokemon} />;
    }

    return null;
  }

  return (
    <>
      <SearchInput />
      <section className="result-section">{renderResult()}</section>
    </>
  );
}
