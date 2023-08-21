let reset = false;
let node = [];

//
class Node {
  constructor() {
    this.startNode = false;
    this.endNode = false;
    this.distance = Infinity;
    this.isVisited = false;
    this.isWall = false;
    this.row = 0;
    this.column = 0;
    this.previous = null;

    //for a*
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.parent = null;

    // create a div element for this node
    this.element = document.createElement("div");
    this.element.classList.add("block");

    this.element.addEventListener("click", () => {
      if (!this.startNode && !this.endNode) {
        this.element.classList.add("wall");
        this.toggleWall();
      }
    });
  }

  // function to calculate the distance between this node's distance and another
  calcDistance(otherNode) {
    const movement = 1;
    const rowDiff = Math.abs(this.row - otherNode.row);
    const columnDiff = Math.abs(this.column - otherNode.column);
    return movement * (rowDiff + columnDiff);
  }

  //function to toggle walls on or off
  toggleWall() {
    if (this.isWall) {
      this.isWall = false;
      this.element.classList.remove("wall");
    } else {
      this.isWall = true;
    }
  }
  //
}
//

//function to generate grid
function generateGrid(rows, columns) {
  const grids = document.getElementById("gridContainer");

  for (let i = 0; i < rows; i++) {
    node[i] = [];
    for (let j = 0; j < columns; j++) {
      const cell = new Node();
      grids.appendChild(cell.element);
      cell.row = i;
      cell.column = j;
      node[i][j] = cell;
    }
  }

  return node;
}
//

//function to reset page
function resetPage(node, rows, columns) {
  reset = true;
  const grids = document.getElementById("gridContainer");
  grids.innerHTML = ""; //to clear the existing grid so that we dont create a new one at the bottom

  for (let i = 0; i < rows; i++) {
    //reinitialise each node again ;
    node[i] = [];
    for (let j = 0; j < columns; j++) {
      const cell = new Node();
      grids.appendChild(cell.element);
      cell.row = i;
      cell.column = j;
      cell.element.classList.remove("visited", "finalPath", "wall");
      cell.isWall = false;
      node[i][j] = cell;
    }
  }

  reset = false;
}
//

// djikstra algorithm
async function djikstraAlgo(startNode, node) {
  const unvisitedNodes = node.flat();
  let priorityQueue = [startNode];

  while (priorityQueue.length > 0) {
    // find the node with the smallest distance in the queue
    const currentNode = priorityQueue.shift();
    if (currentNode.isVisited) {
      continue;
    }
    currentNode.isVisited = true;

    if (currentNode !== startNode) {
      await animateVisited(currentNode); //to animate each node as it is visited
    }

    // get neighbors of the current node and calculate distance between each neighbor
    const neighbors = calcNeighbors(currentNode, node);
    for (const neighbor of neighbors) {
      if (neighbor.isWall) {
        continue;
      }

      const distanceNeighbor =
        currentNode.distance + currentNode.calcDistance(neighbor);

      if (distanceNeighbor < neighbor.distance) {
        //to check whether the current path is shorter than just going to the node in a straightforward manner
        neighbor.distance = distanceNeighbor;
        neighbor.previous = currentNode;
      }
      // put neighbor to priorityQueue
      priorityQueue.push(neighbor);

      if (neighbor.endNode) {
        //animate the final path after the visited nodes are animate
        const paths = shortestPath(neighbor);
        for (const path of paths) {
          await animateFinal(path); //animate each path towards the end node
        }
        return;
      }
    }
  }
}

//

// function to retrieve the shortest path from endNode to startNode
function shortestPath(endNode) {
  const path = [];
  let currentNode = endNode;

  while (currentNode !== null) {
    path.unshift(currentNode);
    currentNode = currentNode.previous;
  }

  return path;
}
//

// function to calculate the neighbors for each node
function calcNeighbors(currentNode, node) {
  const neighbors = [];
  const { row, column } = currentNode;

  const positions = [
    //not allowing for diagonals
    { row: -1, col: 0 }, // up
    { row: 1, col: 0 }, // down
    { row: 0, col: -1 }, // left
    { row: 0, col: 1 }, // right
  ];

  for (const p of positions) {
    const newRow = row + p.row;
    const newCol = column + p.col;

    // append to neighbors if node is within the grid boundaries
    if (
      newRow >= 0 &&
      newRow < node.length &&
      newCol >= 0 &&
      newCol < node[newRow].length
    ) {
      neighbors.push(node[newRow][newCol]);
    }
  }

  return neighbors;
}
//

//function to animate a node as it is visited in djikstra's
function animateVisited(node) {
  return new Promise((resolve) => {
    setTimeout(() => {
      node.element.classList.add("visited"); // apply animation class
      resolve();
    }, 0);
  });
}
//

//function to animate the final path
function animateFinal(node) {
  return new Promise((resolve) => {
    setTimeout(() => {
      node.element.classList.add("finalPath");
      resolve();
    }, 100);
  });
}
//

//bfs algorithm
async function bfsAlgo(startNode, node) {
  let queue = [startNode];
  let visitedNodes = new Set(); // Keep track of visited nodes

  while (queue.length > 0) {
    const currentNode = queue.shift();

    if (visitedNodes.has(currentNode)) {
      continue; // Skip visited nodes
    }

    visitedNodes.add(currentNode);

    if (currentNode !== startNode) {
      await animateVisited(currentNode); //to animate each node as it is visited
    }

    const neighbors = calcNeighbors(currentNode, node);
    for (const neighbor of neighbors) {
      if (neighbor.isWall || visitedNodes.has(neighbor)) {
        continue;
      }

      neighbor.previous = currentNode;

      queue.push(neighbor);

      if (neighbor.endNode) {
        const paths = shortestPath(neighbor);
        for (const path of paths) {
          await animateFinal(path); //animate each path towards the end node
        }
        return;
      }
    }
  }
}
//

//a* algorithm
async function aStarAlgo(startNode, endNode, node) {
  let openList = [startNode];
  let closeList = [];

  while (openList.length > 0) {
    let lowInd = 0;
    for (let i = 0; i < openList.length; i++) {
      if (openList[i].f < openList[lowInd].f) {
        lowInd = i;
      }
    }

    const currentNode = openList[lowInd];

    // Return if the endNode is found
    if (currentNode.endNode) {
      let finalPath = [];
      let curr = currentNode;
      while (curr.parent) {
        finalPath.push(curr);
        curr = curr.parent;
      }

      finalPath.reverse();
      for (const path of finalPath) {
        await animateFinal(path); //animate each path towards the end node
      }
      return;
    }

    openList.splice(lowInd, 1); // Remove current node from openList
    closeList.push(currentNode);

    let neighbors = calcNeighbors(currentNode, node);

    for (let neighbor of neighbors) {
      // Ignore if we have visited that node or that node is a wall
      if (closeList.includes(neighbor) || neighbor.isWall) {
        continue;
      }

      // g score is the shortest distance from the start to the current node
      let gScore = currentNode.g + 1;
      let gScoreIsBest = false;

      if (!openList.includes(neighbor)) {
        // Since it's the first time we arrived at this node, the g score must be the best
        gScoreIsBest = true;
        neighbor.h = heuristic(neighbor, endNode);
        openList.push(neighbor);
      } else if (gScore < neighbor.g) {
        // This means that we have seen the node but they have a worse g score
        gScoreIsBest = true;
      }

      if (gScoreIsBest) {
        // If we found an optimal path, record it
        neighbor.parent = currentNode;
        neighbor.g = gScore;
        neighbor.f = neighbor.g + neighbor.h;
      }
    }
  }
}
//

//function to calculate heuristic
function heuristic(currentNode, endNode) {
  let h =
    Math.abs(currentNode.column - endNode.column) +
    Math.abs(currentNode.row - endNode.row);

  return h;
}
//

export { djikstraAlgo, generateGrid, resetPage, bfsAlgo, aStarAlgo };