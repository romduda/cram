import mongoose from "mongoose";

const host: string = process.env.HOST || "localhost";
const dbName: string = process.env.DATABASE_NAME || "cramdb";

mongoose.connect(`mongodb://${host}/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "db connection error: "));
db.once("open", () => console.log("connected to mongoose"));

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  related: {
    type: [String],
    require: true,
  },
  bullets: {
    type: [String],
    require: true,
  },
});

export const Topic = mongoose.model("Topic", topicSchema);
