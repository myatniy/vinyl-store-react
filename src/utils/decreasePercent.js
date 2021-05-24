export default function decreasePercent(stepsAmount, step) {
    if (step === 1) {
        return 0;
    }
    console.log(Math.round(100 / stepsAmount * step));
    return Math.round(100 / stepsAmount * (step - 1));
}