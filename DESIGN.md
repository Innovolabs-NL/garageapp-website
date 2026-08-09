---
version: alpha
name: garageapp-marketing
description: "Swiss International system anchored on GarageApp product slate. Display Cormorant Garamond, body Inter, mono JetBrains Mono. Primary overridden from Apple Clarity blue to product #1F3A5F."
colors:
  canvas: "#ffffff"
  surface: "#f5f5f7"
  ink: "#1d1d1f"
  body: "#424245"
  muted: "#86868b"
  primary: "#1F3A5F"
  primary-active: "#162A45"
  hairline: "rgba(29,29,31,0.08)"
  success: "#248a3d"
  warning: "#b25000"
  error: "#d70015"
  on-primary: "#ffffff"
typography:
  display:
    fontFamily: "Cormorant Garamond"
    weights: [500, 600, 700]
  body:
    fontFamily: "Inter"
    weights: [400, 500, 600, 700]
  mono:
    fontFamily: "JetBrains Mono"
    weights: [400, 500]
spacing:
  unit: 8
  section-y: 96
  section-y-mobile: 64
radius:
  none: 0
  sm: 2
  md: 4
borders:
  hairline: "1px solid rgba(29,29,31,0.08)"
shadows: none
motion:
  fade-up: "360ms cubic-bezier(0.16, 1, 0.3, 1)"
  fade-in: "200ms cubic-bezier(0.4, 0, 0.2, 1)"
  underline: "240ms ease"
style: swiss-international
palette-base: apple-clarity
brand-override: GarageApp slate #1F3A5F
anti-patterns:
  - no purple-to-indigo gradients
  - no cream/terracotta editorial cluster
  - no three equal feature cards in hero
  - no Inter as display font
  - no card clutter in hero
  - brand GarageApp is hero-level signal
---

# GarageApp marketing design contract

Swiss International layout: type and grid do the work. Product slate primary for CTAs and links. Full-bleed hero with workshop atmosphere; brand name dominates the first viewport.
