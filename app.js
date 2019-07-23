let selectedCurrency = 'USD';
let currencyList;
const endpoint = 'latest';
const access_key = 'b1fd9f5a8011500eeab3b6af513bcefb';
let amountInput = document.getElementById('amount');

/**
 * Fonction appelée dans le fetch, initialise la liste des taux des devises dazns le DOM
 * @param currencyRates
 */
function makeCurrencyList(currencyRates) {
    const domCurrency = document.querySelector('#currency');

    for (let rate in currencyRates) {
        domCurrency.insertAdjacentHTML(
            'beforeend',
            `<li class="pure-menu-item"><a href="#" onclick="changeCurrency(this)" data-currency=${rate} class="m-link ${rate == selectedCurrency ? 'active' : ''}"><div class="currency-flag currency-flag-${rate.toLowerCase()}"></div>${rate}</a></li>`
        );
    }
}

/**
 * Fonction appelée lors d'un input dans la recherche des devises
 */
function filterFunction() {
    let input, filter, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("currency");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

/**
 * Fonction appelée lors du changement de devise, recalcul ett affichage
 * @param element
 */
function changeCurrency(element) {
    selectedCurrency = element.dataset.currency;
    let convert = calculate(Number(document.querySelector('#amount').value));

    document.querySelector('#currency .active').classList.toggle('active');
    document.querySelector('#res').value = convert;
    document.querySelector('#resCurrency').textContent = selectedCurrency;

    element.classList.toggle('active');
}

/**
 * Fonction de calcul, appelée lors d'un changement de valeur ou de devise
 * @param input
 * @returns {string}
 */
function calculate(input) {
    return (Number(input) * Number(currencyList[selectedCurrency])).toFixed(4);
}

/**
 * Fonction callback du listener input, appelée lors d'un changement de valeur
 * @param event
 */
function convertOnInput(event) {
    document.querySelector('#res').value = calculate(event.target.value);
}

/**
 * GET sur l'api fixer, renvoie un json des devises & taux de change à jour
 */
fetch('http://data.fixer.io/api/' + endpoint + '?access_key=' + access_key)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.success){
            document.querySelector('#loader').className = 'none';
            currencyList = data.rates;
            makeCurrencyList(currencyList);
        } else {
            document.querySelector('#loader').insertAdjacentHTML('beforeend',`<span>Oups, ou sont les devises?`);
        }

    })
    .catch(err => console.log(err));

/**
 * Ecoute de l'input du montant
 */
amountInput.addEventListener('input', convertOnInput);