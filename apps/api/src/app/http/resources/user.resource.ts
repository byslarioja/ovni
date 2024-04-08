import { User } from "@app/entities/User";

export class UserResource {
  constructor(private user: User) {
    this.user = user;
  }

  public toJson(): Omit<User, "password" | "deleted_at" | "videos"> {
    return {
      id: this.user.id,
      name: this.user.name,
      email: this.user.email,
      phone: this.user.phone,
      country: this.user.country,
      city: this.user.city,
      zip_code: this.user.zip_code,
      youtube_channel: this.user.youtube_channel,
      created_at: this.user.created_at,
      updated_at: this.user.updated_at,
    };
  }
}
