/**
 * 添加行政区划
 * @param {} districtName 行政区划名
 * @returns  无返回值
 */
function addDistrict(districtName,bmap,covering) {
    //使用计数器来控制加载过程
    districtLoading++;
    var bdary = new BMap.Boundary();
    bdary.get(districtName, function (rs) {       //获取行政区域
        var count = rs.boundaries.length; //行政区域的点有多少个
        if (count === 0) {
            alert('未能获取当前输入行政区域');
            return;
        }
        for (var i = 0; i < count; i++) {
            blist.push({ points: rs.boundaries[i], name: districtName,covering:covering });
        };
        //加载完成区域点后计数器-1
        districtLoading--;
        if (districtLoading == 0) {
            //全加载完成后画端点
            drawBoundary(bmap);
        }
    });
}

drawBoundary=function(bmap) {
    //包含所有区域的点数组
    var pointArray = [];

    /*画遮蔽层的相关方法
    *思路: 首先在中国地图最外画一圈，圈住理论上所有的中国领土，然后再将每个闭合区域合并进来，并全部连到西北角。
    *      这样就做出了一个经过多次西北角的闭合多边形*/
    //定义中国东南西北端点，作为第一层
    var pNW = { lat: 59.0, lng: 73.0 }
    var pNE = { lat: 59.0, lng: 136.0 }
    var pSE = { lat: 3.0, lng: 136.0 }
    var pSW = { lat: 3.0, lng: 73.0 }
    //向数组中添加一次闭合多边形，并将西北角再加一次作为之后画闭合区域的起点
    var pArray = [];
    pArray.push(pNW);
    pArray.push(pSW);
    pArray.push(pSE);
    pArray.push(pNE);
    pArray.push(pNW);
    //循环添加各闭合区域
    for (var i = 0; i < blist.length; i++) {
        //添加显示用标签层
        var label = new BMap.Label(blist[i].name, { offset: new BMap.Size(20, -10) });
        label.hide();
        bmap.addOverlay(label);

        //添加多边形层并显示
        var ply = new BMap.Polygon(blist[i].points, { strokeWeight: 3, strokeColor: "#41beee", fillOpacity: blist[i].covering==undefined ? 0.01 : 0.5, fillColor:blist[i].covering==undefined ? " #000" : blist[i].covering}); //建立多边形覆盖物
        ply.name = blist[i].name;
        ply.label = label;
        // 添加事件对象
        if(blist[i].covering=="#ff5b57"){
        	ply.covering="未覆盖";
        }else if(blist[i].covering=="#14ae8f"){
        	ply.covering="已覆盖";
        }else if(blist[i].covering=="#fada00"){
        	ply.covering="未完全覆盖";
        }
        // ply.addEventListener("click", click);
        // ply.addEventListener("mouseover", mouseover);
        // ply.addEventListener("mouseout", mouseout);
        // ply.addEventListener("mousemove", mousemove);
        bmap.addOverlay(ply);

        //添加名称标签层
        var centerlabel = new BMap.Label(blist[i].name, { offset: new BMap.Size(0, 0) });
        centerlabel.setPosition(ply.getBounds().getCenter());
        bmap.addOverlay(centerlabel);

        //将点增加到视野范围内
        var path = ply.getPath();
        pointArray = pointArray.concat(path);
        //将闭合区域加到遮蔽层上，每次添加完后要再加一次西北角作为下次添加的起点和最后一次的终点
        pArray = pArray.concat(path);
        pArray.push(pArray[0]);
    }

    //限定显示区域，需要引用api库
    // var boundply = new BMap.Polygon(pointArray);
    // BMapLib.AreaRestriction.setBounds(bmap, boundply.getBounds());
    // bmap.setViewport(pointArray);    //调整视野 

    //添加遮蔽层
    var plyall = new BMap.Polygon(pArray, { strokeOpacity: 0.0000001, strokeColor: "#000000", strokeWeight: 0.00001, fillColor: "#000000", fillOpacity: 0.4 }); //建立多边形覆盖物
    bmap.addOverlay(plyall);
}

/**
 * 各种鼠标事件绑定
 */
function click(evt) {
    alert(evt.target.name);
}
function mouseover(evt) {
    evt.target.label.setZIndex(99);
    evt.target.label.setPosition(evt.point);
    evt.target.label.show();
}
function mousemove(evt) {
    evt.target.label.setPosition(evt.point);
}
function mouseout(evt) {
    evt.target.label.hide();
}


// 地图省市县切换
$("body").on("click",".j-zoom-province",function(){
	if($(".gb-all-incident").hasClass('cur')){
		allbmap.setZoom(8)
	}else{
		unitybmap.setZoom(8)
	}
})
$("body").on("click",".j-zoom-city",function(){
	if($(".gb-all-incident").hasClass('cur')){
		allbmap.setZoom(10)
	}else{
		unitybmap.setZoom(10)
	}
})
$("body").on("click",".j-zoom-county",function(){
	if($(".gb-all-incident").hasClass('cur')){
		allbmap.setZoom(12)
	}else{
		unitybmap.setZoom(12)
	}
})
$("body").on("click",".gb-map-zoom span",function(){
	$(this).addClass("cur").siblings("span").removeClass("cur")
})

// 单一事件地图覆盖情况图列
$("body").on("click",".j-legend-succeed",function(){
	legendCover("已覆盖",$(this))
})
$("body").on("click",".j-legend-process",function(){
	legendCover("未完全覆盖",$(this))
})
$("body").on("click",".j-legend-failure",function(){
	legendCover("未覆盖",$(this))
})
$("body").on("click",".gb-map-legend span",function(){
	$(this).toggleClass("cur")
})
function legendCover(cover,$this) {
	var overlays=unitybmap.getOverlays();
	if(!$($this).hasClass('cur')){
		for (var i = 0; i < overlays.length; i++) {
			if(overlays[i].covering==cover){
				if(cover=="已覆盖"){
					legendSucceed.push(overlays[i])
				}else if(cover=="未完全覆盖"){
					legendProcess.push(overlays[i])
				}else if(cover=="未覆盖"){
					legendFailure.push(overlays[i])
				}
				unitybmap.removeOverlay(overlays[i]);
			}
		}
	}else{
		if(cover=="已覆盖"){
			for (var i = 0; i < legendSucceed.length; i++) {
				unitybmap.addOverlay(legendSucceed[i]);
			}
		}else if(cover=="未完全覆盖"){
			for (var i = 0; i < legendProcess.length; i++) {
				unitybmap.addOverlay(legendProcess[i]);
			}
		}else if(cover=="未覆盖"){
			for (var i = 0; i < legendFailure.length; i++) {
				unitybmap.addOverlay(legendFailure[i]);
			}
		}
	}
}


// 单一事件-列表图表切换
$("body").on("click",".j-table-chart-tab em",function(event) {
    $(this).addClass("cur").siblings('em').removeClass("cur");
    if($(this).hasClass("chart")){
        // $(this).html('<i class="iconfont icon-liebiao"></i>列表')
        $(this).parents(".gb-charts-table").find(".gb-chart-incident").show().siblings("div").hide()
    }else{
        // $(this).html('<i class="iconfont icon-zhexian"></i>折线')
        $(this).parents(".gb-charts-table").find(".gb-ctab").show().siblings("div").hide()
    }
});

