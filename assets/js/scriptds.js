function renderForceDirectedGraph(data) {
  console.log(data);

    // set up required dimensions
  const width = 1150;
  const height = 650;
  const margin = { top: 30, right: 30, bottom: 30, left: 30 };
  const legendRectHeight = 20;
  const legendRectWidth = 26;
  const legendX = width - margin.right + 30;
  const legendY = margin.top;
  const legendTextX = legendX + legendRectWidth / 2;
  const legendTextY = legendY + legendRectHeight / 2;

  // append svg to DOM
  const svg = d3.select('.svg-container')
    .append('svg')
    .attr('width', width)
    .attr('height', height);


  const simulation = d3.forceSimulation()
    .force('center', d3.forceCenter((width - (margin.left + margin.right))/ 2, (height - (margin.top + margin.bottom)) / 2))
    .force('charge', d3.forceManyBody())
    .force('link', d3.forceLink().id(d => d.index));

  const link = svg.selectAll('.link')
    .data(data.links, d => d.target)
    .enter()
    .append('line')
    .attr('stroke', '#000000')
    .attr('class', 'link');

  const node = svg.selectAll('.node')
    .data(data.nodes)
    .enter()
    .append('g')
    .attr('class', 'node');

  node.append('circle')
    .attr('fill', '#000')
    .attr('r', 2.5)
    .attr('cx', d => d.x)
    .attr('cy', d => d.y);


    simulation
             .on("tick", () => {
                 link
                   .attr("x1", function(d) { return d.source.x; })
                   .attr("y1", function(d) { return d.source.y; })
                   .attr("x2", function(d) { return d.target.x; })
                   .attr("y2", function(d) { return d.target.y; });

                 node
                   .attr("cx", function(d) { return d.x; })
                   .attr("cy", function(d) { return d.y; });
             });

        //  simulation.force("link")
        //      .links(data.links)

  // const ticked = function() {
  //   link
  //     .attr("x1", function(d) { return d.source.x; })
  //     .attr("y1", function(d) { return d.source.y; })
  //     .attr("x2", function(d) { return d.target.x; })
  //     .attr("y2", function(d) { return d.target.y; });
  //
  //   node
  //     .attr("cx", function(d) { return d.x; })
  //     .attr("cy", function(d) { return d.y; });
  // };

}

const url = 'https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json';

$.getJSON(url, (data) => renderForceDirectedGraph(data));
