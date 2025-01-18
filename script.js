'use strict';

{
// !Sidebar toggle
const sideBar = document.querySelector('.sidebar')
const toggleBtn = document.querySelector('.sidebar-info__btn')
const arrowUp = document.querySelector('.sidebar-info__svg');

toggleBtn.addEventListener('click', () => {
    if (sideBar.classList.contains('active')) {
        sideBar.classList.remove('active');
        arrowUp.classList.remove('svg-active');
    } else {
        sideBar.classList.add('active');
        arrowUp.classList.add('svg-active');
    }
});

// !Sidebar Text
const textElement = document.querySelector('.sidebar-info__text');
const strings = ['Web Developer --', 'Freelancer --', 'AI Chatbot --', 'Targetologist --'];
const typingSpeed = 100;
const backSpeed = 100;
const pauseTime = 1500;

let charIndex = 0;
let stringIndex = 0;
let isDeleting = false;

function type() {
  const currentString = strings[stringIndex];
  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  textElement.textContent = currentString.substring(0, charIndex);

  if (!isDeleting && charIndex === currentString.length) {
    isDeleting = true;
   setTimeout(type, pauseTime);
  }
  else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    stringIndex = (stringIndex + 1) % strings.length;
    setTimeout(type, typingSpeed);
  }
  else {
    const delay = isDeleting ? backSpeed : typingSpeed;
    setTimeout(type, delay);
  }
    }

    type();
}

{
 // Modal
const testimonialsItem = document.querySelectorAll(".certificate__item");
const modalContainer = document.querySelector(".modal");
const modalCloseBtn = document.querySelector(".modal-container__close");
const overlay = document.querySelector(".overlay");

// modal variable
const modalImg = document.querySelector(".modal-wrapper__img");
const modalTitle = document.querySelector(".modal-wrapper__title");
const modalTime = document.querySelector(".modal-wrapper__time");
const modalText = document.querySelector(".modal-wrapper__text");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector(".certificate__figure-img").src;
    modalImg.alt = this.querySelector(".certificate__figure-img").alt;
    modalTitle.innerHTML = this.querySelector(".certificate__item-title").innerHTML;
    modalTime.innerHTML = this.querySelector(".certificate__item-time").getAttribute("datetime");
    modalText.innerHTML = this.querySelector(".certificate__item-text").innerHTML;

    testimonialsModalFunc();

  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);
}

{
  // ! Skills progress
  const skillElement = document.querySelectorAll(".skill-dev__item");

  const skillData = [
    { element: skillElement[0], endValue: 45, color: 'hsl(35, 100%, 68%)' }, // Frontend
    { element: skillElement[1], endValue: 60, color: 'hsl(35, 100%, 68%)' }, // AI chatbot
  ];

  skillData.forEach(skill => {
    let startValue = 0;
    const progressText = skill.element.querySelector(".skill-dev__num");
    const speed = 100;

    const progressInterval = setInterval(() => {
      startValue++;
      progressText.textContent = `${startValue}%`;

      skill.element.style.background = `conic-gradient(${skill.color} ${startValue * 3.6}deg, #ededed 0deg)`;

      if (startValue >= skill.endValue) {
        clearInterval(progressInterval);
      }
    }, speed);
  });


  function animateProgress(skillElement, targetPercent) {
    let currentPercent = 0; // Начальное значение процента
    const speed = 40; // Скорость анимации (меньше = быстрее)
    const increment = 1; // Шаг увеличения

    // Анимация
    const interval = setInterval(() => {
        currentPercent += increment;
        if (currentPercent > targetPercent) {
            currentPercent = targetPercent; // Останавливаем на заданном значении
            clearInterval(interval); // Завершаем анимацию
        }

        // Обновляем текст внутри tooltip
        skillElement.querySelector('.skill__tooltip').textContent = `${currentPercent}%`;

        // Обновляем ширину прогресс-бара
        skillElement.style.width = `${currentPercent}%`;
    }, speed);

}

// Получаем все элементы с классом "skill__per"
const skillElements = document.querySelectorAll('.skill__per');

// Проходим по каждому элементу и запускаем анимацию
skillElements.forEach(skillElement => {
    const tooltipText = skillElement.querySelector('.skill__tooltip').textContent; // Получаем процент из tooltip
    const targetPercent = parseInt(tooltipText, 10); // Преобразуем текст в число
    animateProgress(skillElement, targetPercent); // Запускаем анимацию
});
}

{
  // Portfolio select
  const select = document.querySelector('.portfolio-projects__select')
  const selectItems = document.querySelectorAll('.portfolio-projects__btn')
  const selectValue = document.querySelector('.portfolio-projects__select-value')
  const filterBtn = document.querySelectorAll('.portfolio-filter__btn')

  const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

  select.addEventListener('click', function() {
    elementToggleFunc(this);
  })

  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
    
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);
    
    });
  }

  // Filter variables

  const filterItems = document.querySelectorAll('.portfolio__item');

  const filterFunc = function (selectedValue) {
    
    for (let i = 0; i < filterItems.length; i++) {
      if (selectedValue === "all") {
        filterItems[i].classList.add('active');
      } else if (selectedValue === filterItems[i].dataset.category) {
        filterItems[i].classList.add('active');
      } else {
        filterItems[i].classList.remove('active');
      }
    }
  }

  // Add event in all filter button items for large screen
  let lastClickedBtn = filterBtn[0];

  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener('click', function () {
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      filterFunc(selectedValue)

      lastClickedBtn.classList.remove('active');
      this.classList.add('active');
      lastClickedBtn = this;
    })

 }
}

{
  // Contact form variables
  const form = document.querySelector('.contact-info__form');
  const formInputs = document.querySelectorAll('.contact-input');
  const formBtn = document.querySelector('.contact-info__btn');

  // Add event to all form input field 
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
  
      // check form validation
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
  
    });
  }
}

{
  // Page navigation variables
  const navigationLinks = document.querySelectorAll('.navbar__link');
  const pages = document.querySelectorAll('[data-page]')

  // Add event to all nav link
  for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", function () {
  
      for (let i = 0; i < pages.length; i++) {
        if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
          pages[i].classList.add("active");
          navigationLinks[i].classList.add("active");
          window.scrollTo(0, 0);
        } else {
          pages[i].classList.remove("active");
          navigationLinks[i].classList.remove("active");
        }
      }
  
    });
  }

}

