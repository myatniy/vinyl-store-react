export default function findObject(array, valueToCompare) {
    return array.find(item => item.value === valueToCompare);
}