// import { UserType } from './../types/user.ts';

interface UserType {
    id: number;
    username: string;
    password: string;
    nickname?: string;
    email?: string,
  }

export const Users: Array<UserType> = [
    {
        id: 0,
        username: 'test',
        password: '123456',
    },
    {
        id: 0,
        username: 'test',
        password: '123456',
    },
    {
        id: 0,
        username: 'test',
        password: '123456',
    },
]