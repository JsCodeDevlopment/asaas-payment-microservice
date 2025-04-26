# Microserviço de Pagamentos Asaas

Este repositório contém um microserviço desenvolvido em NestJS que encapsula toda a integração com a API do Asaas. O objetivo é fornecer, de forma centralizada e reutilizável por várias aplicações, funcionalidades de:

- Criação de clientes
- Geração de cobranças (boleto, cartão de crédito, PIX)
- Criação e consulta de links de pagamento
- Consulta de parcelas de planos de pagamento
- Gestão de notificações (email, SMS, WhatsApp, voz)
- Documentação automática de todas as rotas via Swagger

### Principais Benefícios

- **Desacoplamento**: toda a lógica de comunicação com a API do Asaas está isolada em módulos dedicados.
- **Tipagem Forte**: uso de DTOs e interfaces para garantir segurança de tipo em todas as requisições.
- **Configuração Centralizada**: via `@nestjs/config`, mantendo segredos e URLs em variáveis de ambiente.
- **Documentação Viva**: Swagger disponível em `/api` para explorar e testar todos os endpoints.

---

## Arquitetura

O projeto segue a arquitetura modular do NestJS e padrões de Clean Architecture:

- **AppModule**: ponto de entrada, carrega configurações globais e importa os módulos de recurso.
- **Configs** (`src/config`): arquivos de configuração de ambiente para Asaas e Swagger, usando `registerAs`.
- **AsaasModule**: módulo dinâmico (via `registerAsync()`) marcado como `@Global`, que provê `AsaasService` configurado com `HttpModule`.
- **Feature Modules**:
  - **CustomersModule**: gerencia criação de clientes
  - **PaymentsModule**: emite cobranças e consulta parcelas
  - **PaymentLinksModule**: cria e consulta links de pagamento
  - **NotificationsModule**: obtém e atualiza notificações
- **DTOs** (`src/<module>/dto`): definem formatos de entrada e saída para cada endpoint.
- **Swagger**: configurado dinamicamente via `swagger.config.ts` e exposto em `/api`.

```
asaas/
├── asaas.module.ts  (Global)
├── asaas.service.ts

config/
├── asaas.config.ts
└── swagger.config.ts

customers/
├── dto/
│   ├── create-customer.dto.ts
│   └── customer-response.dto.ts
├── customers.controller.ts
├── customers.module.ts
└── customers.service.ts

notifications/
├── dto/
│   ├── notification-request.dto.ts
│   └── notification-response.dto.ts
├── notifications.controller.ts
├── notifications.module.ts
└── notifications.service.ts

payment-links/
├── dto/
│   ├── create-payment-link.dto.ts
│   └── payment-link-response.dto.ts
├── payment-links.controller.ts
├── payment-links.module.ts
└── payment-links.service.ts

payment/
├── dto/
│   ├── create-payment.dto.ts
│   └── payment-response.dto.ts
├── payment.controller.ts
├── payment.module.ts
└── payment.service.ts
```

---

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

3. **Configure variáveis de ambiente**

   Crie um arquivo `.env` na raiz do projeto com o conteúdo abaixo:

   ```dotenv
   ASAAS_API_KEY=<sua_chave_api>
   ASAAS_BASE_URL=https://sandbox.asaas.com/api/v3

   SWAGGER_TITLE=Microserviço de Pagamentos Asaas
   SWAGGER_DESCRIPTION=Microserviço desenvolvido em NestJS que encapsula toda a integração com a API do Asaas
   SWAGGER_VERSION=1.0.0
   SWAGGER_PATH=docs

   PORT=3000
   ```

4. **Execute em modo de desenvolvimento**

   ```bash
   npm run start:dev
   ```

5. **Acesse a documentação**
   Abra no navegador:
   ````
   http://localhost:8000/docs
   ````

---

## Tecnologias Utilizadas.

 <div align="center">
  <image src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <image src="https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" />
  <image src="https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white" />
  <image src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <image src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white" />
  <image src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <image src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" />
</div>

## Desenvolvedor.

| Foto                                                                                                                           | Nome                                                 | Cargo               |
| ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------- | ------------------- |
| <img src="https://avatars.githubusercontent.com/u/100796752?s=400&u=ae99bd456c6b274cd934d85a374a44340140e222&v=4" width="100"> | [Jonatas Silva](https://github.com/JsCodeDevlopment) | FullStack Developer |

---
