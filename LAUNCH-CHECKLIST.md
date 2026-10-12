# BUCO website: launch checklist and legal flags

This is not legal advice. Have a lawyer licensed in Lebanon review the legal pages before launch, especially if the restaurant takes deposits or will add online payments.

## What's built in

| Area | What this build does |
|---|---|
| Cookies | None set. No localStorage, sessionStorage or IndexedDB. |
| Analytics and tracking | None. No Google Analytics, no Meta Pixel and no tag manager. |
| Third-party embeds | None. Fonts are self-hosted (SIL OFL licences in `assets/fonts/`). There's no Google Maps iframe, no Instagram feed and no YouTube. |
| External requests on load | Zero, checked with a headless browser. |
| Cookie banner | Not needed as built: nothing optional is stored or tracked. You must add one if you add any of the items in section 3 below. |
| Data collected | Reservation request only: name, phone, date, time, number of guests, an optional note, and a consent checkbox. |
| Form consent | The checkbox is required and links to the Privacy Policy. The consent wording and timestamp are sent with each request. |
| Health data | The form asks guests not to put allergy or health details in it. Health data counts as sensitive under Lebanon's Law 81/2018. |
| Accessibility | axe-core reports 0 violations across all 7 pages at desktop and mobile widths. The site has keyboard navigation, a skip link, visible focus, a mobile menu that keeps focus inside it and closes with Esc, error messages in words, reduced-motion support and 44px+ tap targets. |
| Reviews and ratings | None shown. The Google rating and review count were deliberately left off, since Google reviews can't be republished freely. |
| Prices | None shown. |

## 1. Must do before going live

1. **Get BUCO's written authorisation** to publish a site under its name, logo and phone number. If this is a pitch, keep it private until they sign off.
2. **Photos.** The site now uses the photos you supplied. Confirm in writing that BUCO owns them or has licensed them (several look like Instagram exports, so check with whoever shot them), get consent from identifiable people in them (guests on the terrace photo, the bartender, the two cooks), and add the photographer's credit on `legal.html`.
3. **Fill in every yellow `[PLACEHOLDER]`** in `legal.html`, `privacy.html`, `cookies.html`, `terms.html`, `refunds.html` and `accessibility.html`. These include the legal entity name, commercial register number, email, hosting provider, retention periods and the refund option (choose A or B).
4. **Reservation form.** Either set `reservationForm.endpoint` in `assets/js/config.js` to a real HTTPS endpoint, or set `enabled: false`. While the endpoint is `null` the form sends nothing and tells guests to call. Use a processor that signs a data-processing agreement, and actually delete requests after the retention period you state.
5. **Links.** In `config.js`, add the real booking URL, menu URL and Instagram URL, and replace the directions link with BUCO's exact Google Maps share link. Links left as `null` stay hidden.
6. **Law 81/2018 declaration.** Controllers generally have to declare processing to the Ministry of Economy and Trade. Processing based on the person's consent is listed as an exemption, but confirm with a lawyer that this applies to BUCO.
7. **Hosting.** Use HTTPS only. Ask the host whether it sets any cookies (some CDNs set security cookies) and how long it keeps access logs, then put the answers in the privacy and cookie pages.

## 2. Facts: what was verified and what wasn't

| Claim on site | Status |
|---|---|
| Ranked #39, MENA's 50 Best Restaurants 2026 | Verified: Lebanon Traveler report on the 2026 list. |
| Chef Tarek Alameddine was a sous chef at Noma (Copenhagen) | Verified: The 50 Best (6.5 years as sous chef) and Wallpaper*. |
| Opened late 2023 | Verified: "launched in late 2023". The site no longer says "December". |
| Lobster rolls, corn with chilli butter, fries in martini glasses | Verified on The 50 Best's BUCO profile. |
| Guava margarita, thyme gimlet, mezcal espresso martini | Verified on The 50 Best's BUCO profile. |
| Exact burger recipes | **Not verified. Check against the current menu.** The 50 Best describes the Wagyu with *caramelised mushrooms*; the brief said caramelised onions. |
| Thyme gimlet ingredients; "a little heat" on the margarita | **Not verified. Confirm with BUCO.** |
| "Gigi Margarita" name, Negroni, Whiskey Sour | **Removed as unverified.** Add them back once BUCO confirms. |
| Hours 12:30 PM – 12:00 AM daily | Opening time matches public listings; closing time (12:00 AM) confirmed by the client. The reservation form only accepts requests from 12:30 PM to 11:30 PM (set in `config.js`). |
| Address | The 50 Best says "Gouraud, Saifi Village". Confirm the exact address and building. |
| "Low- and no-alcohol options" | Based on the brief. Confirm with BUCO. |

"MENA's 50 Best" is a trademark of its owner. The name is used only to state the ranking, and no logo is used. Don't add their logo or badge without their permission.

## 2b. Menu and photos (added in v2)

**Menu.** BUCO's full official menu isn't published online. The menu section lists every item named by The 50 Best, Beirut.com, Taste & Flavors and Wanderlog. Before launch, check it against the printed menu, then add or remove items as needed.
- **Descriptions from sources:** Wagyu, Classic, Corn ribs (chilli butter), Fries (martini glass), Soft serve (Madagascar vanilla), Mulberry Bacon (beef, crispy onions, mulberry jam).
- **Descriptions from the original brief, not independently confirmed:** Truffled Shroomz, Thyme Gimlet, the heat in the Guava Margarita, pickles and the Hokkaido bun on the Classic.
- **Standard classic recipes, so BUCO's version may differ:** Negroni, Whisky Sour, Dry Daiquiri, Old Fashioned, Oaxaca, Sgroppino, Mezcal Espresso Martini, Mini Martini.
- **Possibly no longer on the menu:** Beyond burger and Grilled Beef Truffle Caramel. Both come from 2023–24 articles.

**Photos.** All photo spots use BUCO's own pictures (no stand-in photos and no requests to other servers). Each was cropped to its slot and lightly sharpened. Where the original had text or a logo baked in (Espresso Martini, Miso BBQ, Thyme Gimlet), it was cleaned. Keep the original files for future edits.

| File in `assets/img/` | Photo | Where it appears |
|---|---|---|
| `hero.jpg` | Passion martini | Top of page |
| `room.jpg` | Terrace with guests | About (arch) |
| `fries.jpg` | Stacked martini glasses | About (small square) |
| `wagyu.jpg` / `miso.jpg` / `jalapeno.jpg` | Wagyu / Miso BBQ / Jalapeño Smash burgers | Signature burgers (scrolling carousel) |
| `cobbler.jpg` / `gimlet.jpg` / `espresso.jpg` | Umami Cobbler / Thyme Gimlet / Espresso Martini | Cocktails |
| `bar.jpg` / `dining.jpg` / `kitchen.jpg` / `drinks.jpg` | Bartender / table spread / cooks / soft serve | Experience |
| `chef.jpg` | Steak roll | Chef section (swap for a portrait of Chef Tarek if one becomes available) |

Not used: `random 2` (has a text design baked in) and `grilled seabass` (no free spot). The "Truffled Shroomz" signature card was removed because no photo of it was supplied; it is still on the full menu. The "Guava Margarita" card became "Umami Cobbler" (description from the menu). Check that the terrace photo shows the Gouraud Street venue. On very wide screens (about 2500px+) all three burger cards fit, so the carousel arrows hide themselves.

## 3. Adding any of these later triggers new obligations

- **Google Analytics, Meta Pixel, TikTok or similar:** you'll need a consent banner that blocks the tracking until the visitor opts in. Lebanon's Law 81 doesn't mention cookies, but the GDPR applies to visitors from the EU and UK, and Beirut gets many of them. Update the cookie and privacy pages too.
- **An embedded Google Map, YouTube video or Instagram feed:** these send visitor data to a third party, so they need consent first. You could use a click-to-load placeholder instead.
- **Google Fonts loaded from Google's servers:** this has been ruled unlawful in Germany without consent. Keep the fonts self-hosted, as they are now.
- **Newsletter or marketing messages:** these need a separate, unticked opt-in. Never bundle it with the reservation consent.
- **Online payments, deposits or gift cards:** you'll need full refund terms, a payment provider and a lawyer's review.
- **Prices:** keep them current, show the currency, and say whether tax and service are included.

## 4. Other risks to watch

- **Hero text contrast:** once real photos go in, keep the dark gradient so the text stays readable. Check on bright photos.
- **Alt text:** each photo's description is in `IMAGES` in `build.py`. Update it if you swap a photo.
- **Allergens:** the site deliberately makes no allergen-free claims. Keep it that way.
- **Alcohol:** the site includes a legal-drinking-age line. Avoid promotions that encourage excessive drinking.
- **Domain and social accounts:** register them in BUCO's name, not the developer's.
- **Arabic version:** worth considering for local guests. Any translated legal pages must match the English ones.
