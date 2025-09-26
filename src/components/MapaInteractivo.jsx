import React, { useRef, useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import NavBar from "./Navbar";
import { Navigation } from "lucide-react";
import { geojson as puntosGeoJson } from "../constants/puntosReciclaje";

const FitBounds = ({ layerRef }) => {
    const map = useMap();
    useEffect(() => {
        if (!layerRef?.current || !map) return;
        try {
            const bounds = layerRef.current.getBounds();
            if (bounds && !bounds.isEmpty())
                map.fitBounds(bounds, { padding: [40, 40] });
        } catch (e) {}
    }, [layerRef, map]);
    return null;
};


const makeIcon = (url, options = {}) => {
    return L.icon({
        iconUrl: url,
        iconSize: options.iconSize || [40, 50], 
        iconAnchor: options.iconAnchor || [16, 32],
        popupAnchor: options.popupAnchor || [0, -32],
    });
};


const pointToLayer = (feature, latlng) => {
    const props = feature?.properties ?? {};
    if (props.name === "recycling_point") {
        return pointTrashToLayer(feature, latlng);
    }

    const iconUrl = "img/indicador_bueno.png";
    return L.marker(latlng, {
        icon: makeIcon(iconUrl, { iconSize: [32, 32], iconAnchor: [16, 32] }),
    });
};

const pointTrashToLayer = (feature, latlng) => {
    const iconTrash = "img/reciclaje.png";
    return L.marker(latlng, {
        icon: makeIcon(iconTrash, { iconSize: [50, 60], iconAnchor: [25, 60] }),
    });
};
const onEachFeature = (feature, layer) => {
    const props = feature?.properties ?? {};
    let desc = "";

    if (props.name === "recycling_point") {
        desc = "Punto de reciclaje ♻️";
    } else if (props.description) {
        if (typeof props.description === "string") desc = props.description;
        else if (props.description?.value) desc = props.description.value;
    }

    const html = `<strong>${props.name || ""}</strong><br/>${desc}`;
    layer.bindPopup(html);
};

const styleFeature = (feature) => {
    const p = feature?.properties ?? {};
    if (
        feature.geometry?.type === "LineString" ||
        feature.geometry?.type === "Polygon"
    ) {
        return {
            color: p.stroke || p["stroke"] || "#3388ff",
            weight: Number(p["stroke-width"] || p["stroke_width"] || 5),
            opacity: Number(p["stroke-opacity"] ?? 0.9),
        };
    }
    return {};
};

const filterFeature = (feature) => {
    return feature?.properties?.show_on_map !== false;
};

const LocateButton = () => {
    const map = useMap();

    const handleClick = () => {
        if (!navigator.geolocation) {
            alert("La geolocalización no está disponible en este navegador.");
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                map.setView([latitude, longitude], 16);
                L.marker([latitude, longitude])
                    .addTo(map)
                    .bindPopup("Estás aquí")
                    .openPopup();
            },
            () => alert("No se pudo obtener la ubicación.")
        );
    };

    return (
        <button
            onClick={handleClick}
            className="absolute bottom-6 right-6 z-[1000] bg-slate-900 text-white border-none rounded-full w-[50px] h-[50px] flex items-center justify-center pr-1 cursor-pointer shadow-lg text-2xl"
            title="Centrar en mi ubicación"
        >
            <Navigation />
        </button>
    );
};

const MapaInteractivo = ({ data = puntosGeoJson }) => {
    const center = [1.2123, -77.2802];
    const layerRef = useRef(null);
    const layer2Ref = useRef(null)
    const features = data?.features ?? [];

    return (
        <main className="flex flex-col h-screen w-screen">
            {/* NavBar fijo arriba */}
            <div className="fixed top-0 left-0 right-0 z-[1000]">
                <NavBar />
            </div>

            {/* Contenedor principal */}
            <div className="relative flex-grow w-full h-full pt-[0px]">
                <MapContainer
                    center={center}
                    zoom={15}
                    className="h-full w-full"
                    whenCreated={() => {}}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
                        url="https://cartodb-basemaps-a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                        subdomains="abcd"
                        maxZoom={19}
                    />

                    {features.length > 0 && (
                        <>
                            <GeoJSON
                                data={data}
                                pointToLayer={pointToLayer}
                                onEachFeature={onEachFeature}
                                style={styleFeature}
                                filter={filterFeature}
                                ref={layerRef}
                            />
                            <FitBounds layerRef={layerRef} />
                        </>
                    )}

                    {/* Botón flotante */}
                    <LocateButton />
                </MapContainer>

                {/* Título centrado sobre el mapa */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] px-4 py-4 rounded-lg">
                    <h1 className="text-white text-base md:text-lg font-bold m-0">
                        Puntos de recolección
                    </h1>
                </div>
            </div>
        </main>
    );
};

export default MapaInteractivo;
