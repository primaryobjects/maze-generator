export var MazeManager = {
  grid: null,
  
  DIRECTION: {
    TOP: 2,
    RIGHT: 4,
    BOTTOM: 8,
    LEFT: 16
  },
  
  initialize: function(width, height) {
    MazeManager.grid = [];
    
    // Initialize cells to 0.
    for (var y=0; y<height; y++) {
      for (var x=0; x<width; x++) {
        MazeManager.grid[y] = MazeManager.grid[y] || [];
        MazeManager.grid[y][x] = 0;
      }
    }

    MazeManager.carve(0, 0);
  },

  opposite: function(direction) {
    var result = 0;
    
    switch(direction) {
     case MazeManager.DIRECTION.TOP: result = MazeManager.DIRECTION.BOTTOM; break;
     case MazeManager.DIRECTION.RIGHT: result = MazeManager.DIRECTION.LEFT; break;
     case MazeManager.DIRECTION.BOTTOM: result = MazeManager.DIRECTION.TOP; break;
     case MazeManager.DIRECTION.LEFT: result = MazeManager.DIRECTION.RIGHT; break;
    };
    
    return result;
  },
  
  path: function(fromX, fromY, toX, toY, direction) {
    MazeManager.grid[fromY][fromX] |= direction;
    MazeManager.grid[toY][toX] |= MazeManager.opposite(direction);
    
    // Carve a path from the new cell.
    MazeManager.carve(toX, toY);
  },
  
  carve: function(x, y) {
    // Carve a path from x,y to an adjacent cell.
    
    // First, try each direction (in random order).
    var directions = [0, 1, 2, 3].sort(() => Math.random() * 2 - 1);

    directions.forEach(function(direction) {
      if (direction === 0 && y-1 >= 0 && MazeManager.grid[y-1][x] === 0) {
        // Top.
        MazeManager.path(x, y, x, y - 1, MazeManager.DIRECTION.TOP);
      }
      else if (direction === 1 && x + 1 < MazeManager.grid[0].length && MazeManager.grid[y][x+1] === 0) {
        // Right.
        MazeManager.path(x, y, x + 1, y, MazeManager.DIRECTION.RIGHT);
      }
      else if (direction === 2 && y + 1 < MazeManager.grid.length && MazeManager.grid[y+1][x] === 0) {
        // Bottom.
        MazeManager.path(x, y, x, y + 1, MazeManager.DIRECTION.BOTTOM);
      }
      else if (direction === 3 && x - 1 >= 0 && MazeManager.grid[y][x-1] === 0) {
        // Left.
        MazeManager.path(x, y, x - 1, y, MazeManager.DIRECTION.LEFT);
      }
    });
  },

  toString: function() {
    var result = '';

    // Top border.
    for (var x=0; x<MazeManager.grid[0].length * 2; x++) {
      result += '_';
    }

    result += '\n';

    // Main content.
    for (var y=0; y<MazeManager.grid.length; y++) {
      result += '|';

      for (var x=0; x<MazeManager.grid[0].length; x++) {
        // We only need to check south and east (because north and west have borders already included).
        result += (MazeManager.grid[y][x] & MazeManager.DIRECTION.BOTTOM) === MazeManager.DIRECTION.BOTTOM ? ' ' : '_';
        result += (MazeManager.grid[y][x] & MazeManager.DIRECTION.RIGHT) === MazeManager.DIRECTION.RIGHT ? ' ' : '|';
      }

      result += '\n';
    }

    return result;
  }
};
