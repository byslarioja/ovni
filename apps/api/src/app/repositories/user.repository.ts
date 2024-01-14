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

  //TODO: find a less verbose way to hide the password
  delete createdUser.password;

  return createdUser;
};
