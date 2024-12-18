import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateTopicDto {
    @IsString()
    @IsOptional()
    picUrl?: string;
}