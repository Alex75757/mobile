function showMustGoOn() {
	let show_news = document.querySelector('.events-list--hidden');
	if (show_news) {
	  show_news.classList.remove('events-list--hidden');
	  if(!document.querySelector('.events-list--hidden')) {
	  document.querySelector('.show-button').style.display = 'none';
	  }
	}  
  }
  
  const questions = document.querySelectorAll('.question');
  for (let question of questions) {
	question.addEventListener('click', (event) => {
	  if ( !question.classList.contains('question--active')){
		question.classList.add('question--active');
		question.lastElementChild.classList.add('question__open-box--active');
		question.nextElementSibling.firstElementChild.style.display = 'block';
	  } else {
		question.classList.remove('question--active');
		question.nextElementSibling.firstElementChild.style.display = 'none';
		question.lastElementChild.classList.remove('question__open-box--active');  
	  }  
	})
  }  

/* сортировка карточек фотобудок по возрастанию/убыванию итоговой цены*/
const selectElement = document.querySelector('.msort__list');
selectElement.addEventListener('click', (event) => {
  let priceArr = document.getElementsByClassName('bg-card');
  let Arr = []
  if (event.target.value == 'up') {
     Arr = Array.from(priceArr).sort((a,b) => a.children[6].firstElementChild.innerText 
          > b.children[6].firstElementChild.innerText ? 1: -1)
          console.log(Arr)
  } 
  if (event.target.value == 'down') {
    Arr = Array.from(priceArr).sort((a,b) => a.children[6].firstElementChild.innerText
          < b.children[6].firstElementChild.innerText ? 1: -1)
  }

  for (let i = 0; i < Arr.length; i++){
         document.getElementById('msort').append(Arr[i])
        }
})

/* Добавление стоимости дополнительных опций в стоимость фотобудки*/
let elementChecked = document.querySelectorAll('.checkbox-other');
for (let element of elementChecked) {
  element.addEventListener('click', () => {
    if (element.lastElementChild.checked) {
      let add_price = element.parentElement.previousElementSibling;
      let rez = (add_price.parentElement.parentElement.nextSibling.nextSibling.nextSibling.nextSibling.firstElementChild.textContent.replace(/\s/g,''))
      rez = parseInt(rez) + parseInt(add_price.lastElementChild.textContent.replace(/от /g,'').replace(/\s/g,''));
      add_price.parentElement.parentElement.nextSibling.nextSibling.nextSibling.nextSibling.firstElementChild.textContent = 
      Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', currencyDisplay: 'symbol', minimumFractionDigits: '0' }).format(rez);
    } else {
      let add_price = element.parentElement.previousElementSibling;
      let rez = (add_price.parentElement.parentElement.nextSibling.nextSibling.nextSibling.nextSibling.firstElementChild.textContent.replace(/\s/g,''))
      rez = parseInt(rez) - parseInt(add_price.lastElementChild.textContent.replace(/от/g,'').replace(/\s/g,''));
      add_price.parentElement.parentElement.nextSibling.nextSibling.nextSibling.nextSibling.firstElementChild.textContent = 
      Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', currencyDisplay: 'symbol', minimumFractionDigits: '0' }).format(rez);
    }
  })
}  

// расчет заказа для отдельной страницы
function mobileOrder (idname) {
	let id = document.getElementById(idname);
	let priceResult = id.querySelector('.result__price').textContent.replace(/\s/g,'');
	priceResult = Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', currencyDisplay: 'symbol', minimumFractionDigits: '0' }).format(parseInt(priceResult));
	localStorage.setItem('price_card', priceResult);
	let bg_card_price = localStorage.getItem(idname);
	localStorage.setItem('bg_card', bg_card_price);
	additional_items= id.querySelectorAll('.checkbox-other');
	let j = null;
	for (let i = 0; i< additional_items.length; i++) {
	  if (additional_items[i].lastElementChild.checked) {
		j++;
		localStorage.setItem(`additional_option_${j}_price`, parseInt(additional_items[i].parentElement.previousElementSibling.lastElementChild.textContent.replace(/от/g,'').replace(/\s/g,'')));
		localStorage.setItem(`additional_option_${j}_caption`, additional_items[i].parentElement.previousElementSibling.firstElementChild.textContent);
	  }
	}  
	if (j) localStorage.setItem('additional_price_length', j);
  }


  /* Slider part
  Устанавливаем стартовый индекс слайда по умолчанию: */
  let slideIndex = 1;
  let cards = document.querySelectorAll('.result__price');

  /* Вызываем функцию прорисовки слайдеров карточек, которая реализована ниже: */
  for (let k = 1; k<=cards.length; k++) {
	showSlides(slideIndex, `slider${k}`);
  }
  /* запоминаем итог цену каждой карточки */
  for (let k = 1; k<=cards.length; k++) {
	localStorage.setItem(`card${k}`, document.getElementById(`card${k}`).querySelector('.result__price').textContent);
  }
  
  /* Увеличиваем индекс на 1 — показываем следующий слайд: */
  function nextSlide(name) {
	  showSlides((slideIndex += 1), name);
  }
  
  /* Уменьшаем индекс на 1 — показываем предыдущий слайд: */
  function previousSlide(name) {
	  showSlides((slideIndex -= 1), name);  
  }
  
  /* Устанавливаем текущий слайд: */
  function currentSlide(n, name) {
	  showSlides((slideIndex = n), name);
  }
  
  /* Функция перелистывания: */
  function showSlides(n, nameid) {
	  /* Обращаемся к элементам с названием класса */
		  let slides = document.getElementById(nameid).getElementsByClassName("slider-wrap");
		  let dots = document.getElementById(nameid).getElementsByClassName("dot");
	  /* Проверяем количество слайдов: */
	  if (n > slides.length) {
		slideIndex = 1
	  }
	  if (n < 1) {
		  slideIndex = slides.length
	  }
	  /* Проходим по каждому слайду в цикле for: */
	  for (let slide of slides) {
		  slide.style.display = "none";
	  }
	  for (i = 0; i < dots.length; i++) {
		  dots[i].className = dots[i].className.replace(" active", "");
	  }
	  
	  /* Делаем элемент блочным (отрисовываем только эту группу картинок): */
	  slides[slideIndex - 1].style.display = "flex";
	  
	  dots[slideIndex-1].className += " active";

  }
  
 
  
  




