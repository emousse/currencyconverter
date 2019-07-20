
const endpoint = 'latest'
const access_key = 'b1fd9f5a8011500eeab3b6af513bcefb'


function makeCurrencyList(currencyRates){
  const domCurrency = document.querySelector('#currency');
  
  for(rate in currencyRates){
    //let option = new Option(rate, currencyRates[rate]);
    //domCurrency.appendChild(option)
    domCurrency.insertAdjacentHTML(
      'beforeend',
      `<li class="pure-menu-item"><a href="#" class="pure-menu-link"><div class="currency-flag currency-flag-${rate.toLowerCase()}"></div>${rate}</a></li>`
    )
  }
}

function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("currency");
  a = div.getElementsByTagName("a");
  console.log(a);
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
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

      makeCurrencyList(data.rates)
    })
}