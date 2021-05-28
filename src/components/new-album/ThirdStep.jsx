import {useStoreon} from "storeon/react";
import HasForm from "./HasForm";
import onFinishHasForm from "./onFinishHasForm";

export default function ThirdStep({onNextClick, lastInsertedAlbum}) {
  const {dispatch, tracks} = useStoreon("tracks");

  const onFinish = ({tracklistsLocal}) => {
    onFinishHasForm(dispatch, "albumHasTracklists/post", lastInsertedAlbum, tracklistsLocal, tracks, "TracklistId");
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

  return <HasForm data={tracks} onFinish={onFinish} addText={"Добавить композицию"} nameOfResultArr={"tracklistsLocal"} />;
}