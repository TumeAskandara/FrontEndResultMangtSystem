import { BASE_URL } from "./endpoints.config";

export default async function Services(services, link, method, form, token) {
    let headers = {};
    let body;

    const url = BASE_URL[services] + link;

    console.log("API Url", url);

    if (form instanceof FormData) {
        headers = {
            Accept: 'application/json',
        };
        body = form;
    } else if (form) {
        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        };
        body = JSON.stringify(form);
    }

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const requestConfig = {
        method: method,
        headers: headers,
        mode: "cors",
    };

    if (!['GET', 'DELETE', 'HEAD'].includes(method) && body) {
        requestConfig.body = body;
    }

    try {
        const resp = await fetch(url, requestConfig);

const contentType = resp.headers.get("content-type");

if (contentType.includes("application/json")) {
    const data = await resp.json();
    console.log('JSON Response:', data);
    return { status: resp.status, body: data };
} else if (contentType.includes("image") || contentType.includes("video") || contentType.includes("audio")) {
    const blob = await resp.blob();
    return { status: resp.status, body: URL.createObjectURL(blob) };
} else {
    const text = await resp.text();
    return { status: resp.status, body: text };
}

    } catch (error) {
        console.error('Fetch error:', error);
        return ApiResponse(500, { error: 'Internal Server Error' });
    }
}



function ApiResponse(status, data = {}) {
    return {
        status,
        body: data,
    };
}