import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: 'categories' })
export class Category {
    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @Property()
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}