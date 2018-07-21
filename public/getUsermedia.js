const video=document.querySelector("#video");
const selfImage_canvas=document.querySelector('#selfImage_canvas');
const selfImage_ctx=selfImage_canvas.getContext('2d');
const socket=io();
const playImg=document.querySelector("#playImg");
video.style.display='none';
function getMedia(){
	navigator.mediaDevices.getUserMedia({
		video:{width:'640',height:'480'},
		audio:false
	}).then(function(stream){
		video.srcObject=stream;	
	}).catch(console.error);
};

function toSenderCanvas(){
	selfImage_ctx.drawImage(video,0,0,640,480);
 	socket.emit('stream',selfImage_canvas.toDataURL('image/webp'));
	window.requestAnimationFrame(toSenderCanvas);	
};

socket.on('stream',function(image){
	playImg.src=image;
});


window.addEventListener('load',function(){
	getMedia();
	toSenderCanvas();
},false);

