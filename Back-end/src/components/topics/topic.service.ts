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
    
    getTopicByDate(date: string, mandatory: boolean, title: string): Promise<TopicModel> | null {
        return this.topicModel.findOne({ time: new RegExp(`^${date}`), mandatory: mandatory, title: title });
    }

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

    updateTopic(id: string, updateTopicDto: CreateTopicDto):Promise<TopicModel> | null  {
        return this.topicModel.findByIdAndUpdate({_id: id}, updateTopicDto, {new: true} );
    }

    // getTopicById(id: string) {
    //     return this.topicModel.findById({_id: id})
    // }

}