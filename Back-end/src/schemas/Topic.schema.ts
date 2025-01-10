import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Topic {
    @Prop({unique: true, required: true})
    title: string;

    @Prop({required: true})
    description: string;

    @Prop({required: true})
    time: string;

    @Prop({required: true})
    mandatory: boolean;

    @Prop({required: false})
    picUrl?: string;

    @Prop({required: false})
    weather?: boolean;

}

export const TopicSchema = SchemaFactory.createForClass(Topic);
