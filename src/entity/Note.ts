import {Field, ObjectType} from "type-graphql";
import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {NoteStatus} from "../types/NoteStatus";
import {Profile} from "./Profile";
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

    @PrimaryGeneratedColumn()
    @Field()
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

    @Field()
    @Column({
        type: "enum",
        enum: NoteType,
        default: NoteType.NOTE
    })
    type: NoteType;

    @Field()
    @Column({
        type: "enum",
        enum: NoteStatus,
        default: NoteStatus.AWAIT
    })
    status: NoteStatus;


    @ManyToOne(() => Profile, profile => profile.noteList)
    profile: Profile;
}