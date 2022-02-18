const slider = document.getElementById('slider'),
	slides = Array.from(document.querySelectorAll('.single_slide')),
	sliderImages = Array.from(document.querySelectorAll('.slider_image'));
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let startPos = 0,
	isDragging = false,
	currTranslate = 0,
	startPosition = 0,
	prevTranslate = 0;
animationID;

// prevent default behaviour when dragging images

imgPrevDefault();

function imgPrevDefault() {
	sliderImages.forEach((img) => {
		img.addEventListener('dragstart', (e) => {
			e.preventDefault();
		});
	});
}

// add event listener to slides

slides.forEach((slide) => {
	// functions
	slide.addEventListener('click', (e) => {
		if (dragged == true) {
			e.preventDefault();
		}
	});

	// touch listeneres
	slide.addEventListener('touchstart', slideStart());
	slide.addEventListener('touchend', slideEnd);
	slide.addEventListener('touchmove', slideMove);

	// pc listeners
	slide.addEventListener('mousedown', slideStart());
	slide.addEventListener('mouseleave', slideEnd);
	slide.addEventListener('mousemove', slideMove);
	slide.addEventListener('mouseup', slideEnd);
});

function slideStart() {
	return function (event) {
		startPosition = getPosition(event);
		isDragging = true;
	};
}

function slideMove() {
	if (isDragging) {
		const currPosition = getPosition(event);
		currTranslate = prevTranslate + currPosition - startPosition;
		translateSlider();
	}
}

function slideEnd() {
	isDragging = false;
	updateTranslateWhenDragOver();
}

function getPosition(event) {
	return event.type.includes('mouse') ? event.pageX : event.touches[0].screenX;
}

function translateSlider() {
	slider.style.transform = `translateX(${currTranslate}px)`;
}

function updateTranslateWhenDragOver() {
	prevTranslate = currTranslate;
}

function animate() {
	slider.style.transition = `transform 300ms ease`;
	animationID = requestAnimationFrame(animate);
}
