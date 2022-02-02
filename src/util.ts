type boardMineFieldFn = {
	row: number;
	column: number;
	mined: boolean;
	opened: boolean;
	nearMines: number;
	exploded: boolean;
	flagged: boolean;
};

const boardMineField = (row: number, column: number, dfLevel: number): boardMineFieldFn[][] => {
	const board = checkMines(
		spreadMines(
			Array(row)
				.fill(0)
				.map((_, r) => {
					return Array(column)
						.fill(0)
						.map((_, c) => {
							return {
								row: r,
								column: c,
								mined: false,
								opened: false,
								nearMines: 0,
								exploded: false,
								flagged: false,
							} as boardMineFieldFn;
						});
				}),
			row,
			column,
			dfLevel
		)
	);
	return board;
};

const spreadMines = (
	board: boardMineFieldFn[][],
	row: number,
	column: number,
	dfLevel: number
): boardMineFieldFn[][] => {
	const numBombsMustHave: number = dfLevel;
	let numBombsExistents: number = 0;
	while (numBombsMustHave > numBombsExistents) {
		const rowsOfBoard = randomNumber(0, row - 1);
		const columnsOfBoard = randomNumber(0, column - 1);
		if (!board[rowsOfBoard][columnsOfBoard].mined) {
			board[rowsOfBoard][columnsOfBoard].mined = true;
			numBombsExistents++;
		}
	}

	return board;
};
const howManyMinesNear = (
	board: boardMineFieldFn[][],
	row: number,
	column: number
): boardMineFieldFn[] => {
	const rowOfboard: number = board.length;
	const columnOfBoard: number = board[0].length;
	const columnLeft: number = column - 1;
	const columnRight: number = column + 1;
	const rowUp: number = row - 1;
	const rowDown: number = row + 1;

	const arrField: boardMineFieldFn[] = [];

	if (columnLeft >= 0) arrField.push(board[row][columnLeft]);
	if (columnRight <= columnOfBoard - 1) arrField.push(board[row][columnRight]);
	if (rowUp >= 0) arrField.push(board[rowUp][column]);
	if (rowUp >= 0 && columnLeft >= 0) arrField.push(board[rowUp][columnLeft]);
	if (rowUp >= 0 && columnRight <= columnOfBoard - 1) arrField.push(board[rowUp][columnRight]);
	if (rowDown <= rowOfboard - 1) arrField.push(board[rowDown][column]);
	if (rowDown <= rowOfboard - 1 && columnLeft >= 0) arrField.push(board[rowDown][columnLeft]);
	if (rowDown <= rowOfboard - 1 && columnRight <= columnOfBoard - 1)
		arrField.push(board[rowDown][columnRight]);

	return arrField;
};

const checkMines = (board: boardMineFieldFn[][]): boardMineFieldFn[][] => {
	for (let [i, column] of board.entries()) {
		for (let [x, field] of column.entries()) {
			for (let neighbor of howManyMinesNear(board, i, x)) {
				if (neighbor.mined) {
					field.nearMines++;
				}
			}
		}
	}
	return board;
};

const randomNumber = (min: number, max: number): number => {
	return Math.round(Math.random() * (max - min) + min);
};

const safeNeighborhood = (board: boardMineFieldFn[][], row: number, column: number): boolean => {
	return howManyMinesNear(board, row, column).reduce(
		(result: boolean, neighbor: boardMineFieldFn) => {
			return result && !neighbor.mined;
		},
		true
	);
};

const openField = (board: boardMineFieldFn[][], row: number, column: number): void => {
	const field: boardMineFieldFn = board[row][column];
	if (!field.opened) {
		field.opened = true;
		if (field.mined) {
			field.exploded = true;
		} else if (safeNeighborhood(board, row, column)) {
			howManyMinesNear(board, row, column).forEach((n) => {
				openField(board, n.row, n.column);
			});
		}
	}
};

const fields = (board: boardMineFieldFn[][]): boardMineFieldFn[] =>
	board.reduce((acc, value) => acc.concat(value), [] as boardMineFieldFn[]);

const hadExplosion = (board: boardMineFieldFn[][]): boolean =>
	fields(board).filter((field) => field.exploded).length > 0;

const pendding = (field: boardMineFieldFn): boolean => {
	return (field.mined && !field.flagged) || (!field.mined && !field.opened); // verifica se ne
};
const wonGame = (board: boardMineFieldFn[][]): boolean => {
	return (
		fields(board) //retorna um array apenas com os campos do tabuleiro
			.filter(pendding).length === 0 // verifica se não tem nenhum campo pendente
	);
};

const showMines = (board: boardMineFieldFn[][]): void => {
	fields(board) // retorna um array apenas com os campos do tabuleiro
		.filter((field) => field.mined) // filtra todos os campos que estão com minas
		.forEach((field) => (field.opened = true)); // abre todos os campos que estão minados
};

const flaggedField = (board: boardMineFieldFn[][], row: number, column: number): void => {
	const field: boardMineFieldFn = board[row][column];
	field.flagged = !field.flagged; // inverte o valor booleano
};

export { boardMineField, openField, hadExplosion, wonGame, showMines };
