import validator from 'validator';

export default class Login {
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
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');

        let error = false;
        //email precisa ser válido
        if (!validator.isEmail(emailInput.value)) {
            this.showerror('Email inválido.')
            error = true;
        }
        //senha entre 3 e 50
        if (passwordInput.value.length < 3 || passwordInput.value.length > 50) {
            this.showerror('Senha precisa ter entre 3 e 50 caracteres');
            error = true;
        }

        if (!error) el.submit();
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