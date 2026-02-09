export type IUser = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  birthDate: string;
  createdAt: string;
  updatedAt?: string;
};
