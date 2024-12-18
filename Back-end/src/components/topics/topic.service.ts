import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Topic } from "src/schemas/Topic.schema";
import { CreateTopicDto } from "./dto/CreateTopic.dto";
import { TopicCrud } from "src/interfaces/TopicCRUD";
import { TopicModel } from "src/types/Topic";

@Injectable()
export class TopicService implements TopicCrud {
    constructor(
        @InjectModel(Topic.name) private topicModel: Model<Topic>
    ) { }

    createTopic(createTopicDto: CreateTopicDto): Promise<TopicModel> {
        const newTopic = new this.topicModel(createTopicDto);
        return newTopic.save();
    }

    getTopics(): Promise<TopicModel[]> | null {
        return this.topicModel.find()
    }

    deleteTopic(id: string): Promise<TopicModel> | null {
        return this.topicModel.findByIdAndDelete(id);
    }

    getTopicByTitle(titleName: string):Promise<TopicModel> | null {
        return this.topicModel.findOne({ title: titleName });
    }

    // getTopicById(id: string) {
    //     return this.topicModel.findById({_id: id})
    // }
    // updateTopic(id: string, updateTopicDto: UpdateTopicDto) {
    //     return this.topicModel.findByIdAndUpdate({_id: id}, updateTopicDto, {new: true} );
    // }

}