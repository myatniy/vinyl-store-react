import {deleteRecord, getRecords, postRecord, putRecord} from "../api";
import {getArrayWithoutDeletedObject} from "../utils";

export function labels(store) {
    store.on("@init", async () => {
        const data = await getRecords("/label");
        const parsedData = data.map(item => ({id: item.id, value: item.name}));

        store.dispatch("labels/loaded", parsedData);
    });

    store.on("labels/loaded", ({labels}, newLabels) => ({labels: newLabels}));

    store.on("labels/add", ({labels}, newLabel) => {
        return {labels: labels.concat([{id: newLabel.id, value: newLabel.name}])};
    });

    store.on("labels/post", async (oldArr, value) => {
        postRecord("/label", {"Name": value})
            .then(response => {
                store.dispatch("labels/add", response.data);
            })
            .catch(e => {
                console.error("label POST req error: ", e);
            });
    });

    store.on("labels/update", ({labels}, updatedLabel) => {
        const indexOfObjectToUpdate = labels.findIndex(item => item.id === updatedLabel.id);
        const newLabelsArray = [...labels];
        newLabelsArray[indexOfObjectToUpdate] = {id: updatedLabel.id, value: updatedLabel.name};

        return {labels: newLabelsArray};
    });

    store.on("labels/put", async ({labels}, updatedObject) => {
        putRecord("/label", updatedObject.id, {"Name": updatedObject.value})
            .then(response => {
                store.dispatch("labels/update", response.data);
            })
            .catch(e => {
                console.error("labels PUT req error: ", e);
            });
    });

    store.on("labels/delete", async ({labels}, value) => {
        const [newArr, id] = getArrayWithoutDeletedObject(labels, value);

        const response = await deleteRecord("/label", id);

        if (response.status === 200) {
            store.dispatch("labels/loaded", newArr);
        } else {
            console.error("Something went wrong: ", response);
        }
    });
}