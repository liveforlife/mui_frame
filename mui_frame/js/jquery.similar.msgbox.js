(function () {
    $.MsgBox = {
        Alert: function (title, msg, callback) {
            GenerateHtml("alert", title, msg);
            btnOk(callback); 
            btnNo();
        },
        Confirm: function (title, msg,leftmsg,rightmsg,callback,callback1) {
            GenerateHtml("confirm", title, msg,leftmsg,rightmsg);
            btnOk(callback);
            btnNo(callback1);
            alert(leftmsg);
        }
    }
	 
    //生成Html
    var GenerateHtml = function (type, title, msg,leftmsg,rightmsg) {

        var _html = "";

        _html += '<div id="mb_box" ></div><div id="mb_con"><span id="mb_tit">' + title + '</span>';
        _html += '<a id="mb_ico" style="display:none">x</a><div id="mb_msg">' + msg + '</div><div id="mb_btnbox">';

        if (type == "alert") {
            _html += '<input id="mb_btn_ok" type="button" value="确定" />';
        }
        if (type == "confirm") {
        	if(leftmsg==undefined){
	            _html += '<input id="mb_btn_ok" type="button" value="确定" />';
        	}else{
        		 _html += '<input id="mb_btn_ok" type="button" value="'+leftmsg+'" />';
        	}
        	if(rightmsg==undefined){
	            _html += '<input id="mb_btn_no" type="button" value="取消" />';
        	}else{
		        _html += '<input id="mb_btn_no" type="button" value="'+rightmsg+'" />';
        	}
        }
        _html += '</div></div>';

        //必须先将_html添加到body，再设置Css样式
        $("body").append(_html); 
        GenerateCss();
    }

    //生成Css
    var GenerateCss = function () {

        $("#mb_box").css({ width: '100%', height: '100%', zIndex: '99999', position: 'fixed',
            filter: 'Alpha(opacity=60)', backgroundColor: 'black', top: '0', left: '0', opacity: '0.6'
        });

        $("#mb_con").css({ zIndex: '999999', width: '220px', position: 'fixed',
            backgroundColor: 'White', borderRadius: '3px'
        });

        $("#mb_tit").css({  fontSize: '14px', color: '#444', padding: '10px 15px',
            backgroundColor: '#DDD', borderRadius: '15px 15px 0 0',
            borderBottom: '3px solid #009BFE', fontWeight: 'bold',display:'none'
        });

        $("#mb_msg").css({ padding: '20px', lineHeight: '40px',
            borderBottom: '1px solid #e1e1e1', fontSize: '13px',
            textAlign:'center',
        });

        $("#mb_ico").css({ display: 'none', position: 'absolute', right: '10px', top: '9px',
            border: '1px solid Gray', width: '18px', height: '18px', textAlign: 'center',
            lineHeight: '16px', cursor: 'pointer', borderRadius: '12px', fontFamily: '微软雅黑'
        });

        $("#mb_btnbox").css({ textAlign: 'center' });
        $("#mb_btn_ok,#mb_btn_no").css({ width: '100px', height: '40px', color: '#2eaedf', border: 'none' ,padding: '5px 0 5px 0',});
        $("#mb_btn_ok").css({ backgroundColor: '#FFF' });
        $("#mb_btn_no").css({ backgroundColor: '#FFF', borderLeft:'1px solid #e1e1e1'});


        //右上角关闭按钮hover样式
        $("#mb_ico").hover(function () {
            $(this).css({ backgroundColor: 'Red', color: 'White' });
        }, function () {
            $(this).css({ backgroundColor: '#DDD', color: 'black' });
        });
		
        var _widht = document.documentElement.clientWidth;  //屏幕宽
        var _height = document.documentElement.clientHeight; //屏幕高

        var boxWidth = $("#mb_con").width();
        var boxHeight = $("#mb_con").height();

        //让提示框居中
        $("#mb_con").css({ top: (_height - boxHeight) / 2 + "px", left: (_widht - boxWidth) / 2 + "px" });
        //点击旁边空白区域，弹框消失
        $("#mb_box").click(function(){
	    	   $("#mb_box,#mb_con").remove();
       })
    }


    //确定按钮事件
    var btnOk = function (callback) {
        $("#mb_btn_ok").click(function () {
            $("#mb_box,#mb_con").remove();
            if (typeof (callback) == 'function') {
                callback();
            }
        });
    }

    //取消按钮事件
    var btnNo = function (callback1) {
    	if(callback1==undefined)
        $("#mb_btn_no,#mb_ico").click(function () {
            $("#mb_box,#mb_con").remove();
        });
    	else{
    		$("#mb_ico").click(function () {
                $("#mb_box,#mb_con").remove();
            });
    		$("#mb_btn_no").click(function () {
                $("#mb_box,#mb_con").remove();
                if (typeof (callback1) == 'function') {
                	callback1();
                }
            });
    	}
    }
})();