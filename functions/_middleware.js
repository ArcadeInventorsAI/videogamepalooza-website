// Legacy 301 redirects — preserve years of Search Console equity from the old Video Game Palooza site.
// Only explicitly-listed old paths redirect; every current route falls through to next(). Loop-safe.

const EXACT = {
  "/home": "/",
  "/about": "/about/", "/faq": "/about/", "/privacy-policy": "/about/",
  "/terms-conditions": "/about/", "/passport-hi-tech": "/about/", "/passport-hi-teach": "/about/",
  // give / donate / volunteer
  "/donate": "/get-involved/#donate", "/donate-2": "/get-involved/#donate",
  "/fund-raising": "/get-involved/#donate", "/volunteer": "/get-involved/#volunteer",
  "/bring-a-friend": "/get-involved/", "/thanks-for-subscribing": "/get-involved/",
  // retro charity arcade (all the arcade / hospital / museum / news about it)
  "/charity-arcade": "/retro-charity-arcade/", "/charityarcade": "/retro-charity-arcade/",
  "/hospital-donations": "/retro-charity-arcade/",
  "/indiana-state-museum-and-our-charity-arcade": "/retro-charity-arcade/",
  "/onsite-gaming-events": "/retro-charity-arcade/",
  "/newest-vgp-retro-charity-arcade-opens-at-circle-centre-mall-downtown-indianapolis": "/retro-charity-arcade/",
  "/serious-fun-carmel-couple-opens-retro-video-arcade-to-fund-scholarships-for-it-career-training-carmel-current-cover-story": "/retro-charity-arcade/",
  // programs (training + STEM/youth)
  "/stem-programs": "/programs/", "/stem-video-game-challenge-and-development": "/programs/",
  "/coding-stem-learning": "/programs/", "/adult-education": "/programs/",
  "/adult-education-programs": "/programs/", "/after-school-programs": "/programs/",
  "/intro-to-video-game-design": "/programs/", "/custom-game-development": "/programs/",
  "/diversity-and-women-in-video-games": "/programs/", "/diversity-in-gaming": "/programs/",
  "/esports-tournaments": "/programs/", "/esportseducation": "/programs/", "/exergaming": "/programs/",
  "/student-programs": "/programs/", "/summer-camps": "/programs/", "/senior-gaming": "/programs/",
  "/mobile-phone-game-creation": "/programs/", "/video-games-graphics": "/programs/",
  "/video-game-live-broadcasting": "/programs/", "/web-design-animation": "/programs/",
  "/stem-diversity-and-equal-jobs": "/programs/", "/young-video-game-developer-workbook": "/programs/",
  "/free": "/programs/", "/why-games-are-great-for-kids": "/programs/",
  "/gamification-k-12-teachers-game-the-system-to-innovate-education": "/programs/",
  "/video-game-summer-camps": "/programs/", "/videogame-camps": "/programs/",
  "/ed-fries-young-game-developer-advice": "/programs/",
  "/inspiration-for-young-game-developers-from-xbox-co-founder-ed-fries": "/programs/",
  "/videogamehof": "/programs/",
  // news / events / stories -> impact
  "/news": "/impact/", "/blog": "/impact/", "/events": "/impact/", "/calendar": "/impact/",
  "/check-out-our-new-video-game-palooza-facebook-site": "/impact/",
  "/video-game-palooza-website-goes-live": "/impact/",
  // store / account (no store) -> get involved
  "/shop": "/get-involved/", "/cart": "/get-involved/", "/checkout": "/get-involved/",
  "/my-account": "/get-involved/", "/my-profile": "/get-involved/",
};

// Prefix matches (ordered, most specific first) — none can be the start of a current route.
const PREFIX = [
  ["/video-game-camps", "/programs/"],
  ["/camp-landing-pages", "/programs/"],
  ["/createandplaycamps", "/programs/"],
  ["/portfolio", "/programs/"],
  ["/stem-video-game-challenge", "/programs/"],
  ["/harrison-hill-elementary", "/impact/"],
  ["/palooza-news", "/impact/"],
  ["/our-events", "/impact/"],
  ["/event/", "/impact/"],
  ["/video-game-palooza-", "/impact/"],
  ["/satya-nadella", "/impact/"],
  ["/official-rules", "/impact/"],
  ["/we-are-giving-away", "/impact/"],
  ["/charity-arcade", "/retro-charity-arcade/"],
  ["/charityarcade", "/retro-charity-arcade/"],
  ["/hospital-donations", "/retro-charity-arcade/"],
  ["/fund-raising", "/get-involved/#donate"],
  ["/donate", "/get-involved/#donate"],
  ["/volunteer", "/get-involved/#volunteer"],
  ["/my-account", "/get-involved/"],
  // old theme slider/junk
  ["/pexservice", "/programs/"],
  ["/pexcontentslider", "/"],
  ["/pexnivoslider", "/"],
  ["/pextestimonial", "/impact/"],
];

const stripSlash = (s) => (s.length > 1 ? s.replace(/\/+$/, "") : s);

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // canonical host: www.* -> apex
  if (url.hostname.startsWith("www.")) {
    return Response.redirect("https://" + url.hostname.slice(4) + url.pathname + url.search, 301);
  }

  const path = url.pathname;
  if (path.startsWith("/api/") || path.startsWith("/_astro/") ||
      path.startsWith("/img/") || path.startsWith("/assets/") || path.startsWith("/fonts/")) {
    return next();
  }

  const norm = stripSlash(path);
  const exact = EXACT[norm];
  if (exact && norm !== stripSlash(exact.split("#")[0])) {
    return Response.redirect(url.origin + exact, 301);
  }
  for (const [from, to] of PREFIX) {
    if (norm === from || norm.startsWith(from)) {
      if (norm !== stripSlash(to.split("#")[0])) {
        return Response.redirect(url.origin + to, 301);
      }
    }
  }
  return next();
}
