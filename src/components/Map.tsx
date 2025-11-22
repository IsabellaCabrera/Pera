import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { useEffect, useRef } from "react";
import type { MapProps } from "../types/map";
import { Loader } from "./Loader/Loader";

declare const google: typeof import("google.maps");

export const Map = ({ address, markerTitle }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMap = async () => {
      setOptions({ key: "AIzaSyCoM1nrkowOMKYejOG3_v4Yv9OT-NvbiKw" });

      const { Map } = await importLibrary("maps");
      const { AdvancedMarkerElement } = await importLibrary("marker");
      await importLibrary("core");

      const geocoder = new google.maps.Geocoder();

      geocoder.geocode(
        { address },
        (
          results: google.maps.GeocoderResult[] | null,
          status: google.maps.GeocoderStatus
        ) => {
          if (
            status === google.maps.GeocoderStatus.OK &&
            results &&
            results.length > 0
          ) {
            const location = results[0].geometry.location;

            if (mapRef.current) {
              const map = new Map(mapRef.current, {
                center: location,
                zoom: 15,
                mapId: "map",
              });

              new AdvancedMarkerElement({
                map,
                position: location,
                title: markerTitle,
              });
            }
          } else {
            console.error("No se pudo geocodificar:", status);
          }
        }
      );
    };
    loadMap();
  }, [address, markerTitle]);

  return (
    <div
      ref={mapRef}
      className="w-full h-[250px] md:h-[450px] bg-mainWhite md:mb-10 rounded-4xl flex items-center justify-center"
    >
      <Loader />
    </div>
  );
};
