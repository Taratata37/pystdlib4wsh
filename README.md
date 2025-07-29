# pystdlib4wsh

**pystdlib4wsh** est une implémentation en JavaScript de plusieurs modules inspirés de la bibliothèque standard Python, conçue pour être utilisée avec Windows Script Host (WSH). Ce projet permet d'écrire des scripts WSH en JavaScript tout en bénéficiant d'une interface familière pour les développeurs Python.

## Objectif

Fournir une collection de modules JavaScript imitant les modules standards de Python, afin de faciliter l'écriture de scripts WSH robustes et lisibles.

## 📦 Modules implémentés

- [IO](https://docs.python.org/fr/3/library/io.html) – Lecture/écriture de fichiers texte ou binaires (`open`, `TextIOBase`, `RawIOBase`)
- **csv** – Lecture et écriture de fichiers CSV
- **datetime** – Manipulation de dates et d'heures
- **json** – Sérialisation et désérialisation JSON
- [os](https://docs.python.org/fr/3/library/os.html?highlight=os#module-os) – Fonctions de manipulation du système de fichiers
- **path** – Manipulation de chemins de fichiers
- **re** – Expressions régulières
- [request](https://docs.python.org/fr/3/library/urllib.request.html) – Téléchargement de contenu distant via HTTP (`urlopen`)
- **shutil** – Fonctions de copie et suppression de fichiers
- **sys** – Accès aux arguments de la ligne de commande et autres informations système

Mais aussi la classe [configparser](https://docs.python.org/fr/3/library/configparser.html).

## 📁 Exemples

Des exemples d'utilisation sont disponibles dans le dossier `examples/`, incluant un préprocesseur de texte.

## ✅ Tests

Une suite de tests unitaires est disponible dans le dossier `tests/`. La suite se lance simplement en exécutant le fichier lancer_tests.cmd.

## 🚀 Installation

Aucune installation n'est requise. Clonez simplement le dépôt et utilisez les fichiers JavaScript dans vos scripts WSH.

```bash
git clone https://github.com/Taratata37/pystdlib4wsh.git

