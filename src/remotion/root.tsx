import React from "react";
import { Composition } from "remotion";
import { postSchema, presetDimensions } from "../social/post-schema";
import { SocialVideo } from "./social-video";

const defaultPost = postSchema.parse({
  slug: "default-preview",
  accountId: "default-account",
  platform: "linkedin",
  format: "video-carousel",
  template: "authority-carousel",
  dimensions: presetDimensions.portrait,
  secondsPerSlide: 4,
  slides: [
    {
      eyebrow: "Preview",
      title: "HTML vira imagem. O mesmo conteúdo vira vídeo.",
      body: "Use props para renderizar posts reais a partir de um arquivo post.json.",
    },
  ],
});

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="SocialVideo"
      component={SocialVideo}
      durationInFrames={defaultPost.secondsPerSlide * defaultPost.fps}
      fps={defaultPost.fps}
      width={defaultPost.dimensions.width}
      height={defaultPost.dimensions.height}
      defaultProps={{ post: defaultPost, inputDir: "" }}
      calculateMetadata={({ props }) => {
        const post = postSchema.parse(props.post);
        return {
          durationInFrames: Math.ceil(
            post.slides.length * post.secondsPerSlide * post.fps,
          ),
          fps: post.fps,
          width: post.dimensions.width,
          height: post.dimensions.height,
          props: { post, inputDir: props.inputDir },
        };
      }}
    />
  );
};
