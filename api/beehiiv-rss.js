export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    return res.status(200).end();
  }

  try {
    const RSS_URL = "https://rss.beehiiv.com/feeds/eCyOihg7Fq.xml";

    const rssRes = await fetch(RSS_URL);
    if (!rssRes.ok) {
      return res.status(rssRes.status).json({ error: "Upstream RSS error" });
    }

    const xml = await rssRes.text();

    res.setHeader("Content-Type", "application/xml");
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");

    return res.status(200).send(xml);
  } catch (e) {
    return res.status(500).json({ error: "Failed to load RSS" });
  }
}
