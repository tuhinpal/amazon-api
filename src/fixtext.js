export default function fixText(str) {
  try {
    return str
      .replace(/\n/g, " ")
      .replace(/&#39;/gi, "'")
      .replace(/&amp;/gi, "&")
      .replace(/&quot;/gi, "'")
      .replace(/&#x27;/gi, "'")
      .trim();
  } catch (error) {
    console.log("fixtexterror =>", error);
    return str;
  }
}
