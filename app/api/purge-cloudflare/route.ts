import { NextResponse } from "next/server";

export async function POST() {
  const zoneId = process.env.CF_ZONE_ID;
  const apiToken = process.env.CF_API_TOKEN;

  if (!zoneId || !apiToken) {
    return NextResponse.json(
      { error: "Missing Cloudflare credentials" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          purge_everything: true, // 🔥 Tüm cache temizlenir
        }),
      }
    );

    const result = await response.json();

    if (!result.success) {
      return NextResponse.json(
        { error: "Cloudflare purge failed", details: result.errors },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "✅ Cloudflare cache purged successfully.",
    });
  } catch (err) {
    console.error("Cloudflare purge error:", err);
    return NextResponse.json(
      { error: "Internal error", details: (err as Error).message },
      { status: 500 }
    );
  }
}
