import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Topic } from "src/schemas/Topic.schema";
import { CrerateTopicDto } from "./topic.dto";

@Injectable()
export class TopicService {
    constructor(
        @InjectModel(Topic.name) private topicModel: Model<Topic>
    ) {}

    createTopic(createTopicDto: CrerateTopicDto) {
        const newTopic = new this.topicModel(createTopicDto);
        return newTopic.save();
    }

}