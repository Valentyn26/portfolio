import { deleteAsync } from 'del';

export function reset() {
    return deleteAsync(`./dest/`);
}