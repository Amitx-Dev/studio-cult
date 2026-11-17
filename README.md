# STUDIO CULT — Full-Service Creative & Digital Marketing Agency

> **Production-Ready, High-Performance, Technically SEO-Optimized Digital Agency Website**  
> Modern Editorial Aesthetic &middot; Vibrant `#7539F5` Accent &middot; Bootstrap 5.3+ &middot; Vanilla ES6+ &middot; Schema.org JSON-LD &middot; Zero Dependencies

![STUDIO CULT Preview](assets/images/creator-hero.png)

---

## 📋 Executive Overview

**STUDIO CULT** is a full-service Creative and Digital Marketing Agency website built for speed, conversion, and search visibility. The architecture is engineered to serve 9 specific business verticals (Schools, Colleges, Hospitals, Clinics, Shops/Retail, Restaurants/Cafes, Real Estate, Startups, and Corporate Enterprises) alongside 11 core agency service offerings.

- **Total Production Pages:** 35 Public HTML Pages
- **Target Sectors:** 9 Dedicated Industry Funnels + Central Hub
- **Pricing System:** Fixed Retainers (₹2,999 to ₹39,999/mo) + A-la-carte Rate Card + Interactive Package Builder
- **Performance:** Native lazy loading (`loading="lazy"`), async image decoding (`decoding="async"`), CSS hardware acceleration, reduced-motion accessibility
- **SEO & Compliance:** Absolute canonical tags, Open Graph meta, Twitter Cards, Schema.org JSON-LD on all indexing pages, dynamic XML sitemap, custom 404 handler, and privacy/terms compliance

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend Markup** | Semantic HTML5, W3C-compliant structure, ARIA accessibility attributes |
| **Styling & Design System** | CSS3, SCSS / Dart Sass, Bootstrap 5.3.3 responsive grid, Font Awesome 6.6 icons |
| **Typography** | `DM Sans` (body legibility) + `Manrope` (modern editorial display headings) |
| **Client Scripting** | Vanilla JavaScript (ES6+), native IntersectionObserver scroll reveals, AJAX controllers |
| **Backend & APIs** | PHP 8.x endpoints for inquiry processing, spam honeypot filters, JSON data persistence |
| **Server Configuration** | Apache `.htaccess` (Gzip/Deflate compression, 1-year browser caching, security headers) |
| **Search Engine Standards** | Schema.org JSON-LD (ProfessionalService, Service, FAQPage, AboutPage, ContactPage, Blog) |

---

## 📁 Complete Project Directory Structure

```text
Social Media Management/
├── .htaccess                         # Apache Gzip compression, caching & security headers
├── .gitignore                        # Git exclusion rules (env, temporary files, editor artifacts)
├── .env.example                      # Environment variables reference template
├── README.md                         # Comprehensive project documentation
├── robots.txt                        # Search engine crawler directives & sitemap reference
├── sitemap.xml                       # XML Sitemap covering all 33 canonical indexing routes
│
├── api/                              # Production Backend Endpoints
│   ├── contact.php                   # Contact form AJAX endpoint with validation & honeypot
│   ├── newsletter.php                # Email newsletter subscription handler
│   ├── save-inquiry.php              # Package Builder & Quotation API (generates SC-Q-XXXX ID)
│   └── inquiries.json                # Secure flat-file lead & quotation repository
│
├── assets/                           # Production Frontend Assets
│   ├── css/
│   │   ├── animations.css            # Keyframe animations & prefers-reduced-motion queries
│   │   ├── bootstrap.min.css         # Bootstrap 5.3.3 core & responsive grid
│   │   ├── fontawesome.all.min.css   # Font Awesome 6.6 vector icon library
│   │   └── style.css                 # Master production stylesheet (compiled & optimized)
│   ├── images/
│   │   ├── avatars/                  # Client and user testimonial avatar SVGs
│   │   ├── demo/                     # High-res poster & 9:16 vertical reel WebP assets
│   │   ├── services/                 # High-resolution service showcase previews
│   │   ├── favicon.svg               # Vector brand browser favicon
│   │   ├── logo.svg                  # STUDIO CULT dark brand logo (for light mode)
│   │   ├── logo-white.svg            # STUDIO CULT light brand logo (for dark mode)
│   │   └── *.jpg, *.png              # Creative collages, team portraits & founder media
│   ├── js/
│   │   ├── bootstrap.bundle.min.js   # Bootstrap 5 interactive UI controllers
│   │   └── main.js                   # Application controller (Theme, Nav, Filter, Calculators)
│   ├── scss/                         # Modular SASS Architecture (Source Files)
│   │   ├── _variables.scss           # Design tokens, palette ($primary: #7539F5), breakpoints
│   │   ├── _mixins.scss              # Responsive mixins & glassmorphism utilities
│   │   ├── _typography.scss          # Type scale, font faces & heading treatments
│   │   ├── _animations.scss          # Float, spin, pulse & accessibility motion queries
│   │   ├── _components.scss          # Buttons, badges, cards, inputs & glassmorphic panels
│   │   ├── _header.scss              # Sticky blurred navbar & mobile offcanvas drawer
│   │   ├── _footer.scss              # 4-column rich footer & legal bar
│   │   ├── _pages.scss               # Specialized page layouts (Pricing, Portfolio, Industries)
│   │   └── style.scss                # SASS entry point
│   └── videos/
│       └── hero-showcase.mp4         # High-definition agency showcase reel
│
└── 35 Static Production HTML Pages:
    ├── Core Agency Hubs:
    │   ├── index.html                # Agency Homepage & interactive platform simulator
    │   ├── about.html                # About STUDIO CULT, Agency Story & Leadership
    │   ├── services.html             # All Services Hub & Architecture Directory
    │   ├── industries.html           # All Industries Hub & Deliverables Directory
    │   ├── portfolio.html            # Filterable Portfolio (10 Projects across 6 Categories)
    │   ├── pricing.html              # Fixed Retainer Matrix & Individual Rate Card
    │   ├── package-builder.html      # Interactive Package Calculator (14 Services + Instant Quote)
    │   ├── blog.html                 # Journal & Digital Marketing Insights Hub
    │   ├── blog-detail.html          # In-depth editorial article template
    │   ├── faq.html                  # 18+ Categorized FAQs with FAQPage Schema
    │   ├── contact.html              # Contact Form, Office Coordinates & Strategy Call
    │   └── 404.html                  # Custom Animated 404 Error Page
    │
    ├── Specialized Service Pages (11 Services):
    │   ├── service-creative-graphic-design.html
    │   ├── service-branding-identity.html
    │   ├── service-social-media-management.html
    │   ├── service-digital-marketing.html
    │   ├── service-meta-ads.html
    │   ├── service-google-ads.html
    │   ├── service-video-editing.html
    │   ├── service-content-creation.html
    │   ├── service-web-development.html
    │   ├── service-seo-online-presence.html
    │   └── service-content-strategy.html
    │
    ├── Dedicated Industry Solution Pages (9 Verticals):
    │   ├── industry-schools.html      # Schools & Educational Institutions
    │   ├── industry-colleges.html     # Colleges & Universities
    │   ├── industry-hospitals.html    # Hospitals & Healthcare Centers
    │   ├── industry-clinics.html      # Clinics & Private Doctors
    │   ├── industry-shops.html        # Shops & Retail Businesses
    │   ├── industry-restaurants.html  # Restaurants, Cafes & Cloud Kitchens
    │   ├── industry-real-estate.html  # Real Estate Developers & Builders
    │   ├── industry-startups.html     # Startups & High-Growth Ventures
    │   └── industry-corporate.html    # Corporate Companies & Enterprises
    │
    └── Legal & Compliance Pages:
        ├── privacy-policy.html       # DPDP-compliant client privacy & NDA policy
        ├── terms-conditions.html     # Service agreements, 50-30-20 web milestone terms
        └── refund-policy.html        # 15-day retainer cancellation & refund terms
```

---

## 🚀 Installation & Local Development

### 1. Static HTML Serving (Zero Dependencies)
You can serve the project using any static file server:

```bash
# Using Python built-in server (recommended)
python -m http.server 8000

# Using Node.js live-server or serve
npx serve .
```
Navigate to `http://localhost:8000/index.html` in your browser.

### 2. PHP Development Server (Enables API & Form Submissions)
To test form submissions and the Package Builder quotation API locally:

```bash
php -S localhost:8000
```
Navigate to `http://localhost:8000` to interact with live PHP endpoints (`api/save-inquiry.php`, `api/contact.php`).

### 3. Production Apache / Nginx Deployment
- Upload the contents of the project folder directly to your web server root (e.g., `public_html/` or `/var/www/html/`).
- The included `.htaccess` file automatically manages Gzip compression, browser caching for media/CSS/JS, and clean HTTP headers.

---

## 🎨 SCSS Compilation & Customization

The project uses modular SCSS partials located in `assets/scss/`. To recompile the master stylesheet after modifying design tokens:

```bash
# Compile once
sass assets/scss/style.scss assets/css/style.css --style=compressed

# Or watch for live changes during development
sass --watch assets/scss/style.scss:assets/css/style.css
```

Key tokens in `assets/scss/_variables.scss`:
- `$primary: #7539F5;` — STUDIO CULT Brand Purple
- `$secondary: #FF6B4A;` — Vibrant Peach Accent
- `$font-body: 'DM Sans', sans-serif;` — Primary Body Typography
- `$font-heading: 'Manrope', sans-serif;` — High-Impact Heading Typography

---

## ⚙️ Environment Configuration (`.env`)

Refer to `.env.example` for configurable production environment variables:

```ini
APP_ENV=production
APP_DEBUG=false
APP_URL=https://studiocult.in

AGENCY_EMAIL=hello@studiocult.in
AGENCY_WHATSAPP_NUMBER=919876543210

GA4_MEASUREMENT_ID=G-XXXXXXXXXX
GOOGLE_SITE_VERIFICATION=your-gsc-token
```

---

## 📡 API Endpoints Specification

### 1. Custom Package & Inquiry API
- **Endpoint:** `POST /api/save-inquiry.php`
- **Content-Type:** `application/json` or `application/x-www-form-urlencoded`
- **Features:** 
  - Input sanitization (`strip_tags`, `FILTER_SANITIZE_EMAIL`)
  - Invisible anti-spam honeypot detection (`website_url_hp`, `company_fax_hp`)
  - Unique Reference ID generator (`SC-Q-XXXX`)
  - Appends inquiry to `api/inquiries.json` (stores up to 500 recent entries with file locking)
  - Pre-formats direct WhatsApp chat URL with complete quote details

**Sample Request Body:**
```json
{
  "name": "Rajesh Kumar",
  "business_name": "Delhi Public Academy",
  "industry": "Schools & Educational Institutions",
  "email": "principal@delhiacademy.edu.in",
  "phone": "+91 98765 43210",
  "selected_services": [
    {"name": "Professional Logo", "qty": 1, "price": 1999},
    {"name": "Social Media Posts", "qty": 12, "price": 499}
  ],
  "estimated_total": "₹7,987"
}
```

**Sample Response:**
```json
{
  "status": "success",
  "ref_id": "SC-Q-8492",
  "message": "Your quotation inquiry #SC-Q-8492 has been successfully registered...",
  "whatsapp_url": "https://wa.me/?text=..."
}
```

### 2. General Contact API
- **Endpoint:** `POST /api/contact.php`
- **Features:** Input validation, anti-spam honeypot, JSON response for asynchronous feedback.

---

## 📄 License & Attribution

Designed and engineered for **STUDIO CULT**. All rights reserved.
For inquiries or support, contact `hello@studiocult.in`.
