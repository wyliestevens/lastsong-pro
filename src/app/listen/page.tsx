"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const tracks = [
  {
    title: "Something About That Name",
    artist: "Wylie & Dawna",
    src: "/audio/Something_about_that_Name_MASTER.m4a",
  },
  {
    title: "The Middle Man",
    artist: "Wylie & Dawna",
    src: "/audio/The_Middle_Man_Wylie_Dawna_Master.m4a",
  },
  {
    title: "Goodness of God",
    artist: "Wylie & Dawna",
    src: "/audio/Goodness_of_God_Wylie_Dawna_2.m4a",
  },
  {
    title: "Via Dolorosa",
    artist: "Wylie & Dawna",
    src: "/audio/Via_Dolorosa_Wylie_Dawna.m4a",
  },
  {
    title: "I Bowed on My Knees",
    artist: "Wylie Stevens",
    src: "/audio/I_Bowed_on_My_Knees_Wylie_MASTER_3.m4a",
  },
  {
    title: "All My Tears",
    artist: "Wylie & Dawna",
    src: "/audio/All_My_Tears_Wylie_Dawna_RP_MASTERED.m4a",
  },
];

function formatTime(seconds: number) {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function ListenPage() {
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      if (currentTrack !== null && currentTrack < tracks.length - 1) {
        playTrack(currentTrack + 1);
      }
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentTrack]);

  const playTrack = (index: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentTrack === index) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    } else {
      setCurrentTrack(index);
      audio.src = tracks[index].src;
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * duration;
  };

  return (
    <div>
      <audio ref={audioRef} preload="metadata" />

      {/* Hero with Background Image */}
      <section
        style={{
          position: "relative",
          paddingTop: "160px",
          paddingBottom: "80px",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <Image
          src="/images/guitar_treeImage.jpeg"
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "center top" }}
          priority
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(15,13,10,0.15) 0%, rgba(15,13,10,0.35) 50%, rgba(15,13,10,0.85) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "800px",
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <p
            style={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "var(--color-amber)",
              marginBottom: "16px",
              textShadow: "0 2px 8px rgba(0,0,0,0.6)",
            }}
          >
            Our Music
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 300,
              color: "var(--color-cream)",
              lineHeight: 1.2,
              marginBottom: "24px",
              textShadow: "0 2px 12px rgba(0,0,0,0.6)",
            }}
          >
            Listen Now
          </h1>
          <div
            style={{
              width: "60px",
              height: "1px",
              background: "var(--color-amber)",
              margin: "0 auto 24px",
            }}
          />
          <p
            style={{
              color: "var(--color-cream-muted)",
              fontSize: "1rem",
              lineHeight: 1.8,
            }}
          >
            Recordings from our worship sessions and ministry events.
          </p>
        </div>
      </section>

      {/* Now Playing */}
      {currentTrack !== null && (
        <section style={{ padding: "0 24px 40px" }}>
          <div
            style={{
              maxWidth: "700px",
              margin: "0 auto",
              background: "var(--color-bg-card)",
              borderRadius: "12px",
              padding: "32px",
              border: "1px solid rgba(212, 160, 65, 0.2)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "8px",
                  overflow: "hidden",
                  flexShrink: 0,
                  position: "relative",
                }}
              >
                <Image
                  src="/images/5M5A7503.jpeg"
                  alt="Album art"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontFamily: "'Quicksand', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "var(--color-amber)",
                    marginBottom: "4px",
                  }}
                >
                  Now Playing
                </p>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.5rem",
                    fontWeight: 500,
                    color: "var(--color-cream)",
                    marginBottom: "4px",
                  }}
                >
                  {tracks[currentTrack].title}
                </h3>
                <p
                  style={{
                    color: "var(--color-cream-muted)",
                    fontSize: "0.9rem",
                  }}
                >
                  {tracks[currentTrack].artist}
                </p>
              </div>

              {/* Play/Pause */}
              <button
                onClick={() => playTrack(currentTrack)}
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--color-amber), #c4922e)",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(212, 160, 65, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {isPlaying ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="var(--color-bg-deep)"
                  >
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="var(--color-bg-deep)"
                  >
                    <polygon points="8,5 19,12 8,19" />
                  </svg>
                )}
              </button>
            </div>

            {/* Progress Bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span
                style={{
                  color: "var(--color-cream-muted)",
                  fontSize: "0.75rem",
                  minWidth: "36px",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {formatTime(currentTime)}
              </span>
              <div
                onClick={handleSeek}
                style={{
                  flex: 1,
                  height: "6px",
                  background: "rgba(212, 160, 65, 0.15)",
                  borderRadius: "3px",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: duration
                      ? `${(currentTime / duration) * 100}%`
                      : "0%",
                    height: "100%",
                    background:
                      "linear-gradient(90deg, var(--color-amber), var(--color-amber-light))",
                    borderRadius: "3px",
                    transition: "width 0.1s linear",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      right: "-5px",
                      top: "-4px",
                      width: "14px",
                      height: "14px",
                      borderRadius: "50%",
                      background: "var(--color-amber-light)",
                      boxShadow: "0 0 8px rgba(212, 160, 65, 0.5)",
                    }}
                  />
                </div>
              </div>
              <span
                style={{
                  color: "var(--color-cream-muted)",
                  fontSize: "0.75rem",
                  minWidth: "36px",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {formatTime(duration)}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Track List */}
      <section className="section-spacing" style={{ paddingTop: "20px" }}>
        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          {tracks.map((track, i) => (
            <div
              key={i}
              onClick={() => playTrack(i)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                padding: "20px 24px",
                background:
                  currentTrack === i
                    ? "rgba(212, 160, 65, 0.08)"
                    : "transparent",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                borderBottom:
                  i < tracks.length - 1
                    ? "1px solid var(--color-divider)"
                    : "none",
              }}
              onMouseEnter={(e) => {
                if (currentTrack !== i) {
                  e.currentTarget.style.background = "rgba(212, 160, 65, 0.04)";
                }
              }}
              onMouseLeave={(e) => {
                if (currentTrack !== i) {
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              {/* Track number / Play icon */}
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background:
                    currentTrack === i && isPlaying
                      ? "linear-gradient(135deg, var(--color-amber), #c4922e)"
                      : "rgba(212, 160, 65, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  border:
                    currentTrack === i
                      ? "1px solid var(--color-amber)"
                      : "1px solid rgba(212, 160, 65, 0.2)",
                }}
              >
                {currentTrack === i && isPlaying ? (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="var(--color-bg-deep)"
                  >
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill={
                      currentTrack === i
                        ? "var(--color-amber)"
                        : "var(--color-cream-muted)"
                    }
                  >
                    <polygon points="8,5 19,12 8,19" />
                  </svg>
                )}
              </div>

              {/* Track Info */}
              <div style={{ flex: 1 }}>
                <h4
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.2rem",
                    fontWeight: 500,
                    color:
                      currentTrack === i
                        ? "var(--color-amber)"
                        : "var(--color-cream)",
                    marginBottom: "2px",
                    transition: "color 0.3s ease",
                  }}
                >
                  {track.title}
                </h4>
                <p
                  style={{
                    color: "var(--color-cream-muted)",
                    fontSize: "0.85rem",
                  }}
                >
                  {track.artist}
                </p>
              </div>

              {/* Playing indicator */}
              {currentTrack === i && isPlaying && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "3px",
                    height: "20px",
                  }}
                >
                  {[1, 2, 3].map((bar) => (
                    <div
                      key={bar}
                      style={{
                        width: "3px",
                        background: "var(--color-amber)",
                        borderRadius: "2px",
                        animation: `equalizer 0.8s ease-in-out ${bar * 0.15}s infinite alternate`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Photos */}
      <section
        className="section-spacing"
        style={{ background: "var(--color-bg-warm)" }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 24px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
            alignItems: "start",
          }}
        >
          <div style={{ borderRadius: "8px", overflow: "hidden" }}>
            <Image
              src="/images/5M5A7532.jpeg"
              alt="Wylie and Dawna singing together"
              width={2595}
              height={3390}
              style={{ width: "100%", height: "auto", display: "block", borderRadius: "8px" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ borderRadius: "8px", overflow: "hidden" }}>
              <Image
                src="/images/IMG_0986.jpeg"
                alt="Wylie and Dawna at the Grand Canyon"
                width={4032}
                height={3024}
                style={{ width: "100%", height: "auto", display: "block", borderRadius: "8px" }}
              />
            </div>
            <div style={{ borderRadius: "8px", overflow: "hidden" }}>
              <Image
                src="/images/5M5A7508.jpeg"
                alt="Wylie and Dawna worship moment"
                width={600}
                height={800}
                style={{ width: "100%", height: "auto", display: "block", borderRadius: "8px" }}
              />
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes equalizer {
          0% {
            height: 4px;
          }
          100% {
            height: 18px;
          }
        }
      `}</style>
    </div>
  );
}
