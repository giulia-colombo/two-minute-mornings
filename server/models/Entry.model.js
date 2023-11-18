// const { Schema, model, SchemaType } = require("mongoose");
import { Schema, model } from 'mongoose';

const entrySchema = new Schema(
  {
    focusPrompt: String,
    gratefulPrompt: String,
    letGoPrompt: String,
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

const Entry = model('Entry', entrySchema);

// module.exports = Entry;

export { Entry, entrySchema };
