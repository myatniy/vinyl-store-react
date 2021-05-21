import {deleteRecord, getRecords, postRecord, putRecord} from "../api";
import {getArrayWithoutDeletedObject} from "../utils";

export function styles(store) {
    store.on("@init", async () => {
        const data = await getRecords("/style");
        const parsedData = data.map(item => ({id: item.id, value: item.name}));

        store.dispatch("styles/loaded", parsedData);
    });

    store.on("styles/loaded", ({styles}, newLabels) => ({styles: newLabels}));

    store.on("styles/add", ({styles}, newLabel) => {
        return {styles: styles.concat([{id: newLabel.id, value: newLabel.name}])};
    });

    store.on("styles/post", async (oldArr, value) => {
        postRecord("/style", {"Name": value})
            .then(response => {
                store.dispatch("styles/add", response.data);
            })
            .catch(e => {
                console.error("style POST req error: ", e);
            });
    });

    store.on("styles/update", ({styles}, updatedLabel) => {
        const indexOfObjectToUpdate = styles.findIndex(item => item.id === updatedLabel.id);
        const newLabelsArray = [...styles];
        newLabelsArray[indexOfObjectToUpdate] = {id: updatedLabel.id, value: updatedLabel.name};

        return {styles: newLabelsArray};
    });

    store.on("styles/put", async ({styles}, updatedObject) => {
        putRecord("/style", updatedObject.id, {"Name": updatedObject.value})
            .then(response => {
                store.dispatch("styles/update", response.data);
            })
            .catch(e => {
                console.error("style PUT req error: ", e);
            });
    });

    store.on("styles/delete", async ({styles}, value) => {
        const [newArr, id] = getArrayWithoutDeletedObject(styles, value);

        const response = await deleteRecord("/style", id);

        if (response.status === 200) {
            store.dispatch("styles/loaded", newArr);
        } else {
            console.error("Something went wrong: ", response);
        }
    });
}