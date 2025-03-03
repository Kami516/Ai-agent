import { getYoutubeTranscript } from "@/action/getYoutubeTranscript";
import { tool } from "ai";
import { z } from "zod";

const fetchTranscript = tool ({
    description: "Fetch the transcript of the video in segments",
    parameters: z.object({
        videoId: z.string().describe("The ID of the video to fetch the transcript for"),    
    }),
    execute: async ({ videoId }) => {
        const transcript = await getYoutubeTranscript(videoId);
        return {
            cache: transcript.cache,
            transcript: transcript.transcript
        }
    },
});

export default fetchTranscript;