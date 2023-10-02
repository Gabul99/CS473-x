import UserType from "./UserEnum";

export interface User {
  type: 'A' | 'B';
  nickname: string;
  userType: UserType;
}
