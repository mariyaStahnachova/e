import {IsString, IsInt, IsEmail, Length} from 'class-validator';
export class CreateUserDto {
    @IsString({message:'Email should be a string'})
    @IsEmail({}, {message:'Email is incorrect'})
    email: string;
    @IsString({message:'Password should be a string'})
    @Length(4,10,
        {message:'Password should be longer than 4 characters'})
    password: string;
}
