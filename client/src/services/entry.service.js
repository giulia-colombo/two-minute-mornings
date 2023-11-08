import axios from 'axios';

const ENTRY_BASE_URL = '/api/entries';

class EntryService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:5005',
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use(config => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem('authToken');

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // POST /api/entries
  createOne = async requestBody => {
    return this.api.post(ENTRY_BASE_URL, requestBody);
  };

  // GET /api/entries
  getAll = async () => {
    return this.api.get(ENTRY_BASE_URL);
  };

  // GET /api/entries/:id
  getOne = async id => {
    return this.api.get(`${ENTRY_BASE_URL}/${id}`);
  };

  // PUT /api/entries/:id
  updateOne = async (id, requestBody) => {
    return this.api.put(`${ENTRY_BASE_URL}/${id}`, requestBody);
  };

  // DELETE /api/entries/:id
  deleteOne = async id => {
    return this.api.delete(`${ENTRY_BASE_URL}/${id}`);
  };
}

// Create one instance of the service
const entryService = new EntryService();

export default entryService;
