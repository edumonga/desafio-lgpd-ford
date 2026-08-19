// ============================================================
// FORMULARIO DE CONTATO
// ============================================================

// guarda os contatos enviados (simula o envio para o sistema da empresa)
let contatoArr = [];

class Contato {

    constructor(nome, sobrenome, email, cpf, telefone, tipoContato, formaContato, mensagem) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.email = email;
        this.cpf = cpf;
        this.telefone = telefone;
        this.tipoContato = tipoContato;
        this.formaContato = formaContato;
        this.mensagem = mensagem;
    }

    get nomeCompleto() {
        return `${this.nome} ${this.sobrenome}`;
    }

    // valida os dados antes de "enviar"
    Validar() {
        const erros = [];

        if (this.nome.trim() === "") {
            erros.push("Informe o nome.");
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
            erros.push("Informe um e-mail válido.");
        }
        // aceita telefone com 10 ou 11 digitos (com ou sem mascara)
        if (this.telefone.replace(/\D/g, "").length < 10) {
            erros.push("Informe um telefone válido com DDD.");
        }
        if (this.cpf.replace(/\D/g, "").length !== 11) {
            erros.push("Informe um CPF válido (11 dígitos).");
        }
        if (this.tipoContato === "" || this.tipoContato.startsWith("TIPO")) {
            erros.push("Selecione o tipo de contato.");
        }
        if (this.mensagem.trim() === "") {
            erros.push("Escreva a sua mensagem.");
        }

        return erros;
    }
}

// captura os dados do formulario
function Post(form) {

    const contato = new Contato(
        form.elements.namedItem("nome").value,
        form.elements.namedItem("sobrenome").value,
        form.elements.namedItem("email").value,
        form.elements.namedItem("cpf").value,
        form.elements.namedItem("telefone").value,
        form.elements.namedItem("tipocontato").value,
        form.elements.namedItem("contato").value,
        form.elements.namedItem("mensagem").value
    );

    const erros = contato.Validar();

    if (erros.length > 0) {
        alert("Corrija os itens abaixo:\n\n- " + erros.join("\n- "));
        return false; // nao envia
    }

    contatoArr.push(contato);
    console.log(contato); // aqui entraria a integracao com o sistema da companhia

    alert(`Obrigado sr(a) ${contato.nomeCompleto}, os seus dados foram encaminhados com sucesso!`);

    form.reset();
    return false; // evita o recarregamento da pagina
}
