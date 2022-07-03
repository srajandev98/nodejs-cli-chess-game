const BoardService = require('./services/Board/BoardService');

(async () => {
    const boardService = new BoardService();
    await boardService.start();
})();