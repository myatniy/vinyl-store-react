import {deleteRecord, getRecords, postRecord, putRecord} from "../api";
import {findObject, getArrayWithoutDeletedObject} from "../utils";
import {message} from "antd";

export function genres(store) {
    store.on("@init", async () => {
        const data = await getRecords("/genre");
        const parsedData = data.map(item => ({id: item.id, value: item.name}));

        store.dispatch("genres/loaded", parsedData);
    });

    store.on("genres/loaded", ({genres}, newGenres) => ({genres: newGenres}));

    store.on("genres/add", ({genres}, newGenre) => {
        return {genres: genres.concat([{id: newGenre.id, value: newGenre.name}])};
    });

    store.on("genres/post", async (oldArr, value) => {
        postRecord("/genre", {"Name": value})
            .then(response => {
                store.dispatch("genres/add", response.data);
            })
            .catch(e => {
                console.error("genre POST req error: ", e);
            });
    });

    store.on("genres/update", ({genres}, updatedGenre) => {
        const indexOfObjectToUpdate = genres.findIndex(item => item.id === updatedGenre.id);
        const newGenresArray = [...genres];
        newGenresArray[indexOfObjectToUpdate] = {id: updatedGenre.id, value: updatedGenre.name};

        return {genres: newGenresArray};
    });

    store.on("genres/put", async ({genres}, updatedObject) => {
        putRecord("/genre", updatedObject.id, {"Name": updatedObject.value})
            .then(response => {
                store.dispatch("genres/update", response.data);
            })
            .catch(e => {
                console.error("genres PUT req error: ", e);
            });
    });

    store.on("genres/delete", async ({genres}, value) => {
        const albumHasGenres = store.get().albumHasGenres;
        const idTmp = findObject(genres, value).id;

        if (albumHasGenres.some(item => item.genreId === idTmp))
            return message.error(`Значение [${value}] используется одним из альбомов. Сначала удалите альбом`);

        const [newArr, id] = getArrayWithoutDeletedObject(genres, value);

        const response = await deleteRecord("/genre", id);

        if (response.status === 200) {
            store.dispatch("genres/loaded", newArr);
            return message.success("Запись удалена");
        } else {
            console.error("Something went wrong: ", response);
        }
    });
}