import {deleteRecord, getRecords, postRecord, putRecord} from "../api";
import {getArrayWithoutDeletedObject} from "../utils";

export function users(store) {
    store.on("@init", async () => {
        const data = await getRecords("/user");

        store.dispatch("users/loaded", data);
    });

    store.on("users/loaded", ({users}, newUsers) => ({users: newUsers}));

    store.on("users/add", ({users}, newUser) => {
        return {users: users.concat([newUser])};
    });

    store.on("users/post", async (oldArr, payload) => {
        postRecord("/user", payload)
            .then(response => {
                store.dispatch("users/add", response.data);
            })
            .catch(e => {
                console.error("user POST req error: ", e);
            });
    });

    store.on("users/update", ({users}, updatedUser) => {
        const indexOfObjectToUpdate = users.findIndex(item => item.id === updatedUser.id);
        const newUserArray = [...users];
        newUserArray[indexOfObjectToUpdate] = updatedUser;

        return {users: newUserArray};
    });

    store.on("users/put", async ({users}, updatedObject) => {
        putRecord("/user", updatedObject.id, {
            "Password": updatedObject.password
        })
            .then(response => {
                store.dispatch("users/update", response.data);
            })
            .catch(e => {
                console.error("user PUT req error: ", e);
            });
    });

    store.on("users/delete", async ({users}, value) => {
        const [newArr, id] = getArrayWithoutDeletedObject(users, value);

        const response = await deleteRecord("/user", id);

        if (response.status === 200) {
            store.dispatch("users/loaded", newArr);
        } else {
            console.error("Something went wrong: ", response);
        }
    });
}