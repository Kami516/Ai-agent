import { getTemporaryAccessToken } from "@/action/getTemporaryAccessToken";
import SchematicEmbed from "./SchematicEmbed";

async function SchematicComponent({componentId}:{componentId: string}) {
    if(!componentId) return null;

    const accessToken = await getTemporaryAccessToken();

    if(!accessToken) {
        throw new Error("Access token is not provided");
    }
  return (
    <SchematicEmbed accessToken={accessToken} componentId={componentId} />
  );
}

export default SchematicComponent