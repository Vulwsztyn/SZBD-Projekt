function switchOptions(id){
    if(id.selectedIndex==0){
        document.getElementById('mod1').innerHTML="Strona grupy";
        document.getElementById('mod2').innerHTML="Grupa ID";
    }else{
        document.getElementById('mod1').innerHTML="Stopień";
        document.getElementById('mod2').innerHTML="Id Zespołu";
    }
};