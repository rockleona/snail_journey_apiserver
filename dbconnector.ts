import {
  Database,
  DataTypes,
  Model,
  Relationships,
  SQLite3Connector,
} from "https://deno.land/x/denodb@v1.0.40/mod.ts";

export class SqlLiter {
  name?: string;
  db: Database;
  connector: SQLite3Connector;

  constructor(name = "./database/test_0503.sqlite") {
    this.connector = new SQLite3Connector({
      filepath: name,
    });
    this.db = new Database(this.connector);
  }

  initDB() {
    Relationships.belongsTo(RecordTable, UserTable);
    this.db.link([UserTable, RecordTable]);
    this.db.sync();
  }
}

export class UserTable extends Model {
  static table = "users";

  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    nickname: DataTypes.STRING,
    continue: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    lastlogin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  };
}

export class RecordTable extends Model {
  static table = "record";

  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    record: DataTypes.JSON,
  };

  static usertable() {
    return this.hasOne(UserTable);
  }
}
