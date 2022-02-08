<!DOCTYPE html>
<html lang="en" style="width: 100%; height: 100%;">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body style="background-image: url(https://silviahartmann.com/background-tile-art/images/grey-repeating-background-5.jpg);">

<?php
extract($_POST,EXTR_OVERWRITE);
// if start (si !start = page des choix de couleur sinon affiche page pour replacer les couleurs)
if(isset($start)){
// var pour programmer le html 2: page replacer les couleur en echo
$color = array($color_0, $color_1, $color_2, $color_3, $color_4, $color_5, $color_6, $color_7, $color_8);
$fonc = array("a", "b", "c", "d", "e", "f", "g", "h", "i");
$Nb_lignes = 3;
// echo pour sauvegarder les donner et ouvrir le contenu de la page html 2: replacer les couleur
echo ('        
            <div style ="width: 100%; height: auto; margin-top: 0.3vw;">
            <h1 style="text-align: center; text-shadow: 0.2vw 0.2vw 0.5vw #050505;">Replacer vos couleurs</h1></div>
            <div style="width: 100%; display: flex; justify-content: center;">
            <div style="width: 50%; display: flex;">
            <form action="index.php" method="post" style="width: 100%; height: 100%;">
            <input type="hidden" name="color_0" value="'.$color_0.'">
            <input type="hidden" name="color_1" value="'.$color_1.'">
            <input type="hidden" name="color_2" value="'.$color_2.'">
            <input type="hidden" name="color_3" value="'.$color_3.'">
            <input type="hidden" name="color_4" value="'.$color_4.'">
            <input type="hidden" name="color_5" value="'.$color_5.'">
            <input type="hidden" name="color_6" value="'.$color_6.'">
            <input type="hidden" name="color_7" value="'.$color_7.'">
            <input type="hidden" name="color_8" value="'.$color_8.'">
            <input type="hidden" name="start" value="'.$start.'">
            <input type="hidden" name="Nb_Square" value="'.$Nb_Square.'">
            <div style="width: 100%; height: 11vw; display: flex; padding: 2vw 0 2vw 0; flex-direction: row; justify-content: space-around;">');
// boucle pour echo le corp du contenu de la page html 2: replacer les couleur
//$Nb_Square = nombre de carrée a retenir dans le jeux
for ($ii=0; $ii < $Nb_Square; $ii++) {
// $Nb_ligne = permet de mettre uniquement 3 carrés par rangés avant de passer a la suivante
$Nb_lignes--;
// certain element de la boucle doivent commencer a 1 au lieu de 0
$y= $ii + 1;
// echo de la creation du DOM de l'html 2: page replacer les couleur
echo('
<div id="square_'.$ii.'" class="square" style="width: 11.5vw; height:100%; border: 0.1vw solid black; background-color: lightgray; position: relative; box-shadow: 0.3vw 0.3vw 0.5vw #1a1717; display: flex; justify-content: center; align-items: center;" onmouseover="document.getElementById(\'answer_'.$y.'\').style.display = \'inline-block\';" onmouseout="document.getElementById(\'answer_'.$y.'\').style.display = \'none\';">
    <select name="answer_'.$y.'" id="answer_'.$y.'" style="height: 1.2vw; font-size: 0.8vw; display: none" onchange="select_'.$fonc[$ii].'()" required>
        <option value="lightgray" selected>white</option>
        <option value="red">red</option>
        <option value="violet">pink</option>
        <option value="orange">orange</option>
        <option value="blue">blue</option>
        <option value="green">green</option>
        <option value="purple">violet</option>
        <option value="black">black</option>
    </select>
</div>
');
// echo pour la partit js (fonction) du corp du contenu de la page html 2: replacer les couleur
echo '
<script>
 function select_'.$fonc[$ii].'() {
    var asw_'.$fonc[$ii].' = document.getElementById(\'answer_'.$y.'\').value;
    document.getElementById(\'square_'.$ii.'\').animate({ backgroundColor: asw_'.$fonc[$ii].'}, 500, setTimeout(bgchange'.$fonc[$ii].', 499));}
        function bgchange'.$fonc[$ii].'() {
            var asw_a'.$fonc[$ii].' = document.getElementById(\'answer_'.$y.'\').value;
            document.getElementById(\'square_'.$ii.'\').style.backgroundColor = asw_a'.$fonc[$ii].';}
</script>';
// defenit quand 3 carré sont dans la meme ligne passe a la suivante
if ($Nb_lignes == 0 && $ii < $Nb_Square - 1) {
    echo('
    </div>
    <div style="width: 100%; height: 11vw; display: flex; padding: 2vw 0 2vw 0; flex-direction: row; justify-content: space-around;">
    ');
    $Nb_lignes = 3;}
// ferme le corp du contenu de la page html 2: replacer les couleur
if ($ii == $Nb_Square - 1) {
    echo('
</div>                                 
<div style="position: relative; margin-top: 1vw; width: 100%; display: flex; justify-content: center;">
<input type="submit" name="send" value="Verifier" style="font-size: 1.8vw;">
</div>
</form>
</div>
</div>
</body>
</html>
'); 
}
}
// if pour verifier le resultat de nos choix si il correspondent avec ceux précedament selectionner
if(isset($send)){ 
// recupere tous les réponses mise dans la page html replacer vos couleurs
$answer = array($answer_1, $answer_2, $answer_3, $answer_4, $answer_5, $answer_6, $answer_7, $answer_8, $answer_9);
// Boucle pour tester 1 a 1 si on a mis les bonne réponse
for ($i=0; $i < $Nb_Square; $i++) {
    $yy = $i + 1;
    if ($color[$i] == $answer[$i]) {
        // si bonne reponse
        echo "<script>document.getElementById(\"square_$i\").style.cssText += \"box-shadow: 0.15vw 0.15vw 0.15vw green; border: solid 0.15vw green; background-color: $color[$i];\";
        document.getElementById(\"answer_$yy\").value = \"$color[$i]\";</script>";
        
    } else {
        // si mauvaise reponse
        echo "<script>document.getElementById(\"square_$i\").style.cssText += \"box-shadow: 0.3vw 0.3vw 0.5vw red; border: solid 0.1vw red;\";</script>";}
    }
}
}
// ---------------------------------------------------------------------------------------------------------------------- //
//definit la page html 1: choisisez vos couleurs
else {
// incrementation des var nous permetant de crée le contenut html avec les bon id, value etc de la page 1: choisisez vos couleurs
$IX_Color = array("lightgray", "red", "violet", "orange", "blue", "green", "purple", "black");
$XX_Letter = array("a", "b", "c", "d", "e", "f", "g", "h");
$Color_lenght = (count($IX_Color));
$Letterr_lenght = (count($XX_Letter));
$Nb_Square = 9;
$Nb_ligne = 3;
// style css qui ne peut pas etre mit directement dans les balises html de la page 1: choisisez vos couleurs
echo ('<style type="text/css">.led{display: none;}
            .couleur:hover > .led{display: inline-block;}
            .led:hover{border: dotted grey;}
            input[type="radio"]:checked + label {border: dashed grey;} 
            label.a{ position: absolute; top: 0%; left: 0%; background-color: lightgray; color: lightgray;}
            label.b{ position: absolute; top: 0%; left: 35%; background-color: red; color: red;}
            label.c{ position: absolute; top: 0%; right: 0%; background-color: violet; color: violet;}
            label.d{ position: absolute; top: 35%; right: 0%; background-color: orange; color: orange;}
            label.e{ position: absolute; bottom: 0%; right: 0%; background-color: blue; color: blue;}
            label.f{ position: absolute; bottom: 0%; left: 35%; background-color: green; color: green;}
            label.g{ position: absolute; bottom: 0%; left: 0%; background-color: purple; color: purple;}
            label.h{ position: absolute; top: 35%; left: 0%; background-color: black; color: black;}
        </style>');
// echo de la creation du debut DOM de l'html 1: choisisez vos couleurs
echo ('     
            <div style ="width: 100%; height: auto; margin-top: 0.3vw;">
            <h1 style="text-align: center; text-shadow: 0.2vw 0.2vw 0.5vw #050505;">Choisisez vos couleurs</h1></div>
            <div style="width: 100%; display: flex; justify-content: center;">
            <div style="width: 50%; display: flex;">
            <form action="index.php" method="post" style="width: 100%; height: 100%;">
            <div style="width: 100%; height: 11vw; display: flex; padding: 2vw 0 2vw 0; flex-direction: row; justify-content: space-around;">
            ');
// boucle de la creation du corp du DOM de l'html 1: choisisez vos couleurs
    for ($ix=0; $ix < $Nb_Square ; $ix++) {
        $Nb_ligne--;
    echo ('
    <div class="couleur" id="ColorSq'.$ix.'" onmouseover="x = '.$ix.'" style="width: 11.5vw; height:100%; position: relative; box-shadow: 0.3vw 0.3vw 0.5vw #1d0101; background-color: lightgrey;">
    <input type="radio" name="color_'.$ix.'" id="'.$IX_Color[0].'_'.$ix.'" class="choice" value="'.$IX_Color[0].'" style="opacity: 0; width: 0; height: 0; font-size: 1px;" checked>
    <label style="padding: 1vw 1.6vw; font-size: 1vw; text-indent: -9999px;" for="'.$IX_Color[0].'_'.$ix.'" class="led '.$XX_Letter[0].'" onclick="bgcolor(\''.$IX_Color[0].'\')">.</label></input>
    ');

         for ($xx=1; $xx < $Color_lenght; $xx++) {                       
            echo ('
            <input style="opacity: 0; width: 0; height: 0; font-size: 1px;" type="radio" name="color_'.$ix.'" id="'.$IX_Color[$xx].'_'.$ix.'" class="choice" value="'.$IX_Color[$xx].'">
            <label style="padding: 1vw 1.6vw; font-size: 1vw; text-indent: -9999px;" for="'.$IX_Color[$xx].'_'.$ix.'" class="led '.$XX_Letter[$xx].'" onclick="bgcolor(\''.$IX_Color[$xx].'\')">.</label></input>
            ');}
    echo ('</div>');
        // +3 carrés = retour a la ligne
        if ($Nb_ligne == 0 && $ix < $Nb_Square - 1) {
            echo ('  
             </div>
             <div style="width: 100%; height: 11vw; display: flex; padding: 2vw 0 2vw 0; flex-direction: row; justify-content: space-around;">
            ');
            $Nb_ligne = 3;} 
        // Fin de la creation du corp du DOM de l'html 1: choisisez vos couleurs
        if ($ix == $Nb_Square - 1) {
            echo('
        </div>                                 
        <div style="position: relative; margin-top: 1vw; width: 100%; display: flex; justify-content: center;">
        <input type="submit" name="start" value="Lancer" style="font-size: 1.8vw;">
        <input type="button" value="?" onclick="aleat()"style="position: absolute; left: 59%; height: 100%; width: 2.5vw; font-size: 1.4vw; text-align: center;">
        '); 
        }
    }
    // echo pour la partit js servant a moddifier la couleur des BG des carrés lors du choix des couleurs + la fonction aleatoire de l'html 1: choisisez vos couleurs
    echo "<script>function bgcolor(id){
        if (x == 0) {document.getElementById(\"ColorSq0\").animate({ backgroundColor: id}, 500, setTimeout(bgchange0, 499));          
        function bgchange0() {document.getElementById(\"ColorSq0\").style.backgroundColor = id;}}
        if (x == 1) {document.getElementById(\"ColorSq1\").animate({ backgroundColor: id}, 500, setTimeout(bgchange1, 499));          
        function bgchange1() {document.getElementById(\"ColorSq1\").style.backgroundColor = id;}}
        if (x == 2) {document.getElementById(\"ColorSq2\").animate({ backgroundColor: id}, 500, setTimeout(bgchange2, 499));          
        function bgchange2() {document.getElementById(\"ColorSq2\").style.backgroundColor = id;}}
        if (x == 3) {document.getElementById(\"ColorSq3\").animate({ backgroundColor: id}, 500, setTimeout(bgchange3, 499));          
        function bgchange3() {document.getElementById(\"ColorSq3\").style.backgroundColor = id;}}
        if (x == 4) {document.getElementById(\"ColorSq4\").animate({ backgroundColor: id}, 500, setTimeout(bgchange4, 499));          
        function bgchange4() {document.getElementById(\"ColorSq4\").style.backgroundColor = id;}}
        if (x == 5) {document.getElementById(\"ColorSq5\").animate({ backgroundColor: id}, 500, setTimeout(bgchange5, 499));          
        function bgchange5() {document.getElementById(\"ColorSq5\").style.backgroundColor = id;}}
        if (x == 6) {document.getElementById(\"ColorSq6\").animate({ backgroundColor: id}, 500, setTimeout(bgchange6, 499));          
        function bgchange6() {document.getElementById(\"ColorSq6\").style.backgroundColor = id;}}
        if (x == 7) {document.getElementById(\"ColorSq7\").animate({ backgroundColor: id}, 500, setTimeout(bgchange7, 499));          
        function bgchange7() {document.getElementById(\"ColorSq7\").style.backgroundColor = id;}}
        if (x == 8) {document.getElementById(\"ColorSq8\").animate({ backgroundColor: id}, 500, setTimeout(bgchange8, 499));          
        function bgchange8() {document.getElementById(\"ColorSq8\").style.backgroundColor = id;}}}

        var table = ['lightgray', 'red', 'violet', 'orange', 'blue', 'green', 'purple', 'black'];
        var selected = ['ColorSq8', 'ColorSq7', 'ColorSq6', 'ColorSq5', 'ColorSq4', 'ColorSq3', 'ColorSq2', 'ColorSq1', 'ColorSq0'];
        var checked = ['8', '7', '6', '5', '4', '3', '2', '1', '0'];
        let nIntervId;
        let nIntervId2;
        let RandomeValeur = [];

        function aleat(){
            clearInterval(nIntervId); 
            clearInterval(nIntervId2);
            nIntervId = null; 
            nIntervId2 = null;
            y = table.length;
            if (!nIntervId && !nIntervId2){
            nIntervId2 = setInterval(randomeValue, 549);
            nIntervId = setInterval(TimeRand, 550);
            }     
        }
        
        function TimeRand(){
            SquarRandColor = randomeValue(table.length);      
            document.getElementById(selected[y]).animate({ backgroundColor: SquarRandColor}, 450, setTimeout(bgRchange, 449));         
        } 
        
        function bgRchange(){
            document.getElementById(selected[y]).style.backgroundColor = SquarRandColor;
            document.getElementById(SquarRandColor + '_' + checked[y]).checked = true;
            y--;
            if ( y == -1 ) {clearInterval(nIntervId); clearInterval(nIntervId2); nIntervId = null; nIntervId2 = null;}
        } 
        
        function randomeValue(){
            var rand = ~~(Math.random()*table.length);
            return table[rand];  
        }
        </script>";
}
?>
</div>
</form>
</div>
</div>
</body>
</html>
