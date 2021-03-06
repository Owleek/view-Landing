$(document).ready(function(){

	// =========================================== catch mobile resolution and set owl-carousel classes 

  let target = document.querySelector('.resume__list');
  let query = window.matchMedia("(max-width: 1023px)");

  if(query.matches) {
    target.classList.add('owl-carousel');
    target.classList.add('owl-theme');
    target.setAttribute('id', 'werewolf');
  } else {
    target.classList.remove('owl-carousel');
    target.classList.remove('owl-theme');
    target.removeAttribute('id', 'werewolf');
  }

	// =========================================== owl-carousel sets 

  $('#werewolf').owlCarousel({  
    loop: false,
    margin: 10,
    autoHeight:true,
    responsiveClass:true,
    responsive:{
      0:{
          items:1, 
          nav:false,
          dots:true,
          // loop:true
      },
      768:{
          items:2,
          nav:false,
          dots:true,
          slideBy:1,
          // loop:true
      },
      915:{
        items:3,
        nav:false,
        dots:true,
        slideBy:1,
        // loop:true
      }
    }
  });

  $('#carousel').owlCarousel({  
    loop: false,
    margin: 0,
    autoHeight:true,
    responsiveClass:true,
    responsive:{
      0:{
          items:1, 
          nav:false,
          dots:true
      },
      768:{
          items:2,
          nav:false,
          dots:true,
          slideBy:1,
          loop:false
      }
    }
	});
	

	// =========================================== scrollTo

  $("a.scrollTo").click(function(event){
    event.preventDefault();
    $("html, body").animate({scrollTop: $($(this).attr("href")).offset().top},500);
  });

	// =========================================== Sound toggler

	let audio = document.querySelector('#audio');
	let soundBtn =  document.querySelector('.js-sound-toggler');
	let soundTitle = document.querySelector('.js-sound-title');
	let evenOdd = 0;

	soundBtn.addEventListener('click', function(){
		evenOdd++;
		if(evenOdd % 2 !== 0) {
			audio.play();
			soundTitle.textContent = "Нажмите здесь, чтобы выключить звук";
		} else {
			audio.pause();
			soundTitle.textContent = "Нажмите здесь, чтобы включить звук";
		}
	});

	// =========================================== show stage info

  let infoBtns = document.querySelectorAll('.info-btn'); 

  infoBtns.forEach(function(item){
    item.addEventListener('click', function(){
      let parentsChildList =  Array.from(this.parentElement.children);
      parentsChildList.forEach(function(item){
        if(item.classList.contains('scene-info__text')) {
          item.classList.toggle('active');
        }
      });
    });
	})
	
  // =========================================== buttons active style

  // let btnAcept = document.querySelectorAll('.button_acept');

  // btnAcept.forEach(function(item){        
  //   item.addEventListener('click', function(){
  //     this.classList.add('active');
  //   })
	// });
	
	// =========================================== change hover effect on desctop to mobile click

	if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
	} else {
		document.querySelector('.resume__list').classList.add('no-touch');
	}

	let resumeCardInfoBtns = document.querySelectorAll('.resume-card__more');

	resumeCardInfoBtns.forEach(function(item){
		item.addEventListener('click', function(){
			item.closest('.resume-card').classList.toggle('active');
		})
	})

	// =========================================== Data collection
	
	let resumeCards = document.querySelectorAll('.resume-card');
	
	let dataComplete = false;

	const UserData = function () {

		this.data = {
			userName: 'Посетитель',
			gender: null,
			activity: null,
			protein: null,
			vegetables: null,
			food: null,
			labor: null,
			habbits: null,
			age: null,
			weight: null,
			height: null,
			new_weight: null,
		};

		this.handleChange = function (name, value) {
			if (name in this.data) {
				this.data[name] = value;

				for(let i = 0; i < resumeCards.length; i++) {
					calc(i, this.data);
				}

				dataComplete = Object.keys(this.data).every(key => !!this.data[key])
			}
		}

		this.checkKey = function (name) {
			if(this.data[name]) {
				return true;
			}
			return false;
		}
	};

	const data = new UserData();

	let gendorButtons = document.querySelectorAll('.start-screen__button');
  let activityArr = document.getElementsByName('activity');
  let meatArr = document.getElementsByName('meat');
  let seafoodArr = document.getElementsByName('seafood');
  let proteinArr = document.querySelectorAll('.js-protein');
  let vegetablesArr = document.getElementsByName('vegetables');
  let foodArr = document.getElementsByName('food');
  let laborArr = document.getElementsByName('labor');
	let habbitsArr = document.getElementsByName('habbits');
	let limit2 = document.querySelectorAll('.js-limit-2');
	let limit3 = document.querySelectorAll('.js-limit-3');
	let userNameInput = document.getElementById('user-name-input');
	let userName = document.querySelectorAll('.userName');
	let busy = false;

	gendorButtons.forEach(function(item){
		item.addEventListener('click', function() {
			data.handleChange('gender', this.value);
		})
	})

	// =========================================== inputs click change styles

  activityArr.forEach(function(item){
    item.addEventListener('change', function(){
			changeRadio(activityArr, item);
			data.handleChange('activity', this.value);
    })
	});

  meatArr.forEach(function(item){
    item.addEventListener('change', function(){
			let label = item.closest('label');
			let labelActive = label.classList.contains('active')
			let restrict = item.dataset.restrict === "meat";
						
			if(restrict) {
					for(let i = 0; i < meatArr.length; i++) {
						meatArr[i].closest('label').classList.remove('active')
					}
					if(labelActive) {
						label.classList.remove('active')
					} else {
						label.classList.add('active')
					}

			} else if (!labelActive && !restrict) {
				label.classList.add('active');
				for(let i = 0; i < meatArr.length; i++) {
					if(meatArr[i].dataset.restrict === "meat" && meatArr[i].closest('label').classList.contains('active')) {
						meatArr[i].closest('label').classList.remove('active');
					}
				}
			} else {
				label.classList.remove('active');
			}
    })
	});

  seafoodArr.forEach(function(item){
    item.addEventListener('change', function(){
			let label = item.closest('label');
			let labelActive = label.classList.contains('active')
			let restrict = item.dataset.restrict === "seafood";

			if(restrict) {
					for(let i = 0; i < seafoodArr.length; i++) {
						seafoodArr[i].closest('label').classList.remove('active')
					}
					if(labelActive) {
						label.classList.remove('active')
					} else {
						label.classList.add('active')
					}

			} else if (!labelActive && !restrict) {
				label.classList.add('active');
				for(let i = 0; i < seafoodArr.length; i++) {
					if(seafoodArr[i].dataset.restrict === "seafood" && seafoodArr[i].closest('label').classList.contains('active')) {
						seafoodArr[i].closest('label').classList.remove('active');
					}
				}
			} else {
				label.classList.remove('active');
			}
    })
	});

	proteinArr.forEach(function(item) {
		item.addEventListener('change', function() {
			if(verifyCheckboxChecked(proteinArr)) {
				data.handleChange('protein', this.value);
			} else {
				data.handleChange('protein', null);
			}
		})
	});
	
	vegetablesArr.forEach(function(item){
    item.addEventListener('change', function(){
			changeCheckbox(item);

			if(verifyCheckboxChecked(vegetablesArr)) {
				data.handleChange('vegetables', this.value);
			} else {
				data.handleChange('vegetables', null);
			}
    })
	});

	foodArr.forEach(function(item){
    item.addEventListener('change', function(){
			changeCheckbox(item);

			if(verifyCheckboxChecked(foodArr)) {
				data.handleChange('food', this.value);
			} else {
				data.handleChange('food', null);
			}
    })
	});

	laborArr.forEach(function(item){
    item.addEventListener('change', function(){
			changeRadio(laborArr,item);
			data.handleChange('labor', this.value);
    })
	});

	habbitsArr.forEach(function(item){
    item.addEventListener('change', function(){
			changeRadio(habbitsArr,item);
			data.handleChange('habbits', this.value);
    })
	});

	// =========================================== Limit input characters
	
	limit2.forEach(function(item) {
		item.addEventListener('keyup', function () {
			limitInputCharacters(2, item);
		})
	})
	
	limit3.forEach(function(item) {
		item.addEventListener('keyup', function () {
			limitInputCharacters(3, item);
		})
	})

	// =========================================== user params collect to Data

	let personData = document.getElementsByName('person-data');
	personData.forEach(function(item) {
		item.addEventListener('change', function(){
			if(item.id === "age") {
				data.handleChange('age', parseInt(item.value));

			} else if (item.id === "height") {
				data.handleChange("height", parseInt(item.value));
				
			} else if (item.id === "weight") {
				data.handleChange("weight", parseInt(item.value));
				
			} else if (item.id === "wish-weight") {
				data.handleChange("new_weight", parseInt(item.value));
				
			}
		});
	});

	// =========================================== get UserName and set to html

	userName.forEach(function(item){
		item.textContent = ` ${data.data.userName}, `;
	});

	userNameInput.addEventListener('change', function(){
		if(this.value === '' || this.value === null || this.value === undefined || this.value === " ") {
		} else {
			data.handleChange('userName', this.value);
	
			userName.forEach(function(item){
				item.textContent = ` ${data.data.userName}, `;
			});
		}
	});

	// =========================================== supporting functions

	function limitInputCharacters(limitNumber, item) {
		let characters = item.value.split('');
		if(characters.length > limitNumber) {
			item.value = item.value.substring(0, limitNumber);
		}
	}

	function changeCheckbox(item) {
		let label = item.closest('label');
		let labelActive = label.classList.contains('active');

		if(labelActive) {
			label.classList.remove('active')
		} else {
			label.classList.add('active')
		}
	}

	function changeRadio(arr, item) {
		for(let i = 0; i < arr.length; i++) {
			arr[i].closest('label').classList.remove('active');
		}
		item.closest('label').classList.add('active');
	}

	function verifyCheckboxChecked(arr) {
		for(let i =0; i < arr.length; i++) {
			if(arr[i].checked) {
				return true;
			}
		}
	}

	// =========================================== Data calculation function

	function calc(item, data){
		let sex = data.gender;
		let age = data.age;
		let height = data.height;
		let weight = data.weight;
		let active = data.activity;
		let new_weight = data.new_weight;
    let text_value = $(`.resume-card_${item} .resume-card__value`);
		let card = $(`.resume-card_${item}`);
		
		function removeCardClassIndex() {
			let maxIndexOfClasses = 10;
			for(let i = 0; i <= maxIndexOfClasses; i++) {
				card.removeClass(`class-${i}`);
			}
		}

		if(item == 1){
			let calc=Math.ceil((weight/((height/100)*(height/100)))*100)/100;

      if(calc <= 16){
				removeCardClassIndex();
        card.addClass(`class-1`);
        text_value.html('Выраженный дефицит массы тела');

      } else if (calc>16 && calc<=18.5){
				removeCardClassIndex();
        card.addClass(`class-2`);
        text_value.html('Недостаточная (дефицит) масса тела');

      } else if (calc>18.5 && calc<=24.99){
				removeCardClassIndex();
        card.addClass(`class-3`);
        text_value.html('Норма');

      } else if (calc>24.99 && calc<=35){
				removeCardClassIndex();
        card.addClass(`class-4`);
        text_value.html('Ожирение');

      } else if (calc>35){
				removeCardClassIndex();
        card.addClass(`class-5`);
        text_value.html('Ожирение резкое');
      }
        
		} else if (item == 2){
			//Метаболический возраст
      let mAge = '';
      
			if(sex == 1){
				mAge = Math.round(0.629 * age + 18.56);
			} else{
				mAge = Math.round(0.58 * age + 17.24);
      }

      if(mAge < 18) {
				removeCardClassIndex();
        card.addClass(`class-1`);
      } else if (mAge > 18 && mAge < 40) {
				removeCardClassIndex();
        card.addClass(`class-2`);
      } else if(mAge > 40) {
				removeCardClassIndex();
        card.addClass(`class-3`);
			}

			let devision = mAge % 10;
			let ageTag = 'лет';

			if(mAge < 21) {
				ageTag = 'лет';
			} else if (devision == 1) {
				ageTag = 'год';
			} else if (devision > 1 && devision < 5) {
				ageTag = 'года';
			} else if (devision > 5) {
				ageTag = 'лет';
			}

      text_value.html(`${mAge} ${ageTag}`);

		} else if (item == 3){
			//Калории
      let call_from='';
      let call_to='';
      let call_arrow='';
      let bmr='';
      let amr='';
			if(sex == 1){
				bmr=88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
			}else{
				bmr=447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
			}
			if(active == 1){
				amr=1.2;
			}else if(active == 2){
				amr=1.375;
			}else if(active == 3){
				amr=1.55;
			}else if(active == 4){
				amr=1.725;
			}else if(active == 5){
				amr=1.9;
			}
			call_from=Math.round((bmr*amr)-(bmr*amr)*0.2);
			call_to=call_from+100;
      text_value.html(call_from+'-'+call_to);
      
		} else if (item == 4){
			//Вода
      let l = 1;

			if(weight>=90){
				if(active==1){
					l=3;
				}else if(active==2 || active==3){
					l=3.5;
				}else if(active==4 || active==5){
					l=3.9;
				}
			}else if(weight>=80){
				if(active==1){
					l=2.5;
				}else if(active==2 || active==3){
					l=2.9;
				}else if(active==4 || active==5){
					l=3.3;
				}
			}else if(weight>=70){
				if(active==1){
					l=2.3;
				}else if(active==2 || active==3){
					l=2.5;
				}else if(active==4 || active==5){
					l=3;
				}
			}else if(weight>=60){
				if(active==1){
					l=1.8;
				}else if(active==2 || active==3){
					l=2.3;
				}else if(active==4 || active==5){
					l=2.6;
				}
			}else if(weight>=50){
				if(active==1){
					l=1.5;
				}else if(active==2 || active==3){
					l=2;
				}else if(active==4 || active==5){
					l=2.3;
				}
			}
			text_value.html(`${l} л`);
		}else if(item==5){
			//Похудение в зонах
			//Нечего считать
		}else if(item==6){
			//Достижимый вес
				let good_weight='';
				let label=" кг";
			if(weight>new_weight){
					let maxdown='';
				if(weight>=100){
					maxdown=8;
				}else if(weight>=70){
					maxdown=6;
				}else{
					maxdown=5;
				}
				if((weight-new_weight)<maxdown){
					good_weight=new_weight;
				}else{
					good_weight=weight-maxdown;
				}
			}else{
					let maxup=weight+weight/100*7;
				if(new_weight>=maxup){
					good_weight=maxup;
				}else{
					good_weight=new_weight;
				}
			}

			text_value.html(Math.round(good_weight)+label);
		}else if(item==7){
			//Мой вес
				let max_weight=250;
				let good_weight='';
				let label=" кг";

			if(weight>new_weight){
					let maxdown='';
					let dif=weight-new_weight;
				if(weight>=100){
					maxdown=8;
				}else if(weight>=70){
					maxdown=6;
				}else{
					maxdown=5;
				}
				if(dif<maxdown){
					good_weight=new_weight;
				}else{
					good_weight=weight-maxdown;
				}
			}else{
        let maxup=weight+weight/100*7;
				if(new_weight>=maxup){
					good_weight=maxup;
				}else{
					good_weight=new_weight;
				}
			}
			text_value.html(Math.round(good_weight)+label);
		} else if(item==8){
			//Кетогенная диета
			//Нечего считать 
		}
	}  

	// =========================================== Form prevent Default

	document.getElementById('mail-form').addEventListener('submit', function(event){
		event.preventDefault();
	})
	
	// =========================================== jump to next block

	let sectionIndex = 0;
	let stageIndex = 0;

	let sidebarFigures = document.querySelectorAll('.sidebar__figure');
	let progressbarPoints = document.querySelectorAll('.progress-bar__point');
	let stageFigures = document.querySelectorAll('.scene__stage-arts');
	let stages = document.querySelectorAll('.js-stage');
	let sections = document.querySelectorAll('.js-section');
	
	let stageNextButtons = document.querySelectorAll('.js-next-stage');
	let stagePrevButtons = document.querySelectorAll('.js-prev-stage');
	let sectionNextButtons = document.querySelectorAll('.js-next-section');
	let sectionPrevButtons = document.querySelectorAll('.js-prev-section');
	let homeButtons = document.querySelectorAll('.js-home');

	function addSectionClass() {
		if(sections[sectionIndex] !== undefined) {
			sections[sectionIndex].classList.add('active');			
		}
	};

	function removeSectionClass() {
		if(sections[sectionIndex] !== undefined) {
			sections[sectionIndex].classList.remove('active');			
		}
	};

	function addBlocksClass() {
		if(progressbarPoints[stageIndex] !== undefined) {
			progressbarPoints[stageIndex].classList.add('show');			
		}
		if(progressbarPoints[stageIndex + 1] !== undefined) {
			progressbarPoints[stageIndex + 1].classList.add('active');
		}
		if(progressbarPoints[stageIndex + 2] !== undefined){
			progressbarPoints[stageIndex + 2].classList.add('show');
		}
		if(sidebarFigures[stageIndex] !== undefined) {
			sidebarFigures[stageIndex].classList.add('active');
		}
		if(stageFigures[stageIndex] !== undefined) {
			stageFigures[stageIndex].classList.add('active');
		}
		if(stages[stageIndex] !== undefined) {
			stages[stageIndex].classList.add('active');
		}
	}

	function removeBlocksClass() {
		if(progressbarPoints[stageIndex] !== undefined) {
			progressbarPoints[stageIndex].classList.remove('show');			
		}
		if(progressbarPoints[stageIndex + 1] !== undefined) {
			progressbarPoints[stageIndex + 1].classList.remove('active');
		}
		if(progressbarPoints[stageIndex + 2] !== undefined){
			progressbarPoints[stageIndex + 2].classList.remove('show');
		}
		if(sidebarFigures[stageIndex] !== undefined) {
			sidebarFigures[stageIndex].classList.remove('active');
		}
		if(stageFigures[stageIndex] !== undefined) {
			stageFigures[stageIndex].classList.remove('active');
		}
		if(stages[stageIndex] !== undefined) {
			stages[stageIndex].classList.remove('active');
		}
	}

	function nextSection() {
		removeSectionClass();
		sectionIndex++;
		addSectionClass();
	}

	function prevSection() {
		removeSectionClass();
		sectionIndex--;
		addSectionClass();
	}

	function nextBlock() {
		removeBlocksClass();
		stageIndex++;
		addBlocksClass();
	}

	function prevBlock() {
		removeBlocksClass();
		stageIndex--;
		addBlocksClass();
	}

	function home() {
		removeSectionClass();
		removeBlocksClass();
		sectionIndex = 0;
		stageIndex = 0;
		addSectionClass();
		addBlocksClass();
	};

	stageNextButtons.forEach(function(item) {
		item.addEventListener('click', function(){
			$("html, body").stop().animate({scrollTop:0}, 500);
				if(data.checkKey(item.dataset.check)) {
					nextBlock();
				}
		});
	});

	stagePrevButtons.forEach(function(item) {
		item.addEventListener('click', function(){
			$("html, body").stop().animate({scrollTop:0}, 500);
			prevBlock();
		});
	});

	sectionNextButtons.forEach(function(item) {
		item.addEventListener('click', function(){
			$("html, body").stop().animate({scrollTop:0}, 500);
				nextSection();
		});
	});

	sectionPrevButtons.forEach(function(item) {
		item.addEventListener('click', function(){
			$("html, body").stop().animate({scrollTop:0}, 500);
			prevSection();
		});
	});

	homeButtons.forEach(function(item) {
		item.addEventListener('click', function(){
			home();
		});
	});

	// =========================================== Calc Data & Animation start trigger

  document.querySelector('.js-count-start').addEventListener('click', function (){
		if(dataComplete) {
			nextSection();

			if(!busy) {
				clearAnimationFootprint();
				setTimeout(animateCreation, 200);
			}
		}
	});

	function clearAnimationFootprint() {
		document.querySelector('.creation__success').classList.remove('active');
		document.querySelector('.fill-box__loader').classList.add('load-animation');
	}

	// =========================================== animation function

	function animateCreation() {
		let creationSuccess = document.querySelector('.creation__success');
		let loader = document.querySelector('.fill-box__loader');
		let percent = document.querySelector('.fill-box__progress');
		let textArr = document.querySelectorAll('.creation__text');
		let delay =   +(10000 / textArr.length).toFixed();
		let counter = 0;
		let index = 0;
		percent.textContent = '0';

		let percentTimeout = setTimeout(function tick(){
			counter++;
			percent.textContent = `${counter}%`;

			percentTimeout = setTimeout(tick, 96);

			if(counter >= 100) {
				clearTimeout(percentTimeout);
			}
		}, 96);

		textArr[index].classList.add('active');

		let textTimeout = setTimeout(function slide(){
			if(textArr[index] && textArr[index].classList.contains('active')) {
				textArr[index].classList.remove('active');
			}
			index++;
			if(textArr[index]) {
				textArr[index].classList.add('active');
			}

			textTimeout =  setTimeout(slide, delay);
			
			if(index >= textArr.length) {
				clearTimeout(textTimeout);
				setTimeout(function(){
					creationSuccess.classList.add('active');
				}, 500);
				busy = false;
				loader.style.height = '100%';
				loader.classList.remove('load-animation');
			}
		}, delay);
	};

	// =========================================== Timer

	startTimer('timer', 15);

	function startTimer(id, minuteLimit) {
		
		let deadline = new Date();
		deadline.setMinutes(deadline.getMinutes() + minuteLimit);
		
		let timerId = document.getElementById(id);
		let minutes, seconds; 

		minutes = timerId.querySelector('.minutes');  
		seconds = timerId.querySelector('.seconds');
		
		let minuteStamp, secondStamp;  
		
		function setTimer() {
			let deltaTimes = deadline - Date.now();
			
			if(deltaTimes <= 0) {
				clearTimeout(timerDue);
				minutes.textContent = `00`;
				seconds.textContent = `00`;
				return
			}
			
			minuteStamp = Math.floor(deltaTimes / 1000 / 60 % 60);
			secondStamp = Math.floor(deltaTimes / 1000 % 60);

			if(minuteStamp < 10) {
				minutes.textContent = `0${minuteStamp}`;
			} else minutes.textContent = `${minuteStamp}`;
			
			if(secondStamp < 10) {
				seconds.textContent = `0${secondStamp}`;
			} else seconds.textContent = `${secondStamp}`;
		}
		let timerDue = setInterval(setTimer, 1000);
	}		
});