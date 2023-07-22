import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateConversationDto {
  @IsEmail()
  @IsNotEmpty()
  userSourceEmail: string;
  @IsEmail()
  @IsNotEmpty()
  userAddressEmail: string;
}
