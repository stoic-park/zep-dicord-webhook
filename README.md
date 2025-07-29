# ZEP to Discord Webhook

ZEP의 접속 이벤트를 Discord 채널로 실시간 전달하는 Vercel 기반 Webhook 프로젝트입니다. ZEP의 외부 알림 기능을 활용하여, 사용자 접속/퇴장 이벤트를 감지하고 Discord 채널에 메시지를 전송합니다.

---

## 🔧 사용 기술

* **ZEP Webhook (API 연동)**
* **Vercel Serverless Functions** (`api/webhook.ts`)
* **Discord Webhook API**
* TypeScript
* Node.js (ES Modules)

---

## 🧱 프로젝트 구조

```
zep-to-discord/
├── api/
│   └── webhook.ts       # ZEP Webhook을 수신하고 Discord로 전달하는 Vercel 서버리스 함수
├── .env                 # Discord Webhook URL을 설정하는 환경 변수
├── vercel.json          # Vercel 구성 파일
└── README.md
```

---

## 🚀 사용 방법

### 1. Discord Webhook 생성

1. 디스코드 채널 설정 → 통합 → Webhook 생성
2. 생성된 Webhook URL을 `.env`에 등록

```
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
```

### 2. Vercel에 배포

1. Vercel 계정 생성 및 로그인
2. GitHub 저장소 연결 후 자동 배포 또는 `vercel` CLI 사용
3. `.env` 환경 변수 설정은 Vercel Dashboard에서 `DISCORD_WEBHOOK_URL`로 지정

### 3. ZEP 외부 알림 설정

1. ZEP의 [외부 알림 앱](https://docs.channel.io/zep-guide/ko/articles/%EC%99%B8%EB%B6%80-%EC%95%8C%EB%A6%BC-%EC%97%B0%EA%B2%B0-7265cd55) 열기
2. `API 연결` 탭에서 아래의 URL 입력

```
https://{vercel-project-name}.vercel.app/api/webhook
```

3. 알림 이벤트는 `접속`, `퇴장` 등이 있으며, 요청 본문은 아래와 같은 형태입니다:

```
{
  "date": "2025-07-28 23:37:46",
  "nickname": "박성택",
  "type": "enter",
  "map_hashID": "dJQ3Yz",
  "userId": "2r8WGV",
  "userKey": "-"
}
```

---

## ✅ 결과 예시

ZEP에서 접속 이벤트 발생 시 Discord 채널에 다음과 같은 메시지가 전송됩니다:

```
박성택님이 접속했습니다.
```

또는

```
박성택님이 퇴장했습니다.
```

---

## 📌 참고

- ZEP의 메신저 알림(Slack, Teams 등)은 별도로 제공되며 Discord는 직접 연동 필요
- Webhook이 아닌 API 방식으로 연결해야 정상 동작합니다 (2025년 7월 기준)
