import {Field, ObjectType} from "type-graphql";
import {TaskType} from "./Task";

@ObjectType()
export class TaskInputType {

    @Field()
    name!: string;

    @Field(() => TaskType)
    type!: TaskType;
}
