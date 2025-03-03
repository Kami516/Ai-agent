"use server";

import {ConvexHttpClient} from "convex/browser";
import { api } from "@/convex/_generated/api";
import { currentUser } from "@clerk/nextjs/server";
import { Innertube } from "youtubei.js";
import { client } from "@/lib/schematic";
import { FeatureFlag, featureFlagEvents } from "@/features/flags";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export interface TranscriptEntry {
    text: string;
    timestamp: string;
}

const youtube = await Innertube.create({
    lang: "en",
    location: "us",
    retrieve_player: false,
});

function formatTimestamp(start_ms: number): string {
    const minutes = Math.floor(start_ms / 60000);
    const seconds = Math.floor((start_ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

async function fetchTranscript(videoId: string): Promise<TranscriptEntry[]> {
    try {
      const info = await youtube.getInfo(videoId);
      const transcriptData = await info.getTranscript();
      const transcript: TranscriptEntry[] =
        transcriptData.transcript.content?.body?.initial_segments.map(
          (segment) => ({
            text: segment.snippet.text ?? "N/A",
            timestamp: formatTimestamp(Number(segment.start_ms)),
          })
        ) ?? [];
  
      return transcript;
    } catch (error) {
      console.error("Error fetching transcript:", error);
      throw error;
    }
  }

export async function getYoutubeTranscript(videoId: string) {
    const user = await currentUser();

    if(!user?.id) {
        throw new Error("User is not logged in");
    }

    // Check if transcript already exists in db (is it cached?)
    const exisitngtranscript = await convex.query(
        api.transcript.getTranscriptByVideoId,
        {videoId, userId: user.id}
    );

    if(exisitngtranscript) {
        console.log("Transcript was found in datebase");
        return {
            cache:
                'This video has already been transribed - Accesing cached transcript instead of using a token',
            transcript: exisitngtranscript.transcript,
        };
    }

    try {
        const transcript = await fetchTranscript(videoId);
        
        // Save the transcript in the database
        await convex.mutation(api.transcript.storeTranscript, {
            videoId,
            userId: user.id,
            transcript,
        });

        await client.track({
            event: featureFlagEvents[FeatureFlag.TRANSCRIPTION].event,
            company: {
                id: user.id,
            },
            user: {
                id: user.id,
            },
        });

        return {
            transcript,
            cache: "This video was transcribed using a token, the transcript has been saved for future use",
        };
    } catch (error) {
        console.error("Error fetching transcript:", error);
        return {
            transcript: [],
            cache: "Error fetching transcript, please try again later",
        }
    }

}