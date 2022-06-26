import houses from './houses.json';

interface House {
  name: string;
  planets: string | string[];
}

interface HouseWithID extends House {
  id: number;
}

function findHouses(
  input: string | House[],
  filter?: (house: House) => boolean
): HouseWithID[] {
  const houses = typeof input === 'string' ? JSON.parse(input) : input;
  const filteredHouses = filter ? houses.filter(filter) : houses;
  return filteredHouses.map((house: House) => ({ ...house, id: Date.now() }));
}

console.log(
  findHouses(JSON.stringify(houses), ({ name }) => name === 'Atreides')
);

console.log(findHouses(houses, ({ name }) => name === 'Harkonnen'));
