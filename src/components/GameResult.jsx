export default function GameResult({ result, onReset }) {
    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold">Tela de Resultado: {result === "win" ? "Você Ganhou!" : "Tempo Esgotado"}</h2>
            <button
                onClick={onReset}
                className="mt-4 bg-orange-500 px-4 py-2 rounded font-bold"
            >
                Jogar Novamente
            </button>
        </div>
    );
}