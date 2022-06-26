function addNumbers(a: number, b: number): number {
  return a + b;
}

export const addStrings = (first: string, second: string = ''): string =>
  `${first} ${second}`;

export const format = (title: string, param: string | number): string =>
  `${title} ${param}`;

export const printFormat = (title: string, param: string | number): void =>
  console.log(`${title} ${param}`);

export const fetchData = (url: string): Promise<string> =>
  Promise.resolve(`data from ${url}`);

function introduce(salutation: string, ...names: string[]): string {
  return `${salutation} ${names.join(', ')}`;
}

export function getName(user: { first: string; last: string }): string {
  return `${user?.first} ${user?.last}`;
}

export default addNumbers;
