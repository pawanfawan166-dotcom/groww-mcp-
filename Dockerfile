FROM python:3.12-slim

WORKDIR /app
COPY pyproject.toml README.md ./
COPY src ./src

RUN pip install --no-cache-dir .

ENV GROWW_MCP_HOST=0.0.0.0
ENV GROWW_MCP_PORT=8000
ENV GROWW_MOCK_MODE=1
EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
