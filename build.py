"""Builds index.html from src/index.src.html, and a single-file preview.

Every photo is BUCO's own file in assets/img/<name>.jpg (see IMAGES below).
To swap a photo, replace the file with one of the same name and the same shape.
"""
import base64, re
from pathlib import Path

ROOT = Path(__file__).parent
SITE = ROOT

# key: (file in assets/img, alt text)
IMAGES = {
    "hero":      ("hero.jpg",     "A passion fruit martini on a wooden table in warm, low evening light"),
    "room":      ("room.jpg",     "Guests eating and drinking on BUCO's terrace under a woven shade canopy"),
    "fries":     ("fries.jpg",    "A stack of silver martini glasses held by a member of the BUCO team"),
    "wagyu":     ("wagyu.jpg",    "The Wagyu burger on a dark marble board, with fries in a martini glass"),
    "jalapeno":  ("jalapeno.jpg", "Close-up of the Jalapeño Smash burger, with crispy potato rösti and whipped cheddar cream cheese"),
    "miso":      ("miso.jpg",     "Two hands holding the Miso BBQ burger, cut open to show the patty and pickled red cabbage"),
    "cobbler":   ("cobbler.jpg",  "A green cocktail in a cut-glass tumbler, garnished with a slice of cheese and caviar"),
    "gimlet":    ("gimlet.jpg",   "A thyme gimlet with a sprig of herbs, glowing in a pool of light on a pale bar top"),
    "espresso":  ("espresso.jpg", "An espresso martini with a creamy top, on a round table by a wooden sun lounger"),
    "bar":       ("bar.jpg",      "A bartender straining a cocktail into a glass at the BUCO bar"),
    "warmRoom":  ("dining.jpg",   "Burgers, corn ribs and fries in a martini glass on a round stone table"),
    "kitchen":   ("kitchen.jpg",  "Two cooks sharing a laugh at the grill in the open kitchen"),
    "trio":      ("drinks.jpg",   "Chocolate and vanilla soft serve in two silver martini glasses"),
    "chef":      ("chef.jpg",     "Close-up of the steak roll: sliced beef, caramelised onions and chives on a toasted bun"),
}

def img_tag(key, opts):
    local, alt = IMAGES[key]
    eager = "eager" in opts
    a = "" if "decor" in opts else alt
    load = 'fetchpriority="high"' if eager else 'loading="lazy"'
    return f'<img src="assets/img/{local}" alt="{a}" {load} decoding="async">'

def data_uri(path):
    mime = {".jpg": "image/jpeg", ".svg": "image/svg+xml", ".png": "image/png"}[path.suffix]
    return f"data:{mime};base64," + base64.b64encode(path.read_bytes()).decode()

def build():
    src = (ROOT / "src/index.src.html").read_text(encoding="utf-8")
    out = re.sub(r"\{\{img (\w+)((?: \w+)*)\}\}", lambda m: img_tag(m.group(1), m.group(2).split()), src)
    (SITE / "index.html").write_text(out, encoding="utf-8")
    print("index.html built")

    # single-file preview: fonts, css, js and photos inlined so it works by double-clicking
    css = (SITE / "assets/css/site.css").read_text(encoding="utf-8")
    def font(m):
        f = SITE / "assets/fonts" / m.group(1)
        return 'url("data:font/woff2;base64,' + base64.b64encode(f.read_bytes()).decode() + '")'
    css = re.sub(r'url\("\.\./fonts/([^"]+)"\)', font, css)
    js = (SITE / "assets/js/config.js").read_text() + "\n" + (SITE / "assets/js/site.js").read_text()
    prev = out.replace('<link rel="stylesheet" href="assets/css/site.css">', f"<style>{css}</style>")
    prev = re.sub(r'<link rel="preload"[^>]+>\n?', "", prev)
    prev = prev.replace('<script src="assets/js/config.js"></script>\n  <script src="assets/js/site.js"></script>', f"<script>{js}</script>")
    prev = re.sub(r'src="(assets/img/[^"]+\.(?:jpg|svg))"', lambda m: f'src="{data_uri(SITE / m.group(1))}"', prev)
    prev = prev.replace('href="assets/img/favicon.svg"', f'href="{data_uri(SITE / "assets/img/favicon.svg")}"')
    (SITE / "preview.html").write_text(prev, encoding="utf-8")
    print("preview.html built", len(prev) // 1024, "KB")

if __name__ == "__main__":
    build()
