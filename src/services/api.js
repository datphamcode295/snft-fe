class APIError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
    this.name = 'APIError'
  }
}

const apiClient = {
  async request(endpoint, options = {}) {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new APIError(data.message || 'API Error', response.status)
      }

      return data
    } catch (error) {
      if (error instanceof APIError) {
        throw error
      }
      throw new APIError('Network error', 500)
    }
  }
}

export const nftAPI = {
  generateSignature: async (userAddress) => {
    return apiClient.request('/api/v1/generate-signature', {
      method: 'POST',
      body: JSON.stringify({ userAddress }),
    })
  }
}