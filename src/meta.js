import { unfurl } from 'unfurl.js'

export default async function getMeta(link) {
  try {
    const result = await unfurl(link);
    return result;
  } catch {
    return "none"
  }
}
