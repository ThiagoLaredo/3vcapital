"use client";
import { useEffect, useRef } from 'react';
import Script from 'next/script';

interface Props {
  center?: { lat: number; lng: number };
  height?: number | string;
  zoom?: number;
}

export default function LeafletMap({
  center = { lat: -23.5669368, lng: -46.6676223 },
  height = '220px',
  zoom = 16,
}: Props) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);

  // Adiciona CSS do Leaflet dinamicamente se necessário
  useEffect(() => {
    const id = 'leaflet-css';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      link.crossOrigin = '';
      document.head.appendChild(link);
    }
  }, []);

  function initMap() {
    const L = (window as any).L;
    if (!L || !mapRef.current) return;
    // evita re-inicializar
    if (mapInstanceRef.current) return;

    try {
      // desabilita zoom com scroll para não atrapalhar rolagem da página
      const map = L.map(mapRef.current, { center, zoom, zoomControl: true, scrollWheelZoom: false });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
        maxZoom: 19,
      }).addTo(map);

      // Marker com cor do site usando SVG dataURL, com rasgo central
      const color = '#0e9899';
      const svg = encodeURIComponent(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
  <path fill="${color}" fill-rule="evenodd" d="M15 0C8.372 0 3 5.372 3 12c0 9.75 12 23 12 23s12-13.25 12-23C27 5.372 21.628 0 15 0z M15 10a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/>
</svg>`);
      const iconUrl = `data:image/svg+xml;charset=UTF-8,${svg}`;

      const icon = L.icon({
        iconUrl,
        iconSize: [30, 40],
        iconAnchor: [15, 40],
      });

      L.marker(center, { icon }).addTo(map);

      mapInstanceRef.current = map;
    } catch (e) {
      // silencioso
    }
  }

  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch {}
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <Script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        strategy="lazyOnload"
        onLoad={() => initMap()}
      />
      <div ref={mapRef} style={{ width: '100%', height }} />
    </>
  );
}
