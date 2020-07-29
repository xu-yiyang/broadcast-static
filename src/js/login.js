$(document).ready(function(){
	if($('.gb-sign').length != 0){
		
		var tx = document.getElementById("tx"), pwd = document.getElementById("pwd");
		tx.onfocus = function(){
			if(this.value != "密码") return;
			this.style.display = "none";
			pwd.style.display = "";
			pwd.value = "";
			pwd.focus();
		}
		pwd.onblur = function(){
			if(this.value != "") {
				pwd.style.borderColor='#d8d8d8'; 
			}else{
				this.style.display = "none";
				tx.style.display = "";
				tx.value = "密码";
			}
		}
	}

	if($(window).width() > 1400){
		$('.logcent').css({'width':'1320px'});
		$('.titbg').css({'height':'336px','margin-top':'-168px'});
		$('.logtit').css({'width':'auto','margin-top':'-43px'});
		$('.logframe').css({'width':'540px','height':'590px','margin-top':'-295px'});
		$('.fratop').css({'height':'122px'});
		$('.fratit').css({'width':'160px','height':'53px','font-size':'24px','line-height':'60px','margin-left':'-80px'});
		$('.fracent').css({'height':'468px','padding':'70px 104px 60px 104px'});
		$('.fracode').css({'width':'200px'});
		$('.codeimg').css({'width':'120px'});
		$('.forget').css({'bottom':'60px'});
	}else{
		$('.logcent').css({'width':'960px'});
		$('.titbg').css({'height':'260px','margin-top':'-130px'});
		$('.logtit').css({'width':'400px','margin-top':'-31px'});
		$('.logframe').css({'width':'440px','height':'520px','margin-top':'-260px'});
		$('.fratop').css({'height':'110px'});
		$('.fratit').css({'width':'120px','height':'43px','font-size':'20px','line-height':'50px','margin-left':'-60px'});
		$('.fracent').css({'height':'410px','padding':'50px 60px 40px 60px'});
		$('.fracode').css({'width':'190px'});
		$('.codeimg').css({'width':'110px'});
		$('.forget').css({'bottom':'40px'});
	}

	$(window).resize(function(){
		if($(window).width() > 1400){
			$('.logcent').css({'width':'1320px'});
			$('.titbg').css({'height':'336px','margin-top':'-168px'});
			$('.logtit').css({'width':'auto','margin-top':'-43px'});
			$('.logframe').css({'width':'540px','height':'590px','margin-top':'-295px'});
			$('.fratop').css({'height':'122px'});
			$('.fratit').css({'width':'160px','height':'53px','font-size':'24px','line-height':'60px','margin-left':'-80px'});
			$('.fracent').css({'height':'468px','padding':'70px 104px 60px 104px'});
			$('.fracode').css({'width':'200px'});
			$('.codeimg').css({'width':'120px'});
			$('.forget').css({'bottom':'60px'});
		}else{
			$('.logcent').css({'width':'960px'});
			$('.titbg').css({'height':'260px','margin-top':'-130px'});
			$('.logtit').css({'width':'400px','margin-top':'-31px'});
			$('.logframe').css({'width':'440px','height':'520px','margin-top':'-260px'});
			$('.fratop').css({'height':'110px'});
			$('.fratit').css({'width':'120px','height':'43px','font-size':'20px','line-height':'50px','margin-left':'-60px'});
			$('.fracent').css({'height':'410px','padding':'50px 60px 40px 60px'});
			$('.fracode').css({'width':'190px'});
			$('.codeimg').css({'width':'110px'});
			$('.forget').css({'bottom':'40px'});
		}
	})
})