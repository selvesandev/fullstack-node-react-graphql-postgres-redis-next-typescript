import { Migration } from '@mikro-orm/migrations';

export class Migration20230506170439 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "users" add column "token_version" int not null default 0;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" drop column "token_version";');
  }

}
