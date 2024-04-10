import { User } from "@app/entities/User";

export class UserResource {
  //TODO: add videos
  public static toJson(user: User): SerializableUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      country: user.country,
      city: user.city,
      zip_code: user.zip_code,
      youtube_channel: user.youtube_channel,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }

  public static toArray(videos: SerializableUser[]): Array<SerializableUser> {
    return videos.map(this.toJson);
  }
}

export type SerializableUser = Omit<User, "password" | "deleted_at" | "videos">;
