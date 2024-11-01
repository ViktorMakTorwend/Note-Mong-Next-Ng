import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TopicModule } from './components/topics/topics.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://root:admin@localhost:27017/"),
    TopicModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
