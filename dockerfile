FROM node:22-slim AS builder

# 1. 빌드 도구 설치
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 2. 패키지 파일 복사
COPY package.json package-lock.json svelte.config.js ./

# 3. 전체 의존성 설치 (dev 포함)
RUN npm ci

# 4. 소스 코드 복사
COPY . .
ENV DATABASE_URL=local.db

# 5. 데이터베이스 마이그레이션
RUN npx drizzle-kit push --force

# 6. 프로덕션 빌드
RUN npm run build

# 7. devDependencies 제거
RUN npm prune --production

# ---------------------------
# 런타임 단계 (경량화)
# ---------------------------
FROM node:22-slim

# 8. 기본 'node' 사용자 활용:
RUN mkdir -p /app && chown -R node:node /app
USER node
WORKDIR /app

# 9. 빌드 결과물만 복사
COPY --from=builder --chown=node:node /app/build ./build
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node package.json .
# 10. 마이그래이션 된 데이터베이스 파일 복사
COPY --from=builder --chown=node:node /app/local.db ./local.db

# 11. 실행 설정
EXPOSE 3000
# 12. 환경 변수 설정
ENV NODE_ENV=production
ENV DATABASE_URL=local.db
# 13. 빌드된 애플리케이션 실행
CMD ["node", "-r", "dotenv/config", "build"]
