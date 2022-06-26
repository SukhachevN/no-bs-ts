function myLogFunction() {
  return (str: string) => console.log(str);
}

const logger = myLogFunction();
logger('Test');

function createLoggerClass() {
  return class MyLoggerClass {
    private completeLog: string = '';
    log(str: string) {
      console.log(str);
      this.completeLog += str + '\n';
    }
    dumpLog() {
      return this.completeLog;
    }
  };
}

const MyLogger = createLoggerClass();
const secondLogger = new MyLogger();

secondLogger.log('test 2');

console.log(secondLogger.dumpLog());

function CreateSimpleMemoryDataBase<T>() {
  return class SimpleMemoryDatabase {
    private db: Record<string, T> = {};

    set(id: string, value: T) {
      this.db[id] = value;
    }
    get(id: string): T {
      return this.db[id];
    }

    getObject(): object {
      return this.db;
    }
  };
}

const StringDatabase = CreateSimpleMemoryDataBase<string>();

const sdbOne = new StringDatabase();

sdbOne.set('1', 'Test');

type Constructor<T> = new (...args: any[]) => T;

function Dumpable<T extends Constructor<{ getObject(): object }>>(Base: T) {
  return class Dumpable extends Base {
    dump() {
      console.log(this.getObject());
    }
  };
}

const DumpableStringDatabase = Dumpable(StringDatabase);

const sdbTwo = new DumpableStringDatabase();

sdbTwo.set('2', 'Test Test');

sdbTwo.dump();
