import { Sensor } from "../../app/enums/Sensor";
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class SensorsReadings1712588615649 implements MigrationInterface {
  private tableName = "sensor_readings";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            generationStrategy: "uuid",
          },

          { name: "sensor", type: "enum", enum: Object.values(Sensor) },
          { name: "value", type: "json" },
          { name: "timestamp", type: "varchar" },

          { name: "videoId", type: "varchar" },

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
      this.tableName,
      new TableForeignKey({
        columnNames: ["videoId"],
        referencedColumnNames: ["id"],
        referencedTableName: "videos",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(this.tableName, "videoId");

    await queryRunner.dropTable(this.tableName);
  }
}
