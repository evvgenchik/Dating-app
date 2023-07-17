import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  @IsEmail()
  @IsNotEmpty()
  userSourceEmail: string;
  @IsEmail()
  @IsNotEmpty()
  userAddressEmail: string;
  createdAt: Date;
  content: string;
}
