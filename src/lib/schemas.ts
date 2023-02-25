import { object, string } from "yup";

export const usernameSchema = object({
  username: string()
    .required()
    .min(3)
    .max(20)
    .trim()
    .matches(/^[a-zA-Z-_\s\d]+$/, "alphanumeric, space, dash, and underscore only")
    .transform((cur: string) => cur.replaceAll(/\s{2,}/g, " ")),
}).required();
