[![Proxiy AD #1](https://firebasestorage.googleapis.com/v0/b/cdn-tuhin.appspot.com/o/1772119325toawj?alt=media&token=8dfd74ee-dc11-42af-abe7-6155b3176ea7)](https://www.webshare.io/?referral_code=llyqtk3ygyr3)

Looking to Unlock Web Data at Scale? [Sign up now and get 10 free proxies & 1GB bandwidth](https://www.webshare.io/?referral_code=llyqtk3ygyr3)

# Amazon API

This project is a comprehensive edge API for Amazon. It supports search and product endpoints. The search endpoint allows you to search for products on Amazon. The product endpoint allows you to get product details by ASIN. This API supports both `REST` and `GraphQL` endpoints.

## Changelog 🔔

<details>
<summary><strong>1. May 5, 2024 - Amazon blocked Cloudflare ASN</strong></summary>

It seems like Amazon has blocked Cloudflare ASN. So, the API will work in development mode only. It uses hono, so it is possible to deploy the project on any other cloud provider.

</details>

<details>
<summary><strong>2. May 5, 2024 - Don't use the hosted API</strong></summary>

Please don't use the hosted API. Deploy your own instance of the project. The hosted API is for demonstration purposes only. The hosted API may be taken down at any time.

</details>

<details>
<summary><strong>3. May 5, 2024 - V2 is here</strong></summary>

I rewrite the full project from scratch. The new version is written in TypeScript and uses Cloudflare Workers. This version is faster and more reliable and also supports GraphQL.

Changes:

- Rewrite the full project in TypeScript
- Used Hono
- Add GraphQL support
- Add support for multiple country versions of Amazon
- Add support for pagination

Cheers 🎉

</details>

## Features 📖

- Support multiple country versions of Amazon
- Search for products on Amazon
- Get product details by ASIN
- Supports both REST and GraphQL endpoints
- Supports pagination

## Tech Stack 💻

- Cloudflare Workers
- Hono
- TypeScript
- GraphQL
- REST

## REST API 🌐

| Path                          | Method | Description                            | Try it out                                                                               |
| :---------------------------- | :----- | :------------------------------------- | :--------------------------------------------------------------------------------------- |
| /api/[country]/search         | `GET`  | The country code of the Amazon website | [Try it out](https://amazon-api.tprojects.workers.dev/api/in/search?query=iphone&page=1) |
| /api/[country]/product/[asin] | `GET`  | The country code of the Amazon website | [Try it out](https://amazon-api.tprojects.workers.dev/api/in/product/B0CVL69Y27)         |

## GraphQL API 🌐

- The graphql endpoint is available at `/graphql`.
- Try out the playground at [/graphql/playground](https://amazon-api.tprojects.workers.dev/graphql/playground).

## Deployment 🚀

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/tuhinpal/amazon-api)

## Implented country versions 🌍

| Country      | Code | Base URL                                   | Implementation |
| :----------- | :--- | :----------------------------------------- | :------------- |
| India        | in   | [amazon.in](https://www.amazon.in)         | `Full ✅`      |
| USA          | us   | [amazon.com](https://www.amazon.com)       | `Partial 🚧`   |
| England      | uk   | [amazon.co.uk](https://www.amazon.co.uk)   | `Partial 🚧`   |
| Canada       | ca   | [amazon.ca](https://www.amazon.ca)         | `Partial 🚧`   |
| Germany      | de   | [amazon.de](https://www.amazon.de)         | `Partial 🚧`   |
| France       | fr   | [amazon.fr](https://www.amazon.fr)         | `Partial 🚧`   |
| Italy        | it   | [amazon.it](https://www.amazon.it)         | `Partial 🚧`   |
| España       | es   | [amazon.es](https://www.amazon.es)         | `Partial 🚧`   |
| Australia    | au   | [amazon.com.au](https://www.amazon.com.au) | `Partial 🚧`   |
| Japan        | jp   | [amazon.co.jp](https://www.amazon.co.jp)   | `Partial 🚧`   |
| Brazil       | br   | [amazon.com.br](https://www.amazon.com.br) | `Partial 🚧`   |
| Saudi Arabia | sa   | [amazon.sa](https://www.amazon.sa)         | `Partial 🚧`   |
| UAE          | ae   | [amazon.ae](https://www.amazon.ae)         | `Partial 🚧`   |

## Legal Disclaimer ⚖️

Accroding to some website it is not illegal to scrape public data from Amazon. I am not responsible for any misuse of this API. Use it at your own risk. This project comply with these terms:

- Not making excessive requests to Amazon website
- Not interfering with Amazon’s website or services
- Not using Amazon’s trademarks or logos
- Advertisement in this repository are not tested, please use them at your own.

**Are you from Amazon? and want to take down this project?** Sure, I will happy to do that. Well, see the new version of the project was written just to test, how fast I can write a production ready scraper (BTW it took 3 hours only). So my mission was accomplished. Just create an issue and I will make this project private.


[![Proxies](https://firebasestorage.googleapis.com/v0/b/cdn-tuhin.appspot.com/o/17649221198h2s?alt=media&token=3effd955-e999-44e9-9afe-8778b0fe9d7d)](https://www.thordata.com/?ls=github&lk=amazon-api)

Looking to Unlock Web Data at Scale? [Click here and buy the best residential proxies](https://www.thordata.com/?ls=github&lk=amazon-api)
