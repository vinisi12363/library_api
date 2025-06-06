import { ApiProperty } from "@nestjs/swagger";

import { IsString } from "class-validator";
export class CreateAutorDto {
  @ApiProperty()
  @IsString()
  nome: string;
  @ApiProperty()
  @IsString()
  biografia: string;
}
