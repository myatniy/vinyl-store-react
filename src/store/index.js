import { createStoreon } from 'storeon';
import { storeonDevtools } from 'storeon/devtools';
import { artists } from './artists';
import {countries} from "./countries";
import {formats} from "./formats";
import {genres} from "./genres";
import {labels} from "./labels";
import {styles} from "./styles";
import {tracks} from "./tracks";
import {albumTypes} from "./albumTypes";
import {releasedDates} from "./releasedDates";
import {albums} from "./albums";

export const store = createStoreon([
    artists,
    countries,
    formats,
    genres,
    labels,
    styles,
    tracks,
    albumTypes,
    releasedDates,
    albums,
    process.env.NODE_ENV !== "production" && storeonDevtools,
]);
