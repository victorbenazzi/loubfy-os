import { z } from "zod";

export const platformSchema = z.enum([
  "linkedin",
  "instagram",
  "tiktok",
  "youtube",
  "x-twitter",
  "threads",
  "facebook",
]);

export const accountIdSchema = z
  .string()
  .min(2)
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "accountId must be kebab-case, for example: instagram-institucional",
  );

export const formatSchema = z.enum([
  "single-image",
  "static-carousel",
  "video-carousel",
  "hybrid-carousel",
  "video",
]);

export const dimensionsSchema = z.object({
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

export const presetDimensions = {
  square: { width: 1080, height: 1080 },
  portrait: { width: 1080, height: 1350 },
  verticalVideo: { width: 1080, height: 1920 },
  horizontal: { width: 1200, height: 630 },
  youtubeThumbnail: { width: 1280, height: 720 },
} as const;

export const sourcePermissionSchema = z.enum([
  "owned",
  "licensed",
  "permission-granted",
  "public-domain",
  "embed-only",
  "unknown",
]);

const sourceSchema = z.object({
  originUrl: z.string().url().optional(),
  creator: z.string().optional(),
  platform: z.string().optional(),
  permission: sourcePermissionSchema,
  licenseNote: z.string().min(1),
  collectedAt: z.string().optional(),
  credit: z.string().optional(),
});

const mediaSchema = z.object({
  type: z.enum(["image", "video"]),
  src: z.string().min(1),
  poster: z.string().optional(),
  alt: z.string().optional(),
  fit: z.enum(["cover", "contain"]).default("cover"),
  startAtSeconds: z.number().min(0).optional(),
  endAtSeconds: z.number().positive().optional(),
  muted: z.boolean().default(true),
  source: sourceSchema,
});

export const slideSchema = z.object({
  layout: z
    .enum([
      "default",
      "ig-cover-overlay",
      "ig-comparison-split",
      "ig-editorial-media",
      "ig-photo-essay",
    ])
    .default("default"),
  eyebrow: z.string().optional(),
  title: z.string().min(1),
  body: z.string().optional(),
  bullets: z.array(z.string()).default([]),
  cta: z.string().optional(),
  media: mediaSchema.optional(),
  comparison: z
    .object({
      left: z.object({
        eyebrow: z.string().optional(),
        title: z.string().min(1),
        subtitle: z.string().optional(),
        body: z.string().optional(),
        badge: z.string().optional(),
        bullets: z.array(z.string()).default([]),
      }),
      right: z.object({
        eyebrow: z.string().optional(),
        title: z.string().min(1),
        subtitle: z.string().optional(),
        body: z.string().optional(),
        badge: z.string().optional(),
        bullets: z.array(z.string()).default([]),
      }),
      verdict: z.string().optional(),
    })
    .optional(),
  accent: z.string().optional(),
});

const defaultBrand = {
  name: "Loubfy OS",
  primary: "#050505",
  secondary: "#FFFFFF",
  accent: "#FFFFFF",
  background: "#FFFFFF",
  surface: "#F4F4F4",
  text: "#050505",
  muted: "#5C5C5C",
  fontFamily: "Inter, Arial, sans-serif",
};

const brandSchema = z.object({
  name: z.string().default(defaultBrand.name),
  primary: z.string().default(defaultBrand.primary),
  secondary: z.string().default(defaultBrand.secondary),
  accent: z.string().default(defaultBrand.accent),
  background: z.string().default(defaultBrand.background),
  surface: z.string().default(defaultBrand.surface),
  text: z.string().default(defaultBrand.text),
  muted: z.string().default(defaultBrand.muted),
  fontFamily: z.string().default(defaultBrand.fontFamily),
});

export const postSchema = z.object({
  slug: z.string().min(1),
  accountId: accountIdSchema,
  platform: platformSchema,
  format: formatSchema,
  template: z.enum([
    "authority-card",
    "authority-carousel",
    "checklist-carousel",
    "instagram-comparison",
    "instagram-editorial",
    "video-briefing",
  ]),
  dimensions: dimensionsSchema,
  fps: z.number().int().positive().default(30),
  secondsPerSlide: z.number().positive().default(4),
  brand: brandSchema.default(defaultBrand),
  slides: z.array(slideSchema).min(1),
  caption: z.string().optional(),
  outputDir: z.string().optional(),
});

export type PostSpec = z.infer<typeof postSchema>;
export type SlideSpec = z.infer<typeof slideSchema>;
export type MediaSpec = z.infer<typeof mediaSchema>;
