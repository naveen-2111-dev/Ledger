import mongoose from "mongoose";
const { Schema } = mongoose;

const participant = new Schema(
  {
    collegename: {
      type: String,
      require: true,
    },
    teammembers: {
      type: [String],
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    event: {
      type: String,
      required: true,
    },
    check: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const inCommers = mongoose.model("Participant", participant);
module.exports = inCommers;
