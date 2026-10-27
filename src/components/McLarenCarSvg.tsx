import React from "react";

export default function McLarenCarSvg() {
  return (
    <svg
      viewBox="0 0 520 240"
      className="w-full h-auto drop-shadow-[0_20px_25px_rgba(0,0,0,0.85)]"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="carBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#c23b00" />
          <stop offset="50%" stopColor="#ff5500" />
          <stop offset="100%" stopColor="#ff8800" />
        </linearGradient>
        <linearGradient id="carbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#111827" />
          <stop offset="100%" stopColor="#1f2937" />
        </linearGradient>
        <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#090d16" />
          <stop offset="65%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
      </defs>
      <rect x="82" y="14" width="76" height="24" rx="8" fill="#090a0f" stroke="#334155" strokeWidth="2" />
      <rect x="82" y="202" width="76" height="24" rx="8" fill="#090a0f" stroke="#334155" strokeWidth="2" />
      <rect x="358" y="16" width="72" height="22" rx="8" fill="#090a0f" stroke="#334155" strokeWidth="2" />
      <rect x="358" y="202" width="72" height="22" rx="8" fill="#090a0f" stroke="#334155" strokeWidth="2" />
      <path d="M18,56 L42,42 L42,198 L18,184 Z" fill="url(#carbonGrad)" stroke="#374151" strokeWidth="1.5" />
      <line x1="22" y1="82" x2="40" y2="82" stroke="#4b5563" strokeWidth="3" />
      <line x1="22" y1="110" x2="40" y2="110" stroke="#4b5563" strokeWidth="3" />
      <line x1="22" y1="130" x2="40" y2="130" stroke="#4b5563" strokeWidth="3" />
      <line x1="22" y1="158" x2="40" y2="158" stroke="#4b5563" strokeWidth="3" />
      <path d="M475,46 C502,62 512,90 512,120 C512,150 502,178 475,194 L460,190 L460,50 Z" fill="url(#carbonGrad)" stroke="#475569" strokeWidth="1.5" />
      <path
        d="M35,52 C65,24 145,22 195,34 C235,44 268,45 315,34 C365,22 435,25 478,52 C500,68 506,94 506,120 C506,146 500,172 478,188 C435,215 365,218 315,206 C268,195 235,196 195,206 C145,218 65,216 35,188 C24,174 22,148 22,120 C22,92 24,66 35,52 Z"
        fill="url(#carBodyGrad)"
        stroke="#ffffff"
        strokeOpacity="0.25"
        strokeWidth="2"
      />
      <path d="M185,42 L290,54 L265,68 L175,54 Z" fill="#111827" opacity="0.85" />
      <path d="M185,198 L290,186 L265,172 L175,186 Z" fill="#111827" opacity="0.85" />
      <path d="M365,70 L475,86" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2" fill="none" />
      <path d="M365,170 L475,154" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2" fill="none" />
      <path
        d="M145,78 C185,56 295,52 365,72 C388,82 398,100 398,120 C398,140 388,158 365,168 C295,188 185,184 145,162 C125,150 118,136 118,120 C118,104 125,90 145,78 Z"
        fill="url(#glassGrad)"
        stroke="#64748b"
        strokeWidth="2"
      />
      <path d="M295,68 C340,72 368,86 378,112 C372,94 340,82 295,78 Z" fill="#ffffff" opacity="0.22" />
      <rect x="62" y="96" width="52" height="48" rx="6" fill="#090d16" stroke="#334155" strokeWidth="1.5" />
      <line x1="74" y1="102" x2="74" y2="138" stroke="#475569" strokeWidth="2.5" />
      <line x1="88" y1="102" x2="88" y2="138" stroke="#475569" strokeWidth="2.5" />
      <line x1="102" y1="102" x2="102" y2="138" stroke="#475569" strokeWidth="2.5" />
      <path d="M40,48 C52,48 58,76 58,120 C58,164 52,192 40,192 L28,186 L28,54 Z" fill="#111827" stroke="#475569" strokeWidth="1.5" />
      <path d="M322,48 L342,26 L352,32 L338,52 Z" fill="url(#carBodyGrad)" stroke="#ffffff" strokeOpacity="0.3" />
      <path d="M322,192 L342,214 L352,208 L338,188 Z" fill="url(#carBodyGrad)" stroke="#ffffff" strokeOpacity="0.3" />
      <path d="M466,54 L494,68 L484,82 L458,64 Z" fill="#fef08a" />
      <path d="M466,186 L494,172 L484,158 L458,176 Z" fill="#fef08a" />
      <path d="M28,56 L34,56 L34,88 L28,88 Z" fill="#ef4444" />
      <path d="M28,152 L34,152 L34,184 L28,184 Z" fill="#ef4444" />
    </svg>
  );
}
