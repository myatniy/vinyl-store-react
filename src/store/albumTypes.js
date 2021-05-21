import {deleteRecord, getRecords, postRecord, putRecord} from "../api";
import {getArrayWithoutDeletedObject} from "../utils";

export function albumTypes(store) {
    store.on("@init", async () => {
        const data = await getRecords("/typeAlbum");
        const parsedData = data.map(item => ({id: item.id, value: item.type}));

        store.dispatch("albumTypes/loaded", parsedData);
    });

    store.on("albumTypes/loaded", ({albumTypes}, newAlbumTypes) => ({albumTypes: newAlbumTypes}));

    store.on("albumTypes/add", ({albumTypes}, newAlbumType) => {
        return {albumTypes: albumTypes.concat([{id: newAlbumType.id, value: newAlbumType.type}])};
    });

    store.on("albumTypes/post", async (oldArr, value) => {
        postRecord("/typeAlbum", {"Type": value})
            .then(response => {
                store.dispatch("albumTypes/add", response.data);
            })
            .catch(e => {
                console.error("typeAlbum POST req error: ", e);
            });
    });

    store.on("albumTypes/update", ({albumTypes}, updatedAlbumType) => {
        const indexOfObjectToUpdate = albumTypes.findIndex(item => item.id === updatedAlbumType.id);
        const newAlbumTypesArray = [...albumTypes];
        newAlbumTypesArray[indexOfObjectToUpdate] = {id: updatedAlbumType.id, value: updatedAlbumType.type};

        return {albumTypes: newAlbumTypesArray};
    });

    store.on("albumTypes/put", async ({albumTypes}, updatedObject) => {
        putRecord("/typeAlbum", updatedObject.id, {"Type": updatedObject.value})
            .then(response => {
                store.dispatch("albumTypes/update", response.data);
            })
            .catch(e => {
                console.error("typeAlbum PUT req error: ", e);
            });
    });

    store.on("albumTypes/delete", async ({albumTypes}, value) => {
        const [newArr, id] = getArrayWithoutDeletedObject(albumTypes, value);

        const response = await deleteRecord("/typeAlbum", id);

        if (response.status === 200) {
            store.dispatch("albumTypes/loaded", newArr);
        } else {
            console.error("Something went wrong: ", response);
        }
    });
}