# pathfinding.github.io

Website: https://cookiehumanitarian.github.io/Pathfinding_Visualiser.github.io/

**Overview**

This project is a pathfinding algorithm visualizer built with JavaScript, HTML, and CSS. The application allows you to visualize different pathfinding algorithms on a grid, helping you understand how each algorithm navigates from a start node to an end node.

**Features**

Pathfinding Algorithms:
1. Dijkstra's Algorithm
2. Breadth-First Search (BFS)
3. A* Search Algorithm

Interactive Grid:
1. Drag-and-drop functionality for start and end nodes.
2. Toggle walls to create obstacles for pathfinding.

Reset Grid: Clear the grid and restore the start and end nodes to their default positions.

**How to Run**

Clone this repository:
git clone <repository-url>

Navigate to the project directory:
cd pathfinding-visualizer

Open the index.html file in your browser to run the visualizer.

**Functionality**

1. Grid Generation: The grid consists of 9 rows and 60 columns, with each cell being an instance of the Node class. Each node can act as either:
- Start Node
- End Node
- Wall (Obstacle)

2. Dragging Start and End Nodes: You can drag and drop the Start Node and End Node to new locations on the grid. The position of the nodes is recalculated, and the algorithms will compute paths from the new start to the end node.

3. Walls: Clicking on a node will toggle it as a wall. Walls are obstacles that pathfinding algorithms will avoid.

**Pathfinding Algorithms**
1. Dijkstra's Algorithm: The most efficient algorithm in terms of shortest paths but may take longer depending on the grid setup.
2. BFS: Explores all possible paths layer by layer. It guarantees the shortest path for unweighted grids.
3. A*: Uses both the cost of reaching a node and an estimate of the distance to the end to find an optimal path.
