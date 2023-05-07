import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity({ tableName: 'users' })
export class User {
    @Field(() => Int)
    @PrimaryKey()
    id!: number;

    @Field(() => String)
    @Property({ nullable: true })
    username?: string;

    @Field(() => String)
    @Property({ unique: true })
    email!: String;

    @Property()
    password!: string;

    @Property({ default: 0 })
    tokenVersion?: number;

    @Field()
    @Property({ onCreate: () => new Date() })
    createdAt?: Date = new Date();

    @Field()
    @Property({ onUpdate: () => new Date() })
    updatedAt?: Date = new Date();
}
