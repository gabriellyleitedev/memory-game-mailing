import React from 'react'
import { useState } from 'react'
import FormMailing from './components/FormMailing'
import GameBoard from './components/GameBoard'
import GameResult from './components/GameResult'

function App() {
  // Esse estado define QUAL tela será exibida ("mailing" ou "Game)
  const [screen, setScreen] = useState("mailing");

  // Estado que define o resultado do jogo.. (win ou lose)
  const [gameResult, setGameResult] = useState(null);

  // Estado que guarda os dados coletados no formulário
  const [userData, setUserData] = useState(null);

  // Funçaõ chamada quando o formulário é enviado ocm sucesso
  const handleStartGame = (data) => {
    setUserData(data); // Guarda os dados do formulário (caso queira usar depois)
    setScreen("playing"); // Muda para a tela do jogo
  }

  // Função chamada quando o jogo termina, vence ou esgota tempo
  const handleEndGame = (result) => {
    setGameResult(result); // Guarda o resultado do jogo (win ou lose)
    setScreen("result"); // Muda para a tela de resultado
  }

  // Permite reiniciar a partida do zero se o usuário quiser jogar novamente
  const handleResetGame = () => {
    setGameResult(null); // Limpa o resultado do jogo
    setScreen("playing"); // Volta para a tela de cadastro
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">

      {/* 1 - Exibe a tela de cadastro inicial */}
      {screen === "mailing" && (  // esses && chama-se renderização condicional, ou seja, só exibe o componente se a condição for verdadeira, se for falsa finge que não existe
        <FormMailing onStart={handleStartGame} />
      )}

      {/* 2 - Exibe a tela do jogo */}
      {screen === "playing" && (
        <GameBoard onEndGame={handleEndGame} />
      )}

      {/* 3 - Exibe a tela de resultado final */}
      {screen === "result" && (
        <GameResult result={gameResult} onReset={handleResetGame} />
      )}

    </div>
  )
}

export default App
