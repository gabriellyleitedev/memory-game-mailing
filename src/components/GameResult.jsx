import React from "react";

export default function GameResult({ result, onRestart }) {
    const isWin = result === "win";

    return (
        <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700 max-w-md w-full text-center animate-fade-in">

            {/* Ícone de Resultado */}
            <div className="text-6xl mb-4 animate-bounce">
                {isWin ? "🎉" : "⏰"}
            </div>

            {/* Título */}
            <h2 className={`text-3xl font-bold mb-2 ${isWin ? "text-green-500" : "text-red-500"}`}>
                {isWin ? "Você Venceu!" : "Tempo Esgotado!"}
            </h2>

            {/* Mensagem de Contexto */}
            <div className="text-slate-300 mb-6 text-sm space-y-3 px-2">
                {isWin ? (
                    <p>
                        Excelente! Você demonstrou uma memória incrível e conseguiu encontrar todos os pares dentro do tempo limite.
                    </p>
                ) : (
                    <div className="space-y-2">
                        <p>
                            Não foi dessa vez que você completou o tabuleiro, mas a sua participação valeu muito!
                        </p>

                        {/* REQUISITO: Mensagem amigável sobre retirar o brinde com o responsável */}
                        <p className="bg-slate-700/50 p-3 rounded-xl border border-slate-600 text-orange-300 font-medium text-xs">
                            Mesmo não tendo ganhado, você poderá retirar um brinde com a pessoa responsável pela ação!
                        </p>
                    </div>
                )}
            </div>

            {/* Botão de Reiniciar */}
            <button
                onClick={onRestart}
                className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition-all duration-300 cursor-pointer shadow-lg shadow-orange-500/20 active:scale-95"
            >
                Jogar Novamente
            </button>
        </div>
    );
}