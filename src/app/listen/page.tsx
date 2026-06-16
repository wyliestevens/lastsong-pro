"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import PhotoReel from "@/components/PhotoReel";

const listenPhotos = [
  { src: "/images/listen_nature_01.jpeg", alt: "Fall aspens with mountain backdrop", w: 2600, h: 1463, fit: "contain" as const },
  { src: "/images/listen_nature_06.jpeg", alt: "Elk standing in snowy woods", w: 1950, h: 2600, fit: "contain" as const },
  { src: "/images/listen_royal_gorge.jpeg", alt: "Royal Gorge suspension bridge over canyon", w: 2600, h: 1463, fit: "contain" as const },
  { src: "/images/listen_nature_03.jpeg", alt: "Turquoise ocean waves on beach", w: 2600, h: 1950, fit: "contain" as const },
  { src: "/images/listen_nature_10.jpeg", alt: "Yellow rose close-up", w: 1950, h: 2600, fit: "contain" as const },
  { src: "/images/listen_chipmunk.jpeg", alt: "Chipmunk on a rock", w: 2600, h: 1463, fit: "contain" as const },
  { src: "/images/listen_nature_05.jpeg", alt: "Alpine lake with sun sparkle", w: 2600, h: 1950, fit: "contain" as const },
  { src: "/images/listen_nature_13.jpeg", alt: "Two young fawns", w: 1973, h: 2432, fit: "contain" as const },
  { src: "/images/listen_pink_wildflowers.jpeg", alt: "Pink wildflowers between rocks", w: 1463, h: 2600, fit: "contain" as const },
  { src: "/images/listen_nature_12.jpeg", alt: "River winding through pine valley", w: 1463, h: 2600, fit: "contain" as const },
  { src: "/images/listen_sunset.jpeg", alt: "Pink sunset over mountains", w: 2600, h: 1950, fit: "contain" as const },
  { src: "/images/listen_nature_09.jpeg", alt: "Mountain goats on rocky slope", w: 2600, h: 1950, fit: "contain" as const },
  { src: "/images/listen_orange_flower.jpeg", alt: "Orange flower in bloom", w: 3024, h: 4032, fit: "contain" as const },
  { src: "/images/listen_nature_11.jpeg", alt: "Snow-capped mountain range", w: 2600, h: 1463, fit: "contain" as const },
  { src: "/images/listen_fisherman.jpeg", alt: "Fisherman in a mountain river", w: 1463, h: 2600, fit: "contain" as const },
  { src: "/images/listen_nature_08.jpeg", alt: "Red fox near aspen trees", w: 1626, h: 1514, fit: "contain" as const },
  { src: "/images/listen_nature_02.jpeg", alt: "Sunset ocean with surfers", w: 2600, h: 1463, fit: "contain" as const },
  { src: "/images/listen_nature_07.jpeg", alt: "Green aspen-lined trail", w: 1950, h: 2600, fit: "contain" as const },
  { src: "/images/listen_nature_04.jpeg", alt: "Mule deer buck", w: 1463, h: 2600, fit: "contain" as const },
  { src: "/images/listen_mountain_lake.jpeg", alt: "New Mexico mountain lake landscape", w: 1727, h: 1330, fit: "contain" as const },
  { src: "/images/listen_white_flower.jpeg", alt: "White plumeria flowers", w: 3024, h: 4032, fit: "contain" as const },
  { src: "/images/listen_nature_14.jpeg", alt: "Rocky mountain river rapids", w: 1463, h: 2600, fit: "contain" as const },
  { src: "/images/listen_mark_cactus.jpeg", alt: "Mark beside a tall cactus", w: 841, h: 1393, fit: "contain" as const },
  { src: "/images/listen_rock_tunnel.jpeg", alt: "Sunlit rock tunnel", w: 1600, h: 901, fit: "contain" as const },
  { src: "/images/listen_ocean_wave.jpeg", alt: "Crashing ocean wave", w: 1600, h: 1200, fit: "contain" as const },
  { src: "/images/listen_aspen_forest.jpeg", alt: "Aspen forest in fall colors", w: 1200, h: 1600, fit: "contain" as const },
  { src: "/images/listen_bryce_canyon.jpeg", alt: "Bryce Canyon, Utah", w: 1600, h: 1033, fit: "contain" as const },
];
type Track = {
  title: string;
  artist: string;
  src: string;
  endTime?: number;
};

const tracks: Track[] = [
  {
    title: "Something About That Name",
    artist: "Last Song",
    src: "/audio/Something_about_that_Name_MASTER.m4a",
  },
  {
    title: "The Middle Man",
    artist: "Last Song",
    src: "/audio/The_Middle_Man_Wylie_Dawna_Master.m4a",
  },
  {
    title: "Goodness of God",
    artist: "Last Song",
    src: "/audio/Goodness_of_God_PUBLISH_3.m4a",
    endTime: 94,
  },
  {
    title: "Via Dolorosa",
    artist: "Last Song",
    src: "/audio/Via_Dolorosa_Wylie_Dawna.m4a",
  },
  {
    title: "I Bowed on My Knees",
    artist: "Last Song",
    src: "/audio/I_Bowed_on_My_Knees_Wylie_MASTER_3.m4a",
  },
  {
    title: "All My Tears",
    artist: "Last Song",
    src: "/audio/All_My_Tears_Wylie_Dawna_PUBLISH_3.m4a",
    endTime: 86,
  },
  {
    title: "In the Sanctuary",
    artist: "Last Song",
    src: "/audio/In_The_Sanctuary_Wylie_Dawna_MASTER.m4a",
    endTime: 108,
  },
  {
    title: "Do You Know My Jesus?",
    artist: "Last Song",
    src: "/audio/Do_You_Know_My_Jesus_PUBLISH_2.m4a",
    endTime: 64,
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

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTrack(null);
      setCurrentTime(0);
      setDuration(0);
    };

    const updateTime = () => {
      const endTime =
        currentTrack !== null ? tracks[currentTrack].endTime : undefined;
      if (endTime !== undefined && audio.currentTime >= endTime) {
        audio.pause();
        audio.currentTime = 0;
        handleEnded();
        return;
      }
      setCurrentTime(audio.currentTime);
    };
    const updateDuration = () => {
      const endTime =
        currentTrack !== null ? tracks[currentTrack].endTime : undefined;
      setDuration(
        endTime !== undefined ? Math.min(endTime, audio.duration) : audio.duration,
      );
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
        className="hero-section"
        style={{
          position: "relative",
          height: "85vh",
          minHeight: "500px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
              "linear-gradient(to bottom, rgba(15,13,10,0.15) 0%, rgba(15,13,10,0.3) 50%, rgba(15,13,10,0.85) 100%)",
          }}
        />
        <div
          className="hero-text-mobile"
          style={{
            position: "absolute",
            top: "15%",
            right: "15%",
            zIndex: 2,
            textAlign: "center",
            padding: "0",
            maxWidth: "600px",
          }}
        >
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3rem, 6vw, 5rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              color: "#ffffff",
              marginBottom: "8px",
              textShadow: "0 2px 8px rgba(0,0,0,0.8), 0 0px 20px rgba(0,0,0,0.5)",
            }}
          >
            Listen Now
          </h1>
          <p
            style={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: "clamp(1rem, 2.2vw, 1.4rem)",
              fontWeight: 600,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#ffffff",
              textShadow: "0 2px 8px rgba(0,0,0,0.8), 0 0px 20px rgba(0,0,0,0.5)",
            }}
          >
            Our Music
          </p>
        </div>
      </section>

      {/* Scripture */}
      <section
        style={{
          background: "var(--color-bg-warm)",
          padding: "16px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.4rem",
              fontStyle: "italic",
              color: "var(--color-cream)",
              lineHeight: 1.7,
              marginBottom: "16px",
            }}
          >
            &ldquo;Sing to Him, sing psalms to Him; talk of His wondrous works!&rdquo;
          </p>
          <p
            style={{
              color: "var(--color-amber)",
              fontSize: "0.95rem",
              fontWeight: 500,
            }}
          >
            1 Chronicles 16:9
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
      <section className="section-spacing" style={{ paddingTop: "20px", paddingBottom: "0" }}>
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "0 24px 24px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.1rem, 2.4vw, 2rem)",
              fontWeight: 400,
              color: "var(--color-cream)",
              lineHeight: 1.2,
              margin: 0,
              textAlign: "center",
              whiteSpace: "nowrap",
            }}
          >
            Songs From Our Project, &ldquo;In the Beginning&rdquo;
          </h2>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(0.9rem, 1.8vw, 1.3rem)",
              fontStyle: "italic",
              fontWeight: 500,
              color: "var(--color-amber)",
              margin: "6px 0 0",
              textAlign: "center",
            }}
          >
            Coming Soon!
          </p>
        </div>
        <div
          className="grid-2-col"
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "0 24px",
            gap: "0 24px",
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
                borderBottom: "1px solid var(--color-divider)",
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

      {/* Photo Reel */}
      <PhotoReel photos={listenPhotos} />

      {/* Video Section */}
      <section
        className="section-spacing"
        style={{
          background: "var(--color-bg-deep)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 400,
              color: "var(--color-cream)",
              lineHeight: 1.2,
              marginBottom: "32px",
            }}
          >
            See Us in Worship
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {/* Landscape video: Central SDA */}
            <div>
              <div
                style={{
                  position: "relative",
                  borderRadius: "8px",
                  overflow: "hidden",
                  aspectRatio: "16/9",
                  background: "#000",
                }}
              >
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster="/images/posters/heaven-came-down.jpg"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                >
                  <source src="/videos/heaven-came-down.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.05rem",
                  fontStyle: "italic",
                  color: "var(--color-cream-muted)",
                  margin: "6px 0 0",
                  textAlign: "center",
                }}
              >
                Heaven Came Down
              </p>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.05rem",
                  fontStyle: "italic",
                  color: "var(--color-cream-muted)",
                  margin: "2px 0 0",
                  textAlign: "center",
                }}
              >
                Central SDA Church, Oklahoma City, OK
              </p>
            </div>

            {/* Two portrait videos from The Gardens, side by side */}
            <div>
              <div className="gardens-video-row">
                {[
                  {
                    src: "/videos/gardens-care-center-kingman.mp4",
                    poster: "/images/posters/gardens-care-center-kingman.jpg",
                    caption: "Burdens Are Lifted",
                  },
                  {
                    src: "/videos/amazing-grace-gardens.mp4",
                    poster: "/images/posters/amazing-grace-gardens.jpg",
                    caption: "Amazing Grace",
                  },
                ].map((video, i) => (
                  <div key={i} className="gardens-video-item">
                    <div
                      style={{
                        position: "relative",
                        borderRadius: "8px",
                        overflow: "hidden",
                        aspectRatio: "9/16",
                        background: "#000",
                        width: "100%",
                      }}
                    >
                      <video
                        controls
                        playsInline
                        preload="metadata"
                        poster={video.poster}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      >
                        <source src={video.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.05rem",
                        fontStyle: "italic",
                        color: "var(--color-cream-muted)",
                        margin: "6px 0 0",
                        textAlign: "center",
                      }}
                    >
                      {video.caption}
                    </p>
                  </div>
                ))}
              </div>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.05rem",
                  fontStyle: "italic",
                  color: "var(--color-cream-muted)",
                  margin: "2px 0 0",
                  textAlign: "center",
                }}
              >
                The Gardens, Kingman, AZ
              </p>
            </div>

            {/* Mary Did You Know */}
            <div>
              <div
                style={{
                  position: "relative",
                  borderRadius: "8px",
                  overflow: "hidden",
                  aspectRatio: "16/9",
                  background: "#000",
                }}
              >
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster="/images/posters/mary-did-you-know.jpg"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                >
                  <source src="/videos/mary-did-you-know.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.05rem",
                  fontStyle: "italic",
                  color: "var(--color-cream-muted)",
                  marginTop: "10px",
                  textAlign: "center",
                }}
              >
                Mary Did You Know?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner CTA */}
      <section
        className="section-spacing"
        style={{
          background: "var(--color-bg-warm)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ marginBottom: "24px" }}>
            <Image
              src="/images/hands.jpeg"
              alt="Hands clasped together in fellowship"
              width={1600}
              height={1017}
              style={{
                width: "100%",
                maxWidth: "270px",
                height: "auto",
                display: "block",
                margin: "0 auto",
                borderRadius: "8px",
                border: "1px solid rgba(212, 160, 65, 0.15)",
              }}
            />
          </div>
          <Link
            href="/support"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.8rem, 3.6vw, 2.52rem)",
              fontWeight: 400,
              color: "var(--color-amber)",
              lineHeight: 1.3,
              textDecoration: "none",
              borderBottom: "1px solid rgba(212, 160, 65, 0.4)",
              paddingBottom: "4px",
              transition: "border-color 0.3s ease",
            }}
          >
            Partner With Our Ministry
          </Link>
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

        .gardens-video-row {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: flex-start;
          gap: 24px;
          max-width: 640px;
          margin: 0 auto;
          width: 100%;
        }
        .gardens-video-item {
          flex: 1 1 0;
          max-width: 300px;
          min-width: 0;
        }
        @media (max-width: 640px) {
          .gardens-video-row {
            flex-direction: column;
            gap: 28px;
            max-width: 320px;
          }
          .gardens-video-item {
            max-width: 320px;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
