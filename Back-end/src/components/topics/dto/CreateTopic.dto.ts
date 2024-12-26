import { IsNotEmpty, IsOptional, isString, IsString } from "class-validator";

export class CreateTopicDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    time: string;

    @IsString()
    @IsOptional()
    picUrl?: string;
}