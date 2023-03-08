import { COLLECTION_NAME, db } from "@/services/firestore"
import { doc, getDoc } from "firebase/firestore"
import { customAlphabet } from "nanoid"
const customValue = "1234567890qwertyuiopasdfghjklzxcvbnm"
const nanoId = customAlphabet(customValue, 6)
export async function getHash(): Promise<string> {
  let id = ""
  for (let exist = true; exist; ) {
    id = nanoId()
    exist  = (await getDoc(doc(db, COLLECTION_NAME, id))).exists()
  } 
  return id
}