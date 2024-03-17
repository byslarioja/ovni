import { z } from "zod";

export const ChangePasswordSchema = z.object({
  body: z
    .object({
      password: z.string(),
      passwordConfirm: z.string(),
    })
    .superRefine(({ passwordConfirm, password }, ctx) => {
      if (passwordConfirm !== password) {
        ctx.addIssue({
          code: "custom",
          message: "The passwords did not match",
        });
      }
    }),
});

export type ChangePasswordRequest = z.infer<typeof ChangePasswordSchema> & {
  body: { token: { id: "string"; email: "string" } };
};
