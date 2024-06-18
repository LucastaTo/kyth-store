import mongoose, { Document, Schema } from "mongoose";

export interface ISocialMedia extends Document {
  appName: string;
  platform: string;
  link: string;
}

const SocialMediaSchema: Schema = new Schema({
  appName: { type: String, required: true },
  platform: { type: String, required: true },
  link: { type: String, required: true, unique: true },
});

export default mongoose.model<ISocialMedia>("SocialMedia", SocialMediaSchema);
