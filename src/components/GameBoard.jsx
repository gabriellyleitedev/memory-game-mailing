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

        // 3 - ALGORITMO MATEÁTICO FISHER-YATES: Embaralha o array de cartas de forma aleatória na raça
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
                        className="aspect-square bg-orange-500 rounded-xl flex items-center justify-center text-2xl font-bold text-white shadow-md cursor-pointer hover:bg-orange-600 transition-all">

                        {/* Por enquanto, vamos exibir o valor direto só para testar se embaralhou! */}
                        {carta.value}
                    </div>
                ))}
            </div>
        </div>
    )
}