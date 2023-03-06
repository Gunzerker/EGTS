import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { Admin, adminSchema } from './entities/admin.entity';
import { Job, jobSchema } from 'src/back-office/entities/job.entity';

@Module({
  imports:[MongooseModule.forFeature([
    { name: User.name, schema: userSchema },
    { name: Admin.name, schema: adminSchema },
    { name: Job.name, schema: jobSchema }
  ]),forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
