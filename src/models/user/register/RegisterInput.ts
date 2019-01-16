import { Field, InputType } from "type-graphql";
import {Length, IsEmail} from "class-validator";

@InputType()
export class RegisterInput{
  
    @Field()
    @Length(1, 255) 
    firstName: string;

    @Length(1, 255)
    @Field() 
    lastName: string;

    @Field() 
    @IsEmail()
    email: string;

    @Field()
     password: string;
}