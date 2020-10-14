// import {
//   connectToDatabase,
//   removeAllCollections,
//   closeConnection
// } from "./handlers/dbConnection";

// export const setupDb = (dbName: string) => {
//   beforeAll(async () => await connectToDatabase(dbName));

//   afterEach(async () => {
//     await removeAllCollections();
//   });

//   afterAll(async () => {
//     await closeConnection();
//   });
// };
