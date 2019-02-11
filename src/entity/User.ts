import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn} from "typeorm";
import { ObjectType, Field, ID, Root } from "type-graphql";
import {Profile} from "./Profile";

@ObjectType()
@Entity()
export class User extends BaseEntity{

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;
    
    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    @Column("text", {unique: true})
    email: string;

    @Column()
    password: string;

    @Field()
    name(@Root() parent: User) : string {
        return`${parent.firstName} ${parent.lastName}`;
    }

    @Field()
    @Column("bool", {default: false})
    confirmed: boolean;

    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile;

}