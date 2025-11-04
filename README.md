# BMI Calculator for Children

A specialized Body Mass Index calculator designed for children that automatically handles age-appropriate measurements and conversions.

## Features

- **Age-appropriate measurements**: Automatically switches between body length (under 24 months) and height (24+ months)
- **Automatic conversion**: Converts between body length and height using the 0.7cm rule
- **Responsive design**: Works on desktop and mobile devices
- **Input validation**: Ensures all inputs are valid before calculation
- **Visual feedback**: Color-coded results based on BMI categories

## How It Works

### Measurement Types
- **Children under 24 months**: Use body length measurement
- **Children 24 months and over**: Use height measurement

### Conversion Rules
- **Length to Height**: Add 0.7 cm to body length to get height for BMI calculation
- **Height to Length**: Subtract 0.7 cm from height (not used in this calculator)

### BMI Calculation
The calculator uses the standard BMI formula: `BMI = weight (kg) / height (m)²`

For children under 24 months, the body length is first converted to height by adding 0.7 cm before calculating BMI.

## Usage

1. Enter the child's weight in kilograms
2. Enter the child's age in months (0-240 months)
3. Enter the appropriate measurement:
   - For children under 24 months: Enter body length in centimeters
   - For children 24+ months: Enter height in centimeters
4. Click "Calculate BMI" to see the result

## Files

- `index.html` - Main HTML structure
- `styles.css` - CSS styling and responsive design
- `script.js` - JavaScript logic for calculations and interactions
- `README.md` - This documentation file

## Running the Calculator

1. Open `index.html` in a web browser, or
2. Serve the files using a local web server:
   ```bash
   python3 -m http.server 8000
   ```
   Then visit `http://localhost:8000`

## BMI Categories

The calculator provides simplified BMI categories for children:

### Under 24 months:
- Underweight: BMI < 14
- Normal weight: BMI 14-18
- Overweight: BMI 18-20
- Obese: BMI > 20

### 24 months and over:
- Underweight: BMI < 15
- Normal weight: BMI 15-20
- Overweight: BMI 20-25
- Obese: BMI > 25

**Note**: These are simplified categories. For medical purposes, consult healthcare professionals who use age and gender-specific percentile charts.

## Technical Details

- Pure HTML, CSS, and JavaScript (no external dependencies)
- Responsive design using CSS Grid and Flexbox
- Form validation with real-time feedback
- Smooth animations and transitions
- Cross-browser compatible
