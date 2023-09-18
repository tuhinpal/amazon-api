addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event.request));
});

const hardcodedUrl = 'https://www.amazon.in/dp/'; // Hardcoded Amazon URL

class ImageExtractor {
    async element(element) {
        if (element.tagName === 'IMG') {
            const imageUrl = element.getAttribute('src');
            if (imageUrl) {
                const productCode = imageUrl.match(/\/dp\/(\w+)/);
                if (productCode && productCode[1]) {
                    const code = productCode[1];
                    const responseText = `Amazon Product Image URL: ${imageUrl}\nProduct Code: ${code}`;
                    return new Response(responseText, { status: 200 });
                }
            }
        }
    }
}

async function handleRequest(request) {
    const queryParams = new URL(request.url).searchParams; // Get query parameters
    const productCodeParam = queryParams.get('code'); // Extract 'code' parameter

    console.log('Query Parameters:', queryParams.toString()); // Log the entire query string

    if (!productCodeParam) {
        return new Response('Missing product code in query parameter "code".', { status: 400 });
    }

    const productUrl = `${hardcodedUrl}${productCodeParam}`;

    // Send an HTTP GET request to the combined Amazon product page URL
    const response = await fetch(productUrl);

    if (response.ok) {
        // Use HTMLRewriter to parse the HTML content
        const modifiedResponse = new HTMLRewriter().on('*', new ImageExtractor()).transform(response);

        return modifiedResponse;
    } else {
        return new Response('Error fetching the Amazon page.', { status: 500 });
    }
}

