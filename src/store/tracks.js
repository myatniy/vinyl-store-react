import {deleteRecord, getRecords, postRecord, putRecord} from "../api";
import {findObject, getArrayWithoutDeletedObject} from "../utils";
import {message} from "antd";

export function tracks(store) {
    store.on("@init", async () => {
        const data = await getRecords("/tracklist");
        const parsedData = data.map(item => ({id: item.id, value: item.name}));

        store.dispatch("tracks/loaded", parsedData);
    });

    store.on("tracks/loaded", ({tracks}, newTracks) => ({tracks: newTracks}));

    store.on("tracks/add", ({tracks}, newTrack) => {
        return {tracks: tracks.concat([{id: newTrack.id, value: newTrack.name}])};
    });

    store.on("tracks/post", async (oldArr, value) => {
        postRecord("/tracklist", {"Name": value})
            .then(response => {
                store.dispatch("tracks/add", response.data);
            })
            .catch(e => {
                console.error("track POST req error: ", e);
            });
    });

    store.on("tracks/update", ({tracks}, updatedTrack) => {
        const indexOfObjectToUpdate = tracks.findIndex(item => item.id === updatedTrack.id);
        const newTracksArray = [...tracks];
        newTracksArray[indexOfObjectToUpdate] = {id: updatedTrack.id, value: updatedTrack.name};

        return {tracks: newTracksArray};
    });

    store.on("tracks/put", async ({tracks}, updatedObject) => {
        putRecord("/tracklist", updatedObject.id, {"Name": updatedObject.value})
            .then(response => {
                store.dispatch("tracks/update", response.data);
            })
            .catch(e => {
                console.error("track PUT req error: ", e);
            });
    });

    store.on("tracks/delete", async ({tracks}, value) => {
        const albumHasTracklists = store.get().albumHasTracklists;
        const idTmp = findObject(tracks, value).id;

        if (albumHasTracklists.some(item => item.tracklistId === idTmp))
            return message.error(`Значение [${value}] используется одним из альбомов. Сначала удалите альбом`);

        const [newArr, id] = getArrayWithoutDeletedObject(tracks, value);

        const response = await deleteRecord("/tracklist", id);

        if (response.status === 200) {
            store.dispatch("tracks/loaded", newArr);
            return message.success("Запись удалена");
        } else {
            console.error("Something went wrong: ", response);
        }
    });
}