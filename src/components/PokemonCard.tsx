import Image from "next/image";
import { Pokemon } from "@/types/pokemon";
import AttackList from "./AttackList";
import EvolutionList from "./EvolutionList";

type PokemonCardProps = {
  pokemon: Pokemon;
};

// รับเฉพาะ valid Pokemon data — ไม่มี loading/error/state logic ภายใน
export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <div className="pokemon-card">
      <div className="pokemon-header">
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          width={160}
          height={160}
          className="pokemon-image"
          priority
        />
        <div className="pokemon-info">
          <span className="pokemon-number">#{pokemon.number}</span>
          <h2 className="pokemon-name">{pokemon.name}</h2>
          <div className="type-list">
            {pokemon.types.map((type) => (
              <span key={type} className="type-badge">
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>

      <AttackList
        fast={pokemon.attacks.fast}
        special={pokemon.attacks.special}
      />

      <EvolutionList evolutions={pokemon.evolutions} />
    </div>
  );
}
