import { 
    Body,
    Controller, 
    Post,
    UsePipes,
    ValidationPipe, } 
    from "@nestjs/common";
import { TopicService } from "./topic.service";
import { CrerateTopicDto } from "./topic.dto";

@Controller('topics')
export class TopicController {
    constructor(private topicService: TopicService) {}
    
    @Post()
    //@UsePipes(new ValidationPipe())
    createTopic(@Body() createTopicDto: CrerateTopicDto) {
        console.log("CREATE TOPIC", createTopicDto);
        return this.topicService.createTopic(createTopicDto);
    }
}