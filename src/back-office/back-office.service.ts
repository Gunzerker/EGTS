import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UsersService } from 'src/users/users.service';
import { CreateBackOfficeDto } from './dto/create-back-office.dto';
import { UpdateBackOfficeDto } from './dto/update-back-office.dto';

@Injectable()
export class BackOfficeService {
  constructor(private usersService: UsersService , private authService: AuthService){}
  async create(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return {
      statusCode: 200,
      message: 'API.USER_CREATED',
      data: {...user},
    } 
  }

  async findAll() {
    const users = await this.usersService.findAll()
    return {
      statusCode: 200,
      message: 'API.USERS_FETCHED',
      data: users,
    } 
  }

  async findOne(id: string) {
    const user = await this.usersService.findOneUser(id)
    return {
      statusCode: 200,
      message: 'API.USERS_FETCHED',
      data: user,
    } 
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.usersService.update(id,updateUserDto)
    return {
      statusCode: 200,
      message: 'API.USERS_UPDATED',
      data: updatedUser,
    } ;
  }

  async remove(id: string) {
    await this.usersService.remove(id)
    return {
      statusCode: 200,
      message: 'API.USER_DELETED',
    } ;
  }

  login (loginUserDto: LoginUserDto) {
    return this.authService.loginAdmin(loginUserDto)
  }
}
