document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bmi-form');
    const weightInput = document.getElementById('weight');
    const ageInput = document.getElementById('age');
    const measurementInput = document.getElementById('measurement');
    const measurementLabel = document.getElementById('measurement-label');
    const measurementHelp = document.getElementById('measurement-help');
    const resultDiv = document.getElementById('result');
    const bmiNumber = document.getElementById('bmi-number');
    const measurementUsed = document.getElementById('measurement-used');
    const conversionNote = document.getElementById('conversion-note');
    const categoryText = document.getElementById('category-text');

    // Update measurement label and help text based on age
    ageInput.addEventListener('input', function() {
        const age = parseInt(this.value);
        updateMeasurementLabels(age);
    });

    function updateMeasurementLabels(age) {
        if (age < 24) {
            measurementLabel.textContent = 'Body Length (cm)';
            measurementHelp.textContent = 'For children under 24 months: Enter body length';
        } else {
            measurementLabel.textContent = 'Height (cm)';
            measurementHelp.textContent = 'For children 24 months and over: Enter height';
        }
    }

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateBMI();
    });

    function calculateBMI() {
        const weight = parseFloat(weightInput.value);
        const age = parseInt(ageInput.value);
        const measurement = parseFloat(measurementInput.value);

        // Validate inputs
        if (!validateInputs(weight, age, measurement)) {
            return;
        }

        // Determine if we need to convert measurement
        let heightForBMI;
        let measurementType;
        let conversionMessage = '';

        if (age < 24) {
            // Child under 24 months - input should be body length
            // Convert length to height by adding 0.7 cm
            heightForBMI = measurement + 0.7;
            measurementType = 'Body Length';
            conversionMessage = `Converted from body length (${measurement} cm) to height (${heightForBMI.toFixed(1)} cm) by adding 0.7 cm`;
        } else {
            // Child 24 months and over - input should be height
            // Use height directly for BMI calculation
            heightForBMI = measurement;
            measurementType = 'Height';
            conversionMessage = `Using height measurement directly: ${heightForBMI} cm`;
        }

        // Calculate BMI using height in meters
        const heightInMeters = heightForBMI / 100;
        const bmi = weight / (heightInMeters * heightInMeters);

        // Display results
        displayResults(bmi, measurementType, measurement, conversionMessage, age);
    }

    function validateInputs(weight, age, measurement) {
        let isValid = true;

        // Clear previous errors
        clearErrors();

        if (isNaN(weight) || weight <= 0) {
            showError(weightInput, 'Please enter a valid weight');
            isValid = false;
        }

        if (isNaN(age) || age < 0 || age > 240) {
            showError(ageInput, 'Please enter age between 0-240 months');
            isValid = false;
        }

        if (isNaN(measurement) || measurement <= 0) {
            showError(measurementInput, 'Please enter a valid measurement');
            isValid = false;
        }

        return isValid;
    }

    function showError(input, message) {
        let errorElement = input.parentNode.querySelector('.error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error';
            input.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
        errorElement.classList.add('show');
        input.style.borderColor = '#e74c3c';
    }

    function clearErrors() {
        const errors = document.querySelectorAll('.error');
        errors.forEach(error => {
            error.classList.remove('show');
        });

        const inputs = document.querySelectorAll('input[type="number"]');
        inputs.forEach(input => {
            input.style.borderColor = '#e1e5e9';
        });
    }

    function displayResults(bmi, measurementType, originalMeasurement, conversionMessage, age) {
        // Update BMI value
        bmiNumber.textContent = bmi.toFixed(1);

        // Update measurement information
        measurementUsed.textContent = `${measurementType}: ${originalMeasurement} cm (Age: ${age} months)`;
        conversionNote.textContent = conversionMessage;

        // Determine BMI category (simplified categories for children)
        const category = getBMICategory(bmi, age);
        categoryText.textContent = category.text;
        
        // Update result background color based on category
        updateResultStyle(category.type);

        // Show result
        resultDiv.classList.remove('hidden');
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function getBMICategory(bmi, age) {
        // Simplified BMI categories for children
        // Note: In real applications, you would use age and gender-specific percentile charts
        if (age < 24) {
            // For infants and toddlers (under 2 years)
            if (bmi < 14) return { text: 'Underweight', type: 'underweight' };
            if (bmi < 18) return { text: 'Normal weight', type: 'normal' };
            if (bmi < 20) return { text: 'Overweight', type: 'overweight' };
            return { text: 'Obese', type: 'obese' };
        } else {
            // For children 2 years and older
            if (bmi < 15) return { text: 'Underweight', type: 'underweight' };
            if (bmi < 20) return { text: 'Normal weight', type: 'normal' };
            if (bmi < 25) return { text: 'Overweight', type: 'overweight' };
            return { text: 'Obese', type: 'obese' };
        }
    }

    function updateResultStyle(categoryType) {
        const result = document.getElementById('result');
        
        // Remove existing category classes
        result.classList.remove('underweight', 'normal', 'overweight', 'obese');
        
        // Add new category class
        result.classList.add(categoryType);
        
        // Update gradient based on category
        switch(categoryType) {
            case 'underweight':
                result.style.background = 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)';
                break;
            case 'normal':
                result.style.background = 'linear-gradient(135deg, #00b894 0%, #00a085 100%)';
                break;
            case 'overweight':
                result.style.background = 'linear-gradient(135deg, #fdcb6e 0%, #e17055 100%)';
                break;
            case 'obese':
                result.style.background = 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)';
                break;
            default:
                result.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
        }
    }

    // Initialize measurement labels on page load
    updateMeasurementLabels(0);
});
