"use client";
import { useEffect, useRef } from 'react';
import Script from 'next/script';

interface Props {
  center?: { lat: number; lng: number };
  height?: number | string;
  zoom?: number;
}

type GoogleMapStyle = {
  featureType?: string;
  elementType?: string;
  stylers: Array<{ color?: string }>;
};

export default function StyledMap({
  center = { lat: -23.565028, lng: -46.665078 },
  height = '220px',
  zoom = 22,
}: Props) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const initializedRef = useRef(false);

  const styles: GoogleMapStyle[] = [
    { elementType: 'geometry', stylers: [{ color: '#f5f5f5' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
    { featureType: 'water', stylers: [{ color: '#cfe8e8' }] },
    { featureType: 'road', stylers: [{ color: '#e0e0e0' }] },
    { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#d1f0ef' }] },
    { featureType: 'poi', stylers: [{ color: '#eeeeee' }] },
    { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#0e9899' }] },
    { featureType: 'poi.park', stylers: [{ color: '#dff0ef' }] },
  ];

  function initMap() {
    if (initializedRef.current) return;
    if (!(window as any).google || !mapRef.current) return;
    try {
      const map = new (window as any).google.maps.Map(mapRef.current, {
        center,
        zoom,
        styles,
        disableDefaultUI: false,
      });
      new (window as any).google.maps.Marker({ position: center, map });
      initializedRef.current = true;
    } catch (e) {
      // falha silenciosa
    }
  }

  useEffect(() => {
    // Caso o script já esteja carregado antes do onLoad
    if ((window as any).google && !initializedRef.current) {
      initMap();
    }
  }, []);

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
        onLoad={initMap}
        strategy="lazyOnload"
      />
      <div ref={mapRef} style={{ width: '100%', height }} />
    </>
  );
}
