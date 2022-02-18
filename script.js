const slider = document.getElementById('slider'),
	slides = Array.from(document.querySelectorAll('.single_slide')),
	sliderImages = Array.from(document.querySelectorAll('.slider_image'));

let startPos = 0,
	isDragging = false,
	currTranslate = 0,
	startPosition = 0,
	prevTranslate = 0;

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
	return event.pageX;
}

function translateSlider() {
	slider.style.transform = `translateX(${currTranslate}px)`;
}

function updateTranslateWhenDragOver() {
	prevTranslate = currTranslate;
}
