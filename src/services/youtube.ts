import axios from "axios";

export interface VideoMetadata {
  channel_name: string;
  thumbnail_url: string;
  video_id: string | null;
  video_title: string;
  video_url: string;
}

export const getMetadataFromUrl = async (
  url: string
): Promise<VideoMetadata | undefined> => {
  return {
    channel_name: "Soegi Bornean",
    thumbnail_url: "https://i.ytimg.com/vi/cQGfLDnmWS8/hqdefault.jpg",
    video_id: "cQGfLDnmWS8",
    video_title: "Soegi Bornean - Asmalibrasi (Official Music Video)",
    video_url: "https://www.youtube.com/watch?v=cQGfLDnmWS8",
  };

  const baseUrl = "https://www.youtube.com/oembed";

  try {
    const res = await axios?.get(baseUrl, { params: { url } });
    if (!res?.data) throw new Error("No data found in response");

    const { data } = res;
    return {
      channel_name: data.author_name,
      thumbnail_url: data.thumbnail_url,
      video_id: new URLSearchParams(new URL(url).searchParams).get("v"),
      video_title: data.title,
      video_url: url,
    };
  } catch (e) {
    console.log("--ERROR--", e);
  }
};
