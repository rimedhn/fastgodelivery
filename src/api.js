const API_URL = "https://script.google.com/macros/s/AKfycbwhWbKvqTNiUaq_Ws5I2MEbdf2HGls8IIsyMKcE8dcRvrLGXWsiqgG0SJstGzrd39yhtg/exec";

export async function apiRequest(payload) {
  const params = new URLSearchParams();
  Object.entries(payload).forEach(([k, v]) => params.append(k, v));
  const res = await fetch(API_URL, {
    method: "POST",
    body: params
  });
  return await res.json();
}