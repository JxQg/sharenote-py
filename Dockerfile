FROM python:3.11-alpine AS builder
WORKDIR /sharenote-py
#RUN apk add --no-cache gcc musl-dev
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

FROM python:3.11-alpine
WORKDIR /sharenote-py
COPY --from=builder /root/.local /root/.local

COPY main.py gunicorn.conf.py ./
COPY assets/ ./assets
COPY conf/ ./conf

ENV PATH="/root/.local/bin:${PATH}"

CMD ["gunicorn", "main:flask_app"]