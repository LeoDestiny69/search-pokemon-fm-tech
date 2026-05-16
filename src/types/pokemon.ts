export type Attack = {
  name: string;
  type: string;
  damage: number;
};

export type PokemonAttacks = {
  fast: Attack[];
  special: Attack[];
};

export type Evolution = {
  id: string;
  name: string;
  image: string;
};

export type Pokemon = {
  id: string;
  number: string;
  name: string;
  image: string;
  types: string[];
  attacks: PokemonAttacks;
  evolutions: Evolution[] | null; // API อาจ return null เมื่อไม่มี evolution
};

export type PokemonResponse = {
  pokemon: Pokemon | null; // API return null เมื่อไม่พบ
};
