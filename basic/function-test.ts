import { createSubscribable } from './Subscribable-function';

const sub = createSubscribable<string>();
const unsubsctibe = sub.subscribe(console.log);
sub.publish('Hello');
unsubsctibe();
sub.publish('Yosh');
