import React from 'react';

interface PersonProps {
  name: String;
}

export const Person: React.FC<PersonProps> = ({ name }) => (
  <div role='contentinfo'>Name is {name}</div>
);
