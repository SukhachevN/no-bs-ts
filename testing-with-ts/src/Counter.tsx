import { useState } from 'react';

export const Counter: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount((state) => state + 1)}>Add One</button>
      <div role='contentinfo'>Count is {count}</div>
    </div>
  );
};
