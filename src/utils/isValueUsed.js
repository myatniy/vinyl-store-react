import {findObject} from "./index";
import {store} from "../store";

const isValueUsed = (localStore, value, propToCompare) => {
  const albums = store.get().albums;
  const idTmp = findObject(localStore, value).id;

  return albums.some(album => album[propToCompare] === idTmp);
}

export default isValueUsed;