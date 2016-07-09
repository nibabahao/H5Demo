var slider=$(".slider").get(0);
var explan_detail=$(".explan_detail").get(0);
var sliderBar=$(".sliderBar").get(0);
var content=$(".explan_detail dl").get(0);



function wheelScrollTop(ele,down,up,slider,content){
	ele.onmousewheel=move;

	if(window.addEventListener){
		ele.addEventListener("DOMMouseScroll",move,false);
	}
	function move(e){
		var e=e||window.event;
		if(e.wheelDelta>0||e.detail<0){
			up();
		}else if(e.wheelDelta<0||e.detail>0){
			down();
		}
	}
}

wheelScrollTop(explan_detail,down,up,slider);


	//滚轮向下的时按钮向下
	function down(){
		var sliderTop=slider.offsetTop;
		var maxTop=slider.parentNode.offsetHeight-slider.offsetHeight;
		var scaleH=slider.offsetTop/slider.parentNode.offsetHeight;//内容移动的比例
		var contentTop=-content.offsetHeight*scaleH;
		sliderTop+=10;
		if(sliderTop>=maxTop){
			sliderTop=maxTop;
		}
		slider.style.top=sliderTop+"px";
		content.style.top=contentTop+"px";
	}
	//滚轮向上的时按钮向上
	function up(){
		var sliderTop=slider.offsetTop;
		var minTop=0;
		sliderTop-=10;
		var scaleH=slider.offsetTop/slider.parentNode.offsetHeight;//内容移动的比例
		var contentTop=-content.offsetHeight*scaleH;		
		if(sliderTop<=minTop){
			sliderTop=minTop;
		}
		slider.style.top=sliderTop+"px";
		content.style.top=contentTop+"px";
	}
