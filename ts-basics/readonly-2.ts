class Doggy {
  constructor(public readonly name: string, public readonly age: number) {}
}

const yosh = new Doggy('Yosh', 5);
console.log(yosh.name);

class DogList {
  private doggies: Doggy[] = [];

  static instance: DogList = new DogList();

  private constructor() {}

  public addDog(dog: Doggy) {
    DogList.instance.doggies.push(dog);
  }

  getDogs() {
    return this.doggies;
  }
}

DogList.instance.addDog(yosh);
console.log(DogList.instance.getDogs());
