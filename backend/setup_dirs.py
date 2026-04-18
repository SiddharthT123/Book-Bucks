import os
from pathlib import Path

# Get the project root directory
BASE_DIR = Path(__file__).resolve().parent.parent

# Create templates directory if it doesn't exist
TEMPLATES_DIR = BASE_DIR / 'templates'
TEMPLATES_DIR.mkdir(exist_ok=True)
