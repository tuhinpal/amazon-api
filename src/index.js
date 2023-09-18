addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event.request));
});

const cheerio = require('cheerio');

const hardcodedUrl = 'https://www.amazon.in/dp/'; // Hardcoded Amazon URL

async function handleRequest(request) {
    const params = new URLSearchParams(request.url.search); // Get query parameters
    const productCodeParam = params.get('code'); // Extract 'code' parameter

    if (!productCodeParam) {
        return new Response('Missing product code in query parameter "code".', { status: 400 });
    }

    const productUrl = `${hardcodedUrl}${productCodeParam}`;

    // Send an HTTP GET request to the combined Amazon product page URL
    const response = await fetch(productUrl);

    if (response.ok) {
        // Parse the HTML content using Cheerio
        const html = await response.text();
        const $ = cheerio.load(html);

        // Find the image element and extract the source URL
        const imageUrl = $('#landingImage').attr('src');

        if (imageUrl) {
            const responseText = `Amazon Product Image URL: ${imageUrl}\nProduct Code: ${productCodeParam}`;
            return new Response(responseText, { status: 200 });
        } else {
            return new Response('Image not found on the page.', { status: 404 });
        }
    } else {
        return new Response('Error fetching the Amazon page.', { status: 500 });
    }
}
