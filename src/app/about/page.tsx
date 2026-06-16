import Image from "next/image";
import Link from "next/link";
import PhotoReel from "@/components/PhotoReel";

export const metadata = {
  title: "About Us",
  description: "Learn about Wylie and Dawna Stevens, the husband and wife worship duo behind Last Song Ministry. 48 years of music, sharing the Gospel through song in Kingman, AZ.",
};

export default function AboutPage() {
  const reelPhotos = [
    { src: "/images/IMG_0986.jpeg", alt: "Wylie and Dawna at the Grand Canyon", w: 700, h: 840 },
    { src: "/images/1000000248.jpeg", alt: "Wylie playing guitar solo", w: 700, h: 840 },
    { src: "/images/beach_dog.jpeg", alt: "Wylie and his dog looking out at the ocean", w: 700, h: 840 },
    { src: "/images/reel_baby_john_jay.jpeg", alt: "Baby John and Jay", w: 1267, h: 1600, fit: "contain" as const },
    { src: "/images/reel_new_1.jpeg", alt: "Wylie and friend playing guitars together", w: 700, h: 840 },
    { src: "/images/reel_new_2.jpeg", alt: "Dawna hiking in the forest", w: 700, h: 840 },
    { src: "/images/reel_kayak.jpeg", alt: "Wylie kayak fishing on a mountain lake", w: 2600, h: 1463, fit: "contain" as const },
    { src: "/images/reel_poolside_brocks.jpeg", alt: "Poolside with the Brocks", w: 1600, h: 1120, fit: "contain" as const },
    { src: "/images/reel_wylie_dawna_western.jpeg", alt: "Wylie and Dawna in western hats", w: 1115, h: 1600, fit: "contain" as const },
    { src: "/images/reel_az_camp_mtg.jpeg", alt: "Wylie and Dawna at AZ Camp Meeting", w: 1586, h: 1600, fit: "contain" as const },
    { src: "/images/reel_dave_sylvia.jpeg", alt: "Dave and Sylvia", w: 1600, h: 846, fit: "contain" as const },
    { src: "/images/reel_new_7.jpeg", alt: "Prayer and fellowship at church", w: 700, h: 840 },
    { src: "/images/reel_new_8.jpeg", alt: "Dawna and Wylie leading worship together", w: 700, h: 840 },
    { src: "/images/reel_new_9.jpeg", alt: "Wylie and Dawna at the beach", w: 700, h: 840 },
    { src: "/images/reel_dawna_raquel.jpeg", alt: "Dawna and Raquel", w: 739, h: 1600, fit: "contain" as const },
    { src: "/images/reel_new_10.jpeg", alt: "Wylie with his faithful companion", w: 700, h: 840 },
    { src: "/images/reel_new_11.jpeg", alt: "Jaime Jorge concert event", w: 700, h: 840 },
  ];

  return (
    <div>
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
            About Last Song
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
            Our Story
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
            &ldquo;Speaking to one another in psalms and hymns and spiritual songs, singing and making melody in your heart to the Lord.&rdquo;
          </p>
          <p
            style={{
              color: "var(--color-amber)",
              fontSize: "0.95rem",
              fontWeight: 500,
            }}
          >
            Ephesians 5:19
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-spacing" style={{ paddingTop: "40px", paddingBottom: "0" }}>
        <div
          className="grid-2-col mobile-gap-sm"
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 24px",
            gap: "60px",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                position: "relative",
                borderRadius: "8px",
              }}
            >
              <Image
                src="/images/IMG_5781_full.jpeg"
                alt="Wylie and Dawna singing at microphones"
                width={800}
                height={1276}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: "8px",
                }}
              />
            </div>
          </div>

          <div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "2.2rem",
                fontWeight: 400,
                color: "var(--color-cream)",
                lineHeight: 1.3,
                marginBottom: "24px",
                textAlign: "center",
              }}
            >
              Our Story
            </h2>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "1rem",
                lineHeight: 1.9,
                marginBottom: "24px",
              }}
            >
              Wylie&apos;s journey in music began 48 years ago, as a tender four-year old singing next to his father in a bluegrass band made up of friends who played together every Friday night. At age fourteen, he committed to serving as a music minister, first in the church he grew up in, and later in several other churches in northeast Texas and southern Arkansas. In his desire to share the gospel through song, he became the lead singer of the gospel group, Southern Grace Quartet, in 2001, and they toured the four-state area of Texas, Arkansas, Oklahoma, and Louisiana.
            </p>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "1rem",
                lineHeight: 1.9,
                marginBottom: "24px",
              }}
            >
              Dawna&apos;s early singing experience was little more than a &ldquo;hairbrush microphone&rdquo; singing with popular songs as a young girl and later in church choirs. After several years of Wylie trying to convince her to sing with him, Dawna finally joined him eight years ago, and together they formed the dynamic duo, &ldquo;Last Song&rdquo;, blending their voices with guitar to create a powerful music ministry. Singing has become such an integral part of her life now that she can&apos;t imagine not singing!
            </p>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "1rem",
                lineHeight: 1.9,
                marginBottom: "24px",
              }}
            >
              Through diligent study of the scriptures, mainly the prophecies of Daniel and Revelation, Wylie and Dawna embraced the truths they discovered, which led them to the Seventh Day Adventist church in 2010 (<a
                href="https://lastgen.net/articles/the-dvd-that-walked/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--color-amber)",
                  textDecoration: "underline",
                  fontWeight: 600,
                }}
              >Our Testimony</a>). Hungering to know Jesus, they made a vow to always follow the Lamb wherever He goes. Wylie currently serves as an Elder and Dawna as Music Leader at the Needles, CA Seventh-day Adventist church, just across the AZ border.
            </p>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "1rem",
                lineHeight: 1.9,
                marginBottom: "24px",
              }}
            >
              Wylie has had a 20-year career as a bachelor-level registered nurse and is a veteran of the US Air Force. He is transitioning out of healthcare into an entrepreneurial venture, <a href="https://www.aipeakbiz.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-amber)", textDecoration: "underline" }}>AI Peak Biz</a>, where he provides AI systems to help businesses enter the new world of AI. Dawna is a licensed clinical social worker with a long career practicing individual, group, and family therapy. They have been married 23 years, have 3 adult children, and 6 grandchildren.
            </p>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "1rem",
                lineHeight: 1.9,
                marginBottom: "24px",
              }}
            >
              Sharing Christ in song as a couple is one of their greatest joys. Through soulful harmonies and heartfelt lyrics, they love to tell the story of the great exchange made by Jesus on the cross, our sin for His righteousness, encouraging listeners to watch, pray, and serve to be ready for Christ&apos;s glorious return.
            </p>
          </div>
        </div>
      </section>

      {/* Photo Reel */}
      <PhotoReel photos={reelPhotos} />

      {/* Partner CTA */}
      <section
        className="section-spacing"
        style={{
          background: "var(--color-bg-warm)",
          textAlign: "center",
          paddingTop: "144px",
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
    </div>
  );
}
