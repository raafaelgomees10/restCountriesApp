const linkApi = 'https://restcountries.eu/rest/v2/all'
//FUNÇAO RESPONSAVEL PELA CHAMADA DA API 
function callingApi(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      data.forEach(result => {
        countryImg = result.flag
        countryCode = result.alpha3Code
        drawCountries(countryImg, countryCode)
      });
    })
}
//FUNÇAO RESPONSAVEL PELA CRIAÇAO DAS DIV DE CADA PAIS, ONDE SERA EXIBIDO O RESULTADO
function drawCountries(img, code) {
  let divFlag = document.createElement('img')
  divFlag.classList.add('myFlags')
  divFlag.setAttribute('src', img)
  divFlag.setAttribute('onclick', `countryInformation('${code}')`)

  const divPai = document.querySelector('#countriesResult')
  divPai.appendChild(divFlag)
}

//pegando valor do meu select, cada vez que trocar o valor do select ele chama uma funcao
function selectFilter() {
  var select = document.getElementById('inputFirstSelect');
  select.addEventListener('change', function () {
    var option = this.selectedOptions[0];
    var value = option.textContent;
    if (value == 'Região')
      searchRegion()

    if (value == 'Capital')
      searchCapital()

    if (value == 'Língua')
      searchLanguage()

    if (value == 'País')
      searchCountry()

    if (value == 'Cod. Ligação')
      searchCallingCode()
  });

}

/* ------------ INICIO DAS FUNCOES DE BUSCA ------------ */
//BUSCA POR REGIAO
function searchRegion() {
  let filter = document.querySelector(".divSeccondSelect") //selecionando a div
  let select = document.querySelector('#inputSeccondSelect') //selecionando o campo select
  filter.style.display = 'block' //deixando a div visivel

  filter.querySelector('.labelText').innerHTML = 'Região' //escrevendo a label
  select.innerHTML = '<option value="" selected disabled>Escolha uma opção</option>'; //Primeira opcão

  const link = 'https://restcountries.eu/rest/v2/all?fields=region'
  fetch(link)
    .then(response => response.json())
    .then(result => {
      //eliminando elementos duplicados com result2
      const result2 = result
        .map(e => JSON.stringify(e))
        .reduce((acc, cur) => (acc.includes(cur) || acc.push(cur), acc), [])
        .map(e => JSON.parse(e));
      // console.log(result2)
      result2.forEach(element => {
        const regiao = element.region
        if (regiao != '') {
          select.innerHTML += `<option value="${regiao}">${regiao}</option>`;
        }
      });
    })

}
//BUSCA POR CAPITAL
function searchCapital() {
  let filter = document.querySelector(".divSeccondSelect") //selecionando a div
  let select = document.querySelector('#inputSeccondSelect') //selecionando o campo select
  filter.style.display = 'block' //deixando a div visivel

  filter.querySelector('.labelText').innerHTML = 'Capital' //escrevendo a label
  select.innerHTML = '<option value="" selected disabled>Escolha uma opção</option>'; //Primeira opcão

  const link = 'https://restcountries.eu/rest/v2/all?fields=capital'
  fetch(link)
    .then(response => response.json())
    .then(result => {
      result.forEach(element => {
        if (element.capital != '') {
          select.innerHTML += `<option value="${element.capital}">${element.capital}</option>`;
        }
      });
    })
}
//BUSCA POR LINGUA
function searchLanguage() {
  let filter = document.querySelector(".divSeccondSelect") //selecionando a div
  let select = document.querySelector('#inputSeccondSelect') //selecionando o campo select
  filter.style.display = 'block' //deixando a div visivel

  filter.querySelector('.labelText').innerHTML = 'Língua' //escrevendo a label
  select.innerHTML = '<option value="" selected disabled>Escolha uma opção</option>'; //Primeira opcão

  const link = 'https://restcountries.eu/rest/v2/all?fields=languages'
  fetch(link)
    .then(response => response.json())
    .then(result => {
      //pegando o array do arquivo languages.js
      language.forEach(element => {
        select.innerHTML += `<option value="${element.code}">${element.name}</option>`;
      });
    })
}

//BUSCA POR CODIGO DE TELEFONE
function searchCallingCode() {
  let filter = document.querySelector(".divSeccondSelect") //selecionando a div
  let select = document.querySelector('#inputSeccondSelect') //selecionando o campo select
  filter.style.display = 'block' //deixando a div visivel

  filter.querySelector('.labelText').innerHTML = 'Cód. Ligação' //escrevendo a label
  select.innerHTML = '<option value="" selected disabled>Escolha uma opção</option>'; //Primeira opcão

  const link = 'https://restcountries.eu/rest/v2/all?fields=callingCodes'
  fetch(link)
    .then(response => response.json())
    .then(result => {
      const result2 = result
        //eliminando elementos duplicados com result2
        .map(e => JSON.stringify(e))
        .reduce((acc, cur) => (acc.includes(cur) || acc.push(cur), acc), [])
        .map(e => JSON.parse(e));
      // console.log(result)
      result2.forEach(element => {
        const code = element.callingCodes
        if (code != '') {
          select.innerHTML += `<option value="${code}">${code}</option>`;
        }
      });
    })
}

//BUSCA POR PAIS
function searchCountry() {
  let filter = document.querySelector(".divSeccondSelect") //selecionando a div
  let select = document.querySelector('#inputSeccondSelect') //selecionando o campo select
  filter.style.display = 'block' //deixando a div visivel

  filter.querySelector('.labelText').innerHTML = 'País' //escrevendo a label
  select.innerHTML = '<option value="" selected disabled>Escolha uma opção</option>'; //Primeira opcão

  const link = 'https://restcountries.eu/rest/v2/all?fields=name'
  fetch(link)
    .then(response => response.json())
    .then(result => {
      result.forEach(element => {
        const country = element.name
        if (country != '') {
          select.innerHTML += `<option value="${country}">${country}</option>`;
        }
      });
    })
}
/* ------------ FIM DAS FUNCOES DE BUSCA ------------ */


//CRIANDO O EVENTO APOS O CLICK NO BOTAO, ONDE PEGA O VALOR DOS SELECTS
const btnFind = document.getElementById('btnFind');
btnFind.addEventListener("click", valuesSelect);
function valuesSelect() {
  const select1 = document.getElementById('inputFirstSelect')
  const valueSelect1 = select1.options[select1.selectedIndex].value;

  const select2 = document.getElementById('inputSeccondSelect')
  const valueSelect2 = select2.options[select2.selectedIndex].value;

  getData(valueSelect1, valueSelect2)

}

//FUNCAO QUE IRA FAZER A PESQUISA COM OS PARAMETROS PASSADOS PELO USUARIO
function getData(selectFilter1, selectFilter2) {
  const url = `https://restcountries.eu/rest/v2/${selectFilter1}/${selectFilter2}`;;
  if (selectFilter1 != '' || selectFilter2 != '') {
    const divPai = document.querySelector('#countriesResult')
    let contentHTML1 = ''
    divPai.innerHTML = contentHTML1;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        data.forEach(element => {
          countryFlag = element.flag
          countryCode = element.alpha3Code

          drawCountries(countryFlag, countryCode)
        });
      })
  }
}

//FUNCAO QUE IRA CARREGAR A SEGUNDA TELA, DEPOIS DO CLICK NO PAIS ESPECIFICO, O MESMO ABRE COM SUAS INFORMACOES
function countryInformation(code) {
  let page1 = document.querySelector('.page1') //selecionando a div page1
  let page2 = document.querySelector('.page2') //selecionando a div page2
  let btnVoltar = document.querySelector('.btnVoltar') //selecionando o botao voltar

  page1.style.display = 'none' //deixando a div escondida
  page2.style.display = 'block' //deixando a div visivel
  btnVoltar.style.display = 'block' //deixando o botao voltar visivel na segunda pagina

  const url = `https://restcountries.eu/rest/v2/alpha/${code}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      nome = data.name
      capital = data.capital
      region = data.region
      subregion = data.subregion
      population = data.population
      flag = data.flag
      neighbor = data.borders

      let lang = data.languages;
      let languages = ''

      document.querySelector('#imgSelected').src = flag;
      document.querySelector('#countryName').innerHTML = 'Nome: ' + nome
      document.querySelector('#countryCapital').innerHTML = 'Capital: ' + capital
      document.querySelector('#countryRegion').innerHTML = 'Região: ' + region
      document.querySelector('#countrySubRegion').innerHTML = 'Sub-Região: ' + subregion
      document.querySelector('#countryPopulation').innerHTML = 'População: ' + population
      lang.forEach(element => {
        languages += `${element.name} `
      });
      document.querySelector('#countryLang').innerHTML = 'Línguas: ' + languages.replaceAll(' ', ', ')
      drawBorders(neighbor, nome)

    })
}

//FUNÇAO RESPONSAVEL CRIAR A DIV E POR PESQUISAR OS PAISES VIZINHOS DO PAIS SELECIONADO
function drawBorders(object, nome) {
  let borders = ' '
  object.forEach(element => {
    borders += `${element} `
    // console.log(borders)
  });
  const container = document.querySelector('#borderFlags') //selecionando a div page2 como div pai
  if (borders != ' ') {
    let contentHTML2 = ' '
    let paisesVizinhos = borders.split(" ");
    let novoPaisesVizinhos = paisesVizinhos.toString().replaceAll(',', ';').substr(1)
    let url = 'https://restcountries.eu/rest/v2/alpha?codes=' + novoPaisesVizinhos
    let bandeira = ''
    fetch(url)
      .then(response => response.json())
      .then(data => {
        data.forEach(element => {
          // console.log(data)
          bandeira = element.flag
          code = element.alpha3Code
          contentHTML2 += `
          <div class="borderResultImg">
          <img src="${bandeira}" class="borderImg" onclick="countryInformation('${code}')" alt="${code}">
        </div>
        `
          container.innerHTML = contentHTML2;

        });
      })
  } else {
    contentHTML2 = `<div class="borderResultImg"><span class="textBold">${nome}</span> não tem países vizinhos</div>`
    container.innerHTML = contentHTML2;

  }
}

function changeDiv() {
  let page1 = document.querySelector('.page1') //selecionando a div page1
  let page2 = document.querySelector('.page2') //selecionando a div page2
  let btnVoltar = document.querySelector('.btnVoltar') //selecionando a div page2

  page1.style.display = 'block' //deixando a div escondida
  page2.style.display = 'none' //deixando a div visivel
  btnVoltar.style.display = 'none' //deixando a div visivel

}

selectFilter()
callingApi(linkApi)

