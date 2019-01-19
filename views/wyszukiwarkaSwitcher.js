function switchOptions(id){
    document.getElementById('osoby').setAttribute("hidden", "1");
    document.getElementById('osoby').setAttribute("name", "nope");
    document.getElementById('wydzialy').setAttribute("hidden", "1");
    document.getElementById('wydzialy').setAttribute("name", "nope");
    document.getElementById('kierunki').setAttribute("hidden", "1");
    document.getElementById('kierunki').setAttribute("name", "nope");
    document.getElementById('przedmioty').setAttribute("hidden", "1");
    document.getElementById('przedmioty').setAttribute("name", "nope");
    if(id.selectedIndex==0){
        document.getElementById('osoby').removeAttribute("hidden");
        document.getElementById('osoby').setAttribute("name", "param");
    }
    if(id.selectedIndex==1){
        document.getElementById('wydzialy').removeAttribute("hidden");
        document.getElementById('wydzialy').setAttribute("name", "param");
    }
    if(id.selectedIndex==2){
        document.getElementById('kierunki').removeAttribute("hidden");
        document.getElementById('kierunki').setAttribute("name", "param");
    }
    if(id.selectedIndex==3){
        document.getElementById('przedmioty').removeAttribute("hidden");
        document.getElementById('przedmioty').setAttribute("name", "param");
    }
};