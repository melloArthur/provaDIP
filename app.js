const elementos = {
  contador: document.getElementById("contador"),
  pontuacao: document.getElementById("pontuacao"),
  categoria: document.getElementById("categoria"),
  pergunta: document.getElementById("pergunta"),
  resultado: document.getElementById("resultado"),
  btnProxima: document.getElementById("btnProxima"),
  btnReiniciar: document.getElementById("btnReiniciar"),
  botoesResposta: document.querySelectorAll(".resposta")
};

let questoes = [];
let indiceAtual = 0;
let pontuacao = 0;
let respondeu = false;

async function carregarQuestoes() {
  try {
    const resposta = await fetch("questoes.json");

    if (!resposta.ok) {
      throw new Error("Não foi possível carregar o arquivo questoes.json.");
    }

    questoes = await resposta.json();

    if (!Array.isArray(questoes) || questoes.length === 0) {
      throw new Error("O arquivo questoes.json está vazio ou em formato inválido.");
    }

    iniciarQuiz();
  } catch (erro) {
    elementos.pergunta.textContent = "Erro ao carregar as questões.";
    elementos.categoria.textContent = "";
    elementos.resultado.textContent = erro.message;
    elementos.resultado.className = "resultado errado";
    console.error(erro);
  }
}

function iniciarQuiz() {
  questoes = embaralharArray(questoes);
  indiceAtual = 0;
  pontuacao = 0;
  respondeu = false;
  mostrarQuestao();
}

function mostrarQuestao() {
  const questao = questoes[indiceAtual];

  respondeu = false;
  elementos.categoria.textContent = questao.categoria || "Questão";
  elementos.pergunta.textContent = questao.pergunta;
  elementos.contador.textContent = `Questão ${indiceAtual + 1} de ${questoes.length}`;
  elementos.pontuacao.textContent = `Pontuação: ${pontuacao}`;
  elementos.resultado.className = "resultado oculto";
  elementos.resultado.textContent = "";
  elementos.btnProxima.disabled = true;

  elementos.botoesResposta.forEach((botao) => {
    botao.disabled = false;
  });
}

function responder(respostaUsuario) {
  if (respondeu) return;

  respondeu = true;
  const questao = questoes[indiceAtual];
  const acertou = respostaUsuario === Boolean(questao.resposta);

  if (acertou) {
    pontuacao++;
    elementos.resultado.textContent = `Correto! ${questao.explicacao || ""}`;
    elementos.resultado.className = "resultado correto";
  } else {
    const respostaCerta = questao.resposta ? "Verdadeiro" : "Falso";
    elementos.resultado.textContent = `Errado. A resposta correta é: ${respostaCerta}. ${questao.explicacao || ""}`;
    elementos.resultado.className = "resultado errado";
  }

  elementos.pontuacao.textContent = `Pontuação: ${pontuacao}`;
  elementos.btnProxima.disabled = false;

  elementos.botoesResposta.forEach((botao) => {
    botao.disabled = true;
  });
}

function proximaQuestao() {
  if (indiceAtual < questoes.length - 1) {
    indiceAtual++;
    mostrarQuestao();
    return;
  }

  finalizarQuiz();
}

function finalizarQuiz() {
  elementos.categoria.textContent = "Fim do quiz";
  elementos.pergunta.textContent = `Você acertou ${pontuacao} de ${questoes.length} questões.`;
  elementos.contador.textContent = "Quiz finalizado";
  elementos.btnProxima.disabled = true;
  elementos.resultado.className = "resultado correto";
  elementos.resultado.textContent = "Clique em Reiniciar para sortear novamente as questões.";

  elementos.botoesResposta.forEach((botao) => {
    botao.disabled = true;
  });
}

function embaralharArray(array) {
  const novoArray = [...array];

  for (let i = novoArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [novoArray[i], novoArray[j]] = [novoArray[j], novoArray[i]];
  }

  return novoArray;
}

elementos.botoesResposta.forEach((botao) => {
  botao.addEventListener("click", () => {
    responder(botao.dataset.resposta === "true");
  });
});

elementos.btnProxima.addEventListener("click", proximaQuestao);
elementos.btnReiniciar.addEventListener("click", iniciarQuiz);

carregarQuestoes();
