import {deleteRecord, getRecords, postRecord, putRecord} from "../api";
import {getArrayWithoutDeletedObject} from "../utils";

export function albumHasTracklists(store) {
  store.on("@init", async () => {
    const data = await getRecords("/albumHasTracklist");

    store.dispatch("albumHasTracklists/loaded", data);
  });

  store.on("albumHasTracklists/loaded", ({albumHasTracklists}, newAlbumTypes) => ({albumHasTracklists: newAlbumTypes}));

  store.on("albumHasTracklists/add", ({albumHasTracklists}, newAlbumType) => {
    return {albumHasTracklists: albumHasTracklists.concat([newAlbumType])};
  });

  store.on("albumHasTracklists/post", async (oldArr, payload) => {
    postRecord("/albumHasTracklist", payload)
      .then(response => {
        store.dispatch("albumHasTracklists/add", response.data);
      })
      .catch(e => {
        console.error("albumHasTracklists POST req error: ", e);
      });
  });

  store.on("albumHasTracklists/update", ({albumHasTracklists}, updatedAlbumType) => {
    const indexOfObjectToUpdate = albumHasTracklists.findIndex(item => item.id === updatedAlbumType.id);
    const newAlbumTypesArray = [...albumHasTracklists];
    newAlbumTypesArray[indexOfObjectToUpdate] = updatedAlbumType;

    return {albumHasTracklists: newAlbumTypesArray};
  });

  store.on("albumHasTracklists/put", async ({albumHasTracklists}, updatedObject) => {
    putRecord("/albumHasTracklist", updatedObject.id, {
      "AlbumId": updatedObject.AlbumId,
      "GenreId": updatedObject.GenreId
    })
      .then(response => {
        store.dispatch("albumHasTracklists/update", response.data);
      })
      .catch(e => {
        console.error("albumHasTracklists PUT req error: ", e);
      });
  });

  store.on("albumHasTracklists/delete", async ({albumHasTracklists}, value) => {
    const [newArr, id] = getArrayWithoutDeletedObject(albumHasTracklists, value);

    const response = await deleteRecord("/albumHasTracklist", id);

    if (response.status === 200) {
      store.dispatch("albumHasTracklists/loaded", newArr);
    } else {
      console.error("Something went wrong: ", response);
    }
  });
}