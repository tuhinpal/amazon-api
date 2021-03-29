import search from './search'
import header from './header'
import product from './product'

async function handleRequest(request) { // Handle the incoming request 
    const headers = header(request.headers)
    const path = new URL(request.url).pathname; // Get the pathname 

    if (request.method === 'GET') { // Respond for GET request method 
        if (path.startsWith('/search/')) { // Search
            return new Response(await search(path.replace('/search/', ''), request.headers.get("host")), {
                status: 200,
                headers
            })
        } 
        else if (path.startsWith('/product/')) { // Product Page 
            return new Response(await product(path.replace('/product/', '')), {
                status: 200,
                headers
            })
        } 
        else {
            return Response.redirect("https://github.com/cachecleanerjeet/amazon-scraper", 301)
        }
    } 
    else { // Respond for other request methods 
        return Response.redirect("https://github.com/cachecleanerjeet/amazon-scraper", 301)
    }
}

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})
