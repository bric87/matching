let playArea = document.getElementById('play-area');
let playButton = document.getElementById('play-button');


const imageSrc = ['./images/bear.jpg','./images/rhino.jpg','./images/camel.jpg','./images/bison.jpg','./images/alligator.jpg','./images/sheep.jpg']
const backImage = '<img src="./images/back.png"/>';
let cardListeners = [];
let card1='';
let card2='';
let matchCount = 0;
let numOfCards;






//************************************************* */
const flippedCheck = () =>{
    if(card1 && card2){
            return true;
        }
}

//**************************************************** */
const resetNonMatch = () => {
    document.getElementById(card1).src = './images/back.png';
    document.getElementById(card2).src = './images/back.png';
    card1 ='';
    card2 ='';;
    for(let i=0; i<numOfCards; i++){
        let first = (i+1)+'1';
        let second = (i+1)+'2';
        document.getElementById(first).classList.remove('no-touch');
        document.getElementById(second).classList.remove('no-touch');
    }
}

//********************************************************** */
const resetMatch = () => {
    card1 ='';
    card2 ='';
}

//************************************************************ */
const checkWin = () => {
    if(matchCount === numOfCards){
        document.getElementById('play-again-button').style.display='inline';
    }
}

//************************************************************* */
const matched = () => {
    if(Math.abs(card2-card1) === 1){
        matchCount++;
        document.getElementById(card1).classList.add('never-touch');
        document.getElementById(card2).classList.add('never-touch');
        return true;
    } else {
        return false;
    }

}

//************************************************************* */
//put cards backs and named pairs into an array*********
const createCards = (num) =>{
    const cards = [];
    //eventually pick random cards
        for(let i=0;i<numOfCards;i++){
            if(numOfCards>3){
                cards.push(`<div class="card small"><img id="${i+1}1" class="smallImg" src="./images/back.png"></div>`);
                cards.push(`<div class="card small" ><img id="${i+1}2" class="smallImg" src="./images/back.png"></div>`);
            } else {
                cards.push(`<div class="card"><img id="${i+1}1" src="./images/back.png"></div>`);
                cards.push(`<div class="card" ><img id="${i+1}2" src="./images/back.png"></div>`);
            }
            
        }
    return cards
}

//****************************************************************** */
const generateRandNum = () => {
    let num = numOfCards*2
   return Math.floor(Math.random()*num);
}


//******************************************************************* */
//put the cards on the board upside down**********

const putCardsOnBoard = (cards) =>{
    let cardHTML = '';
    let randArray = []
    for(let i=0;i<cards.length;i++){
        let already = false;
         do {
            let randNum = generateRandNum()
            if(randArray.includes(randNum)){
                already = true;
            } else {
                already = false;
                randArray.push(randNum);
            }
          } while (already === true);
          
        cardHTML+=cards[randArray[i]];
    }
    
    if(numOfCards > 3){
        playArea.classList.add('four-column');
    } else {
        playArea.classList.add('three-column');
    }
   
    playArea.innerHTML = cardHTML;
}

//*************************************************************** */
const createCardEventListeners = (arr) => {
    for(let i=0;i<numOfCards;i++){
        cardListeners.push(document.getElementById(`${i+1}1`).addEventListener('click',flipped));
        cardListeners.push(document.getElementById(`${i+1}2`).addEventListener('click',flipped));
    }
}
//*********************************************************************/
/*
const playGame = () => {
    cardListeners = [];
    matchCount = 0;
    let cards = createCards(imageSrc);
    putCardsOnBoard(cards);
    createCardEventListeners(imageSrc);
    document.getElementById('play-again-button').style.display='none';
}
*/

//************************************************************* */

const flipped = (event) =>{
    
    let cardFlipped = event.target.id;
    console.log(cardFlipped)
    let actualImageSrc = imageSrc[cardFlipped[0]-1];

        //set cards
    if(card1===cardFlipped){
        console.log('same card, do nothing')
    } else if(card1){
        card2 = cardFlipped;
        document.getElementById(card2).src = actualImageSrc;
    } else {
        card1 = cardFlipped;
        document.getElementById(card1).src = actualImageSrc;
    }
        
    if(flippedCheck()){
        if(matched()){
            resetMatch();
            checkWin()
        } else {
            for(let i=0; i<numOfCards; i++){
                let first = (i+1)+'1';
                let second = (i+1)+'2';
                document.getElementById(first).classList.add('no-touch');
                document.getElementById(second).classList.add('no-touch');
            }
            setTimeout(resetNonMatch,2000);
            }
        }
}


//*************************************************** */
const numCards = (event) => {
    //let numOfCards;
    console.log(event.target.id);

    switch(event.target.id){
        case 'six' : numOfCards = 3;
        break;
        case 'eight' : numOfCards = 4;
        break;
        case 'ten' : numOfCards = 5;
        break;
        case 'twelve' : numOfCards = 6;
        break;
    }
        cardListeners = [];
        matchCount = 0;
        console.log('numOfCards')
        let cards = createCards(numOfCards);
        putCardsOnBoard(cards);
        createCardEventListeners(numOfCards);
        document.getElementById('play-again-button').style.display='none';
    }


//*********************************************************************** */

    const playAgain = () => {
        document.getElementById('play-again-button').style.display='none';
        playArea.classList.remove('three-column');
        playArea.classList.remove('four-column');

        playArea.innerHTML = `<div id="count"><button id="six">6</button>
        <button id="eight">8</button>
        <button id="ten">10</button>
        <button id="twelve">12</button></div>`;

        document.getElementById('six').addEventListener('click',numCards);
document.getElementById('eight').addEventListener('click',numCards);
document.getElementById('ten').addEventListener('click',numCards);
document.getElementById('twelve').addEventListener('click',numCards);
    }
    



//*********************************************************************** */
//playButton.addEventListener('click',playGame);
document.getElementById('play-again-button').addEventListener('click',playAgain);


document.getElementById('six').addEventListener('click',numCards);
document.getElementById('eight').addEventListener('click',numCards);
document.getElementById('ten').addEventListener('click',numCards);
document.getElementById('twelve').addEventListener('click',numCards);





