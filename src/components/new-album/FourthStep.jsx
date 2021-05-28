import {useStoreon} from "storeon/react";
import HasForm from "./HasForm";
import onFinishHasForm from "./onFinishHasForm";

export default function FourthStep({onNextClick, lastInsertedAlbum}) {
  const {dispatch, formats} = useStoreon("formats");

  const onFinish = ({formatsLocal}) => {
    onFinishHasForm(dispatch, "albumHasFormats/post", lastInsertedAlbum, formatsLocal, formats, "FormatId");
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

  return <HasForm data={formats} onFinish={onFinish} addText={"Добавить формат"} nameOfResultArr={"formatsLocal"} />;
}