import { createStoreon } from 'storeon';
import { storeonDevtools } from 'storeon/devtools';
import { artists } from './artists';
import {countries} from "./countries";

export const store = createStoreon([
    artists,
    countries,
    process.env.NODE_ENV !== "production" && storeonDevtools,
]);
