const rainbowX = require('./solved-x.json');
const rainbowO = require('./solved-o.json');

const moveSeparator = '_';
const positionSeparator = '-';

function findBestMove(moves, playing) {
	let board = '000000000';
	for (const move of moves.split(moveSeparator)) {
		const parts = move.split(positionSeparator);
		const symbol = parts[0] == 'X' ? '1' : '2';
		board = setCharAt(board, +parts[1] + parts[2] * 3, symbol);
	}
	const rainbow = playing === 'X' ? rainbowX : rainbowO;
	const color = parseInt(board, 3);
	const boardIndex = rainbow[color] || 0;
	console.log(board, color, boardIndex);
	return {
		row: boardIndex % 3,
		col: Math.floor(boardIndex / 3),
	}
}

function setCharAt(str, index, chr) {
	return str.slice(0, index) + chr + str.slice(index + 1);
}

export default {
	async fetch(request) {
		const { searchParams } = new URL(request.url);
		if (searchParams.get('gid')) {
			const size = parseInt(searchParams.get('size') || '3', 10);
			const playing = searchParams.get('playing');
			const moves = searchParams.get('moves');

			if (size !== 3) {
				return new Response(`Error:Sorry. Can't do it bro.`);
			}

			let bestMove;
			if (moves) {
				bestMove = findBestMove(moves, playing);
			} else {
				const pos = Math.floor(size / 2) - 1;
				bestMove = {
					row: pos,
					col: pos,
				}
			}
			// console.log(moves, bestMove);
			const move = `Move:${playing}${positionSeparator}${bestMove.row}${positionSeparator}${bestMove.col}`
			return new Response(move);
		}
		return new Response('O(1)');
	},
};
