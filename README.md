# Microserviço de Pagamentos Asaas

Microserviço desenvolvido em NestJS que encapsula toda a integração com a API do Asaas, incluindo gerenciamento seguro de tokens de acesso e processamento de pagamentos.

## Funcionalidades

- 🔐 Gerenciamento seguro de access tokens por projeto
- 💳 Processamento de pagamentos com cartão de crédito
- 🔒 Criptografia de dados sensíveis
- 👥 Gerenciamento de clientes
- 🔗 Geração de links de pagamento
- 📱 Notificações de pagamento
- 📊 Documentação Swagger integrada

## Estrutura do Projeto

```
src/
├── access-tokens/           # Gerenciamento de tokens de acesso
│   ├── dto/
│   ├── entities/
│   ├── access-tokens.controller.ts
│   ├── access-tokens.service.ts
│   └── access-tokens.module.ts
├── asaas/                   # Módulo principal do Asaas
│   ├── asaas.service.ts
│   └── asaas.module.ts
├── config/                  # Configurações da aplicação
│   ├── asaas.config.ts
│   ├── cors.config.ts
│   ├── database.config.ts
│   └── swagger.config.ts
├── customers/              # Gerenciamento de clientes
│   ├── dto/
│   │   ├── create-customer.dto.ts
│   │   └── customer-response.dto.ts
│   ├── customers.controller.ts
│   ├── customers.module.ts
│   └── customers.service.ts
├── payments/              # Processamento de pagamentos
│   ├── dto/
│   │   ├── create-payment.dto.ts
│   │   └── payment-response.dto.ts
│   ├── payments.controller.ts
│   ├── payments.module.ts
│   └── payments.service.ts
├── payment-links/         # Links de pagamento
│   ├── dto/
│   │   ├── create-payment-link.dto.ts
│   │   └── payment-link-response.dto.ts
│   ├── payment-links.controller.ts
│   ├── payment-links.module.ts
│   └── payment-links.service.ts
├── notifications/         # Notificações
│   ├── dto/
│   │   ├── notification-request.dto.ts
│   │   └── notification-response.dto.ts
│   ├── notifications.controller.ts
│   ├── notifications.module.ts
│   └── notifications.service.ts
└── types/                 # Tipos e enums
```

## Arquitetura e Segurança

### Visão Geral da Arquitetura

O microserviço foi projetado seguindo princípios de segurança e isolamento, permitindo que múltiplos projetos utilizem a mesma infraestrutura de pagamentos de forma segura e independente. A arquitetura é baseada em três pilares principais:

1. **Isolamento por Projeto**

   - Cada projeto/cliente possui seu próprio token de acesso
   - Tokens são armazenados de forma segura no banco de dados
   - Validação de tokens em todas as requisições
   - Suporte a múltiplos ambientes (sandbox/produção)

2. **Segurança de Dados Sensíveis**

   - Criptografia RSA para dados de cartão de crédito
   - Dados sensíveis nunca são armazenados
   - Transmissão segura via HTTPS
   - Validação e sanitização de dados

3. **Gestão de Tokens**
   - CRUD completo para tokens de acesso
   - Ativação/desativação de tokens
   - Histórico de uso
   - Rotação segura de tokens

### Fluxo de Segurança

#### 1. Gerenciamento de Tokens

```mermaid
graph LR
    A[Projeto] -->|1. Registra Token| B[API Gateway]
    B -->|2. Armazena| C[(Database)]
    A -->|3. Usa Token| D[Requisições]
    D -->|4. Valida| B
    B -->|5. Processa| E[Asaas API]
```

- **Registro**: Cada projeto registra seu token através da API
- **Armazenamento**: Tokens são armazenados de forma criptografada
- **Validação**: Cada requisição é validada contra o banco de dados
- **Rotação**: Tokens podem ser atualizados sem interromper o serviço

#### 2. Processamento de Pagamentos

```mermaid
graph LR
    A[Cliente] -->|1. Dados Criptografados| B[API Gateway]
    B -->|2. Decripta| C[Processamento]
    C -->|3. Token do Projeto| D[Asaas API]
    D -->|4. Resposta| B
    B -->|5. Resposta Segura| A
```

- **Criptografia**: Dados do cartão são criptografados no cliente
- **Transmissão**: Dados trafegam criptografados via HTTPS
- **Processamento**: Decriptação apenas no momento do processamento
- **Armazenamento**: Dados sensíveis nunca são persistidos

### Decisões de Segurança

1. **Tokens de Acesso**

   - **Por que tokens por projeto?**
     - Isolamento completo entre projetos
     - Controle granular de acesso
     - Facilidade de revogação
     - Suporte a múltiplos ambientes
   - **Armazenamento Seguro**
     - Tokens são armazenados com hash
     - Validação em todas as requisições
     - Suporte a rotação de tokens
     - Histórico de uso para auditoria

2. **Dados de Cartão**

   - **Por que criptografia RSA?**
     - Criptografia assimétrica para máxima segurança
     - Chaves públicas/privadas separadas
     - Dados trafegam criptografados
     - Decriptação apenas no processamento
   - **Boas Práticas**
     - Dados nunca são armazenados
     - Validação em múltiplas camadas
     - Sanitização de dados
     - Logs seguros sem dados sensíveis

3. **Infraestrutura**

   - **Por que microserviço?**
     - Isolamento de responsabilidades
     - Escalabilidade independente
     - Manutenção simplificada
     - Atualizações sem downtime
   - **Segurança da Infraestrutura**
     - HTTPS em todas as comunicações
     - CORS configurado por ambiente
     - Rate limiting por projeto
     - Monitoramento e alertas

### Benefícios da Arquitetura

1. **Para Projetos**

   - Gerenciamento independente de tokens
   - Controle total sobre ambientes
   - Fácil integração via API
   - Documentação completa

2. **Para Desenvolvedores**

   - Código modular e testável
   - Documentação Swagger integrada
   - Ambiente de desenvolvimento Docker
   - Testes automatizados

3. **Para Operações**
   - Monitoramento centralizado
   - Logs detalhados
   - Backup automático
   - Healthchecks

## Pré-requisitos

- Node.js (v20.x ou superior)
- Docker e Docker Compose
- PostgreSQL (via Docker)
- Conta na Asaas com token de acesso

## Instalação

1. **Clone o repositório**

   ```bash
   git clone https://github.com/seu-usuario/payment-gateway-microservice-asaas.git
   cd payment-gateway-microservice-asaas
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure o ambiente**
   Crie um arquivo `.env` na raiz do projeto:

   ```env
   # Database Configuration
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/asaas_payment_gateway

   # Environment
   NODE_ENV=development
   PORT=8000

   # Frontend URLs (comma-separated)
   FRONTEND_URL=http://localhost:3000

   # Swagger Configuration
   SWAGGER_TITLE=Microserviço de Pagamentos Asaas
   SWAGGER_DESCRIPTION=Microserviço desenvolvido em NestJS que encapsula toda a integração com a API do Asaas
   SWAGGER_VERSION=1.0
   SWAGGER_PATH=api

   # Asaas Configuration
   ASAAS_BASE_URL=https://api.asaas.com/v3
   ASAAS_SANDBOX_BASE_URL=https://sandbox.asaas.com/api/v3
   ```

4. **Inicie o banco de dados**

   ```bash
   docker-compose up -d
   ```

5. **Execute a aplicação**

   ```bash
   # Desenvolvimento
   npm run start:dev

   # Produção
   npm run build
   npm run start:prod
   ```

## Uso

### Gerenciamento de Access Tokens

Cada projeto deve gerenciar seus próprios tokens de acesso através da API:

```http
# Criar token
POST /access-tokens
{
    "clientId": "seu_client_id",
    "accessToken": "seu_token_asaas",
    "description": "Ambiente de produção"
}

# Listar tokens
GET /access-tokens

# Atualizar token
PATCH /access-tokens/{id}
{
    "accessToken": "novo_token",
    "isActive": true
}
```

### Exemplo de Integração

```typescript
// No seu projeto
class PaymentService {
  constructor(
    private readonly httpService: HttpService,
    private readonly accessToken: string,
  ) {}

  async createPayment(paymentData: any) {
    const response = await this.httpService.post(
      'http://localhost:8000/payments',
      paymentData,
      {
        headers: {
          'Content-Type': 'application/json',
          access_token: this.accessToken,
        },
      },
    );
    return response.data;
  }
}
```

## Documentação da API

A documentação completa da API está disponível via Swagger UI:

```
http://localhost:8000/api
```

## Testes

Você pode testar as requisições usando os arquivos `.rest` na pasta `test/`:

```bash
# Instale a extensão REST Client no VS Code
# Abra o arquivo test/access-tokens.rest
# Clique em "Send Request" acima de cada requisição
```

## Segurança

- Tokens de acesso são armazenados de forma segura no banco de dados
- Dados sensíveis são criptografados
- Cada projeto gerencia seus próprios tokens
- Suporte a múltiplos ambientes (sandbox/produção)
- Validação de tokens em todas as requisições

## Manutenção

### Backup

O banco de dados é persistido através de um volume Docker:

```yaml
volumes:
  postgres_data:
    name: asaas_payment_gateway_data
```

### Monitoramento

O container PostgreSQL inclui healthcheck para garantir disponibilidade:

```yaml
healthcheck:
  test: ['CMD-SHELL', 'pg_isready -U postgres']
  interval: 5s
  timeout: 5s
  retries: 5
```

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Tecnologias Utilizadas.

 <div align="center">
  <image src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <image src="https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" />
  <image src="https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white" />
  <image src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <image src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white" />
  <image src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <image src="https://img.shields.io/badge/typeorm-FE0803?style=for-the-badge&logo=typeorm&logoColor=white" />
  <image src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
  <image src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" />
  <image src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" />
</div>

## Desenvolvedor.

| Foto                                                                                                                           | Nome                                                 | Cargo               |
| ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------- | ------------------- |
| <img src="https://avatars.githubusercontent.com/u/100796752?s=400&u=ae99bd456c6b274cd934d85a374a44340140e222&v=4" width="100"> | [Jonatas Silva](https://github.com/JsCodeDevlopment) | FullStack Developer |

---
