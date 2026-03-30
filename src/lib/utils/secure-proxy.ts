import crypto from 'crypto';

/**
 * Image Proxy Security Layer
 * This utility handles the absolute obfuscation of S3 and Notion URLs from the client.
 */

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;
const TAG_LENGTH = 16;
const KEY = Buffer.from(process.env.IMG_SECURE_KEY || '', 'hex');

/**
 * Encrypts a URL into a secure, URL-safe token.
 */
export function encryptImageUrl(url: string | undefined): string | undefined {
  if (!url || !url.startsWith('http')) return url;

  try {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);

    let encrypted = cipher.update(url, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const tag = cipher.getAuthTag();

    // Format: iv.encrypted.tag (all in hex)
    const token = `${iv.toString('hex')}.${encrypted}.${tag.toString('hex')}`;

    // Base64Url encode it for safe URL transport
    return Buffer.from(token).toString('base64url');
  } catch (error) {
    console.error('Encryption failing:', error);
    return url;
  }
}

/**
 * Decrypts a secure token back into the original S3/Notion URL.
 */
export function decryptImageUrl(token: string): string | null {
  try {
    // Decode Base64Url
    const rawToken = Buffer.from(token, 'base64url').toString('utf8');
    const [ivHex, encryptedHex, tagHex] = rawToken.split('.');

    if (!ivHex || !encryptedHex || !tagHex) return null;

    const iv = Buffer.from(ivHex, 'hex');
    const tag = Buffer.from(tagHex, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);

    decipher.setAuthTag(tag);

    let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (error) {
    console.error('Decryption failing:', error);
    return null;
  }
}

/**
 * Generates the local proxy path for an image.
 */
export function getSecureProxyUrl(url: string | undefined): string | undefined {
  if (!url || !url.startsWith('http')) return url;

  // Do not re-proxy if already proxied
  if (url.startsWith('/api/img-secure/')) return url;

  const token = encryptImageUrl(url);
  return `/api/img-secure/${token}`;
}
