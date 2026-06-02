# Reactive Memory Challenge - Jogo da Memória Gamificado

Este projeto é uma aplicação web interativa de Jogo da Memória desenvolvida em React.js e Tailwind CSS, criada como solução para um **desafio técnico**. A aplicação une gamificação com uma estratégia linear de captação de leads (Mailing).

---

## Lógica de Programação & Engenharia

* **Algoritmo Fisher-Yates (Knuth Shuffle):** A inicialização do tabuleiro utiliza este algoritmo clássico para embaralhar as 18 cartas (9 pares) em tempo linear $O(n)$. Ele realiza trocas (*Swaps*) diretas na memória, garantindo uma distribuição perfeitamente aleatória e performática, evitando soluções falhas como `sort(() => Math.random())`.
* **Controle de Concorrência (State Locking):** Foi implementada uma trava lógica através do estado `disabled`. Isso impede que o usuário clique em múltiplas cartas simultaneamente enquanto o sistema avalia um par, evitando quebras de lógica na renderização.
* **Prevenção de Memory Leaks:** O cronômetro regressivo gerencia o ciclo de vida do `setInterval` utilizando a **função de limpeza (cleanup)** do `useEffect`. Isso garante que o navegador descarte os timers antigos, prevenindo vazamentos de memória.
* **Navegação Linear por Estado:** O fluxo entre as telas (Mailing -> Jogo -> Resultado) é controlado de forma centralizada no `App.jsx` por renderização condicional. Isso evita o uso de bibliotecas pesadas de rotas (*overengineering*) e simplifica a persistência dos dados.

---

## 🛠️ Tecnologias

* **React.js** (Hooks: `useState`, `useEffect`)
* **Tailwind CSS** (CSS Grid Responsivo)
* **Vite** (Build tool)

---

## Como Executar

1. `git clone https://github.com/gabriellyleitedev/group-today-memory-game`
2. `npm install`
3. `npm run dev`