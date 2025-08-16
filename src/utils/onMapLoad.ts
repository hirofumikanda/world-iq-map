import maplibregl from "maplibre-gl";

export async function onMapLoad(map: maplibregl.Map) {
  const SS = await map.loadImage("img/SS.png");
  map.addImage("SS", SS.data);
  const S = await map.loadImage("img/S.png");
  map.addImage("S", S.data);
  const A = await map.loadImage("img/A.png");
  map.addImage("A", A.data);
  const B = await map.loadImage("img/B.png");
  map.addImage("B", B.data);
  const C = await map.loadImage("img/C.png");
  map.addImage("C", C.data);
}
