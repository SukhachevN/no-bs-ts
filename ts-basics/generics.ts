function simpleState<T>(initial: T): [() => T, (v: T) => void] {
  let val = initial;
  return [() => val, (newVal) => (val = newVal)];
}

const [stateOneGetter, stateOneSetter] = simpleState(10);
console.log(stateOneGetter());
stateOneSetter(20);
console.log(stateOneGetter());

const [stateTwoGetter, stateTwoSetter] = simpleState<string | null>(null);
console.log(stateTwoGetter());
stateTwoSetter('test test');
console.log(stateTwoGetter());
console.log(stateOneGetter());

interface Rank<RankItem> {
  item: RankItem;
  rank: number;
}

function ranker<RankItem>(
  items: RankItem[],
  rank: (v: RankItem) => number
): RankItem[] {
  const ranks: Rank<RankItem>[] = items.map((item) => ({
    item,
    rank: rank(item),
  }));
  ranks.sort((a, b) => a.rank - b.rank);
  return ranks.map((rank) => rank.item);
}

interface Pokemon {
  name: string;
  hp: number;
}

const pokemon: Pokemon[] = [
  {
    name: 'Bulbasaour',
    hp: 20,
  },
  {
    name: 'pikachu',
    hp: 10,
  },
];

const ranks = ranker(pokemon, ({ hp }) => hp);

console.log(ranks);
