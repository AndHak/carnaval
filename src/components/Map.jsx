
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";


export default function Map() {
  const center = [1.2123, -77.2802];

  return (
    <div className="w-full h-[800px] p-6 bg-yellow-400 rounded-2xl shadow-2xl">
      <MapContainer
        center={center}
        zoom={15}
        className="rounded-2xl shadow-lg"
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://cartodb-basemaps-a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={20}
        />
        <Marker position={center}>
          <Popup>Pasto Centro</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
