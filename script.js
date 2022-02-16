const slider = document.getElementById('slider'),
	slides = Array.from(document.querySelectorAll('.single_slide')),
	sliderImages = Array.from(document.querySelectorAll('.slider_image'));

let startPos = 0,
	isDragging = false,
	currTranslate = 0,
	curPosition = 0,
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
	// pc listeners
	slide.addEventListener('mousedown', slideStart());
	// slide.addEventListener('mouseleave', slideEnd);
	// slide.addEventListener('mousemove', slideMove);
	// slide.addEventListener('mouseup', slideEnd);
});

function slideStart() {
	return function (event) {
		curPosition = getPosition(event);
		isDragging = true;
		console.log(curPosition);
	};
}

function getPosition(event) {
	return event.pageX;
}
