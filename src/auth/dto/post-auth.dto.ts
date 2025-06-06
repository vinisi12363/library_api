import { ApiProperty } from "@nestjs/swagger";

import { IsString } from "class-validator";
export class authRequestDto {
  @ApiProperty()
  @IsString()
  email: string;
  @ApiProperty()
  @IsString()
  password: string;
}
