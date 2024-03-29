import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
    },
    name: {
      type: String,
      required: [true, 'Name is required.'],
    },
    entries: [{ type: Schema.Types.ObjectId, ref: 'Entry' }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

export const User = model('User', userSchema);

// module.exports = User;

// export { User, userSchema};
