import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity({ tableName: 'categories' })
export class Category {
    @Field(() => Int)
    @PrimaryKey()
    id!: number;

    @Field(() => String)
    @Property()
    name!: string;

    @Field()
    @Property({ onCreate: () => new Date() })
    createdAt?: Date = new Date();

    @Field()
    @Property({ onUpdate: () => new Date() })
    updatedAt?: Date = new Date();
}
