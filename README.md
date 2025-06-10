# 실행 방법

## 1. 개발 환경에서 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```
- 브라우저에서 [http://localhost:5173](http://localhost:5173) (또는 출력된 포트)로 접속

---

## 2. 프로덕션 빌드

```bash
npm run build
```
- 빌드 결과물은 `build/` 디렉토리에 생성

---

## 3. Docker로 실행

### 1) 이미지 빌드

```bash
docker build -t pomo-todo .
```

### 2) 컨테이너 실행

```bash
docker run -p 8081:3000 pomo-todo
```
- 브라우저에서 [http://localhost:8081](http://localhost:8081) 접속

---

## 4. 데이터베이스 마이그레이션

- Docker 빌드 시 자동으로 마이그레이션이 실행되어 `local.db`가 생성됩니다.
- 직접 마이그레이션하려면:
  ```bash
  npx drizzle-kit push --force
  ```

---