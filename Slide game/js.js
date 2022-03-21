var CellsNumbers, ColNumber, RowNumber, WidthWeight, SpawnNumber, RandCell, SpawnCell, boxLeftPos, boxTopPos, InterVale, RowFinder, CollFinder, PositionBox, action, Coll, Row, StopMoove, StopWay, StopBlock, resize, MooveWay;
var RandNumbersWay, Lleft, Rright, Ttop, FinalCell, Bbottom, FalseWay, maxWay, minWay, StopKeyr, rgbc, StartBoxTopPos, StartBoxLeftPos, RandWayMoove, AvailableWay, directionWay, RandNumbers, MooveDirection, rand, rValue, FindGreyCell, FindWhitheCell, RandNumbersWay, WayCellNumbers = [], GreyCellArray = [], ArrayProtectGreen = [], TrueGreyCell = [], TrueWayCell = [];
var StopKeySpace = 0, StopKeyEscape = 0, StopKeyArrow = 0;
if (sessionStorage.getItem("ColNumbers")) {
    ColNumber = parseInt(sessionStorage.getItem("ColNumbers"));
    RowNumber = parseInt(sessionStorage.getItem("RowNumbers"));
} else {
    RowNumber = 7, ColNumber = 14;
}
    function tableCreate(row, col){
        let body = document.body;
        let tbl  = document.createElement('table');
        let numberCell = 0;
        let numberCol = 0;
        for(let i = 1; i < row + 1; i++){
            let tr = tbl.insertRow();
            tr.id = 'row_' + i;
            numberCol++;
            for(let j = 1; j < col + 1; j++){
                // determine la cellule
                numberCell++;
                    let td = tr.insertCell();
                    //attribution a chaque cellule d'un id pour pouvoir toute les diferencier
                    td.id = 'cell_' + numberCell;
                    // Attribution d'une classe de collogne et de lignes
                    td.classList.add("0"+numberCol, j); 
                }     
        }
        body.appendChild(tbl);
    }
    tableCreate(RowNumber,ColNumber);
    //Nombre de cellules
    CellsNumbers = RowNumber * ColNumber;
    // depart aleatoire
    RandCell = Math.round(Math.random() * (CellsNumbers - 1) + 1);
    SpawnNumber = RandCell;
    SpawnCell = document.getElementById('cell_' + RandCell);
    MooveWay = SpawnCell;
    //bg cell de depart
    SpawnCell.style.backgroundColor = 'aqua';
    // connaitre dimension des cellules
    const SizeSquare = document.querySelector('td');
    WidthWeight = document.getElementById('WidthMesure').offsetWidth;
    const BoxElement = document.getElementById("square");
    // creation du cube rouge
    document.getElementById('square').style.cssText = "background-image: url(img/BGMainCell.jpg); background-position: center center; background-size: 100% 100%; background-repeat: no-repeat; transition: 0.3s; position: absolute; width: " + (SizeSquare.offsetWidth - (WidthWeight*1.8)) + "px; height: " + (SizeSquare.offsetHeight - (WidthWeight*1.8)) + "px; top: " + (SpawnCell.offsetTop + WidthWeight) + "px; left: " + (SpawnCell.offsetLeft + WidthWeight) + "px;";
    // connaitre position de cube rouge
    boxLeftPos = BoxElement.offsetLeft;
    boxTopPos = BoxElement.offsetTop;
    StartBoxLeftPos = boxLeftPos;
    StartBoxTopPos = boxTopPos;
    InterVale = null;
    PositionBox = SpawnNumber;
    action = 0;
    // -----creation du chemin aleatoire--------
    MooveDirection = null;
    // cree un nombre de chemin aleatoire
    // racine carrer (permet de determiner le nombre de chemin possible max suivant la grandeur du nv)
    maxWay = Math.round(Math.sqrt(CellsNumbers));
    minWay = Math.floor((maxWay/2));
    for (let index = Math.round(Math.random() * (maxWay - minWay) + minWay); index > 0; index--) {
        // connaitre position de depart du chemin aleatoire (pour situer le chemin est pouvoir corriger d'eventuelle probleme)
        Lleft = parseInt(MooveWay.classList[1] -1);
        Rright = ColNumber - (parseInt(MooveWay.classList[1]));
        Ttop = parseInt(MooveWay.classList[0].substring(1) - 1);
        Bbottom = RowNumber - (parseInt(MooveWay.classList[0].substring(1)));
        directionWay = [];
        AvailableWay = [];
        //verifie les direction possible de au moins 1 block
        if (Lleft > 0 && GreyCellArray.indexOf(RandCell - 1) < 0 && MooveDirection != 'horizontal') {
            directionWay.push(0);
        }
        if (Rright > 0 && GreyCellArray.indexOf(RandCell + 1) < 0 && MooveDirection != 'horizontal') {
            directionWay.push(1);
        }
        if (Ttop > 0 && GreyCellArray.indexOf(RandCell - ColNumber) < 0 && MooveDirection != 'vertical') {
            directionWay.push(2);
        }
        if (Bbottom > 0 && GreyCellArray.indexOf(RandCell + ColNumber) < 0 && MooveDirection != 'vertical') {
            directionWay.push(3);
        }
        // verifie que au moin une direction soit paussible
        if (directionWay.length > 0) {
            // choisit une direction valable aleatoire parmis celle possible
            rand = Math.floor(Math.random()*directionWay.length);
            rValue = directionWay[rand];
            //Envoie a la fonction qui deplace
            switch (rValue) {
            case 0:
                MooveDirection = 'horizontal';
                LeftWay();
                break;
            case 1:
                MooveDirection = 'horizontal';
                RightWay();
                break;
            case 2:
                MooveDirection = 'vertical';
                TopWay();
                break;
            case 3:
                MooveDirection = 'vertical';
                BottomWay();
                break;
            }
        // si aucune direction n'est possible, verifie qu'il y est le minimum de chemin requis et arrete la
        } else if (index <= minWay) {
            index = 0;
            // si le minimum de chemin requis n'est pas respecter relance tous (fonction recursive)
        } else {
            window.location.reload();
        } 
    }
function LeftWay() {
    RandNumbersWay = Lleft;
    //console.log(RandNumbersWay+' (avant) chemin possible a gauche');
    // detect les blocks gris sur la ligne 
    console.log(RandNumbersWay+' (avant) chemin possible a gauche');
    for (let index = RandNumbersWay; index > 0; index--) {
        FindGreyCell = RandCell - index;
        if (GreyCellArray.indexOf(FindGreyCell) >= 0) {
            RandNumbersWay = (index - 1);
            console.log('---detection block gris a : '+FindGreyCell+' moddification boucle chemin de '+ RandNumbersWay);
        }
    }
    // detect que le chemin ne s'arrete pas sur un chemin deja existant ou sur le block de spawn
    for (let index = RandNumbersWay; index > 0; index--) {
        FindWhitheCell = RandCell - index;
        if (WayCellNumbers.indexOf(FindWhitheCell - 1) == -1 && SpawnNumber != (FindWhitheCell -1)) {
            // push toutes les cases possible
            AvailableWay.push(index);
        }
    }
    // si aucun chemin n'est possible relance tous
    if (AvailableWay.length < 1) {
        window.location.reload();
    } else {
        console.log(AvailableWay+' ['+AvailableWay.length+'] (apres) chemin possible à gauche');
        RandNumbers = Math.floor(Math.random()*AvailableWay.length);
        RandWayMoove = AvailableWay[RandNumbers];
        //RandWayMoove = Math.floor(Math.random() * (RandNumbersWay - 1)) +1;
        console.log('        '+RandWayMoove+' au left');
        for (let index = 0; index < RandWayMoove; index++) {
            RandCell -= 1;
            if (WayCellNumbers.indexOf(RandCell) == -1) {
                WayCellNumbers.push(RandCell);
            }
        }
        FinalCell = RandCell;
        MooveWay = document.getElementById('cell_' + RandCell);
        if (GreyCellArray.indexOf(RandCell - 1) < 0 && parseInt(MooveWay.classList[1]) > 1) {
            GreyCellArray.push(RandCell -1);
        }
    }
}

function RightWay() {
    RandNumbersWay = Rright;
    console.log(RandNumbersWay+' (avant) chemin possible a droite');
    for (let index = RandNumbersWay; index > 0; index--) {
        FindGreyCell = RandCell + index;
        if (GreyCellArray.indexOf(FindGreyCell) >= 0) {
            RandNumbersWay = (index - 1);
            console.log('---detection block gris a : '+FindGreyCell+' moddification boucle chemin de '+ RandNumbersWay);
        }
    }
    for (let index = RandNumbersWay; index > 0; index--) {
        FindWhitheCell = RandCell + index;
        if (WayCellNumbers.indexOf(FindWhitheCell + 1) == -1 && SpawnNumber != (FindWhitheCell +1)) {
            AvailableWay.push(index);
        }
    }
    if (AvailableWay.length < 1) {
        window.location.reload();
    } else {
        console.log(AvailableWay+' ['+AvailableWay.length+'] (apres) chemin possible à droite');
        RandNumbers = Math.floor(Math.random()*AvailableWay.length);
        RandWayMoove = AvailableWay[RandNumbers];
        //RandWayMoove = Math.floor(Math.random() * (RandNumbersWay - 1)) +1;
        console.log('        '+RandWayMoove+' au right');
        for (let index = 0; index < RandWayMoove; index++) {
            RandCell += 1;
            if (WayCellNumbers.indexOf(RandCell) == -1) {
                WayCellNumbers.push(RandCell);
            }
        }
        FinalCell = RandCell;
        MooveWay = document.getElementById('cell_' + RandCell);
        if (GreyCellArray.indexOf(RandCell + 1) < 0 && parseInt(MooveWay.classList[1]) < ColNumber) {
            GreyCellArray.push(RandCell + 1);
        }
    }
}

function TopWay() {
    RandNumbersWay = Ttop;
    console.log(RandNumbersWay+' (avant) chemin possible en haut');
    for (let index = RandNumbersWay; index > 0; index--) {
        FindGreyCell = RandCell - (ColNumber * index);
        if (GreyCellArray.indexOf(FindGreyCell) >= 0) {
            RandNumbersWay = (index - 1);
            console.log('---detection block gris a : '+FindGreyCell+' moddification boucle chemin de '+ RandNumbersWay);
        }
    }
    for (let index = RandNumbersWay; index > 0; index--) {
        FindWhitheCell = RandCell - (ColNumber * index);
        if (WayCellNumbers.indexOf(FindWhitheCell - ColNumber) == -1 && SpawnNumber != (FindWhitheCell - ColNumber)) {
            AvailableWay.push(index);
        }
    }
    if (AvailableWay.length < 1) {
        window.location.reload();
    } else {
        console.log(AvailableWay+' ['+AvailableWay.length+'] (apres) chemin possible en haut');
        RandNumbers = Math.floor(Math.random()*AvailableWay.length);
        RandWayMoove = AvailableWay[RandNumbers];
        //RandWayMoove = Math.floor(Math.random() * (RandNumbersWay - 1)) +1;
        console.log('        '+RandWayMoove+' au top');
        for (let index = 0; index < RandWayMoove; index++) {
            RandCell -= ColNumber;
            if (WayCellNumbers.indexOf(RandCell) == -1) {
                WayCellNumbers.push(RandCell);
            }
        }
        FinalCell = RandCell;
        MooveWay = document.getElementById('cell_' + RandCell);
        if (GreyCellArray.indexOf(RandCell - ColNumber) < 0 && parseInt(MooveWay.classList[0].substring(1)) > 1) {
            GreyCellArray.push(RandCell - ColNumber);
        }
    }
}
function BottomWay() {
    RandNumbersWay = Bbottom;
    console.log(RandNumbersWay+' (avant) chemin possible en bas');
    for (let index = RandNumbersWay; index > 0; index--) {
        FindGreyCell = RandCell + (ColNumber * index);
        if (GreyCellArray.indexOf(FindGreyCell) >= 0) {
            RandNumbersWay = (index - 1);
            console.log('---detection block gris a : '+FindGreyCell+' moddification boucle chemin de '+ RandNumbersWay);
        }
    }
    for (let index = RandNumbersWay; index > 0; index--) {
        FindWhitheCell = RandCell + (ColNumber * index);
        if (WayCellNumbers.indexOf(FindWhitheCell + ColNumber) == -1 && SpawnNumber != (FindWhitheCell + ColNumber)) {
            AvailableWay.push(index);
        }
    }
    if (AvailableWay.length < 1) {
        window.location.reload();
    } else {
        console.log(AvailableWay+' ['+AvailableWay.length+']  (apres) chemin possible en bas');
        RandNumbers = Math.floor(Math.random()*AvailableWay.length);
        RandWayMoove = AvailableWay[RandNumbers];
        //RandWayMoove = Math.floor(Math.random() * (RandNumbersWay - 1)) +1;
        console.log('        '+RandWayMoove+' au bottom');
        for (let index = 0; index < RandWayMoove; index++) {
            RandCell += ColNumber;
            if (WayCellNumbers.indexOf(RandCell) == -1) {
                WayCellNumbers.push(RandCell);
            }
        }
        FinalCell = RandCell;
        MooveWay = document.getElementById('cell_' + RandCell);
        if (GreyCellArray.indexOf(RandCell + ColNumber) < 0 && parseInt(MooveWay.classList[0].substring(1)) < RowNumber) {
            GreyCellArray.push(RandCell + ColNumber);
        }
    }
}

function Verify_Way() {
    // Verrifie que l'on n'est pas que 1 seul direction à faire four finir le nv
    FalseWay = 0;
    let EndCell = document.getElementById('cell_'+FinalCell);
    if (SpawnCell.classList[0].substring(1) == EndCell.classList[0].substring(1) && SpawnCell.classList[1] == EndCell.classList[1]) {
        //console.log('sur le meme block');
        window.location.reload();
    } else if (SpawnCell.classList[0].substring(1) == EndCell.classList[0].substring(1)) {
        if (parseInt(SpawnCell.classList[1]) > parseInt(EndCell.classList[1])) {
            for (let index = parseInt(SpawnCell.classList[1]) - parseInt(EndCell.classList[1]); index > 0; index--) {
                FindGreyCell = SpawnNumber - index;
                if (GreyCellArray.indexOf(FindGreyCell) == -1) {
                    FalseWay = 1;
                }
            }
            if ((GreyCellArray.indexOf(FinalCell-1) >= 0 || parseInt(EndCell.classList[1]) == 1) && FalseWay > 0) {
                //console.log('chemin fais en 1 coup vers la gauche');
                window.location.reload();
            } else {
                new_game();
            }
        } else {
            for (let index = parseInt(EndCell.classList[1]) - parseInt(SpawnCell.classList[1]); index > 0; index--) {
                FindGreyCell = SpawnNumber + index;
                if (GreyCellArray.indexOf(FindGreyCell) == -1) {
                    FalseWay = 1;
                }
            }
            if ((GreyCellArray.indexOf(FinalCell+1) >= 0 || parseInt(EndCell.classList[1]) == ColNumber) && FalseWay > 0) {
                //console.log('chemin fais en 1 coup vers la droite');
                window.location.reload();
            } else {
                new_game();
            }
        }
    } else if (SpawnCell.classList[1] == EndCell.classList[1]) {
        if (parseInt(SpawnCell.classList[0].substring(1)) > parseInt(EndCell.classList[0].substring(1))) {
            for (let index = parseInt(SpawnCell.classList[0].substring(1)) - parseInt(EndCell.classList[0].substring(1)); index >= 0; index--) {
                FindGreyCell = SpawnNumber - (ColNumber * index);
                if (GreyCellArray.indexOf(FindGreyCell) == -1) {
                    FalseWay = 1;
                }
            }
            if ((GreyCellArray.indexOf(FinalCell-ColNumber) >= 0 || parseInt(EndCell.classList[0].substring(1)) == 1) && FalseWay > 0) {
                //console.log('chemin fais en 1 coup vers la haut');
                window.location.reload();
            } else {
                new_game();
            }
        } else {
            for (let index = parseInt(EndCell.classList[0].substring(1)) - parseInt(SpawnCell.classList[0].substring(1)); index > 0; index--) {
                FindGreyCell = SpawnNumber + (ColNumber * index);
                if (GreyCellArray.indexOf(FindGreyCell) == -1) {
                    FalseWay = 1;
                }
            }
            if ((GreyCellArray.indexOf(FinalCell+ColNumber) >= 0 || parseInt(EndCell.classList[0].substring(1)) == RowNumber) && FalseWay > 0) {
                //console.log('chemin fais en 1 coup vers la bas');
                window.location.reload();
            } else {
                new_game(); 
            }
        }
    } else {
        new_game(); 
    }
}

function new_game() {
// regarde qu'elle block a coter du green cell est libre et sur la meme ligne/cologne
const GreenCell = document.getElementById('cell_'+FinalCell);
if (parseInt(GreenCell.classList[0].substring(1)) > 1) {
    ArrayProtectGreen.push(parseInt(FinalCell) - ColNumber);
}
if (parseInt(GreenCell.classList[0].substring(1)) < RowNumber) {
    ArrayProtectGreen.push(parseInt(FinalCell) + ColNumber);
}
if (parseInt(GreenCell.classList[1]) > 1) {
    ArrayProtectGreen.push(parseInt(FinalCell) - 1);
}
if (parseInt(GreenCell.classList[1]) < ColNumber) {
    ArrayProtectGreen.push(parseInt(FinalCell) + 1);
}
for (let index = 0; index < ArrayProtectGreen.length; index++) {
if (WayCellNumbers.indexOf(ArrayProtectGreen[index]) == -1 && GreyCellArray.indexOf(ArrayProtectGreen[index]) == -1 && SpawnNumber != ArrayProtectGreen[index] && ArrayProtectGreen[index] > 0 && ArrayProtectGreen[index] <= CellsNumbers) {
    GreyCellArray.push(ArrayProtectGreen[index]);
    }
}
ColorCell();
}
function ColorCell() {
    // corrige toute imperfection (si elle existe) en suppriment les nombre qui ne ferait pas partit des cells existant du tableau
    const CorrigeGreyCell = GreyCellArray.filter(x => x > 0 && x <= CellsNumbers);
    // supprime les doublons
    TrueGreyCell = [...new Set(CorrigeGreyCell)];

    const CorrigeWayCell = WayCellNumbers.filter(x => x > 0 && x <= CellsNumbers);
    TrueWayCell = [...new Set(CorrigeWayCell)];
    // detect combien de cells vide il existe puis divise ce nombre par 3 (WhiteCell servira à générer un nombre aléatoire de block gris en + (diviser par 3 pour ne pas sur charger l'ecran de block gris partous))
    const WhiteCell = Math.floor((CellsNumbers - (TrueWayCell.length + TrueGreyCell.length)) / 3);
    // definit le min de block gris en plus en fonction de l'espace disponible par rapport au cells vide
    const MinGreyCellMore = (Math.floor(WhiteCell / 2.5));
    let RandMoreGreyCell = Math.floor(Math.random() * (WhiteCell - MinGreyCellMore) + MinGreyCellMore);
    // boucle qui vas générer aleatoirement les positions des block gris en plus
    for (let index = 0; index <= RandMoreGreyCell; index++) {
        rgbc = Math.round(Math.random() * (CellsNumbers - 1) + 1);
        if (TrueWayCell.indexOf(rgbc) < 0 && TrueGreyCell.indexOf(rgbc) < 0 && FinalCell != rgbc && SpawnNumber != rgbc) {
            TrueGreyCell.push(rgbc);
        } else {
            RandMoreGreyCell += 1;
        }
    }
    for (let index = 0; index < TrueGreyCell.length; index++) {
        document.getElementById('cell_' + TrueGreyCell[index]).classList.add('BlockGrey');
    }
    document.getElementById('cell_' + FinalCell).style.cssText = "background-image: url(img/FinalCell.jpg); background-position: center center; background-size: 100% 100%; background-repeat: no-repeat;";
    EndCell = document.getElementById('cell_' + FinalCell);
}
// slider menu
var sliderCol = document.getElementById('sliderCol');
var selectorCol = document.getElementById('selectorCol');
var progressbar1 = document.getElementById('progressbar1');
// si on a choisit une valeur dans le menu
if (sessionStorage.getItem("ColNumbers")) {
    sliderCol.value = parseInt(sessionStorage.getItem("ColNumbers"));
} else {
    sliderCol.value = "14";
}
// place le slider Col en fonction des valeur selectionner lors du lancement de la page
selectorCol.style.left = (sliderCol.value-7)*2.7 + "%";
progressbar1.style.width = (sliderCol.value-6.5)*2.7 + "%";
RangeValCol.innerHTML = sliderCol.value;
if (((sliderCol.value-7)*2.857) < 33.33) {
    document.getElementById('progressbar1').style.backgroundColor = 'rgb(163, 211, 231)';
    document.querySelectorAll('.ValuSelcted')[0].style.setProperty("--color", "rgb(163, 211, 231)");
} else if (((sliderCol.value-7)*2.857) >= 33.33 && ((sliderCol.value-7)*2.857) <= 66.66) {
    document.getElementById('progressbar1').style.backgroundColor = 'rgb(247, 203, 58)';
    document.querySelectorAll('.ValuSelcted')[0].style.setProperty("--color", "rgb(247, 203, 58)");
} else {
    document.getElementById('progressbar1').style.backgroundColor = 'rgb(226, 65, 25)';
    document.querySelectorAll('.ValuSelcted')[0].style.setProperty("--color", "rgb(226, 65, 25)");
}
// place le slider Col en fonction des valeur selectionner lors d'un changement de valeur
sliderCol.oninput = function () {
    RangeValCol.innerHTML = this.value;
    selectorCol.style.left = (this.value-7)*2.7 + "%";
    progressbar1.style.width = (this.value-6.5)*2.7 + "%";
    if (((this.value-7)*2.857) < 33.33) {
        document.getElementById('progressbar1').style.backgroundColor = 'rgb(163, 211, 231)';
        document.querySelectorAll('.ValuSelcted')[0].style.setProperty("--color", "rgb(163, 211, 231)");
    } else if (((this.value-7)*2.857) >= 33.33 && ((this.value-7)*2.857) <= 66.66) {
        document.getElementById('progressbar1').style.backgroundColor = 'rgb(247, 203, 58)';
        document.querySelectorAll('.ValuSelcted')[0].style.setProperty("--color", "rgb(247, 203, 58)");
    } else {
        document.getElementById('progressbar1').style.backgroundColor = 'rgb(226, 65, 25)';
        document.querySelectorAll('.ValuSelcted')[0].style.setProperty("--color", "rgb(226, 65, 25)");
    }
}
//pareil pour le slider des lignes
var sliderRow = document.getElementById('sliderRow');
var selectorRow = document.getElementById('selectorRow');
var progressbar2 = document.getElementById('progressbar2');
if (sessionStorage.getItem("RowNumbers")) {
    sliderRow.value = parseInt(sessionStorage.getItem("RowNumbers"));
} else {
    sliderRow.value = "7";
}
selectorRow.style.left = (sliderRow.value-5)*3.78 + "%";
progressbar2.style.width = (sliderRow.value-4.5)*3.78 + "%";
RangeValRow.innerHTML = sliderRow.value;
if (((sliderRow.value-5)*4) < 33.33) {
    document.getElementById('progressbar2').style.backgroundColor = 'rgb(163, 211, 231)';
    document.querySelectorAll('.ValuSelcted')[1].style.setProperty("--color", "rgb(163, 211, 231)");
} else if (((sliderRow.value-5)*4) >= 33.33 && ((sliderRow.value-5)*4) <= 66.66) {
    document.getElementById('progressbar2').style.backgroundColor = 'rgb(247, 203, 58)';
    document.querySelectorAll('.ValuSelcted')[1].style.setProperty("--color", "rgb(247, 203, 58)");
} else {
    document.getElementById('progressbar2').style.backgroundColor = 'rgb(226, 65, 25)';
    document.querySelectorAll('.ValuSelcted')[1].style.setProperty("--color", "rgb(226, 65, 25)");
}

sliderRow.oninput = function () {
    RangeValRow.innerHTML = this.value;
    selectorRow.style.left = (this.value-5)*3.78 + "%";
    progressbar2.style.width = (this.value-4.5)*3.78 + "%";
    if (((this.value-5)*4) < 33.33) {
        document.getElementById('progressbar2').style.backgroundColor = 'rgb(163, 211, 231)';
        document.querySelectorAll('.ValuSelcted')[1].style.setProperty("--color", "rgb(163, 211, 231)");
    } else if (((this.value-5)*4) >= 33.33 && ((this.value-5)*4) <= 66.66) {
        document.getElementById('progressbar2').style.backgroundColor = 'rgb(247, 203, 58)';
        document.querySelectorAll('.ValuSelcted')[1].style.setProperty("--color", "rgb(247, 203, 58)");
    } else {
        document.getElementById('progressbar2').style.backgroundColor = 'rgb(226, 65, 25)';
        document.querySelectorAll('.ValuSelcted')[1].style.setProperty("--color", "rgb(226, 65, 25)");
    }
}
// dunction respawn pour remettre le cube rouge au debut
function respawn() {
    document.getElementById('square').style.cssText = "background-image: url(img/BGMainCell.jpg);  background-position: center center; background-size: 100% 100%; background-repeat: no-repeat; transition: 0.3s; position: absolute; width: " + (SizeSquare.offsetWidth - (WidthWeight*1.8)) + "px; height: " + (SizeSquare.offsetHeight - (WidthWeight*1.8)) + "px; top: " + (SpawnCell.offsetTop + WidthWeight) + "px; left: " + (SpawnCell.offsetLeft + WidthWeight) + "px;";
    PositionBox = SpawnNumber;
    boxTopPos = StartBoxTopPos;
    boxLeftPos = StartBoxLeftPos;
}
// pour lancer un nv niveau avec les nouvelle valeurs de col et row
function restart() {
    sessionStorage.setItem("ColNumbers", sliderCol.value);
    sessionStorage.setItem("RowNumbers", sliderRow.value);
    window.location.reload();
}
// Replace et redimansionne le cube si changement de taille d'ecran
window.addEventListener('resize', () =>{
    WidthWeight = document.getElementById('WidthMesure').offsetWidth;
    resize = document.getElementById('cell_'+PositionBox);
    document.getElementById('square').style.cssText = "background-image: url(img/BGMainCell.jpg); background-position: center center; background-size: 100% 100%; background-repeat: no-repeat; transition: 0.3s; position: absolute; width: " + (SizeSquare.offsetWidth - (WidthWeight*1.8)) + "px; height: " + (SizeSquare.offsetHeight - (WidthWeight*1.8)) + "px; top: " + (resize.offsetTop + WidthWeight) + "px; left: " + (resize.offsetLeft + WidthWeight) + "px;";
  });
// evite lorsque l'on reste appuiyer que ca spam
window.addEventListener('keyup', (e) => {
    if (e.key == " " && StopKeySpace == 1) {
        StopKeySpace = 0;
        // lorsque l'on arrete d'appuiyer sur espace cache le chemin
        for (let index = 0; index < TrueWayCell.length; index++) {
            document.getElementById('cell_' + TrueWayCell[index]).style.backgroundColor = "transparent";
        }
    }
    if (e.key == "r" || e.key == "R") {
        StopKeyr = 0;
    }
    if (e.key == "Escape" && StopKeyEscape == 1) {
        StopKeyEscape = 0;
    }
    if ((e.key == "ArrowLeft" || e.key == "ArrowRight" || e.key == "ArrowUp" || e.key == "ArrowDown") && StopKeyArrow == 1) {
        StopKeyArrow = 0;
    }
});
// detect sur qu'elle touche on appuit
window.addEventListener('keydown', function(e) {
    if (e.key == "r" || e.key == "R") {
        StopKeyr = 1;
        respawn();
    }
    if (e.code == "Space" && StopKeySpace == 0) {
        StopKeySpace = 1;
        // lorsque l'on appuit sur l'espace montre le chemin
       for (let index = 0; index < TrueWayCell.length; index++) {
           document.getElementById('cell_' + TrueWayCell[index]).style.backgroundColor = "orange";
       }
    }
    if (e.key == "Escape" && StopKeyEscape == 0) {
        StopKeyEscape = 1;
        document.body.classList.toggle("menu");
        if (document.body.classList == ("menu")) {
            action = 1;
        } else {
            action = 0;
        }
    }
    if ((e.key == "ArrowLeft" || e.key == "ArrowRight" || e.key == "ArrowUp" || e.key == "ArrowDown") && StopKeyArrow == 0) {
        StopKeyArrow = 1;
        // Action est pour bloquer l'addEventListener, il ce debloque une fois que le carrer rouge a finit de ce deplacer
        if (action < 1) {   
        // rénitialisation des var pour ne pas bloquer
        StopMoove = true;
        StopBlock = null;
        StopWay = null;
        // Déclanchement de la fonction suivant sur qu'elle fleche on appuit
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
            } 
        }    
    }      
});

// Fonction pour deplacer le carré rouge et l'arreter au cube gris (Shema répétitife pour les 4 dirrections avec valeur qui change)
function MooveTop() {
    //determine le nombre de cell entre le bord de l'ecran et le cube rouge
    let CellAvailable = (parseInt(document.getElementById('cell_' + PositionBox).classList[0].substring(1)) -1);
    //For qui ce répéte suivant le nombre de cellule disponible entre le carré rouge et le bord de l'ecran dans la direction shouaiter
    for (let index = CellAvailable; index > 0; index--) {
       // YPrestop prend la valleur de l'id de toute les cell une a une disponible entre le cube rouge et le bord de l'ecran dans la direction shouaiter
        YPrestop = PositionBox - (ColNumber * index);
        // test si c'est cellule sont des block gris (block stop)
       if (document.getElementById('cell_'+ YPrestop).classList[2] == 'BlockGrey') {
           // prendra l'id de la cellule block gris le plus proche du carré rouge dans la direction shouaiter
          StopBlock = document.getElementById('cell_'+ YPrestop);
          // prendra des coordonner du bord voulu du block gris (coordonner qui diffinissent la ou le block rouge doit s'arreter)   
          StopWay = StopBlock.offsetTop + (StopBlock.offsetHeight + WidthWeight);
        }
    }
    // teste avant de bouger le cube si celui ci est deja coller à un block gris ou au bord de l'ecran (dans la direction shouaiter) (if expliquer plus bas dans la boucle while)
    if ((boxTopPos <= StopWay && StopWay != null) || boxTopPos - WidthWeight <= 0) {
        // si StopMoove = false alors la boucle while (servant a bouger le cube rouge) ne s'activeraa pas
        StopMoove = false;
    } else {
        // s'active que si le cube rouge a de la place pour bouger dans la direction shouaiter, alors action = 1 pour blocker l'addeventListenner
        action = 1;
    }
    // boucle servant à déplacer le cube jusqu'à que ce dernier touche le bord de l'écran ou un block gris
        while (StopMoove) {
            // boxTopPos sert à déplacer le cube rouge de 1px
            boxTopPos --;
        document.getElementById('square').style.top = (boxTopPos)+"px";
        // if (le bord top de cube rouge <= bord bottom du cube gris && bord bottom du cube gris existe) || le bord top de cube rouge -3px <= au bord top de l'ecran (-3px pour que le cube rouge s'arrete devant la dérniére ligne noir tous en haut de l'écran)
        if ((boxTopPos <= StopWay && StopWay != null) || boxTopPos - WidthWeight <= 0) {
            StopMoove = false;
            // besoin d'effectuer un petit timer avant de débloquer l'addEventListenner (sinon bug)
            setTimeout(() => {
                var round = 0;
                for (let index = CellAvailable; index > 0; index--){
                    round++;
                    if((BoxElement.offsetTop + (SizeSquare.offsetHeight / 4)) > document.getElementById('row_'+index).offsetTop && (BoxElement.offsetTop - (SizeSquare.offsetHeight / 4)) < document.getElementById('row_'+index).offsetTop) {
                        PositionBox = PositionBox - (round*ColNumber);
                    }
                }
                action = 0;
                // test pour savoir si on est sur le green cell
                EndPlace = document.getElementById('cell_'+PositionBox);
                if (parseInt(EndPlace.classList[1]) == parseInt(EndCell.classList[1]) && parseInt(EndCell.classList[0].substring(1)) == parseInt(EndPlace.classList[0].substring(1))) {
                    Finished_Level();
                }
            }, 300);
        }
    }   
}

function MooveBottom() {
    let multiple = RowNumber - (parseInt(document.getElementById('cell_' + PositionBox).classList[0].substring(1)));
    for (let index = RowNumber ; index > (parseInt(document.getElementById('cell_' + PositionBox).classList[0].substring(1))); index--) {
        // multiple represente le nombre de cell entre le bord et le cube rouge (on le multiplie par le nombre de cells dans une ligne pour passer directement à la cell de la ligne juste en dessous)
        YPrestop = PositionBox + (ColNumber * multiple);
        if (document.getElementById('cell_'+ YPrestop).classList[2] == 'BlockGrey') {
            StopBlock = document.getElementById('cell_'+ YPrestop);
            StopWay = (StopBlock.offsetTop);
        }
        multiple--;
    }    
        if ((boxTopPos >= (StopWay - (SizeSquare.offsetHeight - WidthWeight))  && StopWay != null) || boxTopPos + BoxElement.offsetHeight +WidthWeight >= document.body.offsetHeight) {
            StopMoove = false;
        } else {
            action = 1;
        }
    while (StopMoove) {
        boxTopPos += 1;
        document.getElementById('square').style.top = (boxTopPos)+"px";
        if ((boxTopPos >= (StopWay - (SizeSquare.offsetHeight - WidthWeight))  && StopWay != null) || boxTopPos + BoxElement.offsetHeight +WidthWeight >= document.body.offsetHeight) {
            StopMoove = false;
            setTimeout(() => {
                multiple = -1;
                for (let index = (parseInt(document.getElementById('cell_' + PositionBox).classList[0].substring(1))); index <= RowNumber; index++){
                    multiple++;
                    if((BoxElement.offsetTop + (SizeSquare.offsetHeight / 4)) > document.getElementById('row_'+index).offsetTop && (BoxElement.offsetTop - (SizeSquare.offsetHeight / 4)) < document.getElementById('row_'+index).offsetTop) {
                        // pas index mais un compte tour
                        PositionBox = PositionBox + (multiple*ColNumber);
                    }
                }
                action = 0;
                EndPlace = document.getElementById('cell_'+PositionBox);
                if (parseInt(EndPlace.classList[1]) == parseInt(EndCell.classList[1]) && parseInt(EndCell.classList[0].substring(1)) == parseInt(EndPlace.classList[0].substring(1))) {
                    Finished_Level();
                }
            }, 300);
        }
    }
}

function MooveRight() {
    let multiples = ColNumber - (parseInt(document.getElementById('cell_' + PositionBox).classList[1]));
    for (let index = ColNumber; index > (parseInt(document.getElementById('cell_' + PositionBox).classList[1])); index--) {
        XPrestop = PositionBox + multiples
        if (document.getElementById('cell_'+ XPrestop).classList[2] == 'BlockGrey') {
            StopBlock = document.getElementById('cell_'+ XPrestop);
            StopWay = (StopBlock.offsetLeft);
        }
        multiples--;
    } 
    if (boxLeftPos + BoxElement.offsetWidth + WidthWeight >= document.body.offsetWidth || (boxLeftPos >= (StopWay - (SizeSquare.offsetWidth - WidthWeight)) && StopWay != null )) {
        StopMoove = false;
    } else {
        action = 1;
    }
    while (StopMoove) {
        boxLeftPos += 1;
        document.getElementById('square').style.left = (boxLeftPos)+"px";
        if (boxLeftPos + BoxElement.offsetWidth + WidthWeight >= document.body.offsetWidth || (boxLeftPos >= (StopWay - (SizeSquare.offsetWidth - WidthWeight)) && StopWay != null )) {
            StopMoove = false;
            setTimeout(() => {
                let newPositionBox = 0;
                for (let index = (parseInt(document.getElementById('cell_' + PositionBox).classList[1])); index <= ColNumber; index++) {
                    if((BoxElement.offsetLeft + (SizeSquare.offsetWidth / 4)) > document.getElementById('cell_'+index).offsetLeft && (BoxElement.offsetLeft - (SizeSquare.offsetWidth / 4)) < document.getElementById('cell_'+index).offsetLeft) {
                        PositionBox += newPositionBox;
                    }
                    newPositionBox++;
                }
                action = 0;
                EndPlace = document.getElementById('cell_'+PositionBox);
                if (parseInt(EndPlace.classList[1]) == parseInt(EndCell.classList[1]) && parseInt(EndCell.classList[0].substring(1)) == parseInt(EndPlace.classList[0].substring(1))) {
                    Finished_Level();
                }
            }, 300);
        }
    }
}

function MooveLeft() {
    let CellAvailable = (parseInt(document.getElementById('cell_' + PositionBox).classList[1]) -1);
    for (let index =  CellAvailable; index > 0; index--) {
    XPrestop = (PositionBox - index);
    if (document.getElementById('cell_'+ XPrestop).classList[2] == 'BlockGrey') {
        StopBlock = document.getElementById('cell_'+ XPrestop);   
        StopWay = StopBlock.offsetLeft + (StopBlock.offsetWidth + WidthWeight);
    }
    }
    if ((boxLeftPos <= StopWay && StopWay != null) || boxLeftPos - WidthWeight <= 0) {
        StopMoove = false;
    } else {
        action = 1;
    }
    while (StopMoove) {
    boxLeftPos -= 1;
    document.getElementById('square').style.left = (boxLeftPos)+"px";
    if ((boxLeftPos <= StopWay && StopWay != null) || boxLeftPos - WidthWeight <= 0){
        StopMoove = false;
        setTimeout(() => {
            var round = 0;
            for (let index = CellAvailable; index > 0; index--){
                round++;
                if((BoxElement.offsetLeft + (SizeSquare.offsetWidth / 4)) > document.getElementById('cell_'+index).offsetLeft && (BoxElement.offsetLeft - (SizeSquare.offsetWidth / 4)) < document.getElementById('cell_'+index).offsetLeft) {
                    PositionBox -= round;
                }
            }
            action = 0;
            EndPlace = document.getElementById('cell_'+PositionBox);
            if (parseInt(EndPlace.classList[1]) == parseInt(EndCell.classList[1]) && parseInt(EndCell.classList[0].substring(1)) == parseInt(EndPlace.classList[0].substring(1))) {
                Finished_Level();
            }
        }, 300);
        }
    }
}
function Finished_Level() {
    var TimeReapeat = 1;
    var TimerDelete = Math.floor(1300 / TrueGreyCell.length);
    document.getElementById('endscreen').classList.add("BlackHole");
    setTimeout(() => {
        window.location.reload();
    }, 1600)
        var interval = setInterval(function() { 
            if (TimeReapeat <= TrueGreyCell.length) {
                RandNumbers = Math.floor(Math.random()*TrueGreyCell.length);
                RandDelete = TrueGreyCell[RandNumbers];
                //document.getElementById('cell_'+RandDelete).style.background = "none"; 
                document.getElementById('cell_'+RandDelete).classList.add("Vanished");
                TrueGreyCell = TrueGreyCell.filter(item => item !== RandDelete);
            }
            else { 
               clearInterval(interval);
            }
         }, TimerDelete);
}

setTimeout(() => {
    Verify_Way();
}, 100);

/* Shéma Logique du systéme
/**
 * Prend une case aleatoire comme depart
 * cree chiffre aleatoire pour connaitre nombre de chemin
 * choisit une direction aleatoire parmis les 4 (sud - nort - est -west) ! ne pas avoir de bord direct
 * Verifier que le chemin aleatoire ne passe pas sur un cube gris
 * choisir une nouvelle direction aleatoire jusqu'a (nouvelle direction = nombre aleatoire de chemin)
 * mettre l'arriver à la fin du chemin
 * enregistrer chemin parcourut
 * generer aléatoirement block en-dehors du chemin (pour ne pas gener)
 */

/*
/**
 * ? doit verifier:
 * si il y a de la place entre le bord et le chemin
 * Que le nombre aléatoire de distance soit entre le bord et le chemin
 * Que le chemin ne ce terminne par sur un chemin deja existante ou sur le spawn
 * Que un block gris ne bloque pas un chemin deja existant ou sur le spawn
 * Que le chemin ne se repete pas et qu'il n'aille pas dans la direction opposer juste apres avoir fait un chemin
 * que le chemin ne traverse pas un block gris
 * qu'il cree un block gris a la fin du chemin
 * SI fonction trop repetitive recreer tous (mettre creation tableau dans une fonction)
 */
