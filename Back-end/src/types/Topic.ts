import { Types } from "mongoose";

export type TopicModel = {
    _id: Types.ObjectId;
    mandatory: boolean;
    title: string;
    description: string;
    picUrl?: string;
    weather?: boolean;
}