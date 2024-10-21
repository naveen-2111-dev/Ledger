import mongoose from "mongoose";
const { schema } = mongoose;

const User = new schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Ledger = mongoose.model("Ledger", User);
module.exports = Ledger;
