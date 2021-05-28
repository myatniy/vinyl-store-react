import {Descriptions} from "antd";
import {useStoreon} from "storeon/react";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const AlbumEditor = ({localAlbums}) => {
  const {identifyingNumber} = useParams();
  const {
    albumHasTracklists,
    albumHasGenres,
    albumHasFormats,
    genres,
    tracks,
    formats
  } = useStoreon("albumHasTracklists", "albumHasGenres", "albumHasFormats", "genres", "tracks", "formats");
  const [album, setAlbum] = useState(null);
  const [tracklist, setTracklist] = useState([]);
  const [genre, setGenre] = useState([]);
  const [format, setFormat] = useState([]);

  useEffect(() => {
    const albumTmp = localAlbums.find(item => item.identifyingNumber === parseInt(identifyingNumber));
    setAlbum(albumTmp);

    const tracklistTmp = albumHasTracklists.filter(item => item.albumId === albumTmp.id);
    setTracklist(tracklistTmp);

    const genreTmp = albumHasGenres.filter(item => item.albumId === albumTmp.id);
    setGenre(genreTmp);

    const formatTmp = albumHasFormats.filter(item => item.albumId === albumTmp.id);
    setFormat(formatTmp);
  }, [albumHasFormats, albumHasGenres, albumHasTracklists, genres, identifyingNumber, localAlbums]);

  return (
    album && <>
      <Descriptions bordered>
        <Descriptions.Item label="Идентификационный номер">{album.identifyingNumber}</Descriptions.Item>
        <Descriptions.Item label="Исполнитель">{album.artist}</Descriptions.Item>
        <Descriptions.Item label="Название">{album.name}</Descriptions.Item>
        <Descriptions.Item label="Дата выхода">{album.releaseDate}</Descriptions.Item>
        {tracklist.length > 0 && <Descriptions.Item label="Композиции" span={tracklist.length}>
          {tracklist.map((item, index) => {
            return (<div key={index}>
              {tracks.find(i => i.id === item.tracklistId).value}
              <br/>
            </div>);
          })}
        </Descriptions.Item>}
        <Descriptions.Item label="Страна">{album.country}</Descriptions.Item>
        <Descriptions.Item label="Лейбл">{album.label}</Descriptions.Item>
        <Descriptions.Item label="Стиль">{album.style}</Descriptions.Item>
        <Descriptions.Item label="Тип">{album.typeOfAlbum}</Descriptions.Item>
        <Descriptions.Item label="Создал">{album.user}</Descriptions.Item>
        <Descriptions.Item label="Создано">{album.createdOne}</Descriptions.Item>
        {genre.length > 0 && <Descriptions.Item label="Жанр" span={genre.length}>
          {genre.map((item, index) => {
            return (<div key={index}>
              {genres.find(i => i.id === item.genreId).value}
              <br/>
            </div>);
          })}
        </Descriptions.Item>}
        {format.length > 0 && <Descriptions.Item label="Формат" span={format.length}>
          {format.map((item, index) => {
            return (<div key={index}>
              {formats.find(i => i.id === item.formatId).value}
              <br/>
            </div>);
          })}
        </Descriptions.Item>}
      </Descriptions>
    </>
  );
};

export default AlbumEditor;