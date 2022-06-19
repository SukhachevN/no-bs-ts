let userName: string = 'Nikita';
let hasLoggedIn: boolean = true;

userName += ' Sukhachev';

console.log(userName);

let myNumber: number = 10;

let myRegex: RegExp = /foo/;

const names: string[] = userName.split(' ');
const myValues: Array<number> = [1, 2, 3];

interface Person {
  first: string;
  last: string;
  cool?: boolean;
}

const myPerson: Person = {
  first: 'Nikita',
  last: 'Sukhachev',
  cool: true,
};

const ids: Record<number, string> = {
  10: 'a',
  20: 'b',
};

ids[30] = 'c';

if (ids[30] === 'd') {
}

for (let i = 0; i < 10; i++) {
  console.log(i);
}

[1, 2, 3].forEach((val) => console.log(val));
const out: number[] = [4, 5, 6].map((val) => val * 10);
