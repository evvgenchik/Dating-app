type UserType = UserSignup & {
  id: string;
  createdAt: Date;
  isEmailConfirmed: boolean;
};

type UserSignup = {
  email: string;
  firstName: string;
  birthday: Date;
  gender: string;
  looking: string;
  descriptrion: string;
  avatar: string;
};

interface UserLogin {
  email: string;
  password: string;
}

export { UserType, UserLogin, UserSignup };
