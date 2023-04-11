import { Migration } from '@mikro-orm/migrations';

export class Migration20230411131942 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "users" alter column "username" type varchar(255) using ("username"::varchar(255));');
    this.addSql('alter table "users" alter column "username" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" alter column "username" type varchar(255) using ("username"::varchar(255));');
    this.addSql('alter table "users" alter column "username" set not null;');
  }

}
