import { motion, useReducedMotion } from 'framer-motion'

/**
 * Original brain mascot: a violet brain with an AI sparkle floating above it,
 * holding a stylus. Stands for "psychology + AI" on the homepage.
 */
export function Brain({ size = 220 }: { size?: number }) {
  const reduce = useReducedMotion()
  const bob = reduce ? {} : { animate: { y: [0, -6, 0] }, transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const } }
  const twinkle = reduce
    ? {}
    : { animate: { scale: [1, 1.18, 1], rotate: [0, 12, 0], opacity: [0.9, 1, 0.9] }, transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' as const } }

  const OUT = '#2a1840'
  return (
    <motion.svg
      width={size}
      height={size * (252 / 240)}
      viewBox="0 0 240 252"
      role="img"
      aria-label="A friendly violet brain with an AI sparkle above it, holding a stylus"
      {...bob}
    >
      <defs>
        <radialGradient id="brain-fill" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#e6d4ff" />
          <stop offset="55%" stopColor="#b98cf5" />
          <stop offset="100%" stopColor="#8b5bd6" />
        </radialGradient>
        <radialGradient id="spark-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffe27a" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffe27a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* AI sparkle */}
      <motion.g style={{ transformOrigin: '120px 30px' }} {...twinkle}>
        <circle cx="120" cy="30" r="26" fill="url(#spark-glow)" />
        <path d="M120 10 C123 24 126 27 140 30 C126 33 123 36 120 50 C117 36 114 33 100 30 C114 27 117 24 120 10 Z" fill="#ffd84a" stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M146 12 C147 17 148 18 153 19 C148 20 147 21 146 26 C145 21 144 20 139 19 C144 18 145 17 146 12 Z" fill="#fff3b8" stroke={OUT} strokeWidth="1.8" strokeLinejoin="round" />
      </motion.g>

      {/* legs and shoes */}
      <path d="M98 196 L94 240" stroke={OUT} strokeWidth="7" strokeLinecap="round" />
      <path d="M142 196 L146 240" stroke={OUT} strokeWidth="7" strokeLinecap="round" />
      <path d="M76 246 q0 -12 18 -12 q14 0 14 12 Z" fill="#ffd84a" stroke={OUT} strokeWidth="3" strokeLinejoin="round" />
      <path d="M132 246 q0 -12 14 -12 q18 0 18 12 Z" fill="#ffd84a" stroke={OUT} strokeWidth="3" strokeLinejoin="round" />

      {/* left arm waving */}
      <path d="M44 128 Q22 112 20 86" stroke={OUT} strokeWidth="7" strokeLinecap="round" fill="none" />
      <circle cx="20" cy="82" r="10" fill="#b98cf5" stroke={OUT} strokeWidth="3" />

      {/* right arm holding a stylus */}
      <path d="M196 132 Q214 150 206 170" stroke={OUT} strokeWidth="7" strokeLinecap="round" fill="none" />
      <g transform="rotate(-35 206 172)">
        <rect x="200" y="140" width="10" height="52" rx="4" fill="#3d8bff" stroke={OUT} strokeWidth="2.5" />
        <path d="M200 192 L205 204 L210 192 Z" fill="#e8e2da" stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
      </g>
      <circle cx="206" cy="172" r="10" fill="#b98cf5" stroke={OUT} strokeWidth="3" />

      {/* brain body: overlapping lobes */}
      <path
        d="M52 150 C30 146 26 118 42 106 C34 84 50 64 72 68 C78 50 102 46 116 58 C128 44 156 46 162 66 C184 60 204 78 196 100 C214 112 210 142 188 150 C192 170 170 186 150 178 C140 194 112 196 104 182 C84 192 58 180 62 164 C56 160 52 156 52 150 Z"
        fill="url(#brain-fill)"
        stroke={OUT}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* folds */}
      <g stroke="#7a48c4" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.85">
        <path d="M120 60 C114 80 126 92 118 112" />
        <path d="M70 84 C82 80 90 90 86 100" />
        <path d="M160 82 C150 78 144 90 150 98" />
        <path d="M52 124 C62 118 70 126 66 136" />
        <path d="M186 122 C176 118 170 128 176 136" />
        <path d="M96 168 C102 160 112 164 110 172" />
        <path d="M134 168 C140 160 150 166 146 174" />
      </g>
      {/* highlight */}
      <path d="M76 80 C86 70 100 68 108 72" stroke="#fff" strokeOpacity="0.7" strokeWidth="5" strokeLinecap="round" fill="none" />

      {/* face */}
      <ellipse cx="100" cy="128" rx="13" ry="15" fill="#fff" stroke={OUT} strokeWidth="2.5" />
      <ellipse cx="142" cy="128" rx="13" ry="15" fill="#fff" stroke={OUT} strokeWidth="2.5" />
      <circle cx="103" cy="131" r="6.5" fill={OUT} />
      <circle cx="145" cy="131" r="6.5" fill={OUT} />
      <circle cx="105" cy="128" r="2.2" fill="#fff" />
      <circle cx="147" cy="128" r="2.2" fill="#fff" />
      <ellipse cx="84" cy="150" rx="8" ry="4.5" fill="#ff8fab" opacity="0.7" />
      <ellipse cx="158" cy="150" rx="8" ry="4.5" fill="#ff8fab" opacity="0.7" />
      <path d="M108 152 Q121 166 134 152 Q121 158 108 152 Z" fill="#7a1f3d" stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
    </motion.svg>
  )
}
