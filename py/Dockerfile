FROM python:3.12-slim

RUN apt-get update && apt-get install -y --no-install-recommends ffmpeg \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app/py

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt gunicorn

COPY . .

RUN mkdir -p /app/py/dist \
    && chown -R 1000:1000 /app

ENV PORT=8080
ENV PYTHONUNBUFFERED=1
ENV HOME=/app/py

EXPOSE 8080

USER 1000:1000

CMD ["sh", "-c", "gunicorn --bind 0.0.0.0:${PORT:-8080} server:app"]
