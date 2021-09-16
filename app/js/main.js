
let elementChecked = document.querySelectorAll('.heart');
for (let element of elementChecked) {
  element.addEventListener('click', () => {
	element.classList.toggle('heart--active') 
	});
}

let btnChecked = document.querySelectorAll('.btn');
for (let element of btnChecked) {
	element.addEventListener('click', () => {
			element.style.display="none";
			element.nextElementSibling.style.display="flex";
	});
}

let minusChecked = document.querySelectorAll('.cart__minus');
for (let element of minusChecked) {
	element.addEventListener('click', () => {
		let test = parseInt(element.nextElementSibling.innerHTML.replace('шт',''));
		if (test == 1){
			element.closest('.cart').style.display="none";
			element.parentNode.previousElementSibling.style.display="block";
		} else {
			test -=1;
			element.nextElementSibling.innerHTML = test + " шт";
		}
	})
}

let plusChecked = document.querySelectorAll('.cart__plus');
for (let element of plusChecked) {
	element.addEventListener('click', () => {
		let test = parseInt(element.previousElementSibling.innerHTML.replace('шт',''));
			test +=1;
			element.previousElementSibling.innerHTML = test + " шт";
		
	})
}