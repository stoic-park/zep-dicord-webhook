export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    // CORS 사전 요청 대응
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  
  const payload = req.body;

  // ZEP 이벤트에서 메시지 생성
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
