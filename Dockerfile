# Build stage
FROM node:19-bullseye-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM node:19-bullseye-slim

WORKDIR /app

# 只复制必要的文件
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# 只安装生产环境依赖
RUN npm install --production

EXPOSE 3000

CMD ["npm", "start"]

