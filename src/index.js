addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    try{
    const hardcodedUrl = 'https://www.amazon.in/dp/B0C4HBW653'; // Hardcoded Amazon product URL

    // Send an HTTP GET request to the hardcoded Amazon product page
    const response = await fetch(hardcodedUrl);

    if (response.ok) {
        // Parse the HTML content
        const html = await response.text();
        const dom = new DOMParser().parseFromString(html, 'text/html');

        // Find the image element and extract the source URL
        const imageUrl = dom.querySelector('#landingImage').getAttribute('src');

        if (imageUrl) {
            return new Response(`Amazon Product Image URL: ${imageUrl}`, { status: 200 });
        } else {
            return new Response('Image not found on the page.', { status: 404 });
        }
    } else {
        return new Response('Error fetching the Amazon page.', { status: 500 });
    }
    }else{
        return new Response('Error server.', { status: 500 });
    }
}
