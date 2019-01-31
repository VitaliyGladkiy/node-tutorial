import {Field, ID, ObjectType} from "type-graphql";
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {NoteStatus} from "../types/NoteStatus";
export enum NoteType {
    IDEA = "IDEA",
    ISSUE = "ISSUE",
    NOTE = "NOTE",
    TASK = "TASK",
    SUBTASK = "SUBTASK"
}

@ObjectType()
@Entity()
export class Note extends BaseEntity{

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    theme: string;

    @Field(() => String, {nullable: true})
    @Column()
    text: string;

    @Field()
    @Column()
    link: string;

    @Field()
    @Column()
    author: string;

    @Field()
    @Column()
    createDate: Date;

    @Column({
        type: "enum",
        enum: NoteType,
        default: NoteType.NOTE
    })
    type: NoteType;

    @Column({
        type: "enum",
        enum: NoteStatus,
        default: NoteStatus.AWAIT
    })
    status: NoteStatus
}