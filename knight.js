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

export class Knight {
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