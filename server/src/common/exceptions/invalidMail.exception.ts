import { HttpException } from '@nestjs/common';

export class InvalidMailException extends HttpException {
  constructor() {
    super(
      'Invalid mailbox. Local mailbox yevgencikk@mail.ru is unavailable: user not found',
      550,
    );
  }
}
