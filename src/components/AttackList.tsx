import { Attack } from "@/types/pokemon";

type AttackListProps = {
  fast: Attack[];
  special: Attack[];
};

export default function AttackList({ fast, special }: AttackListProps) {
  return (
    <div className="attack-list">
      <AttackSection title="Fast Attacks" attacks={fast} />
      <AttackSection title="Special Attacks" attacks={special} />
    </div>
  );
}

function AttackSection({ title, attacks }: { title: string; attacks: Attack[] }) {
  if (attacks.length === 0) return null;

  return (
    <div className="attack-section">
      <h3 className="attack-section-title">{title}</h3>
      <table className="attack-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Damage</th>
          </tr>
        </thead>
        <tbody>
          {attacks.map((attack) => (
            <tr key={attack.name}>
              <td>{attack.name}</td>
              <td>
                <span className="type-badge">{attack.type}</span>
              </td>
              <td>{attack.damage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
