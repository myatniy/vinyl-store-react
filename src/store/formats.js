import {deleteRecord, getRecords, postRecord, putRecord} from "../api";
import {findObject, getArrayWithoutDeletedObject} from "../utils";
import {message} from "antd";

export function formats(store) {
    store.on("@init", async () => {
        const data = await getRecords("/format");
        const parsedData = data.map(item => ({id: item.id, value: item.title}));

        store.dispatch("formats/loaded", parsedData);
    });

    store.on("formats/loaded", ({formats}, oldFormats) => ({formats: oldFormats}));

    store.on("formats/add", ({formats}, newFormat) => {
        return {formats: formats.concat([{id: newFormat.id, value: newFormat.title}])};
    });

    store.on("formats/post", async (oldArr, value) => {
        postRecord("/format", {"Title": value})
            .then(response => {
                store.dispatch("formats/add", response.data);
            })
            .catch(e => {
                console.error("formats POST req error: ", e);
            });
    });

    store.on("formats/update", ({formats}, updatedFormat) => {
        const indexOfObjectToUpdate = formats.findIndex(item => item.id === updatedFormat.id);
        const newFormatsArray = [...formats];
        newFormatsArray[indexOfObjectToUpdate] = {id: updatedFormat.id, value: updatedFormat.title};

        return {formats: newFormatsArray};
    });

    store.on("formats/put", async ({formats}, updatedObject) => {
        putRecord("/format", updatedObject.id, {"Title": updatedObject.value})
            .then(response => {
                store.dispatch("formats/update", response.data);
            })
            .catch(e => {
                console.error("formats PUT req error: ", e);
            });
    });

    store.on("formats/delete", async ({formats}, value) => {
        const albumHasFormats = store.get().albumHasFormats;
        const idTmp = findObject(formats, value).id;

        if (albumHasFormats.some(item => item.formatId === idTmp))
            return message.error(`Значение [${value}] используется одним из альбомов. Сначала удалите альбом`);

        const [newArr, id] = getArrayWithoutDeletedObject(formats, value);

        const response = await deleteRecord("/format", id);

        if (response.status === 200) {
            store.dispatch("formats/loaded", newArr);
            return message.success("Запись удалена");
        } else {
            console.error("Something went wrong: ", response);
        }
    });
}