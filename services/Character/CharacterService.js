const Character = require("../../constants/Character");
const Player = require("../../constants/Player");
const Position = require("../../constants/Position");

class CharacterService {
    constructor(){}

    async finalPosition(characterType, move, currentPosition, _player) {
        try {
            let finalPosition = [];
            switch (characterType) {
                case Character.PAWN:
                    finalPosition = this.pawn(currentPosition[0], currentPosition[1], move, _player);
                    break;
                case Character.ROOK:
                    finalPosition = this.rook(currentPosition[0], currentPosition[1], move, _player);
                    break;
                case Character.BISHOP:
                    finalPosition = this.bishop(currentPosition[0], currentPosition[1], move, _player);
                    break;
                case Character.KNIGHT:
                    finalPosition = this.knight(currentPosition[0], currentPosition[1], move, _player);
                    break;
                default:
                    console.error('-------- Unexpected Error: Invalid Character --------');
                    finalPosition = [];
                    break;
            }
            return finalPosition;
        } catch (error) {
            console.error('-------- Error in function finalPosition --------');
            console.error(error);
            throw error;
        }
    }

    async pawn(currentXPosition, currentYPosition, move, _player) {
        try {
            let finalXPosition = undefined;
            let finalYPosition = undefined;

            if (_player === Player.PLAYER_2) {
                if (move === Position.LEFT) {
                    finalXPosition = currentXPosition;
                    finalYPosition = currentYPosition-1;
                } else if (move === Position.RIGHT) {
                    finalXPosition = currentXPosition;
                    finalYPosition = currentYPosition+1;
                } else if (move === Position.FORWARD) {
                    finalXPosition = currentXPosition-1;
                    finalYPosition = currentYPosition;
                } else if (move === Position.BACKWARD) {
                    finalXPosition = currentXPosition+1;
                    finalYPosition = currentYPosition;
                }

            } else {
                if (move === Position.LEFT) {
                    finalXPosition = currentXPosition;
                    finalYPosition = currentYPosition+1;
                } else if (move === Position.RIGHT) {
                    finalXPosition = currentXPosition;
                    finalYPosition = currentYPosition-1;
                } else if (move === Position.FORWARD) {
                    finalXPosition = currentXPosition+1;
                    finalYPosition = currentYPosition;
                } else if (move === Position.BACKWARD) {
                    finalXPosition = currentXPosition-1;
                    finalYPosition = currentYPosition;
                }
            }
            return [finalXPosition, finalYPosition];
        } catch (error) {
            console.error('-------- Error in function pawn --------');
            console.error(error);
            throw error;
        }
    }

    async rook(currentXPosition, currentYPosition, move, _player) {
        try {
            let finalXPosition = undefined;
            let finalYPosition = undefined;

            if (_player === Player.PLAYER_2) {
                if (move === Position.LEFT) {
                    finalXPosition = currentXPosition;
                    finalYPosition = currentYPosition-2;
                } else if (move === Position.RIGHT) {
                    finalXPosition = currentXPosition;
                    finalYPosition = currentYPosition+2;
                } else if (move === Position.FORWARD) {
                    finalXPosition = currentXPosition-2;
                    finalYPosition = currentYPosition;
                } else if (move === Position.BACKWARD) {
                    finalXPosition = currentXPosition+2;
                    finalYPosition = currentYPosition;
                }

            } else {
                if (move === Position.LEFT) {
                    finalXPosition = currentXPosition;
                    finalYPosition = currentYPosition+2;
                } else if (move === Position.RIGHT) {
                    finalXPosition = currentXPosition;
                    finalYPosition = currentYPosition-2;
                } else if (move === Position.FORWARD) {
                    finalXPosition = currentXPosition+2;
                    finalYPosition = currentYPosition;
                } else if (move === Position.BACKWARD) {
                    finalXPosition = currentXPosition-2;
                    finalYPosition = currentYPosition;
                }
            }
            return [finalXPosition, finalYPosition];
        } catch (error) {
            console.error('-------- Error in function pawn --------');
            console.error(error);
            throw error;
        }
    }

    async bishop(currentXPosition, currentYPosition, move, _player) {
        try {
            let finalXPosition = undefined;
            let finalYPosition = undefined;

            if (_player === Player.PLAYER_2) {
                if (move === Position.FORWARD_LEFT) {
                    finalXPosition = currentXPosition-2;
                    finalYPosition = currentYPosition-2;
                } else if (move === Position.FORWARD_RIGHT) {
                    finalXPosition = currentXPosition-2;
                    finalYPosition = currentYPosition+2;
                } else if (move === Position.BACKWARD_LEFT) {
                    finalXPosition = currentXPosition+2;
                    finalYPosition = currentYPosition-2;
                } else if (move === Position.BACKWARD_RIGHT) {
                    finalXPosition = currentXPosition+2;
                    finalYPosition = currentYPosition+2;
                }

            } else {
                if (move === Position.FORWARD_LEFT) {
                    finalXPosition = currentXPosition+2;
                    finalYPosition = currentYPosition+2;
                } else if (move === Position.FORWARD_RIGHT) {
                    finalXPosition = currentXPosition+2;
                    finalYPosition = currentYPosition-2;
                } else if (move === Position.BACKWARD_LEFT) {
                    finalXPosition = currentXPosition-2;
                    finalYPosition = currentYPosition+2;
                } else if (move === Position.BACKWARD_RIGHT) {
                    finalXPosition = currentXPosition-2;
                    finalYPosition = currentYPosition-2;
                }
            }
            return [finalXPosition, finalYPosition];
        } catch (error) {
            console.error('-------- Error in function pawn --------');
            console.error(error);
            throw error;
        }
    }

    async knight(currentXPosition, currentYPosition, move, _player) {
        try {
            let finalXPosition = undefined;
            let finalYPosition = undefined;

            if (_player === Player.PLAYER_2) {
                if (move === Position.FORWARD_LEFT) {
                    finalXPosition = currentXPosition-2;
                    finalYPosition = currentYPosition-1;
                } else if (move === Position.FORWARD_RIGHT) {
                    finalXPosition = currentXPosition-2;
                    finalYPosition = currentYPosition+1;
                } else if (move === Position.BACKWARD_LEFT) {
                    finalXPosition = currentXPosition+2;
                    finalYPosition = currentYPosition-1;
                } else if (move === Position.BACKWARD_RIGHT) {
                    finalXPosition = currentXPosition+2;
                    finalYPosition = currentYPosition+1;
                } else if (move === Position.RIGHT_FORWARD) {
                    finalXPosition = currentXPosition-1;
                    finalYPosition = currentYPosition+2;
                } else if (move === Position.RIGHT_BACKWARD) {
                    finalXPosition = currentXPosition+1;
                    finalYPosition = currentYPosition+2;
                } else if (move === Position.LEFT_FORWARD) {
                    finalXPosition = currentXPosition-1;
                    finalYPosition = currentYPosition-2;
                } else if (move === Position.LEFT_BACKWARD) {
                    finalXPosition = currentXPosition+1;
                    finalYPosition = currentYPosition-2;
                }

            } else {
                if (move === Position.FORWARD_LEFT) {
                    finalXPosition = currentXPosition+2;
                    finalYPosition = currentYPosition+1;
                } else if (move === Position.FORWARD_RIGHT) {
                    finalXPosition = currentXPosition+2;
                    finalYPosition = currentYPosition-1;
                } else if (move === Position.BACKWARD_LEFT) {
                    finalXPosition = currentXPosition-2;
                    finalYPosition = currentYPosition+1;
                } else if (move === Position.BACKWARD_RIGHT) {
                    finalXPosition = currentXPosition-2;
                    finalYPosition = currentYPosition-1;
                } else if (move === Position.RIGHT_FORWARD) {
                    finalXPosition = currentXPosition+1;
                    finalYPosition = currentYPosition-2;
                } else if (move === Position.RIGHT_BACKWARD) {
                    finalXPosition = currentXPosition-1;
                    finalYPosition = currentYPosition-2;
                } else if (move === Position.LEFT_FORWARD) {
                    finalXPosition = currentXPosition+1;
                    finalYPosition = currentYPosition+2;
                } else if (move === Position.LEFT_BACKWARD) {
                    finalXPosition = currentXPosition-1;
                    finalYPosition = currentYPosition+2;
                }
            }
            return [finalXPosition, finalYPosition];
        } catch (error) {
            console.error('-------- Error in function knight --------');
            console.error(error);
            throw error;
        }
    }

}

module.exports = CharacterService;