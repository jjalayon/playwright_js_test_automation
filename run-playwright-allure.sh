#!/bin/bash
# ============================================================
# Self-healing script to run Playwright tests with Allure reports
# ============================================================

set -e  # Exit on error

RESULTS_DIR="allure-results"
REPORT_DIR="allure-report"

# Function to check and install a package if missing
install_if_missing() {
    local package=$1
    if ! npm list --depth=1 "$package" >/dev/null 2>&1; then
        echo "📦 Installing missing package: $package ..."
        npm install --save-dev "$package"
    else
        echo "✅ $package already installed."
    fi
}

# Step 1: Ensure required dependencies are installed
echo "🔍 Checking dependencies..."
install_if_missing @playwright/test
install_if_missing allure-playwright
install_if_missing allure-commandline

# Step 2: Ensure Playwright browsers are installed
if ! npx playwright --version >/dev/null 2>&1; then
    echo "🌐 Installing Playwright browsers..."
    npx playwright install --with-deps
fi

# Step 3: Clean old results
echo "🧹 Cleaning old Allure results..."
rm -rf "$RESULTS_DIR" "$REPORT_DIR"

# Step 4: Run Playwright tests
echo "🚀 Running Playwright tests..."
npx playwright test --config=playwright.config.js

# Step 5: Generate Allure report
if [ -d "$RESULTS_DIR" ]; then
    echo "📊 Generating Allure HTML report..."
    npx allure generate "$RESULTS_DIR" --clean -o "$REPORT_DIR"
    echo "🌐 Opening Allure report..."
    npx allure open "$REPORT_DIR"
else
    echo "❌ No Allure results found. Tests may have failed before reporting."
    exit 1
fi