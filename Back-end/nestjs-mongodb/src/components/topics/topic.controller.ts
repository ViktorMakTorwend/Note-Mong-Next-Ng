import {
    Body,
    Controller,
    Get,
    Post,
    Param,
    HttpException,
    Patch,
    UsePipes,
    ValidationPipe,
}
    from "@nestjs/common";
import { TopicService } from "./topic.service";
import { CreateTopicDto } from "./dto/CreateTopic.dto";
import mongoose from "mongoose";
import { UpdateTopicDto } from "./dto/UpdateTopic.dto";

@Controller('topics')
export class TopicController {
    constructor(private topicService: TopicService) { }

    @Post()
    @UsePipes(new ValidationPipe())
    createTopic(@Body() createTopicDto: CreateTopicDto) {
        console.log("CREATE TOPIC", createTopicDto);
        return this.topicService.createTopic(createTopicDto);
    }

    @Get()
    getTopics() {
        return this.topicService.getTopics();
    }

    @Get(':id')
    async getTopicById(@Param('id') id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if(!isValid) throw new HttpException('Topic not found', 404);
        const findTopic = await this.topicService.getTopicById(id);
        if(!findTopic) throw new HttpException('Topic not found', 404);
        return findTopic;
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    async updateTopic(@Param('id') id:string, @Body() updateTopicDto: UpdateTopicDto) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if(!isValid) throw new HttpException('Invalid ID', 400);
        const updateTopic = await this.topicService.updateTopic(id, updateTopicDto);
        if(!updateTopic) throw new HttpException('Topic not found', 404);
        return updateTopic;
    }

}