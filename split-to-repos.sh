#!/bin/bash
# Script to move folders into new split repositories

# Stop on error
set -e

# Create frontend and backend repo folders if not exist
mkdir -p ../soxmed-frontend
mkdir -p ../soxmed-backend

# Move frontend-related folders
mv landing-page ../soxmed-frontend/
mv chrome-extension ../soxmed-frontend/

# Move backend folder
mv backend ../soxmed-backend/

# Move README files if needed
if [ -f soxmed-frontend/README.md ]; then
  mv soxmed-frontend/README.md ../soxmed-frontend/
fi
if [ -f soxmed-backend/README.md ]; then
  mv soxmed-backend/README.md ../soxmed-backend/
fi

echo "Pemindahan selesai. Cek ../soxmed-frontend dan ../soxmed-backend."
