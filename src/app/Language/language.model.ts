import { Schema, model } from 'mongoose';
import { TLanguage } from './language.interface';

const languageSchema = new Schema<TLanguage>(
  {
    language: {
      type: String,
      required: [true, 'Language Name is required'],
      unique: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Language = model<TLanguage>('Language', languageSchema);

export default Language;
