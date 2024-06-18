import mongoose, { Document, Schema } from "mongoose";

export interface IAuthor {
  username: string;
  password: string;
  isActive: boolean;
  lang: string;
}

export interface IAuthorModel extends IAuthor, Document {}

const AuthorSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    lang: { type: String, default: "VN" },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<IAuthorModel>("Author", AuthorSchema);
