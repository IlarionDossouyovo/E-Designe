#!/bin/bash

# Graphisme Backup Script (Linux/Mac)
# Complete backup of the project

BACKUP_PATH="${HOME}/OneDrive/Backups/Graphisme"
TIMESTAMP=$(date +"%Y-%m-%d_%H%M%S")
BACKUP_DIR="${BACKUP_PATH}/${TIMESTAMP}"

echo "========================================"
echo "  GRAPHISME BACKUP SYSTEM"
echo "========================================"
echo ""

# Create backup directory
mkdir -p "$BACKUP_DIR"

echo "[1/5] Creating backup directory..."
echo "[2/5] Copying project files..."

# Folders and files to backup
ITEMS=(
    "src"
    "public"
    "package.json"
    "package-lock.json"
    "next.config.js"
    "tsconfig.json"
    "tailwind.config.js"
    ".env.example"
    "README.md"
    "CONFIGURATION.md"
)

for item in "${ITEMS[@]}"; do
    if [ -e "$item" ]; then
        cp -r "$item" "$BACKUP_DIR/"
        echo "  ✓ $item"
    fi
done

echo "[3/5] Creating ZIP archive..."
ZIP_PATH="${BACKUP_PATH}/Graphisme_${TIMESTAMP}.zip"
cd "$BACKUP_DIR" && zip -r "$ZIP_PATH" ./

echo "[4/5] Cleaning old backups (older than 30 days)..."
find "$BACKUP_PATH" -name "Graphisme_*.zip" -mtime +30 -delete 2>/dev/null

echo "[5/5] Backup summary..."
ZIP_SIZE=$(du -h "$ZIP_PATH" | cut -f1)

echo ""
echo "========================================"
echo "  BACKUP COMPLETED SUCCESSFULLY!"
echo "========================================"
echo ""
echo "Archive: $ZIP_PATH"
echo "Size: $ZIP_SIZE"
echo "Date: $(date '+%Y-%m-%d %H:%M:%S')"
echo ""

# Copy to OneDrive if available
if [ -d "$HOME/OneDrive/Documents/Graphisme_Backups" ]; then
    echo "Copying to OneDrive..."
    cp "$ZIP_PATH" "$HOME/OneDrive/Documents/Graphisme_Backups/"
    echo "  ✓ Copied to OneDrive"
fi

echo ""
echo "Operation completed!"
