import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WebhookEventType } from '../dto/create-webhook.dto';

@Entity('webhook_events')
export class WebhookEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: WebhookEventType,
  })
  event: WebhookEventType;

  @Column('jsonb')
  payload: Record<string, any>;

  @Column({ nullable: true })
  paymentId: string;

  @Column({ nullable: true })
  customerId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  value: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  netValue: number;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  billingType: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false })
  processed: boolean;

  @Column({ nullable: true })
  processedAt: Date;

  @Column({ nullable: true })
  error: string;
}
