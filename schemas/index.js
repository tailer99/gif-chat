const mongoose = require("mongoose");

const { MONGO_ID, MONGO_PASSWORD, MONGO_ENV } = process.env;
const MONGO_URL = `mongodb://${MONGO_ID}:${MONGO_PASSWORD}@localhost:27017/admin`;

const connect = async () => {
  if (MONGO_ENV !== "production") {
    mongoose.set("debug", true);
  }

  mongoose.connect(MONGO_URL, {
    dbName: "gitchat",
    useNewUrlParser: true,
  });
};

mongoose.connection.on("error", (error) => {
  console.error("몽고디비 연결 에러", error);
});
mongoose.connection.on("disconnected", () => {
  console.error("몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.");
  connect();
});

module.exports = connect;
