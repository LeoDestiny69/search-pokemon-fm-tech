"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlName = searchParams.get("name") ?? "";

  const [inputValue, setInputValue] = useState(urlName);
  // committedValue = ค่าล่าสุดที่เรา commit ไปยัง URL เพื่อแยกว่า URL เปลี่ยนจากเราหรือจาก evolution
  const [committedValue, setCommittedValue] = useState(urlName);
  const [prevUrlName, setPrevUrlName] = useState(urlName);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // React-approved pattern: sync state เมื่อ urlName เปลี่ยน (ทำใน render ไม่ใช่ useEffect)
  if (urlName !== prevUrlName) {
    setPrevUrlName(urlName);
    // ถ้า urlName ไม่ตรงกับ committedValue → URL เปลี่ยนจากภายนอก (evolution click)
    if (urlName !== committedValue) {
      setInputValue(urlName);
      setCommittedValue(urlName);
    }
    // ถ้าตรงกัน → URL catch up กับที่เรา commit เอง → ไม่ต้อง setInputValue
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInputValue(value);

    // debounce ~300ms เพื่อลดจำนวน URL updates ระหว่างพิมพ์
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      const trimmed = value.trim();
      // บันทึกว่าเรากำลัง commit ค่านี้ ก่อน router.replace
      setCommittedValue(trimmed);
      const params = new URLSearchParams();
      if (trimmed) params.set("name", trimmed);
      // router.replace ไม่สร้าง history entry ซ้ำ
      router.replace(`/?${params.toString()}`);
    }, 300);
  }

  return (
    <div className="search-wrapper">
      <input
        id="pokemon-search-input"
        type="text"
        placeholder="ค้นหา Pokémon เช่น pikachu..."
        value={inputValue}
        onChange={handleChange}
        className="search-input"
        autoComplete="off"
      />
    </div>
  );
}
