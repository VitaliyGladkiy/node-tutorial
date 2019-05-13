import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {NoteStatus} from "../types/NoteStatus";
import {Profile} from "./Profile";
import {Field, ObjectType} from "type-graphql";

export enum NoteType {
    IDEA = "IDEA",
    ISSUE = "ISSUE",
    NOTE = "NOTE",
    TASK = "TASK",
    SUBTASK = "SUBTASK",
    ANY = "ANY"
}

@ObjectType()
@Entity()
export class Note {

    @PrimaryGeneratedColumn()
    @Field(() => Number)
    id!: number;

    @Column()
    @Field(() => String)
    theme!: string;

    @Field(() => String, { nullable: true })
    @Column()
    text!: string;

    @Field(() => String)
    @Column()
    link!: string;

    @Field(() => String)
    @Column()
    author!: string;

    @Field()
    @Column()
    createDate!: Date;

    @Field()
    @Column({
        type: "enum",
        enum: NoteType,
        default: NoteType.NOTE
    })
    type!: NoteType;

    @Field()
    @Column({
        type: "enum",
        enum: NoteStatus,
        default: NoteStatus.AWAIT
    })
    status!: NoteStatus;


    @ManyToOne(() => Profile, profile => profile.noteList)
    profile!: Profile;
}
