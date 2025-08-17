import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Protocol } from "pmtiles";
import { setupPopupHandler } from "../utils/popup";
import { setupPointerHandler } from "../utils/pointer";
import { onMapLoad } from "../utils/onMapLoad";
import { LegendItem } from "./LegendItem";

const LABEL_LAYER_ID = "iq-labels";

type MapViewProps = {
  minIQ: number;
};

const FILL_LAYER_ID = "iq_by_country";

const MapView = ({ minIQ }: MapViewProps) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [labelVisible, setLabelVisible] = useState(false);


  useEffect(() => {
    const protocol = new Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);

    const map = new maplibregl.Map({
      container: mapContainerRef.current!,
      style: "styles/style.json",
      center: [139, 36],
      zoom: 1,
      minZoom: 0,
      pitch: 0,
      hash: true,
    });

    mapRef.current = map;

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    map.on("load", () => {
      onMapLoad(map);
      // 初期fill-colorもminIQに合わせてセット
      if (map.getLayer(FILL_LAYER_ID)) {
        map.setPaintProperty(
          FILL_LAYER_ID,
          "fill-color",
          [
            "case",
            [">=", ["get", "avg_iq"], minIQ],
            [
              "interpolate",
              ["linear"],
              ["get", "avg_iq"],
              90, "#fee5d9",
              100, "#fcae91",
              110, "#fb6a4a",
              120, "#cb181d"
            ],
            "#000"
          ]
        );
      }
    });

    setupPopupHandler(map);
    setupPointerHandler(map);

    return () => {
      map.remove();
    };
  }, []);

  // minIQ変更時にfill-colorを更新
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (map.getLayer(FILL_LAYER_ID)) {
      map.setPaintProperty(
        FILL_LAYER_ID,
        "fill-color",
        [
          "case",
          [">=", ["get", "avg_iq"], minIQ],
          [
            "interpolate",
            ["linear"],
            ["get", "avg_iq"],
            90, "#fee5d9",
            100, "#fcae91",
            110, "#fb6a4a",
            120, "#cb181d"
          ],
          "#000"
        ]
      );
    }
  }, [minIQ]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (map.getLayer(LABEL_LAYER_ID)) {
      map.setLayoutProperty(
        LABEL_LAYER_ID,
        "visibility",
        labelVisible ? "visible" : "none"
      );
    }
  }, [labelVisible]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 1,
          background: "rgba(255,255,255,0.8)",
          padding: "6px 12px",
          borderRadius: "4px",
        }}
      >
        <label>
          <input
            type="checkbox"
            checked={labelVisible}
            onChange={(e) => setLabelVisible(e.target.checked)}
          />
          ラベル表示
        </label>
      </div>
      <div
        style={{
          position: "absolute",
          left: 10,
          bottom: 10,
          zIndex: 1,
          background: "rgba(255,255,255,0.85)",
          padding: "8px 14px",
          borderRadius: "4px",
          fontSize: "14px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ fontWeight: "bold", marginBottom: 4 }}>IQ凡例</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <LegendItem color="#cb181d" label="120" />
          <LegendItem color="#fb6a4a" label="110" />
          <LegendItem color="#fcae91" label="100" />
          <LegendItem color="#fee5d9" label="90" />
        </div>
      </div>
      <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />
    </>
  );
};

export default MapView;
