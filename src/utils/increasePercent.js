export default function increasePercent(stepsAmount, step) {
    if (stepsAmount === step) {
        return 100;
    }

    return Math.round(100 / stepsAmount * step);
}