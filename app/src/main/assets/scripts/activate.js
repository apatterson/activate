(function init(size) {
  var steps = 0,
      levelComplete = false,
      state=math.ones([1,size]),
      edges=math.random([size,size],0,1),
      steps = 0,
      edges=math.map(edges, function(e){
        return (e < 0) ? -1 : 1;
      });
  loop();
  function loop() {
    setTimeout(function() {
      var res = math.multiply(state,edges),
          res2 = math.add(state,res),
          squash = math.map(res2, function(x){
            return 1 / (1 + math.pow(Math.E, -x));
          }),
          diff = 0;
      show(squash);
      state = squash;
      state[0].forEach(function(s) {
        diff = diff + Math.abs(0.5 - s);
      });
      if(!levelComplete && diff < 1.0e-5 && diff > -1.0e-5) {
        levelComplete = true;
        Android.showToast("you won in " + steps + " steps");
      }
      loop();
    },200);
  };

  function show(value) {
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

  function add(d, i) {
    steps++;
    var old = math.subset(edges, math.index(0, i));
    edges = math.subset(edges, math.index(0, i),
                        old + Math.pow(-1, Math.floor(d + 0.5)));
    edges = math.map(edges, function(edge){
      return edge / math.max(edges);
    });
  };


})(parseInt(location.hash.replace('#', '')));
