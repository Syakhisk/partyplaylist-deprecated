import * as yup from "yup";

export const usernameSchema = yup
  .object({
    username: yup
      .string()
      .required()
      .min(3)
      .max(20)
      .trim()
      .matches(
        /^[a-zA-Z-_\s\d]+$/,
        "alphanumeric, space, dash, and underscore only"
      )
      .transform((cur: string) => cur.replaceAll(/\s{2,}/g, " ")),
  })
  .required();

export const joinSessionSchema = yup
  .object({
    sessionId: yup.string().matches(/^[0-9]+$/, "only numbers are allowed"),
  })
  .required();
