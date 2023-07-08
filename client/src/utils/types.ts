type UserType = {
  id: string;
  email: string;
  firstName: string;
  birthday: string;
  gender: string;
  looking: string;
  descriptrion: string;
  avatar: string;
  createdAt: Date;
  isEmailConfirmed: boolean;
};

interface UserLogin {
  email: string;
  password: string;
}

export { UserType, UserLogin };
