import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class VideosInfo1710889786038 implements MigrationInterface {
  private tableName = "videos";

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
          { name: "integrity_string", type: "varchar" },
          { name: "id_from_video", type: "varchar" },
          { name: "device_uri", type: "varchar" },
          { name: "width", type: "int" },
          { name: "height", type: "int" },
          { name: "duration", type: "float" },

          { name: "userId", type: "varchar" },

          { name: "start_time", type: "varchar" },
          { name: "end_time", type: "varchar" },
          { name: "uri", type: "varchar", isNullable: true },

          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
            onUpdate: "CURRENT_TIMESTAMP",
          },
          {
            name: "deleted_at",
            type: "timestamp",
            isNullable: true,
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      "videos",
      new TableForeignKey({
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("videos", "userId");

    await queryRunner.dropTable("videos");
  }
}
