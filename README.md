# Desafio Fullstack NestJS - API de Encurtamento de URLs (Francisco Liédson)

![Logo NeoShortener](/snapshots/logo.png)

## Sobre o Projeto

Este projeto consiste em uma API RESTful desenvolvida em NestJS para encurtamento e gerenciamento de URLs.
A aplicação permite criar URLs curtas, redirecioná-las para o endereço original, consultar todas as URLs cadastradas e contabilizar o número de acessos (hits).

O desenvolvimento prioriza boas práticas de arquitetura, com camadas bem definidas (Controller, Service, Prisma Service), validações, logs, utilização correta de códigos HTTP e integração com PostgreSQL via Prisma ORM.

## Tecnologias Utilizadas

<div style="display: flex; flex-wrap: wrap; gap: 5px; justify-content: center"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="45" height="45"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg" width="45" height="45"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" width="45" height="45"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" width="45" height="45"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" width="45" height="45"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/insomnia/insomnia-original.svg" width="45" height="45"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" width="45" height="45"/> </div>

## Objetivos do Desafio

- Criar uma API RESTful para encurtamento de URLs
- Registrar quantidade de acessos por URL
- Redirecionar URLs encurtadas
- Implementar arquitetura escalável com NestJS
- Utilizar Prisma como camada de persistência
- Fornecer respostas consistentes e seguras

## Funcionalidades

1. Criar URL encurtada.
2. Redirecionar URL curta.
3. Listar URLs criadas.
4. Contabilizar acessos (hits).
5. Expiração opcional por dias.
6. Validações com Form Request.

## Endpoints

Responsável pelo gerenciamento de URLs, incluindo criação, consulta, atualização e exclusão de URLs.

### Headers
- Content-Type: application/json
- Accept: application/json

| **Método** | **Endpoint**         | **Descrição**                                     |
| ---------- | -------------------- | ------------------------------------------------- |
| POST       | `/api/v1/urls`       | Cria uma nova URL encurtada                       |
| GET        | `/api/v1/urls`       | Lista todas as URLs criadas                       |
| GET        | `/{code}`            | Redireciona para a URL original e incrementa hits |
| GET        | `/api/v1/urls/{id}`  | Retorna detalhes de uma URL                       |

---
Dados de Entrada: 
```javascript
{
  "originalUrl": "https://liedsonbarros.vercel.app"
} 
```
Dados de Saída:
```javascript
{
  "id": 1,
  "code": "Xy7kL",
  "short_url": "http://localhost:3000/Xy7kL",
  "original_url": "https://liedsonbarros.vercel.app",
  "expires_at": null,
  "hits": 0,
  "created_at": "2025-11-29T18:01:05.000Z"
}
 
```
---

## Configuração do Projeto

```javascript
src/
 ├── controllers/
 │    └── urls.controller.ts
 ├── services/
 │    └── urls.service.ts
 ├── prisma/
 │    └── prisma.service.ts
 ├── app.module.ts
 └── main.ts
```

### Pré-requisitos

- npm ou yarn
- Node.js 20+
- NestJS CLI
- PostgreSQL
- Prisma ORM
- Docker (opcional): Caso prefira não instalar o PostgreSQL localmente, você pode usar o container Docker fornecido no `docker-compose.yml` para rodar o banco de dados criando uma pasta como volume no próprio projeto.

### Passos para Executar Localmente

####  Clone o repositório:
```bash
git clone https://github.com/LiedsonLB/fullstack-backend-nest.git
```

### Rodando o banco de dados com Docker (opcional)
Na raiz do projeto, execute:
```bash
docker compose up -d
```

#### Instalando dependências:
```bash
cd fullstack-backend-nest
npm install
```

#### Configure o arquivo .env:
Edite o arquivo `.env` para configurar a conexão com o banco de dados PostgreSQL (Mas a .env não está no .gitignore):
```
DATABASE_URL=postgresql://admin:admin@localhost:5432/encurtador?schema=public
```

#### Execute as migrações do Prisma:
```bash
npx prisma migrate deploy
```
#### Gere o cliente Prisma:
```bash
npx prisma generate
```
#### Inicie a aplicação:
```bash
npm run start:dev
```
A aplicação estará disponível em `http://localhost:3000`.

## Estrutura do Banco de Dados
### Tabelas
- urls
  - id (bigint, primary key)
  - originalUrl (string)
  - shortCode (string, unique)
  - hits (integer, default 0)
  - expiresAt (timestamp, nullable)
  - createdAt (timestamp)
  
## Imagens do Projeto

## Tabela do Banco de Dados
![Tabela do Banco de Dados imagem](/snapshots/database.png)

<!-- aqui vai ser a requisição POST -->
### Requisição POST para criar URL encurtada
![Requisição POST imagem](/snapshots/post_url_shortener.PNG)

### Requisição GET para Listar informações da URL encurtada
![Resposta POST imagem](/snapshots/get_url_shortener.PNG)

### Requisição GET para Listar as URLs encurtada
![Requisição GET imagem](/snapshots/get_urls_shortener.PNG)


## Deployment
O projeto está sendo preparado para deploy em serviços como Render.
Status atual: Em desenvolvimento (29/11/2025)

## Releases

- Release v1.0 ✅