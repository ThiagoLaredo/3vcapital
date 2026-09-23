"use client";

interface Props {
  center?: { lat: number; lng: number };
  height?: number | string;
  zoom?: number;
}

export default function LeafletMap({
  center = { lat: -23.5669368, lng: -46.6676223 },
  height = '220px',
  zoom = 17,
}: Props) {
  const addressQuery = encodeURIComponent('Rua Padre João Manuel, 1212, Cerqueira César, São Paulo, SP, 01411-000');
  const mapUrl = `https://www.google.com/maps?q=${addressQuery}&z=${zoom}&output=embed`;

  return (
    <div
      style={{
        width: '100%',
        height,
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid rgba(14, 152, 153, 0.25)',
        boxShadow: '0 8px 20px rgba(14, 152, 153, 0.08)',
        background: '#edf7f7',
      }}
    >
      <iframe
        title="Localização da 3V Capital em São Paulo"
        src={mapUrl}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          border: 0,
        }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
