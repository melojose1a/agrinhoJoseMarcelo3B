// Aguarda o DOM estar completamente carregado
document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. FUNCIONALIDADE: MODO ESCURO / CLARO
    // ==========================================
    const themeToggleBtn = document.getElementById("themeToggle");
    
    // Verifica se o usuário já tinha uma preferência salva
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
        if (savedTheme === "dark") {
            themeToggleBtn.textContent = "Modo Claro";
        }
    }

    themeToggleBtn.addEventListener("click", () => {
        let currentTheme = document.documentElement.getAttribute("data-theme");
        
        if (currentTheme === "dark") {
            document.documentElement.removeAttribute("data-theme");
            localStorage.setItem("theme", "light");
            themeToggleBtn.textContent = "Ajustar Tema";
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
            themeToggleBtn.textContent = "Modo Claro";
        }
    });

    // ==========================================
    // 2. FUNCIONALIDADE: MENU HAMBÚRGUER RESPONSIVO
    // ==========================================
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    // Fecha o menu ao clicar em qualquer link (melhora UX em mobile)
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
        });
    });

    // ==========================================
    // 3. FUNCIONALIDADE: SIMULADOR INTERATIVO
    // ==========================================
    const simButtons = document.querySelectorAll(".btn-sim");
    const dynamicMessageContainer = document.getElementById("dynamicMessage");

    // Banco de dados simulado para as mensagens dinâmicas
    const impactos = {
        reflorestar: "🌱 Excelente escolha! Ao implementar o plantio integrado, sua propriedade ajuda a capturar cerca de 12 toneladas de CO₂ por hectare ao ano.",
        solar: "☀️ Transição energética energética! A instalação de painéis fotovoltaicos reduz em até 95% os custos de eletricidade e zera a emissão de poluentes na geração.",
        agua: "💧 Máxima eficiência! O sistema de irrigação por gotejamento reduz o desperdício de recursos hídricos em até 60% se comparado à irrigação tradicional."
    };

    simButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const tipoImpacto = e.target.getAttribute("data-impacto");
            
            // Adiciona efeito visual rápido de transição suave
            dynamicMessageContainer.style.opacity = 0;
            
            setTimeout(() => {
                dynamicMessageContainer.innerHTML = `<p>${impactos[tipoImpacto]}</p>`;
                dynamicMessageContainer.style.opacity = 1;
                dynamicMessageContainer.style.transition = "opacity 0.4s ease";
            }, 200);
        });
    });

    // ==========================================
    // 4. FUNCIONALIDADE: VALIDAÇÃO DE FORMULÁRIO
    // ==========================================
    const contactForm = document.getElementById("contactForm");
    const formFeedback = document.getElementById("formFeedback");

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Impede o envio real do formulário

        // Captura dos inputs
        const nameField = document.getElementById("name").value.trim();
        const emailField = document.getElementById("email").value.trim();
        const messageField = document.getElementById("message").value.trim();

        // Validação simples
        if (nameField === "" || emailField === "" || messageField === "") {
            formFeedback.textContent = "❌ Por favor, preencha todos os campos antes de enviar.";
            formFeedback.style.color = "red";
            return;
        }

        // Validação básica de formato de e-mail usando Regex
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField)) {
            formFeedback.textContent = "❌ Insira um endereço de e-mail válido.";
            formFeedback.style.color = "red";
            return;
        }

        // Feedback de sucesso caso passe nas validações
        formFeedback.textContent = `🌱 Obrigado, ${nameField}! Sua mensagem em prol da sustentabilidade foi registrada.`;
        formFeedback.style.color = "green";

        // Limpa o formulário após o sucesso
        contactForm.reset();
    });
});