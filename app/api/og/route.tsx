import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city") ?? "Default City";
    const category = searchParams.get("category") ?? "Service";
    const type = searchParams.get("type") ?? "og";

    // Category display names
    const categoryNames: Record<string, string> = {
      "web-design": "Web Design",
      "custom-web-development": "Web Development",
      "digital-marketing": "Digital Marketing",
      "seo-services": "SEO Services",
      "local-seo": "Local SEO",
      "ecommerce-development": "E-commerce",
      branding: "Branding",
      "content-marketing": "Content Marketing",
      "app-development": "App Development",
      "ui-ux-design": "UI/UX Design",
      "conversion-optimization": "Conversion Optimization",
      "ppc-ads": "PPC Advertising",
      "custom-panel-development": "Custom Panels",
    };

    const categoryDisplay = categoryNames[category] || category;
    const isTwitter = type === "twitter";
    const dimensions = isTwitter
      ? { width: 1200, height: 630 }
      : { width: 1200, height: 630 };

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#1e40af",
            backgroundImage:
              "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
            position: "relative",
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage:
                "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            }}
          />

          {/* Main Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "60px",
              zIndex: 1,
            }}
          >
            {/* Category Badge */}
            <div
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                padding: "12px 24px",
                borderRadius: "50px",
                marginBottom: "32px",
                border: "2px solid rgba(255,255,255,0.3)",
              }}
            >
              <span
                style={{
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                {categoryDisplay}
              </span>
            </div>

            {/* Main Title */}
            <h1
              style={{
                color: "white",
                fontSize: isTwitter ? "48px" : "56px",
                fontWeight: "800",
                lineHeight: "1.1",
                margin: "0 0 24px 0",
                textAlign: "center",
                maxWidth: "900px",
              }}
            >
              Best {categoryDisplay} Services in {city}
            </h1>

            {/* Subtitle */}
            <p
              style={{
                color: "rgba(255,255,255,0.9)",
                fontSize: isTwitter ? "20px" : "24px",
                fontWeight: "400",
                margin: "0 0 40px 0",
                textAlign: "center",
                maxWidth: "700px",
              }}
            >
              Professional {categoryDisplay.toLowerCase()} solutions for {city}{" "}
              businesses
            </p>

            {/* CTA Badge */}
            <div
              style={{
                backgroundColor: "white",
                padding: "16px 32px",
                borderRadius: "12px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
              }}
            >
              <span
                style={{
                  color: "#1e40af",
                  fontSize: "18px",
                  fontWeight: "700",
                }}
              >
                Get Started Today →
              </span>
            </div>
          </div>

          {/* Bottom Brand */}
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              right: "40px",
              display: "flex",
              alignItems: "center",
              color: "rgba(255,255,255,0.8)",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            <span>Powered by Moydus</span>
          </div>
        </div>
      ),
      {
        ...dimensions,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
