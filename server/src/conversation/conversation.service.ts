import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}

  create(createConversationDto: CreateConversationDto) {
    const { userAddressEmail, userSourceEmail } = createConversationDto;
    return this.prisma.conversation.create({
      data: {
        users: {
          connect: [{ email: userAddressEmail }, { email: userSourceEmail }],
        },
      },
    });
  }

  findAll() {
    return `This action returns all conversation`;
  }

  async findAllForUser(id: string) {
    const conversations = await this.prisma.conversation.findMany({
      where: {
        users: {
          some: { id },
        },
      },
      include: {
        users: true,
        messages: {
          take: 1,
        },
      },
    });

    if (!conversations) {
      throw new NotFoundException('Conversations not found');
    }

    return conversations;
  }

  async findOne(id: string) {
    const conversation = await this.prisma.conversation.findUnique({
      where: { id },
      include: {
        messages: true,
      },
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    return conversation;
  }

  async findOneForUsers({ userSourceEmail, userAddressEmail }) {
    const conversation = await this.prisma.conversation.findFirst({
      where: {
        users: {
          some: { email: userSourceEmail } && { email: userAddressEmail },
        },
      },
      include: {
        messages: true,
      },
    });
    return conversation;
  }

  remove(id: string) {
    return `This action removes a #${id} conversation`;
  }
}
