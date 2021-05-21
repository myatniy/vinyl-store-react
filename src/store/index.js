import { createStoreon } from 'storeon';
import { storeonDevtools } from 'storeon/devtools';
import { artists } from './artists';
import {countries} from "./countries";
import {formats} from "./formats";
import {genres} from "./genres";

export const store = createStoreon([
    artists,
    countries,
    formats,
    genres,
    process.env.NODE_ENV !== "production" && storeonDevtools,
]);
