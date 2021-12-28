import fixText from "./fixtext";

const product = async (query) => {
  const product_page = await (
    await fetch(`https://www.amazon.in/${query}`)
  ).text();

  try {
    var features = [];
    var feat = product_page
      .split('<ul class="a-unordered-list a-vertical a-spacing-mini">')[1]
      .split("</ul>")[0];
    var feat = feat.split('<span class="a-list-item">');
    for (var i = 1; i < feat.length; i++) {
      try {
        features.push(fixText(feat[i].split("</span>")[0]));
      } catch (err) {}
    }
  } catch (err) {
    var features = [null];
  }

  var price = null;
  var original_price = null;

  try {
    var pricediv = product_page.split(/<div id="unifiedPrice_feature_div".*>/g);

    original_price = pricediv[1]
      .split('<span class="a-offscreen">')[1]
      .split("</span>")[0];

    try {
      price = pricediv[1]
        .split(
          '<span class="a-price a-text-price a-size-medium apexPriceToPay" data-a-size="b" data-a-color="price">'
        )[1]
        .split("</span>")[0];
      if (price.includes(">")) {
        price = price.split(">")[1];
      }
    } catch (pe) {}

    if (price === null) {
      price = pricediv[1]
        .split(/<span class="a-price-whole">/g)[1]
        .split("</span>")[0];
    }
  } catch (error) {}

  if (original_price !== null) {
    original_price = parseFloat(
      original_price.replace("₹", "").replace(/,/g, "").trim()
    );
  }
  if (price !== null) {
    price = parseFloat(price.replace("₹", "").replace(/,/g, "").trim());
  }

  try {
    var in_stock =
      product_page
        .split('id="availability"')[1]
        .split("</div>")[0]
        .toLowerCase()
        .lastIndexOf("in stock.") !== -1;
  } catch (e) {
    var in_stock = product_page.split("In stock.").length > 1;
  }

  try {
    var image = product_page
      .split('<div id="imgTagWrapperId" class="imgTagWrapper">')[1]
      .split('data-old-hires="')[1]
      .split('"')[0]
      .replaceAll("\n", "");
    if (image === "") {
      var image = product_page
        .split('<div id="imgTagWrapperId" class="imgTagWrapper">')[1]
        .split('data-a-dynamic-image="{&quot;')[1]
        .split("&quot;")[0]
        .replaceAll("\n", "");
    }
  } catch (e) {
    var image = null;
  }

  try {
    var review_section = product_page.split("ratings</span>")[0];
    var ratings_count = parseInt(
      lastEntry(review_section.split(">")).replace(/,/g, "").trim()
    );
    var rating = parseFloat(
      lastEntry(
        lastEntry(review_section.split("a-icon-star"))
          .split("</span>")[0]
          .split("out of")[0]
          .split(">")
      ).trim()
    );
    var rating_details = { ratings_count, rating };
  } catch (er) {
    console.log(er.message);
    var rating_details = null;
  }

  try {
    var product_detail = {
      name: fixText(
        product_page
          .split(
            '<span id="productTitle" class="a-size-large product-title-word-break">'
          )[1]
          .split("</span>")[0]
      ),
      image,
      price,
      original_price,
      in_stock,
      rating_details,
      features,
      product_link: `https://www.amazon.in/${query}`,
    };
  } catch (err) {
    var product_detail = null;
  }

  return JSON.stringify(
    {
      status: true,
      query,
      fetch_from: `https://www.amazon.in/${query}`,
      product_detail,
    },
    null,
    2
  );
};

const lastEntry = (array) => array[array.length - 1];

export default product;
