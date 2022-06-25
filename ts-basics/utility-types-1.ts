interface MyUser {
  name: string;
  id: number;
  email?: string;
  phone?: string;
}

type MyUserOptionals = Partial<MyUser>;

const merge = (user: MyUser, overrides: MyUserOptionals): MyUser => {
  return {
    ...user,
    ...overrides,
  };
};

console.log(
  merge(
    {
      id: 123,
      name: 'Nikita',
    },
    {
      id: 2000,
      email: 'email@email.vn',
    }
  )
);

type RequiredMyUser = Required<MyUser>;

type emailAndName = Pick<MyUser, 'email' | 'name'>;

type UserWithoutId = Omit<MyUser, 'id'>;

const mapById = (users: MyUser[]): Record<MyUser['id'], UserWithoutId> =>
  users.reduce((prev, next) => {
    const { id, ...other } = next;
    return { ...prev, [id]: other };
  }, {});

console.log(
  mapById([
    {
      id: 123,
      name: 'Nikita',
      email: 'YeuBinh@mail.vn',
    },
    {
      id: 234,
      name: 'Binh',
    },
  ])
);
