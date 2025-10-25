'use client';

if (
  typeof globalThis !== 'undefined' &&
  (typeof (globalThis as any).process === 'undefined' ||
    (globalThis as any).process === null ||
    typeof (globalThis as any).process !== 'object')
) {
  (globalThis as any).process = { env: {} };
}

const processObject = (globalThis as any).process as Record<string, any>;

if (
  typeof processObject.env === 'undefined' ||
  processObject.env === null ||
  typeof processObject.env !== 'object'
) {
  processObject.env = {};
}

if (typeof processObject.env.NODE_ENV === 'undefined') {
  processObject.env.NODE_ENV = 'development';
}

export function ProcessEnvInitializer() {
  return null;
}
