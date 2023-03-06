import { Module } from '@nestjs/common';
import { BackOfficeService } from './back-office.service';
import { BackOfficeController } from './back-office.controller';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Job, jobSchema } from './entities/job.entity';

@Module({
  imports:[UsersModule,AuthModule,MongooseModule.forFeature([
    { name: Job.name, schema: jobSchema }
  ])],
  controllers: [BackOfficeController],
  providers: [BackOfficeService]
})
export class BackOfficeModule {}
