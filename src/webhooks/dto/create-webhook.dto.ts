import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsString,
  IsUUID,
} from 'class-validator';

export enum WebhookEventType {
  PAYMENT_RECEIVED = 'PAYMENT_RECEIVED',
  PAYMENT_CONFIRMED = 'PAYMENT_CONFIRMED',
  PAYMENT_CREDIT_CARD_CAPTURE_REFUSED = 'PAYMENT_CREDIT_CARD_CAPTURE_REFUSED',
}

export enum WebhookSendType {
  SEQUENTIALLY = 'SEQUENTIALLY',
  PARALLEL = 'PARALLEL',
}

export class CreateWebhookDto {
  @ApiProperty({
    description: 'Nome do webhook',
    example: 'Payment Confirmation Service',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'URL que receberá as notificações',
    example: 'https://seu-dominio.com/webhooks/asaas',
  })
  @IsString()
  url: string;

  @ApiProperty({
    description: 'Email para notificações',
    example: 'ops@seu-dominio.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Status do webhook',
    example: true,
  })
  @IsBoolean()
  enabled: boolean;

  @ApiProperty({
    description: 'Token de autenticação do webhook',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  authToken: string;

  @ApiProperty({
    enum: WebhookSendType,
    description: 'Tipo de envio das notificações',
    example: WebhookSendType.SEQUENTIALLY,
  })
  @IsEnum(WebhookSendType)
  sendType: WebhookSendType;

  @ApiProperty({
    enum: WebhookEventType,
    isArray: true,
    description: 'Eventos que o webhook irá receber',
    example: [
      WebhookEventType.PAYMENT_RECEIVED,
      WebhookEventType.PAYMENT_CONFIRMED,
      WebhookEventType.PAYMENT_CREDIT_CARD_CAPTURE_REFUSED,
    ],
  })
  @IsArray()
  @IsEnum(WebhookEventType, { each: true })
  events: WebhookEventType[];
}
