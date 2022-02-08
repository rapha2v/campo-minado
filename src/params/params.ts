import { Dimensions } from "react-native";

type paramsCampoMinado = {
	blockSize: number; //tamanho do bloco
	borderSize: number; //largura da borda
	fontSize: number; //tamanho da font
	headerRatio: number; //tamanho do cabeçalho
	difficultLevel: number; //nível de dificuldade do jogo vai ser uma porcentagem em cima da quantidade de campos que tem na tela sendo o fácil : 10%, médio: 20% e difícil: 30%
	getColumnsAmount: () => number; //método para calcular a quantidade de colunas com base no tamanho do bloco usando Dimensions para ver qual a largura da tela do celular
	getRowsAmount: () => number; //método para calcular a quantidade de linhas fazendo o calculo contando com o header utilizando Dimensions para ver a altura total da tela
};

export default {
	blockSize: 30,
	borderSize: 5,
	fontSize: 15,
	headerRatio: 0.15,
	difficultLevel: 0.01,
	getColumnsAmount() {
		const width = Dimensions.get("window").width;
		return Math.floor(width / this.blockSize); //Math.floor arredonda para baixo, caso dê um número quebrado ele não deixa passar a largura do celular
	},
	getRowsAmount() {
		const totalHeight = Dimensions.get("window").height;
		const boardHeight = totalHeight * (1 - this.headerRatio);
		return Math.floor(boardHeight / this.blockSize); //Math.floor arredonda para baixo, caso dê um número quebrado ele não deixa passar a altura do celular
	},
} as paramsCampoMinado;
