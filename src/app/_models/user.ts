export class User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  bio: string;
  token: string;
  profilePicture: string;
  follows: Array<number> = new Array<number>();
}
