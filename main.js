const currencyInput = document.querySelector("#currency")
const results = document.querySelector("#results")
let availableCurrencies = []

$.get("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json", (currencies) => {
    availableCurrencies = currencies
})


currencyInput.addEventListener("change", (event) => {
    const currency = currencyInput.value.toLowerCase()
    if (availableCurrencies[currency]) {
        $.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}/usd.json`, ({ usd }) => {
            const gems = usd / (0.99 / 80)
            if (gems < 1) results.textContent = `Nope. A Clash of Clans gem is worth more than 1 ${currency.toUpperCase()}. Oof.`
            else results.textContent = `Yup. 1 ${currency.toUpperCase()} is worth approximately ${Math.round(gems)} Clash of Clans gems. Thankfully.`
        })
    }
    else {
        results.textContent = "Currency not found."
    }
})

currencyInput.addEventListener("keydown", (event) => {
    if (event.key === "Backspace") results.textContent = ""
})