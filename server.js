import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 10000;

app.get("/proxy", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const number = req.query.number;
  if (!number) return res.json({ error: "missing number" });

  const api = "https://api.uspeoplesearch.net/tcpa/v1?x=" + encodeURIComponent(number);
  try {
    const r = await fetch(api);
    const text = await r.text();
    res.type("application/json").send(text);
  } catch (e) {
    res.json({ error: "fetch_failed", details: e.message });
  }
});

app.listen(PORT, () => console.log("Proxy running on port", PORT));
