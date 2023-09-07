// user.model.ts
import { Model, Column, Table, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  static createUser(username: string, email: string, password: string) {
    return User.create({ username, email, password });
  }

  static async findByUsername(username: string) {
    return User.findOne({ where: { username } });
  }
}
export default User;