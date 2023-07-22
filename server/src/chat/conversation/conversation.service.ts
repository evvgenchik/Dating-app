import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
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
        AND: [
          {
            users: {
              some: { email: userAddressEmail },
            },
          },
          {
            users: {
              some: { email: userSourceEmail },
            },
          },
        ],
        // users: {
        //   some: { email: userSourceEmail } && {
        //     email: userAddressEmail,
        //   },
        // },
      },
      include: {
        messages: true,
      },
    });
    return conversation;
  }

  async remove(id: string) {
    return await this.prisma.conversation.delete({ where: { id } });
  }

  async removeByEmails({ userAddressEmail, userSourceEmail }) {
    return await this.prisma.conversation.deleteMany({
      where: {
        users: {
          some: { email: userAddressEmail } && { email: userSourceEmail },
        },
      },
    });
  }
}
