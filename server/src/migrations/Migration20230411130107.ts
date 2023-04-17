import { Migration } from '@mikro-orm/migrations';

export class Migration20230411130107 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("id" serial primary key, "username" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "users" cascade;');
  }

}
