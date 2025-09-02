require('dotenv').config();
const axios = require('axios');
const qs = require('qs');
const cheerio = require('cheerio');
const ssig = process.env.SESSION_IG_COOKIE;

async function instagramDl(url) {
  try {
    const { data } = await axios.post('https://yt1s.io/api/ajaxSearch', new URLSearchParams({ q: url, vt: 'instagram' }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        'Referer': 'https://yt1s.io/en/instagram-downloader'
      }
    });
    if (data.status !== 'ok' || !data.data) throw new Error('Gagal mengambil data dari layanan.');
    const $ = cheerio.load(data.data);
    const results = [];
    const downloadLinks = $('a.abutton.is-success');
    for (const element of downloadLinks) {
      const downloadUrl = $(element).attr('href');
      if (downloadUrl) {
        const mediaType = await getMediaType(downloadUrl);
        results.push({
          type: mediaType,
          url: downloadUrl
        });
      }
    }
    if (results.length === 0) throw new Error('Tidak ada media yang dapat diunduh ditemukan.');
    return {
      results_number: results.length,
      url_list: results.map(r => r.url),
      media_details: results
    };
  } catch (e) {
    throw new Error(`Terjadi kesalahan saat memproses permintaan: ${e.message}`);
  }
}
async function getMediaType(url) {
  try {
    const response = await axios.head(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
      }
    });
    const contentType = response.headers['content-type'];
    if (contentType && contentType.includes('video')) return 'video';
    return 'image';
  } catch (error) {
    console.error(`Gagal memeriksa tipe media untuk URL: ${url}. Error: ${error.message}`);
    return 'image';
  }
}
async function instagramPost(url_media, config = { retries: 5, delay: 1000 }) {
  try {
    url_media = await checkRedirect(url_media);
    const SHORTCODE = getShortcode(url_media);
    const INSTAGRAM_REQUEST = await instagramRequest(SHORTCODE, config.retries, config.delay);
    const OUTPUT_DATA = createOutputData(INSTAGRAM_REQUEST);
    return OUTPUT_DATA;
  } catch (err) {
    console.error("Terjadi kesalahan di fungsi instagramPost:", err);
    throw err;
  }
}
async function checkRedirect(url) {
  if (url.includes('/share')) {
    const res = await axios.get(url, { maxRedirects: 5 });
    return res.request.res.responseUrl;
  }
  return url;
}
function formatPostInfo(requestData) {
  const mediaCapt = requestData.edge_media_to_caption.edges;
  const capt = (mediaCapt.length === 0) ? "" : mediaCapt[0].node.text;
  return {
    owner_username: requestData.owner.username,
    owner_fullname: requestData.owner.full_name,
    is_verified: requestData.owner.is_verified,
    is_private: requestData.owner.is_private,
    likes: requestData.edge_media_preview_like.count,
    is_ad: requestData.is_ad,
    caption: capt
  };
}
function formatMediaDetails(mediaData) {
  if (mediaData.is_video) {
    return {
      type: "video",
      dimensions: mediaData.dimensions,
      video_view_count: mediaData.video_view_count,
      url: mediaData.video_url,
      thumbnail: mediaData.display_url
    };
  } else {
    return {
      type: "image",
      dimensions: mediaData.dimensions,
      url: mediaData.display_url
    };
  }
}
function getShortcode(url) {
  const post_tags = ["p", "reel", "tv", "reels"];
  const url_parts = new URL(url).pathname.split('/').filter(Boolean);
  const tagIndex = url_parts.findIndex(part => post_tags.includes(part));
  if (tagIndex !== -1 && url_parts[tagIndex + 1]) {
    return url_parts[tagIndex + 1];
  }
  throw new Error('Shortcode tidak dapat ditemukan dari URL.');
}
async function getCSRFToken() {
  const { headers } = await axios.get('https://www.instagram.com/');
  const csrfCookie = headers['set-cookie'].find(cookie => cookie.startsWith('csrftoken='));
  if (!csrfCookie) throw new Error('Token CSRF tidak ditemukan.');
  return csrfCookie.split(';')[0].split('=')[1];
}
function isSidecar(requestData) {
  return requestData["__typename"] === "XDTGraphSidecar";
}
async function instagramRequest(shortcode, retries, delay) {
  try {
    const BASE_URL = "https://www.instagram.com/graphql/query";
    const INSTAGRAM_DOCUMENT_ID = "9510064595728286";
    const dataBody = qs.stringify({
      'variables': JSON.stringify({ 'shortcode': shortcode }),
      'doc_id': INSTAGRAM_DOCUMENT_ID
    });
    const token = await getCSRFToken();
    const config = {
      method: 'post',
      url: BASE_URL,
      headers: {
        'X-CSRFToken': token,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': `csrftoken=${token};${ssig ? ` sessionid=${ssig};` : ''}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
      },
      data: dataBody
    };
    const { data } = await axios.request(config);
    if (!data.data?.xdt_shortcode_media) {
      throw new Error("Konten tidak ditemukan atau link tidak valid. Pastikan ini adalah link Post/Reel.");
    }
    return data.data.xdt_shortcode_media;
  } catch (err) {
    const errorCodes = [429, 403];
    if (err.response && errorCodes.includes(err.response.status) && retries > 0) {
      const waitTime = parseInt(err.response.headers['retry-after'] || delay, 10);
      await new Promise(res => setTimeout(res, waitTime));
      return instagramRequest(shortcode, retries - 1, delay * 2);
    }
    if (err.response?.status === 404) {
      throw new Error(`Gagal melakukan permintaan: Konten tidak ditemukan (404). Mungkin konten privat dan session ID Anda tidak valid.`);
    }
    throw new Error(`Gagal melakukan permintaan Instagram: ${err.message}`);
  }
}
function createOutputData(requestData) {
  const url_list = [], media_details = [];
  const IS_SIDECAR = isSidecar(requestData);

  if (IS_SIDECAR) {
    requestData.edge_sidecar_to_children.edges.forEach((media) => {
      media_details.push(formatMediaDetails(media.node));
      url_list.push(media.node.is_video ? media.node.video_url : media.node.display_url);
    });
  } else {
    media_details.push(formatMediaDetails(requestData));
    url_list.push(requestData.is_video ? requestData.video_url : requestData.display_url);
  }

  return {
    results_number: url_list.length,
    url_list,
    post_info: formatPostInfo(requestData),
    media_details
  };
}
async function instagram(url) {
  try {
    const cleanUrl = url.split("?")[0];
    if (cleanUrl.includes('/stories/') || cleanUrl.includes('/s/')) {
      return await instagramDl(cleanUrl);
    } else {
      return await instagramPost(cleanUrl);
    }
  } catch (error) {
    console.error("Terjadi kesalahan di fungsi instagram:", error);
    throw error;
  }
}

module.exports = {
  instagram
};