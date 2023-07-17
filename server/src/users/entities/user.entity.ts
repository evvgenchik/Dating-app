import { Exclude } from 'class-transformer';
import { MatchDto } from 'src/match/dto/mathc.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateMessageDto } from 'src/message/dto/create-message.dto';
import { Conversation } from '@prisma/client';

export class UserEntity {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  id: string;
  firstName: string;
  email: string;
  birthday: string;
  gender: string;
  looking: string;
  descriptrion: string;
  avatar: string;
  createdAt: Date;
  isEmailConfirmed: boolean;
  matchedBy: MatchDto[];
  matching: MatchDto[];
  dislikeBy: CreateUserDto[];
  disliking: CreateUserDto[];
  conversations: Conversation[];
  // messageSent: CreateMessageDto[];
  // messageRecieved: CreateMessageDto[];

  @Exclude()
  hashedRefreshToken?: string;

  @Exclude()
  password: string;
}
