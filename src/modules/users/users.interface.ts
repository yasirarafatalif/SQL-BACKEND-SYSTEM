export interface UserFindById {
  id: number;
  name: string;
  password: string;
  email: string;
}

export interface UserRequestBody {
  name: string;
  password: string;
  email: string;
  role?:string
}
