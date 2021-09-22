
let elementChecked = document.querySelectorAll('.heart');
for (let element of elementChecked) {
  element.addEventListener('click', () => {
	element.classList.toggle('heart--active') 
	});
}

let btnChecked = document.querySelectorAll('.btn');
for (let element of btnChecked) {
	element.addEventListener('mouseover', () => {
		element.classList.add('btn--active');
	});
	element.addEventListener('mouseleave', () => {
		element.classList.remove('btn--active');
	});
	element.addEventListener('click', () => {
		// element.style.background="#06174e";
		
		setTimeout(() => {
			element.style.display="none";
			element.nextElementSibling.style.display="flex";
		}, 250);

		
	});
}

let minusChecked = document.querySelectorAll('.cart__minus');
for (let element of minusChecked) {
	element.addEventListener('click', () => {
		let test = parseInt(element.nextElementSibling.innerHTML.replace('шт',''));
		if (test == 1){
			element.closest('.cart').style.display="none";
			let el = element.parentNode.previousElementSibling;
			el.style.display="block";
			// el.style.background="red";
			el.addEventListener('mouseover', () => {
				el.classList.add('btn--active');
			});
			el.addEventListener('mouseleave', () => {
				el.classList.remove('btn--active');
			});
			// element.addEventListener('mouseover', () => {
			// 	element.parentNode.previousElementSibling.style.background = "#1A45DB";
			// })	
			// element.addEventListener('mouseout', () => {
			// 	element.parentNode.previousElementSibling.style.background = "#1A45DB";
			// })
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