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
  matchedBy: MatchType[];
  matching: MatchType[];
  dislikeBy: UserType[];
  disliking: UserType[];
};

type MatchType = {
  id: string;
  userSourceEmail: string;
  userAddressEmail: string;
  userAddressAnswer: boolean;
  userAddress: UserType;
};

enum GenderEnum {
  female = 'female',
  male = 'male',
  neutral = 'neutral',
}
enum LookingEnum {
  female = 'female',
  male = 'male',
  everyone = 'everyone',
}

interface UserLogin {
  email: string;
  password: string;
}

type AuthForm = {
  password: string;
  firstName: string;
  email: string;
  birthday: Date;
  gender: GenderEnum;
  looking: LookingEnum;
  descriptrion: string;
  avatar: File;
};

export { UserType, GenderEnum, LookingEnum, UserLogin, AuthForm, MatchType };
