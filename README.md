# to-do-list
<meta charset="utf-8">


<p align="center">
  <a href="#rocket-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#instalar">Instalar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

<br>

## :rocket: Tecnologias

Esse projeto está sendo desenvolvido com as seguintes tecnologia e/ou plataformas:

- [NodeJS](https://nodejs.org/en/)
- [ReactJS](https://pt-br.reactjs.org/)
- [NestJS](https://docs.nestjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [RabbitMQ](https://www.rabbitmq.com/)


## 💻 Projeto

Esta aplicação foi criado um frontend para informar um site para, realizar o crawler de todas as imagens,
o frontend envia o pedido para o backend, e o backend adiciona o pedido em uma fila para o servico de crawler
ir realizando o download das imagens


## Instalar

Primeiro subir o backend com o rabbitmq e o mongodb
- docker-compose up -d
- cd backend 
- npm start

Subir o frontend
- cd frontend
- npm start

Subir o servico crawler
- cd service
- npm start