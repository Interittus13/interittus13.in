import { NextRequest, NextResponse } from 'next/server';
import { decryptImageUrl } from '@/src/lib/utils/secure-proxy';

/**
 * Image Guard Secure Proxy
 * This route intercepts requests for high-resolution images, decrypts the source URL,
 * and pipes the data back to the user hidden behind your local domain.
 */

export async function GET(
    request: NextRequest,
    { params }: { params: { token: string } }
) {
    const { token } = params;
    
    if (!token) {
        return new NextResponse('Invalid Token', { status: 400 });
    }

    const targetUrl = decryptImageUrl(token);

    if (!targetUrl) {
        return new NextResponse('Access Denied', { status: 403 });
    }

    try {
        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'NotionImageGuard/1.0',
            },
        });

        if (!response.ok) {
            throw new Error(`Remote host returned ${response.status}`);
        }

        const buffer = await response.arrayBuffer();
        const contentType = response.headers.get('content-type') || 'image/jpeg';
        
        // Return the binary data with caching
        return new NextResponse(buffer, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable',
                'X-Content-Type-Options': 'nosniff',
            },
        });
    } catch (error) {
        console.error('Image Proxy Error:', error);
        return new NextResponse('Error Fetching Image', { status: 502 });
    }
}
