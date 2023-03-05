import { BadRequestException, forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor( @Inject(forwardRef(() => UsersService))private usersService: UsersService , private readonly jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass && user.active!= false) {
      return user.toObject();
    }
    return null;
  }
  async validateUserAdmin(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneAdmin(username);
    if (user && user.password === pass) {
      return user.toObject();
    }
    return null;
  }

  async login(user: any) {
    let result = await this.validateUser(user.login,user.password)
    if (result){
      delete result["password"]
      const payload = result;
        return {
          statusCode: 200,
          message: 'API.USER_FETCHED',
          data: {...result, access_token: this.jwtService.sign(payload)},
        }
    }else{
      throw new HttpException('User does not exists',HttpStatus.BAD_REQUEST)
    }
   
  }

  async loginAdmin(user: any) {
    let result = await this.validateUserAdmin(user.login,user.password)
    if (result){
      delete result["password"]
      const payload = { username: user.username, sub: user.userId };
        return {
          statusCode: 200,
          message: 'API.USER_FETCHED',
          data: {...result, access_token: this.jwtService.sign(payload)},
        }
    }else{
      throw new HttpException('User does not exists',HttpStatus.BAD_REQUEST)
    }
   
  }
}