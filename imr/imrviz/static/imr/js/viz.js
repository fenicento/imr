//Fixed values
var svg=null;
var width=1200;
var height=1200;
var rad=70,
defsiz=240,
defy=350,
year=2000,
sunx=width/2,
suny=60;

//Interpolators
var sunlerp = d3.scale.log().base(2).range([1, 30]);
var poplerp = d3.scale.linear().range([0.01,6.28]);
var stocklerp = d3.scale.linear().range([0.1,6.28]);
var exlerp = d3.scale.linear().range([1,20]);
var totpop=0;
var totstock=0;

//exchanges
var netExchanges=[];


function start() {

svg = d3.select("#viz")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
       

fillYears();

window.curyear=d3.keys(data)[0];
$(".y"+curyear).addClass("active");

window.currData=JSON.parse(JSON.stringify(data[curyear]));


totpop=0;
totstock=0;
netExchanges=[];

exc=svg.append("g")
.attr("class","netexchanges");

exchanges=svg.append("g")
.attr("class","exchanges");

regions=svg.append("g")
.attr("class","regions");

lines=svg.append("g")
.attr("class","lines");

svg
.append("circle")
.attr("class","sunball")
.style("stroke","none")
.style("fill","#ED653F")
.attr("r",rad*4/5)
.attr("cx",width/2-5)
.attr("cy",suny)

defs=svg.append("svg:defs")
    defs.append("svg:marker")
    .attr("id", "pointer")
    .attr("viewBox", "0 -5 10 10")
    .style("fill","#C06446")
    .attr("refX", 0.2)
    .attr("refY", 0)
    .attr("markerWidth", 1)
    .attr("markerHeight", 3)
    .attr("orient", "auto")
  .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");

defs.append("svg:marker")
    .attr("id", "pointer2")
    .attr("viewBox", "0 -5 10 10")
    .style("fill","gray")
    .attr("refX", 0.2)
    .attr("refY", 0)
    .attr("markerWidth", 1)
    .attr("markerHeight", 3)
    .attr("orient", "auto")
  .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");

    defs.append("svg:marker")
    .attr("id", "pointer3")
    .attr("viewBox", "0 -5 10 10")
    .style("fill","#e2e2e2")
    .attr("refX", 0.2)
    .attr("refY", 0)
    .attr("markerWidth", 1)
    .attr("markerHeight", 3)
    .attr("orient", "auto")
  .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");

    defs.append("svg:marker")
    .attr("id", "pointer4")
    .attr("viewBox", "0 -5 10 10")
    .style("fill","#aaaaaa")
    .attr("refX", 0.2)
    .attr("refY", 0)
    .attr("markerWidth", 1)
    .attr("markerHeight", 3)
    .attr("orient", "auto")
  .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");

    defs.append("svg:marker")
    .attr("id", "pointer5")
    .attr("viewBox", "0 -5 10 10")
    .style("fill","#695C4B")
    .attr("refX", 0.2)
    .attr("refY", 0)
    .attr("markerWidth", 1)
    .attr("markerHeight", 3)
    .attr("orient", "auto")
  .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");


initialize();

}

function computeSpaces() {

	totstock=0;
	totpop=0;
	
	num=currData.length;
	totsiz=defsiz*num;
	oversiz=width-totsiz;
	start=oversiz/2;

	maxex=0;

	for(i =0; i<num; i++) {
		totpop=totpop+currData[i].population
		totstock=totstock+currData[i].stock
		curmax=d3.max(d3.values(currData[i].exchanges))
		if(curmax>maxex) maxex=curmax;
		s=start+defsiz*i;
		currData[i].num=i;

		currData[i].x=start+defsiz*i+defsiz/2;
		currData[i].y=defy;
	
	}
	poplerp.domain([0,totpop]);
	stocklerp.domain([0,totstock]);
	exlerp.domain([0,maxex]);
	sunlerp.domain([1, d3.max(currData, function(d) { return d.offer; })]);

	for(i =0; i<num; i++) {
		

		currData[i].leTotOffer=sunlerp(currData[i].offer)
		currData[i].leDemand=sunlerp(currData[i].demand)
		currData[i].leYeld=sunlerp(currData[i].offer*currData[i].yeld)
		currData[i].leOffer=sunlerp(currData[i].offer*(1-currData[i].yeld))
	}
}


function initialize() {

d3.selectAll(".exchange").remove();
d3.selectAll(".divline").remove();
d3.selectAll(".chart").remove();
d3.selectAll(".flux").remove();
d3.selectAll(".netexchanges").empty();

netExchanges=[];


//var re=regions.selectAll("g.region").data(currData,function(d){return d.name})
//var li=lines.selectAll("line").data(currData,function(d){return d.name})


var re=regions.selectAll("g.region").data(currData,function(d){return d.name})
var li=lines.selectAll("line").data(currData,function(d){return d.name})

computeSpaces()

//CREATE REGIONS
re.enter()
.append("g")
.attr("class",function(d){return "region "+d.name});

re.exit().remove()

//CREATE LINES

li.enter()
.append("line")
.filter(function(d, i) { return i >0 })
.attr("x1",function(d) {return parseInt(d.x-defsiz/2)})
.attr("y1",20)
.attr("x2",function(d) {return d.x-defsiz/2})
.attr("y2",height)
.style("stroke", "#ccc")
.attr("class","divline")
.style("stroke-width", 1)
.style("stroke-dasharray", ("3, 3"))

//CREATE SUN LINES

re
.append("path")
.style("stroke", "#ED653F")
.attr("fill","none")
.attr("class",function(d){ return "sun "+d.name})

re.selectAll("path.sun")
.transition()
.style("stroke-width", function(d){ return d.leOffer})
.attr("title","lol!")
.attr("d", function(d) {return createSunLine(d)})

re.selectAll("path.sun")
.tooltip(function(d){
    console.log(d.x,d.y);
    return {        
      //The text within the tooltip
      type:"tooltip",
      gravity:"north",
      text: "<b>"+d.name.replace(/_/g, ' ')+"</b><br/>Reflected solar radiation", 
      detection: "shape",
      //Where 
      placement: "fixed",
      // Base positioning. Not used when placement is "mouse"
      position: [d.x,d.y-270],
      //How far the tooltip is shifted from the base
      displacement: [-75,0], //Shifting parts of the graph over.           
      //If "mouse"" is the base poistion, then mousemove true allows
      //the tooltip to move with the mouse
      mousemove: false
    };
});

//CREATE YELD LINES

re
.append("path")
.style("stroke", "#ED653F")
.attr("fill","none")
.attr("class",function(d) {return "yeld "+d.name});

re.selectAll("path.yeld")
.transition()
.style("stroke-width", function(d){return d.leYeld/3})
.attr("d",function(d) {return createYeldLine(d)});

re.selectAll("path.yeld")
.tooltip(function(d){
    console.log(d.x,d.y);
    return {        
      //The text within the tooltip
      type:"tooltip",
      gravity:"north",
      text: "<b>"+d.name.replace(/_/g, ' ')+"</b><br/>Density of offer", 
      detection: "shape",
      //Where 
      placement: "fixed",
      // Base positioning. Not used when placement is "mouse"
      position: [d.x,d.y-270],
      //How far the tooltip is shifted from the base
      displacement: [-75,0], //Shifting parts of the graph over.           
      //If "mouse"" is the base poistion, then mousemove true allows
      //the tooltip to move with the mouse
      mousemove: false
    };
});


//CREATE REFLECTED SUN LINES
re
.append("line")
.style("stroke", "#C06446")
.attr("class",function(d) {return "reflect "+d.name})
.attr("marker-end","url(#pointer)");

re.selectAll("line.reflect")
.transition()
.style("stroke-width", function(d){return d.leOffer})
.attr("x1",  function(d){return d.x+d.leOffer/2})
.attr("y1",  function(d){return d.y-70+d.leOffer/3})
//.attr("x2",  function(d){return d.x+d.leOffer/2+d.leOffer*2.77})
.attr("x2",  function(d){return d.x+d.leOffer/2+50})
//.attr("y2",  function(d){return d.y-70+d.leOffer/3-d.leOffer*2.77})
.attr("y2",  function(d){return d.y-70+d.leOffer/3-50})

re.selectAll("line.reflect")
.tooltip(function(d){
    console.log(d.x,d.y);
    return {        
      //The text within the tooltip
      type:"tooltip",
      gravity:"north",
      text: "<b>"+d.name.replace(/_/g, ' ')+"</b><br/>Reflected solar radiation", 
      detection: "shape",
      //Where 
      placement: "fixed",
      // Base positioning. Not used when placement is "mouse"
      position: [d.x,d.y-270],
      //How far the tooltip is shifted from the base
      displacement: [-75,0], //Shifting parts of the graph over.           
      //If "mouse"" is the base poistion, then mousemove true allows
      //the tooltip to move with the mouse
      mousemove: false
    };
});

//CREATE CONSUMPTION LINE
re
.append("line")
.attr("class",function(d) {return "consumption "+d.name})
.style("stroke", "#695C4B")
.attr("marker-end","url(#pointer5)");

re.selectAll("line.consumption")
.transition()
.style("stroke-width",  function(d){return d.leDemand})
.attr("x1",  function(d){return d.x+d.leDemand*1.5})
.attr("y1",  function(d){return d.y-70+d.leDemand})
.attr("x2",  function(d){return d.x+d.leDemand*1.5+40})
.attr("y2",  function(d){return d.y-70+d.leDemand-40})

re.selectAll("line.consumption")
.tooltip(function(d){
    console.log(d.x,d.y);
    return {        
      //The text within the tooltip
      type:"tooltip",
      gravity:"north",
      text: "<b>"+d.name.replace(/_/g, ' ')+"</b><br/>Density of demand", 
      detection: "shape",
      //Where 
      placement: "fixed",
      // Base positioning. Not used when placement is "mouse"
      position: [d.x,d.y-270],
      //How far the tooltip is shifted from the base
      displacement: [-75,0], //Shifting parts of the graph over.           
      //If "mouse"" is the base poistion, then mousemove true allows
      //the tooltip to move with the mouse
      mousemove: false
    };
});

//CREATE EXCHANGES
d3.selectAll(".region")
.each(function(e){createExchanges(e)});

//CREATE CIRCLES
re
.append("circle")
.attr("class",function(d) {return "item "+d.name})
.style("stroke","gray")
.style("stroke-width","3")
.style("fill","white")
.attr("title","asd")
.attr("r",rad)
.on("click",function(d) {
	if(d.grouped && d.grouped.length>0) {
		expand(d);
	}

	else if(d.num>0) {
		merge(d);
	}
})

re.selectAll("circle.item")
.transition()
.attr("cx",function(d){return d.x})
.attr("cy",function(d){return d.y})


re.append("circle")
.attr("class",function(d) {return "popline "+d.name})
.style("stroke","#eee")
.style("stroke-width","1")
.style("fill","none")
.attr("r",rad*3/4);

re.selectAll("circle.popline")
.transition()
.attr("cx",function(d){return d.x})
.attr("cy",function(d){return d.y});

re.append("circle")
.attr("class",function(d) {return "stockline "+d.name})
.style("stroke","#eee")
.style("stroke-width","1")
.style("fill","none")
.attr("r",rad*1/4);

re.selectAll("circle.stockline")
.transition()
.attr("cx",function(d){return d.x})
.attr("cy",function(d){return d.y});
//createArcs(data[i]);
//addText(data[i]);

arc = d3.svg.arc()
.innerRadius(rad*3/4)
.outerRadius(rad-1)
.startAngle(function(d){return -poplerp(d.population)/2}) //converting from degs to radians
.endAngle(function(d){return poplerp(d.population)/2});

arc2 = d3.svg.arc()
.innerRadius(0)
.outerRadius(rad*1/4)
.startAngle(function(d){return -stocklerp(d.stock)/2}) //converting from degs to radians
.endAngle(function(d){return stocklerp(d.stock)/2});
	    
//CREATE PIES
re.append("path")
.attr("class",function(d) {return "surface "+d.name})
.style("fill","#2FBAB2");

re.selectAll("path.surface")
.attr("d", arc)
.attr("transform", function(d){return "translate("+d.x+","+d.y+")"});

re.selectAll("path.surface")
.tooltip(function(d){
    console.log(d.x,d.y);
    return {        
      //The text within the tooltip
      type:"tooltip",
      gravity:"north",
      text: "<b>"+d.name.replace(/_/g, ' ')+"</b><br/>Population: "+d.population, 
      detection: "shape",
      //Where 
      placement: "fixed",
      // Base positioning. Not used when placement is "mouse"
      position: [d.x,d.y],
      //How far the tooltip is shifted from the base
      displacement: [70,-50], //Shifting parts of the graph over.           
      //If "mouse"" is the base poistion, then mousemove true allows
      //the tooltip to move with the mouse
      mousemove: false
    };
});

re.append("path")
.attr("class",function(d) {return "stock "+d.name})
.style("fill","gray");

re.selectAll("path.stock")
.attr("d", arc2)
.attr("transform", function(d){return "translate("+d.x+","+d.y+")"});

re.selectAll("path.stock")
.tooltip(function(d){
    console.log(d.x,d.y);
    return {        
      //The text within the tooltip
      type:"tooltip",
      gravity:"north",
      text: "<b>"+d.name.replace(/_/g, ' ')+"</b><br/>Stock: "+d.stock, 
      detection: "shape",
      //Where 
      placement: "fixed",
      // Base positioning. Not used when placement is "mouse"
      position: [d.x,d.y],
      //How far the tooltip is shifted from the base
      displacement: [20,-50], //Shifting parts of the graph over.           
      //If "mouse"" is the base poistion, then mousemove true allows
      //the tooltip to move with the mouse
      mousemove: false
    };
});
//ADD TEXT
re
.append("text")
.attr("class","space-name")
.attr("text-anchor", "middle")
.attr("y", 558)
.attr("font-family", "sans-serif")
.attr("font-size", "14px")
.attr("fill", "gray");

d3.selectAll("text.space-name")
.attr("x", function(d) { return d.x })
.text( function (d) { return d.name.replace("_"," ")})

re
.append("text")
.attr("class","space-pop")
.attr("text-anchor", "middle")
.attr("y", 578)
.attr("font-family", "sans-serif")
.attr("font-size", "14px")
.attr("fill", "gray");

d3.selectAll("text.space-pop")
.attr("x", function(d) { return d.x })
.text( function (d) { return ((d.population/totpop)*100).toFixed(2)+"% population"})

re
.append("text")
.attr("class","space-stock")
.attr("text-anchor", "middle")
.attr("y", 598)
.attr("font-family", "sans-serif")
.attr("font-size", "14px")
.attr("fill", "gray");

d3.selectAll("text.space-stock")
.attr("x", function(d) { return d.x })
.text( function (d) { return ((d.stock/totstock)*100).toFixed(2)+"% stock"})

re.exit().remove()

createCharts();

createFluxes();


}

function createSunLine(d) {
      var x0 = sunx+d.leOffer/2*(d.num-(num/2)),
          x1 = d.x+d.leOffer/2+3,
          y0 = suny,
          y1 = d.y,
          yi = d3.interpolateNumber(y0, y1/3),
          y2 = yi(.5),
          y3 = yi(1 - .5);
          
        
         return "M" + x0 + "," + y0
           + "C" + x0 + "," + y2
           + " " + x1 + "," + y3
           + " " + x1 + "," + (y1-70)
           + "L" + x1 + "," + y1;
	}

function createYeldLine(d) {
    	  var x0 = sunx+d.leYeld/2*(d.num-(num/2)),
          x1 = d.x-d.leYeld/2-3,
          y0 = suny,
          y1 = d.y,
          yi = d3.interpolateNumber(y0, y1/3),
          y2 = yi(.5),
          y3 = yi(1 - .5);

    	return "M" + x0 + "," + y0
           + "C" + x0 + "," + y2
           + " " + x1 + "," + y3
           + " " + x1 + "," + (y1-70)
           + "L" + x1 + "," + y1; 	

    }
		

function createExchanges(d) {
	d3.keys(d.exchanges).forEach(function(e,i,a) {
        b=$.grep(currData,function(r){return r.name==e});
		if(b.length>0) {
            b=b[0];
			console.log(b);
			if(d.exchanges[e]>b.exchanges[d.name]) {
				exchanges
				.append("path")
				.attr("class", "exchange "+d.name+" "+b.name)
				.style("stroke", "gray")
				.style("opacity","0.4")
		        .style("stroke-width", exlerp(d.exchanges[e]-b.exchanges[d.name]))
		        .attr("fill","none")
		        .attr("d",dirlink(d.x,d.y,b["x"],b["y"],Math.abs(d.num-i)))
		        .attr("marker-end","url(#pointer2)");

                d3.select(".exchange."+d.name+"."+b.name).tooltip(function(){
                    
                    return {        
                      //The text within the tooltip
                      type:"tooltip",
                      gravity:"north",
                      text: "<b>Net exchange "+d.name.replace(/_/g, ' ')+" - "+b.name.replace(/_/g, ' ')+"</b><br/>Value: "+exlerp(d.exchanges[e]-b.exchanges[d.name]), 
                      detection: "shape",
                      //Where 
                      placement: "fixed",
                      // Base positioning. Not used when placement is "mouse"
                      position: [d.x+(b.x-d.x)/2,d.y+80],
                      //How far the tooltip is shifted from the base
                      displacement: [-90,0], //Shifting parts of the graph over.           
                      //If "mouse"" is the base poistion, then mousemove true allows
                      //the tooltip to move with the mouse
                      mousemove: false
                    };
                });

                
                netExchanges.push({"source":d.name,"target":b.name,"value":exlerp(d.exchanges[e]-b.exchanges[d.name])});

			}
		}
	});
}


function dirlink(ax,ay,bx,by,i) {
	
      var x0 = ax,
          x1 = bx-(rad+10)*0.86,
          y0 = ay,
          y1 = by+(rad+10)*0.5,
          xi = d3.interpolateNumber(x0, x1),
          x2 = xi(.5);
          
          
      return "M" + x0 + "," + y0
           + "Q" + x2 + "," + parseInt(y0+(x1-x0)*(0.5-i*0.05))
           + " " + x1 + "," + y1;
    }


    function merge(d) {
    	console.log("called merge on ",d);
    	currData[d.num-1].population += d.population;
    	currData[d.num-1].stock += d.stock;
    	currData[d.num-1].offer += d.offer;
    	currData[d.num-1].demand += d.demand;
    	if (!currData[d.num-1].grouped) currData[d.num-1].grouped=[d.name];
    	else currData[d.num-1].grouped.push(d.name);
    	currData.splice(d.num,1);
    	initialize();
    	removeDuplicates(null);
    	console.log("merged "+d.name);

    }

    function removeDuplicates(a) {

    	if(a) {
    	arr=$.makeArray($(".region").not("."+a))
    	}
    	else arr=$.makeArray($(".region"))  
    	
    	arr.forEach(function(e){
    		
	    	$(e).find(".sun").first().remove();
	    	$(e).find(".yeld").first().remove();
	    	$(e).find(".consumption").first().remove();
	    	$(e).find(".reflect").first().remove();
	    	$(e).find(".item").first().remove();
	    	$(e).find(".surface").first().remove();
	    	$(e).find(".stock").first().remove();
	    	$(e).find(".space-name").first().remove();
	    	$(e).find(".space-pop").first().remove();
	    	$(e).find(".space-stock").first().remove();
	    	$(e).find(".stockline").first().remove();
	    	$(e).find(".popline").first().remove();
    	})
    }

    function expand(d) {
    	console.log("called expand")
    	obj=$.grep(data[curyear], function(f){ return f.name == d.grouped[0]; });
    	obj=obj[0];
    	
    	d.grouped.splice(0,1);
    	newgroup=d.grouped;
    	
    	if(newgroup.length>1) {
    		newgroup.forEach(function(e) {
    			console.log("e",e)
    			console.log(data[curyear])
    			a=$.grep(data[curyear], function(f){ return f.name == e; })[0];
    			console.log("a",a)
    			console.log("subtracting "+a.name+" to "+obj.name)
    			obj.population += a.population;
		    	obj.stock += a.stock;
		    	obj.offer += a.offer;
		    	obj.demand += a.demand;
    		})
    	}
    	d.population -= obj.population;
		d.stock -= obj.stock;
		d.offer -= obj.offer;
		d.demand -= obj.demand;
    	obj.grouped=newgroup;
    	d.grouped=[];
    	currData.splice(d.num+1,0,obj);
    	initialize();
    	removeDuplicates(obj.name);
    	console.log("expanded "+obj.name) 
    }

    function expandAll() {
    	currData=JSON.parse(JSON.stringify(data[curyear]));

		$(".region").remove();
    	initialize();
    }

    function mergeAll() {
    	while(currData.length>1) {
    		merge(currData[1]);
    	}
    }

    function changeYear(i) {
    	if(i!=curyear) {
    		$(".active").removeClass("active");
    		$(".y"+i).addClass("active");
    		toShrink=[]
	    	newData=JSON.parse(JSON.stringify(data[i]));
	    	
	    	currData.forEach(function(e){
	    		if(e.grouped && e.grouped.length>0) {
	    			e.grouped.forEach(function(r){
	    				toShrink.push(r);
	    			})
	    		}
	    	})
	    	
	    	currData=newData;
	    	$(".region").remove();
	    	initialize();

	    	toShrink.forEach(function(e){
	    	
	    		ts=$.grep(currData, function(f){ return f.name == e })[0];
	    		console.log("ts",ts)
	    		merge(ts);
	    	})
	    }
	    curyear=i;
    }
    function fillYears() {
	d3.keys(data).forEach(function(e){
		$("#years-cont").append('<a class="but y'+e+'" href="#" onclick="changeYear('+e+')">'+e+'</a>')

	})
}

initialize()


//============================================================================
// SECTION 2 - LINE GRAPHS
//============================================================================


function createCharts() {


//Data by countries
var years=d3.map(data).keys()
var lines={};
var xlerp = d3.scale.linear().range([30, 210]);
var plerp = d3.scale.linear().range([60,1]);
var dlerp = d3.scale.linear().range([50,15]);
var nlerp = d3.scale.linear().range([60,1]);
var xAxis = d3.svg.axis();
var formatxAxis = d3.format('.0f');
xAxis
.scale(xlerp)
.ticks(5)
.tickFormat(formatxAxis)

years.forEach(function(year) {

	k=d3.values(data[year]);
	
	k.forEach(function(ob) {
		
		ob.year=year
		if(!lines[ob.name]) lines[ob.name]=[]
		lines[ob.name].push(ob);
	})
});

//LEGEND
legend=svg.append("g")
.attr("class","legend")

legend.append("line")
.attr("x1",0)
.attr("y1",920)
.attr("x2",10)
.attr("y2",920)
.style("stroke","#2FBAB2")
.style("stroke-width",3)

legend.append("text")
.attr("x",15)
.attr("y",925)
.style("fill","#333")
.text("Population")

legend.append("line")
.attr("x1",0)
.attr("y1",935)
.attr("x2",10)
.attr("y2",935)
.style("stroke","#695C4B")
.style("stroke-width",3)

legend.append("text")
.attr("x",15)
.attr("y",940)
.style("fill","#333")
.text("Demand per person")

legend.append("line")
.attr("x1",0)
.attr("y1",950)
.attr("x2",10)
.attr("y2",950)
.style("stroke","#ED653F")
.style("stroke-width",3)

legend.append("text")
.attr("x",15)
.attr("y",955)
.style("fill","#333")
.text("Solar yield")


var valueline1 = d3.svg.line()
.interpolate("basis") 
.x(function(d) { return xlerp(d.year); })
.y(function(d) { return plerp(d.population); });

var valueline2 = d3.svg.line()
.interpolate("basis") 
.x(function(d) { return xlerp(d.year) })
.y(function(d) { return dlerp(d.demand) });

var valueline3 = d3.svg.line()
.interpolate("basis") 
.x(function(d) { return xlerp(d.year); })
.y(function(d) { return nlerp(d.yeld); });

svg.append("line")
.attr("x1",0)
.attr("y1",900)
.attr("x2",width)
.attr("y2",900)
.style("stroke","gray")
.style("stroke-width",2);


d3.selectAll(".region").each(function(d){


		chart=d3.select(this)
		.append("g")
		.attr("class","chart")
		.attr("transform", function(){console.log(d,d.x);return "translate("+(d.x-defsiz/2)+","+980+")"});

		maxpop=d3.max(lines[d.name],function(e){return e.population})
		minpop=d3.min(lines[d.name],function(e){return e.population})
		minyeld=d3.min(lines[d.name],function(e){return e.yeld})
		maxyeld=d3.max(lines[d.name],function(e){return e.yeld})
		mindem=d3.min(lines[d.name],function(e){return e.demand})
		maxdem=d3.max(lines[d.name],function(e){return e.demand})

		maxyear=d3.max(lines[d.name],function(e){return e.year})
		minyear=d3.min(lines[d.name],function(e){return e.year})

		//xAxis.tickValues([minyear, maxyear]);

		plerp.domain([minpop,maxpop]);
		dlerp.domain([mindem,maxdem]);
		nlerp.domain([minyeld,maxyeld]);
		xlerp.domain([minyear,maxyear]);

		chart.append("path")      // Add the valueline2 path.
        .attr("class", "valueline "+d.name)
        .style("stroke","#2FBAB2")
        .style("stroke-width",3)
        .style("fill","none")
        .attr("d", valueline1(lines[d.name]))

        chart.append("path")      // Add the valueline2 path.
        .attr("class", "valueline "+d.name)
        .style("stroke","#695C4B")
        .style("stroke-width",3)
        .style("fill","none")
        .attr("d", valueline2(lines[d.name]));

        chart.append("path")      // Add the valueline2 path.
        .attr("class", "valueline "+d.name)
        .style("stroke","#ED653F")
        .style("stroke-width",3)
        .style("fill","none")
        .attr("d", valueline3(lines[d.name]));
		
		chart.append("g")
		.attr("class", "axis")
		.call(xAxis)
		.attr("transform", "translate(0," + 62 + ")")
//var valueline2 = d3.svg.line()
//    .x(function(d) { return x(d.date); })
//    .y(function(d) { return y(d.open); });
})

}


//=====================================================================
// FLUXES
//=====================================================================



function createFluxes() {
    d3.selectAll(".region").each(function(d){

        flux=d3.select(this)
        .append("g")
        .attr("class",function(e){return "flux "+d.name})
        .on("mouseover",function(){
        	d3.selectAll(".flux path."+d.name)
        	.style("stroke","#aaa");
        	d3.selectAll(".netexchanges path."+d.name)
        	.style("stroke","#aaa");
        	d3.select(".demand."+d.name)
        	.attr("marker-end","url(#pointer4)")

        })

        .on("mouseout",function(){
        	d3.selectAll(".flux path."+d.name)
        	.style("stroke","#e2e2e2");
        	d3.selectAll(".netexchanges path."+d.name)
        	.style("stroke","#e2e2e2");
        	d3.select(".demand."+d.name)
        	.attr("marker-end","url(#pointer3)")
        })
        

        /*flux.append("rect")
        .attr("x",function(e){return e.x-defsiz/2+30})
        .attr("y",640)
        .attr("width",defsiz-60)
        .attr("height", 100)
        .style("fill","none")
        .style("stroke","gray")
        .style("stroke-width",3)

        flux.append("rect")
        .attr("x",function(e){return e.x-defsiz/2+30})
        .attr("y",640)
        .attr("width",defsiz-60)
        .attr("height", 8)
        .style("fill","#62ad6b")
        .style("stroke","none")*/

        flux
        .append("path")
        .style("stroke", "#e2e2e2")
        .style("fill","none")
        
        .attr("class",function(d) {return "offer "+d.name})
        .transition()
        .style("stroke-width", function(d){return d.leYeld/3})
        .attr("d", function(d) {return createOfferLine(d)});

        flux
        .append("path")
        .style("stroke", "#e2e2e2")
        .style("fill","none")
        .attr("marker-end","url(#pointer3)")
        .attr("class",function(d) {return "demand "+d.name})
        .transition()
        .style("stroke-width", function(d){return d.leDemand})
        .attr("d", function(d) {return createDemandLine(d)});

         flux
        .append("path")
            .style("stroke", "#e2e2e2")
            .style("fill","none")
            .attr("class",function(d) {return "selfexchange "+d.name})
            .style("stroke-width", function(d) {return d.leDemand-d.leYeld/3})
            .style("stroke-linecap","round")
            .attr("d", function(d) {
                return dirlink3(d.x,750,d.x,660+2.5*d.leDemand/4,10)});


        flux.append("rect")
        .attr("x",function(e){return e.x-5})
        .attr("y",660)
        .attr("width",10)
        .attr("height", function(d){return d.leDemand})
        .style("fill","gray")
        .style("stroke","none")

        going=$.grep(netExchanges,function(r){return r.source==d.name})
        
        h=0

        going.forEach(function(e){
            exc
            .append("path")
            .style("stroke", "#e2e2e2")
            .style("fill","none")
            
            .attr("class",function(d) {return "exchange "+e.source+" "+e.target})
            .transition()
            .style("stroke-width", e.value)
            .style("stroke-linecap","round")
            .attr("d", function() {
                source=$.grep(currData,function(r){return r.name==e.source})[0]
                target=$.grep(currData,function(r){return r.name==e.target})[0]
                return dirlink2(source.x,750,target.x,660+target.leYeld,4)});
            h+=e.value;
        })

        flux
        .append("circle")
        .attr("class",function(d) {return "stockCircle "+d.name})
        .style("stroke","none")
        .style("fill","gray")
        .attr("r",function(d){return sunlerp(d.stock)})
        .attr("cx",function(d){return d.x})
        .attr("cy",750);

        d3.selectAll(".stockCircle")
        .tooltip(function(d){
                    
        return {        
          //The text within the tooltip
          type:"tooltip",
          gravity:"north",
          text: "<b>"+d.name.replace(/_/g, ' ')+"</b><br/>Stock", 
          detection: "shape",
          //Where 
          placement: "fixed",
          // Base positioning. Not used when placement is "mouse"
          position: [d.x-100,d.y+388],
          //How far the tooltip is shifted from the base
          displacement: [0,0], //Shifting parts of the graph over.           
          //If "mouse"" is the base poistion, then mousemove true allows
          //the tooltip to move with the mouse
          mousemove: false
        };
    });

        flux
        .append("circle")
        .attr("class",function(d) {return "spaceOutline "+d.name})
        .style("stroke","gray")
        .style("stroke-width","2")
        .style("fill","none")
        .style("opacity","0.2")
        .style("stroke-dasharray", ("3, 3"))
        .attr("r",rad+20)
        .attr("cx",function(d){return d.x})
        .attr("cy",750);

    })
}


    function dirlink3(ax,ay,bx,by,i) {
    
      var x0 = ax,
          x1 = bx,
          y0 = ay,
          y1 = by,
          yi = d3.interpolateNumber(y0, y1),
          y2 = yi(.5);
          
          
      return "M" + x0 + "," + y0
           + "Q" + parseInt(x0+(y1-y0)) + "," + y1
           + " " + x1 + "," + y1;
          
    }

    function dirlink2(ax,ay,bx,by,i) {
    
      var x0 = ax,
          x1 = bx,
          y0 = ay,
          y1 = by,
          xi = d3.interpolateNumber(x0, x1),
          x2 = xi(.5);
          
          
      return "M" + x0 + "," + y0
           + "C" + x2 + "," + parseInt(y0+(x1-x0)*(0.5-i*0.05))
           + " " + (x1-60) + "," + y1
           + " " + x1 + "," + y1;
    }

    function createExchangeLine(e,h) {
        
        source=$.grep(currData,function(r){return r.name==e.source})[0]
        target=$.grep(currData,function(r){return r.name==e.target})[0]
        var x0 = source.x-70,
          x1 = target.x-70,
          y0 = 750+h,
          y1 = 750+h,
          xi = d3.interpolateNumber(x0, x1),
          x2 = xi(.7);
                   
      return "M" + x0 + "," + y0
           + "Q" + x2 + "," + y1
           + " " + x1 + "," + y1;
    }

    function createOfferLine(d) {

        var x0 = d.x-defsiz/2+30,
          x1 = d.x,
          y0 = 630,
          y1 = 660+d.leYeld/6,
          xi = d3.interpolateNumber(x0, x1),
          x2 = xi(.5);
                   
      return "M" + x0 + "," + y0
           + "Q" + x2 + "," + y1
           + " " + x1 + "," + y1;

    }

    function createDemandLine(d) {

        var x1 = d.x+defsiz/2-30,
          x0 = d.x,
          y1 = 630,
          y0 = 660+d.leDemand/2,
          xi = d3.interpolateNumber(x0, x1),
          x2 = xi(.5);
                   
      return "M" + x0 + "," + y0
           + "Q" + x2 + "," + y0
           + " " + x1 + "," + y1;

    }

/*$('.sun').tipsy({
	gravity: 's', 
	html: true, 
	title: function() {
	 var d = this.__data__;
	 return '<b>'+d.name+'</b><br/> Reflected solar radiation'; 
}});
*/
var ttip={}
$('.sun').aToolTip({
		onShow: function(){ttip = this.__data__;},      
        tipContent: '<b>'+ttip.name+'</b><br/> Reflected solar radiation'
    });