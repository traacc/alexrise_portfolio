import i18Obj from './translate.js';
document.addEventListener('DOMContentLoaded', () => {
	
	function getLocalStorage() {
		if(localStorage.getItem('lang')) {
			const lang = localStorage.getItem('lang');
			getTranslate(lang);
		}
		if(localStorage.getItem('theme')) {
			const theme = localStorage.getItem('theme');
			switchTheme();
		}
	}
	window.addEventListener('load', getLocalStorage)
	let curTheme = 'dark';
	/* Burger Menu block */
	document.body.querySelector('.nav__button').addEventListener('click', function(){
		document.body.querySelectorAll('.nav__button span').forEach((currentValue)=>currentValue.classList.toggle('open'));
		document.body.querySelector('.nav__list').classList.toggle('show_menu');
		document.body.querySelector('.menu_overlay').classList.toggle('active');
	});
	document.body.querySelector('.menu_overlay').addEventListener('click', function(){
		document.body.querySelectorAll('.nav__button span').forEach((currentValue)=>currentValue.classList.remove('open'));
		document.body.querySelector('.nav__list').classList.remove('show_menu');
		document.body.querySelector('.menu_overlay').classList.remove('active');
	});
	document.body.querySelectorAll('.nav__item a').forEach(
		(currentValue)=>currentValue.addEventListener('click', function(){
			document.body.querySelectorAll('.nav__button span').forEach((currentValue)=>currentValue.classList.remove('open'));
			document.body.querySelector('.nav__list').classList.remove('show_menu');
			document.body.querySelector('.menu_overlay').classList.remove('active');
		}));

	/* Portfolio block */
	const portfolioImages = document.body.querySelectorAll('.portfolio__image');
	const btnPortfolio = document.body.querySelectorAll('.season__btn');
	
	function changeColorBtnSeason(season){
		btnPortfolio.forEach((val)=>{val.classList.add('btn--black');})
		season.classList.remove('btn--black');
		
	}
	btnPortfolio.forEach((val)=>val.addEventListener('click', function(){
		switch (this.dataset.season) {
			case 'winter':

				portfolioImages.forEach((img, index) => img.src = `./img/winter/${index + 1}.jpg`);
				break;
			case 'spring':
				portfolioImages.forEach((img, index) => img.src = `./img/spring/${index + 1}.jpg`);
				break;
			case 'summer':
				portfolioImages.forEach((img, index) => img.src = `./img/summer/${index + 1}.jpg`);
				break;
			case 'autumn':
				portfolioImages.forEach((img, index) => img.src = `./img/autumn/${index + 1}.jpg`);
				break;
			default:
				break;
		}
		changeColorBtnSeason(this);
	}));

	/* I18n block */
	function getTranslate(lang){
		const transElems = document.body.querySelectorAll("[data-i18]");
		
		transElems.forEach((val)=>{
			val.textContent=i18Obj[lang][val.dataset.i18];
			if (val.placeholder) {
				val.placeholder = i18Obj[lang][val.dataset.i18];
				val.textContent = '';
			}
		});
		setLangsLabel(lang);
		window.addEventListener('beforeunload', ()=>{localStorage.setItem('lang', lang);})

	}
	function setLangsLabel(label){
		const langsLabel = document.body.querySelectorAll(".header__langs *");
		langsLabel.forEach((val)=>val.classList.remove('active'));
		document.body.querySelector(".header__langs--" + label).classList.add('active');
	}
	document.body.querySelector('.header__langs--en').addEventListener('click', function(){getTranslate('en');setLangsLabel('en')});
	document.body.querySelector('.header__langs--ru').addEventListener('click', function(){getTranslate('ru');setLangsLabel('ru')});

	/* Theme block */
	function switchTheme(){
		const themeElems = document.querySelectorAll("[data-theme]");
		let theme = '';
		console.log(themeElems);
		themeElems.forEach((val)=>{
			val.classList.toggle('light-theme');
		});
		if(!localStorage.getItem('theme')||localStorage.getItem('theme')=='dark') theme = 'light'
		else theme = 'dark';
		window.addEventListener('beforeunload', ()=>{localStorage.setItem('theme', theme);});
	}
	document.body.querySelector('.nav__switch').addEventListener('click', function(){

			switchTheme();
	});
	/* Button Effects */
	const buts = document.querySelectorAll('.ripple').forEach((el)=>el.addEventListener('click', function(e){
		const x = e.clientX
		const y = e.clientY

		const buttonTop = e.target.offsetTop
		const buttonLeft = e.target.offsetLeft
	  
		const xInside = x - buttonLeft
		const yInside = y - buttonTop
	  
		const circle = document.createElement('span')
		circle.classList.add('circle')
		circle.style.top = yInside + 'px'
		circle.style.left = xInside + 'px'
	  
		this.appendChild(circle)
	  
		setTimeout(() => circle.remove(), 500)
	}));

});