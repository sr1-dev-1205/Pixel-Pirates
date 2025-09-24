import React from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Village } from "../../types";

interface RiskMapProps {
  villages: Village[];
}

const RiskMap: React.FC<RiskMapProps> = ({ villages }) => {
  if (!villages || villages.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Loading map data...
      </div>
    );
  }

  return (
    
    <div className="h-full w-full bg-gray-100 rounded-lg overflow-hidden relative z-0">
      <MapContainer
        center={[26.2, 92.9]}
    zoom={6}
    style={{ height: "100%", width: "100%" }}
    className="z-0"
      >
        {/* Base Map Layer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* Village Markers */}
        {villages.map((village) => (
          <CircleMarker
            key={village.id}
            center={[village.latitude, village.longitude]} // <-- Ensure Village has latitude & longitude
            radius={8}
            fillOpacity={0.9}
            color="white"
            weight={2}
            pathOptions={{
              fillColor:
                village.risk_level === "high"
                  ? "red"
                  : village.risk_level === "medium"
                  ? "orange"
                  : "green",
            }}
          >
            <Tooltip>
              <strong>{village.name}</strong>
              <br />
              {village.risk_level.toUpperCase()} RISK
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white shadow-md rounded-lg px-4 py-2 text-sm text-gray-700 z-10">
        <h3 className="font-medium mb-2">Risk Levels</h3>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Low</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Medium</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>High</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskMap;
