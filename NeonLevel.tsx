import { useState } from "react";
import { useNeonTheme, FONTS } from "@/lib/neon-theme";
import { COLOR_THEMES } from "@/lib/color-themes";
import { DEFAULT_CUSTOM_SHAPE, SHAPE_STYLES } from "@/lib/shapes";
import { ColorPicker } from "./ColorPicker";
import { ExpressiveControls } from "./ExpressiveControls";
import { Check, Moon, Shuffle, Sparkles, Sun, Trash2, X } from "lucide-react";

/** Shape (corner roundness) paired with each palette for a distinct feel. */
const SHAPES = [1.75, 2.25, 1.25, 2.5, 1.5, 3, 2, 1.1, 2.75, 1.9, 2.4, 1.35, 2.9, 1.6, 2.1, 1.45];

const PRESETS = COLOR_THEMES.map((t, i) => ({ ...t, shape: SHAPES[i % SHAPES.length]! }));

const randomHex = () =>
  `#${Array.from({ length: 3 }, () =>
    Math.floor(120 + Math.random() * 135)
      .toString(16)
      .padStart(2, "0"),
  ).join("")}`;

/** NeoUI 14 Lab — the hidden theming workshop unlocked by the clock easter egg. */
export function NeoLabView({ onClose }: { onClose: () => void }) {
  const theme = useNeonTheme();
  const [saveName, setSaveName] = useState("");

  const surprise = () => {
    const shapes = SHAPE_STYLES;
    theme.set({
      primary: randomHex(),
      secondary: randomHex(),
      tertiary: randomHex(),
      shape: Number((0.4 + Math.random() * 2.4).toFixed(2)),
      shapeStyle: shapes[Math.floor(Math.random() * shapes.length)]!.key,
      mode: Math.random() > 0.5 ? "dark" : "light",
    });
  };


  return (
    <div
      className="fixed inset-0 z-50 animate-bounce-in overflow-y-auto px-5 pb-16 pt-10"
      style={{ background: "var(--m3-surface)", color: "var(--m3-on-surface)" }}
    >
      <div className="mx-auto max-w-lg space-y-6 lg:max-w-3xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] opacity-60">NeoUI 14</p>
            <h1 className="flex items-center gap-2 text-3xl font-semibold">
              <Sparkles size={24} color="var(--m3-tertiary)" /> Theme Lab
            </h1>
          </div>
          <button
            onClick={onClose}
            aria-label="Close theme lab"
            className="bouncy-press rounded-full p-3"
            style={{ background: "var(--m3-surface-high)" }}
          >
            <X size={20} />
          </button>
        </div>

        <section className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] opacity-60">Presets</p>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
            {PRESETS.map((p, i) => (
              <button
                key={p.name}
                onClick={() =>
                  theme.set({
                    primary: p.primary,
                    secondary: p.secondary,
                    tertiary: p.tertiary,
                    mode: p.mode,
                    shape: p.shape,
                  })
                }
                className="bouncy-press animate-pop-in rounded-[calc(var(--m3-shape)*0.7)] p-4 text-left"
                style={{
                  background: "var(--m3-surface-high)",
                  animationDelay: `${i * 45}ms`,
                }}
              >
                <span className="flex gap-1">
                  {[p.primary, p.secondary, p.tertiary].map((c) => (
                    <span
                      key={c}
                      className="h-6 w-6 rounded-full"
                      style={{ background: c, border: "1px solid var(--m3-outline)" }}
                    />
                  ))}
                </span>
                <span className="mt-2 block text-sm font-medium">{p.name}</span>
                <span className="block text-xs opacity-60">{p.blurb}</span>
                <span className="block text-[10px] uppercase tracking-wider opacity-40">
                  {p.mode} mode
                </span>
              </button>
            ))}
          </div>
        </section>

        <button
          onClick={surprise}
          className="bouncy-press flex w-full items-center justify-center gap-2 rounded-full px-5 py-4 text-sm font-medium"
          style={{ background: "var(--m3-tertiary)", color: "var(--m3-on-tertiary)" }}
        >
          <Shuffle size={16} /> Surprise me
        </button>

        <section className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] opacity-60">Expressive shapes</p>
          <div className="grid grid-cols-3 gap-3 lg:grid-cols-5">
            {SHAPE_STYLES.map((s, i) => {
              const on = theme.shapeStyle === s.key;
              return (
                <button
                  key={s.key}
                  onClick={() => theme.set({ shapeStyle: s.key })}
                  className="bouncy-press animate-pop-in flex flex-col items-center gap-2 rounded-[calc(var(--m3-shape)*0.6)] p-3 text-center"
                  style={{
                    background: on ? "var(--m3-primary-container)" : "var(--m3-surface-high)",
                    animationDelay: `${i * 40}ms`,
                  }}
                >
                  <span
                    className="fun-shape flex h-10 w-10 items-center justify-center text-base"
                    style={{ background: "var(--m3-primary)", color: "var(--m3-on-primary)" }}
                  >
                    <s.Icon size={18} strokeWidth={1.8} />
                  </span>
                  <span className="text-xs font-medium leading-tight">{s.label}</span>
                  <span className="text-[10px] leading-tight opacity-60">{s.blurb}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] opacity-60">Shape studio</p>
          <div
            className="space-y-4 rounded-[calc(var(--m3-shape)*0.8)] p-5"
            style={{ background: "var(--m3-surface-high)" }}
          >
            <div className="flex items-center gap-4">
              <span
                className="h-20 w-20 shrink-0"
                style={{
                  background: "var(--m3-primary)",
                  borderRadius: `${theme.customShape.tl}% ${theme.customShape.tr}% ${theme.customShape.br}% ${theme.customShape.bl}%`,
                }}
              />
              <p className="text-xs leading-relaxed opacity-70">
                Drag each corner to build your own silhouette, then apply it everywhere.
              </p>
            </div>
            {(
              [
                ["tl", "Top left"],
                ["tr", "Top right"],
                ["br", "Bottom right"],
                ["bl", "Bottom left"],
              ] as const
            ).map(([k, label]) => (
              <div key={k}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{label}</span>
                  <span className="opacity-70">{theme.customShape[k]}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={50}
                  step={1}
                  value={theme.customShape[k]}
                  aria-label={`${label} roundness`}
                  onChange={(e) =>
                    theme.set({
                      customShape: { ...theme.customShape, [k]: Number(e.target.value) },
                      shapeStyle: "custom",
                    })
                  }
                  className="mt-1 w-full"
                  style={{ accentColor: "var(--m3-primary)" }}
                />
              </div>
            ))}
            <div className="flex gap-2">
              <button
                onClick={() => theme.set({ shapeStyle: "custom" })}
                className="bouncy-press flex-1 rounded-full px-4 py-3 text-sm font-medium"
                style={{ background: "var(--m3-primary)", color: "var(--m3-on-primary)" }}
              >
                Apply my shape
              </button>
              <button
                onClick={() => theme.set({ customShape: DEFAULT_CUSTOM_SHAPE })}
                className="bouncy-press rounded-full px-4 py-3 text-sm"
                style={{ background: "var(--m3-surface-highest)" }}
              >
                Reset
              </button>
            </div>
          </div>
        </section>


        <section className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] opacity-60">Saved appearances</p>
          <div
            className="flex gap-2 rounded-[calc(var(--m3-shape)*0.7)] p-3"
            style={{ background: "var(--m3-surface-high)" }}
          >
            <input
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              placeholder="Name this look"
              className="h-11 flex-1 rounded-full px-4 text-sm outline-none"
              style={{ background: "var(--m3-surface)", color: "var(--m3-on-surface)" }}
            />
            <button
              onClick={() => {
                theme.saveAppearance(saveName);
                setSaveName("");
              }}
              className="bouncy-press rounded-full px-5 text-sm font-medium"
              style={{ background: "var(--m3-primary)", color: "var(--m3-on-primary)" }}
            >
              Save
            </button>
          </div>
          {theme.savedThemes.length === 0 ? (
            <p className="text-xs opacity-60">
              Save the whole appearance — colors, shape, roundness and typeface — then re-apply it
              any time.
            </p>
          ) : (
            <div className="space-y-2">
              {theme.savedThemes.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center gap-3 rounded-[calc(var(--m3-shape)*0.6)] p-3"
                  style={{ background: "var(--m3-surface-high)" }}
                >
                  <span className="flex gap-1">
                    {[s.primary, s.secondary, s.tertiary].map((c) => (
                      <span
                        key={c}
                        className="h-6 w-6 rounded-full"
                        style={{ background: c, border: "1px solid var(--m3-outline)" }}
                      />
                    ))}
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-medium">{s.name}</span>
                    <span className="block text-[10px] uppercase tracking-wider opacity-50">
                      {s.mode} · {s.shapeStyle}
                    </span>
                  </span>
                  <button
                    onClick={() => theme.applyAppearance(s.id)}
                    className="bouncy-press rounded-full px-4 py-2 text-xs font-medium"
                    style={{ background: "var(--m3-primary)", color: "var(--m3-on-primary)" }}
                  >
                    Apply
                  </button>
                  <button
                    onClick={() => theme.deleteAppearance(s.id)}
                    aria-label={`Delete ${s.name}`}
                    className="bouncy-press rounded-full p-2"
                    style={{ background: "var(--m3-surface-highest)" }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>



        <section className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] opacity-60">Colors</p>
          <ColorPicker
            label="Primary"
            value={theme.primary}
            onChange={(v) => theme.set({ primary: v })}
          />
          <ColorPicker
            label="Secondary"
            value={theme.secondary}
            onChange={(v) => theme.set({ secondary: v })}
          />
          <ColorPicker
            label="Tertiary"
            value={theme.tertiary}
            onChange={(v) => theme.set({ tertiary: v })}
          />
        </section>

        <section
          className="space-y-4 rounded-[calc(var(--m3-shape)*0.8)] px-5 py-4"
          style={{ background: "var(--m3-surface-high)" }}
        >
          <div className="flex items-center gap-3">
            {theme.mode === "dark" ? <Moon size={18} /> : <Sun size={18} />}
            <span className="flex-1 text-[15px] font-medium">Mode</span>
            <button
              onClick={() => theme.set({ mode: theme.mode === "dark" ? "light" : "dark" })}
              className="bouncy-press rounded-full px-4 py-2 text-sm"
              style={{ background: "var(--m3-primary)", color: "var(--m3-on-primary)" }}
            >
              {theme.mode === "dark" ? "Go light" : "Go dark"}
            </button>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-medium">Corner roundness</span>
              <span className="text-sm opacity-70">{theme.shape.toFixed(2)} rem</span>
            </div>
            <input
              type="range"
              min={0.25}
              max={3}
              step={0.05}
              value={theme.shape}
              onChange={(e) => theme.set({ shape: Number(e.target.value) })}
              className="mt-2 w-full"
              style={{ accentColor: "var(--m3-primary)" }}
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="flex-1 text-[15px] font-medium">Bouncy animations</span>
            <button
              onClick={() => theme.set({ bouncy: !theme.bouncy })}
              role="switch"
              aria-checked={theme.bouncy}
              className="bouncy-press flex h-8 w-14 items-center rounded-full px-1 transition-colors"
              style={{
                background: theme.bouncy ? "var(--m3-primary)" : "var(--m3-surface-highest)",
                justifyContent: theme.bouncy ? "flex-end" : "flex-start",
              }}
            >
              <span
                className="h-6 w-6 rounded-full transition-transform"
                style={{ background: theme.bouncy ? "var(--m3-on-primary)" : "var(--m3-outline)" }}
              />
            </button>
          </div>

          {(
            [
              ["glow", "Neon glow"],
              ["emojiVibes", "Vibe icons"],
            ] as const
          ).map(([key, label]) => (
            <div key={key} className="flex items-center gap-3">
              <span className="flex-1 text-[15px] font-medium">{label}</span>
              <button
                onClick={() => theme.set({ [key]: !theme[key] })}
                role="switch"
                aria-checked={theme[key]}
                aria-label={label}
                className="bouncy-press flex h-8 w-14 items-center rounded-full px-1 transition-colors"
                style={{
                  background: theme[key] ? "var(--m3-primary)" : "var(--m3-surface-highest)",
                  justifyContent: theme[key] ? "flex-end" : "flex-start",
                }}
              >
                <span
                  className="h-6 w-6 rounded-full"
                  style={{ background: theme[key] ? "var(--m3-on-primary)" : "var(--m3-outline)" }}
                />
              </button>
            </div>
          ))}

          <div>
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-medium">Text size</span>
              <span className="text-sm opacity-70">{Math.round(theme.fontScale * 100)}%</span>
            </div>
            <input
              type="range"
              min={0.85}
              max={1.3}
              step={0.05}
              value={theme.fontScale}
              onChange={(e) => theme.set({ fontScale: Number(e.target.value) })}
              className="mt-2 w-full"
              style={{ accentColor: "var(--m3-primary)" }}
              aria-label="Text size"
            />
          </div>
        </section>


        <ExpressiveControls />

        <section className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] opacity-60">Quick typeface</p>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
            {[...FONTS.map((f) => ({ key: f.key, label: f.label, stack: f.stack })), ...theme.customFonts.map((c) => ({ key: `custom:${c.id}`, label: c.name, stack: `"${c.family}", sans-serif` }))].map(
              (f) => (
                <button
                  key={f.key}
                  onClick={() => theme.set({ font: f.key })}
                  className="bouncy-press flex items-center justify-between rounded-[calc(var(--m3-shape)*0.6)] px-4 py-3 text-left text-sm"
                  style={{
                    background:
                      theme.font === f.key ? "var(--m3-primary-container)" : "var(--m3-surface-high)",
                    fontFamily: f.stack,
                  }}
                >
                  {f.label}
                  {theme.font === f.key && <Check size={16} color="var(--m3-primary)" />}
                </button>
              ),
            )}
          </div>
        </section>

        <button
          onClick={onClose}
          className="bouncy-press w-full rounded-full px-5 py-4 text-sm font-medium"
          style={{ background: "var(--m3-primary)", color: "var(--m3-on-primary)" }}
        >
          Back to Neon Weather
        </button>
      </div>
    </div>
  );
}
export type ColorTheme = {
  name: string;
  blurb: string;
  primary: string;
  secondary: string;
  tertiary: string;
  mode: "dark" | "light";
};

/** Material 3 Expressive style palettes selectable from Settings. */
export const COLOR_THEMES: ColorTheme[] = [
  {
    name: "Vibrant",
    blurb: "Saturated, high-energy accents",
    primary: "#00e5a0",
    secondary: "#4d7cff",
    tertiary: "#ff4fa3",
    mode: "dark",
  },
  {
    name: "Total Spot",
    blurb: "Spotlight green on near-black",
    primary: "#1ed760",
    secondary: "#57e2c0",
    tertiary: "#ffe14d",
    mode: "dark",
  },
  {
    name: "Expressive",
    blurb: "Playful violet, coral and lime",
    primary: "#b388ff",
    secondary: "#ff8a65",
    tertiary: "#c6ff5e",
    mode: "dark",
  },
  {
    name: "Neon Mint",
    blurb: "The Neon Weather classic",
    primary: "#7cf5c4",
    secondary: "#8ab4ff",
    tertiary: "#ff8fd8",
    mode: "dark",
  },
  {
    name: "Sunburst",
    blurb: "Warm amber daylight",
    primary: "#ffb454",
    secondary: "#ff6f61",
    tertiary: "#ffe066",
    mode: "light",
  },
  {
    name: "Tidal",
    blurb: "Cool ocean blues",
    primary: "#5ad1ff",
    secondary: "#4f7cff",
    tertiary: "#8affe5",
    mode: "dark",
  },
  {
    name: "Blossom",
    blurb: "Soft pink paper light",
    primary: "#ff7ab8",
    secondary: "#9a7bff",
    tertiary: "#ffca6b",
    mode: "light",
  },
  {
    name: "Citrus Lab",
    blurb: "Fresh greens on paper",
    primary: "#9ee37d",
    secondary: "#4fd6a0",
    tertiary: "#e0ff8f",
    mode: "light",
  },
  {
    name: "Midnight Grape",
    blurb: "Deep violet with electric plum",
    primary: "#a78bfa",
    secondary: "#6366f1",
    tertiary: "#f0abfc",
    mode: "dark",
  },
  {
    name: "Copper Dusk",
    blurb: "Burnt copper and dusty rose",
    primary: "#f4a261",
    secondary: "#e76f51",
    tertiary: "#e9c46a",
    mode: "dark",
  },
  {
    name: "Arctic Frost",
    blurb: "Pale ice on bright paper",
    primary: "#7dd3fc",
    secondary: "#a5b4fc",
    tertiary: "#67e8f9",
    mode: "light",
  },
  {
    name: "Cyber Lime",
    blurb: "Acid lime on black glass",
    primary: "#d4ff3f",
    secondary: "#22d3ee",
    tertiary: "#fb7185",
    mode: "dark",
  },
  {
    name: "Rose Quartz",
    blurb: "Soft blush and warm sand",
    primary: "#fb7185",
    secondary: "#f0abfc",
    tertiary: "#fcd34d",
    mode: "light",
  },
  {
    name: "Deep Ocean",
    blurb: "Abyss blue with aqua glow",
    primary: "#38bdf8",
    secondary: "#2563eb",
    tertiary: "#5eead4",
    mode: "dark",
  },
  {
    name: "Ember Noir",
    blurb: "Molten red on charcoal",
    primary: "#ff5f56",
    secondary: "#ff9f1c",
    tertiary: "#ffd6a5",
    mode: "dark",
  },
  {
    name: "Matcha Paper",
    blurb: "Calm tea greens on cream",
    primary: "#6ba368",
    secondary: "#8bbf9f",
    tertiary: "#d9c58b",
    mode: "light",
  },
  {
    name: "Bubblegum Pop",
    blurb: "Candy pink and sky blue",
    primary: "#ff5fa2",
    secondary: "#5fd0ff",
    tertiary: "#ffe45f",
    mode: "dark",
  },
  {
    name: "Cookie Dough",
    blurb: "Warm vanilla with cocoa chips",
    primary: "#e0a458",
    secondary: "#a9714b",
    tertiary: "#f2e2c4",
    mode: "light",
  },
  {
    name: "Aurora Veil",
    blurb: "Polar green over indigo night",
    primary: "#5ef2b4",
    secondary: "#7b8cff",
    tertiary: "#b96bff",
    mode: "dark",
  },
  {
    name: "Solar Flare",
    blurb: "White-hot orange and gold",
    primary: "#ff7a18",
    secondary: "#ffb703",
    tertiary: "#ff477e",
    mode: "dark",
  },
  {
    name: "Lavender Fog",
    blurb: "Muted purple haze on paper",
    primary: "#8b7bd8",
    secondary: "#b5a7e6",
    tertiary: "#7fb7d9",
    mode: "light",
  },
  {
    name: "Retro Arcade",
    blurb: "CRT magenta and cyan",
    primary: "#ff2fb9",
    secondary: "#00e5ff",
    tertiary: "#ffe600",
    mode: "dark",
  },
  {
    name: "Forest Rain",
    blurb: "Wet moss and slate",
    primary: "#54b689",
    secondary: "#3d8f7b",
    tertiary: "#a7d49b",
    mode: "dark",
  },
  {
    name: "Peach Soda",
    blurb: "Fizzy peach on soft cream",
    primary: "#ff9a76",
    secondary: "#ffc4a3",
    tertiary: "#7fd1c1",
    mode: "light",
  },
];


/** Second wave of expressive palettes. */
COLOR_THEMES.push(
  {
    name: "Ultraviolet",
    blurb: "Blacklight purple and acid cyan",
    primary: "#9d4dff",
    secondary: "#22e0ff",
    tertiary: "#ff3df0",
    mode: "dark",
  },
  {
    name: "Desert Bloom",
    blurb: "Terracotta with cactus green",
    primary: "#e07a5f",
    secondary: "#81b29a",
    tertiary: "#f2cc8f",
    mode: "light",
  },
  {
    name: "Glacier Steel",
    blurb: "Cold steel with icy highlight",
    primary: "#9fb3c8",
    secondary: "#5c7d99",
    tertiary: "#cfe8ff",
    mode: "dark",
  },
  {
    name: "Mango Sticky",
    blurb: "Ripe mango on coconut cream",
    primary: "#ffb703",
    secondary: "#fb8500",
    tertiary: "#8ecae6",
    mode: "light",
  },
  {
    name: "Vaporwave",
    blurb: "Sunset grid pink and teal",
    primary: "#ff77e9",
    secondary: "#7af5ff",
    tertiary: "#ffd166",
    mode: "dark",
  },
  {
    name: "Espresso",
    blurb: "Dark roast with crema gold",
    primary: "#c89f6d",
    secondary: "#8d5b3f",
    tertiary: "#e6d3b3",
    mode: "dark",
  },
  {
    name: "Wasabi Ink",
    blurb: "Sharp green over ink black",
    primary: "#a3e635",
    secondary: "#34d399",
    tertiary: "#f472b6",
    mode: "dark",
  },
  {
    name: "Cotton Sky",
    blurb: "Powder blue on white paper",
    primary: "#60a5fa",
    secondary: "#a78bfa",
    tertiary: "#fca5a5",
    mode: "light",
  },
);
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { TempUnit, WindUnit } from "./weather";
import { DEFAULT_CUSTOM_SHAPE, customShapeRadius, type CustomShape, type ShapeStyle } from "./shapes";

import {
  deleteStoredFont,
  listStoredFonts,
  registerFont,
  saveStoredFont,
  type CustomFontMeta,
} from "./font-store";

export type FontKey =
  | "neo-saxon"
  | "createvite"
  | "expressive"
  | "editorial"
  | "mono"
  | "display"
  | "geometric"
  | "humanist"
  | "rounded"
  | "techno"
  | "condensed"
  | "modern-serif"
  | "soft-grotesk"
  | "clarity"
  | "syne-wide"
  | "bricolage"
  | "chakra"
  | "beach-script"
  | "dm-serif"
  | "instrument"
  | "unbounded"
  | "gabarito"
  | "anton"
  | "comfortaa"
  | "righteous"
  | "cinzel"
  | "great-vibes"
  | "michroma"
  | "rowdies";

export const FONTS: { key: FontKey; label: string; stack: string; sample: string }[] = [
  {
    key: "neo-saxon",
    label: "Neo-Saxon Sans",
    stack: '"Outfit", "Chivo", system-ui, sans-serif',
    sample: "Clear skies ahead",
  },
  {
    key: "createvite",
    label: "Createvite",
    stack: '"Caveat", "Segoe Script", cursive',
    sample: "Clear skies ahead",
  },
  {
    key: "expressive",
    label: "Expressive Grotesk",
    stack: '"Space Grotesk", system-ui, sans-serif',
    sample: "Clear skies ahead",
  },
  {
    key: "editorial",
    label: "Editorial Serif",
    stack: '"Playfair Display", Georgia, serif',
    sample: "Clear skies ahead",
  },
  {
    key: "mono",
    label: "Terminal Mono",
    stack: '"JetBrains Mono", ui-monospace, monospace',
    sample: "Clear skies ahead",
  },
  {
    key: "display",
    label: "Neon Display",
    stack: '"Bebas Neue", Impact, sans-serif',
    sample: "Clear skies ahead",
  },
  {
    key: "geometric",
    label: "Geometric Sans",
    stack: '"Poppins", system-ui, sans-serif',
    sample: "Clear skies ahead",
  },
  {
    key: "humanist",
    label: "Humanist Sans",
    stack: '"Manrope", system-ui, sans-serif',
    sample: "Clear skies ahead",
  },
  {
    key: "rounded",
    label: "Soft Rounded",
    stack: '"Nunito", system-ui, sans-serif',
    sample: "Clear skies ahead",
  },
  {
    key: "techno",
    label: "Techno Orbit",
    stack: '"Orbitron", system-ui, sans-serif',
    sample: "Clear skies ahead",
  },
  {
    key: "condensed",
    label: "Condensed Grotesk",
    stack: '"Archivo Narrow", "Arial Narrow", sans-serif',
    sample: "Clear skies ahead",
  },
  {
    key: "modern-serif",
    label: "Modern Serif",
    stack: '"Fraunces", Georgia, serif',
    sample: "Clear skies ahead",
  },
  {
    key: "soft-grotesk",
    label: "Soft Grotesk",
    stack: '"Sora", system-ui, sans-serif',
    sample: "Clear skies ahead",
  },
  {
    key: "clarity",
    label: "Clarity Sans",
    stack: '"Lexend", system-ui, sans-serif',
    sample: "Clear skies ahead",
  },
  {
    key: "syne-wide",
    label: "Syne Wide",
    stack: '"Syne", system-ui, sans-serif',
    sample: "Clear skies ahead",
  },
  {
    key: "bricolage",
    label: "Bricolage",
    stack: '"Bricolage Grotesque", system-ui, sans-serif',
    sample: "Clear skies ahead",
  },
  {
    key: "chakra",
    label: "Chakra Tech",
    stack: '"Chakra Petch", system-ui, sans-serif',
    sample: "Clear skies ahead",
  },
  {
    key: "beach-script",
    label: "Beach Script",
    stack: '"Pacifico", cursive',
    sample: "Clear skies ahead",
  },
  {
    key: "dm-serif",
    label: "Poster Serif",
    stack: '"DM Serif Display", Georgia, serif',
    sample: "Clear skies ahead",
  },
  {
    key: "instrument",
    label: "Instrument Serif",
    stack: '"Instrument Serif", Georgia, serif',
    sample: "Clear skies ahead",
  },
  {
    key: "unbounded",
    label: "Unbounded",
    stack: '"Unbounded", system-ui, sans-serif',
    sample: "Clear skies ahead",
  },
  {
    key: "gabarito",
    label: "Gabarito Round",
    stack: '"Gabarito", system-ui, sans-serif',
    sample: "Clear skies ahead",
  },
  {
    key: "anton",
    label: "Anton Poster",
    stack: '"Anton", Impact, sans-serif',
    sample: "Clear skies ahead",
  },
  {
    key: "comfortaa",
    label: "Bubble Comfort",
    stack: '"Comfortaa", system-ui, sans-serif',
    sample: "Clear skies ahead",
  },
  {
    key: "righteous",
    label: "Retro Righteous",
    stack: '"Righteous", system-ui, sans-serif',
    sample: "Clear skies ahead",
  },
  {
    key: "cinzel",
    label: "Roman Caps",
    stack: '"Cinzel", Georgia, serif',
    sample: "Clear skies ahead",
  },
  {
    key: "great-vibes",
    label: "Great Vibes",
    stack: '"Great Vibes", cursive',
    sample: "Clear skies ahead",
  },
  {
    key: "michroma",
    label: "Michroma Wide",
    stack: '"Michroma", system-ui, sans-serif',
    sample: "Clear skies ahead",
  },
  {
    key: "rowdies",
    label: "Rowdies",
    stack: '"Rowdies", system-ui, sans-serif',
    sample: "Clear skies ahead",
  },
];


export type Mode = "dark" | "light";

export type NeonTheme = {
  primary: string;
  secondary: string;
  tertiary: string;
  /** Built-in FontKey, or `custom:<id>` for an uploaded font. */
  font: string;
  neoUI14: boolean;
  mode: Mode;
  tempUnit: TempUnit;
  windUnit: WindUnit;
  shape: number;
  shapeStyle: ShapeStyle;
  /** User-authored corner geometry used when shapeStyle is "custom". */
  customShape: CustomShape;
  bouncy: boolean;
  glow: boolean;
  fontScale: number;
  emojiVibes: boolean;
  /** Animation speed multiplier (0.5 = slow, 2 = snappy). */
  motionSpeed: number;
  /** Boosts outlines and muted text for readability. */
  contrast: boolean;
  /** Global letter spacing in em. */
  tracking: number;
};




/** A user-saved appearance snapshot (colors + shape + font + mode). */
export type SavedAppearance = {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  tertiary: string;
  mode: Mode;
  shape: number;
  shapeStyle: ShapeStyle;
  font: string;
};

const DEFAULTS: NeonTheme = {
  primary: "#7cf5c4",
  secondary: "#8ab4ff",
  tertiary: "#ff8fd8",
  font: "neo-saxon",
  neoUI14: false,
  mode: "dark",
  tempUnit: "c",
  windUnit: "kmh",
  shape: 1.75,
  shapeStyle: "round",
  customShape: DEFAULT_CUSTOM_SHAPE,
  bouncy: true,
  glow: true,
  fontScale: 1,
  emojiVibes: true,
  motionSpeed: 1,
  contrast: false,
  tracking: 0,
};


const KEY = "neon-weather-theme";
const SAVED_KEY = "neon-weather-saved-themes";

type Ctx = NeonTheme & {
  set: (patch: Partial<NeonTheme>) => void;
  reset: () => void;
  customFonts: CustomFontMeta[];
  addCustomFont: (file: File) => Promise<void>;
  removeCustomFont: (id: string) => Promise<void>;
  savedThemes: SavedAppearance[];
  saveAppearance: (name: string) => void;
  applyAppearance: (id: string) => void;
  deleteAppearance: (id: string) => void;
};

const ThemeCtx = createContext<Ctx | null>(null);



function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h.padEnd(6, "0").slice(0, 6);
  const n = parseInt(full || "000000", 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export function mixHex(hex: string, withHex: string, amount: number) {
  const a = hexToRgb(hex);
  const b = hexToRgb(withHex);
  const m = (x: number, y: number) => Math.round(x + (y - x) * amount);
  return `#${[m(a.r, b.r), m(a.g, b.g), m(a.b, b.b)]
    .map((v) => v.toString(16).padStart(2, "0"))
    .join("")}`;
}

export function readableOn(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const l = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return l > 0.6 ? "#10131a" : "#ffffff";
}

export function NeonThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<NeonTheme>(DEFAULTS);
  const [customFonts, setCustomFonts] = useState<CustomFontMeta[]>([]);
  const [savedThemes, setSavedThemes] = useState<SavedAppearance[]>([]);



  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setTheme({ ...DEFAULTS, ...JSON.parse(raw) });
      const savedRaw = localStorage.getItem(SAVED_KEY);
      if (savedRaw) setSavedThemes(JSON.parse(savedRaw) as SavedAppearance[]);
    } catch {
      /* ignore */
    }

    void listStoredFonts().then(async (fonts) => {
      for (const f of fonts) {
        try {
          await registerFont(f);
        } catch {
          /* ignore */
        }
      }
      setCustomFonts(fonts.map((f) => ({ id: f.id, name: f.name, family: f.family })));
    });
  }, []);


  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(theme));
    } catch {
      /* ignore */
    }
    const root = document.documentElement;
    const light = theme.mode === "light";
    const base = light ? "#ffffff" : "#05070c";

    // Accents stay legible on either surface.
    const accent = (hex: string) => (light ? mixHex(hex, "#0a0d14", 0.45) : hex);
    const primary = accent(theme.primary);
    const secondary = accent(theme.secondary);
    const tertiary = accent(theme.tertiary);

    // Three distinct background surfaces (M3 surface container levels).
    const surfaceDim = light
      ? mixHex(theme.primary, "#eceef2", 0.95)
      : mixHex(theme.primary, "#03050a", 0.96);
    const surface = light
      ? mixHex(theme.primary, "#ffffff", 0.93)
      : mixHex(theme.primary, "#05070c", 0.94);
    const surfaceHigh = light
      ? mixHex(theme.primary, "#ffffff", 0.86)
      : mixHex(theme.primary, "#0b1018", 0.88);
    const surfaceHighest = light
      ? mixHex(theme.primary, "#ffffff", 0.78)
      : mixHex(theme.primary, "#121a26", 0.82);
    const onSurface = light ? "#131820" : "#f2f5f8";

    root.style.setProperty("--m3-primary", primary);
    root.style.setProperty("--m3-on-primary", readableOn(primary));
    root.style.setProperty(
      "--m3-primary-container",
      light ? mixHex(theme.primary, "#ffffff", 0.7) : mixHex(theme.primary, base, 0.72),
    );
    root.style.setProperty("--m3-secondary", secondary);
    root.style.setProperty("--m3-on-secondary", readableOn(secondary));
    root.style.setProperty(
      "--m3-secondary-container",
      light ? mixHex(theme.secondary, "#ffffff", 0.74) : mixHex(theme.secondary, base, 0.74),
    );
    root.style.setProperty("--m3-tertiary", tertiary);
    root.style.setProperty("--m3-on-tertiary", readableOn(tertiary));
    root.style.setProperty(
      "--m3-tertiary-container",
      light ? mixHex(theme.tertiary, "#ffffff", 0.74) : mixHex(theme.tertiary, base, 0.74),
    );
    root.style.setProperty("--m3-surface-dim", surfaceDim);
    root.style.setProperty("--m3-surface", surface);
    root.style.setProperty("--m3-surface-high", surfaceHigh);
    root.style.setProperty("--m3-surface-highest", surfaceHighest);
    root.style.setProperty("--m3-on-surface", onSurface);
    root.style.setProperty(
      "--m3-outline",
      light ? mixHex(theme.primary, "#ffffff", 0.55) : mixHex(theme.primary, base, 0.62),
    );
    const custom = theme.font.startsWith("custom:")
      ? customFonts.find((f) => `custom:${f.id}` === theme.font)
      : undefined;
    root.style.setProperty(
      "--m3-font",
      custom
        ? `"${custom.family}", system-ui, sans-serif`
        : (FONTS.find((f) => f.key === theme.font)?.stack ?? FONTS[0]!.stack),
    );
    root.style.setProperty("--m3-shape", `${theme.shape}rem`);
    root.style.setProperty("--m3-custom-radius", customShapeRadius(theme.customShape));
    root.dataset["shapestyle"] = theme.shapeStyle;
    root.dataset["bouncy"] = theme.bouncy ? "true" : "false";
    root.dataset["glow"] = theme.glow ? "true" : "false";
    root.style.setProperty("--m3-motion", String(theme.motionSpeed));
    root.style.setProperty("--m3-tracking", `${theme.tracking}em`);
    root.dataset["contrast"] = theme.contrast ? "true" : "false";
    root.style.fontSize = `${Math.round(theme.fontScale * 100)}%`;
    root.style.colorScheme = light ? "light" : "dark";

  }, [theme, customFonts]);

  const addCustomFont = async (file: File) => {
    const font = await saveStoredFont(file);
    await registerFont(font);
    setCustomFonts((prev) => [...prev, { id: font.id, name: font.name, family: font.family }]);
    setTheme((t) => ({ ...t, font: `custom:${font.id}` }));
  };

  const removeCustomFont = async (id: string) => {
    await deleteStoredFont(id);
    setCustomFonts((prev) => prev.filter((f) => f.id !== id));
    setTheme((t) => (t.font === `custom:${id}` ? { ...t, font: DEFAULTS.font } : t));
  };

  const persistSaved = (list: SavedAppearance[]) => {
    setSavedThemes(list);
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify(list));
    } catch {
      /* ignore */
    }
  };

  const value = useMemo<Ctx>(
    () => ({
      ...theme,
      set: (patch) => setTheme((t) => ({ ...t, ...patch })),
      reset: () => setTheme(DEFAULTS),
      customFonts,
      addCustomFont,
      removeCustomFont,
      savedThemes,
      saveAppearance: (name: string) =>
        persistSaved([
          ...savedThemes,
          {
            id: `${Date.now()}`,
            name: name.trim() || `Theme ${savedThemes.length + 1}`,
            primary: theme.primary,
            secondary: theme.secondary,
            tertiary: theme.tertiary,
            mode: theme.mode,
            shape: theme.shape,
            shapeStyle: theme.shapeStyle,
            font: theme.font,
          },
        ]),
      applyAppearance: (id: string) => {
        const s = savedThemes.find((x) => x.id === id);
        if (!s) return;
        setTheme((t) => ({
          ...t,
          primary: s.primary,
          secondary: s.secondary,
          tertiary: s.tertiary,
          mode: s.mode,
          shape: s.shape,
          shapeStyle: s.shapeStyle,
          font: s.font,
        }));
      },
      deleteAppearance: (id: string) => persistSaved(savedThemes.filter((x) => x.id !== id)),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme, customFonts, savedThemes],
  );


  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;

}

export function useNeonTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useNeonTheme must be used inside NeonThemeProvider");
  return ctx;
}
import {
  Circle,
  Cloud,
  Clover,
  Diamond,
  Droplet,
  Star,
  Crop,
  Bookmark,
  Flower2,
  Mountain,
  Flower,
  Gem,
  Hexagon,
  Cookie,
  Pill,
  Leaf,
  PieChart,
  Sparkles,
  Square,
  SquareDashed,
  Ticket,
  Torus,
  Waves,
  type LucideIcon,
} from "lucide-react";

export type ShapeStyle =
  | "round"
  | "pill"
  | "cookie"
  | "flower"
  | "burst"
  | "squircle"
  | "leaf"
  | "slice"
  | "sharp"
  | "clover"
  | "gem"
  | "arch"
  | "ticket"
  | "puffy"
  | "diamond"
  | "wave"
  | "star"
  | "blob"
  | "chip"
  | "notch"
  | "petal"
  | "zigzag"
  | "custom";

export const SHAPE_STYLES: { key: ShapeStyle; label: string; Icon: LucideIcon; blurb: string }[] = [
  { key: "round", label: "Rounded", Icon: Circle, blurb: "Classic Material corners" },
  { key: "pill", label: "Pill", Icon: Pill, blurb: "Fully rounded capsules" },
  { key: "cookie", label: "7 Cookies", Icon: Cookie, blurb: "Seven-lobe scallop" },
  { key: "flower", label: "Flower", Icon: Flower, blurb: "Eight soft petals" },
  { key: "burst", label: "Burst", Icon: Sparkles, blurb: "Twelve-point sparkle" },
  { key: "squircle", label: "Squircle", Icon: Square, blurb: "Smooth super-ellipse" },
  { key: "leaf", label: "Leaf", Icon: Leaf, blurb: "Diagonal asymmetry" },
  { key: "slice", label: "Slice", Icon: PieChart, blurb: "One sharp corner" },
  { key: "sharp", label: "Sharp", Icon: SquareDashed, blurb: "Crisp, minimal radius" },
  { key: "clover", label: "Clover", Icon: Clover, blurb: "Four lucky lobes" },
  { key: "gem", label: "Gem", Icon: Gem, blurb: "Faceted octagon" },
  { key: "arch", label: "Arch", Icon: Torus, blurb: "Domed top, flat base" },
  { key: "ticket", label: "Ticket", Icon: Ticket, blurb: "Notched side cuts" },
  { key: "puffy", label: "Puffy", Icon: Cloud, blurb: "Cloud-soft blob" },
  { key: "diamond", label: "Diamond", Icon: Diamond, blurb: "Tilted rhombus" },
  { key: "wave", label: "Wave", Icon: Waves, blurb: "Rolling wavy edge" },
  { key: "star", label: "Star", Icon: Star, blurb: "Eight-point starburst" },
  { key: "blob", label: "Blob", Icon: Droplet, blurb: "Organic liquid form" },
  { key: "chip", label: "Chip", Icon: Crop, blurb: "Two clipped corners" },
  { key: "notch", label: "Notch", Icon: Bookmark, blurb: "Dipped top edge" },
  { key: "petal", label: "Petal", Icon: Flower2, blurb: "Opposing round tips" },
  { key: "zigzag", label: "Zigzag", Icon: Mountain, blurb: "Torn paper base" },
  { key: "custom", label: "My shape", Icon: Hexagon, blurb: "Built in Shape Studio" },
];

/** Per-corner roundness (in % of the box) for the user-authored shape. */
export type CustomShape = { tl: number; tr: number; br: number; bl: number };

export const DEFAULT_CUSTOM_SHAPE: CustomShape = { tl: 45, tr: 12, br: 45, bl: 12 };

export function customShapeRadius(s: CustomShape) {
  return `${s.tl}% ${s.tr}% ${s.br}% ${s.bl}%`;
}
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Neon Weather" },
      { name: "description", content: "Material You 3 Expressive weather for your city." },
      { property: "og:title", content: "Neon Weather" },
      { property: "og:description", content: "Material You 3 Expressive weather for your city." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Space+Grotesk:wght@400..700&family=Playfair+Display:wght@400..700&family=JetBrains+Mono:wght@400..700&family=Bebas+Neue&family=Outfit:wght@300..700&family=Poppins:wght@300;400;500;600&family=Manrope:wght@300..700&family=Nunito:wght@300..700&family=Orbitron:wght@400..700&family=Archivo+Narrow:wght@400..700&family=Fraunces:wght@300..700&family=Sora:wght@300..700&family=Lexend:wght@300..700&family=Syne:wght@400..800&family=Bricolage+Grotesque:wght@300..800&family=Chakra+Petch:wght@400;600;700&family=Pacifico&family=DM+Serif+Display&family=Sixtyfour&family=Instrument+Serif&family=Unbounded:wght@300..700&family=Gabarito:wght@400..900&family=Anton&family=Comfortaa:wght@300..700&family=Righteous&family=Cinzel:wght@400..700&family=Great+Vibes&family=Michroma&family=Rowdies:wght@300;400;700&display=swap",
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "alternate icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "apple-touch-icon", href: "/favicon.svg" },

    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
@import "tailwindcss" source(none);
@source "../src";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

/*
 * Design system definition.
 *
 * The @theme inline block maps CSS custom properties to Tailwind utility
 * classes (e.g. --color-primary -> bg-primary, text-primary).
 *
 * The :root and .dark blocks define the actual color values using oklch.
 * All colors MUST use oklch format.
 *
 * To add a new semantic color:
 * 1. Add the variable to :root (light value) and .dark (dark value)
 * 2. Register it in @theme inline as --color-<name>: var(--<name>)
 */

@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
  --radius-3xl: calc(var(--radius) + 12px);
  --radius-4xl: calc(var(--radius) + 16px);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-ring-offset-background: var(--background);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.129 0.042 264.695);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.129 0.042 264.695);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.129 0.042 264.695);
  --primary: oklch(0.208 0.042 265.755);
  --primary-foreground: oklch(0.984 0.003 247.858);
  --secondary: oklch(0.968 0.007 247.896);
  --secondary-foreground: oklch(0.208 0.042 265.755);
  --muted: oklch(0.968 0.007 247.896);
  --muted-foreground: oklch(0.554 0.046 257.417);
  --accent: oklch(0.968 0.007 247.896);
  --accent-foreground: oklch(0.208 0.042 265.755);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.984 0.003 247.858);
  --border: oklch(0.929 0.013 255.508);
  --input: oklch(0.929 0.013 255.508);
  --ring: oklch(0.704 0.04 256.788);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.984 0.003 247.858);
  --sidebar-foreground: oklch(0.129 0.042 264.695);
  --sidebar-primary: oklch(0.208 0.042 265.755);
  --sidebar-primary-foreground: oklch(0.984 0.003 247.858);
  --sidebar-accent: oklch(0.968 0.007 247.896);
  --sidebar-accent-foreground: oklch(0.208 0.042 265.755);
  --sidebar-border: oklch(0.929 0.013 255.508);
  --sidebar-ring: oklch(0.704 0.04 256.788);
}

.dark {
  --background: oklch(0.129 0.042 264.695);
  --foreground: oklch(0.984 0.003 247.858);
  --card: oklch(0.208 0.042 265.755);
  --card-foreground: oklch(0.984 0.003 247.858);
  --popover: oklch(0.208 0.042 265.755);
  --popover-foreground: oklch(0.984 0.003 247.858);
  --primary: oklch(0.929 0.013 255.508);
  --primary-foreground: oklch(0.208 0.042 265.755);
  --secondary: oklch(0.279 0.041 260.031);
  --secondary-foreground: oklch(0.984 0.003 247.858);
  --muted: oklch(0.279 0.041 260.031);
  --muted-foreground: oklch(0.704 0.04 256.788);
  --accent: oklch(0.279 0.041 260.031);
  --accent-foreground: oklch(0.984 0.003 247.858);
  --destructive: oklch(0.704 0.191 22.216);
  --destructive-foreground: oklch(0.984 0.003 247.858);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.551 0.027 264.364);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.208 0.042 265.755);
  --sidebar-foreground: oklch(0.984 0.003 247.858);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.984 0.003 247.858);
  --sidebar-accent: oklch(0.279 0.041 260.031);
  --sidebar-accent-foreground: oklch(0.984 0.003 247.858);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.551 0.027 264.364);
}

:root {
  --m3-primary: #7cf5c4;
  --m3-on-primary: #06120d;
  --m3-primary-container: #10261f;
  --m3-secondary: #8ab4ff;
  --m3-on-secondary: #061020;
  --m3-secondary-container: #131c2b;
  --m3-tertiary: #ff8fd8;
  --m3-on-tertiary: #21091a;
  --m3-tertiary-container: #2a1424;
  --m3-surface-dim: #04060a;
  --m3-surface: #080b10;
  --m3-surface-high: #111721;
  --m3-surface-highest: #18202c;
  --m3-on-surface: #f2f5f8;
  --m3-outline: #22303c;
  --m3-shape: 1.75rem;
  --m3-font: "Roboto", system-ui, sans-serif;
}

@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: scale(0.82) translateY(24px);
  }
  60% {
    opacity: 1;
    transform: scale(1.04) translateY(-6px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes pop-in {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  70% {
    opacity: 1;
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes wobble {
  0%,
  100% {
    transform: rotate(0deg) scale(1);
  }
  30% {
    transform: rotate(-4deg) scale(1.06);
  }
  60% {
    transform: rotate(3deg) scale(1.03);
  }
}

@utility animate-bounce-in {
  animation: bounce-in calc(0.55s / var(--m3-motion, 1)) cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

@utility animate-pop-in {
  animation: pop-in calc(0.4s / var(--m3-motion, 1)) cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

@utility animate-wobble {
  animation: wobble calc(0.6s / var(--m3-motion, 1)) ease-in-out;
}

@utility bouncy-press {
  transition: transform calc(0.28s / var(--m3-motion, 1)) cubic-bezier(0.34, 1.56, 0.64, 1);
}

@layer base {
  * {
    border-color: var(--color-border);
  }

  body {
    background-color: var(--m3-surface);
    color: var(--m3-on-surface);
    font-family: var(--m3-font);
    -webkit-font-smoothing: antialiased;
  }

  :root[data-bouncy="true"] .bouncy-press {
    transition: transform calc(0.28s / var(--m3-motion, 1)) cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  :root[data-bouncy="true"] .bouncy-press:active {
    transform: scale(0.88);
  }

  :root[data-bouncy="true"] .bouncy-press:hover {
    transform: scale(1.04);
  }


  :root[data-bouncy="false"] .animate-bounce-in,
  :root[data-bouncy="false"] .animate-pop-in,
  :root[data-bouncy="false"] .animate-wobble {
    animation: none;
  }
}


@layer base {
  html {
    font-family: var(--m3-font);
  }

  /* Form controls don't inherit fonts by default — force the chosen typeface
     everywhere (nav pills, cards, inputs, selects). */
  button,
  input,
  select,
  textarea,
  optgroup {
    font-family: inherit;
  }
}

/* ---------- Expressive shape styles ---------- */
/* Any surface whose radius references --m3-shape adopts the chosen shape. */
:root[data-shapestyle="pill"] [class*="var(--m3-shape)"],
:root[data-shapestyle="pill"] [style*="--m3-shape"] {
  border-radius: 9999px !important;
}

:root[data-shapestyle="squircle"] [class*="var(--m3-shape)"],
:root[data-shapestyle="squircle"] [style*="--m3-shape"] {
  border-radius: 32% / 22% !important;
}

:root[data-shapestyle="leaf"] [class*="var(--m3-shape)"],
:root[data-shapestyle="leaf"] [style*="--m3-shape"] {
  border-radius: calc(var(--m3-shape) * 1.5) calc(var(--m3-shape) * 0.25) !important;
}

:root[data-shapestyle="slice"] [class*="var(--m3-shape)"],
:root[data-shapestyle="slice"] [style*="--m3-shape"] {
  border-radius: var(--m3-shape) var(--m3-shape) var(--m3-shape) 0 !important;
}

:root[data-shapestyle="sharp"] [class*="var(--m3-shape)"],
:root[data-shapestyle="sharp"] [style*="--m3-shape"] {
  border-radius: 0.35rem !important;
}

:root[data-shapestyle="cookie"] [class*="var(--m3-shape)"],
:root[data-shapestyle="cookie"] [style*="--m3-shape"] {
  border-radius: calc(var(--m3-shape) * 1.1) calc(var(--m3-shape) * 0.7) !important;
}

:root[data-shapestyle="flower"] [class*="var(--m3-shape)"],
:root[data-shapestyle="flower"] [style*="--m3-shape"] {
  border-radius: 45% 45% 45% 45% / 30% 30% 30% 30% !important;
}

:root[data-shapestyle="burst"] [class*="var(--m3-shape)"],
:root[data-shapestyle="burst"] [style*="--m3-shape"] {
  border-radius: calc(var(--m3-shape) * 0.45) !important;
}

/* Square badges get the true cut-out silhouette. */
.fun-shape {
  transition: clip-path 0.3s ease;
}

:root[data-shapestyle="pill"] .fun-shape {
  border-radius: 9999px;
}

:root[data-shapestyle="cookie"] .fun-shape {
  clip-path: polygon(
    100% 50%,98.2% 56.3%,94% 61.8%,90% 66.6%,87.6% 71.7%,86.5% 78%,84.6% 84.6%,80.4% 89.6%,74.1% 91.8%,67.3% 91.7%,61.2% 91.7%,55.7% 93.3%,50% 96.5%,43.6% 98.9%,37.1% 98.2%,31.7% 94.2%,27.6% 88.8%,23.8% 84.1%,18.9% 81.1%,12.7% 78.6%,7.1% 74.8%,4.1% 69%,4.2% 62.3%,6% 55.8%,7% 50%,6% 44.2%,4.2% 37.7%,4.1% 31%,7.1% 25.2%,12.7% 21.4%,18.9% 18.9%,23.8% 15.9%,27.6% 11.2%,31.7% 5.8%,37.1% 1.8%,43.6% 1.1%,50% 3.5%,55.7% 6.7%,61.2% 8.3%,67.3% 8.3%,74.1% 8.2%,80.4% 10.4%,84.6% 15.4%,86.5% 22%,87.6% 28.3%,90% 33.4%,94% 38.2%,98.2% 43.7%
  );
}

:root[data-shapestyle="flower"] .fun-shape {
  clip-path: polygon(
    100% 50%,96.8% 56.2%,90.3% 60.8%,86% 64.9%,86.2% 70.9%,87.5% 78.8%,85.4% 85.4%,78.8% 87.5%,70.9% 86.2%,64.9% 86%,60.8% 90.3%,56.2% 96.8%,50% 100%,43.8% 96.8%,39.2% 90.3%,35.1% 86%,29.1% 86.2%,21.2% 87.5%,14.6% 85.4%,12.5% 78.8%,13.8% 70.9%,14% 64.9%,9.7% 60.8%,3.2% 56.2%,0% 50%,3.2% 43.8%,9.7% 39.2%,14% 35.1%,13.8% 29.1%,12.5% 21.2%,14.6% 14.6%,21.2% 12.5%,29.1% 13.8%,35.1% 14%,39.2% 9.7%,43.8% 3.2%,50% 0%,56.2% 3.2%,60.8% 9.7%,64.9% 14%,70.9% 13.8%,78.8% 12.5%,85.4% 14.6%,87.5% 21.2%,86.2% 29.1%,86% 35.1%,90.3% 39.2%,96.8% 43.8%
  );
}

:root[data-shapestyle="burst"] .fun-shape {
  clip-path: polygon(
    100% 50%,97.1% 56.2%,93.5% 61.6%,93.9% 68.2%,93.3% 75%,87.7% 78.9%,81.8% 81.8%,78.9% 87.7%,75% 93.3%,68.2% 93.9%,61.6% 93.5%,56.2% 97.1%,50% 100%,43.8% 97.1%,38.4% 93.5%,31.8% 93.9%,25% 93.3%,21.1% 87.7%,18.2% 81.8%,12.3% 78.9%,6.7% 75%,6.1% 68.2%,6.5% 61.6%,2.9% 56.2%,0% 50%,2.9% 43.8%,6.5% 38.4%,6.1% 31.8%,6.7% 25%,12.3% 21.1%,18.2% 18.2%,21.1% 12.3%,25% 6.7%,31.8% 6.1%,38.4% 6.5%,43.8% 2.9%,50% 0%,56.2% 2.9%,61.6% 6.5%,68.2% 6.1%,75% 6.7%,78.9% 12.3%,81.8% 18.2%,87.7% 21.1%,93.3% 25%,93.9% 31.8%,93.5% 38.4%,97.1% 43.8%
  );
}

:root[data-shapestyle="squircle"] .fun-shape {
  border-radius: 32% / 32%;
}

:root[data-shapestyle="leaf"] .fun-shape {
  border-radius: 65% 12% 65% 12%;
}

:root[data-shapestyle="slice"] .fun-shape {
  border-radius: 45% 45% 45% 4%;
}

:root[data-shapestyle="sharp"] .fun-shape {
  border-radius: 0.35rem;
}


/* ---------- New expressive shapes ---------- */
:root[data-shapestyle="clover"] [style*="--m3-shape"] {
  border-radius: 55% 55% 55% 55% / 55% 55% 55% 55% !important;
}
:root[data-shapestyle="gem"] [style*="--m3-shape"] {
  border-radius: calc(var(--m3-shape) * 0.35) !important;
  clip-path: polygon(
    12% 0%, 88% 0%, 100% 14%, 100% 86%, 88% 100%, 12% 100%, 0% 86%, 0% 14%
  );
}
:root[data-shapestyle="arch"] [style*="--m3-shape"] {
  border-radius: 999px 999px calc(var(--m3-shape) * 0.35) calc(var(--m3-shape) * 0.35) !important;
}
:root[data-shapestyle="ticket"] [style*="--m3-shape"] {
  border-radius: calc(var(--m3-shape) * 0.6) !important;
  clip-path: polygon(
    0% 0%, 100% 0%, 100% 38%, 96% 50%, 100% 62%, 100% 100%, 0% 100%, 0% 62%, 4% 50%, 0% 38%
  );
}
:root[data-shapestyle="puffy"] [style*="--m3-shape"] {
  border-radius: 62% 38% 55% 45% / 45% 55% 45% 55% !important;
}
:root[data-shapestyle="diamond"] [style*="--m3-shape"] {
  border-radius: calc(var(--m3-shape) * 0.5) !important;
  clip-path: polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%);
}
:root[data-shapestyle="wave"] [style*="--m3-shape"] {
  border-radius: calc(var(--m3-shape) * 1.3) calc(var(--m3-shape) * 0.3)
    calc(var(--m3-shape) * 1.3) calc(var(--m3-shape) * 0.3) !important;
}

:root[data-shapestyle="clover"] .fun-shape {
  border-radius: 55% 55% 55% 55% / 55% 55% 55% 55%;
  clip-path: polygon(
    50% 0%, 68% 8%, 78% 22%, 92% 32%, 100% 50%, 92% 68%, 78% 78%, 68% 92%, 50% 100%,
    32% 92%, 22% 78%, 8% 68%, 0% 50%, 8% 32%, 22% 22%, 32% 8%
  );
}
:root[data-shapestyle="gem"] .fun-shape {
  clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
}
:root[data-shapestyle="arch"] .fun-shape {
  border-radius: 999px 999px 20% 20%;
}
:root[data-shapestyle="ticket"] .fun-shape {
  clip-path: polygon(
    0% 0%, 100% 0%, 100% 36%, 94% 50%, 100% 64%, 100% 100%, 0% 100%, 0% 64%, 6% 50%, 0% 36%
  );
}
:root[data-shapestyle="puffy"] .fun-shape {
  border-radius: 62% 38% 55% 45% / 45% 55% 45% 55%;
}
:root[data-shapestyle="diamond"] .fun-shape {
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}
:root[data-shapestyle="wave"] .fun-shape {
  border-radius: 70% 20% 70% 20%;
}

/* ---------- Glow accent ---------- */
:root[data-glow="true"] [style*="--m3-shape"] {
  box-shadow: 0 18px 46px -28px var(--m3-primary);
}

/* ---------- User-authored shape (Shape Studio) ---------- */
:root {
  --m3-custom-radius: 45% 12% 45% 12%;
}
:root[data-shapestyle="custom"] [class*="var(--m3-shape)"],
:root[data-shapestyle="custom"] [style*="--m3-shape"] {
  border-radius: var(--m3-custom-radius) !important;
}
:root[data-shapestyle="custom"] .fun-shape {
  border-radius: var(--m3-custom-radius);
}

/* ---------- Wave 3 expressive shapes ---------- */
:root[data-shapestyle="star"] [style*="--m3-shape"] {
  border-radius: calc(var(--m3-shape) * 0.4) !important;
  clip-path: polygon(
    50% 0%, 61% 20%, 84% 12%, 80% 36%, 100% 50%, 80% 64%, 84% 88%, 61% 80%,
    50% 100%, 39% 80%, 16% 88%, 20% 64%, 0% 50%, 20% 36%, 16% 12%, 39% 20%
  );
}
:root[data-shapestyle="blob"] [style*="--m3-shape"] {
  border-radius: 70% 30% 42% 58% / 38% 62% 38% 62% !important;
}
:root[data-shapestyle="chip"] [style*="--m3-shape"] {
  border-radius: calc(var(--m3-shape) * 0.3) !important;
  clip-path: polygon(14% 0%, 100% 0%, 100% 86%, 86% 100%, 0% 100%, 0% 14%);
}
:root[data-shapestyle="notch"] [style*="--m3-shape"] {
  border-radius: calc(var(--m3-shape) * 0.8) !important;
  clip-path: polygon(
    0% 0%, 38% 0%, 44% 9%, 56% 9%, 62% 0%, 100% 0%, 100% 100%, 0% 100%
  );
}
:root[data-shapestyle="petal"] [style*="--m3-shape"] {
  border-radius: 100% 12% 100% 12% !important;
}
:root[data-shapestyle="zigzag"] [style*="--m3-shape"] {
  border-radius: calc(var(--m3-shape) * 0.3) !important;
  clip-path: polygon(
    0% 0%, 100% 0%, 100% 92%, 88% 100%, 75% 92%, 62% 100%, 50% 92%, 38% 100%,
    25% 92%, 12% 100%, 0% 92%
  );
}

:root[data-shapestyle="star"] .fun-shape {
  clip-path: polygon(
    50% 0%, 61% 20%, 84% 12%, 80% 36%, 100% 50%, 80% 64%, 84% 88%, 61% 80%,
    50% 100%, 39% 80%, 16% 88%, 20% 64%, 0% 50%, 20% 36%, 16% 12%, 39% 20%
  );
}
:root[data-shapestyle="blob"] .fun-shape {
  border-radius: 70% 30% 42% 58% / 38% 62% 38% 62%;
}
:root[data-shapestyle="chip"] .fun-shape {
  clip-path: polygon(18% 0%, 100% 0%, 100% 82%, 82% 100%, 0% 100%, 0% 18%);
}
:root[data-shapestyle="notch"] .fun-shape {
  border-radius: 30%;
  clip-path: polygon(
    0% 0%, 36% 0%, 44% 12%, 56% 12%, 64% 0%, 100% 0%, 100% 100%, 0% 100%
  );
}
:root[data-shapestyle="petal"] .fun-shape {
  border-radius: 100% 12% 100% 12%;
}
:root[data-shapestyle="zigzag"] .fun-shape {
  clip-path: polygon(
    0% 0%, 100% 0%, 100% 88%, 84% 100%, 66% 88%, 50% 100%, 34% 88%, 16% 100%, 0% 88%
  );
}

/* ---------- Motion speed, contrast boost, letter spacing ---------- */
:root {
  --m3-motion: 1;
  --m3-tracking: 0em;
}
body {
  letter-spacing: var(--m3-tracking);
}
:root[data-contrast="true"] {
  --m3-outline: var(--m3-primary);
}
:root[data-contrast="true"] [class*="opacity-"] {
  opacity: 0.94 !important;
}
