addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event.request));
});

const hardcodedUrl = 'https://www.amazon.in/dp/'; // Hardcoded Amazon URL

class ImageExtractor {
    constructor() {
        this.imageUrl = null;
    }

    element(element) {
        if (element.tagName === 'IMG') {
            const imageUrl = element.getAttribute('src');
            if (imageUrl) {
                const productCode = imageUrl.match(/\/dp\/(\w+)/);
                if (productCode && productCode[1]) {
                    this.imageUrl = imageUrl;
                }
            }
        }
    }

    toJSON() {
        return JSON.stringify({
            "image": this.imageUrl,
            "code": this.extractedCode()
        });
    }

    extractedCode() {
        if (this.imageUrl) {
            const productCode = this.imageUrl.match(/\/dp\/(\w+)/);
            if (productCode && productCode[1]) {
                return productCode[1];
            }
        }
        return null;
    }
}

async function handleRequest(request) {
    const queryParams = new URL(request.url).searchParams; // Get query parameters
    const productCodeParam = queryParams.get('code'); // Extract 'code' parameter

    if (!productCodeParam) {
        return new Response('Missing product code in query parameter "code".', { status: 400 });
    }

    const productUrl = `${hardcodedUrl}${productCodeParam}`;

    // Send an HTTP GET request to the combined Amazon product page URL
    const response = await fetch(productUrl);

    if (response.ok) {
        // Use HTMLRewriter to parse the HTML content
        const imageExtractor = new ImageExtractor();
        const transformedResponse = new HTMLRewriter().on('*', imageExtractor).transform(response);

        // Check if the image extractor found an image URL
        if (imageExtractor.extractedCode()) {
            // Return the JSON response
            return new Response(imageExtractor.toJSON(), {
                headers: { "Content-Type": "application/json" },
                status: 200
            });
        } else {
            return new Response('Image not found on the page.', { status: 404 });
        }
    } else {
        return new Response('Error fetching the Amazon page.', { status: 500 });
    }
}
