import PocketBase from "pocketbase";

export const pb = new PocketBase(process.env.PUBLIC_POCKETBASE_URL);

const authData = await pb
  .collection("users")
  .authWithPassword("YOUR_USERNAME_OR_EMAIL", "YOUR_PASSWORD");
