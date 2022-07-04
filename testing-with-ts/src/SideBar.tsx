import React from 'react';

interface Item {
  name: string;
  href: string;
}

interface SideBarProps {
  items: Item[];
}

export const SideBar: React.FC<SideBarProps> = ({ items }) => (
  <div>
    {items.map(({ name, href }) => (
      <div key={href}>
        <a role='navigation' href={href}>
          {name}
        </a>
      </div>
    ))}
  </div>
);
