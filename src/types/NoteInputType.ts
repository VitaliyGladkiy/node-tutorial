import {Field, ID, ObjectType} from "type-graphql";
import {NoteStatus} from "./NoteStatus";

@ObjectType()
export class NoteInputType {

    @Field(() => ID)
    id!: number;

    @Field()
    firstName!: string;

    @Field()
    lastName!: string;

    @Field()
    email!: string;

    @Field()
    password!: string;

    @Field()
    confirmed!: boolean;

    @Field(() => NoteStatus)
    status!: NoteStatus
}
