import React, { useState, useEffect } from "react";

// ============================================================
// DESIGN TOKENS
// ============================================================
const C = {
  bg: "#FAF6F1",           // warm cream background
  bgDeep: "#F2E8DD",       // deeper warm beige for section backgrounds
  bgFrame: "#E8DFD6",      // outer frame color
  border: "#E5D9CC",       // section divider
  borderCard: "#D8CCBF",   // card border
  text: "#2A1F1A",         // deep warm brown-black for headlines
  textBody: "#4A3A30",     // body text
  textMuted: "#8A7668",    // muted warm gray
  textSubtle: "#6B5A4E",   // slightly darker muted
  pink: "#E94A6E",         // coral-pink primary accent
  pinkHover: "#D13A5E",    // darker pink for hover
};

const FONT_SERIF = "'Fraunces', 'Times New Roman', Georgia, serif";
const FONT_SANS = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

// ============================================================
// SHARED LAYOUT
// ============================================================
function useIsMobile(breakpoint = 720) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return isMobile;
}

function Nav({ current, onNav }) {
  const items = ["Work", "Travel", "Fitness", "Style", "About"];
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (key) => {
    onNav(key);
    setMenuOpen(false);
  };

  return (
    <div
      style={{
        borderBottom: `0.5px solid ${C.border}`,
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: isMobile ? "18px 20px" : "24px 48px",
        }}
      >
        <button
          onClick={() => handleNav("home")}
          style={{
            fontFamily: FONT_SERIF,
            fontSize: isMobile ? 17 : 18,
            fontWeight: 500,
            color: C.text,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            letterSpacing: "-0.01em",
            whiteSpace: "nowrap",
          }}
        >
          Callie Shepard
        </button>

        {isMobile ? (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
              display: "flex",
              flexDirection: "column",
              gap: 4,
              width: 32,
              alignItems: "flex-end",
            }}
          >
            <span
              style={{
                width: 18,
                height: 1.5,
                background: C.text,
                transition: "transform 0.2s",
                transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none",
              }}
            />
            <span
              style={{
                width: 18,
                height: 1.5,
                background: C.text,
                opacity: menuOpen ? 0 : 1,
                transition: "opacity 0.2s",
              }}
            />
            <span
              style={{
                width: 18,
                height: 1.5,
                background: C.text,
                transition: "transform 0.2s",
                transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none",
              }}
            />
          </button>
        ) : (
          <div style={{ display: "flex", gap: 32, fontSize: 14 }}>
            {items.map((item) => {
              const key = item.toLowerCase();
              const active = current === key;
              return (
                <button
                  key={item}
                  onClick={() => handleNav(key)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px 0",
                    color: active ? C.pink : C.textSubtle,
                    fontWeight: active ? 500 : 400,
                    fontFamily: FONT_SANS,
                    borderBottom: active
                      ? `1px solid ${C.pink}`
                      : "1px solid transparent",
                    transition: "color 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) e.currentTarget.style.color = C.pink;
                  }}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.color = C.textSubtle;
                  }}
                >
                  {item}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Mobile dropdown menu */}
      {isMobile && menuOpen && (
        <div
          style={{
            background: C.bg,
            borderTop: `0.5px solid ${C.border}`,
            padding: "12px 20px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {items.map((item) => {
            const key = item.toLowerCase();
            const active = current === key;
            return (
              <button
                key={item}
                onClick={() => handleNav(key)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "12px 0",
                  textAlign: "left",
                  fontSize: 16,
                  color: active ? C.pink : C.textBody,
                  fontWeight: active ? 500 : 400,
                  fontFamily: FONT_SANS,
                  borderBottom: `0.5px solid ${C.border}`,
                }}
              >
                {item}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Footer() {
  return (
    <div
      style={{
        padding: "32px 48px",
        borderTop: `0.5px solid ${C.border}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 16,
        flexWrap: "wrap",
        fontSize: 12,
        color: C.textMuted,
        fontFamily: FONT_SANS,
      }}
    >
      <span>© 2026 Callie Shepard</span>
      <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
        <a
          href="mailto:callie@callieplans.com"
          style={{
            color: C.textMuted,
            textDecoration: "none",
            fontFamily: FONT_SANS,
          }}
        >
          callie@callieplans.com
        </a>
        <span>Delray Beach, FL</span>
      </div>
    </div>
  );
}

function PageHeader({ eyebrow, title, intro }) {
  return (
    <div style={{ padding: "36px 48px 36px", textAlign: "center" }}>
      {eyebrow && (
        <div
          style={{
            fontSize: 11,
            color: C.pink,
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontWeight: 500,
            marginBottom: 20,
            fontFamily: FONT_SANS,
          }}
        >
          {eyebrow}
        </div>
      )}
      <h1
        style={{
          fontFamily: FONT_SERIF,
          fontSize: 56,
          fontWeight: 500,
          lineHeight: 1.05,
          margin: "0 0 24px",
          color: C.text,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h1>
      {intro && (
        <p
          style={{
            fontSize: 18,
            lineHeight: 1.65,
            color: C.textBody,
            maxWidth: 640,
            margin: "0 auto",
            fontFamily: FONT_SANS,
          }}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

// ============================================================
// HOMEPAGE
// ============================================================
function HomePage({ onNav }) {
  return (
    <>
      {/* Hero */}
      <div style={{ padding: "72px 48px 32px", textAlign: "center" }}>
        <h1
          style={{
            fontFamily: FONT_SERIF,
            fontSize: 64,
            fontWeight: 500,
            lineHeight: 1.02,
            margin: "0 0 32px",
            color: C.text,
            letterSpacing: "-0.025em",
          }}
        >
          Hi, I'm{" "}
          <span style={{ color: C.pink, fontStyle: "italic" }}>Callie</span>.
        </h1>
        <p
          style={{
            fontSize: 20,
            lineHeight: 1.65,
            color: C.textBody,
            maxWidth: 680,
            margin: "0 auto 22px",
            fontFamily: FONT_SANS,
          }}
        >
          I'm a Demand Planner by trade — fourteen years across fashion, CPG,
          and wellness — and a Certified Travel Advisor and Personal Trainer on
          the side. What connects it all is a love of planning: merchandise,
          trips, workouts, outfits, anything worth doing well.
        </p>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.7,
            color: C.textMuted,
            margin: 0,
            fontFamily: FONT_SANS,
          }}
        >
          Based in Delray Beach, FL.{" "}
          <span style={{ fontStyle: "italic" }}>Always planning something.</span>
        </p>
      </div>

      {/* Currently block */}
      <div
        style={{
          padding: "32px 48px",
          borderTop: `0.5px solid ${C.border}`,
          background: C.bgDeep,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 16,
            marginBottom: 26,
          }}
        >
          <span
            style={{
              fontSize: 11,
              color: C.pink,
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontWeight: 500,
              fontFamily: FONT_SANS,
            }}
          >
            Currently
          </span>
          <span
            style={{
              fontSize: 11,
              color: C.textMuted,
              fontFamily: FONT_SANS,
            }}
          >
            April 2026
          </span>
        </div>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "grid",
            gap: 16,
          }}
        >
          {[
            "Actively searching for my next role — from individual contributor to director, I'm open to full-time, contract, or consulting work where my experience can make an immediate impact.",
            "The Planning Lab is live — a first-of-its-kind merchandise planning simulator. Find it under Work.",
            "Mapping out a road trip to the Smokies — trail research in full swing.",
            "400 classes and counting at The Lab Fitness & Social Club. This month: front squats, incline bench press, and sumo deadlifts.",
            "'Dior: Crafting Fashion' on view this spring at SCAD FASH Atlanta — already planning the trip.",
          ].map((text, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                gap: 16,
                fontSize: 15,
                lineHeight: 1.55,
                fontFamily: FONT_SANS,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: C.pink,
                  marginTop: 9,
                  flexShrink: 0,
                }}
              />
              <span style={{ color: C.textBody }}>{text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Work section */}
      <div
        style={{
          padding: "32px 48px 32px",
          borderTop: `0.5px solid ${C.border}`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 28,
          }}
        >
          <h2
            style={{
              fontFamily: FONT_SERIF,
              fontSize: 28,
              fontWeight: 500,
              margin: 0,
              color: C.text,
              letterSpacing: "-0.015em",
            }}
          >
            Work
          </h2>
          <button
            onClick={() => onNav("work")}
            style={{
              fontSize: 13,
              color: C.pink,
              fontWeight: 500,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: FONT_SANS,
            }}
          >
            View all →
          </button>
        </div>

        {/* Planning Lab featured card */}
        <div
          onClick={() => onNav("planning-lab")}
          style={{
            border: `0.5px solid ${C.border}`,
            borderRadius: 12,
            padding: "32px 32px 32px 36px",
            background: C.bgDeep,
            position: "relative",
            overflow: "hidden",
            cursor: "pointer",
            transition: "transform 0.15s ease",
            marginBottom: 20,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 4,
              height: "100%",
              background: C.pink,
            }}
          />
          <div
            style={{
              display: "flex",
              gap: 16,
              marginBottom: 14,
              fontSize: 11,
              color: C.pink,
              letterSpacing: "1px",
              textTransform: "uppercase",
              fontWeight: 500,
              fontFamily: FONT_SANS,
            }}
          >
            <span>Featured</span>
            <span style={{ color: C.textMuted }}>·</span>
            <span style={{ color: C.textMuted }}>2026</span>
          </div>
          <h3
            style={{
              fontFamily: FONT_SERIF,
              fontSize: 30,
              fontWeight: 500,
              margin: "0 0 14px",
              color: C.text,
              letterSpacing: "-0.015em",
            }}
          >
            The Planning Lab
          </h3>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.65,
              color: C.textBody,
              margin: "0 0 22px",
              maxWidth: 600,
              fontFamily: FONT_SANS,
            }}
          >
            A merchandise planning simulator. Step into the role of Director
            of Planning and navigate a full seasonal cycle — pre-season
            planning through end-of-season analysis — across two brand
            scenarios.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
            {["5 rounds", "2 brand scenarios", "Live scoring"].map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 11,
                  padding: "5px 12px",
                  background: C.bg,
                  border: `0.5px solid ${C.border}`,
                  borderRadius: 999,
                  color: C.textSubtle,
                  fontFamily: FONT_SANS,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <span
            style={{
              fontSize: 13,
              color: C.pink,
              fontWeight: 500,
              fontFamily: FONT_SANS,
            }}
          >
            Explore The Planning Lab →
          </span>
        </div>

        {/* Experience + Résumé tiles */}
        <div
          className="grid-2-cols"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 14,
          }}
        >
          <button
            onClick={() => onNav("work")}
            style={{
              border: `0.5px solid ${C.border}`,
              borderRadius: 8,
              padding: 22,
              background: C.bg,
              textAlign: "left",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = C.pink;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = C.border;
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: C.textMuted,
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: 10,
                fontWeight: 500,
                fontFamily: FONT_SANS,
              }}
            >
              Experience
            </div>
            <div
              style={{
                fontSize: 14,
                color: C.textBody,
                lineHeight: 1.55,
                fontFamily: FONT_SANS,
              }}
            >
              14 years building planning functions across fashion, CPG, and
              wellness. Bloomingdale's, Boston Proper, REDCON1, and more.
            </div>
          </button>
          <a
            href="mailto:callie@callieplans.com"
            style={{
              border: `0.5px solid ${C.border}`,
              borderRadius: 8,
              padding: 22,
              background: C.bg,
              textAlign: "left",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "border-color 0.2s",
              textDecoration: "none",
              display: "block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = C.pink;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = C.border;
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: C.textMuted,
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: 10,
                fontWeight: 500,
                fontFamily: FONT_SANS,
              }}
            >
              Get in touch
            </div>
            <div
              style={{
                fontSize: 14,
                color: C.textBody,
                lineHeight: 1.55,
                fontFamily: FONT_SANS,
              }}
            >
              Open to roles, contract work, or a quick conversation →
            </div>
          </a>
        </div>
      </div>

      {/* Also planning section */}
      <div
        style={{
          padding: "32px 48px 40px",
          borderTop: `0.5px solid ${C.border}`,
        }}
      >
        <h2
          style={{
            fontFamily: FONT_SERIF,
            fontSize: 28,
            fontWeight: 500,
            margin: "0 0 28px",
            color: C.text,
            letterSpacing: "-0.015em",
          }}
        >
          Also planning
        </h2>
        <div
          className="grid-3-cols"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 14,
          }}
        >
          {[
            {
              title: "Travel",
              page: "travel",
              body: "Certified Fora Travel Advisor. Recent trips, favorite destinations, and hidden gems for your next getaway.",
            },
            {
              title: "Fitness",
              page: "fitness",
              body: "A fitness journey ten years in the making. Milestones, competitions, and the consistency that made it all possible.",
            },
            {
              title: "Style",
              page: "style",
              body: "A collection of exhibits, design events, and what I'm looking forward to.",
            },
          ].map((card) => (
            <button
              key={card.title}
              onClick={() => onNav(card.page)}
              style={{
                border: `0.5px solid ${C.border}`,
                borderRadius: 8,
                padding: 26,
                background: C.bg,
                textAlign: "left",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "border-color 0.2s, transform 0.15s",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = C.pink;
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = C.border;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  fontFamily: FONT_SERIF,
                  fontSize: 20,
                  fontWeight: 500,
                  marginBottom: 12,
                  color: C.text,
                }}
              >
                {card.title}
              </div>
              <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: C.textBody,
                  margin: "0 0 16px",
                  fontFamily: FONT_SANS,
                }}
              >
                {card.body}
              </p>
              <span
                style={{
                  fontSize: 12,
                  color: C.pink,
                  fontWeight: 500,
                  fontFamily: FONT_SANS,
                  marginTop: "auto",
                }}
              >
                Explore →
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

// ============================================================
// WORK PAGE
// ============================================================
function WorkPage({ onNav }) {
  const experience = [
    {
      company: "G.O.A.T. Foods",
      titles: ["Director of Planning"],
      years: "2024 — 2025",
      context: "A family of premium snack food brands generating $60M in revenue across DTC and retail.",
      note: "Built the company's first demand and inventory planning framework from scratch, improving forecast accuracy by 15% and reducing excess inventory by 18% across 500+ SKUs and 5 brands. Instituted cross-functional S&OP meetings with Product and Marketing, and developed executive dashboards that enabled real-time decisions on inventory, promotions, and business performance.",
    },
    {
      company: "REDCON1",
      titles: ["Director of Planning"],
      years: "2023",
      context: "A leading sports nutrition brand with $300M in revenue across DTC and wholesale channels.",
      note: "Designed and implemented a data-driven forecasting system for a 500+ SKU portfolio across DTC and wholesale, improving forecast accuracy by 22% and reducing out-of-stocks by 20%. Managed two direct reports and partnered with supply chain on PO placement, disposition planning, and risk mitigation.",
    },
    {
      company: "Parks Project",
      titles: ["E-Commerce Planner → E-Commerce Manager"],
      years: "2022 — 2023",
      context: "A mission-driven apparel and accessories brand partnering with national parks on products that give back to conservation.",
      note: "Managed the DTC P&L end to end — demand forecasting, inventory planning, and markdown strategy — delivering +12pt YoY sales growth, +2pt margin expansion, and +17pt sell-through improvement. Promoted from E-Commerce Planner after building the forecasting tool that ran the channel.",
    },
    {
      company: "Boston Proper",
      titles: ["Brand Planning Analyst → Product Planner"],
      years: "2018 — 2022",
      context: "A catalog-driven women's apparel brand specializing in sophisticated, fashion-forward clothing for the modern woman.",
      note: "Owned merchandise planning and SKU-level forecasting for the company's top collection, a $25M+ annual business — OTB, pre-season planning, and in-season reforecasting. Previously ran company-wide reporting and distribution, including daily sales tracking and event recaps that informed strategic decisions.",
    },
    {
      company: "Vitacost.com",
      titles: ["Category Manager"],
      years: "2017 — 2018",
      context: "An online retailer specializing in natural and organic products across supplements, health foods, and lifestyle categories.",
      note: "Drove $45M in annual revenue for the beauty and personal care category, improving YoY sales trend from -10% in January to -2% in December. Negotiated $1.5M+ in vendor funding — more than double the department goal — through strategic partnerships with the top 25 brands.",
    },
    {
      company: "Saks Fifth Avenue",
      titles: ["E-Commerce Planning Analyst"],
      years: "2016",
      context: null,
      note: "Drove inventory productivity and assortment optimization for the off-price e-commerce channel through merchandising, pricing, and category strategy. Developed best-practice standards that guided merchant team processes.",
    },
    {
      company: "Bloomingdale's",
      titles: ["Merchandise Assistant → Omni Senior Assistant Buyer"],
      years: "2011 — 2016",
      context: null,
      note: "Five years at Bloomingdale's across four roles, progressing from Merchandise Assistant to Omni Senior Assistant Buyer. Most recently drove assortment optimization for Women's Bridge Collections with a focus on omnichannel inventory leverage, after proactively driving a $10M contemporary business in partnership with the buyer across Tibi, Current/Elliott, and Catherine Malandrino.",
    },
  ];

  const capabilities = [
    {
      title: "Forecasting & Demand Planning",
      body: "SKU-level forecasting, financial modeling, and forecast accuracy improvement across 500+ SKUs.",
    },
    {
      title: "Planning Infrastructure",
      body: "OTB frameworks, S&OP processes, and planning tools built from scratch for startups through $300M+ businesses.",
    },
    {
      title: "Inventory Management",
      body: "Inventory strategy, stock position optimization, and turn/sell-through improvement across DTC, wholesale, and omnichannel.",
    },
    {
      title: "Cross-Functional Leadership",
      body: "Translating product vision and market insights into actionable plans across merchant, finance, and supply chain teams.",
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="A career built on building."
        intro="I build planning infrastructure from the ground up — forecasting tools, OTB frameworks, S&OP processes, and inventory strategies that align demand with financial goals. Across fashion, CPG, and wellness, from small startups to $300M+ businesses."
      />

      {/* What I do — 2x2 capability grid */}
      <div style={{ padding: "24px 48px 48px" }}>
        <div
          style={{
            fontSize: 11,
            color: C.pink,
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontWeight: 500,
            marginBottom: 20,
            fontFamily: FONT_SANS,
          }}
        >
          What I do
        </div>
        <div
          className="grid-2-cols"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 14,
          }}
        >
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              style={{
                border: `0.5px solid ${C.border}`,
                borderRadius: 8,
                padding: 22,
                background: C.bg,
              }}
            >
              <div
                style={{
                  fontFamily: FONT_SERIF,
                  fontSize: 17,
                  fontWeight: 500,
                  marginBottom: 8,
                  color: C.text,
                  letterSpacing: "-0.01em",
                }}
              >
                {cap.title}
              </div>
              <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: C.textBody,
                  margin: 0,
                  fontFamily: FONT_SANS,
                }}
              >
                {cap.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Top CTA — inline resume request */}
      <div
        style={{
          padding: "0 48px 40px",
          fontSize: 14,
          color: C.textMuted,
          fontFamily: FONT_SANS,
          fontStyle: "italic",
        }}
      >
        Need a resume?{" "}
        <a
          href="mailto:callie@callieplans.com?subject=Resume%20request"
          style={{
            color: C.pink,
            fontWeight: 500,
            textDecoration: "none",
            fontStyle: "normal",
          }}
        >
          Get in touch →
        </a>
      </div>

      {/* Featured project */}
      <div
        style={{
          padding: "24px 48px 48px",
          borderTop: `0.5px solid ${C.border}`,
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: C.pink,
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontWeight: 500,
            marginBottom: 16,
            marginTop: 24,
            fontFamily: FONT_SANS,
          }}
        >
          Featured project
        </div>
        <div
          onClick={() => onNav("planning-lab")}
          style={{
            border: `0.5px solid ${C.border}`,
            borderRadius: 12,
            padding: "36px 36px 36px 40px",
            background: C.bgDeep,
            position: "relative",
            overflow: "hidden",
            cursor: "pointer",
            transition: "transform 0.15s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 4,
              height: "100%",
              background: C.pink,
            }}
          />
          <h3
            style={{
              fontFamily: FONT_SERIF,
              fontSize: 34,
              fontWeight: 500,
              margin: "0 0 16px",
              color: C.text,
              letterSpacing: "-0.015em",
            }}
          >
            The Planning Lab
          </h3>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.65,
              color: C.textBody,
              margin: "0 0 20px",
              maxWidth: 640,
              fontFamily: FONT_SANS,
            }}
          >
            A merchandise planning simulator. Step into the role of Director
            of Planning and navigate a full seasonal cycle — pre-season
            planning through end-of-season analysis — across two brand
            scenarios.
          </p>
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 22,
            }}
          >
            {["5 rounds", "2 brand scenarios", "Live scoring"].map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 11,
                  padding: "5px 12px",
                  background: C.bg,
                  border: `0.5px solid ${C.border}`,
                  borderRadius: 999,
                  color: C.textSubtle,
                  fontFamily: FONT_SANS,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <span
            style={{
              fontSize: 13,
              color: C.pink,
              fontWeight: 500,
              fontFamily: FONT_SANS,
            }}
          >
            Explore The Planning Lab →
          </span>
        </div>
      </div>

      {/* Experience timeline */}
      <div
        style={{
          padding: "36px 48px 36px",
          borderTop: `0.5px solid ${C.border}`,
        }}
      >
        <h2
          style={{
            fontFamily: FONT_SERIF,
            fontSize: 28,
            fontWeight: 500,
            margin: "0 0 32px",
            color: C.text,
            letterSpacing: "-0.015em",
          }}
        >
          Experience
        </h2>
        <div style={{ display: "grid", gap: 28 }}>
          {experience.map((job, i) => (
            <div
              key={i}
              className="grid-experience"
              style={{
                display: "grid",
                gridTemplateColumns: "140px 1fr",
                gap: 32,
                paddingBottom: 28,
                borderBottom:
                  i < experience.length - 1 ? `0.5px solid ${C.border}` : "none",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: C.textMuted,
                  fontFamily: FONT_SANS,
                  paddingTop: 6,
                }}
              >
                {job.years}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: FONT_SERIF,
                    fontSize: 22,
                    fontWeight: 500,
                    color: C.text,
                    marginBottom: 6,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {job.company}
                </div>
                <div style={{ marginBottom: job.context ? 10 : 12 }}>
                  {job.titles.map((title, ti) => (
                    <div
                      key={ti}
                      style={{
                        fontSize: 13,
                        color: C.pink,
                        fontFamily: FONT_SANS,
                        fontWeight: 500,
                        lineHeight: 1.55,
                      }}
                    >
                      {title}
                    </div>
                  ))}
                </div>
                {job.context && (
                  <p
                    style={{
                      fontSize: 13,
                      lineHeight: 1.55,
                      color: C.textMuted,
                      margin: "0 0 12px",
                      fontFamily: FONT_SANS,
                      fontStyle: "italic",
                    }}
                  >
                    {job.context}
                  </p>
                )}
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: C.textBody,
                    margin: 0,
                    fontFamily: FONT_SANS,
                  }}
                >
                  {job.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills & Certifications */}
      <div
        style={{
          padding: "36px 48px 36px",
          borderTop: `0.5px solid ${C.border}`,
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: C.pink,
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontWeight: 500,
            marginBottom: 24,
            fontFamily: FONT_SANS,
          }}
        >
          Skills
        </div>

        {/* Planning & Forecasting */}
        <div style={{ marginBottom: 28 }}>
          <div
            style={{
              fontFamily: FONT_SERIF,
              fontSize: 16,
              fontWeight: 500,
              color: C.text,
              marginBottom: 14,
              letterSpacing: "-0.005em",
            }}
          >
            Planning & Forecasting
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {[
              "Demand forecasting",
              "SKU-level forecasting",
              "Financial modeling",
              "OTB planning",
              "S&OP / IBP",
              "Pre-season planning",
              "In-season reforecasting",
              "Inventory strategy",
              "Markdown optimization",
              "Assortment strategy",
              "Scenario planning",
            ].map((skill) => (
              <span
                key={skill}
                style={{
                  fontSize: 12,
                  padding: "6px 12px",
                  background: C.bg,
                  border: `0.5px solid ${C.border}`,
                  borderRadius: 999,
                  color: C.textBody,
                  fontFamily: FONT_SANS,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Leadership & Process */}
        <div style={{ marginBottom: 28 }}>
          <div
            style={{
              fontFamily: FONT_SERIF,
              fontSize: 16,
              fontWeight: 500,
              color: C.text,
              marginBottom: 14,
              letterSpacing: "-0.005em",
            }}
          >
            Leadership & Process
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {[
              "Cross-functional collaboration",
              "Team development",
              "Executive reporting",
              "Process design",
              "Vendor negotiation",
              "Stakeholder communication",
            ].map((skill) => (
              <span
                key={skill}
                style={{
                  fontSize: 12,
                  padding: "6px 12px",
                  background: C.bg,
                  border: `0.5px solid ${C.border}`,
                  borderRadius: 999,
                  color: C.textBody,
                  fontFamily: FONT_SANS,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Systems & Tools */}
        <div style={{ marginBottom: 40 }}>
          <div
            style={{
              fontFamily: FONT_SERIF,
              fontSize: 16,
              fontWeight: 500,
              color: C.text,
              marginBottom: 14,
              letterSpacing: "-0.005em",
            }}
          >
            Systems & Tools
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {[
              "Microsoft Office (Expert Excel)",
              "Google Workspace (Expert Sheets)",
              "BI Tools",
              "ERP & MRP Platforms",
              "Planning & Inventory Management Software",
              "Shopify",
              "Syndicated Data (Nielsen, SPINS)",
            ].map((skill) => (
              <span
                key={skill}
                style={{
                  fontSize: 12,
                  padding: "6px 12px",
                  background: C.bg,
                  border: `0.5px solid ${C.border}`,
                  borderRadius: 999,
                  color: C.textBody,
                  fontFamily: FONT_SANS,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Credentials block */}
        <div
          style={{
            fontSize: 11,
            color: C.pink,
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontWeight: 500,
            marginBottom: 20,
            fontFamily: FONT_SANS,
          }}
        >
          Credentials
        </div>
        <div style={{ display: "grid", gap: 18 }}>
          <div>
            <div
              style={{
                fontFamily: FONT_SERIF,
                fontSize: 16,
                fontWeight: 500,
                color: C.text,
                marginBottom: 2,
              }}
            >
              BS, Design & Merchandising — Drexel University
            </div>
            <div
              style={{
                fontSize: 13,
                color: C.textMuted,
                fontFamily: FONT_SANS,
                fontStyle: "italic",
              }}
            >
              cum laude
            </div>
          </div>
          <div>
            <div
              style={{
                fontFamily: FONT_SERIF,
                fontSize: 16,
                fontWeight: 500,
                color: C.text,
                marginBottom: 4,
              }}
            >
              Section AI Proficiency Certification{" "}
              <span style={{ color: C.textMuted, fontWeight: 400, fontSize: 13 }}>
                (2025)
              </span>
            </div>
            <div
              style={{
                fontSize: 13,
                color: C.textMuted,
                fontFamily: FONT_SANS,
                fontStyle: "italic",
              }}
            >
              AI Crash Course · AI for Corporate Finance · AI for Data Analysis
            </div>
          </div>
          <div>
            <div
              style={{
                fontFamily: FONT_SERIF,
                fontSize: 16,
                fontWeight: 500,
                color: C.text,
              }}
            >
              Google Digital Marketing & E-commerce Professional Certificate{" "}
              <span style={{ color: C.textMuted, fontWeight: 400, fontSize: 13 }}>
                (2024)
              </span>
            </div>
          </div>
          <div>
            <div
              style={{
                fontFamily: FONT_SERIF,
                fontSize: 16,
                fontWeight: 500,
                color: C.text,
                marginBottom: 4,
              }}
            >
              Women in Retail Leadership Circle{" "}
              <span style={{ color: C.textMuted, fontWeight: 400, fontSize: 13 }}>
                (2025 — Present)
              </span>
            </div>
            <div
              style={{
                fontSize: 13,
                color: C.textMuted,
                fontFamily: FONT_SANS,
                fontStyle: "italic",
                lineHeight: 1.55,
                maxWidth: 620,
              }}
            >
              Active member of an exclusive community of women executives at
              leading retailers and brands. Participates in peer group calls,
              professional development workshops, and networking with retail
              and CPG leadership.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA — resume request */}
      <div style={{ padding: "32px 48px 56px" }}>
        <div
          style={{
            border: `0.5px solid ${C.border}`,
            borderRadius: 8,
            padding: 28,
            background: C.bgDeep,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: FONT_SERIF,
                fontSize: 20,
                fontWeight: 500,
                color: C.text,
                marginBottom: 6,
                letterSpacing: "-0.01em",
              }}
            >
              Looking for a resume?
            </div>
            <div
              style={{
                fontSize: 14,
                color: C.textBody,
                fontFamily: FONT_SANS,
              }}
            >
              Send me a note and I'll share the most recent version.
            </div>
          </div>
          <a
            href="mailto:callie@callieplans.com?subject=Resume%20request"
            style={{
              fontSize: 14,
              color: C.pink,
              fontWeight: 500,
              fontFamily: FONT_SANS,
              textDecoration: "none",
              borderBottom: `1px solid ${C.pink}`,
              paddingBottom: 2,
            }}
          >
            Get in touch →
          </a>
        </div>
      </div>
    </>
  );
}

// ============================================================
// PLANNING LAB PAGE (sub-page of Work)
// ============================================================
function PlanningLabPage({ onNav }) {
  return (
    <>
      {/* Breadcrumb back to Work */}
      <div style={{ padding: "32px 48px 0" }}>
        <button
          onClick={() => onNav("work")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 12,
            color: C.textMuted,
            fontFamily: FONT_SANS,
            letterSpacing: "1px",
            textTransform: "uppercase",
            padding: 0,
            fontWeight: 500,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = C.pink;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = C.textMuted;
          }}
        >
          ← Back to Work
        </button>
      </div>

      {/* Hero */}
      <div style={{ padding: "24px 48px 40px" }}>
        <div
          style={{
            fontSize: 11,
            color: C.pink,
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontWeight: 500,
            marginBottom: 20,
            fontFamily: FONT_SANS,
          }}
        >
          Featured project
        </div>
        <h1
          style={{
            fontFamily: FONT_SERIF,
            fontSize: 64,
            fontWeight: 500,
            lineHeight: 1.02,
            margin: "0 0 24px",
            color: C.text,
            letterSpacing: "-0.025em",
          }}
        >
          The Planning Lab
        </h1>
        <p
          style={{
            fontSize: 20,
            lineHeight: 1.6,
            color: C.textBody,
            maxWidth: 680,
            margin: "0 0 32px",
            fontFamily: FONT_SANS,
          }}
        >
          A first-of-its-kind merchandise planning simulator. Step into the
          role of Director of Planning and navigate a full seasonal cycle —
          pre-season planning through end-of-season analysis — across two
          brand scenarios.
        </p>

        {/* Big play button */}
        <a
          href="https://the-planning-lab.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            padding: "18px 32px",
            background: C.pink,
            color: C.bg,
            fontSize: 15,
            fontWeight: 500,
            fontFamily: FONT_SANS,
            textDecoration: "none",
            borderRadius: 8,
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = C.pinkHover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = C.pink;
          }}
        >
          Play The Planning Lab →
        </a>
      </div>

      {/* Quick facts */}
      <div
        style={{
          padding: "28px 48px 36px",
          borderTop: `0.5px solid ${C.border}`,
          background: C.bgDeep,
        }}
      >
        <div
          className="grid-3-cols"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 14,
          }}
        >
          {[
            { label: "Rounds", value: "5" },
            { label: "Brand scenarios", value: "2" },
            { label: "Scoring", value: "Live" },
          ].map((fact) => (
            <div
              key={fact.label}
              style={{
                background: C.bg,
                border: `0.5px solid ${C.border}`,
                borderRadius: 8,
                padding: "22px 24px",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: C.textMuted,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  marginBottom: 8,
                  fontFamily: FONT_SANS,
                }}
              >
                {fact.label}
              </div>
              <div
                style={{
                  fontFamily: FONT_SERIF,
                  fontSize: 28,
                  fontWeight: 500,
                  color: C.text,
                  letterSpacing: "-0.015em",
                }}
              >
                {fact.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ============================================================
// TRAVEL PAGE
// ============================================================
const TRAVEL_PHOTOS = [
  { src: "/images/travel-01-bald-mountain-deer-valley.jpeg", caption: "Bald Mountain, Deer Valley" },
  { src: "/images/travel-02-point-lobos-carmel.jpeg", caption: "Point Lobos, Carmel" },
  { src: "/images/travel-03-palm-beach-florida.jpeg", caption: "Palm Beach, Florida" },
  { src: "/images/travel-04-maroon-bells-aspen.jpeg", caption: "Maroon Bells, Aspen" },
  { src: "/images/travel-05-joshua-tree-california.jpeg", caption: "Joshua Tree, California" },
  { src: "/images/travel-06-aspen-mountain-aspen.jpeg", caption: "Aspen Mountain, Aspen" },
  { src: "/images/travel-07-cumberland-island-georgia.jpeg", caption: "Cumberland Island, Georgia" },
  { src: "/images/travel-08-garrapata-big-sur.jpeg", caption: "Garrapata, Big Sur" },
  { src: "/images/travel-09-rimrock-sedona.jpeg", caption: "Rimrock, Sedona" },
  { src: "/images/travel-10-santa-cruz-island-channel-islands.jpeg", caption: "Santa Cruz Island, Channel Islands" },
  { src: "/images/travel-11-point-dume-malibu.jpeg", caption: "Point Dume, Malibu" },
  { src: "/images/travel-12-bald-mountain-deer-valley.jpeg", caption: "Bald Mountain, Deer Valley" },
];

function GalleryPhoto({ photo, isMobile }) {
  const [hovered, setHovered] = useState(false);
  const showCaption = isMobile || hovered;
  return (
    <div
      style={{
        position: "relative",
        aspectRatio: "3 / 4",
        background: C.bgDeep,
        borderRadius: 6,
        overflow: "hidden",
        border: `0.5px solid ${C.border}`,
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={photo.src}
        alt={photo.caption}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          padding: isMobile ? "10px 12px" : "14px 16px",
          background: isMobile
            ? "linear-gradient(to top, rgba(20,15,12,0.78) 0%, rgba(20,15,12,0.55) 60%, rgba(20,15,12,0) 100%)"
            : "linear-gradient(to top, rgba(20,15,12,0.82) 0%, rgba(20,15,12,0.6) 60%, rgba(20,15,12,0) 100%)",
          color: "#fff",
          fontSize: isMobile ? 12 : 13,
          fontFamily: FONT_SANS,
          letterSpacing: "0.01em",
          opacity: showCaption ? 1 : 0,
          transition: "opacity 0.25s ease",
          pointerEvents: "none",
        }}
      >
        {photo.caption}
      </div>
    </div>
  );
}

function TravelPage() {
  const isMobile = useIsMobile();
  return (
    <>
      {/* Custom header with two-paragraph intro */}
      <div style={{ padding: "36px 48px 36px", textAlign: "center" }}>
        <div
          style={{
            fontSize: 11,
            color: C.pink,
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontWeight: 500,
            marginBottom: 20,
            fontFamily: FONT_SANS,
          }}
        >
          Travel
        </div>
        <h1
          style={{
            fontFamily: FONT_SERIF,
            fontSize: 56,
            fontWeight: 500,
            lineHeight: 1.05,
            margin: "0 0 24px",
            color: C.text,
            letterSpacing: "-0.02em",
          }}
        >
          Trips worth taking.
        </h1>
        <p
          style={{
            fontSize: 18,
            lineHeight: 1.65,
            color: C.textBody,
            maxWidth: 640,
            margin: "0 auto 18px",
            fontFamily: FONT_SANS,
          }}
        >
          I have an equal love for urban sophistication and outdoor majesty,
          which usually means trips with a trailhead in the morning and a
          museum in the afternoon. I focus mostly on domestic travel and
          almost always plan trips around something to climb, walk, or explore
          on foot.
        </p>
        <p
          style={{
            fontSize: 18,
            lineHeight: 1.65,
            color: C.textBody,
            maxWidth: 640,
            margin: "0 auto",
            fontFamily: FONT_SANS,
          }}
        >
          I'm also a Certified Fora Travel Advisor, which means I plan trips
          for other people too. After years of doing it for myself, I know
          what makes a hotel worth staying at, a hike worth taking, and a
          city worth visiting twice.
        </p>
      </div>

      {/* Specialties section */}
      <div style={{ padding: "0 48px 32px" }}>
        <div
          style={{
            border: `0.5px solid ${C.border}`,
            borderRadius: 12,
            padding: "32px 36px",
            background: C.bgDeep,
          }}
        >
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                fontSize: 11,
                color: C.pink,
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontWeight: 500,
                marginBottom: 12,
                fontFamily: FONT_SANS,
              }}
            >
              I specialize in
            </div>
            <div
              className="specialty-row"
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "6px 0",
                fontSize: 16,
                color: C.textBody,
                lineHeight: 1.7,
                fontFamily: FONT_SANS,
              }}
            >
              {[
                "Hiking & Outdoor Adventure",
                "Wellness & Spa Travel",
                "Weekend Getaways",
                "Road Trips",
                "Solo Travel",
              ].map((item, i, arr) => (
                <React.Fragment key={item}>
                  <span className="specialty-item" style={{ whiteSpace: "nowrap" }}>{item}</span>
                  {i < arr.length - 1 && (
                    <span className="specialty-dot" style={{ color: C.textMuted, margin: "0 8px" }}>·</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: 11,
                color: C.pink,
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontWeight: 500,
                marginBottom: 12,
                fontFamily: FONT_SANS,
              }}
            >
              I know best
            </div>
            <div
              className="specialty-row"
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "6px 0",
                fontSize: 16,
                color: C.textBody,
                lineHeight: 1.7,
                fontFamily: FONT_SANS,
              }}
            >
              {["The Southwest", "The Mountain West", "The Southeast", "New England"].map((item, i, arr) => (
                <React.Fragment key={item}>
                  <span className="specialty-item" style={{ whiteSpace: "nowrap" }}>{item}</span>
                  {i < arr.length - 1 && (
                    <span className="specialty-dot" style={{ color: C.textMuted, margin: "0 8px" }}>·</span>
                  )}
                </React.Fragment>
              ))}
              <span className="specialty-suffix" style={{ color: C.textMuted, marginLeft: 8 }}>— with specialties in California and Florida.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Gallery */}
      <div style={{ padding: "0 48px 48px" }}>
        <h2
          style={{
            fontFamily: FONT_SERIF,
            fontSize: 24,
            fontWeight: 500,
            margin: "0 0 6px",
            color: C.text,
            letterSpacing: "-0.015em",
          }}
        >
          Gallery
        </h2>
        <p
          style={{
            fontSize: 14,
            color: C.textMuted,
            margin: "0 0 24px",
            fontFamily: FONT_SANS,
          }}
        >
          Recent trips and all-time favorites.
        </p>
        <div
          className="travel-gallery"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: 8,
          }}
        >
          {TRAVEL_PHOTOS.map((photo, i) => (
            <GalleryPhoto key={i} photo={photo} isMobile={isMobile} />
          ))}
        </div>
      </div>

      {/* Work With Me block */}
      <div style={{ padding: "0 48px 32px" }}>
        <div
          style={{
            border: `0.5px solid ${C.border}`,
            borderRadius: 12,
            padding: "36px 36px 32px",
            background: C.bgDeep,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: C.pink,
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontWeight: 500,
              marginBottom: 14,
              fontFamily: FONT_SANS,
            }}
          >
            Work with me
          </div>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.7,
              color: C.textBody,
              margin: "0 auto 18px",
              maxWidth: 640,
              fontFamily: FONT_SANS,
            }}
          >
            I plan trips for friends, family, and clients as a Certified Fora
            Travel Advisor — which means I can book hotels, resorts, and other
            travel experiences with perks like room upgrades, food and beverage
            credits, and early check-in that you can't get booking direct.
          </p>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.7,
              color: C.textBody,
              margin: "0 auto 28px",
              maxWidth: 640,
              fontFamily: FONT_SANS,
            }}
          >
            I'm happy to plan a whole itinerary from scratch or just book a
            hotel you've already chosen. I can be as involved (or as hands-off)
            as you want. Either way, you'll have a direct line to me before,
            during, and after your trip.
          </p>
          <div
            style={{
              fontFamily: FONT_SERIF,
              fontSize: 18,
              fontWeight: 500,
              color: C.text,
              marginBottom: 12,
              letterSpacing: "-0.005em",
            }}
          >
            Ready to start planning?
          </div>
          <a
            href="mailto:callie.shepard@fora.travel?subject=Trip%20inquiry"
            style={{
              display: "inline-block",
              padding: "12px 22px",
              background: C.pink,
              color: "#fff",
              fontSize: 14,
              fontWeight: 500,
              fontFamily: FONT_SANS,
              borderRadius: 999,
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = C.pinkHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = C.pink;
            }}
          >
            Get in touch →
          </a>
        </div>
      </div>

      {/* Places I keep returning to */}
      <div style={{ padding: "0 48px 48px" }}>
        <h2
          style={{
            fontFamily: FONT_SERIF,
            fontSize: 24,
            fontWeight: 500,
            margin: "0 0 20px",
            color: C.text,
            letterSpacing: "-0.015em",
          }}
        >
          Places I keep returning to
        </h2>
        <div
          className="grid-3-cols"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 14,
          }}
        >
          {[
            {
              name: "Coastal California",
              detail: "Big Sur, Carmel, Malibu",
              note: "The Pacific Coast Highway holds up to its reputation, and then some.",
            },
            {
              name: "The Southwest",
              detail: "Sedona, the Sonoran Desert",
              note: "Rust-red rock, dark skies, and the kind of silence that's hard to find anywhere else.",
            },
            {
              name: "The Rockies",
              detail: "Aspen, Park City, Rocky Mountain National Park",
              note: "Where the hiking, the shopping, and the spa days are all worth the altitude.",
            },
          ].map((place) => (
            <div
              key={place.name}
              style={{
                border: `0.5px solid ${C.border}`,
                borderRadius: 8,
                padding: "22px 22px 24px",
                background: C.bg,
              }}
            >
              <div
                style={{
                  fontFamily: FONT_SERIF,
                  fontSize: 18,
                  fontWeight: 500,
                  marginBottom: 6,
                  color: C.text,
                  letterSpacing: "-0.005em",
                }}
              >
                {place.name}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: C.textMuted,
                  fontFamily: FONT_SANS,
                  marginBottom: 12,
                  letterSpacing: "0.01em",
                }}
              >
                {place.detail}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: C.textBody,
                  fontFamily: FONT_SANS,
                  lineHeight: 1.55,
                }}
              >
                {place.note}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Closing CTA */}
      <div
        style={{
          padding: "48px 48px 80px",
          textAlign: "center",
          borderTop: `0.5px solid ${C.border}`,
        }}
      >
        <div
          style={{
            fontFamily: FONT_SERIF,
            fontSize: 36,
            fontWeight: 500,
            color: C.text,
            letterSpacing: "-0.02em",
            marginBottom: 24,
          }}
        >
          Thinking about a trip?
        </div>
        <a
          href="mailto:callie.shepard@fora.travel?subject=Trip%20inquiry"
          style={{
            display: "inline-block",
            padding: "14px 26px",
            background: C.pink,
            color: "#fff",
            fontSize: 14,
            fontWeight: 500,
            fontFamily: FONT_SANS,
            borderRadius: 999,
            textDecoration: "none",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = C.pinkHover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = C.pink;
          }}
        >
          Get in touch →
        </a>
      </div>
    </>
  );
}


// ============================================================
// FITNESS PAGE
// ============================================================
const FITNESS_HERO = "/images/fitness-01-hero.jpeg";
const FITNESS_MILESTONES = [
  { date: "April 2026", text: "Hit the 400 class mark at The Lab!", photos: ["/images/fitness-02-april-2026-hit-the-400-class-mark-at-the-lab.jpeg"] },
  { date: "June 2025", text: "Celebrated the 1-year anniversary of The Lab", photos: ["/images/fitness-03-june-2025-celebrated-the-1-year-anniversary-of-the.jpeg"] },
  { date: "Feb 2024", text: "Competed in my first HYROX race with my friend Robyn", photos: ["/images/fitness-04-feb-2024-competed-in-my-first-hyrox-race-with-my-f.jpeg"] },
  { date: "Nov 2023", text: "Ran the Lululemon 10K in Scottsdale, my first destination race", photos: ["/images/fitness-05-nov-2023-ran-the-lululemon-10k-in-scottsdale-my-fi.jpeg"] },
  { date: "Nov 2021", text: "Placed third in my first CrossFit competition at Outwork Addiction, raising funds for Temperance Training", photos: ["/images/fitness-06-nov-2021-placed-third-in-my-first-crossfit-competi.jpeg"] },
  { date: "Jan 2020", text: "Earned my Personal Training Certification from the National Academy of Sports Medicine", photos: ["/images/fitness-07-jan-2020-earned-my-personal-training-certification.jpeg"] },
  { date: "May 2019", text: "Braved the elements to complete a Spartan Race", photos: ["/images/fitness-08-may-2019-braved-the-elements-to-complete-a-spartan.jpeg"] },
  { date: "Nov 2018", text: "Raced my first half marathon, with my dad!", photos: ["/images/fitness-09-nov-2018-raced-my-first-half-marathon-with-my-dad.jpeg"] },
];

function FitnessPage() {
  const isMobile = useIsMobile();
  return (
    <>
      {/* Hero + Header side by side */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 20 : 32,
          padding: isMobile ? "24px 20px 24px" : "36px 48px 32px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <img
            src={FITNESS_HERO}
            alt="Celebrating at The Lab"
            style={{
              width: "100%",
              display: "block",
            }}
          />
        </div>
        <div>
          <div
            style={{
              fontSize: 11,
              color: C.pink,
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontWeight: 500,
              marginBottom: 20,
              fontFamily: FONT_SANS,
            }}
          >
            Fitness
          </div>
          <h1
            style={{
              fontFamily: FONT_SERIF,
              fontSize: isMobile ? 38 : 48,
              fontWeight: 500,
              lineHeight: 1.05,
              margin: "0 0 20px",
              color: C.text,
              letterSpacing: "-0.02em",
            }}
          >
            Stronger every year.
          </h1>
          <p
            style={{
              fontSize: isMobile ? 16 : 17,
              lineHeight: 1.65,
              color: C.textBody,
              margin: 0,
              fontFamily: FONT_SANS,
            }}
          >
            I discovered fitness in my late twenties and it changed the shape of
            my life. I never played sports growing up and knew nothing about
            lifting weights. What started as solo cardio sessions eventually
            became a daily practice, a community, and a complete transformation.
          </p>
          <button
            onClick={() => {
              const el = document.getElementById("fitness-reflection");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              marginTop: 16,
              fontSize: 13,
              color: C.pink,
              fontWeight: 500,
              fontFamily: FONT_SANS,
              display: "block",
            }}
          >
            Keep reading ↓
          </button>
        </div>
      </div>

      {/* Divider */}
      <div style={{ padding: isMobile ? "0 20px" : "0 48px" }}>
        <div style={{ borderTop: `0.5px solid ${C.border}` }} />
      </div>

      {/* Timeline */}
      <div style={{ padding: isMobile ? "24px 20px 40px" : "24px 48px 40px" }}>
        {isMobile ? (
          /* Mobile: simple single column with left line */
          <div style={{ position: "relative", paddingLeft: 28 }}>
            <div
              style={{
                position: "absolute",
                left: 4,
                top: 0,
                bottom: 0,
                width: 1,
                background: C.border,
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {FITNESS_MILESTONES.map((milestone, i) => (
                <div key={i} style={{ position: "relative" }}>
                  {/* Dot */}
                  <div
                    style={{
                      position: "absolute",
                      left: -28,
                      top: 16,
                      width: 9,
                      height: 9,
                      borderRadius: "50%",
                      background: C.pink,
                      border: `2px solid ${C.bg}`,
                      boxShadow: `0 0 0 1px ${C.border}`,
                    }}
                  />
                  <div
                    style={{
                      border: `0.5px solid ${C.border}`,
                      borderRadius: 10,
                      overflow: "hidden",
                      background: C.bg,
                    }}
                  >
                    <img
                      src={milestone.photos[0]}
                      alt={milestone.text}
                      loading="lazy"
                      style={{ width: "100%", display: "block" }}
                    />
                    <div style={{ padding: "12px 16px 14px" }}>
                      <div
                        style={{
                          fontSize: 11,
                          color: C.pink,
                          letterSpacing: "2px",
                          textTransform: "uppercase",
                          fontWeight: 500,
                          marginBottom: 4,
                          fontFamily: FONT_SANS,
                        }}
                      >
                        {milestone.date}
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          lineHeight: 1.5,
                          color: C.textBody,
                          fontFamily: FONT_SANS,
                        }}
                      >
                        {milestone.text}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Desktop: alternating with overlap */
          <div style={{ position: "relative" }}>
            {/* Vertical line */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                bottom: 0,
                width: 1,
                background: C.border,
                transform: "translateX(-0.5px)",
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {FITNESS_MILESTONES.map((milestone, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div
                    key={i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 24px 1fr",
                      alignItems: "start",
                      gap: 0,
                      marginTop: i === 0 ? 0 : -120,
                    }}
                  >
                    {/* Left side */}
                    <div style={{ padding: isLeft ? "0 20px 0 0" : "0" }}>
                      {isLeft && (
                        <div
                          style={{
                            border: `0.5px solid ${C.border}`,
                            borderRadius: 10,
                            overflow: "hidden",
                            background: C.bg,
                          }}
                        >
                          <img
                            src={milestone.photos[0]}
                            alt={milestone.text}
                            loading="lazy"
                            style={{ width: "100%", display: "block" }}
                          />
                          <div style={{ padding: "12px 16px 14px" }}>
                            <div
                              style={{
                                fontSize: 11,
                                color: C.pink,
                                letterSpacing: "2px",
                                textTransform: "uppercase",
                                fontWeight: 500,
                                marginBottom: 4,
                                fontFamily: FONT_SANS,
                              }}
                            >
                              {milestone.date}
                            </div>
                            <div
                              style={{
                                fontSize: 14,
                                lineHeight: 1.5,
                                color: C.textBody,
                                fontFamily: FONT_SANS,
                              }}
                            >
                              {milestone.text}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Center dot */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        paddingTop: 24,
                      }}
                    >
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          background: C.pink,
                          border: `2px solid ${C.bg}`,
                          boxShadow: `0 0 0 1px ${C.border}`,
                          zIndex: 1,
                        }}
                      />
                    </div>

                    {/* Right side */}
                    <div style={{ padding: isLeft ? "0" : "0 0 0 20px" }}>
                      {!isLeft && (
                        <div
                          style={{
                            border: `0.5px solid ${C.border}`,
                            borderRadius: 10,
                            overflow: "hidden",
                            background: C.bg,
                          }}
                        >
                          <img
                            src={milestone.photos[0]}
                            alt={milestone.text}
                            loading="lazy"
                            style={{ width: "100%", display: "block" }}
                          />
                          <div style={{ padding: "12px 16px 14px" }}>
                            <div
                              style={{
                                fontSize: 11,
                                color: C.pink,
                                letterSpacing: "2px",
                                textTransform: "uppercase",
                                fontWeight: 500,
                                marginBottom: 4,
                                fontFamily: FONT_SANS,
                              }}
                            >
                              {milestone.date}
                            </div>
                            <div
                              style={{
                                fontSize: 14,
                                lineHeight: 1.5,
                                color: C.textBody,
                                fontFamily: FONT_SANS,
                              }}
                            >
                              {milestone.text}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Closing reflection */}
      <div id="fitness-reflection" style={{ padding: "0 48px 28px", maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.8,
            color: C.textBody,
            margin: 0,
            fontFamily: FONT_SANS,
          }}
        >
          It was a gradual progression. I went from running on my own to joining
          group classes at Orangetheory, tried my hand at CrossFit, and pursued
          my personal training certification to better understand the science
          behind the work. I started training with my own coach, gained
          confidence in strength training, and became a founding member of The
          Lab Fitness & Social Club in Delray Beach, where I still train five
          days a week. Along the way I've run distances from 10Ks to a half
          marathon, competed in CrossFit, and raced HYROX. Going from someone
          who had never touched a barbell to someone others look up to in the
          fitness community is nothing short of extraordinary.
        </p>
      </div>

      {/* Pull quote */}
      <div
        style={{
          padding: "28px 48px 56px",
          textAlign: "center",
          borderTop: `0.5px solid ${C.border}`,
        }}
      >
        <p
          style={{
            fontFamily: FONT_SERIF,
            fontSize: 22,
            fontWeight: 500,
            lineHeight: 1.5,
            color: C.text,
            margin: "0 auto",
            maxWidth: 540,
            letterSpacing: "-0.01em",
          }}
        >
          The key to all of it has been consistency. Not talent, not a
          background in athletics, just showing up day after day and trusting
          the process.
        </p>
      </div>
    </>
  );
}


// ============================================================
// STYLE PAGE
// ============================================================
const STYLE_ENTRIES = [
  { title: "From the Heart to the Hands: Dolce & Gabbana", location: "Institute of Contemporary Art, Miami", date: "March 2026", description: "An immersive exhibit presenting garments as true works of art. The craftsmanship is extraordinary, and the passion, humor, and playfulness come through in every detail. Each room is its own world.", link: "https://icamiami.org/exhibition/from-the-heart-to-the-hands-dolcegabbana/", linkText: "On View Through June", photos: ["/images/style-01-from-the-heart-to-the-hands-dolce-gabbana.jpeg", "/images/style-02.jpeg", "/images/style-03.jpeg"] },
  { title: "Kips Bay Decorator Show House", location: "Palm Beach, Florida", date: "March 2026", description: "I've attended the annual Kips Bay Decorator Show House four times now and the experience never disappoints. Every room is completely transformed, and the chance to speak directly with the designers makes it personal. This year's waterfront location and expansion into a second house made it especially striking.", link: "https://www.kipsbaydecoratorshowhouse.org/pbplanyourvisit", linkText: "Learn more", photos: ["/images/style-04-kips-bay-decorator-show-house.jpeg", "/images/style-05.jpeg", "/images/style-06.jpeg"] },
];

function StylePage() {
  const isMobile = useIsMobile();
  return (
    <>
      {/* Custom header with tight spacing */}
      <div style={{ padding: isMobile ? "36px 20px 20px" : "36px 48px 24px", textAlign: "center" }}>
        <div
          style={{
            fontSize: 11,
            color: C.pink,
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontWeight: 500,
            marginBottom: 20,
            fontFamily: FONT_SANS,
          }}
        >
          Style
        </div>
        <h1
          style={{
            fontFamily: FONT_SERIF,
            fontSize: isMobile ? 38 : 56,
            fontWeight: 500,
            lineHeight: 1.05,
            margin: "0 0 16px",
            color: C.text,
            letterSpacing: "-0.02em",
          }}
        >
          On my radar.
        </h1>
        <p
          style={{
            fontSize: 18,
            lineHeight: 1.65,
            color: C.textBody,
            margin: "0 auto",
            maxWidth: 640,
            fontFamily: FONT_SANS,
          }}
        >
          Design and aesthetics have always been a part of my life. These days
          I find inspiration in art, fashion, and interior design, whether
          it's an exhibit, a beautifully designed space, a new city, or a
          store I stumble into while traveling.
        </p>
      </div>

      {/* Entries */}
      <div style={{ padding: isMobile ? "16px 20px 48px" : "16px 48px 48px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {STYLE_ENTRIES.map((entry, i) => (
            <div
              key={i}
              style={{
                border: `0.5px solid ${C.border}`,
                borderRadius: 12,
                overflow: "hidden",
                background: C.bg,
              }}
            >
              {/* Date + Title (above photos on both mobile and desktop) */}
              <div style={{ padding: isMobile ? "20px 20px 16px" : "24px 28px 16px" }}>
                <div
                  style={{
                    fontSize: 11,
                    color: C.pink,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    marginBottom: 8,
                    fontFamily: FONT_SANS,
                  }}
                >
                  {entry.date}
                </div>
                <h2
                  style={{
                    fontFamily: FONT_SERIF,
                    fontSize: isMobile ? 22 : 26,
                    fontWeight: 500,
                    margin: 0,
                    color: C.text,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {entry.title}
                </h2>
              </div>

              {/* Photos */}
              {isMobile ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {entry.photos.map((src, j) => (
                    <img
                      key={j}
                      src={src}
                      alt={entry.title}
                      loading="lazy"
                      style={{ width: "100%", display: "block" }}
                    />
                  ))}
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 4, padding: "0 4px" }}>
                  <img
                    src={entry.photos[0]}
                    alt={entry.title}
                    loading="lazy"
                    style={{ width: "100%", display: "block", borderRadius: 4 }}
                  />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
                    <img
                      src={entry.photos[1]}
                      alt={entry.title}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: 4 }}
                    />
                    <img
                      src={entry.photos[2]}
                      alt={entry.title}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: 4 }}
                    />
                  </div>
                </div>
              )}

              {/* Location, Description, Link (below photos) */}
              <div style={{ padding: isMobile ? "16px 20px 24px" : "20px 28px 28px" }}>
                <div
                  style={{
                    fontSize: 13,
                    color: C.textMuted,
                    marginBottom: 12,
                    fontFamily: FONT_SANS,
                  }}
                >
                  {entry.location}
                </div>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: C.textBody,
                    margin: 0,
                    fontFamily: FONT_SANS,
                  }}
                >
                  {entry.description}
                </p>
                {entry.link && (
                  <a
                    href={entry.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      marginTop: 14,
                      fontSize: 13,
                      color: C.pink,
                      fontWeight: 500,
                      fontFamily: FONT_SANS,
                      textDecoration: "none",
                      borderBottom: "1px solid " + C.pink,
                      paddingBottom: 2,
                    }}
                  >
                    {entry.linkText} →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Up Next */}
      <div style={{ padding: isMobile ? "0 20px 48px" : "0 48px 48px" }}>
        <h2
          style={{
            fontFamily: FONT_SERIF,
            fontSize: isMobile ? 22 : 24,
            fontWeight: 500,
            margin: "0 0 20px",
            color: C.text,
            letterSpacing: "-0.015em",
          }}
        >
          Up next
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            {
              timing: "On view through August 23",
              title: "Dior: Crafting Fashion",
              location: "SCAD FASH, Atlanta",
              description: "A retrospective exploring seven decades of craftsmanship, technique, and artistry at the house of Dior",
              link: "https://www.scadfash.org/exhibitions/exhibition-dior-crafting-fashion",
              linkText: "Learn more",
            },
            {
              timing: "In theaters May 1",
              title: "The Devil Wears Prada 2",
              location: "",
              description: "Highly anticipated sequel to the beloved film, inspired by the life of Vogue editor Anna Wintour and her team",
              link: "https://www.20thcenturystudios.com/movies/the-devil-wears-prada-2",
              linkText: "Learn more",
            },
            {
              timing: "Opens May 10",
              title: "Costume Art",
              location: "The Metropolitan Museum of Art, New York",
              description: "The Met Costume Institute's celebrated annual spring exhibition, opening to the public following The Met Gala on May 4",
              link: "https://www.metmuseum.org/exhibitions/costume-art",
              linkText: "Learn more",
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                borderLeft: `3px solid ${C.pink}`,
                background: C.bgDeep,
                borderRadius: 0,
                padding: isMobile ? "14px 16px" : "16px 20px",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: C.pink,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  marginBottom: 6,
                  fontFamily: FONT_SANS,
                }}
              >
                {item.timing}
              </div>
              <div
                style={{
                  fontFamily: FONT_SERIF,
                  fontSize: isMobile ? 16 : 17,
                  fontWeight: 500,
                  margin: "0 0 4px",
                  color: C.text,
                  letterSpacing: "-0.005em",
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: C.textMuted,
                  marginBottom: item.description ? 4 : (item.link ? 8 : 0),
                  fontFamily: FONT_SANS,
                  lineHeight: 1.5,
                }}
              >
                {item.location}
              </div>
              {item.description && (
                <div
                  style={{
                    fontSize: 13,
                    color: C.textMuted,
                    marginBottom: item.link ? 8 : 0,
                    fontFamily: FONT_SANS,
                    lineHeight: 1.5,
                  }}
                >
                  {item.description}
                </div>
              )}
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 13,
                    color: C.pink,
                    fontWeight: 500,
                    fontFamily: FONT_SANS,
                    textDecoration: "none",
                    borderBottom: `1px solid ${C.pink}`,
                    paddingBottom: 2,
                  }}
                >
                  {item.linkText} →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
// ============================================================
// ============================================================
// ABOUT PAGE
// ============================================================
function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Nice to meet you."
      />

      <div style={{ padding: "0 48px 48px", maxWidth: 720, margin: "0 auto" }}>
        <div style={{ fontFamily: FONT_SANS, fontSize: 16, lineHeight: 1.8, color: C.textBody, textAlign: "center" }}>
          <p style={{ margin: "0 0 20px" }}>
            I'm a demand planning leader with fourteen years of experience
            across fashion and consumer products. I've built planning
            infrastructure from the ground up, led forecasting across complex
            product portfolios, and partnered cross-functionally across
            merchandising, finance, marketing, and supply chain. It's work I
            genuinely love.
          </p>
          <p style={{ margin: "0 0 20px" }}>
            I've been drawn to retail for as long as I can remember. I was
            working in stores by age 16 and taking classes at FIT before I'd
            even started college. I studied Design & Merchandising at Drexel
            and landed my first job on the buying team at Bloomingdale's.
            That's where I built my foundation in retail fundamentals:
            merchandising, analysis, and strategy. I learned to interpret data
            as a story about the customer, and planning turned out to be the
            right home for me: part analysis, part instinct, part
            collaboration.
          </p>
          <p style={{ margin: 0 }}>
            After spending most of my life in the Northeast, I relocated to
            South Florida in 2016. I put down roots in Delray Beach, building
            relationships, trying new things, and leaning into the local
            community. I discovered a passion for fitness, eventually earning
            my personal training certification and embracing an active
            lifestyle that's now central to my routine. I uncovered a love for
            hiking and the outdoors that completely changed how I spend my
            time off. I enjoyed planning those trips so much that I became a
            travel advisor, helping others shape their own memorable
            adventures. What connects all of it is the same impulse that drew
            me to retail: a curiosity about how things work and a desire to
            help people experience them at their best.
          </p>
        </div>

        {/* Contact - Format C: Card */}
        <div
          style={{
            marginTop: 48,
            padding: 32,
            background: C.bgDeep,
            borderRadius: 12,
            border: `0.5px solid ${C.border}`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: C.pink,
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontWeight: 500,
              marginBottom: 14,
              fontFamily: FONT_SANS,
            }}
          >
            Get in touch
          </div>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.7,
              color: C.textBody,
              margin: "0 0 20px",
              fontFamily: FONT_SANS,
            }}
          >
            I'd love to hear from you.
          </p>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center" }}>
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: C.textMuted,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  marginBottom: 8,
                  fontFamily: FONT_SANS,
                }}
              >
                Email
              </div>
              <a
                href="mailto:callie@callieplans.com"
                style={{
                  fontSize: 14,
                  color: C.pink,
                  fontWeight: 500,
                  textDecoration: "none",
                  fontFamily: FONT_SANS,
                  borderBottom: `1px solid ${C.pink}`,
                  paddingBottom: 2,
                }}
              >
                callie@callieplans.com
              </a>
            </div>
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: C.textMuted,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  marginBottom: 8,
                  fontFamily: FONT_SANS,
                }}
              >
                Connect
              </div>
              <a
                href="https://www.linkedin.com/in/callie-shepard/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 14,
                  color: C.pink,
                  fontWeight: 500,
                  textDecoration: "none",
                  fontFamily: FONT_SANS,
                  borderBottom: `1px solid ${C.pink}`,
                  paddingBottom: 2,
                }}
              >
                LinkedIn →
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ============================================================
// MAIN APP
// ============================================================

// Map between URL paths and page keys
const PAGE_TO_PATH = {
  home: "/",
  work: "/work",
  "planning-lab": "/planning-lab",
  travel: "/travel",
  fitness: "/fitness",
  style: "/style",
  about: "/about",
};
const PATH_TO_PAGE = Object.fromEntries(
  Object.entries(PAGE_TO_PATH).map(([k, v]) => [v, k])
);

function getPageFromPath() {
  if (typeof window === "undefined") return "home";
  return PATH_TO_PAGE[window.location.pathname] || "home";
}

export default function CallieShepardSite() {
  const [page, setPageState] = useState(getPageFromPath);

  // Wrap setPage to also update the URL
  const setPage = (newPage) => {
    setPageState(newPage);
    const path = PAGE_TO_PATH[newPage] || "/";
    if (window.location.pathname !== path) {
      window.history.pushState({ page: newPage }, "", path);
    }
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const onPopState = () => {
      setPageState(getPageFromPath());
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Load fonts from Google Fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case "work":
        return <WorkPage onNav={setPage} />;
      case "planning-lab":
        return <PlanningLabPage onNav={setPage} />;
      case "travel":
        return <TravelPage />;
      case "fitness":
        return <FitnessPage />;
      case "style":
        return <StylePage />;
      case "about":
        return <AboutPage />;
      default:
        return <HomePage onNav={setPage} />;
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.bg,
        fontFamily: FONT_SANS,
      }}
      className="callie-site-root"
    >
      <style>{`
        @media (max-width: 720px) {
          .callie-site-page > div {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
          .callie-site-page h1 {
            font-size: 38px !important;
            line-height: 1.05 !important;
          }
          .callie-site-page h2 {
            font-size: 22px !important;
          }
          .callie-site-page h3 {
            font-size: 22px !important;
          }
          .callie-site-page .grid-3-cols {
            grid-template-columns: 1fr !important;
          }
          .callie-site-page .grid-2-cols {
            grid-template-columns: 1fr !important;
          }
          .callie-site-page .grid-experience {
            grid-template-columns: 1fr !important;
            gap: 8px !important;
          }
          .callie-site-page .travel-gallery {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 12px !important;
          }
          .callie-site-page .specialty-row {
            row-gap: 2px !important;
            line-height: 1.5 !important;
          }
          .callie-site-page .specialty-dot {
            display: none !important;
          }
          .callie-site-page .specialty-item {
            display: block !important;
            width: 100% !important;
          }
          .callie-site-page .specialty-suffix {
            display: block !important;
            margin-left: 0 !important;
            margin-top: 4px !important;
          }
        }
        @media (min-width: 721px) and (max-width: 960px) {
          .callie-site-page .travel-gallery {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }
        }
      `}</style>
      <div
        style={{
          width: "100%",
          maxWidth: 1200,
          margin: "0 auto",
          background: C.bg,
          overflow: "hidden",
        }}
        className="callie-site-page"
      >
        <Nav current={page} onNav={setPage} />
        {renderPage()}
        <Footer />
      </div>
    </div>
  );
}
