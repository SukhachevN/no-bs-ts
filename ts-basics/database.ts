interface Database {
  get(id: string): string;
  set(id: string, value: string): void;
}

interface Persistable {
  saveToString(): string;
  restoreFromString(storedState: string): void;
}

class InMemoryDatabase implements Database {
  protected db: Record<string, string> = {};
  get(id: string): string {
    return this.db[id];
  }
  set(id: string, value: string): void {
    this.db[id] = value;
  }
}

class PersistentMemoryDB extends InMemoryDatabase implements Persistable {
  saveToString(): string {
    return JSON.stringify(this.db);
  }
  restoreFromString(storedState: string): void {
    this.db = JSON.parse(storedState);
  }
}

const myDB = new PersistentMemoryDB();
myDB.set('1', 'test');
console.log(myDB.get('1'));
const savedState = myDB.saveToString();
myDB.set('1', 'not test');

const myOtherDB = new PersistentMemoryDB();
myOtherDB.restoreFromString(savedState);
console.log(myDB.get('1'));
console.log(myOtherDB.get('1'));
