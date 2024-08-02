FROM python:3.9

WORKDIR /app

RUN apt-get update \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV ENVIRONMENT=testing
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
