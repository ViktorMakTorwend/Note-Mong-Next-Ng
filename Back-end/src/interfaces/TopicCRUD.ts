import { Types } from "mongoose";
import { CreateTopicDto } from "src/components/topics/dto/CreateTopic.dto";
import { Topic } from "src/schemas/Topic.schema";
import { TopicModel } from "src/types/Topic";

export interface TopicCrud {
    createTopic(createTopicDto: CreateTopicDto): Promise<TopicModel>;

    getTopics(): Promise<TopicModel[]> | null;

    deleteTopic(id:string): Promise<TopicModel> | null;

    getTopicByTitle(titleName: string): Promise<TopicModel> | null;

    updateTopic(id: string, updateTopicDto: CreateTopicDto):Promise<TopicModel> | null;
};