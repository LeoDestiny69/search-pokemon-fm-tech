# search-pokemon-fm-tech

แอปค้นหาข้อมูล Pokémon สร้างด้วย Next.js + TypeScript + Apollo Client

## วิธีติดตั้งและรัน

```bash
# 1. Clone repository
git clone <your-repo-url>
cd search-pokemon-fm-tech

# 2. ติดตั้ง dependencies
npm install

# 3. รัน development server
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000) ในเบราว์เซอร์

## Features

- ค้นหา Pokémon ด้วยชื่อ (sync กับ URL query param)
- Reload หน้าแล้ว state ยังอยู่
- แสดง Attacks (Fast + Special) และ Evolutions
- กดชื่อ Evolution เพื่อดูข้อมูล Pokémon ตัวนั้น
- จัดการ loading / error / not found / empty states

## เหตุผลในการเลือก Tech Stack

| Technology | เหตุผล |
|---|---|
| **Next.js (App Router)** | รองรับ file-based routing, Server/Client Components แยกกันชัดเจน, deploy บน Vercel ได้ทันที |
| **TypeScript** | ช่วย type-check ข้อมูลจาก API ให้ถูกต้อง ลด runtime error |
| **Apollo Client** | รองรับ GraphQL โดยตรง, มี InMemoryCache built-in, `useQuery` hook ใช้งานง่าย |
| **CSS (global)** | ไม่ต้องการ library เพิ่ม, อ่านง่าย, control ได้เต็มที่ |

## วิธี Deploy บน Vercel

1. Push โค้ดขึ้น GitHub (public repository)
2. ไปที่ [vercel.com](https://vercel.com) → Import Git Repository
3. เลือก repo นี้ → Deploy
4. Vercel จะ detect Next.js อัตโนมัติ ไม่ต้องตั้งค่าเพิ่ม

> **Note:** ไม่มี environment variables ที่ต้องตั้งค่า เพราะ GraphQL endpoint เป็น public API

## GraphQL API

ใช้ [graphql-pokemon2](https://graphql-pokemon2.vercel.app/) — public Pokemon GraphQL API

```graphql
query GetPokemon($name: String!) {
  pokemon(name: $name) {
    id, number, name, image, types
    attacks { fast { name, type, damage } special { name, type, damage } }
    evolutions { id, name, image }
  }
}
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout + Providers
│   ├── providers.tsx   # ApolloProvider (client component)
│   ├── page.tsx        # หน้าหลัก — จัดการ all UI states
│   └── globals.css     # Global styles
├── components/
│   ├── SearchInput.tsx  # Input + URL sync + debounce
│   ├── PokemonCard.tsx  # Pokemon detail (pure display)
│   ├── AttackList.tsx   # Fast/Special attacks table
│   └── EvolutionList.tsx # Evolutions + navigate on click
├── lib/
│   ├── apolloClient.ts  # Apollo Client setup
│   └── queries.ts       # GraphQL queries
└── types/
    └── pokemon.ts       # TypeScript types
```
