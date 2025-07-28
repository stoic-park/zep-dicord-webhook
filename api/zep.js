export default async function handler(req, res) {
  // ZEP의 사전 요청(OPTIONS 또는 GET)에 응답
  if (req.method === "OPTIONS" || req.method === "GET") {
    return res.status(200).send("OK");
  }

  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const payload = req.body;
  const message = `[ZEP 알림] ${payload.userId || '누군가'}님이 ${payload.event || '이벤트'} 하셨습니다.`;

  const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

  const discordRes = await fetch(DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: message }),
  });

  if (discordRes.ok) {
    return res.status(200).send("✅ 전송 성공");
  } else {
    return res.status(500).send("❌ 전송 실패");
  }
}
