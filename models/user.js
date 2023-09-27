import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  idUser: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },
  idClass: {
    type: String,
  },
  major: {
    type: String,
  },
  department: {
    type: String,
  },
  role: {
    type: String,
    default: "sinhVien", // giangVien
  },
  eventsJoin: {
    type: Array,
    default: [],
  },
  eventsMake: {
    type: Array,
    default: [],
  },
});

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10); // creat salt 10 char
    const passwordHashed = await bcrypt.hash(this.password, salt); // passwordHashed + salt
    this.password = passwordHashed; // done
    next();
  } catch (error) {
    next(error);
  }
});

export const users = mongoose.model("graduation_users", userSchema);
