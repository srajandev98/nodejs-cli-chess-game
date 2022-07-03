const _ = require("lodash");
const BoardUtility = require('./BoardUtility');
const config = require('../../config');
const QuestionType = require('../../constants/QuestionType');
const Character = require("../../constants/Character");
const Player = require("../../constants/Player");

class BoardService {
    constructor() {
        this.boardDetails = [];
        this.boardUtility = new BoardUtility();
        this.playerNextTurn = Player.PLAYER_1;
    }

    async start() {
        try {
            // Take player 1 character arrangement
            await this.init(Player.PLAYER_1);
            await this.boardUtility.displayBoard(this.boardDetails);

            // Take player 1 character arrangement
            await this.init(Player.PLAYER_2);
            await this.boardUtility.displayBoard(this.boardDetails);

            // start playing
            this.play();
        } catch (error) {
            console.error('-------- Error in Application --------');
            console.error(error);
            this.start();
        }
    }

    async play() {
        try {
            while(!this.boardUtility.isWinner(this.boardDetails).end) {
                let characterMove = await this.boardUtility.takePlayerInput({
                    name: config.playerDetails[this.playerNextTurn].name
                }, QuestionType.PLAYER_MOVE);
                characterMove = characterMove ? characterMove.split(':') : [];
                if(_.isEmpty(characterMove) || characterMove.length != 2) {
                    throw new Error('Invalid Move');
                }
    
                const character = characterMove[0];
                const move = characterMove[1];
                const characterDetails = {
                    type: config.characters[character].characterType,
                    name: character
                };
    
                const isValidMove = await this.boardUtility.isValidMove(this.boardDetails, characterDetails, move, this.playerNextTurn);
                if(isValidMove) {
                    const currentPosition = await this.boardUtility.getCurrentPosition(this.boardDetails, characterDetails, this.playerNextTurn);
                    const currentXPosition = currentPosition[0];
                    const currentYPosition = currentPosition[1];
    
                    const finalPosition = await this.boardUtility.getFinalPosition(characterDetails, move, currentPosition, this.playerNextTurn);
                    const finalXPosition = finalPosition[0];
                    const finalYPosition = finalPosition[1];
    
                    this.boardDetails[finalXPosition] = this.boardDetails[finalXPosition] ? this.boardDetails[finalXPosition] : [];
                    this.boardDetails[finalXPosition][finalYPosition] = this.boardDetails[currentXPosition][currentYPosition];
                    this.boardDetails[currentXPosition][currentYPosition] = undefined;

                    await this.boardUtility.displayBoard(this.boardDetails);

                    this.playerNextTurn = await this.boardUtility.togglePlayerTurn(this.playerNextTurn);
                } else {
                    // invalid move - repeat again
                    console.info('-------- Invalid Input Format --------');
                    await this.boardUtility.displayBoard(this.boardDetails);
                }
            }
            
        } catch (error) {
            console.error('-------- Error in Application --------');
            console.error(error);
            this.play();
        }
    }

    async init(_player) {
        try {
            let characterArrangement = await this.boardUtility.takePlayerInput(config.playerDetails[_player], 
                QuestionType.PLAYER_ARRANGEMENT);
                characterArrangement = characterArrangement.split(',');

            if(characterArrangement.length == Character.NUMBER_OF_CHARACTERS) {
                if(_player === Player.PLAYER_1) {
                    this.boardDetails[0] = [];
                    characterArrangement.forEach(character => {
                        character = _.trim(character);
                        if(config.characters[character]) {
                            this.boardDetails[0].push({
                                characterType: config.characters[character].type,
                                characterName: character,
                                playerName: config.playerDetails[_player].name,
                                player: _player
                            });
                        }
                    });
                } else if(_player === Player.PLAYER_2) {
                    this.boardDetails[Character.NUMBER_OF_CHARACTERS-1] = [];
                    characterArrangement.forEach(character => {
                        character = _.trim(character);
                        if(config.characters[character]) {
                            this.boardDetails[Character.NUMBER_OF_CHARACTERS-1].push({
                                characterType: config.characters[character].type,
                                characterName: character,
                                playerName: config.playerDetails[_player].name,
                                player: _player
                            });
                        }
                    });
                }
            }
        } catch (error) {
            console.error('-------- Error in Application --------');
            console.error(error);
            throw error;
        }
    }
}

module.exports = BoardService;