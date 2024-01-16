import { Schema, model } from 'mongoose';
import { TLanguage } from './language.interface';

const languageSchema = new Schema<TLanguage>(
  {
    name: {
      type: String,
      required: [true, 'Language Name is required'],
      unique: true,
    },
    flag: {
      type: String,
      required: [true, 'Flag Name is required'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Language = model<TLanguage>('Language', languageSchema);

export default Language;
