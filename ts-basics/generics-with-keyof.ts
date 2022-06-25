function pluck<DataType, KeyType extends keyof DataType>(
  items: DataType[],
  key: KeyType
): DataType[KeyType][] {
  return items.map((item) => item[key]);
}

const dogs = [
  { name: 'Mimi', age: 12 },
  { name: 'Herk', age: 13 },
];

console.log(pluck(dogs, 'name'));

interface BaseEvent {
  time: number;
  user: string;
}

interface EventMap {
  addToCard: BaseEvent & { quantity: number; productID: string };
  checkout: BaseEvent;
}

function sendEvent<Name extends keyof EventMap>(
  name: Name,
  data: EventMap[Name]
): void {
  console.log([name, data]);
}

sendEvent('addToCard', {
  quantity: 2,
  productID: 'pizza',
  time: 10,
  user: 'Yosh',
});

sendEvent('checkout', {
  time: 11,
  user: 'Yosh',
});
