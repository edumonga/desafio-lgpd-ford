// ============================================================
// CARROSSEL DE IMAGENS
// ============================================================

// array que guarda os objetos da classe Carousel
let carouselArr = [];

class Carousel {

    // atributos da instancia: imagem, titulo e link
    constructor(image, title, url) {
        this.image = image;
        this.title = title;
        this.url = url;
    }

    // ---- atributos estaticos (controle do carrossel) ----
    static _sequence = 0;   // posicao atual dentro do array
    static _size = 0;       // quantidade de itens do array
    static _interval = null; // referencia do setInterval
    static _arr = [];       // array em uso
    static _time = 2000;    // troca a cada 2 segundos

    // inicializa o carrossel
    static Start(arr) {
        if (!arr || arr.length === 0) {
            throw "O metodo Start precisa de um array com pelo menos um item";
        }

        Carousel._arr = arr;
        Carousel._size = arr.length;
        Carousel._sequence = 0;

        Carousel.Show();   // mostra o primeiro imediatamente

        // evita criar mais de um intervalo se Start for chamado de novo
        if (Carousel._interval !== null) {
            clearInterval(Carousel._interval);
        }

        Carousel._interval = setInterval(function () {
            Carousel.Next();
        }, Carousel._time);
    }

    // para o carrossel
    static Stop() {
        clearInterval(Carousel._interval);
        Carousel._interval = null;
    }

    // exibe na tela o item da posicao atual
    static Show() {
        const item = Carousel._arr[Carousel._sequence];
        if (!item) return;

        const divCarousel = document.getElementById("carousel");
        const divTitle = document.getElementById("carousel-title");

        // altera os estilos CSS pelo JavaScript
        divCarousel.style.backgroundImage = `url('${item.image}')`;
        divCarousel.style.backgroundRepeat = "no-repeat";
        divCarousel.style.backgroundPosition = "center";
        divCarousel.style.backgroundSize = "contain";

        // injeta o texto com o link na div carousel-title
        divTitle.innerHTML = `<a href="${item.url}">${item.title}</a>`;

        Carousel.UpdateDots();
    }

    // avanca para o proximo item
    static Next() {
        Carousel._sequence++;
        if (Carousel._sequence >= Carousel._size) {
            Carousel._sequence = 0;
        }
        Carousel.Show();
    }

    // volta para o item anterior
    static Previous() {
        Carousel._sequence--;
        if (Carousel._sequence < 0) {
            Carousel._sequence = Carousel._size - 1;
        }
        Carousel.Show();
    }

    // apelido usado pelo botao do index.html (onclick="Carousel.Prev()")
    static Prev() {
        Carousel.Previous();
    }

    // deixa o botao correspondente ao slide atual em destaque
    static UpdateDots() {
        const dots = document.querySelectorAll("#dots button");
        for (let i = 0; i < dots.length; i++) {
            dots[i].style.opacity = "0.6";
        }
    }
}

// ---- itens do carrossel ----
carouselArr.push(new Carousel("img/imagem_1.jpg", "Esta é a nova Ranger Ford 2022. Verifique as novidades.", "lancamento.html"));
carouselArr.push(new Carousel("img/imagem_2.jpg", "Ford, a nossa história", "lancamento.html"));
carouselArr.push(new Carousel("img/imagem_3.jpg", "Nova Ford Bronco Sport 2022", "lancamento.html"));

// so inicia depois que o HTML terminou de carregar
window.addEventListener("load", function () {
    Carousel.Start(carouselArr);
});
