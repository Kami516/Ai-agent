import { ConvexHttpClient } from "convex/browser";

//Create a client for server side HTTP request
export const getConvexClient = () => {
    if(!process.env.NEXT_PUBLIC_CONVEX_URL) {
        throw new Error("Missing NEXT_PUBLIC_CONVEX_URL) { environment variable");
    }
    return new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);
};