import {deleteRecord, getRecords, postRecord, putRecord} from "../api";
import {getArrayWithoutDeletedObject} from "../utils";

export function albumHasFormats(store) {
  store.on("@init", async () => {
    const data = await getRecords("/albumHasFormat");

    store.dispatch("albumHasFormats/loaded", data);
  });

  store.on("albumHasFormats/loaded", ({albumHasFormats}, newAlbumTypes) => ({albumHasFormats: newAlbumTypes}));

  store.on("albumHasFormats/add", ({albumHasFormats}, newAlbumType) => {
    return {albumHasFormats: albumHasFormats.concat([newAlbumType])};
  });

  store.on("albumHasFormats/post", async (oldArr, payload) => {
    postRecord("/albumHasFormat", payload)
      .then(response => {
        store.dispatch("albumHasFormats/add", response.data);
      })
      .catch(e => {
        console.error("albumHasFormats POST req error: ", e);
      });
  });

  store.on("albumHasFormats/update", ({albumHasFormats}, updatedAlbumType) => {
    const indexOfObjectToUpdate = albumHasFormats.findIndex(item => item.id === updatedAlbumType.id);
    const newAlbumTypesArray = [...albumHasFormats];
    newAlbumTypesArray[indexOfObjectToUpdate] = updatedAlbumType;

    return {albumHasFormats: newAlbumTypesArray};
  });

  store.on("albumHasFormats/put", async ({albumHasFormats}, updatedObject) => {
    putRecord("/albumHasFormat", updatedObject.id, {
      "AlbumId": updatedObject.AlbumId,
      "GenreId": updatedObject.GenreId
    })
      .then(response => {
        store.dispatch("albumHasFormats/update", response.data);
      })
      .catch(e => {
        console.error("albumHasFormats PUT req error: ", e);
      });
  });

  store.on("albumHasFormats/delete", async ({albumHasFormats}, value) => {
    const [newArr, id] = getArrayWithoutDeletedObject(albumHasFormats, value);

    const response = await deleteRecord("/albumHasFormat", id);

    if (response.status === 200) {
      store.dispatch("albumHasFormats/loaded", newArr);
    } else {
      console.error("Something went wrong: ", response);
    }
  });
}