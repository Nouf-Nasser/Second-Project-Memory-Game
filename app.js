var theOpenCards    = [];
var myMoves         = 0;
var theStarsRating  = $("i");
var clicks          = 0;
var theEnd          = false;
CardList = CardsInitialize();
restart = $('.restart');
//---------------------------------------------
var interval;
var timer = document.querySelector(".timer"); //same as $(.timer) using jQuery
timer.innerHTML = "0 mins : 0 secs";
var shuffleOne = shuffle(CardList);
DisplayCards();
var click = 0;
//adding an event listener
$(".card").on("click", function(){ //using jQuery
  click++;
  if (click == 1){startTimer();}
     theMatcher(this);
});// end with the matcher
//--------------------operationsArea-------------------
function CardsInitialize(){
  //logic to init cards
  var domCards = []; //dom
  domCards     = document.getElementsByClassName("card");
  return transformer(domCards);
}//cardInit
//------------------------------------------------
function transformer(obj) {
  var maped = [];
  for (var key in obj){
    if(obj.hasOwnProperty(key)){
      maped.push(obj[key].innerHTML);
    }
  }
  return maped;
}
//------------------------------------------------
function DisplayCards(){
    var list = cardsFactory();
    replacer(list);
}//display cards
function replacer(list){
  document.getElementsByClassName("deck")[0].innerHTML = list.innerHTML;
}
function cardsFactory(){
  var list = document.createElement("ul");
  for(var i = 0 ; i < shuffleOne.length; i++){
    var li = document.createElement("li");
    li.innerHTML = shuffleOne[i];
    li.classList.add("card");
    list.appendChild(li);
  }//end for
  return list;
}//end minuplate
//-------------------------------------
function isClicked(card){
  if( $(card).hasClass("show") || $(card).hasClass("open")){
    return true ;
  }
  return false ;
}
//-------------------------------------
function theMatcher(card){
  if (isClicked(card)){
     return;
  }//end of isClicked here
  displaySymbol(card);
  markedOpened(card);
}//end of theMatcher
//-------------------------------------
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//-------------------------------------
function displaySymbol(card){
  $(card).addClass("show open animated heartBeat");
  //logic to show symbol
}// end displaySymbol
//-------------------------------------
incrementMoves = (card)=>{            // writing function in a new way
  if (theEnd || $(card).hasClass("match") || $(card).is($(theOpenCards[0])) ){
      return false;
  }
  myMoves++;
  Rating(myMoves);
  $(".myMoves").text(myMoves);
};
//---------------------------------------
isMatch=()=>{               // writing function in a new way
      let condition1 = theOpenCards[0].innerHTML != theOpenCards[1].innerHTML;
      let condition2 = $(theOpenCards[0]).is($(theOpenCards[1]));

      if (condition1 || condition2){
           return false;
      }else{
        return true;
      }
}; //matching the cards
//---------------------------------------
matchCaseProcessor = (theOpenCards)=>{
  markAsMatched(theOpenCards);

};//matchCaseProcessor
markAsMatched = (theOpenCards)=>{
  for (let i = theOpenCards.length - 1; i >= 0; i--){
    $(theOpenCards[i]).addClass("match animated tada");
  }//for loop
};//end markAsMatched

notMatchCaseProcessor=(theOpenCards)=>{
  styleDanger(theOpenCards);
  animateTada(theOpenCards);  //if they are not matched thin animate the card

  var currentCards = theOpenCards;
  setTimeout(function(){
    hideSymbole(currentCards); //after animating the card, hide it
  }, 1000);                  // wait 1000ms thin hide the card


};// done with notMatchCaseProcessor
//---------------------------------------
animateTada = (theOpenCards)=>{
       //use animate.css
};//end animateTada
//--------------------------------------
hideSymbole = (theOpenCards)=>{//just 2 cards
  for (var i = theOpenCards.length - 1; i >= 0; i--) {
    $(theOpenCards[i]).removeClass("open show"); //hide them by removing open&show
  }
};// end hideSymbole
//---------------------------------------
styleDanger = (theOpenCards)=>{
  for (var i = theOpenCards.length - 1; i >= 0; i--) {
    $(theOpenCards[i]).addClass("danger");
  }
};
//---------------------------------------

function markedOpened(card){
     // check theOpenCards array
     // if length > 0 card exist
     //
     //else
     //push
     //true!
     if (theOpenCards.length > 0){
       //not yet
       incrementMoves(); //increment it
       //displaySymbol(card);
       theOpenCards.push(card);
       //checked if matched
       if (isMatch(theOpenCards)){ //2 cards exists
           matchCaseProcessor(theOpenCards);
           theOpenCards=[];
       } else{
           notMatchCaseProcessor(theOpenCards);
           theOpenCards=[];

       }
     } else{
       theOpenCards.push(card);
       incrementMoves(); //increment it

     }
     checkedMatchedAll();
};//end

checkedMatchedAll =()=>{
  let all = true;
  $(".card").each(function(){
    return all = $(this).hasClass("match"); //true or false
  });//end each
  //false
  if(all){
    //alert("Congratulations");
    //awesomeAlert();
    showingResults();
    theEnd = true;
  }
};
//----------------------------------------------
function showingResults(){
  var score = Rating(myMoves);
  clearInterval(interval);
  var time = timeSetter(); //bring timer div innerHTML
  //contains (score, time, myMoves)
  sweetAlert("Congratulations, you WIN !!" , + myMoves + "Moves " + "scoring: " + score +"star!! " + ", Time:" + time ,"success");
};//see helpers.js
//------------------------------------------------
function timeSetter(){
  return $("#timer").text();
};
//-------------------------------------------------
let second = 0, minute = 0; hour = 0;
function startTimer(){
  interval = setInterval(function(){
    timer.innerHTML = minute+"m" + ":" + second + "s";
    second++;
    if (second == 60){
      minute++;
      second=0;
    }
    if (minute == 60){
      hour++;
      minute = 0;
    }
  }, 1000);
}; // end of the timer
//-------------------------------------
// Rating with stars..
function Rating(myMoves){
   let score = 3;
   if(myMoves <= 20) {
     theStarsRating.eq(3).removeClass("fa-star").addClass("fa-star-o");
     score=3;
   } else if (myMoves > 20 && myMoves <= 30) {
     theStarsRating.eq(2).removeClass("fa-star").addClass("fa-star-o");
     score=2;
   } else if (myMoves > 30) {
     theStarsRating.eq(1).removeClass("fa-star").addClass("fa-star-o");
     score=1;
   }
   return score;
};
//-------------------------------------------------------
// Refresh the GAME..
restart.on('click', function (confirmed) {
    if (confirmed) {
      window.location.reload()
        init();
    }
});
//THE END for now..
