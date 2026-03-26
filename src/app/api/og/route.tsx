import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    // Parse parameters
    const title = searchParams.get('title') || 'interittus13'
    const image = searchParams.get('image')
    const description = searchParams.get('description')

    // Branded colors
    const brandColor = '#f97316' // orange-500

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#09090b', // zinc-950
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background Image with Blur/Dimming */}
          {image && (
            <img
              src={image}
              alt=""
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.4,
                filter: 'blur(4px)',
              }}
            />
          )}

          {/* Vignette Overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%)',
            }}
          />

          {/* Content Container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 80px',
              textAlign: 'center',
              zIndex: 10,
            }}
          >
            {/* Title */}
            <div
              style={{
                fontSize: title.length > 50 ? '48px' : '64px',
                fontWeight: 900,
                color: 'white',
                lineHeight: 1.1,
                letterSpacing: '-0.05em',
                marginBottom: '20px',
                textShadow: '0 4px 12px rgba(0,0,0,0.5)',
              }}
            >
              {title}
            </div>

            {/* Description (Optional) */}
            {description && (
              <div
                style={{
                  fontSize: '24px',
                  color: '#a1a1aa', // zinc-400
                  maxWidth: '800px',
                  lineHeight: 1.4,
                }}
              >
                {description}
              </div>
            )}
          </div>

          {/* Branded Footer */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              left: '60px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              zIndex: 20,
            }}
          >
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: brandColor,
                boxShadow: `0 0 15px ${brandColor}`,
              }}
            />
            <div
              style={{
                fontSize: '18px',
                fontWeight: 800,
                letterSpacing: '0.4em',
                color: 'rgba(255,255,255,0.8)',
                textTransform: 'uppercase',
              }}
            >
              interittus13.in
            </div>
          </div>

          {/* Decorative Corner Glow */}
          <div
            style={{
              position: 'absolute',
              top: '-10%',
              right: '-10%',
              width: '40%',
              height: '40%',
              background: `radial-gradient(circle at center, ${brandColor}20 0%, transparent 70%)`,
              filter: 'blur(60px)',
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
