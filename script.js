const slider = document.getElementById('slider'),
	slides = Array.from(document.querySelectorAll('.single_slide')),
	sliderLinksArr = Array.from(document.querySelectorAll('.slider_image')),
	sliderImages = Array.from(document.querySelectorAll('.slider_img'));
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const sliderImgWidth = sliderImages[1].getBoundingClientRect().width;

let startPos = 0,
	isDragging = false,
	currTranslate = 0,
	startPosition = 0,
	prevTranslate = 0,
	animationID,
	sliderDragging = false;

// prevent default behaviour when dragging images

imgPrevDefault();

function imgPrevDefault() {
	sliderLinksArr.forEach((img) => {
		img.addEventListener('dragstart', (e) => {
			e.preventDefault();
		});
	});
}

// add event listener to slides

slides.forEach((slide) => {
	// functions
	slide.addEventListener('click', (e) => {
		if (sliderDragging == true) {
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
		sliderDragging = false;
	};
}

function slideMove() {
	if (isDragging) {
		sliderDragging = true;
		const currPosition = getPosition(event);
		currTranslate = prevTranslate + currPosition - startPosition;
		translateSlider();
	}
}

function slideEnd() {
	if (sliderDragging !== true) {
		isDragging = false;
		return;
	}
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

// next & prev button functionality

function moveSliderWhenBtnPressed(direction) {
	if (direction == 'prev') {
		currTranslate -= sliderImgWidth;
		translateSlider();
		updateTranslateWhenDragOver();
		setTimeout(() => {
			cancelAnimationFrame(animationID);
			slider.style.transition = 'none';
		}, 701);
	} else if (direction == 'next') {
		currTranslate += sliderImgWidth;
		translateSlider();
		updateTranslateWhenDragOver();
		setTimeout(() => {
			cancelAnimationFrame(animationID);
			slider.style.transition = 'none';
		}, 701);
	}
}

prevBtn.addEventListener('click', () => {
	moveSliderWhenBtnPressed('prev');
	animate();
});

nextBtn.addEventListener('click', () => {
	moveSliderWhenBtnPressed('next');
	animate();
});

// move slider to the center of the screen

function positionSliderInMiddle() {
	const screenHalfSize = window.innerWidth / 2;
	currTranslate = screenHalfSize - sliderImgWidth / 2;
	translateSlider();
	updateTranslateWhenDragOver();
}
positionSliderInMiddle();
