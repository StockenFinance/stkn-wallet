const API_KEY = "fa88ef47-4f21-4b8c-8918-b9072a25529b";
const API_URL =
  "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD";

const fetchCryptoData = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "X-CMC_PRO_API_KEY": API_KEY,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    console.log(" Coin Market API call successful:", data);
    return data.data;
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    throw error;
  }
};

export { fetchCryptoData };
