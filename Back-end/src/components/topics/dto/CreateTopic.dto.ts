import { IsBoolean, IsNotEmpty, IsOptional, isString, IsString } from "class-validator";

export class CreateTopicDto {
    @IsBoolean()
    mandatory: boolean;

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

    @IsBoolean()
    @IsOptional()
    weather?: boolean;
}