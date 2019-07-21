let selectedCurrency = 'USD'
let currencyList
const endpoint = 'latest'
const access_key = 'b1fd9f5a8011500eeab3b6af513bcefb'
let amountInput = document.getElementById('amount')

function makeCurrencyList(currencyRates){
  const domCurrency = document.querySelector('#currency');
  
  for(rate in currencyRates){
    //let option = new Option(rate, currencyRates[rate]);
    //domCurrency.appendChild(option)
    domCurrency.insertAdjacentHTML(
      'beforeend',
      `<li class="pure-menu-item"><a href="#" onclick="changeCurrency(this)" data-currency=${rate} class="m-link ${rate == selectedCurrency ? 'active' : '' }"><div class="currency-flag currency-flag-${rate.toLowerCase()}"></div>${rate}</a></li>`
    )
  }
}

function filterFunction() {
  var input, filter, ul, li, a, i;
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

function changeCurrency(element){
  console.log(element.dataset.currency)
  const rate = currencyList[selectedCurrency]
  let convert = Number(rate) * Number(document.querySelector('#amount').value)
  console.log(convert);

  document.querySelector('#currency .active').classList.toggle('active')
  document.querySelector('#res').value = convert
  selectedCurrency = element.dataset.currency
  document.querySelector('#resCurrency').textContent = selectedCurrency

  element.classList.toggle('active')
  element.preventDefault()
}

function convert(event){
  const rate = currencyList[selectedCurrency]
  let convert = Number(rate) * Number(event.target.value)
  console.log(convert);
  
  document.querySelector('#res').value = convert
}

function currencyConverter(){
    fetch('http://data.fixer.io/api/' + endpoint + '?access_key=' + access_key)
    .then(response => response.json())         
    .then(data => {     
      document.querySelector('#loader').className = 'none'                         
      /* const now = new Date().toLocaleTimeString();
      const li = document.createElement('li');
      
      li.textContent = `${now} : ${data}`;
      userList.prepend(li); */
      currencyList = data.rates
      makeCurrencyList(currencyList)
    })
}

//listeners
amountInput.addEventListener('input',convert)