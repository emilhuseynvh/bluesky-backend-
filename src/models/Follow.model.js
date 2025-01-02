const { Schema, model } = require("mongoose");

const followSchema = new Schema(
  {
    followingId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      trim: true,
    },
    followerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    accepted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Follow = model("Follow", followSchema);

module.exports = Follow;