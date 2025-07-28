export default async function handler(req, res) {
  // 필수 CORS 헤더
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Preflight 대응
  if (req.method === "OPTIONS") {
    return res.status(200).send("success");
  }

  // GET 요청 대응 (유효성 확인용)
  if (req.method === "GET") {
    return res.status(200).send("success");
  }

  // POST만 실제 처리
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const payload = req.body;

  const message = `[ZEP 알림]
- 닉네임: ${payload.nickname}
- 이벤트: ${payload.eventType}
- 맵 ID: ${payload.map_hashID}
- 유저 ID: ${payload.userId}
- 유저 키: ${payload.userKey}`;

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: message }),
  });

  // 🚨 여기 중요: 응답은 반드시 plain text로 "success"
  return res.status(200).send("success");
}
