/* ------------------CAROUSEL----------------*/
const container = document.querySelector('.slider-container');
const slider = document.querySelector('.slider');
const Buttonn = document.querySelectorAll('.slider-container button');
const nextButton = document.querySelector('.slider-next');
const slides = slider.querySelector('.slider-item').offsetWidth;
const sliderChildrens = [...slider.children];
let currentSlide = 0;
let cardPerView = Math.round(slider.offsetWidth / slides);
let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

sliderChildrens.slice(-cardPerView).reverse().forEach(card => {
  slider.insertAdjacentHTML("afterbegin", card.outerHTML);
});

sliderChildrens.slice(0, cardPerView).forEach(card => {
  slider.insertAdjacentHTML("beforeend", card.outerHTML);
});

slider.classList.add("no-transition");
slider.scrollLeft = slider.offsetWidth;
slider.classList.remove("no-transition");

Buttonn.forEach(btn => {
  btn.addEventListener("click", () => {
      slider.scrollLeft += btn.id == "left" ? -slides : slides;
  });
});

const dragStart = (e) => {
  isDragging = true;
  slider.classList.add("dragging");
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = slider.scrollLeft;
}
const dragging = (e) => {
  if(!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  slider.scrollLeft = startScrollLeft - (e.pageX - startX);
}
const dragStop = () => {
  isDragging = false;
  slider.classList.remove("dragging");
}

const infiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if(slider.scrollLeft === 0) {
      slider.classList.add("no-transition");
      slider.scrollLeft = slider.scrollWidth - (2 * slider.offsetWidth);
      slider.classList.remove("no-transition");
  }
  // If the carousel is at the end, scroll to the beginning
  else if(Math.ceil(slider.scrollLeft) === slider.scrollWidth - slider.offsetWidth) {
      slider.classList.add("no-transition");
      slider.scrollLeft = slider.offsetWidth;
      slider.classList.remove("no-transition");
  }
  // Clear existing timeout & start autoplay if mouse is not hovering over carousel
  clearTimeout(timeoutId);
  if(!container.matches(":hover")) autoPlay();
}

const autoPlay = () => {
  if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
  // Autoplay the carousel after every 2500 ms
  timeoutId = setTimeout(() => slider.scrollLeft += slides, 2500);
}
autoPlay();
slider.addEventListener("mousedown", dragStart);
slider.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
slider.addEventListener("scroll", infiniteScroll);
container.addEventListener("mouseenter", () => clearTimeout(timeoutId));
container.addEventListener("mouseleave", autoPlay);
/* ------------------CAROUSEL----------------*/

/* ------------------SEND WHATSAPP MESSAGE----------------*/
function send_handle(item, valor, imgID) {
var imgElement = document.getElementById(imgID);
var imgURL = imgElement.src;

var texto = `*Nova Solicitação:*

Olá, gostaria de comprar o produto abaixo:
        
*${item}*
*${valor}*
        
*Link do Produto:*
${imgURL}
`;

var encodedTexto = encodeURI(texto);

var win = window.open(`https://wa.me/5547984692621?text=${encodedTexto}`, '_blank');
}
/* ------------------SEND WHATSAPP MESSAGE----------------*/


