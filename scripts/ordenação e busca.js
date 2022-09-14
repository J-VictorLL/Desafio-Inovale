//lista
var vetor = [];
var vetorAnteiror = [];

if (typeof(Storage) !== "undefined") {
    var vetorsalvo = sessionStorage.getItem("vetor");
    if(!vetorsalvo){
        sessionStorage.setItem("vetor", vetor);
    }else{
        vetorAnteiror=vetorsalvo.split(',');
        //vetor=vetorsalvo.split(',');
    }
}

//variaveis e constantes
const form = document.getElementById('form');
const encontrado = document.getElementById('encontrado');
const numero = document.getElementById('numero_adicional');
const numero_buscado = document.getElementById('numero_buscado');
const posicao = document.getElementById('posicao');
const posicao_A = document.getElementById('posicao_A');
const posicao_B = document.getElementById('posicao_B');
const posicao_C = document.getElementById('posicao_C');
const localizacao = document.getElementById('localizacao');

const lista_atual = document.getElementsByClassName('lista_atual')[0];
const lista_ordenada = document.getElementsByClassName('lista_ordenada')[0]
const mostrar = document.getElementsByClassName('mostrar')[0]
;
const apagar = document.getElementsByClassName('apagar')[0];
const buscar = document.getElementsByClassName('buscar')[0];
const ordenar = document.getElementById('ordenar');
const chek = document.getElementById("toogle");
const adicionar = document.getElementById("submit");

//funções
function quickSort(vetor, LI, LS) {
    let pivo = LI;
    for(i=LI+1;i<=LS;i+=1){
        let j = i;
        if(parseInt(vetor[j])<parseInt(vetor[pivo])){
            let aux = vetor[j];
            while(j>pivo){
                vetor[j]=vetor[j-1];
                j-=1;
            }
            vetor[j] = aux;
            pivo+=1;
        }
    }
    if(pivo-1>=LI){
        quickSort(vetor, LI, pivo-1)
    }
    if(pivo+1<=LS){
        quickSort(vetor, pivo+1, LS);
    }
}

function buscaBinaria(vetor, buscado) {
    let LI = 0;
    let LS = vetor.length;
    while(LI<=LS){
        let meio = parseInt((LI+LS)/2);
        if(parseInt(vetor[meio])==parseInt(buscado)){
            return meio;
        }else{
            if(parseInt(vetor[meio])<parseInt(buscado)){
                LI = meio+1;
            }else{
                LS = meio-1;
            }
        }
    }
    return -1;
}

form.addEventListener('submit', function(e) {
    if(numero.value) vetor.push(numero.value);
    numero.value = null;
    e.preventDefault();
    lista_atual.innerText="["+vetor+"]";
    sessionStorage.setItem("vetor", vetor);
});

apagar.addEventListener('click', function(){
    sessionStorage.removeItem("vetor");
    vetor=[];
    lista_atual.innerText="["+vetor+"]";
})

if(ordenar){
    ordenar.addEventListener('click', function(){
        quickSort(vetor, 0, vetor.length);
        while(lista_ordenada.classList.contains('fade')) lista_ordenada.classList.remove('fade');
        lista_ordenada.innerText="["+vetor+"]";
        lista_ordenada.classList.add('fade');
        setTimeout(() => {
            lista_ordenada.classList.remove('fade');
         }, 3000)
    })
}

if(chek){
    chek.addEventListener('click', function(){
        if(chek.checked){
            vetor = vetorAnteiror;
        }else{
            vetor = [];
        }
        lista_atual.innerText="["+vetor+"]";
    })
}

if(buscar){
    let hr = document.createElement('hr');
    posicao.appendChild(hr);
    
    buscar.addEventListener('click', function(e){
        quickSort(vetor, 0, vetor.length);
        sessionStorage.setItem("vetor", vetor);
        let localização = buscaBinaria(vetor, numero_buscado.value);
        let text = '';
        if(localização>=0){
            text = "Valor encontrado!";  

            mostrar.style.opacity = 1;

            if(localização-1>=0) posicao_A.innerText=vetor[localização-1];
            else posicao_A.innerText='';
            posicao_B.innerText=vetor[localização];
            if(localização+1<=vetor.length-1) posicao_C.innerText=vetor[localização+1];
            else posicao_C.innerText='';
            localizacao.innerText = "Posição "+(localização+1)

            while(mostrar.classList.contains('fade4')) mostrar.classList.remove('fade4');
            mostrar.classList.add('fade4');
            setTimeout(() => {
                mostrar.classList.remove('fade4');
            }, 4000)
        }else{
           text = "Valor não encontrado!";
           mostrar.style.opacity = 0
        }

        while(encontrado.classList.contains('fade2')) encontrado.classList.remove('fade2');
        encontrado.innerText=text;
        encontrado.classList.add('fade2');
        setTimeout(() => {
            encontrado.classList.remove('fade2');
         }, 3000)

        e.preventDefault();
    })
}