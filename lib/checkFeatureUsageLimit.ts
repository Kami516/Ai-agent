import {client } from "@/lib/schematic";
import {featureFlagEvents } from "@/features/flags";

export async function checkFeatureUsageLimit(
    userId: string,
    eventSubType: string
): Promise<{success: boolean; error?: string}> {

    try {
        const entitlements = await client.entitlements.getFeatureUsageByCompany({
            keys: {
                id: userId,
            },
        });

        const feature = entitlements.data.features.find(
            (entitlement) => entitlement.feature?.eventSubtype === eventSubType
        );

        if (!feature) {
            return {
                success: false,
                error: "Feature is not available on your current plan, please upgrade to continue",
            };
        }

        const {usage, allocation} = feature;

        if(usage === undefined || allocation === undefined) {
            return {
                success: false,
                error: "System Error -Contact support",
            };
        }

        const hasExceedUsageLimit = usage >= allocation;

        if (hasExceedUsageLimit) {
            // Find the display-friendly feature name
            const featureName = 
                Object.entries(featureFlagEvents).find(
                    ([, value]) => value.event === eventSubType
                )?.[0] || eventSubType;

            return {
                success: false,
                error: `You have exceeded the usage limit for ${featureName}. Please upgrade to continue`,
            };
        }

        return { success: true};

    } catch (error) {
        console.error("Error checking feature usage limit", error);
        return {
            success: false,
            error: "Error checking feature usage limit",
        };
    }
}