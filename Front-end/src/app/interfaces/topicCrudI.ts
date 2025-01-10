import { Observable } from "rxjs";
import { TopicModel } from "../types/topicModel";

export interface TopicCrudI {
    getTopics(): Observable<any>;

    getTopicByTitle(name: string): Observable<any>;

    getTopicByDate(date: string, mandatory: boolean, title: string): Observable<any>;

    saveTopic(topic: TopicModel): Observable<any>;

    changeTopic(topic: TopicModel): Observable<any>;

    deleteTopic(topic: TopicModel): Observable<any>;
};
