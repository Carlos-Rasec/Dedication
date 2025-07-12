const countdownElement = document.getElementById("countdown");

const dedicationDate = new Date(2025, 6, 13, 8, 45, 0); // 13/07/2025 às 08:45:00

function updateCountdown() {
  const now = new Date();
  const timeLeft = dedicationDate - now;

  if (timeLeft <= 0) {
    countdownElement.innerHTML = `
      A dedicação começou!<br><br>
      <a href="https://jworg.zoom.us/j/83779598569?pwd=a5yRSGxuYinydJp1K5SffO3YbgY8nV.1" 
         target="_blank" 
         style="color: blue; text-decoration: underline;">
        Clique aqui para entrar no Zoom
      </a>`;
    clearInterval(timer);
    return;
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  countdownElement.innerText =
    `Faltam ${days} dias ${hours}h ${minutes}min ${seconds}s`;
}

updateCountdown();
const timer = setInterval(updateCountdown, 1000);




const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
const totalSlides = images.length;

const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dotsContainer = document.querySelector('.dots');

let currentIndex = 0;
let autoSlide;

// Cria bolinhas
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement('button');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll('.dots button');

function updateSlider() {
  const slideWidth = document.querySelector('.slider').clientWidth;
  slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlider();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateSlider();
}

function goToSlide(index) {
  currentIndex = index;
  updateSlider();
}

// Eventos dos botões
nextBtn.addEventListener('click', () => {
  nextSlide();
  restartAutoSlide();
});

prevBtn.addEventListener('click', () => {
  prevSlide();
  restartAutoSlide();
});

function startAutoSlide() {
  autoSlide = setInterval(nextSlide, 4000);
}

function restartAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}

// Iniciar carrossel
window.addEventListener('load', () => {
  updateSlider();
  startAutoSlide();
});

// Atualiza slide ao redimensionar (responsivo)
window.addEventListener('resize', updateSlider);

