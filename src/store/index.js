import { createStoreon } from 'storeon';
import { storeonDevtools } from 'storeon/devtools';
import { artists } from './artists';
import {countries} from "./countries";
import {formats} from "./formats";
import {genres} from "./genres";
import {labels} from "./labels";
import {styles} from "./styles";

export const store = createStoreon([
    artists,
    countries,
    formats,
    genres,
    labels,
    styles,
    process.env.NODE_ENV !== "production" && storeonDevtools,
]);
