import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { BackOfficeService } from './back-office.service';
import { CreateBackOfficeDto } from './dto/create-back-office.dto';
import { UpdateBackOfficeDto } from './dto/update-back-office.dto';

@ApiTags('back-office')
@Controller('back-office')
export class BackOfficeController {
  constructor(private readonly backOfficeService: BackOfficeService) {}

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
}
