const header = (req_headers) => {
    return {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "GET,OPTIONS",
        "Access-Control-Max-Age": "86400",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Your-IP": req_headers.get("cf-connecting-ip"),
        "Your-Country": req_headers.get("CF-IPCountry"),
        "Host": req_headers.get("host"),
        "Made-By": atob('VHVoaW4gS2FudGkgUGFsLCBodHRwczovL2dpdGh1Yi5jb20vY2FjaGVjbGVhbmVyamVldA==')
    }
}

export default header