/****
***	num为当前关卡数
****Titlesrc为当前关卡的标题图片路径
***/
var timefage=false;//标记是否过了八关
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
						timefage=true;
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
							$("button").eq(1).on("click",function(){
									explan();
								});
							$("button").eq(0).on("click",function(){
								$("#wrap").html("");
								var num=rnd=(0,10);
								if(num<3){
									$("#wrap").html('<form class="infomation" type="post">'+
														'<input type="text" placeholder="手机号码" class="mobile">'+
														'<input type="text" placeholder="姓名" class="name">'+
														'</form>');
									$(".wrap").removeClass("reward").addClass("reward2");
									$button=$("<button class='game_submit'></button>");
									$button.appendTo($(".wrap"));
									$button.on("click",function(){alert("提交成功")});
								}else{
									$(".wrap").removeClass("reward").addClass("reward1");
									$button=$("<button class='game_back'></button>");
									$button.appendTo($(".wrap"));
									$button.on("click",gameBack);

								}
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
var time_out=function(){
var text=61.50;
var time=setInterval(function(){
	text-=0.1;
	if(timefage){
		clearInterval(time);
	}
	if(text<=0){
		text=0;	
		clearInterval(time);
		$("#wrap").html('<button class="tryAgain"></button>'+
			'<button class="gameDecription"></button>');
		$(".wrap").removeClass("reward").addClass("reward3");
		$(".tryAgain").click(gameBack);
		$(".gameDecription").click(function(){
			explan();
		});
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
}

//***********************************************返回游戏
function gameBack(){
	$(".wrap").removeClass("reward1 reward3").addClass("game");
	createLevel(1);
}
//**************************************游戏说明
function explan(){
	$("#wrap").removeClass("reward");
	$("#wrap").html('<div class="rewardExplan">'+
		'<div class="explan_detail">'+
				'<dl>'+
					'<dt>游戏规则:</dt>'+
					'<dd>'+
						'<ol>'+
							'<li>1. 玩家要在规定时间内，依次从2*2至7*7的方格中找徐铮。点对徐铮，即可过关。</li>'+
							'<li>2. 每找到一个徐铮，得到一个vivo手机“碎片”。集齐8块“碎片”，即获得一次抽奖机会。</li>'+
							'<li>3. 中奖玩家请正确填写信息。信息填写错误或未填写的玩家将被取消中奖资格。</li>'+
							'<li>4. 每个ID只有一次中奖机会。</li>'+
							'<li>5. 恶意刷奖的玩家一经发现将取消抽奖资格</li>'+
						'</ol>'+
					'</dd>'+
					'<dt>活动时间:</dt>'+
					'<dd>2015年9月28日至10月2日</dd>'+
					'<dt>游戏奖励</dt>'+
					'<dd>一等奖:vivo X5Pro智能手机 2台</dd>'+
					'<dd>二等奖:vivo 充电宝 10个</dd>'+
					'<dd>三等奖:没有</dd>'+
				'</dl>'+
			'</div>'+
			'<div class="sliderBar">'+	
				'<div class="slider"></div>'+
			'</div>'+
		'</div>');
	$(".rewardExplan").fadeIn();
	var slider=$(".slider").get(0);
	var explan_detail=$(".explan_detail").get(0);
	var sliderBar=$(".sliderBar").get(0);
	var content=$(".explan_detail dl").get(0);
	var wheelScrollTop=new WheelScrollTop(explan_detail,slider,content);
	wheelScrollTop.setScroll();
	wheelScrollTop.touchScroll();
	wheelScrollTop.dragScroll();

}
