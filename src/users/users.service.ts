import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { Job } from 'src/back-office/entities/job.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Admin } from './entities/admin.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor (    
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
    @InjectModel(Job.name) private readonly jobModel: Model<Job>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
  generate(length) {
    var pass = '';
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
            'abcdefghijklmnopqrstuvwxyz0123456789@#$';
      
    for (let i = 1; i <= length; i++) {
        var char = Math.floor(Math.random()
                    * str.length + 1);
          
        pass += str.charAt(char)
    }
      
    return pass;
  }
  async create(createUserDto: CreateUserDto) {
    createUserDto["login"] = `EGTS-${this.generate(4)}`
    createUserDto["password"] = `EGTS-${this.generate(4)}`
    const created_user = await this.userModel.create(createUserDto)
    return created_user.toObject();
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    return await this.userModel.findOne({login:id}) ;
  }

  async findOneAdmin (login) {
    return await this.adminModel.findOne({login})
  }

  async findOneUser (id) {
    return await this.userModel.findOne({_id:id})
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel.findOneAndUpdate({_id:id},updateUserDto,{new:true})
    return updatedUser;
  }

  async remove(id: string) {
    await this.userModel.updateOne({_id:id},{active:false})
    return `This action removes a #${id} user`;
  }

  login (loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto)
  }

  async fetchMyJobs (user:User) {
    const jobs = await this.jobModel.find({assignedTo:{$in:[user._id]}}).populate("assignedTo").sort({start_date:-1})
    return {
      statusCode: 200,
      message: 'API.JOBS_FETCHED',
      data: jobs,
    } 
  }

}
