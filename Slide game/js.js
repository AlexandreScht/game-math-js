//var nombre de ligne
//------------------
var RowNumber = 7;
//------------------
//var nombre de cologne
//-------------------
var ColNumber = 14; 
// creation du tableau
function tableCreate(row, col){
    let body = document.body;
    let tbl  = document.createElement('table');
    let numberCell = 0;
    for(let i = 0; i < row; i++){
        let tr = tbl.insertRow();
        for(let j = 0; j < col; j++){
            numberCell++;
                let td = tr.insertCell();
                td.id = 'cell_' + numberCell;
            }     
    }
    body.appendChild(tbl);
}
tableCreate(RowNumber,ColNumber);
// depart aleatoire
let RandCell = Math.round(Math.random() * 97);
const SpawnCell = document.getElementById('cell_' + RandCell);
const SizeSquare = document.querySelector('td');
SpawnCell.style.backgroundColor = 'black';
document.getElementById('square').style.cssText = "background-color: red; transition: 0.3s; position: absolute; width: " + (SizeSquare.offsetWidth - 4) + "px; height: " + (SizeSquare.offsetHeight - 4) + "px; top: " + (SpawnCell.offsetTop + 3) + "px; left: " + (SpawnCell.offsetLeft + 3) + "px;";
//connaitre position du carré rouge + detect click sur fleche directionelle
const BoxElement = document.getElementById("square");
var boxLeftPos = BoxElement.offsetLeft,
boxTopPos = BoxElement.offsetTop,
InterVale = null,
action = 0,
speed = 15;
document.body.addEventListener('keydown', function(e) {
    if (action < 1) {
    action = 1;
    if (InterVale) clearInterval(InterVale);
    switch (e.key) {
        case "ArrowLeft":
            MooveLeft();
            break;
        case "ArrowRight":
            MooveRight();
            break;
        case "ArrowUp":
            MooveTop();
            break;
        case "ArrowDown":
            MooveBottom();
            break;
    }}
});
// Fonction pour deplacer le carré rouge
function MooveTop() {
    if (action > 0 && boxTopPos -4 <= 0)  {action = 0;}
    while (boxTopPos -3 >= 0) {
        boxTopPos -= 1;
    document.getElementById('square').style.top = (boxTopPos)+"px";
    if (boxTopPos -4 <= 0) {
        setTimeout(() => {
            action = 0;  
        }, 200);
    }
    }
}
function MooveBottom() {
    if (action > 0 && boxTopPos + BoxElement.offsetHeight +4 >= document.body.offsetHeight) {action = 0; }
    while (boxTopPos + BoxElement.offsetHeight +3 <= document.body.offsetHeight) {
        boxTopPos += 1;
        document.getElementById('square').style.top = (boxTopPos)+"px";
        if (boxTopPos + BoxElement.offsetHeight +4 >= document.body.offsetHeight) {
            setTimeout(() => {
                action = 0;  
            }, 200);
        }
    }
}
function MooveRight() {
    if (action > 0 && boxLeftPos + BoxElement.offsetWidth +4 >= document.body.offsetWidth) {action = 0;}
    while (boxLeftPos + BoxElement.offsetWidth +3 <= document.body.offsetWidth) {
        boxLeftPos += 1;
        document.getElementById('square').style.left = (boxLeftPos)+"px";
        if (boxLeftPos + BoxElement.offsetWidth +4 >= document.body.offsetWidth) {
            setTimeout(() => {
                action = 0;  
            }, 200);
        }
    }
}
function MooveLeft() {
    if (action > 0 && boxLeftPos -4 <= 0) {action = 0;}
    while (boxLeftPos -3 >= 0) {
    boxLeftPos -= 1;
    document.getElementById('square').style.left = (boxLeftPos)+"px";
    if (boxLeftPos -4 <= 0) {
        setTimeout(() => {
            action = 0;  
        }, 200);
    }
    }
}

// creation du chemin aleatoire
let NumberWayCellMoove,
MooveWay = document.getElementById('cell_' + RandCell),
Lleft = 14 - Math.floor((document.body.offsetWidth - (MooveWay.offsetLeft + 3)) / (SizeSquare.offsetWidth - 4)),
Rright = Math.floor((document.body.offsetWidth - (MooveWay.offsetLeft + 3)) / (SizeSquare.offsetWidth - 4) - 1),
Ttop = 7 - Math.floor((document.body.offsetHeight - (MooveWay.offsetTop + 3)) / (SizeSquare.offsetHeight - 4)),
Bbottom = Math.floor((document.body.offsetHeight - (MooveWay.offsetTop + 3)) / (SizeSquare.offsetHeight - 4) - 1),
OtherDirection = [],
RandValue,
directionWay,
blockCell,
blockList,
LastDirectionWay,
GreyCell,
WayCellNumbers = [];
for (let index = 0; index < 2; index++) {
    if (index <1) {
        blockCell = 29;
    } else { blockCell = 31;}
    blockList = document.getElementById('cell_' + blockCell);
    const pregreycell = {
        Leftedge: blockList.offsetLeft,
        Rightedge: blockList.offsetLeft + SizeSquare.offsetWidth,
        Topedge: blockList.offsetTop,
        Bottomedge: blockList.offsetTop + SizeSquare.offsetHeight
        
    }
    console.log(pregreycell.Leftedge);
    //const Greycell = Object.create(pregreycell);
    Object.values(pregreycell).forEach(() => {
       const dist = Math.hypot(BoxElement.offsetLeft - pregreycell.Leftedge);
       console.log(dist);
       //console.log(dist);
      });
}
// Trouver si oui ou non Valeur dans un tableau (case grise ou non)
/*
let tii = [1, 2, 3, 4, 5, 6, 7, 8, 9];
if (tii.indexOf(9) == -1) {
    console.log('valeur non trouver');
} else console.log('valeur trouver');
/*
//for (let RandWayNumber = Math.round(Math.random() * (10 - 5) + 5); RandWayNumber > 0 ; RandWayNumber--) {
    for (let i = 0; i < 1; i++) {    
    //directionWay = Math.floor(Math.random() * 4);
    directionWay = 0;
    Randways();

    function Randways() {
        //directionWay = Math.floor(Math.random() * 4);
    switch (directionWay) {
        case 0:
            //left
            Lleft = 14 - Math.floor((document.body.offsetWidth - (MooveWay.offsetLeft + 3)) / (SizeSquare.offsetWidth - 4));
            if (Lleft > 0 && LastDirectionWay != 0) {
                NumberWayCellMoove = Math.round(Math.random() * (Lleft - 1) +1);
                console.log(NumberWayCellMoove + " a gauche");
                for (let index = 0; index < NumberWayCellMoove; index++) {
                    RandCell -= 1;
                    WayCellNumbers.push(RandCell);
                    MooveWay = document.getElementById('cell_' + RandCell);
                } 
                LastDirectionWay = 0;
                if ((Lleft - NumberWayCellMoove) > 0) {
                    blockCell = RandCell - 1;
                    blockList = document.getElementById('cell_' + blockCell);
                    const pregreycell = {
                        Leftedge: blockList.offsetLeft,
                        Rightedge: blockList.offsetLeft + SizeSquare.offsetWidth,
                        Topedge: blockList.offsetTop,
                        Bottomedge: blockList.offsetTop + SizeSquare.offsetHeight
                    }
                    const Greycell = Object.create(pregreycell);
                    console.log(Greycell);
                    //GreyCell = new Object(blockList.offsetLeft);
                    //console.log(GreyCell);
                }       
            }else { 
                OtherDirection = [1, 2, 3];
                RandValue = ~~(Math.random()*OtherDirection.length);
                directionWay = OtherDirection[RandValue];
                Randways();
            }
            break;
        case 1:
            //right
            Rright = Math.floor((document.body.offsetWidth - (MooveWay.offsetLeft + 3)) / (SizeSquare.offsetWidth - 4) - 1);
            if (Rright > 0 && LastDirectionWay != 0 ) {
                NumberWayCellMoove = Math.round(Math.random() * (Rright - 1) + 1);
                console.log(NumberWayCellMoove + " a droite");
                for (let index = 0; index < NumberWayCellMoove; index++) {
                    RandCell += 1;
                    WayCellNumbers.push(RandCell);
                    MooveWay = document.getElementById('cell_' + RandCell);
                } LastDirectionWay = 0; 
            }else {
                OtherDirection = [0, 2, 3];
                RandValue = ~~(Math.random()*OtherDirection.length);
                directionWay = OtherDirection[RandValue];
                Randways();
            }
            break;
        case 2:
            //top
            Ttop = 7 - Math.floor((document.body.offsetHeight - (MooveWay.offsetTop + 3)) / (SizeSquare.offsetHeight - 4));
            if (Ttop > 0 && LastDirectionWay != 1) {
                NumberWayCellMoove = Math.round(Math.random() * (Ttop - 1) + 1);
                console.log(NumberWayCellMoove + " en haut");
                for (let index = 0; index < NumberWayCellMoove; index++) {
                    RandCell -= ColNumber;
                    WayCellNumbers.push(RandCell);
                    MooveWay = document.getElementById('cell_' + RandCell);
                } LastDirectionWay = 1;
            } else {
                OtherDirection = [1, 0, 3];
                RandValue = ~~(Math.random()*OtherDirection.length);
                directionWay = OtherDirection[RandValue];
                Randways();
            }
            break;
        case 3:
            //bottom
            Bbottom = Math.floor((document.body.offsetHeight - (MooveWay.offsetTop + 3)) / (SizeSquare.offsetHeight - 4) - 1);
            if (Bbottom > 0 && LastDirectionWay != 1) {
                NumberWayCellMoove = Math.round(Math.random() * (Bbottom - 1) + 1);
                console.log(NumberWayCellMoove + " en bas");
                for (let index = 0; index < NumberWayCellMoove; index++) {
                    RandCell += ColNumber;
                    WayCellNumbers.push(RandCell);
                    MooveWay = document.getElementById('cell_' + RandCell);
                } LastDirectionWay = 1;
            } else {
                OtherDirection = [1, 2, 0];
                RandValue = ~~(Math.random()*OtherDirection.length);
                directionWay = OtherDirection[RandValue];
                Randways();
            }
            break;
        }
    }
}

for (let index = 0; index < WayCellNumbers.length; index++) {
    document.getElementById('cell_' + WayCellNumbers[index]).style.backgroundColor = "orange";
}

// nombre de carrer entre le bord et le carrer rouge
// right = Math.floor((document.body.offsetWidth - (SpawnCell.offsetLeft + 3)) / (SizeSquare.offsetWidth - 4) - 1)
// left = 14 - Math.floor((document.body.offsetWidth - (SpawnCell.offsetLeft + 3)) / (SizeSquare.offsetWidth - 4))
// bottom = Math.floor((document.body.offsetHeight - (SpawnCell.offsetTop + 3)) / (SizeSquare.offsetHeight - 4) - 1)
// top = 7 - Math.floor((document.body.offsetHeight - (SpawnCell.offsetTop + 3)) / (SizeSquare.offsetHeight - 4))

/**
 * Prend une case aleatoire comme depart ***
 * cree chiffre aleatoire pour connaitre nombre de chemin**
 * choisit une direction aleatoire parmis les 4 (sud - nort - est -west) ! ne pas avoir de bord direct apres (100px min)**
 * Verifier que le chemin aleatoire ne passe pas sur un cube gris (compter cube gris comme bord d'ecrant)
 * choisir une nouvelle direction aleatoire jusqu'a ( nouvelle direction = nombre aleatoire de chemin)
 * mettre l'arriver à la fin du chemin
 * enregistrer chemin parcourut*
 * generer aléatoirement block en-dehors du chemin (pour ne pas gener)
 */
