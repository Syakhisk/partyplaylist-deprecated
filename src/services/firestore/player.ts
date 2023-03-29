import { COLLECTION_NAME, db } from "@/services/firestore";
import { YTPlaybackStatus } from "@/stores/player-store";
import { doc, updateDoc } from "firebase/firestore";

export async function updatePlayingStatus(
  id: string,
  status: YTPlaybackStatus
): Promise<void> {
  await updateDoc(doc(db, COLLECTION_NAME, id), {
    "current_song.status": status,
  });
}

export async function updateSongId(
  id: string,
  songId: string | null
): Promise<void> {
  const currentSong: {
    "current_song.id": string | null;
    status?: number | null;
  } = {
    "current_song.id": songId,
  };

  if (!songId) {
    currentSong.status = null;
  }

  await updateDoc(doc(db, COLLECTION_NAME, id), currentSong);
}
