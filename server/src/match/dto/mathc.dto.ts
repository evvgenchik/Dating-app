import { IsEmail, IsNotEmpty } from 'class-validator';

export class MatchDto {
  @IsEmail()
  @IsNotEmpty()
  userSourceEmail: string;
  @IsEmail()
  @IsNotEmpty()
  userAddressEmail: string;
  userAddressAnswer: boolean;
}
