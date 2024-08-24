import { UserEntity } from '@entities/user.entity';

export class UserDto extends UserEntity {
  constructor(user: UserEntity) {
    super();
    this.id = user.id;
    this.points = Number(user.points);
  }
}
