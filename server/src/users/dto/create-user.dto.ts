import {
  IsEmail,
  IsString,
  Length,
  MinLength,
  IsNotEmpty,
  IsDate,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString({ message: '$property must be a string' })
  @MinLength(4)
  password: string;
  @IsString({ message: '$property must be a string' })
  @IsNotEmpty()
  firstName: string;
  @IsString({ message: '$property must be a string' })
  @IsNotEmpty()
  birthday: string;
  @IsString({ message: '$property must be a string' })
  @IsNotEmpty()
  gender: string;
  @IsString({ message: '$property must be a string' })
  @IsNotEmpty()
  looking: string;
  @IsString({ message: '$property must be a string' })
  @IsNotEmpty()
  @Length(5, 300)
  descriptrion: string;
  avatar: string;
}
