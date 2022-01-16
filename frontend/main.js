import 'core-js/stable';
import 'regenerator-runtime/runtime';
// import './assets/css/style.css';

//VALIDANDO LOGIN E CADASTRO
import Login from './modules/Login';
const login = new Login('.form-login');
const cadastro = new Login('.form-cadastro');
login.init();
cadastro.init();

//VALIDANDO CONTATOS
import Contato from './modules/Contato';
const contato = new Contato('.form-contato');
contato.init();