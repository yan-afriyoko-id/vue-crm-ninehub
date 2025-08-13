FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=development
ENV CI=true

EXPOSE 8080

CMD ["sh", "-c", "if [ -f package-lock.json ]; then npm ci; else npm install; fi && npm run dev -- --host 0.0.0.0 --port 8080"]


