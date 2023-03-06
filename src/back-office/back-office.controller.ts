import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { BackOfficeService } from './back-office.service';
import { AssignToBackOfficeDto } from './dto/assignTo-back-office.dto';
import { CreateBackOfficeDto } from './dto/create-back-office.dto';
import { CreateJobDto } from './dto/create-job-back-office.dto';
import { UpdateBackOfficeDto } from './dto/update-back-office.dto';

@ApiTags('back-office')
@Controller('back-office')
export class BackOfficeController {
  constructor(private readonly backOfficeService: BackOfficeService) {}

  @Get('/jobs')
  fetchJobs () {
    return this.backOfficeService.fetchJobs()
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.backOfficeService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.backOfficeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.backOfficeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.backOfficeService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.backOfficeService.remove(id);
  }

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.backOfficeService.login(loginUserDto);
  }
  
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('plan',{
    storage: diskStorage({
      destination: './uploads'
      , filename: (req, file, cb) => {
        // Generating a 32 random chars long string
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        //Calling the callback passing the random name generated with the original extension name
        cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }))
  
  @ApiBody({
    description: 'images',
    type: CreateJobDto,
  })
  @Post('/create-job')
  async createJob(@UploadedFile()file,@Body() createJobDto: CreateJobDto) {
    createJobDto.plan = file.filename
    return this.backOfficeService.createJob(createJobDto);
  }

  @Post('/assign-job')
  async assignTo(@Body() assignToDto : AssignToBackOfficeDto) {
    return this.backOfficeService.assignTo(assignToDto);
  }
  
}
