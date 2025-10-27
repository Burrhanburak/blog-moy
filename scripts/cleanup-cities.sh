#!/bin/bash

# Script to keep only priority cities and delete the rest
# Target: Reduce from 2625 to ~600 MDX files

cd /Users/burakozcan/Desktop/blog-moy

# Define priority cities to KEEP (all others will be deleted)
declare -A KEEP_CITIES

# Australia - Keep Sydney and Melbourne
KEEP_CITIES["australia"]="sydney melbourne"

# Canada - Keep Toronto and Vancouver
KEEP_CITIES["canada"]="toronto vancouver"

# Denmark - Keep Copenhagen
KEEP_CITIES["denmark"]="copenhagen"

# France - Keep Paris and Lyon
KEEP_CITIES["france"]="paris lyon"

# Germany - Keep Berlin and Munich
KEEP_CITIES["germany"]="berlin munich"

# Japan - Keep Tokyo
KEEP_CITIES["japan"]="tokyo"

# Netherlands - Keep Amsterdam and Rotterdam
KEEP_CITIES["netherlands"]="amsterdam rotterdam"

# Norway - Keep Oslo
KEEP_CITIES["norway"]="oslo"

# Saudi Arabia - Keep Riyadh and Jeddah
KEEP_CITIES["saudi-arabia"]="riyadh jeddah"

# Singapore - Keep Singapore
KEEP_CITIES["singapore"]="singapore"

# South Korea - Keep Seoul
KEEP_CITIES["south-korea"]="seoul"

# Sweden - Keep Stockholm
KEEP_CITIES["sweden"]="stockholm"

# Switzerland - Keep Zurich
KEEP_CITIES["switzerland"]="zurich"

# UAE - Keep Dubai and Abu Dhabi
KEEP_CITIES["united-arab-emirates"]="dubai abu-dhabi"

# UK - Keep London
KEEP_CITIES["united-kingdom"]="london"

# USA - Keep New York City and Los Angeles
KEEP_CITIES["united-states"]="new-york-city los-angeles"

echo "Starting cleanup..."
echo "Current MDX count: $(find content -name '*.mdx' -type f | wc -l)"

# Process each country
for country in content/*/; do
    if [ ! -d "$country" ]; then
        continue
    fi

    country_name=$(basename "$country")

    # Skip if country is not in our list (like generation-stats.json)
    if [ -z "${KEEP_CITIES[$country_name]}" ]; then
        continue
    fi

    echo ""
    echo "Processing $country_name..."

    # Get list of cities to keep for this country
    cities_to_keep="${KEEP_CITIES[$country_name]}"

    # Find all city directories
    for state_dir in "$country"*/; do
        if [ ! -d "$state_dir" ]; then
            continue
        fi

        for city_dir in "$state_dir"*/; do
            if [ ! -d "$city_dir" ]; then
                continue
            fi

            city_name=$(basename "$city_dir")

            # Check if this city should be kept
            should_keep=false
            for keep_city in $cities_to_keep; do
                if [ "$city_name" == "$keep_city" ]; then
                    should_keep=true
                    break
                fi
            done

            if [ "$should_keep" = false ]; then
                echo "  Deleting: $country_name/$(basename "$state_dir")/$city_name"
                rm -rf "$city_dir"
            else
                echo "  Keeping: $country_name/$(basename "$state_dir")/$city_name"
            fi
        done

        # Remove empty state directories
        if [ -z "$(ls -A "$state_dir")" ]; then
            echo "  Removing empty state dir: $(basename "$state_dir")"
            rm -rf "$state_dir"
        fi
    done
done

echo ""
echo "Cleanup complete!"
echo "Final MDX count: $(find content -name '*.mdx' -type f | wc -l)"
