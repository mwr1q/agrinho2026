// Aguarda o HTML carregar completamente antes de executar o JavaScript
document.addEventListener("DOMContentLoaded", () => {
    
    // --- SELEÇÃO DE ELEMENTOS ---
    const botaoTema = document.getElementById("botao-tema");
    const formulario = document.getElementById("meu-formulario");
    const mensagemStatus = document.getElementById("mensagem-status");

    // --- FUNÇÕES E COMPORTAMENTOS ---

    // 1. Função para alterar o tema (Interatividade / Clique)
    function alternarTema() {
        document.body.classList.toggle("modo-escuro");
        
        // Exemplo de feedback dinâmico no console ou na tela
        if (document.body.classList.contains("modo-escuro")) {
            console.log("Modo escuro ativado");
        } else {
            console.log("Modo claro ativado");
        }
    }

    // 2. Função para validar o formulário (Validação de dados)
    function validarFormulario(event) {
        // Impede o envio padrão do formulário (recarregar a página)
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();

        // Validação simples
        if (nome === "" || email === "") {
            mensagemStatus.textContent = "Por favor, preencha todos os campos.";
            mensagemStatus.style.color = "red";
        } else {
            mensagemStatus.textContent = `Sucesso! Obrigado, ${nome}.`;
            mensagemStatus.style.color = "green";
            
            // Limpa o formulário após o sucesso
            formulario.reset();
        }
    }

    // --- OUVINTES DE EVENTOS (EVENT LISTENERS) ---
    // Monitora os cliques do usuário e o envio do formulário

    // Escuta o clique no botão de tema
    if (botaoTema) {
        botaoTema.addEventListener("click", alternarTema);
    }

    // Escuta o envio (submit) do formulário
    if (formulario) {
        formulario.addEventListener("submit", validarFormulario);
    }

});
