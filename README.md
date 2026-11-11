API - Agrenture Challengy
Descrição
Esta API foi desenvolvida em Node.js, com o objetivo de disponibilizar serviços e funcionalidades através de endpoints REST.

Tecnologias utilizadas
Node.js
Express.js
Sequelize ORM
PostgreSQL
JavaScript
Pré-requisitos
Antes de iniciar a instalação, é necessário ter instalado:

Node.js
npm
PostgreSQL
Git
Instalação
1. Clonar o repositório

bash
git clone https://github.com/antoniopamantec/challengyAgriVenture/pulse
2. Aceder à pasta do projeto

bash
cd NOME-DO-PROJETO
3. Instalar as dependências
npm install
4. Configurar as variáveis de ambiente
Criar um ficheiro .env na raiz do projeto:


env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=nome_da_base
DB_USER=postgres
DB_PASSWORD=sua_password

JWT_SECRET=sua_chave_secreta

Nota: Ajustar as variáveis de ambiente conforme a configuração do ambiente de execução.

5. Configurar a base de dados
Criar uma base de dados PostgreSQL com o nome definido na variável DB_NAME.

Executar as migrations, caso o projeto utilize Sequelize CLI:

npx sequelize-cli db:migrate
Executar a API

npm start
A API estará disponível em:


text
http://localhost:3000

Endpoints
Os endpoints disponíveis podem ser consultados na documentação da API.

Exemplo:


Método	Endpoint	Descrição
GET	/leads	Listar leads
GET	/leads/:id	Consultar lead
POST	/leads	Criar lead
PUT	/leads/:id	Atualizar lead
DELETE	/leads/:id	Remover lead
