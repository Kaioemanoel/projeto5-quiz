
const perguntas = [
    {
        categoria: "DISCIPLINA",
        pergunta: "O que melhor define a disciplina pessoal?",
        alternativas: [
            "Fazer apenas aquilo de que gosta",
            "Manter compromissos mesmo sem motivação",
            "Esperar o momento perfeito para agir",
            "Trabalhar somente quando estiver inspirado"
        ],
        correta: 1,
        explicacao: "A disciplina é a capacidade de manter ações e compromissos mesmo quando a motivação diminui."
    },
    {
        categoria: "ORGANIZAÇÃO",
        pergunta: "Você tem uma prova importante daqui a sete dias. Qual é a melhor atitude?",
        alternativas: [
            "Estudar tudo na noite anterior",
            "Esperar o professor revisar o conteúdo",
            "Criar um cronograma e estudar aos poucos",
            "Estudar apenas os assuntos mais fáceis"
        ],
        correta: 2,
        explicacao: "Distribuir o estudo ao longo dos dias facilita a revisão e evita a concentração de tarefas na última hora."
    },
    {
        categoria: "FOCO",
        pergunta: "Qual atitude ajuda a manter o foco durante os estudos?",
        alternativas: [
            "Deixar as notificações ligadas",
            "Alternar entre várias tarefas a cada minuto",
            "Estudar com a televisão ligada",
            "Reduzir distrações e definir uma meta"
        ],
        correta: 3,
        explicacao: "Reduzir distrações e definir um objetivo claro ajuda a direcionar a atenção para a tarefa."
    },
    {
        categoria: "RESPONSABILIDADE",
        pergunta: "Você percebe que não conseguirá cumprir um prazo. O que deve fazer?",
        alternativas: [
            "Avisar com antecedência e propor uma solução",
            "Ignorar o prazo e esperar que ninguém perceba",
            "Inventar uma justificativa depois da entrega",
            "Transferir toda a responsabilidade para outra pessoa"
        ],
        correta: 0,
        explicacao: "Comunicar o problema antecipadamente demonstra responsabilidade e permite buscar alternativas."
    },
    {
        categoria: "CONSTÂNCIA",
        pergunta: "Qual estratégia favorece a construção de um hábito?",
        alternativas: [
            "Tentar fazer tudo de uma só vez",
            "Começar com pequenas ações e repeti-las",
            "Mudar de objetivo todos os dias",
            "Esperar sentir vontade para começar"
        ],
        correta: 1,
        explicacao: "Pequenas ações repetidas de forma consistente ajudam a incorporar comportamentos à rotina."
    },
    {
        categoria: "PROCRASTINAÇÃO",
        pergunta: "O que significa procrastinar?",
        alternativas: [
            "Concluir uma tarefa antes do prazo",
            "Planejar as atividades da semana",
            "Adiar uma tarefa que precisa ser realizada",
            "Dividir um objetivo em etapas menores"
        ],
        correta: 2,
        explicacao: "Procrastinar é adiar uma tarefa ou decisão, frequentemente substituindo-a por outra atividade."
    },
    {
        categoria: "PLANEJAMENTO",
        pergunta: "Você tem cinco tarefas importantes no mesmo dia. Qual é a melhor estratégia?",
        alternativas: [
            "Escolher a mais fácil e ignorar as outras",
            "Fazer todas simultaneamente",
            "Começar pela última sem avaliar os prazos",
            "Organizar por prioridade e prazo"
        ],
        correta: 3,
        explicacao: "Organizar tarefas por prioridade e prazo ajuda a usar o tempo de maneira mais eficiente."
    },
    {
        categoria: "RESILIÊNCIA",
        pergunta: "Você falhou em uma meta que havia estabelecido. Qual é a atitude mais produtiva?",
        alternativas: [
            "Identificar o que deu errado e ajustar o plano",
            "Desistir de todas as metas futuras",
            "Fingir que o problema não aconteceu",
            "Esperar que outra pessoa resolva a situação"
        ],
        correta: 0,
        explicacao: "Analisar os obstáculos e adaptar a estratégia permite aprender com a experiência e continuar avançando."
    },
    {
        categoria: "AUTOCONTROLE",
        pergunta: "Durante uma sessão de estudos, você sente vontade de olhar o celular. O que ajuda a manter o compromisso?",
        alternativas: [
            "Abandonar os estudos imediatamente",
            "Guardar o celular e continuar até a pausa planejada",
            "Verificar todas as mensagens antes de retomar",
            "Desistir da meta de estudos naquele dia"
        ],
        correta: 1,
        explicacao: "Controlar o acesso às distrações e respeitar pausas planejadas ajuda a preservar a concentração."
    },
    {
        categoria: "EVOLUÇÃO",
        pergunta: "Qual é a melhor forma de avaliar o progresso em uma meta de longo prazo?",
        alternativas: [
            "Comparar-se constantemente com outras pessoas",
            "Avaliar apenas o resultado do primeiro dia",
            "Acompanhar os resultados e revisar o plano regularmente",
            "Mudar a meta sempre que surgir uma dificuldade"
        ],
        correta: 2,
        explicacao: "Acompanhar resultados ao longo do tempo permite reconhecer avanços e fazer ajustes necessários."
    }
];

// Estado do quiz
let pontuacao = 0;
let indicePerguntaAtual = 0;
let respostaSelecionada = null;
let quizFinalizado = false;

// Elementos da página
const welcome = document.getElementById("welcome");
const quizSection = document.getElementById("quizSection");
const resultSection = document.getElementById("resultSection");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

const counter = document.getElementById("counter");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const progressTrack = document.getElementById("progressTrack");

const questionNumber = document.getElementById("questionNumber");
const category = document.getElementById("category");
const questionText = document.getElementById("questionText");
const answers = document.getElementById("answers");

const feedback = document.getElementById("feedback");
const feedbackIcon = document.getElementById("feedbackIcon");
const feedbackTitle = document.getElementById("feedbackTitle");
const feedbackText = document.getElementById("feedbackText");

// Inicia uma nova partida
function iniciarQuiz() {
    pontuacao = 0;
    indicePerguntaAtual = 0;
    respostaSelecionada = null;
    quizFinalizado = false;

    welcome.classList.add("hidden");
    resultSection.classList.add("hidden");
    quizSection.classList.remove("hidden");

    carregarPergunta();
}

// Atualiza o conteúdo da pergunta
function carregarPergunta() {
    respostaSelecionada = null;

    const pergunta = perguntas[indicePerguntaAtual];
    const numero = indicePerguntaAtual + 1;
    const progresso = (numero / perguntas.length) * 100;

    counter.textContent =
        `${String(numero).padStart(2, "0")} / ${String(perguntas.length).padStart(2, "0")}`;

    questionNumber.textContent = String(numero).padStart(2, "0");
    category.textContent = pergunta.categoria;
    questionText.textContent = pergunta.pergunta;

    progressFill.style.width = `${progresso}%`;
    progressText.textContent = `${Math.round(progresso)}% concluído`;
    progressTrack.setAttribute("aria-valuenow", numero);
    progressTrack.setAttribute("aria-valuemax", perguntas.length);

    feedback.classList.add("hidden");
    feedback.classList.remove("is-correct", "is-wrong");

    nextBtn.disabled = true;
    nextBtn.innerHTML = 'Confirmar resposta <span>→</span>';

    answers.replaceChildren();

    pergunta.alternativas.forEach((alternativa, indice) => {
        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "answer-option";

        const letra = document.createElement("span");
        letra.className = "answer-letter";
        letra.textContent = String.fromCharCode(65 + indice);

        const texto = document.createElement("span");
        texto.className = "answer-text";
        texto.textContent = alternativa;

        const marca = document.createElement("span");
        marca.className = "answer-mark";
        marca.setAttribute("aria-hidden", "true");

        botao.append(letra, texto, marca);

        botao.addEventListener("click", () => {
            selecionarResposta(indice);
        });

        answers.appendChild(botao);
    });
}

// Registra a alternativa escolhida
function selecionarResposta(indice) {
    if (respostaSelecionada !== null || quizFinalizado) {
        return;
    }

    respostaSelecionada = indice;

    const botoes = answers.querySelectorAll(".answer-option");

    botoes.forEach((botao, i) => {
        botao.classList.toggle("selected", i === indice);
        botao.setAttribute("aria-pressed", String(i === indice));
    });

    nextBtn.disabled = false;
}

// Confere a resposta e exibe o feedback
function verificarResposta() {
    if (respostaSelecionada === null || quizFinalizado) {
        return;
    }

    const pergunta = perguntas[indicePerguntaAtual];
    const acertou = respostaSelecionada === pergunta.correta;
    const botoes = answers.querySelectorAll(".answer-option");

    if (acertou) {
        pontuacao++;
    }

    botoes.forEach((botao, indice) => {
        botao.disabled = true;

        const marca = botao.querySelector(".answer-mark");

        if (indice === pergunta.correta) {
            botao.classList.add("correct");
            marca.textContent = "✓";
        } else if (indice === respostaSelecionada) {
            botao.classList.add("wrong");
            marca.textContent = "✕";
        }
    });

    feedback.classList.remove("hidden");
    feedback.classList.add(acertou ? "is-correct" : "is-wrong");

    feedbackIcon.textContent = acertou ? "✓" : "✕";
    feedbackTitle.textContent = acertou
        ? "Resposta correta!"
        : "Não foi dessa vez!";

    feedbackText.textContent = acertou
        ? pergunta.explicacao
        : `${pergunta.explicacao} A alternativa correta era: ${pergunta.alternativas[pergunta.correta]}`;

    nextBtn.textContent = indicePerguntaAtual === perguntas.length - 1
        ? "Ver meu resultado →"
        : "Próxima pergunta →";

    nextBtn.disabled = false;
}

// Avança para a próxima pergunta
function proximaPergunta() {
    if (respostaSelecionada === null || quizFinalizado) {
        return;
    }

    // Primeira etapa: corrigir a resposta.
    if (!feedback.classList.contains("hidden")) {
        indicePerguntaAtual++;

        if (indicePerguntaAtual >= perguntas.length) {
            mostrarResultado();
        } else {
            carregarPergunta();
        }

        return;
    }

    verificarResposta();
}

// Calcula o resultado e apresenta uma mensagem personalizada
function mostrarResultado() {
    quizFinalizado = true;

    quizSection.classList.add("hidden");
    resultSection.classList.remove("hidden");

    const total = perguntas.length;
    const erros = total - pontuacao;
    const aproveitamento = Math.round((pontuacao / total) * 100);

    document.getElementById("scoreValue").textContent = pontuacao;
    document.getElementById("correctCount").textContent = pontuacao;
    document.getElementById("wrongCount").textContent = erros;
    document.getElementById("percentage").textContent = `${aproveitamento}%`;

    const scoreCircle = document.getElementById("scoreCircle");
    scoreCircle.style.background =
        `conic-gradient(var(--green) ${aproveitamento * 3.6}deg, #e6eee7 0deg)`;

    let titulo;
    let mensagem;
    let icone;
    let dica;

    if (aproveitamento === 100) {
        titulo = "Desempenho perfeito!";
        mensagem = "Incrível! Você acertou todas as perguntas. Seu conhecimento sobre disciplina e organização está em dia.";
        icone = "🏆";
        dica = "Seu próximo desafio: transforme esse conhecimento em hábitos consistentes no dia a dia.";
    } else if (aproveitamento >= 80) {
        titulo = "Excelente trabalho!";
        mensagem = "Você demonstrou um ótimo entendimento sobre foco, responsabilidade e constância.";
        icone = "🌟";
        dica = "Continue fortalecendo seus hábitos. A consistência é o que transforma boas intenções em resultados.";
    } else if (aproveitamento >= 60) {
        titulo = "Você está evoluindo!";
        mensagem = "Você já conhece vários princípios importantes. Com atenção e prática, pode avançar ainda mais.";
        icone = "💪";
        dica = "Revise os conceitos em que teve dificuldade e escolha um hábito simples para praticar nesta semana.";
    } else if (aproveitamento >= 40) {
        titulo = "Hora de fortalecer a base!";
        mensagem = "O resultado mostra oportunidades de aprendizado. Cada erro pode ajudar você a entender melhor a disciplina.";
        icone = "📚";
        dica = "Comece planejando uma tarefa diária e conclua-a antes de assumir novas atividades.";
    } else {
        titulo = "Todo começo conta!";
        mensagem = "Este é um ponto de partida, não uma definição de quem você é. Aprender sobre disciplina já é um passo importante.";
        icone = "🌱";
        dica = "Escolha uma pequena meta para amanhã, defina um horário e acompanhe seu progresso. Recomeçar também é evoluir.";
    }

    document.getElementById("resultTitle").textContent = titulo;
    document.getElementById("resultMessage").textContent = mensagem;
    document.getElementById("resultIcon").textContent = icone;
    document.getElementById("resultTip").textContent = dica;

    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Eventos de interação
startBtn.addEventListener("click", iniciarQuiz);
nextBtn.addEventListener("click", proximaPergunta);
restartBtn.addEventListener("click", iniciarQuiz);