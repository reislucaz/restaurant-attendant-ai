import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Message, Role } from '@prisma/client';
import { CreateMessageDto, UpdateMessageDto } from './dto';
import { Anthropic } from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT } from 'src/utils/system-prompt';
import { MessageParam } from '@anthropic-ai/sdk/resources/messages';

@Injectable()
export class MessagesService {
  private readonly logger = new Logger(MessagesService.name);
  private readonly anthropic: Anthropic;

  constructor(private readonly prisma: PrismaService) {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  async findAll(
    limit = 50,
    cursor?: number,
    chatId?: string,
  ): Promise<Message[]> {
    return this.prisma.message.findMany({
      where: chatId ? { chatId } : undefined,
      take: limit,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number): Promise<Message> {
    const message = await this.prisma.message.findUnique({ where: { id } });
    if (!message) {
      throw new NotFoundException(`Mensagem com ID ${id} não encontrada`);
    }
    return message;
  }

  async create(data: CreateMessageDto): Promise<any> {
    let chatId = data.chatId;

    if (!chatId) {
      const chat = await this.prisma.chat.create({ data: {} });
      chatId = chat.id;
    }

    await this.prisma.message.create({
      data: { content: data.content, sender: Role.USER, chatId },
    });

    const agentContent = await this.generateAgentReply(data.content, chatId);

    const agentMessage = await this.prisma.message.create({
      data: { content: agentContent, sender: Role.BOT, chatId },
    });

    return { ...agentMessage, chatId };
  }

  async update(id: number, data: UpdateMessageDto): Promise<Message> {
    try {
      return await this.prisma.message.update({ where: { id }, data });
    } catch (error) {
      this.logger.error(`Erro ao atualizar mensagem ${id}`, error.stack);
      throw new InternalServerErrorException(
        `Não foi possível atualizar a mensagem ${id}`,
      );
    }
  }

  async remove(id: number): Promise<Message> {
    try {
      return await this.prisma.message.delete({ where: { id } });
    } catch (error) {
      this.logger.error(`Erro ao deletar mensagem ${id}`, error.stack);
      throw new InternalServerErrorException(
        `Não foi possível deletar a mensagem ${id}`,
      );
    }
  }

  private async generateAgentReply(
    userInput: string,
    chatId: string,
  ): Promise<string> {
    try {
      const products = await this.prisma.product.findMany({
        select: { name: true, description: true },
      });

      const messages = await this.prisma.message.findMany({
        where: { chatId },
        orderBy: { createdAt: 'asc' },
      });

      const prompt = `${SYSTEM_PROMPT}
                      Produtos:
                      ${products.map((p) => `- ${p.name}: ${p.description}`).join('\n')}
                      \n\nHuman: ${userInput}\n\nAssistant:
                    `;

      const response = await this.anthropic.messages.create({
        model: 'claude-3-7-sonnet-20250219',
        stop_sequences: ['\n\nHuman:'],
        stream: false,
        max_tokens: 1000,
        messages: messages
          .map((m) => ({
            role: m.sender === Role.USER ? 'user' : 'assistant',
            content: m.content,
          }))
          .concat([
            {
              role: 'user',
              content: prompt,
            },
          ]) as MessageParam[],
      });

      return response.content[0].type === 'text'
        ? response.content[0].text
        : '';
    } catch (error) {
      this.logger.error('Erro ao gerar resposta do agente IA', error.stack);
      throw new InternalServerErrorException(
        'Não foi possível gerar resposta do agente IA',
      );
    }
  }
}
