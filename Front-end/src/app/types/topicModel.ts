export interface TopicModel {
    _id?: string;
    __v?: number;
    weather?: boolean;
    mandatory: boolean;
    time: Date;
    title: string;
    description: string;
}