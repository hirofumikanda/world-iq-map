import maplibregl, { Map, MapMouseEvent } from "maplibre-gl";
import type { MapGeoJSONFeature } from "maplibre-gl";

const ALLOW_LAYERS = ["iq_by_country", "iq-labels"];

export const setupPopupHandler = (map: Map) => {
  map.on("click", (e: MapMouseEvent) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ALLOW_LAYERS,
    });

    if (features.length === 0) return;

    const popupContent = buildPopupContent(features[0]);
    new maplibregl.Popup({ closeOnClick: true })
      .setLngLat(e.lngLat)
      .setHTML(popupContent)
      .addTo(map);
  });
};

const buildPopupContent = (feature: MapGeoJSONFeature): string => {
  const props = feature.properties ?? {};
  const props2: Record<string, unknown> = { ...props, iq: props["avg_iq"] + '±' + props["sd_iq"] };
  let html = `<table style="border-collapse:collapse;">`;

  for (const key in props2) {
    let label = key;
    let value = props2[key];
    if (key === "name") label = "国名";
    if (key === "name_ja") label = "国名（日本語）";
    if (key === "avg_iq") continue;
    if (key === "sd_iq") continue;
    if (key === "iq") {
      label = "IQ";
      if (value === "undefined±undefined") {
        value = "データなし";
      }
    }
    if (Object.prototype.hasOwnProperty.call(props2, key)) {
      html += `
        <tr>
          <td style="padding:4px; border:1px solid #ccc;"><strong>${escapeHTML(
            label
          )}</strong></td>
          <td style="padding:4px; border:1px solid #ccc;">${escapeHTML(
            String(value)
          )}</td>
        </tr>`;
    }
  }

  html += `</table>`;
  return html;
};

const escapeHTML = (str: string): string =>
  str.replace(/[&<>"']/g, (char) => {
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return map[char];
  });
