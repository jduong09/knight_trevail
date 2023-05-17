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
    this.root = buildTree(location); 
  }
}

class Node {
  constructor(location) {
    this.data = location
    this.children = []
  }
}

// Tree will build 
const buildTree(location) {
  const root = new Node(location);

  KNIGHT_POSSIBLE_MOVES.forEach(move => {
    
  });
}

// build a function knightMoves that shows the shortest possible way to get
// from one square to another by outputting 
// all squares the knight will stop on along the way.
class Game {
  constructor() {
    this.board = new ChessBoard;
    this.knight = new Knight([0, 0]);
  }

  run() {
    this.knight.move([2, 1]);
    return this.knight.location;
  }

  knightMoves(location) {
    // Based on knights location (root)
    // Need all possible move the knight can make
    // 8 subtrees, each subtree then has 8 subtrees.
    // again and again until we reach location.

  }
}

const game = new Game();
console.log(game.run());