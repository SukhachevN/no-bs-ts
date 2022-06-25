enum loadingState {
  'beforeLoad',
  'loading',
  'loaded',
}

const isLoading = (state: loadingState) => state === loadingState.loading;

console.log(isLoading(loadingState.beforeLoad));
console.log(isLoading(loadingState.loading));

function rollDice(dice: 1 | 2 | 3): number {
  let pip = 0;
  for (let i = 0; i < dice; i++) {
    pip += Math.floor(Math.random() * 5 + 1);
  }
  return pip;
}

console.log(rollDice(2));
function sendEvent(name: 'addToCart', data: { productId: number }): void;
function sendEvent(name: 'checkout', data: { cartCount: number }): void;
function sendEvent(name: string, data: unknown) {
  console.log(`${name} ${JSON.stringify(data)}`);
}

sendEvent('addToCart', { productId: 1 });
