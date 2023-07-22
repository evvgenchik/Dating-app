import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessageService } from './message/message.service';
import { CreateMessageDto } from './message/dto/create-message.dto';
import { ConversationService } from './conversation/conversation.service';
import { CreateConversationDto } from './conversation/dto/create-conversation.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly messageService: MessageService,
    private readonly convversationService: ConversationService,
  ) {}

  @SubscribeMessage('sendMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto) {
    const message = await this.messageService.create(createMessageDto);

    this.server.sockets.emit('receiveMessage', message);
  }

  @SubscribeMessage('getConversation')
  async findOneConversationId(@MessageBody() id: string) {
    const conversation = await this.convversationService.findOne(id);
    this.server.sockets.emit('receiveConversation', conversation);
  }

  @SubscribeMessage('getConversationForEmails')
  async findOneConversationEmails(
    @MessageBody() usersEmails: CreateConversationDto,
  ) {
    const conversation = await this.convversationService.findOneForUsers(
      usersEmails,
    );

    if (!conversation) {
      const newConversation = await this.convversationService.create(
        usersEmails,
      );
      this.server.sockets.emit('receiveConversation', newConversation);
      return;
    }

    this.server.sockets.emit('receiveConversation', conversation);
  }

  @SubscribeMessage('deleteConversation')
  async deleteConverstion(@MessageBody() id: string) {
    await this.convversationService.remove(id);
  }
}
