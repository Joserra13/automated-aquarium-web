import React from "react";
import DataDisplay from "./DataDisplay";

type FallbackData = {
    schedule0Enabled: boolean;
    feednow: boolean;
    schedule2Enabled: boolean;
    schedule2: string;
    schedule1Enabled: boolean;
    schedule0: string;
    schedule1: string;
    count: number;
    waterTemperature: number;
};

const defaultData: FallbackData = {
    schedule0Enabled: true,
    feednow: false,
    schedule2Enabled: false,
    schedule2: "00:00",
    schedule1Enabled: false,
    schedule0: "00:00",
    schedule1: "00:00",
    count: 31,
    waterTemperature: 0.62842,
};

const DATA_URL = "https://automated-aquarium-backend.vercel.app/fishFeeder";

async function getSensorData(): Promise<FallbackData> {
    try {
        const res = await fetch(DATA_URL, {
            headers: {
                "api-key": process.env.BACKEND_API_KEY ?? "",
            },
            cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        return data || defaultData;
    } catch (error) {
        console.error("Error fetching initial data:", error);
        return defaultData;
    }
}

const LiveSensorDataHeader = async () => {
    const data = await getSensorData();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-xl border border-blue-800">
                <DataDisplay
                    sensor={{
                        tag: "Water Temperature",
                        key: "waterTemperature"
                    }}
                />
            </div>
            <div className="p-4 bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-xl border border-green-800">
                <DataDisplay
                    sensor={{
                        tag: "Times Fed Today",
                        key: "count"
                    }}
                />
            </div>
            <div className="p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl border border-purple-800">
                <DataDisplay
                    sensor={{
                        tag: "Feed Status",
                        key: "feednow"
                    }}
                />
            </div>
        </div>
    );
};

export default LiveSensorDataHeader;