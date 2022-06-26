export function printToFile(text: string, callback: () => void): void {
  console.log(text);
  callback();
}

export type MutationFunction = (v: number) => number;

export function arrayMutate(
  numbers: number[],
  mutate: MutationFunction
): number[] {
  return numbers.map(mutate);
}

const myNewMutate: MutationFunction = (v) => v * 10;

console.log(arrayMutate([1, 2, 3], myNewMutate));

export const createAdder = (num: number): MutationFunction => {
  return (val: number) => val + num;
};

const add = createAdder(1);
console.log(add(100));
console.log(add(200));
console.log(add(400));
