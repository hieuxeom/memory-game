const calculateStreak = (lastDay, currentDate) => {
	const differenceMs = currentDate - lastDay;

	const differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

	return differenceDays;
};

const isCurrentDate = (checkDay) => {
	const currentDate = new Date();

	return (
		checkDay.getDate() === currentDate.getDate() &&
		checkDay.getMonth() === currentDate.getMonth() &&
		checkDay.getFullYear() === currentDate.getFullYear()
	);
};

module.exports = { calculateStreak, isCurrentDate };
