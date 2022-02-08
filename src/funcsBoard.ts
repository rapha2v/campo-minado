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
		//responsável por fazer a checagem de quantas minas tem
		spreadMines(
			//responsável por fazer o espalhamento das minas
			Array(row) //cria uma matriz do tipo boardMineFieldFn que vai servir como instrução para como os campos vão funcionar
				.fill(0) //preenche todos campos com 0
				.map((_, r) => {
					//faz um map em cima do array
					return Array(column) //retorna o array de colunas
						.fill(0) // preenche todos campos com zero
						.map((_, c) => {
							// faz um map em cima dos campos, gerando um objeto do tipo boardMineFieldFn
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
			// parâmetros para spreadMines()
			row,
			column,
			dfLevel
		)
	);
	return board; //retornando a matriz
};

const spreadMines = (
	board: boardMineFieldFn[][],
	row: number,
	column: number,
	dfLevel: number
): boardMineFieldFn[][] => {
	const numBombsMustHave: number = dfLevel; // passado como parâmetro, esse é o número de bombas que o campo deve ter
	let numBombsExistents: number = 0; // número de bombas existentes, começando com zero
	while (numBombsMustHave > numBombsExistents) {
		// enquanto o número de bombas existentes for menor do que o número de bombas que o campo deve ter, ele continua criando
		const rowsOfBoard = randomNumber(0, row - 1); // cria uma linha
		const columnsOfBoard = randomNumber(0, column - 1); //cria uma coluna
		if (!board[rowsOfBoard][columnsOfBoard].mined) {
			//checa se a linha coluna dessa matriz está minado
			board[rowsOfBoard][columnsOfBoard].mined = true; //mina a linha coluna da matriz
			numBombsExistents++; //número de bombas aumenta
		}
	}

	return board;
};
const howManyMinesNear = (
	board: boardMineFieldFn[][],
	row: number,
	column: number
): boardMineFieldFn[] => {
	// faz uma checagem, através das combinações possíveis de um campo, e o retorna para ser feita a checagem
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
	// faz a checagem de quantas minas tem ao redor de cada campo
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
	return Math.round(Math.random() * (max - min) + min); //cria um número randômico entre dois números
};

const safeNeighborhood = (board: boardMineFieldFn[][], row: number, column: number): boolean => {
	return howManyMinesNear(board, row, column).reduce(
		// verifica as minas ao redor
		(result: boolean, neighbor: boardMineFieldFn) => {
			return result && !neighbor.mined; // caso não tenho nenhuma mina, retorna true
		},
		true //acumulador começando como true
	);
};

const openField = (board: boardMineFieldFn[][], row: number, column: number): void => {
	const field: boardMineFieldFn = board[row][column]; //cria um campo com os parâmetros
	//verifica se o campo não está aberto
	if (!field.opened && !field.flagged) {
		field.opened = true; // abre o campo
		if (field.mined) {
			//verifica se não tem mina
			field.exploded = true; // explode o campo
		} else if (safeNeighborhood(board, row, column)) {
			//caso seja uma vizinhaça segura
			howManyMinesNear(board, row, column).forEach((n) => {
				// verifica as minas ao redor
				openField(board, n.row, n.column); //cria uma recursividade para sempre ir testando se a vizinha é segura para ir abrindo os campos
			});
		}
	}
};

const fields = (board: boardMineFieldFn[][]): boardMineFieldFn[] =>
	board.reduce((acc, value) => acc.concat(value), [] as boardMineFieldFn[]); //cria um único array dos campos existentes

const hadExplosion = (board: boardMineFieldFn[][]): boolean =>
	fields(board).filter((field) => field.exploded).length > 0; //verifica se não tem nenhum campo explodido

const pendding = (field: boardMineFieldFn): boolean => {
	return (field.mined && !field.flagged) || (!field.mined && !field.opened); // verifica se os campos minados estão sem flag e se existe algum campo que não está minado não foi aberto
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
	const field: boardMineFieldFn = board[row][column]; // através do parâmetro passado, ele cria um campo
	field.flagged = !field.flagged; // inverte o valor booleano
};

export { boardMineField, openField, hadExplosion, wonGame, showMines, flaggedField };
