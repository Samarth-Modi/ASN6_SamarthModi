import { getToken } from "../lib/authenticate";

export async function addToFavourites(id) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${getToken()}`
      }
    });
    if (response.status === 200) {
      return await response.json();
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function removeFromFavourites(id) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `JWT ${getToken()}`
      }
    });
    if (response.status === 200) {
      return await response.json();
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getFavourites() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
      method: "GET",
      headers: {
        Authorization: `JWT ${getToken()}`
      }
    });
    if (response.status === 200) {
      return await response.json();
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function addToHistory(id) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${getToken()}`
      }
    });
    if (response.status === 200) {
      return await response.json();
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function removeFromHistory(id) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `JWT ${getToken()}`
      }
    });
    if (response.status === 200) {
      return await response.json();
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getHistory() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
      method: "GET",
      headers: {
        Authorization: `JWT ${getToken()}`
      }
    });
    if (response.status === 200) {
      return await response.json();
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}
