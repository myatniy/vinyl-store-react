import {deleteRecord, getRecords, postRecord, putRecord} from "../api";
import {getArrayWithoutDeletedObject} from "../utils";

export function releasedDates(store) {
    store.on("@init", async () => {
        const data = await getRecords("/released");
        const parsedData = data.map(item => ({id: item.id, value: item.releaseDate.slice(0, 10)}));

        store.dispatch("releasedDates/loaded", parsedData);
    });

    store.on("releasedDates/loaded", ({releasedDates}, newReleasedDates) => ({releasedDates: newReleasedDates}));

    store.on("releasedDates/add", ({releasedDates}, newRelease) => {
        return {releasedDates: releasedDates.concat([{id: newRelease.id, value: newRelease.releaseDate.slice(0, 10)}])};
    });

    store.on("releasedDates/post", async (oldArr, value) => {
        postRecord("/released", {"ReleaseDate": value})
            .then(response => {
                store.dispatch("releasedDates/add", response.data);
            })
            .catch(e => {
                console.error("releasedDates POST req error: ", e);
            });
    });

    store.on("releasedDates/update", ({releasedDates}, updatedReleasedDate) => {
        const indexOfObjectToUpdate = releasedDates.findIndex(item => item.id === updatedReleasedDate.id);
        const newReleasedDatesArray = [...releasedDates];
        newReleasedDatesArray[indexOfObjectToUpdate] = {
            id: updatedReleasedDate.id,
            value: updatedReleasedDate.releaseDate.slice(0, 10)
        };

        return {releasedDates: newReleasedDatesArray};
    });

    store.on("releasedDates/put", async ({releasedDates}, updatedObject) => {
        putRecord("/released", updatedObject.id, {"ReleaseDate": updatedObject.value})
            .then(response => {
                store.dispatch("releasedDates/update", response.data);
            })
            .catch(e => {
                console.error("releasedDates PUT req error: ", e);
            });
    });

    store.on("releasedDates/delete", async ({releasedDates}, value) => {
        const [newArr, id] = getArrayWithoutDeletedObject(releasedDates, value);

        const response = await deleteRecord("/released", id);

        if (response.status === 200) {
            store.dispatch("releasedDates/loaded", newArr);
        } else {
            console.error("Something went wrong: ", response);
        }
    });
}