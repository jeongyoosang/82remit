# 82Remit

전화번호 기반 USDT 간편송금 서비스 MVP

## 🚀 프로젝트 개요

82Remit은 전화번호만으로 USDT를 간편하게 송금할 수 있는 서비스입니다. TRON 네트워크를 활용하여 빠르고 안전한 송금을 제공합니다.

## ✨ 주요 기능

- **전화번호 기반 송금**: 복잡한 지갑 주소 대신 전화번호로 간편 송금
- **Web3Auth 연동**: 다양한 월렛으로 로그인 가능
- **Firebase 백엔드**: 실시간 데이터베이스 및 인증
- **TRON 네트워크**: USDT 송금 및 잔액 조회
- **반응형 UI**: 모바일과 데스크톱 모두 지원

## 🛠️ 기술 스택

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth, Web3Auth
- **Database**: Firebase Firestore
- **Blockchain**: TRON Network (USDT)
- **Deployment**: Vercel

## 📁 프로젝트 구조

```
82remit-template/
├── components/          # 재사용 가능한 컴포넌트
├── lib/                # 라이브러리 설정
│   ├── firebase.ts     # Firebase 설정
│   ├── web3auth.ts     # Web3Auth 설정
│   └── tron.ts         # TRON 네트워크 연동
├── pages/              # 페이지 컴포넌트
│   ├── index.tsx       # 홈페이지 (로그인)
│   ├── dashboard.tsx   # 대시보드
│   ├── send.tsx        # 송금 페이지
│   └── history.tsx     # 거래 내역
├── public/             # 정적 파일
└── package.json        # 의존성 관리
```

## 🚀 시작하기

### 1. 저장소 클론

```bash
git clone https://github.com/jeongyoosang/82remit.git
cd 82remit
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

`env.example` 파일을 `.env.local`로 복사하고 필요한 값들을 입력하세요:

```bash
cp env.example .env.local
```

필요한 환경 변수:
- Firebase 설정
- Web3Auth 클라이언트 ID
- TRON API 키

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 🔧 설정 가이드

### Firebase 설정

1. [Firebase Console](https://console.firebase.google.com/)에서 새 프로젝트 생성
2. Authentication과 Firestore 활성화
3. 웹 앱 추가 및 설정 정보 복사
4. `.env.local`에 설정 정보 입력

### Web3Auth 설정

1. [Web3Auth Console](https://dashboard.web3auth.io/)에서 새 프로젝트 생성
2. 클라이언트 ID 복사
3. `.env.local`에 클라이언트 ID 입력

### TRON 네트워크 설정

1. [TRON Grid](https://www.trongrid.io/)에서 API 키 발급
2. `.env.local`에 API 키 입력

## 📱 사용법

### 1. 로그인
- Google 계정으로 로그인 또는 Web3 월렛으로 연결

### 2. 송금하기
- 받는 사람 이름 입력
- 전화번호 입력 (자동 포맷팅)
- 송금 금액 입력
- 송금 실행

### 3. 거래 내역 확인
- 송금/수신 내역 필터링
- 트랜잭션 상태 및 해시 확인

## 🚀 배포

### Vercel 배포

1. GitHub 저장소와 Vercel 연결
2. 환경 변수 설정
3. 자동 배포 활성화

### 수동 배포

```bash
npm run build
npm run start
```

## 🔒 보안 고려사항

- 환경 변수는 절대 공개 저장소에 커밋하지 마세요
- Firebase 보안 규칙 설정
- TRON API 키 보안 관리
- 사용자 데이터 암호화

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해 주세요.

---

**82Remit** - 전화번호 기반 USDT 간편송금의 새로운 시작