import * as yup from "yup";
export const yupValidator =
  <T>(schema: yup.Schema<T>) =>
  (input: unknown): T => {
    try {
      return schema.validateSync(input, {
        abortEarly: false,
        stripUnknown: true,
      });
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        throw new Error(err.errors.join(", "));
      }
      throw err;
    }
  };
