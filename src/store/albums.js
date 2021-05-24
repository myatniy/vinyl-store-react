import {deleteRecord, getRecords, postRecord, putRecord} from "../api";
import {getArrayWithoutDeletedObject} from "../utils";

export function albums(store) {
    store.on("@init", async () => {
        const data = await getRecords("/album");

        store.dispatch("albums/loaded", data);
    });

    store.on("albums/loaded", ({albums}, newAlbums) => ({albums: newAlbums}));
    store.on("albums/insertParsed", ({albums}, parsedAlbums) => ({albums: parsedAlbums}));

    store.on("albums/add", ({albums}, newAlbum) => {
        return {albums: albums.concat([newAlbum])};
    });

    store.on("albums/post", async (oldArr, payload) => {
        const CreatedOn = new Date();

        const {
            Name,
            IdentifyingNumber,
            CountryId,
            ReleasedId,
            LabelId,
            AlbumCoverId,
            UserId,
            StyleId,
            ArtistId,
            TypeOfAlbumId
        } = payload;
        postRecord("/albums", {
            "Name": Name,
            "IdentifyingNumber": IdentifyingNumber,
            "CreatedOn": CreatedOn,
            "CountryId": CountryId,
            "ReleasedId": ReleasedId,
            "LabelId": LabelId,
            "AlbumCoverId": AlbumCoverId,
            "UserId": UserId,
            "StyleId": StyleId,
            "ArtistId": ArtistId,
            "TypeOfAlbumId": TypeOfAlbumId,
        })
            .then(response => {
                store.dispatch("albums/add", response.data);
            })
            .catch(e => {
                console.error("albums POST req error: ", e);
            });
    });

    store.on("albums/update", ({albums}, updatedAlbum) => {
        const indexOfObjectToUpdate = albums.findIndex(item => item.id === updatedAlbum.id);
        const newAlbumsArray = [...albums];
        newAlbumsArray[indexOfObjectToUpdate] = updatedAlbum;

        return {albums: newAlbumsArray};
    });

    store.on("albums/put", async ({albums}, updatedObject) => {
        const UpdatedOn = new Date();

        const {
            Id,
            Name,
            IdentifyingNumber,
            CountryId,
            ReleasedId,
            LabelId,
            AlbumCoverId,
            UserId,
            StyleId,
            ArtistId,
            TypeOfAlbumId
        } = updatedObject;
        putRecord("/albums", Id, {
            "Name": Name,
            "IdentifyingNumber": IdentifyingNumber,
            "UpdatedOn": UpdatedOn,
            "CountryId": CountryId,
            "ReleasedId": ReleasedId,
            "LabelId": LabelId,
            "AlbumCoverId": AlbumCoverId,
            "UserId": UserId,
            "StyleId": StyleId,
            "ArtistId": ArtistId,
            "TypeOfAlbumId": TypeOfAlbumId,
        })
            .then(response => {
                store.dispatch("albums/update", response.data);
            })
            .catch(e => {
                console.error("album PUT req error: ", e);
            });
    });

    store.on("albums/delete", async ({albums}, value) => {
        const [newArr, id] = getArrayWithoutDeletedObject(albums, value);

        const response = await deleteRecord("/albums", id);

        if (response.status === 200) {
            store.dispatch("albums/loaded", newArr);
        } else {
            console.error("Something went wrong: ", response);
        }
    });
}