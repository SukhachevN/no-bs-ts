function printIngridient(quantity: string, ingridient: string, extra?: string) {
  console.log(`${quantity} ${ingridient} ${extra ? ` ${extra}` : ''} `);
}

printIngridient('1c', 'flour');
printIngridient('1c', 'sugar', 'more');

interface User {
  id: string;
  info?: {
    email?: string;
  };
}

function getEmail(user: User): string {
  if (user.info) {
    return user.info!.email!;
  }
  return '';
}

function getEmailEasy(user: User): string {
  return user?.info?.email ?? '';
}

function addWithCallback(x: number, y: number, callback?: () => void) {
  console.log([x, y]);
  callback?.();
}
