import { getGameThemeData } from "./charts/game-theme.chart.js";
import { getCardThemeData } from "./charts/card-theme.chart.js";
import { getGameSizeData } from "./charts/game-size.chart.js";
import { getGameTimeData } from "./charts/game-time.chart.js";

const gameThemeContainer = document.getElementById("topGameTheme");
const cardThemeContainer = document.getElementById("topCardTheme");
const gameSizeContainer = document.getElementById("topGameSize");
const gameTimeContainer = document.getElementById("topGameTime");

const bgColor1 = "rgba(218, 247, 166, 0.8)";
const bgColor2 = "rgba(255, 195, 0, 0.8)";
const bgColor3 = "rgba(255, 87, 51, 0.8)";
const bgColor4 = "rgba(112, 123, 124, 0.6)";

const barOptions = {
	scales: {
		y: {
			beginAtZero: true,
		},
	},
	cutout: 150,
};

const doughnutOptions = {
	cutout: 150,
	layout: {
		padding: {
			left: 10,
			right: 10,
		},
	},
};

const datalabelsConfig = {
	color: "#900C3F",
};

getGameThemeData().then(({ labels, data }) => {
	new Chart(gameThemeContainer, {
		type: "bar",
		data: {
			labels,
			datasets: [
				{
					label: "# Played",
					data: data,
					backgroundColor: bgColor1,
					datalabels: datalabelsConfig,
					offset: 4,
				},
			],
		},
		options: barOptions,
		plugins: [ChartDataLabels],
	});
});

getCardThemeData().then(({ labels, data }) => {
	console.log(labels, data);
	new Chart(cardThemeContainer, {
		type: "bar",
		data: {
			labels,
			datasets: [
				{
					label: "# Used",
					data: data,
					backgroundColor: bgColor2,
					datalabels: datalabelsConfig,
				},
			],
		},
		options: barOptions,
		plugins: [ChartDataLabels],
	});
});

getGameSizeData().then(({ labels, data }) => {
	new Chart(gameSizeContainer, {
		type: "doughnut",
		data: {
			labels,
			datasets: [
				{
					label: "# Played",
					data: data,
					backgroundColor: [bgColor3, bgColor4],
					datalabels: datalabelsConfig,
				},
			],
		},
		options: doughnutOptions,
		plugins: [ChartDataLabels],
	});
});

getGameTimeData().then(({ labels, data }) => {
	new Chart(gameTimeContainer, {
		type: "doughnut",
		data: {
			labels,
			datasets: [
				{
					label: "# Played",
					data: data,
					backgroundColor: [bgColor1, bgColor2, bgColor3],
					datalabels: datalabelsConfig,
				},
			],
		},
		options: doughnutOptions,
		plugins: [ChartDataLabels],
	});
});
