import { Subscribable } from './Subscribable-class';

const sub = new Subscribable<string>();
const unsubsctibe = sub.subscribe(console.log);
sub.publish('Hello');
unsubsctibe();
sub.publish('Yosh');

class DataClass extends Subscribable<number> {
  constructor(public value: number) {
    super();
  }

  setValue(v: number) {
    this.value = v;
    this.publish(v);
  }
}

const dc = new DataClass(0);
const dcUnsub = dc.subscribe((v: number) => console.log(`DC: ${v}`));
const dcTwoUnsub = dc.subscribe((v: number) => console.log(`DC2: ${v}`));
dc.setValue(10);
dcUnsub();
dcTwoUnsub();
