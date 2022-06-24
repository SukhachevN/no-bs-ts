type ThreeDCoordinate = [x: number, y: number, z: number];

function add3DCoordinates(
  c1: ThreeDCoordinate,
  c2: ThreeDCoordinate
): ThreeDCoordinate {
  return [c1[0] + c2[0], c1[1] + c2[1], c1[2] + c2[2]];
}

console.log(add3DCoordinates([1, 2, 3], [3, 4, 5]));

function simpleStringState(
  initial: string
): [() => string, (v: string) => void] {
  let str = initial;
  return [() => str, (newVal) => (str = newVal)];
}

const [getStrFirst, setStrFirst] = simpleStringState('init-1');
const [getStrSecond, setStrSecond] = simpleStringState('init-2');

console.log(getStrFirst());
setStrFirst('notInit-1');
console.log(getStrFirst());

console.log(getStrSecond());
setStrSecond('notInit-2');
console.log(getStrSecond());
console.log(getStrFirst());
