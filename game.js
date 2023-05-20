const prompt = require("prompt-sync")({ sigint: true });

// [Horizontal, Vertical]
// -int Left and Bottom
// +int Right and Top
const KNIGHT_POSSIBLE_MOVES = [
  [1, 2],
  [-1, 2],
  [2, 1],
  [-2, 1],
  [-2, -1],
  [-1, -2],
  [1, -2],
  [2, -1]
];

class Knight {
  constructor(location) {
    this.icon = 'I am knight.',
    this.location = location
  }

  move(location) {
    if (this.validMove(location)) {
      this.location = location;
    } else {
      console.log('Invalid move');
    }
  }

  // Check if a new Location is a valid move for the knight.
  validMove(newLocation) {
    const oldLocation = this.location;

    const moveDiff = [Math.abs(oldLocation[0] - newLocation[0]), Math.abs(oldLocation[1] - newLocation[1])];
    return KNIGHT_POSSIBLE_MOVES.find(possibleMove => {
      return possibleMove[0] === moveDiff[0] && possibleMove[1] === moveDiff[1] ? true : false;
    });
  }
}

class ChessBoard {
  constructor() {
    this.board = new Array(8).fill(new Array(8).fill([]));
  }
}

class Tree {
  constructor(location) {
    this.root = new Node(location);
  }
}

class Node {
  constructor(location) {
    this.data = location
    this.children = []
  }
}

// Tree will build 
const buildTree = (rootNode, endLocation) => {
  return nextPossibleMoves(rootNode, endLocation);
}

// From Knights starting position, we can iterate through the possible moves, and check to see if the possible move is valid, and if it's valid, then it is a child of the starting postion.
// Possible 8 moves.
// Then we would do it again, with each of the children of the starting position. 
const nextPossibleMoves = (currentLocation, endLocation) => {
  let queue = [currentLocation];
  
  let foundEndLocation = false;

  while (!foundEndLocation) {
    const currentNode = queue.shift();
    KNIGHT_POSSIBLE_MOVES.forEach(move => {
      const nextLocation = [currentNode.data[0] + move[0], currentNode.data[1] + move[1]];
      if (nextLocation[0] >= 0 && nextLocation[0] < 8 && nextLocation[1] >= 0 && nextLocation[1] < 8) {
        if (nextLocation[0] === endLocation[0] && nextLocation[1] === endLocation[1]) {
          foundEndLocation = true;
        }
        const newNode = new Node(nextLocation);
        queue.push(newNode);
        currentNode.children.push(newNode);
      }
    });
  }
  return;
}

// build a function knightMoves that shows the shortest possible way to get
// from one square to another by outputting 
// all squares the knight will stop on along the way.
class Game {
  constructor(start) {
    this.board = new ChessBoard;
    this.knight = new Knight(start);
  }

  knightMoves(start, end) {
    // Based on knights location (root)
    // Create new Tree Class based on knight's starting location.
    const tree = new Tree(start);
    buildTree(tree.root, end);

    let possibleMoves = [];
    tree.root.children.forEach(child => {
      possibleMoves.push(findEndLocation(child, endLocation));
    });

    console.log('Possible Moves: ', possibleMoves);


    let filteredMoves = [];
    for (let i = 0; i < possibleMoves.length; i++) {
      const moveSet = possibleMoves[i];
      // if moveset === false, not the path.
      if (moveSet === false) {
        continue;
      }

      console.log(moveSet);

      // Array with moves locations. 
      for (let j = 0; j < moveSet.length; j++) {
        const move = moveSet[j];
        if (move[0] === endLocation[0] && move[1] === endLocation[1]) {
          filteredMoves.push(moveSet);
        }
      }
    }

    /*
    let shortestMoveset = filteredMoves[0];
    for (let a = 1; a < filteredMoves.length; a++) {
      if (filteredMoves[a].length <= shortestMoveset.length) {
        shortestMoveset = filteredMoves[a];
      }
    }
    console.log()
    return `${start} => ${shortestMoveset.join(' => ')}`;
    */
  }
}

const findEndLocation = (root, endLocation) => {
  // If the current root is the end location, we found it. SO what do we want to do.
  if (root.data[0] === endLocation[0] && root.data[1] === endLocation[1]) {
    return [root.data];
  }

  // If there are no more children, then we go back up the stack, because we can't keep looking in this direction.
  if (!root.children.length) {
    return false;
  }

  let arr = [];
  root.children.forEach(child => {
    const recursionResult = findEndLocation(child, endLocation);
    if (!recursionResult) {
      return false;
    } else {
      recursionResult.unshift(root.data);
      console.log('Recursion Result: ', recursionResult);
      arr.push(recursionResult);
    }
  });

  return arr;
}

const promptStartingLocation = prompt('Input Starting Location: "x y"');
const promptEndingLocation = prompt('Input Ending Location: "x y"');
const startLocation = [parseInt(promptStartingLocation.split(' ')[0]), parseInt(promptStartingLocation.split(' ')[1])];
const game = new Game(startLocation);
const endLocation = [parseInt(promptEndingLocation.split(' ')[0]), parseInt(promptEndingLocation.split(' ')[1])];

game.knightMoves(startLocation, endLocation);