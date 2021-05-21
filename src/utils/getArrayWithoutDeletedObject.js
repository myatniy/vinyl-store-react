export default function getArrayWithoutDeletedObject(array, value) {
    const copyArray = [...array];
    let idLocal;
    let indexLocal;

    for (let i = 0; i < copyArray.length; i++) {
        if (copyArray[i].value === value) {
            idLocal = copyArray[i].id;
            indexLocal = i;
            break;
        }
    }

    copyArray.splice(indexLocal, 1);

    return [copyArray, idLocal];
}