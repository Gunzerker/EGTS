import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BackOfficeModule } from './back-office/back-office.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://root:root@cluster0.kyifc.mongodb.net/?retryWrites=true&w=majority',{dbName:"egts"}), UsersModule, AuthModule, BackOfficeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
