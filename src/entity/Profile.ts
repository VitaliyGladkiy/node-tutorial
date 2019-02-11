import {BaseEntity, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Note} from "./Note";

@Entity()
export class Profile extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Note, note => note.profile)
    noteList: [Note];
}