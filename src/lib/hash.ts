import { COLLECTION_NAME, db } from "@/services/firestore"
import { doc, getDoc } from "firebase/firestore"

export async function getHash(val:string): Promise<number> {
  let hash =0
  for (let i=0; i<val.length; i++) {
    hash = ((hash << 5) - hash) + val.charCodeAt(i)
    hash |=0
  }

  const session = await getDoc(doc(db, COLLECTION_NAME, hash.toString()))
  if (session.exists()) return -1
  return hash
}