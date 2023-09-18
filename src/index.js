addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    const params = new URLSearchParams(request.url.search); // Get query parameters
    const productUrlParam = params.get('url'); // Extract 'url' parameter

    if (!productUrlParam) {
        return new Response('Missing Amazon product URL in query parameter "url".', { status: 400 });
    }

    const productUrl = decodeURIComponent(productUrlParam); // Decode URL

    // Send an HTTP GET request to the Amazon product page
    const response = await fetch(productUrl);

    if (response.ok) {
        // Parse the HTML content
        const html = await response.text();
        const dom = new DOMParser().parseFromString(html, 'text/html');

        // Find the image element and extract the source URL
        const imageUrl = dom.querySelector('#landingImage').getAttribute('src');

        if (imageUrl) {
            return new Response(`Amazon Product Image URL: ${imageUrl}`);
        } else {
            return new Response('Image not found on the page.', { status: 404 });
        }
    } else {
        return new Response('Error fetching the Amazon page.', { status: 500 });
    }
}
