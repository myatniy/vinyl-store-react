import {deleteRecord, getRecords, postRecord, putRecord} from "../api";
import {getArrayWithoutDeletedObject} from "../utils";

export function albumHasGenres(store) {
  store.on("@init", async () => {
    const data = await getRecords("/albumHasGenre");

    store.dispatch("albumHasGenres/loaded", data);
  });

  store.on("albumHasGenres/loaded", ({albumHasGenres}, newAlbumTypes) => ({albumHasGenres: newAlbumTypes}));

  store.on("albumHasGenres/add", ({albumHasGenres}, newAlbumType) => {
    return {albumHasGenres: albumHasGenres.concat([newAlbumType])};
  });

  store.on("albumHasGenres/post", async (oldArr, payload) => {
    postRecord("/albumHasGenre", payload)
      .then(response => {
        store.dispatch("albumHasGenres/add", response.data);
      })
      .catch(e => {
        console.error("albumHasGenres POST req error: ", e);
      });
  });

  store.on("albumHasGenres/update", ({albumHasGenres}, updatedAlbumType) => {
    const indexOfObjectToUpdate = albumHasGenres.findIndex(item => item.id === updatedAlbumType.id);
    const newAlbumTypesArray = [...albumHasGenres];
    newAlbumTypesArray[indexOfObjectToUpdate] = updatedAlbumType;

    return {albumHasGenres: newAlbumTypesArray};
  });

  store.on("albumHasGenres/put", async ({albumHasGenres}, updatedObject) => {
    putRecord("/albumHasGenre", updatedObject.id, {
      "AlbumId": updatedObject.AlbumId,
      "GenreId": updatedObject.GenreId
    })
      .then(response => {
        store.dispatch("albumHasGenres/update", response.data);
      })
      .catch(e => {
        console.error("albumHasGenres PUT req error: ", e);
      });
  });

  store.on("albumHasGenres/delete", async ({albumHasGenres}, value) => {
    const [newArr, id] = getArrayWithoutDeletedObject(albumHasGenres, value);

    const response = await deleteRecord("/albumHasGenre", id);

    if (response.status === 200) {
      store.dispatch("albumHasGenres/loaded", newArr);
    } else {
      console.error("Something went wrong: ", response);
    }
  });
}