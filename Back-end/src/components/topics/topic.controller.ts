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
    Delete,
    Query,
} from "@nestjs/common";
import mongoose from "mongoose";
import { TopicService } from "./topic.service";
import { CreateTopicDto } from "./dto/CreateTopic.dto";
import { UpdateTopicDto } from "./dto/UpdateTopic.dto";

@Controller('topics')
export class TopicController {
    constructor(private topicService: TopicService) { }

    @Post()
    @UsePipes(new ValidationPipe())
    createTopic(@Body() createTopicDto: CreateTopicDto) {
        return this.topicService.createTopic(createTopicDto);
    }

    @Get()
    getTopics() {
        return this.topicService.getTopics();
    }

    @Delete(':id')
    async deleteTopic(@Param('id') id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException('Invalid ID', 400);
        const deleteTopic = await this.topicService.deleteTopic(id);
        if (!deleteTopic) throw new HttpException('Topic not found', 404);
        return;
    }

    @Get('/findByName/:titleName')
    async getTopicByName(@Param('titleName') titleName: string) {
        const foundTopic = await this.topicService.getTopicByTitle(titleName);
        return foundTopic;
    }

    // @Get(':id')
    // async getTopicById(@Param('id') id: string) {
    //     const isValid = mongoose.Types.ObjectId.isValid(id);
    //     if (!isValid) throw new HttpException('Topic not found', 404);
    //     const foundTopic = await this.topicService.getTopicById(id);
    //     if (!foundTopic) throw new HttpException('Topic not found', 404);
    //     return foundTopic;
    // }


    // @Patch(':id')
    // @UsePipes(new ValidationPipe())
    // async updateTopic(@Param('id') id: string, @Body() updateTopicDto: UpdateTopicDto) {
    //     const isValid = mongoose.Types.ObjectId.isValid(id);
    //     if (!isValid) throw new HttpException('Invalid ID', 400);
    //     const updateTopic = await this.topicService.updateTopic(id, updateTopicDto);
    //     if (!updateTopic) throw new HttpException('Topic not found', 404);
    //     return updateTopic;
    // }

}