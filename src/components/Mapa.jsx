import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { Map } from "lucide-react";

const Mapa = () => {
    const center = [1.2123, -77.2802];
    const navigate = useNavigate();

    const customIcon = L.icon({
        iconUrl: "/img/reciclaje.png",
        iconSize: [170, 250],
        iconAnchor: [85, 125],
        popupAnchor: [0, -32],
    });

    return (
        <div
            className="w-full md:h-[950px] h-[500px] sm:pt-10 p-6 pb-20 bg-cyan-300 shadow-2xl cursor-pointer justify-center items-center"
            onClick={() => navigate("/puntosdereciclaje")}
        >
            <h1 className="bento-title mt-4 mb-8 sm:mt-10 justify-center text-center">
                Conoce nuestros puntos de reciclaje
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
                <Marker position={center} icon={customIcon}>
                    <Popup>Pasto Centro</Popup>
                </Marker>
            </MapContainer>

            <div className="justify-center items-center w-full flex mt-6 mx-auto">
                <Button
                    id="watch-trailer"
                    title="Puntos de reciclaje"
                    leftIcon={<Map />}
                    containerClass="!bg-emerald-400 flex-center gap-3 absolute hero-heading md:w-64 mx-auto"
                    onClick={() => useNavigate('/puntosdereciclaje')}
                  
                />
            </div>
        </div>
    );
};

export default Mapa;
