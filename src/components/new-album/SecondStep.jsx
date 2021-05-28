import {useStoreon} from "storeon/react";
import HasForm from "./HasForm";
import onFinishHasForm from "./onFinishHasForm";

export default function SecondStep({onNextClick, lastInsertedAlbum}) {
    const {dispatch, genres} = useStoreon("genres");

    const onFinish = ({genresLocal}) => {
      onFinishHasForm(dispatch, "albumHasGenres/post", lastInsertedAlbum, genresLocal, genres, "GenreId");
        // const uniqueGenres = new Set();
        // genresLocal.map(genre => uniqueGenres.add(genre.name));
        // const arrUniqueGenres = [...uniqueGenres];
        //
        // for (let i = 0; i < arrUniqueGenres.length; i++) {
        //     dispatch("albumHasGenres/post", {
        //       "AlbumId": lastInsertedAlbum,
        //       "GenreId": genres.find(item => item.value === arrUniqueGenres[i]).id,
        //     });
        // }
        onNextClick();
    };

    return <HasForm data={genres} onFinish={onFinish} addText={"Добавить жанр"} nameOfResultArr={"genresLocal"} />;
}