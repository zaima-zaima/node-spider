const axios = require("axios").default;
const cheerio = require("cheerio");

export function spider(config) {
    if (!config) {
        throw Error("config is required");
    }

    if (!config.url) {
        throw Error("url is required");
    }

  return parse(config)
}

async function parse(config) {
    const html = await getcontext(config.url);

    if (config.filuter) {
        return JSON.stringify(await getText(html.data, config.filuter));
    }
}

async function getcontext(url) {
    return await axios.get(url);
}

async function getText(str, filuter) {
    let obj = {};
    const $ = cheerio.load(str);
    for (const key in filuter) {
        if (Object.hasOwnProperty.call(filuter, key)) {
            if (typeof filuter[key] === 'string') {
                if (filuter[key].indexOf(':') != -1) {

                } else {
                    obj[key] = $(filuter[key]).text();
                }
            }

        }
    }
    return obj;
}

