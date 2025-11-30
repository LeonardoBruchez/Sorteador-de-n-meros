const inputNumber = document.getElementById("inputNumbers")
const inputStartOf = document.getElementById("inputStartOf")
const inputEndOf = document.getElementById("inputEndOf")
const buttonMobile = document.getElementById("buttonMobile")
const noRepeatMobile = document.getElementById("altBtnMobile")
const noRepeatDesktop = document.getElementById("altBtnDesktop")
const buttonDesktop = document.getElementById("buttonDesktop")
const inputSection = document.getElementById("inputSection"); 
const resultArea = document.getElementById("resultArea");
const desktopAside = document.getElementById("desktopAside");

let isNoRepeatActive = false;

function toggleNoRepeat(){
  isNoRepeatActive = !isNoRepeatActive;

  noRepeatMobile.classList.toggle('active',isNoRepeatActive)
  noRepeatDesktop.classList.toggle('active',isNoRepeatActive)
}

noRepeatMobile.addEventListener('click',toggleNoRepeat)
noRepeatDesktop.addEventListener('click',toggleNoRepeat)

function gerarNumeroAleatório(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sortearNúmeros(){
  const min = parseInt(inputStartOf.value)
  const max = parseInt(inputEndOf.value)
  const quantity = parseInt(inputNumber.value)

  let sorteados = []

  if(isNaN(min) || isNaN(max) || isNaN(quantity) || min > max || quantity <= 0 ){
    alert("Por favor, insira valores válidos: Mínimo <= Máximo e Quantidade > 0.");
    return 
  }
  
  const rangeSize = max - min + 1
  if(isNoRepeatActive && quantity > rangeSize){
    alert("Com 'Não repetir número' ativo, a quantidade a sortear não pode ser maior que o total de números no intervalo (" + rangeSize + ").");
    return
  }

  for(i = 0;i < quantity;i++){
    let numeroSorteado

    do{
      numeroSorteado = gerarNumeroAleatório(min, max);
    }while(isNoRepeatActive && sorteados.includes(numeroSorteado))
    sorteados.push(numeroSorteado)

  }
  exibirResultado(sorteados)
}

buttonMobile.addEventListener('click', sortearNúmeros)
buttonDesktop.addEventListener('click', sortearNúmeros)

function exibirResultado(number){
  const numbersHTML = number.map(num => `
      <div class="number-slot" data-final-number="${num}">
          <div class="purple-spinner"></div>
          <span class="number-display"></span>
      </div>
  `).join('')
  
  resultArea.innerHTML = `
  <div class="result-box">
  <p style="margin-bottom: 2.5rem;"> <STRONG>RESULTADO DO SORTEIO</STRONG></p>
  <div class="numbers-display">
  ${numbersHTML}
  </div>
  <button class="sortear-novamente-btn" id="sortAgainBtn"  style="margin-block: 2.5rem 4rem;">
  <span>SORTEAR NOVAMENTE</span>
  <img src="assets/icons/arrowright.svg" alt="">
  </button>
  </div>
  `

  inputSection.classList.add('hidden')
  buttonsWrapper.classList.add('hidden')
  resultArea.classList.remove('hidden')
  
  const sortAgainBtn = document.getElementById('sortAgainBtn')
  sortAgainBtn.addEventListener('click', resetApp)

  const numberSlots = document.querySelectorAll('.number-slot')
  
  numberSlots.forEach((slot, index) => {
  const finalNumber = slot.dataset.finalNumber
  const spinner = slot.querySelector('.purple-spinner')
  const display = slot.querySelector('.number-display')

    setTimeout(() => {
    slot.style.opacity = '1' 
    slot.style.transform = 'scale(1)'
    spinner.classList.add('active')
            
      setTimeout(() => {
      display.textContent = finalNumber
      display.classList.add('visible')
      
      spinner.classList.remove('active');
      spinner.classList.add('fade-out'); 
      
      setTimeout(() => {
          spinner.style.display = 'none'; 
      }, 500);
            
        }, 1000); 
          
      }, index * 800);
  });
}

function resetApp(){
  inputSection.classList.remove('hidden')
  buttonsWrapper.classList.remove('hidden')
  resultArea.classList.add('hidden')

  resultArea.innerHTML = ''
}