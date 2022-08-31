// Help https://developer.mozilla.org/pt-BR/docs/DragDrop/Drag_and_Drop

let dropBox;
let imageCount = 1;
let imageAsset = new Set();

const dragenter = (e) => {
	e.stopPropagation();
	// Prevent default action so it doesn't open the image
	// in the browser window.
	e.preventDefault();
};
const dragover = (e) => {
	e.stopPropagation();
	e.preventDefault();
};

let drop = (e) => {
	e.stopPropagation();
	e.preventDefault();

	let data = e.dataTransfer;
	let files = data.files;

	handleFiles(files);
};

//Event handlers
dropBox = document.getElementById('dropBox');
dropBox.addEventListener('dragenter', dragenter, false);
dropBox.addEventListener('dragover', dragover, false);
dropBox.addEventListener('drop', drop, false);

let handleFiles = (files) => {
	imageAsset.add(imageCount++);
	// let imageName = `Image_${imageCount-1}`;

	for (let i = 0; i < files.length; i++) {
		//Get the next files
		let file = files[i];
		let imageType = /image.*/;

		//Validation for image filetype
		if (!file.type.match(imageType)) {
			continue;
		}
		let img = document.createElement('img');
		img.classList.add('obj');
		img.file = file;

		let reader = new FileReader();
		reader.onload = (function (anImage) {
			return function (e) {
				anImage.onload = function () {
					let canvas = document.createElement('canvas');
					let canvasContent = canvas.getContext('2d');
					canvas.width = anImage.width;
					canvas.height = anImage.height;
					canvasContent.drawImage(anImage, 0, 0);

					let newImage = new Image();
					newImage.onload = function () {
						newImage.id = `newImage${imageAsset.size}`;
						// Criterion 1.1.1
						newImage.alt = `Image ${imageAsset.size}`;
						document.getElementById('viewBox').appendChild(newImage);
						console.log(
							`Real image size:
          Width: ${anImage.width}
          Height: ${anImage.height}`,
						);
					};
					newImage.src = canvas.toDataURL('image/jpeg');
				};
				anImage.src = e.target.result;
			};
		})(img);
		reader.readAsDataURL(file);
	}
	console.log(`Number of images: ${imageAsset.size}`);
	// console.log(imageName)
};


window.onload = getExif;

function getExif() {
	var img1 = document.getElementById('newImage1');
	EXIF.getData(img1, function () {
		var make = EXIF.getTag(this, 'Make');
		var model = EXIF.getTag(this, 'Model');
		var makeAndModel = document.getElementById('makeAndModel');
		makeAndModel.innerHTML = `${make} ${model}`;
	});

	var img2 = document.getElementById('newImage2');
	EXIF.getData(img2, function () {
		var allMetaData = EXIF.getAllTags(this);
		var allMetaDataSpan = document.getElementById('allMetaDataSpan');
		allMetaDataSpan.innerHTML = JSON.stringify(allMetaData, null, '\t');
	});
}