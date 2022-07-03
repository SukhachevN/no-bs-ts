import { useState, useCallback } from 'react';

export const useCounter = (initialValue: number) => {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => setCount((state) => state + 1), []);

  return { count, increment };
};
