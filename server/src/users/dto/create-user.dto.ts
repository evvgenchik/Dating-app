import { IsEmail, IsString, Length, Min } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;
  @IsString({ message: '$property must be a string' })
  @Min(4)
  password: string;
  @IsString({ message: '$property must be a string' })
  firstName: string;
  @IsString({ message: '$property must be a string' })
  birthday: string;
  @IsString({ message: '$property must be a string' })
  country: string;
  @IsString({ message: '$property must be a string' })
  gender: string;
  @IsString({ message: '$property must be a string' })
  looking: string;
  @IsString({ message: '$property must be a string' })
  @Length(5, 300)
  descriptrion: string;
  photo: string;
}
