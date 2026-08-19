// ============================================================
// COMPARACAO DE VEICULOS
// ============================================================

// array que guarda os carros marcados (no maximo 2)
let carArr = [];

class Car {

    constructor(nome, preco, alturaCacamba, alturaVeiculo, alturaSolo, capacidadeCarga, motor, potencia, volumeCacamba, roda, image) {
        this.nome = nome;
        this.preco = preco;
        this.alturaCacamba = alturaCacamba;
        this.alturaVeiculo = alturaVeiculo;
        this.alturaSolo = alturaSolo;
        this.capacidadeCarga = capacidadeCarga;
        this.motor = motor;
        this.potencia = potencia;
        this.volumeCacamba = volumeCacamba;
        this.roda = roda;
        this.image = image;
    }

    // formata o preco no padrao brasileiro: R$ 183.850,00
    get precoFormatado() {
        return this.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }
}

// procura o carro no array: devolve a posicao ou -1 se nao existir
function GetCarArrPosition(arr, carClass) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].nome === carClass.nome) {
            return i;
        }
    }
    return -1;
}

// adiciona ou remove o carro do array conforme o checkbox
function SetCarToCompare(el, carClass) {

    if (!(carClass instanceof Car)) {
        throw "You need set a Car Class";
    }

    if (el.checked) {

        // nao permite mais de dois carros marcados
        if (carArr.length >= 2) {
            alert("Você só pode marcar 2 carros ao mesmo tempo");
            el.checked = false;
            return;
        }

        // evita marcar o mesmo carro duas vezes
        if (GetCarArrPosition(carArr, carClass) === -1) {
            carArr.push(carClass);
        }

    } else {

        const index = GetCarArrPosition(carArr, carClass);
        if (index !== -1) {
            carArr.splice(index, 1);
        }
    }
}

// exibe o pop-up com a tabela de comparacao
function ShowCompare() {
    if (carArr.length < 2) {
        alert("Precisa marcar 2 carros para apresentar a comparação");
        return;
    }

    UpdateCompareTable();
    document.getElementById("compare").style.display = "block";
}

// oculta o pop-up
function HideCompare() {
    document.getElementById("compare").style.display = "none";
}

// preenche cada celula da tabela com os dados dos dois carros
function UpdateCompareTable() {

    for (let i = 0; i < carArr.length; i++) {
        const car = carArr[i];

        document.getElementById("compare_image_" + i).innerHTML = `<img src="${car.image}" width="120">`;
        document.getElementById("compare_modelo_" + i).innerHTML = car.nome;
        document.getElementById("compare_alturacacamba_" + i).innerHTML = car.alturaCacamba;
        document.getElementById("compare_alturaveiculo_" + i).innerHTML = car.alturaVeiculo;
        document.getElementById("compare_alturasolo_" + i).innerHTML = car.alturaSolo;
        document.getElementById("compare_capacidadecarga_" + i).innerHTML = car.capacidadeCarga;
        document.getElementById("compare_motor_" + i).innerHTML = car.motor;
        document.getElementById("compare_potencia_" + i).innerHTML = car.potencia;
        document.getElementById("compare_volumecacamba_" + i).innerHTML = car.volumeCacamba;
        document.getElementById("compare_roda_" + i).innerHTML = car.roda;
        document.getElementById("compare_preco_" + i).innerHTML = car.precoFormatado;
    }
}
