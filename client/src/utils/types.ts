interface UserLogin {
  email: string;
  password: string;
}

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
  messageSent: MessageType[];
  messageRecieved: MessageType[];
  conversations: ConversationType[];
};

type MatchType = {
  id: string;
  userSourceEmail: string;
  userAddressEmail: string;
  userAddressAnswer: boolean;
  userAddress: UserType;
  createdAt: Date;
};

type CreateConversationDto = {
  userSourceEmail: string;
  userAddressEmail: string;
};

type ConversationType = {
  id: string;
  createdAt: Date;
  messages: MessageType[];
  users: UserType[];
};

type CreateMessageDto = {
  userSourceEmail: string;
  userAddressEmail: string;
  content: string;
  conversationId: string;
};

type MessageType = CreateMessageDto & {
  id: string;
  createdAt: Date;
};

type AuthForm = {
  password: string;
  firstName: string;
  email: string;
  birthday: string;
  gender: GenderEnum;
  looking: LookingEnum;
  descriptrion: string;
  avatar: File;
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

export {
  UserType,
  GenderEnum,
  LookingEnum,
  UserLogin,
  AuthForm,
  MatchType,
  ConversationType,
  MessageType,
  CreateMessageDto,
  CreateConversationDto,
};
