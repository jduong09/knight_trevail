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

  knightMoves(endLocation) {
    // Based on knights location (root)
    // Create new Tree Class based on knight's starting location.
    const tree = new Tree(this.knight.location);
    buildTree(tree.root, endLocation);
    const string = displayFastestMove(tree.root, endLocation);
    return string;
    
  }
}

const findEndLocation = (root, endLocation) => {
  if (!root.children.length) {
    return;
  }

  if (root.data[0] === endLocation[0] && root.data[1] === endLocation[1]) {
    return `${root.data}`;
  }

  return `${root.data} - ${displayFastestMove(endLocation)}`;
}

const promptStartingLocation = prompt('Input Starting Location: "x y"');
const promptEndingLocation = prompt('Input Ending Location: "x y"');
const game = new Game([parseInt(promptStartingLocation.split(' ')[0]), parseInt(promptStartingLocation.split(' ')[1])]);
console.log(game);
const endLocation = [parseInt(promptEndingLocation.split(' ')[0]), parseInt(promptEndingLocation.split(' ')[1])];

console.log(game.knightMoves(endLocation));