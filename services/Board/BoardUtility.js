const _ = require("lodash");
const readlineSync = require('readline-sync');
const QuestionType = require("../../constants/QuestionType");
const config = require('../../config');
const CharacterService = require("../Character/CharacterService");
const Character = require("../../constants/Character");
const Player = require("../../constants/Player");

class BoardUtility {
    constructor() {
        this.characterService = new CharacterService();
    }

    async displayBoard(boardDetails) {
        try {
            for (let a = 0; a < Character.NUMBER_OF_CHARACTERS; a++) {
                let lineText = "";
                for (let b = 0; b < Character.NUMBER_OF_CHARACTERS; b++) {
                    if (!boardDetails[a] || !boardDetails[a][b]) lineText += '-\t';
                    else lineText += `${boardDetails[a][b].playerName}-${boardDetails[a][b].characterName}\t`;
                }
                console.info(lineText)
                console.info('\n');
            }
        } catch (error) {
            console.error('-------- Error in function displayBoard --------');
            console.error(error);
            throw error;
        }
    }

    async takePlayerInput(playerDetails, questionType) {
        try {
            let userInput = "";
            let question = "";
            switch (questionType) {
                case QuestionType.PLAYER_ARRANGEMENT:
                    question = `Player ${playerDetails.name}'s Input: `;
                    break;
                case QuestionType.PLAYER_MOVE:
                    question = `Player ${playerDetails.name}'s Move: `;
                    break;
                default:
                    break;
            }

            if (questionType) {
                userInput = await readlineSync.question(question);
            } else {
                console.error('-------- Invalid Question Type --------');
            }

            return userInput;
        } catch (error) {
            console.error('-------- Error in takeInputPlayerArrangement --------');
            console.error(error);
            throw error;
        }
    }

    async isValidMove(boardDetails, characterDetails, move, _player) {
        try {
            const currentPosition = await this.getCurrentPosition(boardDetails, characterDetails, _player);
            const currentXPosition = currentPosition[0];
            const currentYPosition = currentPosition[1];

            if (Number.isNaN(currentXPosition) || Number.isNaN(currentYPosition)) {
                // character does not exist
                console.info('-------- Invalid Character --------');
                return false;
            }

            if (!config.characters[characterDetails.name].validMoves.includes(move)) {
                // move does not exist
                console.info('-------- Move does not exist --------');
                return false;
            }

            const finalPosition = await this.getFinalPosition(characterDetails, move, currentPosition, _player);
            const finalXPosition = finalPosition[0];
            const finalYPosition = finalPosition[1];

            // Character going out of grid bounds.
            if (Number.isNaN(finalXPosition) || finalXPosition < 0 || finalXPosition >= Character.NUMBER_OF_CHARACTERS) return false;
            if (Number.isNaN(finalYPosition) || finalYPosition < 0 || finalYPosition >= Character.NUMBER_OF_CHARACTERS) return false;

            // Targeting a friendly character, i.e a character from our own team.
            if(boardDetails[finalXPosition] && boardDetails[finalXPosition][finalYPosition] 
                && _player === boardDetails[finalXPosition][finalYPosition].player) { 
                console.info('-------- Targeting friendly character --------');
                return false;
            }

            return true;
        } catch (error) {
            console.error('-------- Error in function isValidMove --------');
            console.error(error);
            throw error;
        }
    }

    async getCurrentPosition(boardDetails, characterDetails, _player) {
        try {
            let currentXPosition = undefined;
            let currentYPosition = undefined;
            for (let a = 0; a < Character.NUMBER_OF_CHARACTERS; a++) {
                for (let b = 0; b < Character.NUMBER_OF_CHARACTERS; b++) {
                    if (boardDetails[a] && boardDetails[a][b] &&
                        characterDetails.name.toLowerCase() === boardDetails[a][b].characterName.toLowerCase() &&
                        boardDetails[a][b].player.toLowerCase() === _player.toLowerCase()) {
                        currentXPosition = a;
                        currentYPosition = b;
                        break;
                    }
                }
            }

            return [currentXPosition, currentYPosition];
        } catch (error) {
            console.error('-------- Error in function getCurrentPosition --------');
            console.error(error);
            throw error;
        }
    }

    async getFinalPosition(characterDetails, move, currentPosition, _player) {
        try {
            const finalPosition = await this.characterService.finalPosition(characterDetails.type, move, currentPosition, _player);
            return [finalPosition[0], finalPosition[1]];
        } catch (error) {
            console.error('-------- Error in function getFinalPosition --------');
            console.error(error);
            throw error;
        }
    }

    async getCharacterAtPosition(boardDetails, xPosition, yPosition) {
        try {
            return boardDetails[xPosition] && boardDetails[xPosition][yPosition] ? boardDetails[xPosition][yPosition] : [];
        } catch (error) {
            console.error('-------- Error in function getCharacterAtPosition --------');
            console.error(error);
            throw error;
        }
    }

    async isWinner(boardDetails) {
        try {
            let player1Count = undefined;
            let player2Count = undefined;
            for(let a = 0; a < boardDetails.length; a++) {
                for(let b = 0; b < boardDetails.length; b++) {
                    if(boardDetails[a] && boardDetails[a][b] && boardDetails[a][b].player === Player.PLAYER_1) {
                        player1Count++;
                    }

                    if(boardDetails[a] && boardDetails[a][b] && boardDetails[a][b].player === Player.PLAYER_2) {
                        player2Count++;
                    }
                }
            }

            if(player1Count === 0 && player2Count != 0) return { end: true, winner: Player.PLAYER_1 };
            else if(player1Count != 0 && player2Count === 0) return { end: true, winner: Player.PLAYER_2 };
            else return { end: false };
        } catch (error) {
            console.error('-------- Error in function gameEnded --------');
            console.error(error);
            throw error;
        }
    }

    async togglePlayerTurn(playerNextTurn) {
        try {
            if(playerNextTurn === Player.PLAYER_1) return Player.PLAYER_2;
            else return Player.PLAYER_1;
        } catch (error) {
            console.error('-------- Error in function togglePlayerTurn --------');
            console.error(error);
            throw error;
        }
    }
}

module.exports = BoardUtility;