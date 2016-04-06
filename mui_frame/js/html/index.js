var numDiv;
var work=null;
window.onload=function(){
	numDiv=document.getElementById('numDiv');
	document.getElementById("start").onclick=startwork;
	document.getElementById("stop").onclick=function(){
		if(work){
			work.terminate();
			work=null;
		}
	};
	
};
function startwork(){
	if(work){
		return;
	}
	work=new Worker('../js/html/count.js');
	work.onmessage=function(e){
		numDiv.innerHTML=e.data;
	}
}
