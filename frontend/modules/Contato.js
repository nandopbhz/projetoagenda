import validator from 'validator';

export default class Contato {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }
    init() {
        this.events();
    }
    events() {
        if (!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    }
    validate(e) {
        const el = e.target;
        const nomeInput = el.querySelector('input[name="nome"]');
        const emailInput = el.querySelector('input[name="email"]');
        const telefoneInput = el.querySelector('input[name="telefone"]');

        let error = false;
        //email precisa ser válido
        if (emailInput.value !== '' && !validator.isEmail(emailInput.value)) {
            this.showerror('Email inválido');
            error = true;
        }
        //deve conter um nome
        if (nomeInput.value === '') {
            this.showerror('O campo "Nome" é obrigatório.');
            error = true;
        }
        //ou email ou telefone
        if ((emailInput.value === '') && (telefoneInput.value === '')) {
            this.showerror('Um dos dois campos devem ser preenchidos: Email, Telefone');
            error = true;
        }

        if(!error) el.submit();
    }
    showerror(msg) {
        const divf = document.getElementById('showerror');
        
        const div = document.createElement('div');
        div.classList.add("alert","alert-danger");
        divf.appendChild(div);

        const p = document.createElement('p');
        p.textContent = null;
        p.textContent = msg;
        div.appendChild(p);
    }
}