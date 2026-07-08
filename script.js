/* ==================================
    14Vegetta - JAVASCRIPT
================================== */


/* ==================================
   MENU MOBILE
================================== */

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");


if(menuBtn){

    menuBtn.addEventListener("click",()=>{

        nav.classList.toggle("active");

    });

}



/* Fechar menu ao clicar em um link */

const linksMenu = document.querySelectorAll("nav a");


linksMenu.forEach(link=>{

    link.addEventListener("click",()=>{

        nav.classList.remove("active");

    });

});



/* ==================================
   ANIMAÇÃO AO SCROLL
================================== */


const elementos = document.querySelectorAll(
    ".card, .news-card, .sobre-texto, .sobre-img"
);



function revelarElementos(){


    const alturaTela =
    window.innerHeight;


    elementos.forEach(elemento=>{


        const distanciaTopo =
        elemento.getBoundingClientRect().top;



        if(distanciaTopo < alturaTela - 100){


            elemento.classList.add("fade");


        }


    });


}



window.addEventListener(
    "scroll",
    revelarElementos
);



revelarElementos();

function formatarValorFinal(valor){
    if(valor >= 1000000){
        return (valor / 1000000).toFixed(valor % 1000000 === 0 ? 0 : 1) + "M";
    }
    if(valor >= 1000){
        return (valor / 1000).toFixed(valor % 1000 === 0 ? 0 : 1) + "k";
    }
    return String(valor);
}

function atualizarNumeros(){
    const sectionNumeros = document.querySelector(".numbers");
    if(!sectionNumeros) return;

    const rect = sectionNumeros.getBoundingClientRect();
    if(rect.top > window.innerHeight || rect.bottom < 0) return;

    const counters = document.querySelectorAll(".counter");
    counters.forEach(counter => {
        if(counter.dataset.animated === "true") return;

        const target = Number(counter.dataset.target);
        if(isNaN(target)) return;

        counter.dataset.animated = "true";
        let current = 0;
        const step = Math.max(Math.floor(target / 120), 1);

        const update = () => {
            current += step;
            if(current >= target){
                counter.textContent = formatarValorFinal(target);
            } else {
                counter.textContent = formatarValorFinal(current);
                requestAnimationFrame(update);
            }
        };

        update();
    });
}

window.addEventListener(
    "scroll",
    ()=>{
        revelarElementos();
        atualizarNumeros();
    }
);


revelarElementos();
atualizarNumeros();
/* ==================================
   BOTÃO VOLTAR AO TOPO
================================== */


const topoBtn = document.createElement("button");


topoBtn.innerHTML = "↑";


topoBtn.classList.add("topo-btn");


document.body.appendChild(topoBtn);



window.addEventListener("scroll",()=>{


    if(window.scrollY > 500){

        topoBtn.classList.add("mostrar");

    }else{

        topoBtn.classList.remove("mostrar");

    }


});



topoBtn.addEventListener("click",()=>{


    window.scrollTo({

        top:0,

        behavior:"smooth"

    });


});





/* ==================================
   ANO AUTOMÁTICO DO FOOTER
================================== */


const ano = document.querySelector("#ano");


if(ano){


    ano.textContent =
    new Date().getFullYear();


}





/* ==================================
   EFEITO DE DIGITAÇÃO NO HERO
================================== */


const textoHero =
document.querySelector(".hero p");



if(textoHero){


    const mensagem =
    textoHero.textContent;


    textoHero.textContent="";



    let contador = 0;



    function escrever(){


        if(contador < mensagem.length){


            textoHero.textContent +=
            mensagem.charAt(contador);


            contador++;


            setTimeout(
                escrever,
                40
            );


        }


    }


    escrever();


}





/* ==================================
   EFEITO DE HOVER NOS CARDS
================================== */


const cards =
document.querySelectorAll(".card");



cards.forEach(card=>{


    card.addEventListener(
        "mouseenter",
        ()=>{


            card.style.transform =
            "translateY(-12px) scale(1.02)";


        }

    );



    card.addEventListener(
        "mouseleave",
        ()=>{


            card.style.transform =
            "translateY(0) scale(1)";


        }

    );


});
/* ==================================
   ESTILO DO BOTÃO VOLTAR AO TOPO
   CRIADO PELO JAVASCRIPT
================================== */


const estiloTopo = document.createElement("style");


estiloTopo.innerHTML = `

.topo-btn {

    position:fixed;

    bottom:30px;

    right:30px;

    width:55px;

    height:55px;

    border-radius:50%;

    border:none;

    cursor:pointer;

    background:

    linear-gradient(
        135deg,
        #8b2cff,
        #b56cff
    );

    color:white;

    font-size:25px;

    font-weight:bold;

    opacity:0;

    visibility:hidden;

    transition:.3s;

    z-index:999;

    box-shadow:

    0 0 20px rgba(139,44,255,.7);

}



.topo-btn:hover {

    transform:translateY(-5px);

    box-shadow:

    0 0 35px rgba(181,108,255,.9);

}



.topo-btn.mostrar {

    opacity:1;

    visibility:visible;

}



`;



document.head.appendChild(estiloTopo);





/* ==================================
   LOADING DA PÁGINA
================================== */


window.addEventListener(
    "load",
    ()=>{


        document.body.classList.add(
            "pagina-carregada"
        );


    }

);





/* ==================================
   PREVENÇÃO DE ERROS
================================== */


function existe(elemento){


    return elemento !== null &&
           elemento !== undefined;


}




/* ==================================
   FUTURO SISTEMA DE NOTÍCIAS
   (BASE PARA API)
================================== */



const noticias = [

    {

        categoria:"Futebol",

        titulo:"Mercado da bola atualizado",

    },


    {

        categoria:"Games",

        titulo:"Novidades do mundo gamer",

    },


    {

        categoria:"Geek",

        titulo:"Novos animes em destaque",

    }

];



function carregarNoticias(){


    const area =
    document.querySelector(".news-grid");



    if(!area) return;



    noticias.forEach(noticia=>{


        console.log(

            noticia.categoria +
            " - " +
            noticia.titulo

        );


    });


}



carregarNoticias();





/* ==================================
   MENSAGEM NO CONSOLE
================================== */


console.log(

    "%c 14Vegetta ONLINE 🚀",

    `

    color:#b56cff;

    font-size:20px;

    font-weight:bold;

    `

);