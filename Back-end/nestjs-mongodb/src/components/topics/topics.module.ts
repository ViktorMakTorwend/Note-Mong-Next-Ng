import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Topic, TopicSchema } from 'src/schemas/Topic.schema';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Topic.name,
            schema: TopicSchema,
        }])
    ],
    providers: [
        TopicService,
    ],
    controllers: [
        TopicController,
    ]
})
export class TopicModule {

}