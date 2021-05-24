import {store} from "../store";

export default function parseAlbumObject(item) {
    const {countries, releasedDates, labels, styles, artists, albumTypes} = store.get();

    return {
        key: item.id,
        id: item.id,
        name: item.name,
        identifyingNumber: item.identifyingNumber,
        createdOn: item.createdOn,
        updatedOn: item.updatedOn === "0001-01-01T00:00:00" ? null : item.updatedOn,
        country: countries.find(country => country.id === item.countryId).value,
        releaseDate: releasedDates.find(releaseDate => releaseDate.id === item.releasedId).value,
        label: labels.find(label => label.id === item.labelId).value,
        user: "admin",
        style: styles.find(style => style.id === item.styleId).value,
        artist: artists.find(artist => artist.id === item.artistId).value,
        typeOfAlbum: albumTypes.find(type => type.id === item.typeOfAlbumId).value,
    }
}