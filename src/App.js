import Rock from './img/Rock.jpg'
import Scissors from './img/Scissors.jpg'
import Paper from './img/Paper.jpg'
import './App.css';
import swal from 'sweetalert';


function App() {

  let win =0;
  let loss = 0;
  let tie = 0;
  let roundWin = 0;
  let roundLoss = 0;
  let roundTie = 0;

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

  async function animateComputer(){
    let images=[Rock,Paper,Scissors];
    for (let i = 0; i < 10; i++) {
      let source = images[Math.floor(Math.random() * images.length)];
      document.getElementById('Computer-image').src = source;
      await sleep(50);
      if (i === 9){
        return source;
      }
    }
  }


  function RockPaperScissors(){
    //animateComputer()
    let choices = ["Rock", "Paper", "Scissors"]  
    let chosen = choices[Math.floor(Math.random() * choices.length)];
    switch(chosen){
      default:
        case "Rock":
          document.getElementById('Computer-image').src = Rock;
          break;
          case "Paper":
            document.getElementById('Computer-image').src = Paper;
            break;
          case "Scissors":
            document.getElementById('Computer-image').src = Scissors;
            break;
    }
    console.log(chosen);
    return chosen;
  }


  function playGame(human){
    let result = ""
    let computer = RockPaperScissors();
      switch(human){
        default: 
          case "Rock":
              document.getElementById('Human-image').src = Rock;
              switch(computer){
                default:
                  case "Rock": 
                  result = "tie";
                  break;
                  case "Paper": 
                  result =  "loss";
                  break;
                  case "Scissors": 
                  result =  "win";
                  break;
              }
          break;
          case "Paper":
              document.getElementById('Human-image').src = Paper;
              switch(computer){
                default:
                case "Rock": 
                result = "win";
                break;
                case "Paper": 
                result =  "tie";
                break;
                case "Scissors": 
                result =  "loss";
                break;
              }
          break;
          case "Scissors": 
              document.getElementById('Human-image').src = Scissors;
              switch(computer){
                default:
                  case "Rock": 
                  result = "loss";
                  break;
                  case "Paper": 
                  result =  "win";
                  break;
                  case "Scissors": 
                  result =  "tie";
                  break;
              }
      }
      return result;
  }



  function keepScore(result){
    switch(result){
      default:
        case "win":
          win++;
          document.querySelector('.Player').innerHTML = "Player: " + win;
          break;
        case "loss":
          loss++;
          document.querySelector('.Computer').innerHTML = "Computer: " + loss;
          break;
        case "tie":
          tie++;
          break;
    }
    if (win+loss+tie === 5){ //5round game
      console.log("5 rounds played", win, loss, tie)
      let games=[win,loss]; //put result in array
      var endResult = games.indexOf(Math.max(...games)); //search array for highest number to decide outcome
      switch(endResult){
        default:
          case 0:
            roundWin++;
            swal("You win!")
            .then((clearAll => {
              document.querySelector('.Player').innerHTML = "Player: " + win;
              document.querySelector('.Computer').innerHTML = "Computer: " + loss;
            }));
            document.querySelector('.Win-counter').innerHTML = "Wins: " + roundWin;
            break;
          case 1:
            roundLoss++;
            swal("You lose!")
            .then((clearAll => {
              document.querySelector('.Player').innerHTML = "Player: " + win;
              document.querySelector('.Computer').innerHTML = "Computer: " + loss;
            }));
            document.querySelector('.Loss-counter').innerHTML = "Losses: " + roundLoss;
            break;
      }
      if (win===loss){
        document.body.style = 'background: white;';
        swal("It's a tie!")
        .then((clearAll => {
          document.querySelector('.Player').innerHTML = "Player: " + win;
          document.querySelector('.Computer').innerHTML = "Computer: " + loss;
        }));
        roundTie++;
        document.querySelector('.Tie-counter').innerHTML = "Ties: " + roundTie;
      }
      win=loss=tie=0; //reset counters

      
    }
  }

    return (
      <div className="App">
          <main className="App-content">
            <h1>Rock Paper Scissors</h1>
            <div>Rounds</div>
            <div className = "Scoreboard">
            <a className="Win-counter">Wins: 0</a>
            <a className="Loss-counter">Losses: 0</a>
            <a className="Tie-counter">Ties: 0</a>
            </div>
            <div className = "Images">
              <img id= "Human-image" src={Paper} width = "100" height = "100"></img>
              <img id="Computer-image" src={Paper} width = "100" height = "100"></img> 
            </div>
            <div className="Image-labels"> <a className="Player">Player: 0</a> <a className="Computer ">Computer: 0</a> </div>
            <div className="Buttons">
              <button className = "button" onClick = {() => keepScore(playGame("Rock"))}>Rock</button>
              <button className = "button" onClick = {() => keepScore(playGame("Paper"))}>Paper</button>
              <button className = "button" onClick = {() => keepScore(playGame("Scissors"))}>Scissors</button>
              </div>
          </main>
      </div>
  );
}

export default App;
