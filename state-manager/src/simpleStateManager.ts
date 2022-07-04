import { useState, useEffect } from 'react';

function createSubscribable<MessageType>() {
  const subscribers: Set<(msg: MessageType) => void> = new Set();

  return {
    subscribe(cb: (msg: MessageType) => void): () => void {
      subscribers.add(cb);

      return () => subscribers.delete(cb);
    },

    publish(msg: MessageType): void {
      subscribers.forEach((cb) => cb(msg));
    },
  };
}

export function createStateHook<T>(initialValue: T): () => [T, (v: T) => void] {
  const subscribers = createSubscribable<T>();
  return () => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => subscribers.subscribe(setValue), []);

    return [
      value,
      (v: T) => {
        setValue(v);
        subscribers.publish(v);
      },
    ];
  };
}
