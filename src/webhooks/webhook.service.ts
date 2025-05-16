import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AsaasService } from '../asaas/asaas.service';
import { EnvironmentOptionsType } from '../types/environment.enum';
import { CreateWebhookDto, WebhookEventType } from './dto/create-webhook.dto';
import { WebhookPayloadDto } from './dto/webhook-payload.dto';
import { WebhookEvent } from './entities/webhook-event.entity';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);

  constructor(
    private readonly asaasService: AsaasService,
    @InjectRepository(WebhookEvent)
    private readonly webhookEventRepository: Repository<WebhookEvent>,
  ) {}

  async createWebhook(
    dto: CreateWebhookDto,
    token: string,
    environment: EnvironmentOptionsType,
  ) {
    return this.asaasService.createWebhook(dto, token, environment);
  }

  async handleWebhookEvent(payload: WebhookPayloadDto, authToken: string) {
    // Validate the webhook auth token
    if (authToken !== process.env.WEBHOOK_AUTH_TOKEN) {
      throw new Error('Invalid webhook authentication token');
    }

    // Create webhook event record
    const webhookEvent = this.webhookEventRepository.create({
      event: payload.event,
      payload,
      paymentId: payload.payment.id,
      customerId: payload.payment.customer,
      value: payload.payment.value,
      netValue: payload.payment.netValue,
      status: payload.payment.status,
      billingType: payload.payment.billingType,
    });

    try {
      // Save the webhook event
      await this.webhookEventRepository.save(webhookEvent);

      // Process different webhook events
      switch (payload.event) {
        case WebhookEventType.PAYMENT_RECEIVED:
          await this.handlePaymentReceived(webhookEvent);
          break;
        case WebhookEventType.PAYMENT_CONFIRMED:
          await this.handlePaymentConfirmed(webhookEvent);
          break;
        case WebhookEventType.PAYMENT_CREDIT_CARD_CAPTURE_REFUSED:
          await this.handlePaymentCaptureRefused(webhookEvent);
          break;
        default:
          this.logger.warn(`Unhandled webhook event: ${payload.event}`);
      }

      // Mark event as processed
      webhookEvent.processed = true;
      webhookEvent.processedAt = new Date();
      await this.webhookEventRepository.save(webhookEvent);
    } catch (error) {
      // Update event with error
      webhookEvent.error =
        error instanceof Error ? error.message : 'Unknown error';
      await this.webhookEventRepository.save(webhookEvent);
      throw error;
    }
  }

  private async handlePaymentReceived(webhookEvent: WebhookEvent) {
    this.logger.log(`Processing payment received: ${webhookEvent.paymentId}`);
    // Implement your payment received logic here
    // For example: update order status, send notification, etc.
  }

  private async handlePaymentConfirmed(webhookEvent: WebhookEvent) {
    this.logger.log(`Processing payment confirmed: ${webhookEvent.paymentId}`);
    // Implement your payment confirmed logic here
    // For example: update order status, send confirmation email, etc.
  }

  private async handlePaymentCaptureRefused(webhookEvent: WebhookEvent) {
    this.logger.log(
      `Processing payment capture refused: ${webhookEvent.paymentId}`,
    );
    // Implement your payment capture refused logic here
    // For example: notify customer, update order status, etc.
  }

  async findAllWebhookEvents() {
    return this.webhookEventRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findWebhookEventById(id: string) {
    return this.webhookEventRepository.findOne({
      where: { id },
    });
  }
}
