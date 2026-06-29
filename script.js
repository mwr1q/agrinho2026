// =====================================================
// script.js - Projeto Agrinho 2026
// Agro Forte, Futuro Sustentável
// =====================================================

// Aguarda o HTML carregar completamente antes de executar
document.addEventListener("DOMContentLoaded", () => {

    // =============================================
    // 1. NAVEGAÇÃO SUAVE (Smooth Scroll)
    // Faz a página rolar suavemente ao clicar nos links do menu
    // =============================================
    const linksNavegacao = document.querySelectorAll('nav a[href^="#"]');

    linksNavegacao.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Impede o comportamento padrão

            const destino = document.querySelector(this.getAttribute("href"));
            if (destino) {
                destino.scrollIntoView({
                    behavior: "smooth",   // Rolagem suave
                    block: "start"        // Alinha no topo da tela
                });
            }
        });
    });

    // =============================================
    // 2. EFEITO NO HEADER AO ROLAR A PÁGINA
    // O header fica menor e com sombra quando o usuário rola para baixo
    // =============================================
    const header = document.querySelector("header");
    const nav = document.querySelector("nav");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            nav.style.background = "rgba(26, 61, 15, 0.95)";
            nav.style.backdropFilter = "blur(10px)";
        } else {
            nav.style.background = "#1a3d0f";
            nav.style.backdropFilter = "none";
        }
    });

    // =============================================
    // 3. ANIMAÇÃO DAS SEÇÕES AO APARECER NA TELA
    // Usa Intersection Observer para detectar quando a seção entra na tela
    // =============================================
    const secoes = document.querySelectorAll("section");

    // Configuração inicial (todas as seções começam invisíveis)
    secoes.forEach(secao => {
        secao.style.opacity = "0";
        secao.style.transform = "translateY(30px)";
        secao.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    });

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.style.opacity = "1";
                entrada.target.style.transform = "translateY(0)";
                observador.unobserve(entrada.target); // Para de observar após animar
            }
        });
    }, {
        threshold: 0.15 // Dispara quando 15% da seção estiver visível
    });

    secoes.forEach(secao => observador.observe(secao));

    // =============================================
    // 4. LINK ATIVO NA NAVEGAÇÃO
    // Destaca no menu a seção que está visível na tela
    // =============================================
    const linksMenu = document.querySelectorAll("nav a");

    window.addEventListener("scroll", () => {
        let posicaoAtual = window.scrollY + 150;

        secoes.forEach(secao => {
            const topo = secao.offsetTop;
            const altura = secao.offsetHeight;
            const id = secao.getAttribute("id");

            if (posicaoAtual >= topo && posicaoAtual < topo + altura) {
                linksMenu.forEach(link => {
                    link.style.background = "transparent";
                    if (link.getAttribute("href") === `#${id}`) {
                        link.style.background = "#6ba544";
                    }
                });
            }
        });
    });

    // =============================================
    // 5. BOTÃO "VOLTAR AO TOPO"
    // Aparece quando o usuário rola para baixo
    // =============================================
    const botaoTopo = document.createElement("button");
    botaoTopo.innerHTML = "⬆";
    botaoTopo.setAttribute("aria-label", "Voltar ao topo");
    botaoTopo.id = "botao-topo";
    botaoTopo.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #2d5016;
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 999;
    `;
    document.body.appendChild(botaoTopo);

    // Mostra/esconde o botão conforme a rolagem
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            botaoTopo.style.opacity = "1";
            botaoTopo.style.visibility = "visible";
        } else {
            botaoTopo.style.opacity = "0";
            botaoTopo.style.visibility = "hidden";
        }
    });

    // Ao clicar, volta suavemente ao topo
    botaoTopo.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Efeito hover no botão
    botaoTopo.addEventListener("mouseenter", () => {
        botaoTopo.style.background = "#6ba544";
        botaoTopo.style.transform = "scale(1.1)";
    });
    botaoTopo.addEventListener("mouseleave", () => {
        botaoTopo.style.background = "#2d5016";
        botaoTopo.style.transform = "scale(1)";
    });

    // =============================================
    // 6. CONTADOR ANIMADO DE ESTATÍSTICAS
    // Anima números quando entram na tela (opcional)
    // Se você adicionar uma seção com dados, use a classe .contador
    // =============================================
    const contadores = document.querySelectorAll(".contador");

    const animarContador = (el) => {
        const alvo = parseInt(el.getAttribute("data-alvo"));
        let atual = 0;
        const incremento = alvo / 100;

        const atualizar = () => {
            if (atual < alvo) {
                atual += incremento;
                el.textContent = Math.ceil(atual).toLocaleString("pt-BR");
                requestAnimationFrame(atualizar);
            } else {
                el.textContent = alvo.toLocaleString("pt-BR");
            }
        };
        atualizar();
    };

    if (contadores.length > 0) {
        const obsContador = new IntersectionObserver((entradas) => {
            entradas.forEach(entrada => {
                if (entrada.isIntersecting) {
                    animarContador(entrada.target);
                    obsContador.unobserve(entrada.target);
                }
            });
        }, { threshold: 0.5 });

        contadores.forEach(c => obsContador.observe(c));
    }

    // =============================================
    // 7. MODO ESCURO (Dark Mode)
    // Alterna entre tema claro e escuro
    // =============================================
    const botaoTema = document.getElementById("botao-tema");

    function alternarTema() {
        document.body.classList.toggle("modo-escuro");

        // Salva a preferência no navegador (localStorage)
        if (document.body.classList.contains("modo-escuro")) {
            localStorage.setItem("tema", "escuro");
            console.log("🌙 Modo escuro ativado");
        } else {
            localStorage.setItem("tema", "claro");
            console.log("☀️ Modo claro ativado");
        }
    }

    // Carrega o tema salvo ao abrir a página
    if (localStorage.getItem("tema") === "escuro") {
        document.body.classList.add("modo-escuro");
    }

    if (botaoTema) {
        botaoTema.addEventListener("click", alternarTema);
    }

    // =============================================
    // 8. VALIDAÇÃO DE FORMULÁRIO DE CONTATO
    // (Se você adicionar um formulário de contato no HTML)
    // =============================================
    const formulario = document.getElementById("formulario-contato");
    const mensagemStatus = document.getElementById("mensagem-status");

    if (formulario) {
        formulario.addEventListener("submit", function (event) {
            event.preventDefault();

            const nome = document.getElementById("nome")?.value.trim();
            const email = document.getElementById("email")?.value.trim();
            const mensagem = document.getElementById("mensagem")?.value.trim();

            // Validação dos campos
            if (!nome || !email || !mensagem) {
                mostrarMensagem("⚠️ Por favor, preencha todos os campos.", "red");
                return;
            }

            // Validação do e-mail (expressão regular)
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(email)) {
                mostrarMensagem("⚠️ Digite um e-mail válido.", "red");
                return;
            }

            // Sucesso
            mostrarMensagem(`✅ Obrigado, ${nome}! Sua mensagem foi enviada com sucesso.`, "green");
            formulario.reset();
        });
    }

    // Função auxiliar para exibir mensagens
    function mostrarMensagem(texto, cor) {
        if (mensagemStatus) {
            mensagemStatus.textContent = texto;
            mensagemStatus.style.color = cor;
            mensagemStatus.style.marginTop = "1rem";
            mensagemStatus.style.fontWeight = "bold";

            // Remove a mensagem após 5 segundos
            setTimeout(() => {
                mensagemStatus.textContent = "";
            }, 5000);
        }
    }

    // =============================================
    // 9. ANIMAÇÃO DO TÍTULO PRINCIPAL
    // Efeito de digitação no subtítulo (opcional)
    // =============================================
    const subtitulo = document.querySelector("header p");
    if (subtitulo) {
        const textoOriginal = subtitulo.textContent;
        subtitulo.textContent = "";
        let i = 0;

        const digitar = () => {
            if (i < textoOriginal.length) {
                subtitulo.textContent += textoOriginal.charAt(i);
                i++;
                setTimeout(digitar, 50);
            }
        };
        setTimeout(digitar, 500);
    }

    // =============================================
    // MENSAGEM NO CONSOLE
    // =============================================
    console.log("🌱 Projeto Agrinho 2026 - Agro Forte, Futuro Sustentável");
    console.log("✅ Todos os scripts carregados com sucesso!");

});
