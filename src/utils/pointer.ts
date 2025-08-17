import { Map, MapMouseEvent } from "maplibre-gl";

const ALLOW_LAYERS = ["iq_by_country", "iq-labels"];

export const setupPointerHandler = (map: Map) => {
  map.on("mousemove", (e: MapMouseEvent) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ALLOW_LAYERS,
    });
    if (features.length > 0) {
      map.getCanvas().style.cursor = "pointer";
    } else {
      map.getCanvas().style.cursor = "";
    }
  });
};
