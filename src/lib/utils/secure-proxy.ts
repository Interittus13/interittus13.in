import crypto from 'crypto';

/**
 * Image Proxy Security Layer
 * This utility handles the absolute obfuscation of S3 and Notion URLs from the client.
 */

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;
const TAG_LENGTH = 16;
// Security key is loaded from environment
const getEncryptionKey = () => {
  const key = process.env.IMG_SECURE_KEY;
  if (!key || key.length < 64) return null;
  return Buffer.from(key, 'hex');
};

/**
 * Encrypts a URL into a secure, URL-safe token.
 */
export function encryptImageUrl(url: string | undefined): string | undefined {
  if (!url || !url.startsWith('http')) return url;

  const key = getEncryptionKey();
  if (!key) return url;

  try {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

    let encrypted = cipher.update(url, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const tag = cipher.getAuthTag();

    // Format: iv.encrypted.tag (all in hex)
    const token = `${iv.toString('hex')}.${encrypted}.${tag.toString('hex')}`;

    // Base64Url encode it for safe URL transport
    return Buffer.from(token).toString('base64url');
  } catch (error) {
    console.warn('Encryption failing:', error);
    return url;
  }
}

/**
 * Decrypts a secure token back into the original S3/Notion URL.
 */
export function decryptImageUrl(token: string): string | null {
  const key = getEncryptionKey();
  if (!key) return null;

  try {
    // Decode Base64Url
    const rawToken = Buffer.from(token, 'base64url').toString('utf8');
    const [ivHex, encryptedHex, tagHex] = rawToken.split('.');

    if (!ivHex || !encryptedHex || !tagHex) return null;

    const iv = Buffer.from(ivHex, 'hex');
    const tag = Buffer.from(tagHex, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);

    decipher.setAuthTag(tag);

    let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (error) {
    console.warn('Decryption failing:', error);
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
  
  // If encryption failed or key was missing, token will be the same as url
  // In this case, return the original URL instead of a broken proxy path
  if (!token || token === url) return url;

  return `/api/img-secure/${token}`;
}
