"use client";

interface Props {
  center?: { lat: number; lng: number };
  height?: number | string;
  zoom?: number;
}

export default function StyledMap({
  height = '220px',
}: Props) {
  const markerX = 60;
  const markerY = 72;

  return (
    <div
      style={{
        width: '100%',
        height,
        borderRadius: 12,
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #effaf9 0%, #dfeef0 100%)',
        border: '1px solid rgba(14, 152, 153, 0.25)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle at 15% 20%, rgba(14,152,153,0.12) 0, rgba(14,152,153,0.12) 8px, transparent 9px), radial-gradient(circle at 75% 60%, rgba(14,152,153,0.12) 0, rgba(14,152,153,0.12) 10px, transparent 11px), linear-gradient(90deg, rgba(255,255,255,0.2) 0, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.2) 0, rgba(255,255,255,0.2) 1px, transparent 1px)',
          backgroundSize: '120px 120px, 120px 120px, 24px 24px, 24px 24px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: `${markerX}%`,
          top: `${markerY}%`,
          transform: 'translate(-50%, -50%) rotate(-45deg)',
          width: 18,
          height: 18,
          borderRadius: '50% 50% 50% 0',
          background: '#0e9899',
          boxShadow: '0 10px 24px rgba(14,152,153,0.35)',
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: `${markerX}%`,
          top: `${markerY}%`,
          transform: 'translate(-50%, -50%)',
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#fff',
          zIndex: 3,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 12,
          right: 12,
          bottom: 10,
          textAlign: 'center',
          fontSize: 12,
          color: '#0e9899',
          fontWeight: 700,
          letterSpacing: 0.4,
          zIndex: 4,
        }}
      >
        3V Capital • São Paulo
      </div>
    </div>
  );
}
