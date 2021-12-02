import Rock from './img/rock.png'
import Scissors from './img/scissors.png'
import Paper from './img/paper.png'
import './App.css';
import swal from 'sweetalert';
import { pulse } from 'react-animations'
import styled, { keyframes } from 'styled-components'
import { useState } from 'react';

const Effect = styled.div`animation: 1s ${keyframes `${pulse}`} infinite `; 

function App() {

const [winCount, setWinCount] = useState(0);
const [lossCount, setLossCount] = useState(0);
const [tiesCount, setTiesCount] = useState(0);
const [roundWinCount, setRoundWinCount] = useState(0);
const [roundLossCount, setRoundLossCount] = useState(0);
const [imgPlayer, setImgPlayer] = useState(Rock);
const [imgComputer, setImgComputer] = useState(Rock);
const choices = [Rock, Paper, Scissors];

function popUp(message){
  swal(message)
  .then(() => {
    setWinCount(0); setLossCount(0); setTiesCount(0); //Reset counters after Popup
    }
  );
}

  function playGame(player){
    let computer = choices[Math.floor(Math.random() * choices.length)];
    setImgComputer(computer); //Set image for computer
    setImgPlayer(player); //Set image for Player
    if (player === computer){ //Tie
        setTiesCount(tiesCount+1)
      }
      else if ((player === Rock && computer === Scissors) || (player === Paper && computer === Rock) || (player === Scissors && computer === Paper)){ //Win
        setWinCount(winCount + 1)
        if (winCount === 4){
          setRoundWinCount(roundWinCount + 1)
          popUp("You win!");
        }
      }
      else { //Lose
        setLossCount(lossCount + 1)
        if (lossCount === 4){
          setRoundLossCount(roundLossCount + 1)
          popUp("You lose!");
        }
      }
  }
  
    return (
      <div className="App">
          <main className="App-content">
            <div className="App-header">
              <h1>Rock Paper Scissors</h1>
              <h2>First to five</h2> 
            </div>
            <div className = "Scoreboard">
              <div> Rounds</div>
              <div className="Counters">
                <div className="Win-counter">Wins {roundWinCount}</div>
                <div className="Loss-counter">Losses {roundLossCount}</div>
              </div>
            </div>
            <div className = "Images">
              <Effect><img id= "player-image" src={imgPlayer} width = "100" height = "100" alt="Player"></img></Effect>
              <Effect><img id="Computer-image" src={imgComputer} width = "100" height = "100" alt="Compute"></img></Effect>
            </div>
            <div className="Image-labels"> 
              <div className="Player">Player {winCount}</div>
              <div className="Ties">Ties {tiesCount}</div> 
              <div className="Computer ">Computer {lossCount}</div> 
            </div>
            <div className="Buttons">
              <button className = "button" onClick = {() => playGame(Rock)}><img src = {Rock} width = "50" height = "50" alt="Rock"></img></button>
              <button className = "button" onClick = {() => playGame(Paper)}><img src = {Paper} width = "50" height = "50" alt="paper"></img></button>
              <button className = "button" onClick = {() => playGame(Scissors)}><img src = {Scissors} width = "50" height = "50" alt="Scissors"></img></button>
            </div>
          </main>
      </div>
  );
};

export default App;
