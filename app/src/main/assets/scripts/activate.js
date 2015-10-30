// helper function to output formatted results.
function show(value) {
    //var precision = 14;
    //document.open();
    //document.write(math.format(value, precision) + '<br>');
    var svg = d3.select("svg");

    var circle = svg.selectAll("circle")
	.data(value[0]);

    circle
	.style("fill", "steelblue")
	.attr("r", function(d){
		return 25;
	})
	.attr("cx", function(d,i) {return 100 + i * 100})
	.attr("cy", function(d,i) {return d * 600})
	.on("click", add);

    circle
	.enter()
	.append("circle");
}
var levelComplete = false;
var size = 6;
var state=math.ones([1,size]);
var edges=math.random([size,size],-1,1);
	edges=math.map(edges, function(e){
		return (e < 0) ? -1 : 1;
	});
var loop = function() {
    setTimeout(function() {
	var res = math.multiply(state,edges);
	var res2 = math.add(state,res);
	var squash = math.map(res2, function(x){
	    return 1 / (1 + math.pow(Math.E, -x));
	});
	show(squash);
	state = squash;
	state.forEach(function(s){
		console.log(s);
	})
	loop();
    },200);
};
loop();
var add = function(d, i) {
		var old = math.subset(edges, math.index(0, i)); 
		edges = math.subset(edges, math.index(0, i),
		old + Math.pow(-1, Math.floor(d + 0.5)));
		edges = math.map(edges, function(edge){
			return edge / math.max(edges);
		});
};
