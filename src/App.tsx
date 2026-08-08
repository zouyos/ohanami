import style from './style.module.css';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import { useState } from 'react';
import type { Player } from './types/types';

function App() {
  const [nbPlayers, setNbPlayers] = useState<number | undefined>(undefined);
  const [players, setPlayers] = useState<Player[]>([]);
  const [showGame, setShowGame] = useState(false);
  const allNamesFilled = players.every((player) => player.name.trim() !== '');

  function updateScore(
    playerIndex: number,
    inputIndex: number,
    nbCards: number,
    multiplier: number,
  ) {
    setPlayers((currentPlayers) => {
      const newPlayers = [...currentPlayers];
      const newScores = [...newPlayers[playerIndex].scores];

      newScores[inputIndex] = nbCards * multiplier;

      newPlayers[playerIndex] = {
        ...newPlayers[playerIndex],
        scores: newScores,
        totalScore: newScores.reduce((total, score) => total + score, 0),
      };

      return newPlayers;
    });
  }

  function countSakuraCards(
    playerIndex: number,
    inputIndex: number,
    nbCards: number,
  ) {
    const sakuraScores = [
      0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78, 91, 105, 120,
    ];

    setPlayers((currentPlayers) => {
      const newPlayers = [...currentPlayers];
      const newScores = [...newPlayers[playerIndex].scores];

      newScores[inputIndex] =
        nbCards >= 0 && nbCards < sakuraScores.length
          ? sakuraScores[nbCards]
          : 120;

      newPlayers[playerIndex] = {
        ...newPlayers[playerIndex],
        scores: newScores,
        totalScore: newScores.reduce((total, score) => total + score, 0),
      };

      return newPlayers;
    });
  }

  const nbPlayersDiv = (
    <div className={style.nbPlayersDiv}>
      <h2>Combien de joueurs ?</h2>
      <div className='selectWrapper'>
        <select
          className={style.modernSelect}
          value={nbPlayers ?? ''}
          onChange={(e) => {
            const nb = Number(e.target.value);
            setNbPlayers(nb);
            setPlayers(
              Array.from({ length: nb }, () => ({
                id: crypto.randomUUID(),
                name: '',
                scores: [0, 0, 0, 0, 0, 0, 0],
                totalScore: 0,
              })),
            );
          }}
        >
          <option value='' disabled hidden>
            Nombre de joueurs
          </option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>
      </div>
    </div>
  );

  const nameDiv = (
    <div className={style.nameDiv}>
      <h2>Entrez les noms des joueurs</h2>
      {players.map((player, i) => (
        <input
          key={player.id}
          type='text'
          className={style.modernInput}
          placeholder={`Nom du joueur ${i + 1}`}
          value={player.name}
          onChange={(e) => {
            const newPlayers = [...players];
            newPlayers[i] = { ...player, name: e.target.value };
            setPlayers(newPlayers);
          }}
        />
      ))}
      <div className={style.btns}>
        <FaArrowAltCircleLeft
          color='salmon'
          size={40}
          className={style.btn}
          onClick={() => {
            setNbPlayers(undefined);
          }}
        />
        <FaArrowAltCircleRight
          color={allNamesFilled ? 'limegreen' : 'gray'}
          size={40}
          className={allNamesFilled ? style.btn : style.disabled}
          onClick={() => {
            if (!allNamesFilled) return;
            setShowGame(true);
          }}
        />
      </div>
    </div>
  );

  function getMedal(player: Player) {
    const uniqueScores = [
      ...new Set(players.map((player) => player.totalScore)),
    ].sort((a, b) => b - a);

    const rank = uniqueScores.indexOf(player.totalScore) + 1;

    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';

    return '';
  }

  const gameDiv = (
    <div className={style.gameDiv}>
      <h2 className='mb-4 fs-1'>Calcul des points</h2>
      {players.map((player, i) => (
        <div key={player.id} className={style.playerCard}>
          <h3 className={style.playerName}>
            {player.name} {getMedal(player)}
          </h3>
          <div className={style.seasons}>
            <div className={style.seasonWrapper}>
              <h5 className={style.seasonTitle}>Saison 1</h5>
              <div className={style.inputsWrapper}>
                <div className={style.inputWrapper}>
                  <label className={style.icon}>💧</label>
                  <input
                    type='number'
                    min={0}
                    max={30}
                    className={style.numberInput}
                    placeholder='0'
                    onChange={(e) => {
                      const nbCards = Number(e.target.value);
                      updateScore(i, 0, nbCards, 3);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={style.seasonWrapper}>
              <h5 className={style.seasonTitle}>Saison 2</h5>
              <div className={style.inputsWrapper}>
                <div className={style.inputWrapper}>
                  <label className={style.icon}>💧</label>
                  <input
                    type='number'
                    min={0}
                    max={30}
                    className={style.numberInput}
                    placeholder='0'
                    onChange={(e) => {
                      const nbCards = Number(e.target.value);
                      updateScore(i, 1, nbCards, 3);
                    }}
                  />
                </div>
                <div className={style.inputWrapper}>
                  <label className={style.icon}>🌱</label>
                  <input
                    type='number'
                    min={0}
                    max={30}
                    className={style.numberInput}
                    placeholder='0'
                    onChange={(e) => {
                      const nbCards = Number(e.target.value);
                      updateScore(i, 2, nbCards, 4);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={`${style.seasonWrapper} ${style.season3Wrapper}`}>
              <h5 className={style.seasonTitle}>Saison 3</h5>
              <div className={style.inputsWrapper}>
                <div className={style.inputWrapper}>
                  <label className={style.icon}>💧</label>
                  <input
                    type='number'
                    min={0}
                    max={30}
                    className={style.numberInput}
                    placeholder='0'
                    onChange={(e) => {
                      const nbCards = Number(e.target.value);
                      updateScore(i, 3, nbCards, 3);
                    }}
                  />
                </div>
                <div className={style.inputWrapper}>
                  <label className={style.icon}>🌱</label>
                  <input
                    type='number'
                    min={0}
                    max={30}
                    className={style.numberInput}
                    placeholder='0'
                    onChange={(e) => {
                      const nbCards = Number(e.target.value);
                      updateScore(i, 4, nbCards, 4);
                    }}
                  />
                </div>
                <div className={style.inputWrapper}>
                  <label className={style.icon}>🪨</label>
                  <input
                    type='number'
                    min={0}
                    max={30}
                    className={style.numberInput}
                    placeholder='0'
                    onChange={(e) => {
                      const nbCards = Number(e.target.value);
                      updateScore(i, 5, nbCards, 7);
                    }}
                  />
                </div>
                <div className={style.inputWrapper}>
                  <label className={style.icon}>🌸</label>
                  <input
                    type='number'
                    min={0}
                    max={30}
                    className={style.numberInput}
                    placeholder='0'
                    onChange={(e) => {
                      const nbCards = Number(e.target.value);
                      countSakuraCards(i, 6, nbCards);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={style.totalWrapper}>
            <span>Total</span>
            <strong>{player.totalScore}</strong>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className={style.app}>
      <h1 className={style.title}>おはなみ</h1>
      <div className={style.content}>
        {showGame ? gameDiv : nbPlayers ? nameDiv : nbPlayersDiv}
      </div>
    </div>
  );
}

export default App;
//TODO:
// - add id to players to avoid same name issues
