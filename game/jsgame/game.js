// ciblage du DOM
let app = $("#app");
let result = $("#result");

// autres variables globales
let sums = [];
let points = 0;
let nbs_question = 0;
const num_ops = 10;
let max = 11;


// Début 1ére fonction à apparaitre
function before_game() {
  let div = $("<div></div>");
  div.html(
    `
    <button id="bfg" onclick="start_game()">Lancer le jeux</button>
    `
  );
  app.append(div);
  timer_initi();
}
//Fin 1ére fonction à apparaitre

// Début fonction pour le timer en haut à droite
function Timer() {
  let timeS = document.getElementById("timerS").value;
  if (timeS > 0){
  intervalId = setInterval(function () {
    afficheT.textContent = timeS;
    timeS -= 1;
    console.log(timeS);
    if (timeS <= -1) {
        check()
        clearInterval(intervalId);
    }
  }, 1000);
} else {
  document.getElementById("afficheT").innerHTML = "";
}
}
//Fin fonction pour le timer en haut à droite

// Début 2ème fonction à apparaitre
function start_game() {
  Timer();
  document.getElementById("timeS").style.display = "none";
  document.getElementById("afficheT").style.display = "block";
  document.getElementById("bfg").style.display = "none";
  document.getElementById("app").style.display = "block";
  for (let i=0; i<num_ops; i++) {
    create_operation();
    nbs_question++;
  }
  // bouton de validation
  let btn = $("<button id='ButtonV'>Corriger</button>");
  btn.click(check);
  app.append(btn);
}
//Fin 2ème fonction à apparaitre

// Début fonction qui définit les nombres aléatoire à afficher
function create_operation() {
  // definir le nombre max par l'utilisateur (de base max=11)
  let MaxS = document.getElementById("ValeurM").value;
  if (MaxS > 1 && MaxS != max){
    max = MaxS;
    max++;
  }
  
  //définition des nombre est symbole aléatoire
  let operand1 = random(1,max);
  let operand2 = random(1,max);
  let opera = randome(1,5);
  let sum = parseInt(eval(operand1 + opera + operand2));
  //let sum = parseFloat(eval(operand1 + opera + operand2)).toFixed(2);
  sums.push(sum);
 

  let div = $("<div></div>");
  div.html(
    `
      <span class="ft" id="fto1">${operand1}</span> <span id="ftop" class="sign">${opera}</span> <span id="fto2">${operand2}</span> <span id="egal" class="tp">=</span>
      <input type="number" class="game aft" id="ftip">
      <span class="correction aft" id="corect"></span>
    `
  );

  app.append(div);
}
//Fin fonction qui définit les nombres aléatoire à afficher

// Début fonction qui verifie le resultat
function check() {
  let points = 0;
  clearInterval(intervalId);
  document.getElementById("afficheT").style.display = "none";
  let inputs = $(".game");
  let spans = $(".correction");

  // itération sur la collection d'élements jQuery par la méthode .each
  inputs.each((i) => {
    
    let answer = parseInt(inputs[i].value);
    spans[i].innerText = sums[i];

    // vérification de la réponse
    if (answer == sums[i]) {
      points++;
      spans[i].style.color = "green";
    } else {
      spans[i].style.color = "red";
    }
  
  })

  // suprition du bouton corriger
  var parent = document.getElementById("app");
  var child = document.getElementById("ButtonV");
  var removed = parent.removeChild(child);

  // affichage des points
  result.text(points + "/" + nbs_question);
  document.getElementById("timeS").style.display = "block";
  
  let relanc = $("<button class='relanc'>relancer une nouvelle série</button>");
  relanc.click(start_game);
  app.append(relanc);
}
//Fin fonction qui verifie le resultat

// Début des fonctions qui initialise l'aléatoire
// function pour les nombres aléatoire
function random(min, max) {
  return Math.floor(Math.random() * (max-min)) + min;
}
// function pour les signe aléatoire
function randome(min, max){
  let sopa = Math.floor(Math.random() * (max-min)) + min;
  switch(sopa){
    case 1:
      return "+";
      break;
    case 2:
      return "-";
      break;
    case 3:
      return "*";
      break;
    case 4:
      return "/";
      break;
  }
}
//Fin des fonctions qui initialise l'aléatoire

// Initialisation du timer
function timer_initi() {
  intervalId = setInterval(function () {
    console.log("initialisation timer éffectuer");
    clearInterval(intervalId);
}, 10);
}

// Démarrage du jeu
before_game();
