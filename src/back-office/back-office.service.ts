import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UsersService } from 'src/users/users.service';
import { AssignToBackOfficeDto } from './dto/assignTo-back-office.dto';
import { CreateBackOfficeDto } from './dto/create-back-office.dto';
import { CreateJobDto } from './dto/create-job-back-office.dto';
import { UpdateBackOfficeDto } from './dto/update-back-office.dto';
import { Job } from './entities/job.entity';

@Injectable()
export class BackOfficeService {
  constructor(private usersService: UsersService , private authService: AuthService,
    @InjectModel(Job.name) private readonly jobModel: Model<Job>
    ){}
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

  async createJob(createJobDto: CreateJobDto) {
    await this.jobModel.create(createJobDto)
    return {
      statusCode: 201,
      message: 'API.JOB_CREATED',
    };
  }

  async assignTo (assignToDto : AssignToBackOfficeDto){
    await this.jobModel.findOneAndUpdate({_id:assignToDto.jobId},{assignedTo:assignToDto.assignTo})
    return {
      statusCode: 200,
      message: 'API.JOB_ASSIGNED',
    };
  }

  async fetchJobs () {
    const jobs = await this.jobModel.find().populate('assignedTo').sort({start_date:-1})
    return {
      statusCode: 200,
      message: 'API.JOBS_FETCHED',
      data: jobs,
    } 
  }
}
