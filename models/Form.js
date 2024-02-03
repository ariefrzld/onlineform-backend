import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const Schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    questions: {
      type: Array,
    },
    invites: {
      type: Array, // ['a@kev.com', 'b@kev.com']
    },
    public: {
      type: Boolean, // true = public, false = private
    },
    createdAt: {
      type: Number,
    },
    updatedAt: {
      type: Number,
    },
  },
  {
    timestamps: {
      currentTime: () => Math.floor(Date.now() / 1000),
    },
  }
);

Schema.plugin(mongoosePaginate);

export default mongoose.model("Form", Schema);
