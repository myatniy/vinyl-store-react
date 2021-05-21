import { createStoreon } from 'storeon';
import { storeonDevtools } from 'storeon/devtools';
import { artists } from './artists';

export const store = createStoreon([
    artists,
    process.env.NODE_ENV !== "production" && storeonDevtools,
]);
