const slider = document.getElementById('slider'),
	slides = Array.from(document.querySelectorAll('.single_slide')),
	sliderImages = Array.from(document.querySelectorAll('.slider_image'));

// prevent default behaviour when dragging images
imgPrevDefault();

function imgPrevDefault() {
	sliderImages.forEach((img) => {
		img.addEventListener('dragstart', (e) => {
			e.preventDefault();
		});
	});
}
