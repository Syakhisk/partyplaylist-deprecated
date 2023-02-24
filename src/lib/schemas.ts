import { object, string } from "yup";

export const usernameSchema = object({
  username: string()
    .required()
    .min(2)
    .max(5)
    .trim()
    .transform((cur: string) => cur.replaceAll(/\s{2,}/g, " ")),
}).required();
