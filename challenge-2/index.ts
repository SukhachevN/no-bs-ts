const customForEach = <T>(arr: T[], func: (v: T) => void): void => {
  arr.reduce((prev, next) => {
    func(next);
    return undefined;
  }, undefined);
};

customForEach([1, 2, 3], (v) => console.log(v * 10));

const customFilter = <T>(arr: T[], func: (v: T) => boolean): T[] => {
  const newArr: T[] = [];
  arr.reduce((prev, next) => {
    func(next) && newArr.push(next);
    return undefined;
  }, undefined);
  return newArr;
};

const filtered = customFilter([1, 2, 3, 4, 5], (v) => v > 3);
console.log(filtered);

const customMap = <T, X>(arr: T[], func: (v: T) => X): X[] => {
  const newArr: X[] = [];
  arr.reduce((prev, next) => {
    newArr.push(func(next));
    return undefined;
  }, undefined);
  return newArr;
};

const mapped = customMap([1, 2, 3, 4], (v) => `${v * 2}`);
console.log(mapped);
