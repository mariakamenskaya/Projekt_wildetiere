# 🎮 Mein Tier-Quartett Projekt

## 👋 Über das Projekt

Als Studentin habe ich ein digitales Tier-Quartett entwickelt. Das Spiel kombiniert klassisches Quartett mit interessanten Tierfakten und einem modernen Web-Interface.

## 🎯 Spielprinzip

-   Spieler treten gegeneinander an
-   Jede Karte zeigt ein Tier mit verschiedenen Eigenschaften (Größe, Gewicht, Alter, etc.)
-   Spieler wählen eine Eigenschaft, die höchste gewinnt
-   Gewonnene Karten werden dem eigenen Stapel hinzugefügt

## 🔧 Technische Umsetzung

Ich habe das Projekt mit Svelte entwickelt, weil:

-   Reaktives Verhalten super einfach zu implementieren ist
-   Komponenten sehr übersichtlich sind
-   Performance besonders gut ist

### 📁 Projektstruktur

```
vite-project/src/
├── components/
│   ├── AnimalCard.svelte    # Einzelne Tierkarte
│   ├── Navigation.svelte    # Menüführung
│   ├── Header.svelte
│   └── Footer.svelte
├── pages/
│   ├── Home.svelte         # Startseite
│   ├── Game.svelte        # Hauptspiellogik
│   └── AnimalsOverview.svelte  # Übersicht aller Tierkarten mit Filter- und Sortierfunktionen
└── stores/
    └── gameStore.js       # Spielzustand & Logik
├── routes.js
├── App.svelte
├── main.js
└── app.css
```

## 💡 Besondere Features

-   🔍 Dynamische Filterung der Tiere nach Kategorien (Säugetiere, Vögel, etc.)
-   🎨 Schöne Tier-Illustrationen generiert mit Stable Diffusion
-   🎲 Zufällige Kartenverteilung zu Spielbeginn
-   🔄 Automatischer Kartentransfer nach jeder Runde
-   🏆 Punktestand-Anzeige in Echtzeit
-   🎮 Einfache Bedienung durch Klick/Touch auf Eigenschaften
-   🎯 Hervorhebung der gewinnenden Eigenschaft (Feuerwerk)
-   📱 Responsive Design für Desktop und Mobile

## 🎲 Spielablauf

1. **Startseite (Home.svelte)**

    -Navigation zwischen Startseite, Kartenübersicht und Spielseite
    -Einleitungstext
    -Footer mit Bild- und GitHub-Link

2. **Kartenübersicht (AnimalsOverview.svelte)**

    - Alle verfügbaren Karten
    - Filter- und Sortiermöglichkeiten
    - Eigenschaften der einzelnen Tiere (zusätzlich zu den Quartettkarten-Eigenschaften)

3. **Spielseite (Game.svelte)**

    - Anzeige der aktuellen Karten
    - Eigenschaftsauswahl
    - Punktestand
    - Spielerverwaltung

## 💪 Meine Erfolge & Herausforderungen

### 🌟 Besonders gut gelungen

#### Animals Overview Page

Die Entwicklung der Tierübersicht war eines meiner Highlights! Ich habe eine dynamische Filterfunktion implementiert, die es ermöglicht, Tiere nach verschiedenen Kategorien zu sortieren. Besonders stolz bin ich auf:

```javascript
// Meine Filter- und Sortierlösung
function filterAndSortAnimals(category, sortBy) {
	// Erst filtern
	let filtered = animals.filter((animal) =>
		category === "all" ? true : animal.category === category
	);

	// Dann intelligent sortieren
	return filtered.sort((a, b) => {
		if (sortBy === "name") return a.name.localeCompare(b.name);
		return b[sortBy] - a[sortBy];
	});
}
```

#### Bildergenerierung mit KI

Die Generierung der Tierbilder mit Stable Diffusion war ein spannendes Teilprojekt:

-   Entwicklung spezieller Prompts für konsistenten Stil
-   Integration von Bildoptimierung für schnelles Laden
-   Implementierung von Fallback-Bildern
-   Erstellung eines einheitlichen, cartoon-artigen Looks

### 😅 Herausforderungen

#### Spiellogik Komplexität

Die größte Herausforderung war definitiv die Spiellogik. Hier hatte ich einige knifflige Momente:

```javascript
// Komplexe Spiellogik für den Vergleich der Karten
function compareCards(playerCard, computerCard, selectedProperty) {
	// Prüfen ob die ausgewählte Eigenschaft existiert
	if (
		!(selectedProperty in playerCard) ||
		!(selectedProperty in computerCard)
	) {
		throw new Error("Ungültige Eigenschaft ausgewählt");
	}

	// Werte der Karten für die ausgewählte Eigenschaft vergleichen
	const playerValue = playerCard[selectedProperty];
	const computerValue = computerCard[selectedProperty];

	// Gewinner ermitteln
	if (playerValue > computerValue) {
		return "player";
	} else if (computerValue > playerValue) {
		return "computer";
	} else {
		return "draw";
	}
}
```

Besondere Schwierigkeiten hatte ich mit:

-   🎲 Synchronisation der Spielzüge
-   🔄 Korrekter Kartentransfer nach Rundenende

Durch viel Recherche und einige Refactoring-Runden habe ich die Probleme schließlich gelöst, aber es war definitiv der anspruchsvollste Teil des Projekts!

## 🎨 Design-Entscheidungen

-   Kartendesign im Retro-Stil
-   Stapel-Effekt für Karten
-   Responsive Layout für Mobile Gaming

## 🔜 Geplante Erweiterungen

-   Animationen für Kartenbewegungen
-   Neue Tierkarten und Kategorien
-   Statistik-System
-   Achievement-System

Vielen Dank für eure Aufmerksamkeit!
