import { Types } from "mongoose";

export type TopicModel = {
    _id: Types.ObjectId;
    title: string;
    description: string;
    picUrl?: string;
}