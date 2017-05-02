const renderForceDirectedGraph = data => {
  // set up required dimensions
  const width = 1050;
  const height = 750;
  const margin = { top: 30, right: 30, bottom: 30, left: 30 };

  // append svg to DOM
  const svg = d3.select('.svg-container')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // configure force directed graph
  const simulation = d3.forceSimulation()
      .nodes(data.nodes)
      .force('links', d3.forceLink(data.links))
      .force('charge', d3.forceManyBody().strength(-10).distanceMax(25))
      .force('center', d3.forceCenter((width - (margin.left + margin.right))/ 2, (height - (margin.top + margin.bottom)) / 2))
      .force('collide', d3.forceCollide(20))
      .on('tick', tick);

  // add flag nodes - must be non-svg elements, as img can not be a child of svg
  const node = d3.select('.container').append('div')
      .attr('id', 'flag-img-container')
      .selectAll('img')
      .data(data.nodes)
      .enter()
      .append('img')
      .attr('class', d => `flag flag-${d.code}`)
      .call(d3.drag()
        .on('start', dragStart)
        .on('drag', dragging)
        .on('end', dragEnd));

  // add line for each link in dataset
  const link = svg.append('g')
    .attr('class', 'link')
    .selectAll('line')
    .data(data.links)
    .enter()
    .append('line')
    .attr('stroke', 'black');

  // function declarations instead of expressions to allow hoisting
  function tick() {
    node
      .style('left', d => `${d.x + 93}px`)
      .style('top', d => `${d.y + 97}px`);

    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);
  }

  function dragStart(d) {
    if (!d3.event.active) simulation.alphaTarget(0.5).restart()
  }

  function dragging(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragEnd(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = undefined;
    d.fy = undefined;
  }
};

const url = 'https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json';

$.getJSON(url, (data) => renderForceDirectedGraph(data));
