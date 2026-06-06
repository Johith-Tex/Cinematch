import { useState, useEffect, useRef, useCallback } from "react";

const MOVIES = [
  { id: "m1",  type:"movie", title:"The Dark Knight",          year:2008, genres:["Action","Crime","Drama"],          rating:9.0, poster:"🦇", accent:"#4fc3f7" },
  { id: "m2",  type:"movie", title:"Inception",                year:2010, genres:["Action","Sci-Fi","Thriller"],      rating:8.8, poster:"🌀", accent:"#81d4fa" },
  { id: "m3",  type:"movie", title:"Interstellar",             year:2014, genres:["Drama","Sci-Fi","Adventure"],      rating:8.6, poster:"🪐", accent:"#a5d6a7" },
  { id: "m4",  type:"movie", title:"Parasite",                 year:2019, genres:["Drama","Thriller","Comedy"],       rating:8.5, poster:"🏠", accent:"#ef9a9a" },
  { id: "m5",  type:"movie", title:"The Shawshank Redemption", year:1994, genres:["Drama","Crime"],                   rating:9.3, poster:"🔑", accent:"#ffe082" },
  { id: "m6",  type:"movie", title:"Pulp Fiction",             year:1994, genres:["Crime","Drama","Thriller"],        rating:8.9, poster:"💼", accent:"#f48fb1" },
  { id: "m7",  type:"movie", title:"The Matrix",               year:1999, genres:["Action","Sci-Fi"],                 rating:8.7, poster:"💊", accent:"#69f0ae" },
  { id: "m8",  type:"movie", title:"Avengers: Endgame",        year:2019, genres:["Action","Adventure","Sci-Fi"],     rating:8.4, poster:"⚡", accent:"#b39ddb" },
  { id: "m9",  type:"movie", title:"Joker",                    year:2019, genres:["Crime","Drama","Thriller"],        rating:8.4, poster:"🃏", accent:"#ff8a65" },
  { id:"m10",  type:"movie", title:"Forrest Gump",             year:1994, genres:["Drama","Romance"],                 rating:8.8, poster:"🏃", accent:"#80cbc4" },
  { id:"m11",  type:"movie", title:"The Godfather",            year:1972, genres:["Crime","Drama"],                   rating:9.2, poster:"🌹", accent:"#ef9a9a" },
  { id:"m12",  type:"movie", title:"Whiplash",                 year:2014, genres:["Drama","Music"],                   rating:8.5, poster:"🥁", accent:"#ffcc02" },
  { id:"m13",  type:"movie", title:"La La Land",               year:2016, genres:["Drama","Music","Romance"],         rating:8.0, poster:"🌟", accent:"#ce93d8" },
  { id:"m14",  type:"movie", title:"Get Out",                  year:2017, genres:["Horror","Mystery","Thriller"],     rating:7.7, poster:"👁️", accent:"#a5d6a7" },
  { id:"m15",  type:"movie", title:"Mad Max: Fury Road",       year:2015, genres:["Action","Adventure","Sci-Fi"],     rating:8.1, poster:"🔥", accent:"#ff8a65" },
  { id:"m16",  type:"movie", title:"Her",                      year:2013, genres:["Drama","Romance","Sci-Fi"],        rating:8.0, poster:"🎧", accent:"#ffcc80" },
  { id:"m17",  type:"movie", title:"Blade Runner 2049",        year:2017, genres:["Action","Drama","Mystery"],        rating:8.0, poster:"🤖", accent:"#80deea" },
  { id:"m18",  type:"movie", title:"The Revenant",             year:2015, genres:["Adventure","Drama","Western"],     rating:8.0, poster:"🐻", accent:"#bcaaa4" },
  { id:"m19",  type:"movie", title:"Gone Girl",                year:2014, genres:["Drama","Mystery","Thriller"],      rating:8.1, poster:"🔪", accent:"#f48fb1" },
  { id:"m20",  type:"movie", title:"Hereditary",               year:2018, genres:["Drama","Horror","Mystery"],        rating:7.3, poster:"🏚️", accent:"#9fa8da" },
];

const SERIES = [
  { id:"s1",  type:"series", title:"Breaking Bad",        year:2008, seasons:5, genres:["Crime","Drama","Thriller"],     rating:9.5, poster:"⚗️",  accent:"#a5d6a7" },
  { id:"s2",  type:"series", title:"Game of Thrones",     year:2011, seasons:8, genres:["Action","Adventure","Drama"],   rating:9.3, poster:"🐉",  accent:"#ef9a9a" },
  { id:"s3",  type:"series", title:"Chernobyl",           year:2019, seasons:1, genres:["Drama","History","Thriller"],   rating:9.4, poster:"☢️",  accent:"#80cbc4" },
  { id:"s4",  type:"series", title:"Stranger Things",     year:2016, seasons:4, genres:["Drama","Fantasy","Horror"],     rating:8.7, poster:"🔦",  accent:"#ce93d8" },
  { id:"s5",  type:"series", title:"The Wire",            year:2002, seasons:5, genres:["Crime","Drama","Thriller"],     rating:9.3, poster:"📡",  accent:"#ffe082" },
  { id:"s6",  type:"series", title:"Ozark",               year:2017, seasons:4, genres:["Crime","Drama","Thriller"],     rating:8.5, poster:"🌊",  accent:"#4fc3f7" },
  { id:"s7",  type:"series", title:"Succession",          year:2018, seasons:4, genres:["Drama","Comedy"],               rating:8.9, poster:"💰",  accent:"#ffcc80" },
  { id:"s8",  type:"series", title:"Dark",                year:2017, seasons:3, genres:["Crime","Drama","Mystery"],      rating:8.8, poster:"🌀",  accent:"#9fa8da" },
  { id:"s9",  type:"series", title:"The Last of Us",      year:2023, seasons:2, genres:["Action","Adventure","Drama"],   rating:8.7, poster:"🍄",  accent:"#a5d6a7" },
  { id:"s10", type:"series", title:"Better Call Saul",    year:2015, seasons:6, genres:["Crime","Drama"],               rating:9.0, poster:"⚖️",  accent:"#ffcc02" },
  { id:"s11", type:"series", title:"Mindhunter",          year:2017, seasons:2, genres:["Crime","Drama","Thriller"],     rating:8.6, poster:"🧠",  accent:"#ef9a9a" },
  { id:"s12", type:"series", title:"Peaky Blinders",      year:2013, seasons:6, genres:["Crime","Drama"],               rating:8.8, poster:"🎩",  accent:"#b39ddb" },
  { id:"s13", type:"series", title:"Severance",           year:2022, seasons:2, genres:["Drama","Mystery","Sci-Fi"],     rating:8.7, poster:"🪪",  accent:"#80deea" },
  { id:"s14", type:"series", title:"The Bear",            year:2022, seasons:3, genres:["Drama","Comedy"],               rating:8.6, poster:"🐻",  accent:"#ff8a65" },
  { id:"s15", type:"series", title:"House of the Dragon", year:2022, seasons:2, genres:["Action","Adventure","Drama"],   rating:8.4, poster:"🔥",  accent:"#ef9a9a" },
  { id:"s16", type:"series", title:"Euphoria",            year:2019, seasons:2, genres:["Drama","Romance"],              rating:8.4, poster:"✨",  accent:"#f48fb1" },
  { id:"s17", type:"series", title:"Squid Game",          year:2021, seasons:2, genres:["Action","Drama","Mystery"],     rating:8.0, poster:"🎮",  accent:"#f48fb1" },
  { id:"s18", type:"series", title:"The Boys",            year:2019, seasons:4, genres:["Action","Comedy","Crime"],      rating:8.7, poster:"🦸",  accent:"#ef9a9a" },
  { id:"s19", type:"series", title:"Andor",               year:2022, seasons:2, genres:["Action","Adventure","Sci-Fi"],  rating:8.4, poster:"🚀",  accent:"#81d4fa" },
  { id:"s20", type:"series", title:"Black Mirror",        year:2011, seasons:7, genres:["Drama","Horror","Sci-Fi"],      rating:8.8, poster:"📺",  accent:"#9fa8da" },
];

const ALL_ITEMS = [...MOVIES, ...SERIES];
const ALL_GENRES = [...new Set(ALL_ITEMS.flatMap(m => m.genres))].sort();


function cosineSim(vecA, vecB) {
  const dot = vecA.reduce((s, v, i) => s + v * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((s, v) => s + v * v, 0));
  const magB = Math.sqrt(vecB.reduce((s, v) => s + v * v, 0));
  return magA && magB ? dot / (magA * magB) : 0;
}

function contentBasedRecs(userRatings, likedGenres, pool) {
  const ratedIds = new Set(userRatings.map(r => r.id));
  const genreScores = {};
  ALL_GENRES.forEach(g => (genreScores[g] = 0));
  userRatings.forEach(({ id, rating }) => {
    const item = ALL_ITEMS.find(m => m.id === id);
    if (item) item.genres.forEach(g => { genreScores[g] += rating; });
  });
  likedGenres.forEach(g => { genreScores[g] = (genreScores[g] || 0) + 10; });
  const userVec = ALL_GENRES.map(g => genreScores[g]);
  return pool
    .filter(m => !ratedIds.has(m.id))
    .map(item => ({
      ...item,
      score: cosineSim(userVec, ALL_GENRES.map(g => (item.genres.includes(g) ? 1 : 0))),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
}

const SYNTHETIC_USERS = [
  { name: "Alex",   ratings: { m1:9, m2:8, m7:9, m8:7, m15:8, s1:9, s6:8, s10:9 } },
  { name: "Jordan", ratings: { m3:9, m16:8, m17:9, m10:7, m13:8, s13:9, s8:9, s20:8 } },
  { name: "Sam",    ratings: { m5:9, m6:9, m11:9, m9:7, m4:8, s5:9, s10:8, s12:9 } },
  { name: "Riley",  ratings: { m4:9, m9:8, m19:9, m14:7, m20:8, s3:9, s11:9, s17:8 } },
  { name: "Morgan", ratings: { m12:9, m13:8, m10:9, m18:7, m16:8, s7:9, s14:9, s16:8 } },
  { name: "Casey",  ratings: { s1:9, s2:8, s4:9, s9:8, s15:7, m8:9, m15:8 } },
  { name: "Drew",   ratings: { s7:9, s14:9, s16:8, m13:9, m10:8, s2:7 } },
];

function collaborativeRecs(userRatings, pool) {
  if (userRatings.length < 2) return [];
  const userMap = {};
  userRatings.forEach(r => { userMap[r.id] = r.rating; });
  const similarities = SYNTHETIC_USERS.map(su => {
    const commonIds = Object.keys(su.ratings).filter(id => userMap[id]);
    if (!commonIds.length) return { user: su, sim: 0 };
    return { user: su, sim: cosineSim(commonIds.map(id => userMap[id]), commonIds.map(id => su.ratings[id])) };
  }).sort((a, b) => b.sim - a.sim);
  const ratedIds = new Set(userRatings.map(r => r.id));
  const scoreMap = {};
  similarities.slice(0, 3).forEach(({ user, sim }) => {
    Object.entries(user.ratings).forEach(([id, rating]) => {
      if (!ratedIds.has(id)) scoreMap[id] = (scoreMap[id] || 0) + sim * rating;
    });
  });
  return Object.entries(scoreMap)
    .map(([id, score]) => ({ ...ALL_ITEMS.find(m => m.id === id), score }))
    .filter(m => m.title && pool.some(p => p.id === m.id))
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
}


function DynamicBG() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);

    
    const orbs = Array.from({ length: 7 }, (_, i) => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: 180 + Math.random() * 220,
      hue: [220, 260, 180, 300, 200, 240, 210][i],
      alpha: 0.04 + Math.random() * 0.05,
      phase: Math.random() * Math.PI * 2,
    }));

  
    const stars = Array.from({ length: 140 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.2,
      alpha: 0.2 + Math.random() * 0.6,
      twinkle: Math.random() * Math.PI * 2,
      speed: 0.005 + Math.random() * 0.015,
    }));

    let frame = 0;
    let raf;
    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, W, H);

      
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, "#04040d");
      bg.addColorStop(0.5, "#080815");
      bg.addColorStop(1, "#060610");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      
      orbs.forEach(o => {
        o.x += o.vx; o.y += o.vy;
        if (o.x < -o.r) o.x = W + o.r;
        if (o.x > W + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = H + o.r;
        if (o.y > H + o.r) o.y = -o.r;
        const pulse = Math.sin(frame * 0.008 + o.phase) * 0.3 + 1;
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r * pulse);
        g.addColorStop(0, `hsla(${o.hue},80%,55%,${o.alpha * 1.8})`);
        g.addColorStop(0.5, `hsla(${o.hue},70%,40%,${o.alpha * 0.7})`);
        g.addColorStop(1, `hsla(${o.hue},60%,30%,0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r * pulse, 0, Math.PI * 2);
        ctx.fill();
      });

      const scanY = (frame * 0.3) % H;
      const scan = ctx.createLinearGradient(0, scanY - 80, 0, scanY + 80);
      scan.addColorStop(0, "rgba(100,180,255,0)");
      scan.addColorStop(0.5, "rgba(100,180,255,0.018)");
      scan.addColorStop(1, "rgba(100,180,255,0)");
      ctx.fillStyle = scan;
      ctx.fillRect(0, scanY - 80, W, 160);

      
      stars.forEach(s => {
        s.twinkle += s.speed;
        const a = s.alpha * (0.5 + 0.5 * Math.sin(s.twinkle));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,220,255,${a})`;
        ctx.fill();
      });

      
      if (frame % 3 === 0) {
        const imageData = ctx.getImageData(0, 0, W, H);
        const d = imageData.data;
        for (let i = 0; i < d.length; i += 4) {
          const noise = (Math.random() - 0.5) * 8;
          d[i] = Math.min(255, Math.max(0, d[i] + noise));
          d[i+1] = Math.min(255, Math.max(0, d[i+1] + noise));
          d[i+2] = Math.min(255, Math.max(0, d[i+2] + noise));
        }
        ctx.putImageData(imageData, 0, 0);
      }

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  return (
    <canvas ref={canvasRef} style={{
      position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
    }} />
  );
}

function Stars({ value, onChange, size = 14 }) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display: "flex", gap: 1 }}>
      {Array.from({ length: 10 }, (_, i) => i + 1).map(s => (
        <span key={s}
          style={{ fontSize: size, color: s <= (hover || value) ? "#f5c518" : "#2a2a3a", cursor: onChange ? "pointer" : "default", transition: "color 0.1s", lineHeight: 1 }}
          onMouseEnter={() => onChange && setHover(s)}
          onMouseLeave={() => onChange && setHover(0)}
          onClick={() => onChange && onChange(s)}
        >★</span>
      ))}
    </div>
  );
}

function ItemCard({ item, userRating, onRate, showScore }) {
  const [hov, setHov] = useState(false);
  const isSeries = item.type === "series";
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative", overflow: "hidden",
        background: hov
          ? `linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))`
          : `linear-gradient(145deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01))`,
        backdropFilter: "blur(20px)",
        border: `1px solid ${hov ? item.accent + "55" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 18,
        padding: "16px 18px",
        transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        transform: hov ? "translateY(-4px) scale(1.01)" : "none",
        boxShadow: hov ? `0 20px 50px ${item.accent}25, 0 0 0 1px ${item.accent}22` : "0 4px 20px rgba(0,0,0,0.4)",
        cursor: "default",
      }}
    >
      {/* Accent glow top bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${item.accent}88, transparent)`,
        opacity: hov ? 1 : 0, transition: "opacity 0.3s",
      }} />

      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        {/* Poster emoji */}
        <div style={{
          width: 54, height: 54, borderRadius: 12, flexShrink: 0,
          background: `${item.accent}18`,
          border: `1px solid ${item.accent}33`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 26, transition: "transform 0.3s",
          transform: hov ? "scale(1.1) rotate(-3deg)" : "none",
        }}>{item.poster}</div>

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Type badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <span style={{
              fontSize: 9, padding: "2px 7px", borderRadius: 99, fontWeight: 700,
              background: isSeries ? `${item.accent}22` : "rgba(245,197,24,0.15)",
              color: isSeries ? item.accent : "#f5c518",
              letterSpacing: "0.1em", textTransform: "uppercase",
              border: `1px solid ${isSeries ? item.accent + "44" : "#f5c51844"}`,
            }}>
              {isSeries ? `📺 Series · S${item.seasons}` : "🎬 Movie"}
            </span>
          </div>

          <div style={{
            fontSize: 14, fontWeight: 700, color: "#f0f0f8", lineHeight: 1.2, marginBottom: 2,
            fontFamily: "'Syne', sans-serif", letterSpacing: "-0.01em",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>{item.title}</div>

          <div style={{ fontSize: 11, color: "#555", marginBottom: 6 }}>{item.year}</div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginBottom: 8 }}>
            {item.genres.map(g => (
              <span key={g} style={{
                fontSize: 9, padding: "2px 7px", borderRadius: 99,
                background: "rgba(255,255,255,0.06)", color: "#888",
                letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600,
              }}>{g}</span>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "#f5c518", fontSize: 11 }}>★ {item.rating}</span>
            <span style={{ color: "#333", fontSize: 10 }}>IMDb</span>
            {showScore && item.score !== undefined && (
              <span style={{
                marginLeft: "auto", fontSize: 10, fontWeight: 700,
                color: item.accent, background: `${item.accent}18`,
                padding: "2px 8px", borderRadius: 99,
              }}>{Math.round(item.score * 100)}% match</span>
            )}
          </div>

          {onRate && (
            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 9, color: "#444", marginBottom: 3, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {userRating ? `Rated ${userRating}/10` : "Tap to rate"}
              </div>
              <Stars value={userRating || 0} onChange={onRate} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AIChat({ userRatings, recs }) {
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef();
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading]);

  const PROMPTS = ["Why these recommendations?","Best show for a rainy night?","Top crime dramas to binge?","Hidden gem series I'd love?"];

  const send = async (q) => {
    const text = (q || input).trim();
    if (!text) return;
    const next = [...msgs, { role: "user", content: text }];
    setMsgs(next); setInput(""); setLoading(true);
    const ctx = `You are a passionate cinephile AI. User rated: ${userRatings.map(r => { const i = ALL_ITEMS.find(x => x.id === r.id); return i ? `${i.title} (${r.rating}/10)` : ""; }).filter(Boolean).join(", ") || "nothing yet"}. Current recs: ${recs.map(r => r.title).join(", ") || "none"}. Reply concisely in 2-3 sentences. Be enthusiastic and specific.`;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: ctx, messages: next }),
      });
      const data = await res.json();
      const reply = data.content?.find(b => b.type === "text")?.text || "Hmm, let me think...";
      setMsgs(prev => [...prev, { role: "assistant", content: reply }]);
    } catch { setMsgs(prev => [...prev, { role: "assistant", content: "Connection issue — try again!" }]); }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 680 }}>
      {/* Quick prompts */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
        {PROMPTS.map(p => (
          <button key={p} onClick={() => send(p)} style={{
            padding: "6px 14px", borderRadius: 99, fontSize: 11, fontFamily: "inherit",
            border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)",
            color: "#888", cursor: "pointer", transition: "all 0.2s",
          }} onMouseEnter={e => { e.target.style.color="#f5c518"; e.target.style.borderColor="#f5c51844"; }}
             onMouseLeave={e => { e.target.style.color="#888"; e.target.style.borderColor="rgba(255,255,255,0.08)"; }}>
            {p}
          </button>
        ))}
      </div>

      <div style={{
        background: "rgba(255,255,255,0.025)", backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20,
        display: "flex", flexDirection: "column", height: 440, overflow: "hidden",
      }}>
        <div style={{
          padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#69f0ae", boxShadow: "0 0 10px #69f0ae", animation: "pulse 2s infinite" }} />
          <span style={{ fontSize: 12, color: "#69f0ae", letterSpacing: "0.12em", fontFamily: "monospace" }}>CINEMATCH AI</span>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
          {msgs.length === 0 && (
            <div style={{ color: "#333", fontSize: 13, textAlign: "center", margin: "auto" }}>
              Ask me about movies, series, or your taste ✦
            </div>
          )}
          {msgs.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
              <div style={{
                maxWidth: "80%", padding: "10px 14px",
                borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                background: m.role === "user" ? "rgba(79,195,247,0.15)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${m.role === "user" ? "rgba(79,195,247,0.3)" : "rgba(255,255,255,0.06)"}`,
                fontSize: 13, lineHeight: 1.6,
                color: m.role === "user" ? "#b3e5fc" : "#c8c8d8",
              }}>{m.content}</div>
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex", gap: 5, padding: "8px 14px" }}>
              {[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#69f0ae", animation: `bounce 1.2s ${i*0.2}s infinite` }} />)}
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: 8 }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==="Enter" && send()}
            placeholder="Ask about movies & series..."
            style={{
              flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12, padding: "9px 14px", color: "#eee", fontSize: 13, outline: "none", fontFamily: "inherit",
            }} />
          <button onClick={() => send()} disabled={loading || !input.trim()} style={{
            background: "linear-gradient(135deg, #1e3a5f, #2a6090)",
            border: "1px solid rgba(79,195,247,0.3)", borderRadius: 12,
            padding: "9px 16px", color: "#81d4fa", fontSize: 16, cursor: "pointer", transition: "all 0.2s",
          }}>→</button>
        </div>
      </div>
    </div>
  );
}


export default function App() {
  const [tab, setTab] = useState("rate");
  const [mediaFilter, setMediaFilter] = useState("all"); // all | movie | series
  const [userRatings, setUserRatings] = useState([]);
  const [likedGenres, setLikedGenres] = useState([]);
  const [recAlgo, setRecAlgo] = useState("content");
  const [search, setSearch] = useState("");

  const rate = (id, r) => setUserRatings(p => [...p.filter(x => x.id !== id), { id, rating: r }]);
  const toggleGenre = g => setLikedGenres(p => p.includes(g) ? p.filter(x => x !== g) : [...p, g]);

  const pool = mediaFilter === "all" ? ALL_ITEMS : ALL_ITEMS.filter(x => x.type === mediaFilter);
  const contentRecs = contentBasedRecs(userRatings, likedGenres, pool);
  const collabRecs  = collaborativeRecs(userRatings, pool);
  const recs = recAlgo === "content" ? contentRecs : collabRecs;
  const allRecs = [...new Map([...contentRecs, ...collabRecs].map(x => [x.id, x])).values()];

  const filtered = pool.filter(m =>
    m.title.toLowerCase().includes(search.toLowerCase()) ||
    m.genres.some(g => g.toLowerCase().includes(search.toLowerCase()))
  );

  const ratedCount = userRatings.length;
  const TABS = [{ k:"rate", label:"Rate & Browse" }, { k:"recs", label:"Recommendations" }, { k:"chat", label:"Ask AI" }];
  const MEDIA_TABS = [{ k:"all", label:"All" }, { k:"movie", label:"🎬 Movies" }, { k:"series", label:"📺 Series" }];

  return (
    <div style={{ minHeight: "100vh", color: "#e8e8f0", fontFamily: "'DM Sans', sans-serif", position: "relative" }}>
      <DynamicBG />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-thumb{background:#2a2a3a;border-radius:99px;}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        .card-in{animation:fadeUp .4s ease forwards}
        input::placeholder{color:#333}
        button{transition:all 0.2s}
      `}</style>

      {/* ── HEADER ── */}
      <div style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(5,5,15,0.7)", backdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, paddingTop: 18, paddingBottom: 14 }}>
            {/* Logo */}
            <div>
              <div style={{
                fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800,
                letterSpacing: "-0.02em", lineHeight: 1,
                background: "linear-gradient(135deg, #f5c518 0%, #e8a000 40%, #ff6b6b 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>CINEMATCH</div>
              <div style={{ fontSize: 9, color: "#444", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 1 }}>
                AI · Movies · Series
              </div>
            </div>

            {/* Stats pills */}
            <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
              {[
                { label: `${ratedCount} rated`, active: ratedCount > 0, color: "#f5c518" },
                { label: `${likedGenres.length} genres`, active: likedGenres.length > 0, color: "#69f0ae" },
              ].map(p => (
                <div key={p.label} style={{
                  padding: "4px 12px", borderRadius: 99, fontSize: 11,
                  background: p.active ? `${p.color}18` : "rgba(255,255,255,0.04)",
                  border: `1px solid ${p.active ? p.color + "44" : "rgba(255,255,255,0.06)"}`,
                  color: p.active ? p.color : "#444",
                }}>{p.label}</div>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div style={{ display: "flex", gap: 2 }}>
            {TABS.map(t => (
              <button key={t.k} onClick={() => setTab(t.k)} style={{
                padding: "10px 22px", background: "none", border: "none", fontFamily: "inherit",
                borderBottom: tab === t.k ? "2px solid #f5c518" : "2px solid transparent",
                color: tab === t.k ? "#f5c518" : "#444",
                fontSize: 13, fontWeight: 500, cursor: "pointer",
              }}>{t.label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "32px 28px", position: "relative", zIndex: 1 }}>

        {/* Media type + search bar (shown on rate + recs tab) */}
        {(tab === "rate" || tab === "recs") && (
          <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap", alignItems: "center" }}>
            {MEDIA_TABS.map(t => (
              <button key={t.k} onClick={() => setMediaFilter(t.k)} style={{
                padding: "7px 16px", borderRadius: 10, fontFamily: "inherit",
                border: `1px solid ${mediaFilter === t.k ? "#f5c51866" : "rgba(255,255,255,0.07)"}`,
                background: mediaFilter === t.k ? "rgba(245,197,24,0.12)" : "rgba(255,255,255,0.03)",
                color: mediaFilter === t.k ? "#f5c518" : "#555",
                fontSize: 12, fontWeight: 600, cursor: "pointer",
              }}>{t.label}</button>
            ))}
            {tab === "rate" && (
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search title or genre..."
                style={{
                  marginLeft: "auto", width: 240,
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 10, padding: "8px 14px", color: "#eee", fontSize: 13, outline: "none", fontFamily: "inherit",
                }} />
            )}
          </div>
        )}

        {/* ── RATE TAB ── */}
        {tab === "rate" && (
          <>
            {/* Genre chips */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 10, color: "#444", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>
                Favourite Genres
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {ALL_GENRES.map(g => (
                  <button key={g} onClick={() => toggleGenre(g)} style={{
                    padding: "5px 13px", borderRadius: 99, fontFamily: "inherit",
                    border: `1px solid ${likedGenres.includes(g) ? "#69f0ae66" : "rgba(255,255,255,0.08)"}`,
                    background: likedGenres.includes(g) ? "rgba(105,240,174,0.12)" : "rgba(255,255,255,0.03)",
                    color: likedGenres.includes(g) ? "#69f0ae" : "#666",
                    fontSize: 11, fontWeight: likedGenres.includes(g) ? 700 : 400, cursor: "pointer",
                  }}>{g}</button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
              {filtered.map((item, i) => (
                <div key={item.id} className="card-in" style={{ animationDelay: `${Math.min(i * 0.04, 0.6)}s` }}>
                  <ItemCard item={item} userRating={userRatings.find(r => r.id === item.id)?.rating} onRate={r => rate(item.id, r)} />
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── RECS TAB ── */}
        {tab === "recs" && (
          <>
            {/* Algorithm toggle */}
            <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
              {[
                { k: "content", label: "Content-Based", sub: "Genre similarity" },
                { k: "collab",  label: "Collaborative",  sub: "Similar viewers" },
              ].map(a => (
                <button key={a.k} onClick={() => setRecAlgo(a.k)} style={{
                  padding: "10px 18px", borderRadius: 12, fontFamily: "inherit", textAlign: "left",
                  border: `1px solid ${recAlgo === a.k ? "#4fc3f788" : "rgba(255,255,255,0.07)"}`,
                  background: recAlgo === a.k ? "rgba(79,195,247,0.1)" : "rgba(255,255,255,0.03)",
                  color: recAlgo === a.k ? "#4fc3f7" : "#555", cursor: "pointer",
                }}>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{a.label}</div>
                  <div style={{ fontSize: 10, opacity: 0.6, marginTop: 2 }}>{a.sub}</div>
                </button>
              ))}
            </div>

            {ratedCount === 0 && likedGenres.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 20px", color: "#333" }}>
                <div style={{ fontSize: 52, marginBottom: 16 }}>🎬</div>
                <div style={{ fontSize: 16, marginBottom: 8, color: "#555" }}>Nothing to go on yet</div>
                <div style={{ fontSize: 13 }}>Rate some titles or pick genres to unlock recommendations</div>
              </div>
            ) : recs.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "#444", fontSize: 13 }}>
                {recAlgo === "collab" ? "Rate at least 2 titles for collaborative filtering to kick in" : "Try selecting different genres or rating more titles"}
              </div>
            ) : (
              <>
                <div style={{ fontSize: 11, color: "#444", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
                  {recs.length} recommendations · {mediaFilter === "all" ? "Movies + Series" : mediaFilter === "movie" ? "Movies only" : "Series only"}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
                  {recs.map((item, i) => (
                    <div key={item.id} className="card-in" style={{ animationDelay: `${i * 0.06}s` }}>
                      <ItemCard item={item} showScore />
                    </div>
                  ))}
                </div>

                {/* Algorithm explainer */}
                <div style={{
                  marginTop: 36, padding: "22px 26px",
                  background: "rgba(255,255,255,0.025)", backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.06)", borderRadius: 18,
                }}>
                  <div style={{ fontSize: 10, color: "#444", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 12 }}>
                    Algorithm · {recAlgo === "content" ? "Content-Based Filtering" : "Collaborative Filtering"}
                  </div>
                  <div style={{ fontSize: 13, color: "#666", lineHeight: 1.75 }}>
                    {recAlgo === "content" ? (
                      <><strong style={{ color: "#aaa" }}>How it works:</strong> Builds a genre preference vector from your star ratings and manually selected genres. Uses <strong style={{ color: "#aaa" }}>cosine similarity</strong> to score every unrated title by how well its genre profile aligns with your taste vector. Titles with higher overlap score higher match percentages.</>
                    ) : (
                      <><strong style={{ color: "#aaa" }}>How it works:</strong> Compares your ratings with those of 7 synthetic user profiles using <strong style={{ color: "#aaa" }}>user-user cosine similarity</strong>. Identifies your 3 closest neighbors and aggregates their weighted preferences — surfacing titles they loved that you haven't rated yet.</>
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {/* ── CHAT TAB ── */}
        {tab === "chat" && (
          <AIChat userRatings={userRatings} recs={allRecs} />
        )}
      </div>
    </div>
  );
}
