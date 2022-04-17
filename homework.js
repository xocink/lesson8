class Edge {
  constructor(fromVertex, toVertex, weight) {
    this.from = fromVertex;
    this.to = toVertex
    this.weight = weight;
  }
}

class WeightGraph {
  constructor() {
    this.vertices = {};
  }

  addVertex(value) {
    if (!this.vertices[value]) {
      this.vertices[value] = {};
    }
  }

  addEdge(vertex1, vertex2, weight) {
    if (!(vertex1 in this.vertices) || !(vertex2 in this.vertices)) {
      throw new Error('В графе нет таких вершин');
    }

    if (!(vertex2 in this.vertices[vertex1] )) {
      const tempObj = {};
      tempObj[vertex2] = weight;
      const tempObj2 = {};
      tempObj2[vertex1] = weight;
      this.vertices[vertex1] = {...this.vertices[vertex1], ...tempObj};
      this.vertices[vertex2]= {...this.vertices[vertex2], ...tempObj2};

      const s = 1;
    }

    if (!(vertex1 in this.vertices[vertex2])) {
      const tempObj = {};
      tempObj[vertex2] = weight;
      const tempObj2 = {};
      tempObj2[vertex1] = weight;
      this.vertices[vertex2]= {...this.vertices[vertex2], ...tempObj};
      this.vertices[vertex1] = {...this.vertices[vertex1], ...tempObj2};
      const s = 1;
    }
  }
}




class Dijkstra {

  constructor(graph) {
    this.graph = graph;
  }

  findNearestVertex(distances, visited) {
    let minDistance = Infinity;
    let nearestVertex = null;

    Object.keys(distances).forEach(vertex => {
      if (!visited[vertex] && distances[vertex] < minDistance) {
        minDistance = distances[vertex];
        nearestVertex = vertex;
      }
    });

    return nearestVertex;
  }

  dijkstra(startVertex) {
    const graph = this.graph
    let visited = {};
    let distances = {};
    let previous = {};

    let vertices = Object.keys(graph);

    vertices.forEach(vertex => {
      distances[vertex] = Infinity;
      previous[vertex] = null;
    });

    distances[startVertex] = 0;

    function handleVertex(vertex) {
      let activeVertexDistance = distances[vertex];

      let neighbours = graph[activeVertex];

      Object.keys(neighbours).forEach(neighbourVertex => {
        let currentNeighbourDistance = distances[neighbourVertex];

        let newNeighbourDistance = activeVertexDistance + neighbours[neighbourVertex];

        if (newNeighbourDistance < currentNeighbourDistance) {
          distances[neighbourVertex] = newNeighbourDistance;
          previous[neighbourVertex] = vertex;
        }
      });

      visited[vertex] = 1;
    }

    let activeVertex = this.findNearestVertex(distances, visited);

    while(activeVertex) {
      handleVertex(activeVertex);
      activeVertex = this.findNearestVertex(distances, visited);
    }

    return { distances, previous };
  }

  findShortestPath(startVertex, finishVertex) {
    let result = this.dijkstra(startVertex);

    if (!(finishVertex in result.previous))
      throw new Error(`Нет пути из вершины ${startVertex} в вершину ${finishVertex}`);

    let path = [];
    let currentVertex = finishVertex;
    while(currentVertex !== startVertex) {
      path.unshift(currentVertex);
      currentVertex = result.previous[currentVertex];
    }

    path.unshift(startVertex);

    return {path, distance: result.distances[finishVertex]};
  }

  findAllShortestPath(finishVertex) {
    const vertices = Object.keys(this.graph);
    const result = {}
    vertices.forEach((vertex) => result[vertex] = this.findShortestPath(vertex, finishVertex));
    return result
  }
}

const vertices = [
  '1',
  '2',
  '3',
  '4',
];

const edges = [
  new Edge('1', '3', 4),
  new Edge('1', '2', 5),
  new Edge('1', '4', 3),
  new Edge('2', '3', 5),
  new Edge('2', '4', 6),
];

const testGraph = new WeightGraph()
vertices.forEach(verticle => testGraph.addVertex(verticle));
edges.forEach(edge => testGraph.addEdge(edge.from, edge.to, edge.weight));

const testDijkstra = new Dijkstra(testGraph.vertices);
console.log(testDijkstra.findAllShortestPath('4'))
console.log(testDijkstra.findShortestPath('4', '3'))
