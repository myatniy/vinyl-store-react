import {deleteRecord, getRecords, postRecord, putRecord} from "../api";
import {getArrayWithoutDeletedObject, isValueUsed} from "../utils";
import {message} from "antd";

export function countries(store) {
    store.on("@init", async () => {
        const data = await getRecords("/country");
        const parsedData = data.map(item => ({id: item.id, value: item.name}));

        store.dispatch("countries/loaded", parsedData);
    });

    store.on("countries/loaded", ({countries}, newCountries) => ({countries: newCountries}));

    store.on("countries/add", ({countries}, newCountry) => {
        return {countries: countries.concat([{id: newCountry.id, value: newCountry.name}])};
    });

    store.on("countries/post", async (oldArr, value) => {
        postRecord("/country", {"Name": value})
            .then(response => {
                store.dispatch("countries/add", response.data);
            })
            .catch(e => {
                console.error("country POST req error: ", e);
            });
    });

    store.on("countries/update", ({countries}, updatedCountry) => {
        const indexOfObjectToUpdate = countries.findIndex(item => item.id === updatedCountry.id);
        const newCountriesArray = [...countries];
        newCountriesArray[indexOfObjectToUpdate] = {id: updatedCountry.id, value: updatedCountry.name};

        return {countries: newCountriesArray};
    });

    store.on("countries/put", async ({countries}, updatedObject) => {
        putRecord("/country", updatedObject.id, {"Name": updatedObject.value})
            .then(response => {
                store.dispatch("countries/update", response.data);
            })
            .catch(e => {
                console.error("country PUT req error: ", e);
            });
    });

    store.on("countries/delete", async ({countries}, value) => {
        if (isValueUsed(countries, value, "countryId"))
            return message.error(`Значение [${value}] используется одним из альбомов. Сначала удалите альбом`);

        const [newArr, id] = getArrayWithoutDeletedObject(countries, value);

        const response = await deleteRecord("/country", id);

        if (response.status === 200) {
            store.dispatch("countries/loaded", newArr);
            return message.success("Запись удалена");
        } else {
            console.error("Something went wrong: ", response);
        }
    });
}