const API_KEY = 'a83d14f1969d77f85b8c15212c878782'; // Sua chave da API do Fixer.io
const API_URL = `http://data.fixer.io/api/latest?access_key=${API_KEY}&symbols=USD,BRL`;

// Seleção dos elementos no HTML
let usdInput = document.querySelector("#usd");
let brlInput = document.querySelector("#brl");
let eurInput = document.querySelector("#eur");

let dolar;  // Taxa de conversão de EUR para USD
let real;   // Taxa de conversão de EUR para BRL
let euro = 1;  // Euro é a moeda base

// Função para buscar taxas de câmbio da API do Fixer.io
async function fetchExchangeRates() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.success) {
            dolar = data.rates.USD; // Taxa de conversão EUR -> USD
            real = data.rates.BRL;  // Taxa de conversão EUR -> BRL

            // Atualiza os campos com base na cotação atual
            eurInput.value = formatCurrency("1.00");  // Formata o valor inicial de 1 euro
            brlInput.value = formatCurrency((euro * real).toFixed(2));
            usdInput.value = formatCurrency((euro * dolar).toFixed(2));
        } else {
            console.error("Erro ao buscar os dados da API:", data.error.type);
        }
    } catch (error) {
        console.error("Erro ao fazer a requisição à API:", error);
    }
}

// Adiciona eventos para calcular ao alterar os valores dos campos
eurInput.addEventListener("input", () => {
    // Substitui ponto por vírgula e atualiza o valor
    eurInput.value = eurInput.value.replace(".", ",");
    // Chama a função de conversão
    convert("eur-to-brl");
    convert("eur-to-usd");
});

// Formata o valor do euro quando o usuário sai do campo
eurInput.addEventListener("blur", () => {
    eurInput.value = formatCurrency(eurInput.value);
});

brlInput.addEventListener("input", () => {
    brlInput.value = brlInput.value.replace(".", ","); // Substitui o ponto pela vírgula
    convert("brl-to-eur");
    convert("brl-to-usd");
});

brlInput.addEventListener("blur", () => {
    brlInput.value = formatCurrency(brlInput.value);
});

usdInput.addEventListener("input", () => {
    usdInput.value = usdInput.value.replace(".", ","); // Substitui o ponto pela vírgula
    convert("usd-to-eur");
    convert("usd-to-brl");
});

usdInput.addEventListener("blur", () => {
    usdInput.value = formatCurrency(usdInput.value);
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

// Função de conversão (usando os valores atualizados)
function convert(type) {
    if (type === "eur-to-brl") {
        let fixedValue = fixValue(eurInput.value);
        let result = fixedValue * real;
        brlInput.value = formatCurrency(result.toFixed(2));
    } else if (type === "brl-to-eur") {
        let fixedValue = fixValue(brlInput.value);
        let result = fixedValue / real;
        eurInput.value = formatCurrency(result.toFixed(2));
    }

    if (type === "eur-to-usd") {
        let fixedValue = fixValue(eurInput.value);
        let result = fixedValue * dolar;  // Conversão de EUR para USD
        usdInput.value = formatCurrency(result.toFixed(2));
    } else if (type === "usd-to-eur") {
        let fixedValue = fixValue(usdInput.value);
        let result = fixedValue / dolar;
        eurInput.value = formatCurrency(result.toFixed(2));
    }

    if (type === "usd-to-brl") {
        let fixedValue = fixValue(usdInput.value);
        let result = fixedValue * real;
        brlInput.value = formatCurrency(result.toFixed(2));
    } else if (type === "brl-to-usd") {
        let fixedValue = fixValue(brlInput.value);
        let result = fixedValue / real;
        usdInput.value = formatCurrency(result.toFixed(2));
    }
}

// Chama a função para buscar as taxas de câmbio quando a página carregar
fetchExchangeRates();
