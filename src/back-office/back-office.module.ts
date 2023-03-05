import { Module } from '@nestjs/common';
import { BackOfficeService } from './back-office.service';
import { BackOfficeController } from './back-office.controller';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[UsersModule,AuthModule],
  controllers: [BackOfficeController],
  providers: [BackOfficeService]
})
export class BackOfficeModule {}
