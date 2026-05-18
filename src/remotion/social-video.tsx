import React from "react";
import { Video } from "@remotion/media";
import {
  AbsoluteFill,
  Img,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { MediaSpec, PostSpec, SlideSpec } from "../social/post-schema";

const localAsset = (inputDir: string, src: string) => {
  if (/^https?:\/\//i.test(src)) {
    return src;
  }

  return staticFile(src.startsWith("/") ? src.slice(1) : src);
};

const Media: React.FC<{ media?: MediaSpec; inputDir: string }> = ({
  media,
  inputDir,
}) => {
  const { fps } = useVideoConfig();

  if (!media) {
    return null;
  }

  const commonStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: media.fit,
  };

  if (media.type === "video") {
    return (
      <Video
        src={localAsset(inputDir, media.src)}
        muted={media.muted}
        trimBefore={
          media.startAtSeconds === undefined
            ? undefined
            : Math.round(media.startAtSeconds * fps)
        }
        trimAfter={
          media.endAtSeconds === undefined
            ? undefined
            : Math.round(media.endAtSeconds * fps)
        }
        style={commonStyle}
      />
    );
  }

  return <Img src={localAsset(inputDir, media.src)} style={commonStyle} />;
};

const Slide: React.FC<{
  post: PostSpec;
  slide: SlideSpec;
  index: number;
  inputDir: string;
}> = ({ post, slide, index, inputDir }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const y = interpolate(frame, [0, fps], [26, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(frame, [0, fps * 0.55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const hasMedia = Boolean(slide.media);

  return (
    <AbsoluteFill
      style={{
        background: post.brand.background,
        fontFamily: post.brand.fontFamily,
        color: post.brand.text,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 54,
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
          gap: 28,
        }}
      >
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 26,
            color: post.brand.muted,
          }}
        >
          <strong style={{ color: post.brand.text }}>{post.brand.name}</strong>
          <span>
            {post.platform} / {post.accountId} /{" "}
            {String(index + 1).padStart(2, "0")}
          </span>
        </header>

        <main
          style={{
            display: "grid",
            gridTemplateColumns: hasMedia ? "1.05fr 0.95fr" : "1fr",
            gap: 36,
            alignItems: "stretch",
            transform: `translateY(${y}px)`,
            opacity,
          }}
        >
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              minWidth: 0,
            }}
          >
            {slide.eyebrow ? (
              <div
                style={{
                  color: post.brand.secondary,
                  fontSize: 28,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  marginBottom: 24,
                }}
              >
                {slide.eyebrow}
              </div>
            ) : null}
            <h1
              style={{
                margin: 0,
                fontSize: post.dimensions.height > 1500 ? 86 : 76,
                lineHeight: 0.95,
                letterSpacing: 0,
              }}
            >
              {slide.title}
            </h1>
            {slide.body ? (
              <p
                style={{
                  marginTop: 28,
                  marginBottom: 0,
                  color: post.brand.muted,
                  fontSize: 34,
                  lineHeight: 1.18,
                }}
              >
                {slide.body}
              </p>
            ) : null}
            {slide.bullets.length > 0 ? (
              <div style={{ display: "grid", gap: 18, marginTop: 34 }}>
                {slide.bullets.map((bullet) => (
                  <div
                    key={bullet}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "30px 1fr",
                      gap: 16,
                      fontSize: 31,
                      lineHeight: 1.15,
                    }}
                  >
                    <span
                      style={{
                        width: 18,
                        height: 18,
                        marginTop: 8,
                        borderRadius: 999,
                        background: post.brand.accent,
                      }}
                    />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </section>

          {slide.media ? (
            <aside
              style={{
                overflow: "hidden",
                borderRadius: 8,
                border: "2px solid rgba(15, 23, 42, 0.10)",
                background: post.brand.surface,
              }}
            >
              <Media media={slide.media} inputDir={inputDir} />
            </aside>
          ) : null}
        </main>

        <footer
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: post.brand.muted,
            fontSize: 24,
          }}
        >
          <span>{post.template}</span>
          <span>{post.slug}</span>
        </footer>
      </div>
    </AbsoluteFill>
  );
};

export const SocialVideo: React.FC<{ post: PostSpec; inputDir: string }> = ({
  post,
  inputDir,
}) => {
  const framesPerSlide = Math.ceil(post.secondsPerSlide * post.fps);

  return (
    <AbsoluteFill>
      {post.slides.map((slide, index) => (
        <Sequence
          key={`${slide.title}-${index}`}
          from={index * framesPerSlide}
          durationInFrames={framesPerSlide}
        >
          <Slide post={post} slide={slide} index={index} inputDir={inputDir} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
