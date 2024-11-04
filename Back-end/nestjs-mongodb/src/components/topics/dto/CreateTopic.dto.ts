import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTopicDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsString()
    @IsOptional()
    picUrl?: string;
}