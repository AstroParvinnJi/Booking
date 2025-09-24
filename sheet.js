export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    // ✅ CORS preflight response
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  if (req.method === "POST") {
    try {
      // Jo data frontend se aayega
      const body = req.body;

      // Google Apps Script endpoint
      const scriptUrl = "https://script.google.com/macros/s/AKfycbxrjdkY-MmFlJWwPJMk79e289yQEMvd0aX_DE3YHD1Yw2LQwWpBncBG10CR2Ca0L3fd/exec";

      // Forward request to Google Apps Script
      const response = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(200).json(result);
    } catch (err) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(405).json({ error: "Method not allowed" });
  }
}
