type MyFlexibleDogInfo = {
  name: string;
  [key: string]: string | number;
};

const dog: MyFlexibleDogInfo = {
  name: 'KG',
  breed: 'Mutt',
  age: 10,
};

interface DogInfo {
  name: string;
  age: number;
}

type OptionFlags<Type> = {
  [Property in keyof Type]: boolean;
};

type DogInfoOptions = OptionFlags<DogInfo>;

type Listeners<Type> = {
  [Property in keyof Type as `on${Capitalize<string & Property>}Change`]?: (
    newValue: Type[Property]
  ) => void;
} & {
  [Property in keyof Type as `on${Capitalize<string & Property>}Delete`]?: (
    newValue: Type[Property]
  ) => void;
};

function listenToObj<T>(obj: T, listener: Listeners<T>): void {
  throw 'needs to be implemented';
}

const lg: DogInfo = {
  name: 'LG',
  age: 13,
};

type DogInfoListeners = Listeners<DogInfo>;

listenToObj(lg, {
  onNameChange: (v: string) => {},
  onAgeChange: (v: number) => {},
});
