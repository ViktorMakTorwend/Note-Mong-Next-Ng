import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Topic } from "src/schemas/Topic.schema";
import { CreateTopicDto } from "./dto/CreateTopic.dto";
import { UpdateTopicDto } from "./dto/UpdateTopic.dto";

@Injectable()
export class TopicService {
    constructor(
        @InjectModel(Topic.name) private topicModel: Model<Topic>
    ) {}

    createTopic(createTopicDto: CreateTopicDto) {
        const newTopic = new this.topicModel(createTopicDto);
        return newTopic.save();
    }

    getTopics() {
        return this.topicModel.find();
    }

    getTopicById(id: string) {
        return this.topicModel.findById({_id: id})
    }

    updateTopic(id: string, updateTopicDto: UpdateTopicDto) {
        return this.topicModel.findByIdAndUpdate({_id: id}, updateTopicDto, {new: true} );
    }

}