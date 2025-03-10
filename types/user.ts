export interface IUser {
  _id: string;
  name: string;
  email: string;
  imgUrl: string;
  needsPasswordChange: boolean;
  role: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
