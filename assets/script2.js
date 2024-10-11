// Este código funciona com alteração manual dos valores, sem auxilio de API

let dolar = 5.1;  // Taxa de conversão USD -> BRL
let euro = 6.1;   // Taxa de conversão EUR -> BRL

let usdInput = document.querySelector("#usd");
let brlInput = document.querySelector("#brl");
let eurInput = document.querySelector("#eur");

eurInput.addEventListener("keyup", () => {
    convert("eur-to-brl");
    convert("eur-to-usd");
});

usdInput.addEventListener("keyup", () => {
    convert("usd-to-brl");
    convert("usd-to-eur");
});

brlInput.addEventListener("keyup", () => {
    convert("brl-to-usd");
    convert("brl-to-eur");
});

eurInput.addEventListener("blur", () => {
    eurInput.value = formatCurrency(eurInput.value);
});

usdInput.addEventListener("blur", () => {
    usdInput.value = formatCurrency(usdInput.value);
});

brlInput.addEventListener("blur", () => {
    brlInput.value = formatCurrency(brlInput.value);
});

// Função para formatar os valores para o formato de moeda brasileiro
function formatCurrency(value) {
    let fixedValue = fixValue(value);
    let options = {
        useGrouping: false,
        minimumFractionDigits: 2,
    };
    let formatter = new Intl.NumberFormat("pt-BR", options);
    return formatter.format(fixedValue);
}

// Função para corrigir o valor
function fixValue(value) {
    let fixedValue = value.replace(",", ".");
    let floatValue = parseFloat(fixedValue);
    
    if (isNaN(floatValue)) {
        floatValue = 0;
    }
    
    return floatValue;
}

// Função de conversão
function convert(type) {
    if (type === "eur-to-brl") {
        let fixedValue = fixValue(eurInput.value);
        let result = fixedValue * euro;
        brlInput.value = formatCurrency(result.toFixed(2));
    } else if (type === "brl-to-eur") {
        let fixedValue = fixValue(brlInput.value);
        let result = fixedValue / euro;
        eurInput.value = formatCurrency(result.toFixed(2));
    }

    if (type === "eur-to-usd") {
        let fixedValue = fixValue(eurInput.value);
        let result = fixedValue * (euro / dolar);  // Conversão de EUR para USD
        usdInput.value = formatCurrency(result.toFixed(2));
    } else if (type === "usd-to-eur") {
        let fixedValue = fixValue(usdInput.value);
        let result = fixedValue / (euro / dolar);
        eurInput.value = formatCurrency(result.toFixed(2));
    }

    if (type === "usd-to-brl") {
        let fixedValue = fixValue(usdInput.value);
        let result = fixedValue * dolar;
        brlInput.value = formatCurrency(result.toFixed(2));
    } else if (type === "brl-to-usd") {
        let fixedValue = fixValue(brlInput.value);
        let result = fixedValue / dolar;
        usdInput.value = formatCurrency(result.toFixed(2));
    }
}

// Configuração inicial do valor de 1 euro e conversões automáticas
eurInput.value = "1.00";
convert("eur-to-brl");
convert("eur-to-usd");
