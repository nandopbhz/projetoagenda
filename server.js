//DOTENV PARA PROTEGER ARQUIVOS LOCAIS
require('dotenv').config();

//INSTALANDO E EXECUTANDO O EXPRESS
const express = require('express');
const app = express();

//MONGOOSE PARA O BANCO DE DADOS
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado');
    app.emit('pronto');
  })
  .catch(e => console.log(e));

//SESSION PARA MONITORAR OS COOKIES E SALVA-LOS NA BASE DE DADOS
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

//DEFINIR AS ROTAS DA APLICAÇÃO
const routes = require('./routes');

//EXTENSÃO PARA USAR OS CAMINHOS DE FORMA MAIS APROPRIADA
const path = require('path');

//SEGURANÇA
const helmet = require('helmet');
const csrf = require('csurf');
app.use(helmet());

//MIDDLEWARES
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');


//PERMITE IMPORTAÇÃO DE FORMS E JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//PERMITE O ACESSO A TODOS ARQUIVOS DA PASTA "PUBLIC"
app.use(express.static(path.resolve(__dirname, 'public')));

//CONFIGURAÇÃO DAS SESSIONS
const sessionOptions = session({
  secret:'ahsdiusahduas',
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
})
app.use(sessionOptions);
app.use(flash());

//PERMITE O ACESSO AS VIEWS
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

//INICIALICANZO O CsrfToken
app.use(csrf());

// MIDDLEWARES
app.use(middlewareGlobal);
app.use(csrfMiddleware);
app.use(checkCsrfError);
app.use(routes);

//PERMITE A APLICAÇÃO "ESCUTAR" AS MUDANÇAS
app.on('pronto', () => {
  app.listen(3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
  });
});