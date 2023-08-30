export type UserType = {
  _id: string;
  username: string;
  email: string;
};

export type ErrorType = {
  data: {
    message: string;
  };
};
