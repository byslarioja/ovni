import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class VideosInfo1710889786038 implements MigrationInterface {
  private tableName = "videos_info";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
          },
          { name: "hash", type: "varchar" },
          { name: "id_from_video", type: "varchar" },
          { name: "device_uri", type: "varchar" },
          { name: "width", type: "int" },
          { name: "height", type: "int" },
          { name: "duration", type: "float" },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
