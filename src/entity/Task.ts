import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

export enum TaskType {
    IDEA = "IDEA",
    ISSUE = "ISSUE",
    NOTE = "NOTE"
}

@Entity()
export class Task extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        type: "enum",
        enum: TaskType,
        default: TaskType.NOTE
    })
    type: TaskType
}