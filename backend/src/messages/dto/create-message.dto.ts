import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class CreateMessageDto {
  @ApiProperty({ description: 'Conteúdo da mensagem' })
  @IsString()
  content: string;

  @ApiProperty({ description: 'Remetente da mensagem' })
  @IsEnum(Role)
  sender: Role;

  @ApiProperty({ description: 'ID do chat ao qual a mensagem pertence' })
  @IsString()
  @IsOptional()
  chatId: string;
}
