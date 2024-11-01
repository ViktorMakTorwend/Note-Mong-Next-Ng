import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Topic {
    @Prop({unique: true, required: true})
    title: string;

    @Prop({required: true})
    description: string;

    @Prop({required: false})
    picUrl?: string;

}

export const TopicSchema = SchemaFactory.createForClass(Topic);
