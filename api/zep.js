export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).json({ message: "options ok" });
  }

  if (req.method === "GET") {
    // ZEP의 유효성 검사 요청에 대응
    return res.status(200).json({ message: "get ok" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const payload = req.body;
  const message = `[ZEP 알림] ${payload.userId || '누군가'}님이 ${payload.event || '이벤트'} 하셨습니다.`;

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: message }),
  });

  if (response.ok) {
    return res.status(200).json({ message: "✅ 전송 성공" });
  } else {
    return res.status(500).json({ message: "❌ 전송 실패" });
  }
}
