import useSWR from "swr";
import pb from "../pocketbase";

async function fetcher(collection, filter) {
  try {
    return await pb.collection(collection).getList(1, 50, {
      filter,
    });
  } catch (err) {
    console.log(err);
    alert("Error getting meds", err);
  }
}
    

export default function useDatabase(collection, filter) {
  return useSWR([collection, filter], ([collection, filter]) => fetcher(collection, filter));
}