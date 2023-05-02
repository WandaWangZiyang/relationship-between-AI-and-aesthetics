let mic;
let fft;
let samples;
let slider;

var circles = [];
var lines = [];
var freq = 1024;
var spectrum;

function preload() {
	img = loadImage('image.jpg');
}


function setup() {
	createCanvas(windowWidth * 0.98, windowHeight * 0.8);

	background(255);

	//create a slider
	slider = createSlider(0.1, 2, 1, 0);
	slider.style('width', '300px');
	slider.style('height', '30px');
	slider.style('position', 'absolute');
	slider.style('bottom', '40px');
	slider.style('left', '32px');
	slider.style('z-index', '1');


	mic = new p5.AudioIn();
	mic.start();
	fft = new p5.FFT(0, 256);
	fft.setInput(mic);

	ellipseMode(CENTER);

	for (var i = 0; i < freq; i++) {
		circles.push(new Circle());
		lines.push(new Line());
	}
}

function draw() {
	background(255,0.1);
	spectrum = fft.analyze();

	for (var i = 0; i < freq; i++) {
		var myDiam = map(spectrum[i], 0, 255, 0, 20);
		var mySpeed = map(spectrum[i], 0, 255, 0, 50);
		circles[i].speed = floor(mySpeed);
		circles[i].diameter = floor(myDiam);
		circles[i].display();
		circles[i].move();

		var myLength = map(spectrum[i], 0, 255, 0, 500);
		var myAngle = map(spectrum[i], 0, 255, 0.0, 2 * PI);
		lines[i].length = myLength;
		lines[i].angle = myAngle;
		lines[i].display();
	}
}



function start() {
	getAudioContext().resume()
}

function Circle() {
	this.x = random() * width;
	this.y = random() * height;
	this.diameter = 20 * slider.value();
	this.color = img.get(this.x, this.y);
	this.speed = 0;
	this.move = function () {
		this.x += random(-this.speed, this.speed);
		this.y += random(-this.speed, this.speed);
	}
	this.display = function () {
		noStroke();
		fill(this.color);
		ellipse(this.x, this.y, this.diameter, this.diameter);
	};
}

function Line() {
	this.x = random() * width;
	this.y = random() * height;
	this.length = 10* slider.value();
	this.angle = 0.0;
	this.color = img.get(this.x, this.y);
	this.display = function () {
		stroke(this.color);
		strokeWeight(0.5);
		push();
		translate(this.x, this.y);
		rotate(this.angle);
		line(this.x, this.y, this.x + this.length, this.y + this.length);
		pop();
	};
}
