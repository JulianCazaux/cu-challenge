import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class ParamsIdDto {
  @IsNumberString()
  @ApiProperty({ type: 'number' })
  id: string;
}
