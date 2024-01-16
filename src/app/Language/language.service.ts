import httpStatus from 'http-status';
import { TLanguage } from './language.interface';
import Language from './language.model';
import AppError from '../errors/AppError';

const createLanguageDB = async (payload: TLanguage) => {
  const result = await Language.create(payload);
  return result;
};

const getAllLanguageFromDB = async () => {
  try {
    const result = await Language.find({});
    return { languages: result };
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

export const LanguageServices = {
  createLanguageDB,
  getAllLanguageFromDB,
};
