import { IsEmail, IsNotEmpty } from 'class-validator';

export class MatchDeleteDto {
  @IsEmail()
  @IsNotEmpty()
  userSourceEmail: string;
  @IsEmail()
  @IsNotEmpty()
  userAddressEmail: string;
}

export class MatchDto extends MatchDeleteDto {
  userAddressAnswer: boolean;
  createdAt: Date;
}
