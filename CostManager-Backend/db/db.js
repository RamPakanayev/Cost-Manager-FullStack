const mongoose = require("mongoose");

// Define the Mongoose schema and model for costs
let costSchema = mongoose.Schema(
  {
    user_id: String,
    year: Number,
    month: Number,
    day: Number,
    id: String,
    description: String,
    category: String,
    sum: Number
  },
  { versionKey: false }
);
let costDoc = mongoose.model("costs", costSchema);

// Define the Mongoose schema and model for users
let userSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    birthday: { type: String, required: true },
  },
  { versionKey: false }
);
let userDoc = mongoose.model("users", userSchema);


const connectToDB = async () => {
  let uri1 =
    "mongodb+srv://root:root@cluster0.h7gutkk.mongodb.net/WebDB?retryWrites=true&w=majority";

  mongoose.set("strictQuery", true);
  mongoose.connect(uri1);
  let db = mongoose.connection;

  db.on("error", () => {
    console.log("error");
  });

  await new Promise((resolve, reject) => {
    db.once("open", resolve);
  });
  console.log("Successfully connected to the MongoDB database");
};

module.exports = {
  costDoc,
  userDoc,
  connectToDB,
};
