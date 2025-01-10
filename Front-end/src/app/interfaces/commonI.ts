import { Observable } from "rxjs";
import { TopicModel } from "../types/topicModel";

export interface CommonI {
    createMandatoryTopic(): void;
};