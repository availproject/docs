// NOTE: In-memory rate limiter. On serverless platforms each cold start
// gets a fresh Map, so this only limits bursts within a single instance.
// For production-grade limiting, use a Redis-backed solution.

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 10;
let requestsSinceCleanup = 0;

function trustedProxyHops(): number {
  const hops = Number(process.env.TRUSTED_PROXY_HOPS);
  return Number.isInteger(hops) && hops > 0 ? hops : 1;
}

// Clients can send their own X-Forwarded-For, and proxies append to it, so
// only entries counted from the right can be trusted.
export function getClientIp(request: Request): string {
  const forwarded = (request.headers.get("x-forwarded-for") ?? "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);

  if (forwarded.length > 0) {
    const index = Math.max(forwarded.length - trustedProxyHops(), 0);
    return forwarded[index] ?? "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  // Lazy cleanup every 100 requests
  requestsSinceCleanup++;
  if (requestsSinceCleanup >= 100) {
    requestsSinceCleanup = 0;
    for (const [key, value] of rateLimitMap) {
      if (now > value.resetAt) rateLimitMap.delete(key);
    }
  }

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}
