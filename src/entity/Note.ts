import {Field, ID, ObjectType} from "type-graphql";
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@ObjectType()
@Entity()
export class Note extends BaseEntity{

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    theme: string;

    @Field()
    @Column()
    payload: string;

    @Field()
    @Column()
    link: string;

    @Field()
    @Column()
    author: string;

    @Field()
    @Column()
    createDate: string;
}