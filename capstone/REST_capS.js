const URL = "http://localhost:3000/books";

export async function fetchAllBooks(avail = null) {
    try {
        const url = avail !== null ? `${URL}?avail=${avail}` : URL; // Use URL
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch books");
        return await response.json();
    } catch (error) {
        console.error("Error fetching books:", error);
        return [];
    }
}

export async function fetchBookById(id) {
    try {
        const response = await fetch(`${URL}/${id}`); // Use URL here as well
        if (!response.ok) throw new Error("Failed to fetch the book");
        return await response.json();
    } catch (error) {
        console.error("Error fetching book by ID:", error);
        return null;
    }
}

export {
    fetchAllBooks,
    fetchBookById,
};