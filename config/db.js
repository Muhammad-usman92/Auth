const Sequelize = require("sequelize");

class Database {
  connection = null;

  getConnection = () => {
    if (!this.connection) {
      try {
        const temp = new Sequelize(
          "sys", //datatabse name
          "root", //username
          "12345", //password
          {
            host: "127.0.0.1", //host
            dialect: "mysql",
            logging: true,
          }
        );
        this.connection = temp;

        console.log("Successfully connected to database");

        return temp;
      } catch (error) {
        console.error("Unable to connect to the database" + error);
        process.exit(1);
      }
    } else {
      console.info("Connected to database 23");
      return this.connection;
    }
  };
}

const db = new Database();

exports.connection = db.getConnection();
