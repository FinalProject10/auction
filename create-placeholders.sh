#!/bin/bash

# Create placeholder images so the app works while you download real images
# Run: bash create-placeholders.sh

echo "🎨 Creating placeholder images..."

cd front/public/images

# Create directories
mkdir -p {logo,home,categories,about,testimonials,icons,how-it-works,sidebar,vehicles,empty,payment,backgrounds,seller}

# Create simple placeholder images using ImageMagick or fallback to base64
if command -v convert &> /dev/null; then
    echo "Using ImageMagick..."
    
    # Logo placeholder (SVG)
    echo '<svg width="200" height="60" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="60" fill="#ff2800"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="white" font-size="24" font-weight="bold">AutoBid</text></svg>' > logo/logo-autobid.svg
    
    # Category placeholders (200x150)
    convert -size 200x150 xc:#e0e0e0 -pointsize 20 -fill "#666" -gravity center -annotate +0+0 "Sedan" categories/sedan.png
    convert -size 200x150 xc:#e0e0e0 -pointsize 20 -fill "#666" -gravity center -annotate +0+0 "SUV" categories/suv.png
    convert -size 200x150 xc:#e0e0e0 -pointsize 20 -fill "#666" -gravity center -annotate +0+0 "Sports" categories/sports.png
    convert -size 200x150 xc:#e0e0e0 -pointsize 20 -fill "#666" -gravity center -annotate +0+0 "Convertible" categories/convertible.png
    convert -size 200x150 xc:#e0e0e0 -pointsize 20 -fill "#666" -gravity center -annotate +0+0 "Compact" categories/compact.png
    convert -size 200x150 xc:#e0e0e0 -pointsize 20 -fill "#666" -gravity center -annotate +0+0 "Pickup" categories/pickup.png
    convert -size 200x150 xc:#e0e0e0 -pointsize 20 -fill "#666" -gravity center -annotate +0+0 "Crossover" categories/crossover.png
    convert -size 200x150 xc:#e0e0e0 -pointsize 20 -fill "#666" -gravity center -annotate +0+0 "Electric" categories/electric.png
    
    # Home images (1920x1080)
    convert -size 1920x1080 xc:#2c3e50 -pointsize 48 -fill "white" -gravity center -annotate +0+0 "AutoBid\nCar Auction" home/autobid-home-scaled.jpg
    convert -size 1920x1080 xc:#34495e -pointsize 48 -fill "white" -gravity center -annotate +0+0 "AutoBid\nPremium Cars" home/autobid-home2.jpg
    
    echo "✅ Placeholder images created!"
else
    echo "⚠️  ImageMagick not found. Creating simple text files as placeholders..."
    echo "Install ImageMagick: brew install imagemagick (macOS) or apt-get install imagemagick (Linux)"
    
    # Create simple text placeholders
    echo "Placeholder: Logo" > logo/logo-autobid.svg
    echo "Placeholder: Home 1" > home/autobid-home-scaled.jpg
    echo "Placeholder: Home 2" > home/autobid-home2.jpg
    echo "Placeholder: Sedan" > categories/sedan.png
    echo "Placeholder: SUV" > categories/suv.png
    echo "Placeholder: Sports" > categories/sports.png
    echo "Placeholder: Convertible" > categories/convertible.png
    echo "Placeholder: Compact" > categories/compact.png
    echo "Placeholder: Pickup" > categories/pickup.png
    echo "Placeholder: Crossover" > categories/crossover.png
    echo "Placeholder: Electric" > categories/electric.png
    
    echo "⚠️  Created text placeholders. Install ImageMagick for proper images."
fi

echo ""
echo "📝 Next steps:"
echo "1. Download real images manually (see EXTERNAL_IMAGES_LIST.md)"
echo "2. Replace placeholders with real images"
echo "3. Update code to use /images/ paths"

