# Memory Game Mailing - Jogo da Memória Gamificado

<div align="left">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
</div>

<br />

Este projeto é uma aplicação web interativa de Jogo da Memória desenvolvida em React.js e Tailwind CSS, criada como solução para um **desafio técnico**. A aplicação une mecânicas de gamificação visual com uma estratégia linear de captação de leads (Mailing).

---

## 🔗 Link do Projeto

* **Aplicação em Produção (Vercel):** https://memory-game-mailing.vercel.app/

---

## Lógica de Programação & Engenharia

* **Algoritmo Fisher-Yates (Knuth Shuffle):** A inicialização do tabuleiro utiliza este algoritmo clássico para embaralhar as 18 cartas (9 pares) em tempo linear $O(n)$. Ele realiza trocas (*swaps*) diretas na memória, garantindo uma distribuição estatisticamente uniforme e perfeitamente aleatória, evitando soluções falhas comuns de mercado como o uso de `.sort(() => Math.random() - 0.5)`.
* **Controle de Concorrência (State Locking):** Foi implementada uma trava lógica no estado global do tabuleiro (`disabled`). Isso bloqueia temporariamente novos cliques na tela enquanto o sistema processa e compara o par de cartas selecionadas, mitigando bugs de cliques múltiplos simultâneos e trapaças do usuário.
* **Prevenção de Memory Leaks:** O cronômetro regressivo gerencia de forma limpa o ciclo de vida do `setInterval` utilizando a **função de desinstalação (cleanup)** do `useEffect`. Isso garante que o navegador descarte os recursos antigos ao desmontar o componente ou alterar o tempo, prevenindo vazamentos de memória (*memory leaks*).
* **Navegação Centralizada por Estado (State-Driven UI):** O fluxo completo entre as telas (`mailing` -> `playing` -> `result`) é orquestrado unicamente a partir do componente raiz `App.jsx` através de renderização condicional. Essa escolha arquitetural evitou a adição de pacotes externos de roteamento (*overengineering*), reduzindo o bundle da aplicação.

---

## Regras de Negócio Atendidas (Fidelidade ao Briefing)

* **Captação Prévia (Mailing):** O tabuleiro é estritamente bloqueado até que o participante preencha o formulário obrigatório de cadastro (Nome, E-mail, Celular e Cargo/Função).
* **Restrição de Tempo:** Um cronômetro regressivo exato de 1 minuto (60 segundos) dita o ritmo da partida.
* **Experiência Condicional (Brinde):** * Se o usuário vencer antes do tempo acabar, recebe um feedback parabenizando-o pela excelente memória.
  * Se o tempo se esgotar, a aplicação exibe uma mensagem amigável garantindo que, mesmo sem o êxito no jogo, o participante poderá retirar um brinde com a pessoa responsável pela ação do evento.

---

## Tecnologias Utilizadas

* **React.js** (Hooks estruturais: `useState`, `useEffect`)
* **Tailwind CSS** (CSS Grid responsivo para Mobile/Desktop e Animações de Rotação 3D)
* **Vite** (Ambiente de build rápido e otimizado)

---

## Como Executar

1. `git clone https://github.com/gabriellyleitedev/memory-game-mailing`
2. `npm install`
3. `npm run dev`
