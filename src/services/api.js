const BASE_URL = "http://project-ninehub.test/api"

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
  }

  const contentType = response.headers.get("content-type")
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return await response.json()
  }

  return { status: response.status, message: response.statusText }
}

const apiRequest = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
     
    },
  }

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  }

  try {
    const response = await fetch(url, config)
    const data = await handleResponse(response)

    return {
      status: response.status,
      data: data.data || data,
      message: data.message || "Success",
    }
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error)
    return {
      status: 500,
      data: null,
      message: error.message || "Network error occurred",
    }
  }
}

const api = {
  async get(resource) {
    return await apiRequest(`/${resource}`)
  },

  async getById(resource, id) {
    return await apiRequest(`/${resource}/${id}`)
  },

  async create(resource, newItem) {
    console.log(JSON.stringify(newItem))
    return await apiRequest(`/${resource}`, {
      method: "POST",
      body: JSON.stringify(newItem),
    })    
  },

  async update(resource, id, updatedItem) {
    return await apiRequest(`/${resource}/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedItem),
    })
  },

  async delete(resource, id) {
    return await apiRequest(`/${resource}/${id}`, {
      method: "DELETE",
    })
  },

  companies: {
    getAll: () => api.get("company"),
    getById: (id) => api.getById("company", id),
    create: (company) => api.create("company", company),
    update: (id, company) => api.update("company", id, company),
    delete: (id) => api.delete("company", id),
  },

  contacts: {
    getAll: () => api.get("contact"),
    getById: (id) => api.getById("contact", id),
    create: (contact) => api.create("contact", contact),
    update: (id, contact) => api.update("contact", id, contact),
    delete: (id) => api.delete("contact", id),
  },

  leads: {
    getAll: () => api.get("lead"),
    getById: (id) => api.getById("lead", id),
    create: (lead) => api.create("lead", lead),
    update: (id, lead) => api.update("lead", id, lead),
    delete: (id) => api.delete("lead", id),
  },
}

export default api
