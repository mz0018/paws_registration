# rate_limiter.py
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from fastapi.responses import JSONResponse
from fastapi import FastAPI, Request
from starlette import status

class RateLimiter:
    def __init__(self, app: FastAPI):
        self.limiter = Limiter(key_func=get_remote_address)
        app.state.limiter = self.limiter

        # global exception handler
        @app.exception_handler(RateLimitExceeded)
        async def ratelimit_handler(request: Request, exc: RateLimitExceeded):
            return JSONResponse(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                content={"detail": "Too many requests, try again later."},
            )

    def limit(self, times: str):
        """Return decorator to apply to endpoint"""
        return self.limiter.limit(times)