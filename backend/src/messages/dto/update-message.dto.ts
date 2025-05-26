import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDto {
  @ApiProperty({ description: 'Conteúdo da mensagem', required: false })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({
    description: 'ID do chat ao qual a mensagem pertence',
    required: false,
  })
  @IsOptional()
  @IsString()
  chatId?: string;
}
