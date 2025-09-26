import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";

const Mapa = () => {
  const center = [1.2123, -77.2802];
  const navigate = useNavigate();

  return (
    <div
      className="w-full h-[900px] p-6 bg-green-400 shadow-2xl cursor-pointer justify-center items-center"
      onClick={() => navigate("/puntosdereciclaje")} 
    >
        <h1 className="bento-title mt-4 mb-8 justify-center text-center">
            Conocer nuestros puntos de reciclaje
        </h1>
      <MapContainer
        center={center}
        zoom={15}
        className="rounded-2xl shadow-lg drop-shadow-md border justify-center items-center mx-auto"
        style={{ height: "80%", width: "70%" }}
        dragging={false} 
        scrollWheelZoom={false} 
        doubleClickZoom={false}
        zoomControl={false}
        touchZoom={false}  
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://cartodb-basemaps-a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={15}
        />
        <Marker position={center}>
          <Popup>Pasto Centro</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Mapa;
