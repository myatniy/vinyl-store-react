import {deleteRecord, getRecords, postRecord, putRecord} from "../api";
import {getArrayWithoutDeletedObject} from "../utils";

export function artists(store) {
    store.on("@init", async () => {
        const data = await getRecords("/artist");
        const parsedData = data.map(item => ({id: item.id, value: item.name}));

        store.dispatch("artists/loaded", parsedData);
    });

    store.on("artists/loaded", ({artists}, newArtists) => ({artists: newArtists}));

    store.on("artists/add", ({artists}, newArtist) => {
        return {artists: artists.concat([{id: newArtist.id, value: newArtist.name}])};
    });

    store.on("artists/post", async (oldArr, value) => {
        postRecord("/artist", {"Name": value})
            .then(response => {
                store.dispatch("artists/add", response.data);
            })
            .catch(e => {
                console.error("artist POST req error: ", e);
            });
    });

    store.on("artists/update", ({artists}, updatedArtist) => {
        const indexOfObjectToUpdate = artists.findIndex(item => item.id === updatedArtist.id);
        const newArtistsArray = [...artists];
        newArtistsArray[indexOfObjectToUpdate] = {id: updatedArtist.id, value: updatedArtist.name};

        return {artists: newArtistsArray};
    });

    store.on("artists/put", async ({artists}, updatedObject) => {
        putRecord("/artist", updatedObject.id, {"Name": updatedObject.value})
            .then(response => {
                store.dispatch("artists/update", response.data);
            })
            .catch(e => {
                console.error("artist PUT req error: ", e);
            });
    });

    store.on("artists/delete", async ({artists}, value) => {
        const [newArr, id] = getArrayWithoutDeletedObject(artists, value);

        const response = await deleteRecord("/artist", id);

        if (response.status === 200) {
            store.dispatch("artists/loaded", newArr);
        } else {
            console.error("Something went wrong: ", response);
        }
    });
}