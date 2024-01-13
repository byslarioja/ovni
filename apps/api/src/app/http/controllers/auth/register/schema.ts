import { User } from "@app/entities/User";
import { AppDataSource } from "@config/database";
import { z } from "zod";

const checkIfEmailIsValid = async (email: string) => {
  const repository = AppDataSource.getRepository(User);
  const user = await repository.findOne({ where: { email } });

  return user === null;
};

export const RegistrableUserSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z
      .string()
      .email()
      .refine(checkIfEmailIsValid, "This email is already in use"),
    password: z.string(),
    phone: z.optional(z.string()),
    country: z.optional(z.string()),
    city: z.optional(z.string()),
    zip_code: z.optional(z.string()),
    youtube_channel: z.optional(z.string()),
  }),
});

export type RegisterUserRequest = z.infer<typeof RegistrableUserSchema>;
