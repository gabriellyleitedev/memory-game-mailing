import React from "react";
import { useState, useEffect } from "react";

export default function GameBoard({ onEndGame }) {
    // 1- Aqui guarda as 18 cartas do jogo (o array com os dados de cada carta)
    const [cards, setCards] = useState([]);

    const [selectedCards, setSelectedCards] = useState([]); // 2-  Guarda as cartas que o usuário clicou (máx 2 por vez)

    // 3 - Bloqueia temporariamente o clique na tela ( enquanto o jogo compara duas cartas selecionadas)
    const [disabled, setDisabled] = useState(false);

    // 4 - Guarda o tempo restante para o usuário jogar (inicia com 60 segundos)
    const [timeLeft, setTimeLeft] = useState(60);   // É O TIME QUE O USEEFFECT PRECISA VIGIAR


    // ESSE useEffect controla o relógio regressivo (de 60 para 0 - timeLeft)
    useEffect(() => {
        // Checa de parada: o tempo acabou?
        if (timeLeft === 0) {
            onEndGame("lose");
            return; // Para o código 
        }

        // Cria um intervalo que diminui o tempo de 1 em 1 segundo
        const timer = setInterval(() => {
            setTimeLeft((tempoAnterior) => tempoAnterior - 1); // Diminui o tempo em 1 segundo
        }, 1000); // esses 1000 é o tempo em milissegundos, ou seja, 1000ms = 1 segundo

        // função de limpeza: Desliga o cronometro do segundo anterior para evitar bugs de múltiplos cronometros rodando ao mesmo tempo
        return () => clearInterval(timer);

    }, [timeLeft]); // O useEffect fica "vigiando" o timeLeft 

    // === LÓGICA DAS CARTAS === 
    // Função para inicializar o jogo, criando as cartas e embaralhando elas
    const initializeGame = () => {
        const pairValues = ["A", "B", "C", "D", "E", "F", "G", "H", "I"]; // 9 pares de cartas (18 cartas no total)

        const duplicateCards = [...pairValues, ...pairValues]; // 1 - Duplica os valores para criar os pares (18 cartas no total saem daqui)

        // 2 - Tranforma o array de letras em um array de OBJETOS detalhados (cada carta tem um id único, um valor e um estado de "virada" ou "escondida")
        let cardObjects = duplicateCards.map((letra, index) => ({
            id: index + 1, // gera id único para cada carta (1 a 18)
            value: letra, // valor da carta (A, B, C, etc) usado para comparar os pares
            isFlipped: false, // estado inicial da carta (virada para baixo)
            isMatched: false, // estado de combinação (começa como não acertada)
        }));

        // 3 - ALGORITMO MATEMÁTICO FISHER-YATES: Embaralha o array de cartas de forma aleatória na raça
        for (let i = cardObjects.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Escolhe uma posição aleatória

            [cardObjects[i], cardObjects[j]] = [cardObjects[j], cardObjects[i]]; // Troca a posição da carta atual com a carta aleatória
        }

        // 4 - Salva a lista totalmente ebaralhada de cartas no estado para ser usada novamente no jogo...
        setCards(cardObjects);
    };

    // Esse useEffect garante que a função acima roda apenas uma vez quando o componente é montado.
    useEffect(() => {
        initializeGame();
    }, []);

    // === LÓGICA DO CLIQUE NA CARTA ===
    const handleCardClick = (cartaClicada) => {
        // 1 - Se a carta já estiver virada ou se o clique estiver desabilitado, não faz nada e IGNORE O CLIQUE
        if (disabled || cartaClicada.isFlipped || cartaClicada.isMatched) {
            return; // return sozinho significa "pare tudo, e saia da função imediatamente"
        }

        const tabuleiroAtualizado = cards.map((item) => {
            if (item.id === cartaClicada.id) {
                return { ...item, isFlipped: true }; // Vira a carta clicada
            }
            return item; // Deixa as outras cartas intocadas (sem mudanças)
        });

        setCards(tabuleiroAtualizado); // Atualiza o estado do tabuleiro com a carta virada

        // 
        setSelectedCards((anteriores) => [...anteriores, cartaClicada]); // Adiciona a carta clicada à lista de cartas selecionadas
    }

    // esse useEffect vigia as cartas selecionadas (selectedCards) e executa a lógica de comparação quando o usuário seleciona 2 cartas
    useEffect(() => {
        // Só executa a lógica de comparação se o usuário tiver selecionado 2 cartas
        if (selectedCards.length === 2) {
            setDisabled(true); // 1- bloqueia novos cliques pro jogador nao trapacear

            const [carta1, carta2] = selectedCards; // pega as duas cartas da lista

            // SE os valores das cartas forem iguais, é um acerto (match)!
            if (carta1.value === carta2.value) {

                setCards((tabuleiroAnterior) => {
                    const novoTabuleiro = tabuleiroAnterior.map((carta) => {

                        // Atualiza as duas cartas mp tabuleiro para "is matched = true" (combinação correta)
                        if (carta.id === carta1.id || carta.id === carta2.id) {
                            return { ...carta, isMatched: true }; // Marca a carta como combinada
                        }
                        return carta; // Deixa as outras cartas intocadas (sem mudanças)
                    });

                    // Aqui checa se todas as 18 cartas já foram combinadas (vencedor)
                    const usuarioGanhou = novoTabuleiro.every(carta => carta.isMatched);

                    if (usuarioGanhou) {
                        onEndGame("win"); // para o relógio e avisa que ganhou
                    }

                    return novoTabuleiro;
                })

                resetTurno(); // Reseta o turno para o próximo par de cartas
            } else {

                // Se as cartas forem diferentes, espere 1 segundo e desvira
                setTimeout(() => {
                    setCards((tabuleiroAnterior) => {
                        return tabuleiroAnterior.map((carta) => {

                            // Desvira as duas cartas voltando ao estado inicial (isFlipped: false)
                            if (carta.id === carta1.id || carta.id === carta2.id) {
                                return { ...carta, isFlipped: false } // aqui é onde a carta é desvirada (volta a ser virada para baixo)
                            }
                            return carta; // Deixa as outras cartas intocadas (sem mudanças)
                        })
                    })
                    resetTurno(); // Reseta o turno para o próximo par de cartas
                }, 1000); // 1000ms = 1 segundo. Tempo de espera para o jogador ver as cartas antes de desvirar (1 segundo)
            }

        }

    }, [selectedCards]); // O useEffect fica "vigiando" o array das selecionadas

    const resetTurno = () => {
        setSelectedCards([]); // Limpa as cartas selecionadas para o próximo turno
        setDisabled(false); // Libera os cliques para o próximo turno
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-4 flex flex-col items-center">

            {/* Placar do tempo no topo */}
            <div className="mb-8 text-xl font-bold bg-slate-800 text-white px-6 py-2 rounded-full border border-slate-700 shadow-md">
                Tempo Restante: <span className="text-orange-500 font-mono">{timeLeft}s</span>
            </div>

            {/* Tabuleiro de cartas */}

            {/* grid que se adapta sozinho (2 colunas no celular, 6 no computador) */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 w-full max-w-2xl">

                {cards.map((carta) => (
                    <div
                        key={carta.id} // A chave única para cada carta (importante para o React) 
                        onClick={() => handleCardClick(carta)} // Chama a função de clique passando a carta clicada
                        className="aspect-square cursor-pointer perspective-[1000px]"
                    >

                        {/* 2: O Atuador (Sofre a rotação física)
                        Se a carta estiver virada (isFlipped) OU combinada (isMatched), gira 180 graus no eixo Y */}
                        <div
                            className={`relative w-full h-full rounded-xl transition-transform duration-500 transform-3d ${carta.isFlipped || carta.isMatched ? "transform-[rotateY(180deg)]" : ""
                                }`}
                        >

                            {/* 3A: Face da Frente (Carta Fechada - Cor Laranja)
                            Fica visível por padrão. Esconde-se ao girar */}
                            <div className="absolute inset-0 bg-orange-500 rounded-xl shadow-md border border-orange-400 backface-hidden flex items-center justify-center hover:bg-orange-600 transition-colors">
                                <span className="text-white opacity-50 text-xl font-bold">?</span>
                            </div>

                            {/* 3B: Face de Trás (Carta Aberta - Cor Escura com a Letra)
                            Já nasce invertida. Fica visível apenas quando o Atuador gira */}
                            <div className="absolute inset-0 bg-slate-800 rounded-xl shadow-md border border-slate-700 text-2xl font-bold text-orange-500 flex items-center justify-center backface-hidden transform-[rotateY(180deg)]">
                                {carta.value}
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}