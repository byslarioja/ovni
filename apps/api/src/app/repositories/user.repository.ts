import { User } from "@app/entities/User";
import { AppDataSource } from "@config/database";
import bcrypt from "bcrypt";

export const createUser = async (userData) => {
  const user = new User();
  const userRepository = AppDataSource.getRepository(User);

  user.email = userData.email;
  user.name = userData.name;
  user.password = await bcrypt.hash(userData.password, 10);
  user.phone = userData.phone;
  user.country = userData.country;
  user.city = userData.city;
  user.zip_code = userData.zip_code;
  user.youtube_channel = userData.youtube_channel;

  const createdUser = await userRepository.save(user);

  return createdUser;
};

export const findByEmail = async (email: string) => {
  const userRepository = AppDataSource.getRepository(User);

  return await userRepository.findOne({ where: { email } });
};

export const updateUser = async (newEncryptedPassword: string, id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  return await userRepository.update(
    { id },
    { password: newEncryptedPassword }
  );
};

export const getAllUsers = async () => {
  const userRepository = AppDataSource.getRepository(User);

  return await userRepository.find({ where: { deleted_at: null } });
};

export const deleteUser = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  await userRepository
    .createQueryBuilder()
    .softDelete()
    .where("id = :id", { id })
    .execute();
};
