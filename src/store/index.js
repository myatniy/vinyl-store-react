import { createStoreon } from 'storeon';
import { storeonDevtools } from 'storeon/devtools';
import { artists } from './artists';
import {countries} from "./countries";
import {formats} from "./formats";

export const store = createStoreon([
    artists,
    countries,
    formats,
    process.env.NODE_ENV !== "production" && storeonDevtools,
]);
