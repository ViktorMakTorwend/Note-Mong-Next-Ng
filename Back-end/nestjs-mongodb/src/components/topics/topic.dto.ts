import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CrerateTopicDto {
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