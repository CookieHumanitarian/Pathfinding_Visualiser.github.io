import {
  djikstraAlgo,
  generateGrid,
  resetPage,
  bfsAlgo,
  aStarAlgo,
} from "./helpers.js";

// Define global variables
let node = [];
let startNode = null;
let endNode = null;
const rows = 9;
const columns = 60;
let allowReset = false;
const gridContainer = document.getElementById("gridContainer");
//

// initialize a grid of nodes
window.addEventListener("load", () => {
  node = generateGrid(rows, columns);
  //start and end nodes
  startNode = node[4][25];
  startNode.distance = 0;
  startNode.startNode = true;
  startNode.element.classList.add("start");
  startNode.element.setAttribute("draggable", "true");

  endNode = node[4][34];
  endNode.endNode = true;
  endNode.element.classList.add("end");
  //

  // reset everything
  const reset = document.getElementById("resetButton");
  reset.addEventListener("click", () => {
    if (allowReset) {
      resetPage(node, rows, columns);
      callReset();
      attachDragListeners();
    }
  });

  //call reset for other functions
  function callReset() {
    // restore starting nodes
    startNode = node[4][25];
    startNode.distance = 0;
    startNode.startNode = true;
    startNode.element.classList.add("start");
    startNode.element.setAttribute("draggable", "true");

    endNode = node[4][34];
    endNode.endNode = true;
    endNode.element.classList.add("end");
    allowReset = false; // reset the allowReset flag
  }

  //dragging for start and end node
  let startNodeDragging = false;
  let endNodeDragging = false;

  startNode.element.setAttribute("draggable", "true");
  startNode.element.addEventListener("dragstart", (event) => {
    startNodeDragging = true; // Set flag to indicate start node dragging
    endNodeDragging = false; // Reset end node dragging flag
    event.dataTransfer.setData(
      "text/plain",
      `${startNode.row},${startNode.column}`
    );
  });

  //end node drag function
  endNode.element.setAttribute("draggable", "true");
  endNode.element.addEventListener("dragstart", (event) => {
    endNodeDragging = true; // Set flag to indicate end node dragging
    startNodeDragging = false; // Reset start node dragging flag
    event.dataTransfer.setData(
      "text/plain",
      `${endNode.row},${endNode.column}`
    );
  });

  //attach a "dragover" event listener to the grid container
  gridContainer.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  //attach a "drop" event listener to the grid container
  gridContainer.addEventListener("drop", (event) => {
    event.preventDefault();

    //get the mouse cursor's position relative to the grid container
    const mouseX = event.clientX - gridContainer.getBoundingClientRect().left;
    const mouseY = event.clientY - gridContainer.getBoundingClientRect().top;

    //calculate the row and column based on the cursor position and the cell size
    const cellWidth = gridContainer.clientWidth / columns;
    const cellHeight = gridContainer.clientHeight / rows;
    const newRow = Math.floor(mouseY / cellHeight);
    const newColumn = Math.floor(mouseX / cellWidth);

    const dropNode = node[newRow][newColumn];

    // check if the dropped node is the start node or the end node
    if (startNodeDragging) {
      // update the start node's position and classes
      startNode.element.classList.remove("start", "draggable");
      startNode.startNode = false;
      startNode.distance = Infinity;

      startNode = dropNode;
      startNode.startNode = true;
      startNode.element.classList.add("start");

      node[startNode.row][startNode.column] = dropNode;
      node[newRow][newColumn] = startNode;

      startNode.row = newRow;
      startNode.column = newColumn;
      startNode.distance = 0;
      startNode.previous = null;

      startNodeDragging = false;
      endNodeDragging = false;
    } else if (endNodeDragging) {
      // update the end node's position and classes
      endNode.element.classList.remove("end", "draggable");
      endNode.endNode = false;
      endNode.distance = Infinity;

      endNode = dropNode;
      endNode.endNode = true;
      endNode.element.classList.add("end");

      node[endNode.row][endNode.column] = dropNode;
      node[newRow][newColumn] = endNode;

      endNode.row = newRow;
      endNode.column = newColumn;

      startNodeDragging = false;
      endNodeDragging = false;
    }
  });
  //

  //to attach the drag listeners after reset is called
  function attachDragListeners() {
    // Start node drag function
    startNode.element.setAttribute("draggable", "true");
    startNode.element.addEventListener("dragstart", (event) => {
      startNodeDragging = true;
      endNodeDragging = false;
      event.dataTransfer.setData(
        "text/plain",
        `${startNode.row},${startNode.column}`
      );
    });

    // End node drag function
    endNode.element.setAttribute("draggable", "true");
    endNode.element.addEventListener("dragstart", (event) => {
      endNodeDragging = true;
      startNodeDragging = false;
      event.dataTransfer.setData(
        "text/plain",
        `${endNode.row},${endNode.column}`
      );
    });
  }
  //

  // djikstra simulation
  const djikstra = document.getElementById("runDjikstra");
  djikstra.addEventListener("click", async () => {
    //for multiple buttons have if conditions to check what kind of algo to run
    allowReset = false;
    await djikstraAlgo(startNode, node);
    allowReset = true;
  });
  //

  // bfs simulation
  const bfs = document.getElementById("runBFS");
  bfs.addEventListener("click", async () => {
    //for multiple buttons have if conditions to check what kind of algo to run
    allowReset = false;
    await bfsAlgo(startNode, node);
    allowReset = true;
  });
  //

  // A* simulation
  const aStar = document.getElementById("runAstar");
  aStar.addEventListener("click", async () => {
    //for multiple buttons have if conditions to check what kind of algo to run
    allowReset = false;
    await aStarAlgo(startNode, endNode, node);
    allowReset = true;
  });
  //
});