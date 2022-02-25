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
//Nombre de cellules
let CellsNumbers = RowNumber * ColNumber;
// depart aleatoire
let RandCell = Math.round(Math.random() * (CellsNumbers - 1) + 1);
const SpawnCell = document.getElementById('cell_' + RandCell);
//const SpawnCell = document.getElementById('cell_' + 32);
const SizeSquare = document.querySelector('td');
SpawnCell.style.backgroundColor = 'black';
document.getElementById('square').style.cssText = "background-color: red; transition: 0.3s; position: absolute; width: " + (SizeSquare.offsetWidth - 4) + "px; height: " + (SizeSquare.offsetHeight - 4) + "px; top: " + (SpawnCell.offsetTop + 3) + "px; left: " + (SpawnCell.offsetLeft + 3) + "px;";
//connaitre position du carré rouge + detect click sur fleche directionelle
const BoxElement = document.getElementById("square");
var boxLeftPos = BoxElement.offsetLeft,
boxTopPos = BoxElement.offsetTop,
boxRightPos = BoxElement.offsetLeft + SizeSquare.offsetWidth,
boxBottomPos = BoxElement.offsetTops + SizeSquare.offsetHeight,
InterVale = null,
action = 0;
// detect sur qu'elle fleche on appuit
document.body.addEventListener('keydown', function(e) {
// action (sert a bloquer l'eventListener, n'est debloquer que lorsque le block rouge s'arrete)
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
// connaitre position de depart du chemin aleatoire (pour situer le chemin est pouvoir corriger d'eventuelle probleme)
Lleft = 14 - Math.floor((document.body.offsetWidth - (MooveWay.offsetLeft + 3)) / (SizeSquare.offsetWidth - 4)),
Rright = Math.floor((document.body.offsetWidth - (MooveWay.offsetLeft + 3)) / (SizeSquare.offsetWidth - 4) - 1),
Ttop = 7 - Math.floor((document.body.offsetHeight - (MooveWay.offsetTop + 3)) / (SizeSquare.offsetHeight - 4)),
Bbottom = Math.floor((document.body.offsetHeight - (MooveWay.offsetTop + 3)) / (SizeSquare.offsetHeight - 4) - 1),
//declaration des var pour la fonction start
OtherDirection = [], RandValue, GreycellObjects, directionWay, blockCell, blockList, LastDirectionWay, GreyCell, NewbWCMv, StopWayCell = 0, restartgame = 0, GreyCellArray = [], WayCellNumbers = [], HitBoxeGrey;
// generation cellule par cellule de tableau du chemin
function start() {
// cree un nombre de chemin aleatoire
for (let RandWayNumber = Math.round(Math.random() * (10 - 5) + 5); RandWayNumber > 0 ; RandWayNumber--) { 
// creation du direction (north/sud/east/weast) aleatoire
    directionWay = Math.floor(Math.random() * 4);
    Randways();
// generation cellule par cellule de tableau du chemin | Partit detect les problemes
    function Randways() {
    switch (directionWay) {
// case repeter en changeant les donnée pour aller dans la bonne direction
        case 0:
            //left
            Lleft = 14 - Math.floor((document.body.offsetWidth - (MooveWay.offsetLeft + 3)) / (SizeSquare.offsetWidth - 4));
        // si il y a + de 1 cellule de tableau entre la cellule du chemin et le bord de l'ecran
            if (Lleft > 0 && LastDirectionWay != 0) {
            // génére le nombre de deplacement de cellule pour le chemin
                NumberWayCellMoove = Math.round(Math.random() * (Lleft - 1) +1);
                // regarde si le nombre de cellules de deplacement + 1 ne sort pas de l'ecran
                if(Lleft - NumberWayCellMoove > 0) {
                    // On prend l'id de la cellule du nombre de chemin +1 (cellule qui correspondra a un block gris plus tard)
                    let ModifyWay = document.getElementById('cell_' + (RandCell - NumberWayCellMoove - 1));
                    let modifyLeft = 14 - Math.floor((document.body.offsetWidth - (ModifyWay.offsetLeft + 3)) / (SizeSquare.offsetWidth - 4));
                    // on test si la futur cellule gris tombe sur un chemin (si c le cas cela bloquerai le chemin)
                    if (GreyCellArray.indexOf(RandCell - NumberWayCellMoove - 1) >= 0 && modifyLeft > 0) {
                        // on ajoute alors un nombre de cellule aléatoire au nombre de deplacement de cellule pour prolonger le chemin
                        NewbWCMv = Math. floor(Math.random() * (modifyLeft - 1) + 1);
                        NumberWayCellMoove += NewbWCMv;
                        console.log(NewbWCMv);
                        // si le chemin ne peus pas etre prolonger on change alors la direction de ce dernier
                    } else if (GreyCellArray.indexOf(RandCell - NumberWayCellMoove - 1) >= 0 && modifyLeft < 1) { 
                        OtherDirection = [1, 2, 3];
                        RandValue = ~~(Math.random()*OtherDirection.length);
                        directionWay = OtherDirection[RandValue];
                        Randways();
                    }
                }
                // Pour chaque deplacement on recupere l'id de la cellule que l'on met dans le tableau WayCellNumbers
                for (let index = 0; index < NumberWayCellMoove; index++) {
                    RandCell -= 1;
                    // le tableau GreyCellArray correspond aux cellule grise (on test que le chemin ne passe pas sur un block gris(qui bloquerai alors ce dernier))
                    if (GreyCellArray.indexOf(RandCell) == -1) {
                        WayCellNumbers.push(RandCell);
                        MooveWay = document.getElementById('cell_' + RandCell);
                        // si il passe sur un block gris alors le chemin s'arrete une cellule avant
                    } else { 
                        RandCell += 1;
                        index = NumberWayCellMoove;
                        StopWayCell = 1;
                    }  
                }
                // LastDirectionWay sert a changer obligatoirement de direction( si le chemin est partit vers le haut/bas alors le prochain chemin sera vers la gauche/droite)
                LastDirectionWay = 0;
                // enfin on test si la position du block gris et sur le chemin (pas le block gris plus tard mais celui de l'instant T)
                if ((Lleft - NumberWayCellMoove) > 0 && WayCellNumbers.indexOf(RandCell - 1) == -1) {
                    blockCell = RandCell - 1;
                    if (StopWayCell < 1) {
                        // on ajoute l'id de la cellule dans le tableau des block gris
                        GreyCellArray.push(blockCell);
                    } else {
                        StopWayCell = 0;
                    }
                }  
            // si le chemin est coller au bord on change alors la direction 
            }else { 
                OtherDirection = [1, 2, 3];
                RandValue = ~~(Math.random()*OtherDirection.length);
                directionWay = OtherDirection[RandValue];
                Randways();
            }
            break;
            // repetition pour chaque direction
        case 1:
            //right  
            Rright = Math.floor((document.body.offsetWidth - (MooveWay.offsetLeft + 3)) / (SizeSquare.offsetWidth - 4) - 1);
            if (Rright > 0 && LastDirectionWay != 0) {
                NumberWayCellMoove = Math.round(Math.random() * (Rright - 1) + 1);
                if(Rright - NumberWayCellMoove > 0) {
                    let ModifyWay = document.getElementById('cell_' + (RandCell + NumberWayCellMoove + 1));
                    let modifyRight = Math.floor((document.body.offsetWidth - (ModifyWay.offsetLeft + 3)) / (SizeSquare.offsetWidth - 4) - 1);
                    if (GreyCellArray.indexOf(RandCell + NumberWayCellMoove + 1) >= 0 && modifyRight > 0) {
                        NewbWCMv = Math. floor(Math.random() * (modifyRight - 1) + 1);
                        NumberWayCellMoove += NewbWCMv;
                    } else if (GreyCellArray.indexOf(RandCell + NumberWayCellMoove + 1) >= 0 && modifyRight < 1) { 
                        OtherDirection = [0, 2, 3];
                        RandValue = ~~(Math.random()*OtherDirection.length);
                        directionWay = OtherDirection[RandValue];
                        Randways();
                    }
                }
                for (let index = 0; index < NumberWayCellMoove; index++) {
                    RandCell += 1;
                    if (GreyCellArray.indexOf(RandCell) == -1) {
                        WayCellNumbers.push(RandCell);
                        MooveWay = document.getElementById('cell_' + RandCell);
                    } else { 
                        RandCell -= 1;
                        index = NumberWayCellMoove;
                        StopWayCell = 1;
                    }  
                } LastDirectionWay = 0; 
                if ((Rright - NumberWayCellMoove) > 0 && WayCellNumbers.indexOf(RandCell + 1) == -1) {
                    blockCell = RandCell + 1;
                    if (StopWayCell < 1) {
                        GreyCellArray.push(blockCell);
                    } else {
                        StopWayCell = 0;
                    }
                }
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
                // verifie que le chemin + le nombre de deplacement + 1 est pas en dehors du tableau
                if(typeof(document.getElementById('cell_' + (RandCell - NumberWayCellMoove*ColNumber - ColNumber))) != 'undefined' && document.getElementById('cell_' + (RandCell - NumberWayCellMoove*ColNumber - ColNumber)) != null) {
                // utilisisation de la var ColNumber (Pour ce deplacer de ligne (exemple: il y a 14 collognes par ligne alors pour changer de ligne sans changer de cologne on ajoute le nombre de cologne a notre chemin actuelle))
                let ModifyWay = document.getElementById('cell_' + (RandCell - NumberWayCellMoove*ColNumber - ColNumber));
                let modifyTop = 7 - Math.floor((document.body.offsetWidth - (ModifyWay.offsetLeft + 3)) / (SizeSquare.offsetWidth - 4));
                if (GreyCellArray.indexOf(RandCell - NumberWayCellMoove*ColNumber - ColNumber) >= 0 && modifyTop > 0) {
                    NewbWCMv = Math. floor(Math.random() * (modifyTop - 1) + 1);
                    NumberWayCellMoove += NewbWCMv;
                    console.log(NewbWCMv);
                } else if (GreyCellArray.indexOf(RandCell - NumberWayCellMoove*ColNumber - ColNumber) >= 0 && modifyTop < 1) { 
                    OtherDirection = [1, 0, 3];
                    RandValue = ~~(Math.random()*OtherDirection.length);
                    directionWay = OtherDirection[RandValue];
                    Randways();
                }
            }
                for (let index = 0; index < NumberWayCellMoove; index++) {
                    RandCell -= ColNumber;
                    if (GreyCellArray.indexOf(RandCell) == -1) {
                        WayCellNumbers.push(RandCell);
                        MooveWay = document.getElementById('cell_' + RandCell);
                    } else { 
                        RandCell += ColNumber;
                        index = NumberWayCellMoove;
                        StopWayCell = 1;
                    }  
                } LastDirectionWay = 1;
                if ((Ttop - NumberWayCellMoove) > 0 && WayCellNumbers.indexOf(RandCell - ColNumber) == -1) {
                    blockCell = RandCell - ColNumber;
                    if (StopWayCell < 1) {
                        if (blockCell >= 0) {
                            GreyCellArray.push(blockCell);
                        }
                    } else {
                        StopWayCell = 0;}

                } 
                
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
            if(Bbottom > 0 && LastDirectionWay != 1) {
            NumberWayCellMoove = Math.round(Math.random() * (Bbottom - 1) + 1);
                if (typeof(document.getElementById('cell_' + (RandCell + NumberWayCellMoove*ColNumber + ColNumber))) != 'undefined' && document.getElementById('cell_' + (RandCell + NumberWayCellMoove*ColNumber + ColNumber)) != null) {
                    let ModifyWay = document.getElementById('cell_' + (RandCell + NumberWayCellMoove*ColNumber + ColNumber));
                    let modifyTop = Math.floor((document.body.offsetWidth - (ModifyWay.offsetLeft + 3)) / (SizeSquare.offsetWidth - 4) - 1);
                    if (GreyCellArray.indexOf(RandCell + NumberWayCellMoove*ColNumber + ColNumber) >= 0 && modifyTop > 0) {
                        NewbWCMv = Math. floor(Math.random() * (modifyTop - 1) + 1);
                        NumberWayCellMoove += NewbWCMv;
                        console.log(NewbWCMv);
                    } else if (GreyCellArray.indexOf(RandCell + NumberWayCellMoove*ColNumber + ColNumber) >= 0 && modifyTop < 1) { 
                        OtherDirection = [1, 0, 2];
                        RandValue = ~~(Math.random()*OtherDirection.length);
                        directionWay = OtherDirection[RandValue];
                        Randways();
                    }
                }
                for (let index = 0; index < NumberWayCellMoove; index++) {
                    RandCell += ColNumber;
                    if (GreyCellArray.indexOf(RandCell) == -1) {
                        WayCellNumbers.push(RandCell);
                        MooveWay = document.getElementById('cell_' + RandCell);
                    } else { 
                        RandCell -= ColNumber;
                        index = NumberWayCellMoove;
                        StopWayCell = 1;
                    }
                } LastDirectionWay = 1;
                if ((Bbottom - NumberWayCellMoove) > 0 && WayCellNumbers.indexOf(RandCell + ColNumber) == -1) {
                    blockCell = RandCell + ColNumber;
                    if (StopWayCell < 1) {
                        GreyCellArray.push(blockCell);
                    } else {
                        StopWayCell = 0;
                    }
                } 
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
new_game();
}
start();
function new_game() {
for (let index = 0; index < WayCellNumbers.length; index++) {
    document.getElementById('cell_' + WayCellNumbers[index]).style.backgroundColor = "orange";
}
document.getElementById('cell_' + WayCellNumbers.slice(-1)).style.backgroundColor = "green";
const GreenCell = WayCellNumbers.slice(-1);
ArrayProtectGreen = [parseInt(GreenCell) + 1, parseInt(GreenCell) - 1, parseInt(GreenCell) + ColNumber, parseInt(GreenCell) - ColNumber];
for (let index = 0; index < ArrayProtectGreen.length; index++) {
if (WayCellNumbers.indexOf(ArrayProtectGreen[index]) == -1 && GreyCellArray.indexOf(ArrayProtectGreen[index]) == -1 && ArrayProtectGreen[index] <= CellsNumbers) {
    GreyCellArray.push(ArrayProtectGreen[index]);
}
}
const WhiteCell = (CellsNumbers - (WayCellNumbers.length + GreyCellArray.length)) / 3;
const RandLevel = Math.floor(Math.random() * (WhiteCell - 8) + 8);
for (let index = 0; index < RandLevel; index++) {
    RandGreyCell();
    if (index == RandLevel - 1) {
        greycell();
    }
}
}
function RandGreyCell() {
  rgc = Math.round(Math.random() * (CellsNumbers - 1) + 1);
  if (WayCellNumbers.indexOf(rgc) >= 0 || GreyCellArray.indexOf(rgc) >= 0 || WayCellNumbers.slice(-1) == rgc) {
    RandGreyCell();
  } else {
     GreyCellArray.push(rgc);
     //console.log(rgc);
  }
}
function greycell() {
    const TrueGreyCell = GreyCellArray.filter(x => x >= 0);
    for (let index = 0; index < TrueGreyCell.length; index++) {
        document.getElementById('cell_' + TrueGreyCell[index]).style.backgroundColor = "rgb(76, 76, 76)";
        document.getElementById('cell_' + TrueGreyCell[index]).className = "BlockGrey";
    }
    const GreyBox = document.querySelectorAll(".BlockGrey");
    GreyBox.forEach(hitbox => {
        const HitBoxeGrey = (Math.hypot(BoxElement.offsetLeft - hitbox.offsetLeft, BoxElement.offsetTop - hitbox.offsetTop, (BoxElement.offsetLeft + SizeSquare.offsetWidth) - (hitbox.offsetLeft + SizeSquare.offsetWidth), (BoxElement.offsetTop + SizeSquare.offsetHeight) - (hitbox.offsetTop + SizeSquare.offsetHeight)));
        console.log(HitBoxeGrey);
    });

}
//forEach
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
