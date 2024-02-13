export interface ISignIn {
  userName: string;
  password: string;
}

export const singInValidation = (payload: ISignIn): Partial<ISignIn> => {
  const errors: Partial<ISignIn> = {};
  if (!payload.userName) {
    errors.userName = "UserName is required*";
  }
  if (!payload.password) {
    errors.password = "Password is required*";
  }
  return errors as Partial<ISignIn>;
};

export interface ISignUp {
  name: string;
  email: string;
  mobile: string;
  password: string;
}

export const singUpValidation = (payload: ISignUp): Partial<ISignUp> => {
  const errors: Partial<ISignUp> = {};
  if (!payload.name) {
    errors.name = "Name is required*";
  }
  if (!payload.email) {
    errors.email = "Email is required*";
  }
  if (!payload.mobile) {
    errors.mobile = "Mobile is required*";
  }
  if (!payload.password) {
    errors.password = "Password is required*";
  }
  return errors as Partial<ISignUp>;
};

export interface IProject {
  title: string;
  description: string;
}

export const projectValidation = (payload: IProject): Partial<IProject> => {
  const errors: Partial<IProject> = {};
  if (!payload.title) {
    errors.title = "title is required*";
  }
  if (!payload.description) {
    errors.description = "description is required*";
  }
  return errors as Partial<IProject>;
};
