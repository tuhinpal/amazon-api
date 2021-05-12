const product = async (query) => {

    const product_page = await (await fetch(`https://www.amazon.in/${query}`)).text()

    try {
        var features = []
        var feat = product_page.split('<ul class="a-unordered-list a-vertical a-spacing-mini">')[1].split('</ul>')[0]
        var feat = feat.split('<span class="a-list-item">')
        for (var i = 1; i < feat.length; i++) {
            try {
                features.push((feat[i].split('</span>')[0].replaceAll('\n', '')).replaceAll('"', "'"))
            } catch (err) { }
        }

    } catch (err) {
        var features = [null]
    }


    try {
        var price = product_page.split('<span id="priceblock_ourprice" class="a-size-medium a-color-price priceBlockBuyingPriceString">')[1].split('</span>')[0]
        var original_price = product_page.split('<span class="priceBlockStrikePriceString a-text-strike">')[1].split('</span>')[0]
        if (!original_price) { var original_price = price }
    } catch (error) {
        try {
            var price = (product_page.split('<span id="priceblock_ourprice" class="a-size-medium a-color-price priceBlockBuyingPriceString">')[1].split('</span>')[0]).split(' - ')[0]
            var original_price = (product_page.split('<span id="priceblock_ourprice" class="a-size-medium a-color-price priceBlockBuyingPriceString">')[1].split('</span>')[0]).split(' - ')[1]
            if (!original_price) { var original_price = price }
        } catch (erro) {
            try {
                var price = product_page.split('<span id="priceblock_dealprice" class="a-size-medium a-color-price priceBlockDealPriceString">')[1].split('</span>')[0]
                var original_price = product_page.split('<span class="priceBlockStrikePriceString a-text-strike">')[1].split('</span>')[0]
                if (!original_price) { var original_price = price }
            } catch (err) {
                try {
                    var price = product_page.split('<span id="priceblock_saleprice" class="a-size-medium a-color-price priceBlockSalePriceString">')[1].split('</span>')[0]
                    var original_price = product_page.split('<span class="priceBlockStrikePriceString a-text-strike">')[1].split('</span>')[0].replace(/\n/gi, '')
                    if (!original_price) { var original_price = price }
                } catch (er) {
                    var price = null
                    var original_price = null
                }
            }
        }
    }

    if (original_price !== null && original_price.startsWith(' ')) { /* Fixing the original_price if it starts with space  */
        var original_price = original_price.replace(' ', '')
    }

    if (price !== null && price.startsWith(' ')) { /* Fixing the price if it starts with space  */
        var price = price.replace(' ', '')
    }

    var image = product_page.split('<div id="imgTagWrapperId" class="imgTagWrapper">')[1].split('data-old-hires="')[1].split('"')[0].replaceAll('\n', '')
    if (image === '') {
        var image = product_page.split('<div id="imgTagWrapperId" class="imgTagWrapper">')[1].split('data-a-dynamic-image="{&quot;')[1].split('&quot;')[0].replaceAll('\n', '')
    }

    try {
        var product_detail = {
            name: (product_page.split('<span id="productTitle" class="a-size-large product-title-word-break">')[1].split('</span>')[0]).replaceAll('\n', ''),
            image,
            price,
            original_price,
            features,
            product_link: `https://www.amazon.in/${query}`
        }
    } catch (err) {
        var product_detail = null
    }


    return JSON.stringify({
        status: true,
        query,
        fetch_from: `https://www.amazon.in/${query}`,
        product_detail
    }, null, 2)
}


export default product