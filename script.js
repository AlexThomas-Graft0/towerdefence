const tileSelect = document.querySelector(".tile-select");
const tiles = tileSelect.querySelectorAll(".tile");
const grid = document.querySelector(".grid");
const saveButton = document.getElementById("save-button");
const startPointButton = document.getElementById("start-point-button");
const endPointButton = document.getElementById("end-point-button");
let currentTile = "";
let startPoint = null;
let endPoint = null;
const map = [];

// Create blank grid
for (let i = 0; i < 20; i++) {
  const row = [];
  for (let j = 0; j < 20; j++) {
    row.push("G");
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.dataset.row = i;
    tile.dataset.col = j;
    grid.appendChild(tile);
  }
  map.push(row);
}

// Add event listeners to tiles and grid
tileSelect.addEventListener("click", (event) => {
  if (event.target.classList.contains("tile")) {
    tiles.forEach((tile) => tile.classList.remove("selected"));
    event.target.classList.add("selected");
    currentTile = event.target.dataset.type;
  }
});

grid.addEventListener("mousedown", (event) => {
  if (event.target.classList.contains("tile")) {
    isMouseDown = true;
    updateTile(event.target);
  }
});

grid.addEventListener("mouseup", () => {
  isMouseDown = false;
});

grid.addEventListener("mouseleave", () => {
  isMouseDown = false;
});

grid.addEventListener("mouseover", (event) => {
  if (isMouseDown && event.target.classList.contains("tile")) {
    updateTile(event.target);
  }
});

// Add event listener to save button
saveButton.addEventListener("click", () => {
  console.log(map);
});

// Add event listeners to start and end point buttons
startPointButton.addEventListener("click", () => {
  if (currentTile === "start") {
    startPointButton.classList.add("selected");
    endPointButton.classList.remove("selected");
    startPoint = true;
    endPoint = false;
  }
});

endPointButton.addEventListener("click", () => {
  if (currentTile === "end") {
    endPointButton.classList.add("selected");
    startPointButton.classList.remove("selected");
    endPoint = true;
    startPoint = false;
  }
});

// Function to update tile based on current tile type
function updateTile(tile) {
  const row = parseInt(tile.dataset.row);
  const col = parseInt(tile.dataset.col);

  if (currentTile !== "") {
    map[row][col] = currentTile[0];
    tile.className = "tile " + currentTile;
  }

  if (startPoint) {
    map[row][col] = "S";
    tile.className = "tile start";
    startPoint = false;
  }

  if (endPoint) {
    map[row][col] = "E";
    tile.className = "tile end";
    endPoint = false;
  }
}
