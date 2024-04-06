export const calculateScore = (turns: number) => {

    if (turns >= 5) {
        return 50
    }

    let score = 100;

    if (turns > 1 && turns < 5) {
        score -= (turns - 1) * 10;
    }

    return score

}