import { atom } from 'recoil';
import {User} from "../data/User";

export const userAtom = atom<User | null>({
  key: 'userAtom',
  default: null,
})
