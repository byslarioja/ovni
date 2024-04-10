import { User, Video } from "./entities";

export type ApiVideoResponse = {
  videos: Video[];
};

export type ApiUsersResponse = User[];
export type ApiUserResponse = { user: User };
