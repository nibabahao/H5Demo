
//ele代表滚动的区域的元素
//slider代表滚动条的小块
//content代表滚动条的长度

//自定义滚动条对象
function WheelScrollTop(ele,slider,content){
	this.ele=ele;
	this.slider=slider;
	this.content=content;
}
//滚轮事件兼容模式 鼠标滚动事件
WheelScrollTop.prototype.setScroll=function(){
	var slider=this.slider;
	var sliderBar=this.sliderBar;
	var content=this.content
		this.ele.onmousewheel=move;

	if(window.addEventListener){
		this.ele.addEventListener("DOMMouseScroll",move,false);
	}

//滚轮移动所绑定的事件
function move(e){
		var e=e||window.event;
		if(e.wheelDelta>0||e.detail<0){
					var sliderTop=slider.offsetTop;
					var minTop=0;
					sliderTop-=10;
					if(sliderTop<=minTop){
					sliderTop=minTop;
				}
					var scaleH=slider.offsetTop/slider.parentNode.offsetHeight;//内容移动的比例
					var contentTop=-content.offsetHeight*scaleH;	
					slider.style.top=sliderTop+"px";
					content.style.top=contentTop+"px";
		}else if(e.wheelDelta<0||e.detail>0){
					var sliderTop=slider.offsetTop;
					var maxTop=slider.parentNode.offsetHeight-slider.offsetHeight;
					sliderTop+=10;
					if(sliderTop>=maxTop){
						sliderTop=maxTop;
					}
					var scaleH=slider.offsetTop/slider.parentNode.offsetHeight;//内容移动的比例
					var contentTop=-content.offsetHeight*scaleH;
						slider.style.top=sliderTop+"px";
						content.style.top=contentTop+"px";
					}
	}




}


	//移动端touch事件
	WheelScrollTop.prototype.touchScroll=function(){
		var slider=this.slider;
		var content=this.content;
		this.slider.parentNode.addEventListener("touchstart",function(e){
			var e=e||window.event;
			var ofY=e.touches[0].clientY;
			var disY=this.getBoundingClientRect().top;
			var minTop=0;
			var maxTop=this.offsetHeight-slider.offsetHeight;
			var sliderTop=ofY-slider.offsetHeight/2-disY;
			if(sliderTop<=minTop){
				sliderTop=minTop;
			}else if(sliderTop>=maxTop){
				sliderTop=maxTop;
			}
			var scaleH=sliderTop/slider.parentNode.offsetHeight;//内容移动的比例
			slider.style.top=sliderTop+"px";
			content.style.top=-content.offsetHeight*scaleH+"px";
		},false);
	}

	//移动端拖拽事件
	WheelScrollTop.prototype.dragScroll=function(){
		var slider=this.slider;
		var content=this.content;
		slider.addEventListener("touchstart",function(e){
			var disY=e.touches[0].clientY-this.offsetTop;
			document.addEventListener("touchmove",eDafult,false);
			this.addEventListener("touchmove",function(e){
				sliderTop=e.touches[0].clientY-disY;
				var maxTop=this.parentNode.offsetHeight-slider.offsetHeight;
				if(sliderTop<=0){
					sliderTop=0;
				}else if(sliderTop>=maxTop){
					sliderTop=maxTop;
				}
				var scaleH=sliderTop/slider.parentNode.offsetHeight;//内容移动的比例
				slider.style.top=sliderTop+"px";
				content.style.top=-content.offsetHeight*scaleH+"px";
			});
		});
		slider.addEventListener("touchend",function(e){
			document.removeEventListener("touchmove",eDafult,false);
		})
	}

	function eDafult(e){
		e.preventDefault();
	}






