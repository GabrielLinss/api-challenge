#Como executar a API

## Clone o projeto para sua máquina

#### Certifique-se de ter o yarn ou npm instalado em sua máquina

Dentro da pasta do projeto rode o comando **yarn** ou **npm i** para que as dependências sejam instaladas.

Ao final dessa instalação, dentro da pasta do projeto rode o comando **yarn dev** ou **npm run dev** para que API seja executada.

### Rodando a aplicação em um container

Antes de tudo, certifique-se de possuir o [Docker](https://www.docker.com/) e o [Docker Compose](https://docs.docker.com/compose/) instalados e executando em sua máquina, após isso, dentro da pasta da aplicação, entre no terminal e execute o comando **docker-compose up** e com isso a aplicação deverá estar executando e você pode seguir para o próximo passo. OBS: a URL foi configurada para ser a mesma que seria chamada se você não estivesse executando em um container. **URL http://localhost:3000**

#### Testando as rotas da API

Para isto você pode usar algum software que faça testes de requisições Http, recomendo usar o [Postman](https://www.getpostman.com/) ou o [Insomnia](https://insomnia.rest/download/)

#### Documentação

Dentro da pasta do projeto, abra o arquivo **docs.html** em um browser e você verá a documentação da API, todas as rotas e parâmetros estão descritos e como você pode testar cada rota.
