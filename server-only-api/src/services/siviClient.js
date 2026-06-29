const BASE_HEADERS = {
  'Content-Type': 'application/json',
  'sivi-api-key': process.env.SIVI_API_KEY,
};

class SiviApiError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

const siviClient = {
  async get(endpoint, queryParams = {}, extraHeaders = {}) {
    const url = new URL(`${process.env.SIVI_API_URL}${endpoint}`);
    if (Object.keys(queryParams).length > 0) {
      url.searchParams.append('queryParams', JSON.stringify(queryParams));
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: { ...BASE_HEADERS, ...extraHeaders },
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => '');
      throw new SiviApiError(
        `Sivi API GET ${endpoint} failed with status ${response.status}: ${errorBody}`,
        response.status
      );
    }

    return response.json();
  },

  async post(endpoint, body = {}, extraHeaders = {}) {
    const response = await fetch(`${process.env.SIVI_API_URL}${endpoint}`, {
      method: 'POST',
      headers: { ...BASE_HEADERS, ...extraHeaders },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => '');
      throw new SiviApiError(
        `Sivi API POST ${endpoint} failed with status ${response.status}: ${errorBody}`,
        response.status
      );
    }

    return response.json();
  },
};

export { SiviApiError };
export default siviClient;
