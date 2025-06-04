import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

/**
 * Serviço responsável por gerenciar a criptografia e descriptografia de dados sensíveis,
 * especialmente para pagamentos com cartão de crédito.
 *
 * Este serviço implementa um sistema de criptografia assimétrica usando RSA (Rivest-Shamir-Adleman)
 * com as seguintes características:
 * - Gera um par de chaves RSA (pública e privada) com 2048 bits de comprimento
 * - Utiliza o padding OAEP (Optimal Asymmetric Encryption Padding) com SHA-256
 * - Suporta a leitura de chaves pré-configuradas via variáveis de ambiente
 *
 * O fluxo de funcionamento é:
 * 1. Na inicialização do módulo (onModuleInit):
 *    - Tenta obter as chaves RSA das variáveis de ambiente (RSA_PRIVATE_KEY e RSA_PUBLIC_KEY)
 *    - Se as chaves não existirem, gera um novo par de chaves automaticamente
 *    - Armazena as chaves em memória para uso posterior
 *
 * 2. A chave pública é exposta via getPublicKey() para que clientes possam:
 *    - Criptografar dados sensíveis (como dados do cartão de crédito)
 *    - Enviar os dados criptografados de forma segura para o servidor
 *
 * 3. O método decrypt() é usado internamente para:
 *    - Receber dados criptografados em base64
 *    - Descriptografar usando a chave privada
 *    - Retornar os dados originais em formato UTF-8
 *
 * Uso típico:
 * 1. Cliente obtém a chave pública via endpoint /payments/public-key
 * 2. Cliente criptografa dados sensíveis usando a chave pública
 * 3. Cliente envia dados criptografados para o servidor
 * 4. Servidor descriptografa os dados usando a chave privada
 *
 * @example
 * // No cliente (usando a chave pública)
 * const encryptedData = encryptWithPublicKey(creditCardData, publicKey);
 *
 * // No servidor (usando este serviço)
 * const decryptedData = encryptionService.decrypt(encryptedData);
 */
@Injectable()
export class EncryptionService implements OnModuleInit {
  private privateKey!: string;
  private publicKey!: string;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const envPrivateKey = this.configService.get<string>('RSA_PRIVATE_KEY');
    const envPublicKey = this.configService.get<string>('RSA_PUBLIC_KEY');

    if (!envPrivateKey || !envPublicKey) {
      const keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem',
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
        },
      });

      this.privateKey = keyPair.privateKey;
      this.publicKey = keyPair.publicKey;
    } else {
      this.privateKey = envPrivateKey;
      this.publicKey = envPublicKey;
    }
  }

  /**
   * Retorna a chave pública RSA para uso dos clientes.
   * Esta chave deve ser usada pelos clientes para criptografar dados sensíveis
   * antes de enviá-los ao servidor.
   *
   * @returns {string} A chave pública no formato PEM
   */
  getPublicKey(): string {
    return this.publicKey;
  }

  /**
   * Descriptografa dados que foram criptografados usando a chave pública.
   *
   * @param {string} encryptedData - Dados criptografados em formato base64
   * @returns {string} Dados descriptografados em formato UTF-8
   * @throws {Error} Se a descriptografia falhar (dados inválidos ou corrompidos)
   */
  decrypt(encryptedData: string): string {
    const buffer = Buffer.from(encryptedData, 'base64');
    const decrypted = crypto.privateDecrypt(
      {
        key: this.privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
      },
      buffer,
    );
    return decrypted.toString('utf8');
  }
}
