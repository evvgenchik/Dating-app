import { Exclude } from 'class-transformer';

export class UserEntity {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  id: string;
  firstName: string;
  email: string;
  birthday: string;
  country: string;
  gender: string;
  looking: string;
  descriptrion: string;
  avatar: string;
  createdAt: Date;

  @Exclude()
  hashedRefreshToken?: string;

  @Exclude()
  password: string;
}
