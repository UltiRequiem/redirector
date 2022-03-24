export function validHttpURL(url: string | URL) {
  try {
    if (!(url instanceof URL)) {
      url = new URL(url);
    }
  } catch {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}
