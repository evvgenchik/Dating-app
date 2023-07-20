import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from './chat.service';
import { UpdateChatDto } from './dto/update-chat.dto';
import { MessageService } from 'src/message/message.service';
import { CreateMessageDto } from 'src/message/dto/create-message.dto';
import { ConversationService } from 'src/conversation/conversation.service';
import { CreateConversationDto } from 'src/conversation/dto/create-conversation.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly chatService: ChatService,
    private readonly messageService: MessageService,
    private readonly convversationService: ConversationService,
  ) {}

  @SubscribeMessage('sendMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto) {
    const message = await this.messageService.create(createMessageDto);

    this.server.sockets.emit('receiveMessage', message);
    // this.findAllForConversation(createMessageDto.conversationId);
    // return message;
  }

  // @SubscribeMessage('getAllMessages')
  // async findAllForConversation(conversationId: string) {
  //   const messages = await this.messageService.findAllForConversation(
  //     conversationId,
  //   );

  //   this.server.sockets.emit('receiveAllMessages', messages);

  //   return messages;
  // }

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
    }

    this.server.sockets.emit('receiveConversation', conversation);
  }

  // @SubscribeMessage('createConversation')
  // async createConversation(@MessageBody() usersEmails: CreateConversationDto) {
  //   const conversation = await this.convversationService.create(usersEmails);

  //   return conversation;
  // }

  // @SubscribeMessage('findOneChat')
  // findOne(@MessageBody() id: number) {
  //   return this.chatService.findOne(id);
  // }

  // @SubscribeMessage('updateChat')
  // update(@MessageBody() updateChatDto: UpdateChatDto) {
  //   return this.chatService.update(updateChatDto.id, updateChatDto);
  // }

  // @SubscribeMessage('removeChat')
  // remove(@MessageBody() id: number) {
  //   return this.chatService.remove(id);
  // }
}
