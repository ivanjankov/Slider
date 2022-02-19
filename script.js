const slider = document.getElementById('slider'),
	slides = Array.from(document.querySelectorAll('.single_slide')),
	sliderLinksArr = Array.from(document.querySelectorAll('.slider_image')),
	sliderImages = Array.from(document.querySelectorAll('.slider_img'));
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const sliderImgWidth = sliderImages[1].getBoundingClientRect().width;
const bgGlobe = document.getElementById('bg_globe');
const displayHalfWidth = window.innerWidth / 2;

let startPos = 0,
	isDragging = false,
	currTranslate = 0,
	startPosition = 0,
	prevTranslate = 0,
	animationID,
	sliderDragging = false,
	startingTranslate = 0,
	sliderImgMarginRight = 0,
	globeRotation = 0;

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
	let compoundSlideStyle = window.getComputedStyle(slide);
	sliderImgMarginRight = +compoundSlideStyle.marginRight.split('px')[0];
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
		rotateGlobe();
		translateSlider();
		positionBackSlider();
	}
}

function slideEnd() {
	if (sliderDragging !== true) {
		isDragging = false;
		translateSlider();
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
	let sumFullImgElement = sliderImgWidth + sliderImgMarginRight;
	let maxNegativeTranslate =
		startingTranslate - (lastImageBoundingRightStart - firstImageBoundingRight);
	if (direction == 'prev') {
		currTranslate -= sumFullImgElement;
		if (currTranslate < maxNegativeTranslate) {
			currTranslate = maxNegativeTranslate;
		}
		translateSlider();
		updateTranslateWhenDragOver();
		setTimeout(() => {
			cancelAnimationFrame(animationID);
			slider.style.transition = 'none';
		}, 701);
	} else if (direction == 'next') {
		currTranslate += sumFullImgElement;
		if (currTranslate > startingTranslate) {
			currTranslate = startingTranslate;
		}
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
	currTranslate = displayHalfWidth - sliderImgWidth / 2;
	startingTranslate = currTranslate;
	translateSlider();
	updateTranslateWhenDragOver();
}
positionSliderInMiddle();

// bring back slider if last/first slide reach center
const lastImageBoundingRightStart =
	sliderImages[sliderImages.length - 1].getBoundingClientRect().right;
const firstImageBoundingRight = sliderImages[0].getBoundingClientRect().right;

function positionBackSlider() {
	const lastImageBoundingRight =
		sliderImages[sliderImages.length - 1].getBoundingClientRect().right;
	const firstImageBoundingLeft = sliderImages[0].getBoundingClientRect().left;

	if (lastImageBoundingRight < displayHalfWidth) {
		currTranslate =
			startingTranslate -
			(lastImageBoundingRightStart - firstImageBoundingRight);
		translateSlider();
	} else if (firstImageBoundingLeft > displayHalfWidth) {
		currTranslate = displayHalfWidth - sliderImgWidth / 2;
		translateSlider();
	}
}

// globe rotation functionality

function calcRotationDeg() {
	let displayHalfWidth = window.innerWidth / 2;
	let maxSliderMovement = lastImageBoundingRightStart - displayHalfWidth;
	let degreeToPxOdd = 360 / maxSliderMovement;
	let currentBoundgright =
		sliderImages[sliderImages.length - 1].getBoundingClientRect().right;
	let currSliderMovement = currentBoundgright - displayHalfWidth;
	let totalDegrees = Math.round(360 - currSliderMovement * degreeToPxOdd);

	return totalDegrees;
}

function rotateGlobe() {
	let translation = calcRotationDeg();
	console.log(translation);
	bgGlobe.style.transform = `rotate(${translation}deg)`;
}
