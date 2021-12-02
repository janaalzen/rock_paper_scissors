import Rock from './img/rock.png'
import Scissors from './img/scissors.png'
import Paper from './img/paper.png'
import './App.css';
import swal from 'sweetalert';


function App() {

  let win =0;
  let loss = 0;
  let tie = 0;
  let roundWin = 0;
  let roundLoss = 0;
  let roundTie = 0;
  let message = ""


  function RockPaperScissors(){
    let choices = [Rock, Paper, Scissors]  
    let chosen = choices[Math.floor(Math.random() * choices.length)];
    document.getElementById('Computer-image').src = chosen;
    console.log(chosen);
    return chosen;
  }

  function rpsRules(inputOne, inputTwo){
    let result = "";
    if (inputOne == inputTwo){
      result = "tie";
    }
    else if ((inputOne == Rock && inputTwo == Scissors) || (inputOne == Paper && inputTwo == Rock) || (inputOne == Scissors && inputTwo == Paper)){
      result = "win";
    }
    else {
      result = "loss";
    }
    return result;
  }

  function playGame(human){
    let computer = RockPaperScissors();
    console.log(computer);
    document.getElementById('Human-image').src = human;
    return (rpsRules(human, computer));
  }

function updateText(Class, Text, Counter){
  document.querySelector(Class).innerHTML = Text + Counter;
}

  function keepScore(result){
    switch(result){
      default:
        case "win":
          win++;
          updateText('.Player', "Player: ", win);
          break;
        case "loss":
          loss++;
          updateText('.Computer', "Computer: ", loss);
          break;
        case "tie":
          tie++;
          updateText('.Ties', "Ties: ", tie);
          break;
    }
    if (win+loss+tie === 5){ //5round game
      let games=[win,loss]; //put result in array
      var endResult = games.indexOf(Math.max(...games)); //search array for highest number to decide outcome
      switch(endResult){
        default:
          case 0:
            roundWin++;
            message = ("You win!");
            updateText('.Win-counter', "Wins: ", roundWin);
            break;
          case 1:
            roundLoss++;
            message = ("You lose!");
            updateText('.Loss-counter', "Losses: ", roundLoss);
            break;
      }
    
      if (win===loss){
        document.body.style = 'background: white;';
        message = ("It's a tie!");
        roundTie++;
        updateText('.Tie-counter', "Ties: ", roundTie);
      }

      swal(message)
      .then((() => {
        win=loss=tie=0; //reset counters
        updateText('.Player', "Player: ", win);
        updateText('.Computer', "Computer: ", loss); 
        updateText('.Ties', "Ties: ", tie);
      }));



      
    }
  }

    return (
      <div className="App">
          <main className="App-content">
            <h1>Rock Paper Scissors</h1>
            
            <div className = "Scoreboard">
              <div>Rounds</div>
              <div className="Counters">
                <a className="Win-counter">Wins: 0</a>
                <a className="Loss-counter">Losses: 0</a>
                <a className="Tie-counter">Ties: 0</a>
              </div>
            </div>
            <div className = "Images">
              <img id= "Human-image" src={Paper} width = "100" height = "100"></img>
              <img id="Computer-image" src={Paper} width = "100" height = "100"></img> 
            </div>
            <div className="Image-labels"> <a className="Player">Player: 0</a><a className="Ties">Ties: 0</a> <a className="Computer ">Computer: 0</a> </div>
            <div className="Buttons">
              <button className = "button" onClick = {() => keepScore(playGame(Rock))}><img className="Rock-button" src = {Rock} width = "50" height = "50"></img></button>
              <button className = "button" onClick = {() => keepScore(playGame(Paper))}><img className="Paper-button" src = {Paper} width = "50" height = "50"></img></button>
              <button className = "button" onClick = {() => keepScore(playGame(Scissors))}><img className="Scissors-button" src = {Scissors} width = "50" height = "50"></img></button>
              </div>
          </main>
      </div>
  );
}

export default App;
