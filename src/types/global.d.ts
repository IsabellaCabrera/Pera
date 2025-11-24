declare global {
  interface Window {
    google: typeof google;
  }
}

declare namespace google.maps {
  interface GeocoderResult {
    geometry: {
      location: any;
    };
  }

  type GeocoderStatus = string;
}


export {};
