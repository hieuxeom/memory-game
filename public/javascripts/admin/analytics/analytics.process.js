import { getGameThemeData as getGameTopicsData } from "./charts/game-topics.chart.js";
import { getCardThemeData as getCardThemesData } from "./charts/card-theme.chart.js";
import { getGameSizeData as getGameSizesData } from "./charts/game-size.chart.js";
import { getGameTimeData as getGameTimesData } from "./charts/game-time.chart.js";

const gameTopicContainer = document.getElementById("topGameTopic");
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

getGameTopicsData().then(({ labels, data }) => {
	new Chart(gameTopicContainer, {
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

getCardThemesData().then(({ labels, data }) => {
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

getGameSizesData().then(({ labels, data }) => {
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

getGameTimesData().then(({ labels, data }) => {
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
