import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateConversationDto {
  @IsEmail()
  @IsNotEmpty()
  emailOne: string;
  @IsEmail()
  @IsNotEmpty()
  emailTwo: string;
}
