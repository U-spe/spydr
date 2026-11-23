FROM node:22-bookworm-slim

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app

# Copy manifests first so the root postinstall can install the web runtime.
COPY package*.json ./
COPY web/package.json ./web/package.json

RUN npm install --omit=dev --no-audit --no-fund

# Copy the complete SPYDR application, including web runtime sources and assets.
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
