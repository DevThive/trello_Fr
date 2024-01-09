import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCommentDto {
    @IsString()
    @ApiProperty({ description: "댓글" })
    @IsNotEmpty({message:'댓글을 입력해주세요'})
    comment: string;
}
