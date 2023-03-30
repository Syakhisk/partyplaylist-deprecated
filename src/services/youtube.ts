import axios from "axios";

export interface VideoMetadata {
  channel_name: string;
  thumbnail_url: string;
  video_id: string | null;
  video_title: string;
  video_url: string;
  uid?: number;
}

export const getMetadataFromUrl = async (
  url: string
): Promise<VideoMetadata | undefined> => {
  // return {
  //   channel_name: "Soegi Bornean",
  //   thumbnail_url: "https://i.ytimg.com/vi/cQGfLDnmWS8/hqdefault.jpg",
  //   video_id: "cQGfLDnmWS8",
  //   video_title: "Soegi Bornean - Asmalibrasi (Official Music Video)",
  //   video_url: "https://www.youtube.com/watch?v=cQGfLDnmWS8",
  //   uid: Date.now(),
  // };

  try {
    const parsedUrl = new URL(url);
    let id: string | null = null;

    if (parsedUrl.hostname.includes("youtu.be")) id = parsedUrl.pathname.substring(1);
    else id = new URLSearchParams(parsedUrl.searchParams).get("v");

    if (!id) throw new Error("No video id found");

    const baseUrl = "https://www.youtube.com/oembed";
    const res = await axios?.get(baseUrl, { params: { url } });
    if (!res?.data) throw new Error("No data found in response");

    const { data } = res;
    return {
      channel_name: data.author_name,
      thumbnail_url: data.thumbnail_url,
      video_id: id,
      video_title: data.title,
      video_url: url,
    };
  } catch (e) {
    console.log("--ERROR--", e);
  }
};

export const isValidYoutubeUrl = (url: string) => {
  return url.match(/^https:\/\/(www\.)?(music\.)?youtu(.)?be(\.com)?\/.*$/);
};

export const appendUniqueId = (video: VideoMetadata) => ({
  ...video,
  uid: Date.now(),
});
