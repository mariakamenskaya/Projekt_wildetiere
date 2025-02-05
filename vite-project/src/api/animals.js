// import axios from "axios";

// const API_BASE_URL = "https://api.gbif.org/v1";

// export async function getAnimalsByGroup(group) {
// 	try {
// 		const response = await axios.get(`${API_BASE_URL}/species/search`, {
// 			params: {
// 				habitat: group, // Beispiel: "forest", "marine"
// 				limit: 100, // Begrenzung der Ergebnisse
// 			},
// 		});
// 		return response.data.results.map((animal) => ({
// 			name: animal.scientificName || "Unknown",
// 			status: "Endangered", // GBIF liefert keine Bedrohungsstatus-Daten direkt, aber wir können eine Standardkategorie setzen.
// 			population: "Unknown", // GBIF enthält keine Population, daher als "Unknown".
// 			habitat: animal.habitat || "Unknown",
// 			size: animal.size || "Unknown", // Dies müsste manuell ergänzt werden.
// 			threat: animal.threats || "Unknown", // Dies müsste ebenfalls ergänzt werden.
// 			image: "/images/placeholder.jpg", // Platzhalter-Bild
// 		}));
// 	} catch (error) {
// 		console.error("Fehler beim Abrufen der Tiere:", error);
// 		return [];
// 	}
// }
