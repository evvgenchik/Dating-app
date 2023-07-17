import { Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}

  create(createConversationDto: CreateConversationDto) {
    const { emailOne, emailTwo } = createConversationDto;
    return this.prisma.conversation.create({
      data: {
        users: {
          connect: [{ email: emailOne }, { email: emailTwo }],
        },
      },
    });
  }

  findAll() {
    return `This action returns all conversation`;
  }

  findOne(id: string) {
    return this.prisma.conversation.findUnique({
      where: { id },
      include: {
        messages: true,
      },
    });
  }

  update(id: number, updateConversationDto: UpdateConversationDto) {
    return `This action updates a #${id} conversation`;
  }

  remove(id: number) {
    return `This action removes a #${id} conversation`;
  }
}
