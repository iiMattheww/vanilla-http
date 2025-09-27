/**
 * vanilla-http: A lightweight HTTP utility using XMLHttpRequest and Fetch
 * Supports GET, POST, PUT, DELETE with both APIs.
 * Author: matin
 * License: MIT
 */

export class VanillaHTTP {
  /**
   * Send an HTTP request using XMLHttpRequest
   */
  static xhr(method, url, data = null, headers = {}) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.responseType = "json";

      // Default & custom headers
      xhr.setRequestHeader("Content-Type", "application/json");
      Object.entries(headers).forEach(([key, value]) =>
        xhr.setRequestHeader(key, value)
      );

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject(new Error(`XHR Error: ${xhr.status} - ${xhr.statusText}`));
        }
      };

      xhr.onerror = () => reject(new Error("Network Error: Request failed"));
      xhr.send(data ? JSON.stringify(data) : null);
    });
  }

  /**
   * Send an HTTP request using Fetch API
   */
  static async fetch(method, url, data = null, headers = {}) {
    const options = {
      method,
      headers: { "Content-Type": "application/json", ...headers },
    };

    if (data) options.body = JSON.stringify(data);

    const response = await window.fetch(url, options);
    if (!response.ok) {
      throw new Error(`Fetch Error: ${response.status} - ${response.statusText}`);
    }
    return await response.json();
  }

  // Convenience shortcuts
  static get(url, useFetch = false) {
    return useFetch ? this.fetch("GET", url) : this.xhr("GET", url);
  }

  static post(url, data, useFetch = false) {
    return useFetch ? this.fetch("POST", url, data) : this.xhr("POST", url, data);
  }

  static put(url, data, useFetch = false) {
    return useFetch ? this.fetch("PUT", url, data) : this.xhr("PUT", url, data);
  }

  static delete(url, useFetch = false) {
    return useFetch ? this.fetch("DELETE", url) : this.xhr("DELETE", url);
  }
}
