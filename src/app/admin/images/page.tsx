import ImageLibrary from "./ImageLibrary";

export const metadata = { title: "Images", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default function ImagesPage() {
  return (
    <div>
      <h1
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "2rem",
          fontWeight: 500,
          color: "var(--color-cream)",
          marginBottom: "8px",
        }}
      >
        Image Library
      </h1>
      <p style={{ color: "var(--color-cream-muted)", marginBottom: "24px", maxWidth: "700px" }}>
        Upload new photos to use anywhere on the site. Existing images at /images/... aren&apos;t listed here — only fresh uploads.
      </p>
      <ImageLibrary />
    </div>
  );
}
