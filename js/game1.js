/****
***	num为当前关卡数
****Titlesrc为当前关卡的标题图片路径
***/

function Game(num,Titlesrc){
	this.num=num;
	this.Titlesrc=Titlesrc;
}
function rnd(min,max){
	return parseInt(Math.random()*(max-min))+min;
}
//创建关卡的所有框架
Game.prototype.CreateEle=function () {
	var num=this.num;
	// 当第五关5的时候要跟第四关一样
	if(num==5){
		num-=1;
	}
	$("#wrap").html('<header>'+
		'</header>'+
		'<div class="game_content">'+
			'<img src="Images/page_square.png" class="container">'+
			'<div class="game_block game_block'+num+'">'+
			'</div>'+
			'<p class="game_time">88:88</p>'+
		'</div>'+
		'<img src="Images/page_game'+this.num+'_star1.png" class="game'+this.num+'_star0 str0_animate">'+
		'<img src="Images/page_game1_star.png" class="game1_star1 str1_animate">'
		);
}
//创建当前关卡的相应元素
Game.prototype.CreateMianEle=function(){
	//创建标题
	var img=new Image();
	var n=this.num;
	var flagCus=0;//标记第五关的改变或第七关
	var arr=[];//创建存蓄铁盔随机数组
	img.src=this.Titlesrc;
	$(img).appendTo($("header"));
	//创建徐峥出现的位置随机数
	var imgNum=n<=5?rnd(0,(this.num+1)*(this.num+1)):rnd(0,this.num*this.num);
	//创建要生产图片的数量
	var len=(n>=5)?(n*n):(n+1)*(n+1);
	// 当第五关时候创建4个铁盔的坐标第五关出现6个
	if(n==5||n==7){
		flagCus=this.num;
		n-=1;
		imgNum=rnd(0,n+1*n+1);
		//生产所有铁盔的数量
		for(var j=0;j<n;j++){
			var num=rnd(0,n+1*n+1);
			//遍历所有铁盔位置随机数确保不能重复
			while(arr.indexOf(num)!=-1){
				num=rnd(0,n+1*n+1);
			}
			arr.push(num);
		}
		//确保徐峥头像不能与铁盔位置函数重复
		while(arr.indexOf(imgNum)!=-1){
			imgNum=rnd(0,n+1*n+1);
		}
	}
		console.log(imgNum);
	for(var i=0;i<len;i++){
		var img=new Image();
		//当等于徐峥随机数时换成头像
		if(i==imgNum){
			img.src="Images/page_gameHead.png";
			$(img).on("click",function(){
				if(flagCus!=0){
					$imgAlert=$("<img src='Images/page_game"+flagCus+"_alert.png' class='game_alert'>");
					n=flagCus;
				}else{
					$imgAlert=$("<img src='Images/page_game"+n+"_alert.png' class='game_alert'>");
				}
				$imgAlert.appendTo($("#wrap")).delay(1000).fadeOut(function(){
					n++;
					if(n==9){
						$("#wrap").removeClass("game").addClass("reward");
						$("#wrap").html('<p class="reward_title">'+
				'旺德福<br/>你已集齐徐铮分身<br/>vivo X5pro碎片开始合体<br/>合体中<br/>...'+
		'</p>'+
		  '<div class="frageWrap">'+
			'<div class="fragement">'+
				'<img src="Images/page_reward_frage1.png" alt="" class="reward_frage reward_frage1">'+
				'<img src="Images/page_reward_frage2.png" alt="" class="reward_frage reward_frage2">'+
				'<img src="Images/page_reward_frage3.png" alt="" class="reward_frage reward_frage3">'+
				'<img src="Images/page_reward_frage4.png" alt="" class="reward_frage reward_frage4">'+
				'<img src="Images/page_reward_frage5.png" alt="" class="reward_frage reward_frage5">'+
				'<img src="Images/page_reward_frage6.png" alt="" class="reward_frage reward_frage6">'+
				'<img src="Images/page_reward_frage7.png" alt="" class="reward_frage reward_frage7">'+
				'<img src="Images/page_reward_frage8.png" alt="" class="reward_frage reward_frage8">'+	
			'</div>'+
		   '</div>'+	
			'<img src="Images/page_reward_mobile.png" alt="" class="reward_wholeMobile">	');
						$(".reward_wholeMobile").delay(4000).fadeIn(function(){
							setTimeout(function(){
							$("#wrap").html('<div class="page_btn">'+
												'<img src="Images/page_reward_mobile2.png">'+
													'<button>开始抽奖</button>'+
													'<button>游戏说明</button>'+
											 '</div>');
							$("button").eq(0).on("click",function(){
								$("#wrap").html("");
								var num=rnd=(0,10);
								if(num<3){
									$("#wrap").html('<form class="infomation" type="post">'+
														'<input type="text" placeholder="手机号码" class="mobile">'+
														'<input type="text" placeholder="姓名" class="name">'+
														'</form>');
									$(".wrap").removeClass("reward").addClass("reward2");
								}else{
									$(".wrap").removeClass("reward").addClass("reward1");
								}
							});
							$("button").eq(1).on("click",function(){
								$("#wrap").html("");
								$(".wrap").removeClass("reward").addClass("rewardExplan");
							});
							},1500);
						});
						$(".fragement").delay(4000).fadeOut();
					}else{
						createLevel(n);
					}
				});
			});
		}
		//否则用其他
		else{
				img.src="Images/page_gameHead1.png";
			   
		}
		//当铁盔的数组长度大于0时换成铁盔
		if(arr.length!=0){
				for(var j=0;j<arr.length;j++){
				if(i==arr[j]){
					img.src="Images/page_gameHead2.png";
				}
			}
		}
			//每次循环后把生产的图片插进div中
			$(img).appendTo($(".game_content div"));
		}
}
/***********************************************************时间刷新更新**************/
Game.prototype.time_out=function(){
var text=61.50;
var time=setInterval(function(){
	text-=0.1;
	if(text<=0){
		text=0;	
		clearInterval(time);
		$("#wrap").html("");
		$(".wrap").removeClass("reward").addClass("reward3");
	}
	$(".game_time").html(text.toFixed(1));
},100);
}
/***********************************************************构建对应关卡对象***************************************************/
//n为对应关卡
function createLevel(n){
 var gm=new Game(n,"Images/page_game"+n+"_title.png");
	 gm.CreateEle();
	 gm.CreateMianEle();
	 gm.time_out();
}




