type Name = {
  first: string;
  last: string;
};

function addFullName(name: Name): Name & {
  fullName: string;
} {
  return {
    ...name,
    fullName: `${name.first} ${name.last}`,
  };
}

function permuteRows<T extends (...args: any[]) => any>(
  iteratorFunc: T,
  data: Parameters<T>[0][]
): ReturnType<T>[] {
  return data.map((data: Parameters<T>[0]) => iteratorFunc(data));
}

console.log(permuteRows(addFullName, [{ first: 'Binh', last: 'Pham' }]));

function createObjects<T extends new (...args: any[]) => any>(
  ObjectType: T,
  data: ConstructorParameters<T>[0][]
): InstanceType<T>[] {
  return data.map((data: ConstructorParameters<T>[0]) => new ObjectType(data));
}

class PersonWithFullName {
  constructor(public name: { first: string; last: string }) {}

  get fullName() {
    return `${this.name.first} ${this.name.last}`;
  }
}

const objs = createObjects(PersonWithFullName, [
  { first: 'Binh', last: 'Pham' },
]);

console.log(objs.map((o) => o.fullName));
