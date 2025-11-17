// Hero Section 
let currentSlide = 0;
  const slides = document.querySelectorAll('.hero-slide');
  const totalSlides = slides.length;
  const heroSlider = document.querySelector('.hero-slider');
  let autoSlideInterval;
  
  // Swipe/Drag variables
  let isDragging = false;
  let startX = 0;
  let currentX = 0;

  function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    
    if (n >= totalSlides) currentSlide = 0;
    if (n < 0) currentSlide = totalSlides - 1;
    
    slides[currentSlide].classList.add('active');
  }

  function changeSlide(direction) {
    currentSlide += direction;
    showSlide(currentSlide);
    resetAutoSlide();
  }

  function autoSlide() {
    currentSlide++;
    showSlide(currentSlide);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(autoSlide, 4000);
  }

  // Swipe functionality - Mouse events
  heroSlider.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX;
    heroSlider.classList.add('dragging');
  });

  heroSlider.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    currentX = e.pageX;
  });

  heroSlider.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    heroSlider.classList.remove('dragging');
    
    const diffX = currentX - startX;
    
    // If swipe distance is more than 50px
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        // Swiped right - go to previous
        changeSlide(-1);
      } else {
        // Swiped left - go to next
        changeSlide(1);
      }
    }
  });

  heroSlider.addEventListener('mouseleave', () => {
    if (isDragging) {
      isDragging = false;
      heroSlider.classList.remove('dragging');
    }
  });

  // Touch events for mobile
  heroSlider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX;
  });

  heroSlider.addEventListener('touchmove', (e) => {
    currentX = e.touches[0].pageX;
  });

  heroSlider.addEventListener('touchend', () => {
    const diffX = currentX - startX;
    
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        changeSlide(-1);
      } else {
        changeSlide(1);
      }
    }
  });

  // Initialize auto slide
  autoSlideInterval = setInterval(autoSlide, 5000);

  // Pause on hover
//   const heroSection = document.querySelector('.hero-section');
//   heroSection.addEventListener('mouseenter', () => {
//     clearInterval(autoSlideInterval);
//   });

  heroSection.addEventListener('mouseleave', () => {
    resetAutoSlide();
  });







// The World of AES 

function showTab(tabId, event) {
      document.querySelectorAll('.image-grid').forEach(el => el.style.display = 'none');
      document.getElementById(tabId).style.display = 'grid';

      document.querySelectorAll('.tabs button').forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');
    }



// Annoucement 

 let currentPosition = 0;
        const track = document.getElementById('carouselTrack');
        const cards = track.children;
        const totalCards = cards.length;
        let cardsToShow = 3;

        function updateCardsToShow() {
            if (window.innerWidth < 768) {
                cardsToShow = 1;
            } else if (window.innerWidth < 992) {
                cardsToShow = 2;
            } else {
                cardsToShow = 3;
            }
        }

        function moveCarousel(direction) {
            updateCardsToShow();
            const maxPosition = totalCards - cardsToShow;
            
            currentPosition += direction;
            
            if (currentPosition < 0) {
                currentPosition = 0;
            } else if (currentPosition > maxPosition) {
                currentPosition = maxPosition;
            }
            
            const cardWidth = cards[0].offsetWidth + 20; // card width + margin
            track.style.transform = `translateX(-${currentPosition * cardWidth}px)`;
        }

        // Update on window resize
        window.addEventListener('resize', () => {
            currentPosition = 0;
            track.style.transform = 'translateX(0)';
            updateCardsToShow();
        });

        // Initialize
        updateCardsToShow();