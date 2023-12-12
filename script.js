/**
 * Rukuje odabirom vrste znamenke u korisničkom sučelju.
 * Ako je odabrano 'prilagođeno', prikazuje polje za unos prilagođenih znamenki.
 * U suprotnom, skriva prilagođeno polje za unos znamenki.
 */
function handleDigitSelect() {
    const digitSelect = document.getElementById('digitSelect');
    const customDigitsInput = document.getElementById('customDigitsInput');

    if (digitSelect.value === 'custom') {
        customDigitsInput.style.display = 'block';
    } else {
        customDigitsInput.style.display = 'none';
    }
}

/**
 * Generira broj na temelju odabranih opcija u korisničkom sučelju.
 * Ako se tijekom procesa pojavi pogreška, prikazuje se poruka o pogrešci u polju rezultata.
 */
function generateNumber() {
    try {
        const digitSelect = document.getElementById('digitSelect');
        let selectedDigit;

        if (digitSelect.value === 'custom') {
            const customDigitsInput = document.getElementById('customDigits');
            selectedDigit = parseInt(customDigitsInput.value);
        } else {
            selectedDigit = parseInt(digitSelect.value);
        }

        const restrictionSelect = document.getElementById('restrictionSelect');
        const selectedRestrictions = Array.from(restrictionSelect.selectedOptions, option => option.value);

        // Implement number generation logic based on selected options
        const generatedNumber = generateRandomNumber(selectedDigit, selectedRestrictions);

        // Display the result
        const result = document.getElementById('result');
        result.textContent = generatedNumber !== null ? `Generated Number: ${generatedNumber}` : 'That number is theoretically not possible';
    } catch (error) {
        console.error(error);
        const result = document.getElementById('result');
        result.textContent = 'An error occurred. Please try again.';
    }
}

/**
 * Generira nasumični broj s određenim brojem znamenki i ograničenjima.
 *
 * @param {number} digits - Broj znamenki u generiranom broju.
 * @param {Array} restrictions - Niz ograničenja koja se primjenjuju na generirani broj.
 * @returns {string} - Generirani broj kao niz.
 */
function generateRandomNumber(digits, restrictions) {
    let candidate;

    do {
        candidate = generateCandidate(digits);
    } while (!isNumberValid(candidate, restrictions));

    return candidate;
}

/**
* Generira broj kandidata s navedenim brojem znamenki.
 *
 * @param {number} digits - Broj znamenki u broju kandidata.
 * @returns {string} - broj kandidata kao niz.
 */
function generateCandidate(digits) {
    let candidate = '';

    for (let i = 0; i < digits; i++) {
        candidate += Math.floor(Math.random() * 10).toString();
    }

    return candidate;
}

/**
 * Provjerava je li broj valjan na temelju navedenih ograničenja.
 *
 * @param {string} number - Broj za provjeru.
 * @param {Array} restrictions - Niz ograničenja koja se primjenjuju na broj.
 * @returns {boolean} - True ako je broj važeći, false inače.
 */
function isNumberValid(number, restrictions) {
    if (restrictions.includes('noRepeat') && hasRepeatedDigits(number)) {
        return false;
    }

    if (restrictions.includes('divisibleBy2') && parseInt(number) % 2 !== 0) {
        return false;
    }

    if (restrictions.includes('divisibleBy5') && parseInt(number) % 5 !== 0) {
        return false;
    }

    if (restrictions.includes('divisibleBy10') && parseInt(number) % 10 !== 0) {
        return false;
    }

    if (restrictions.includes('divisibleBy7Or3') && (parseInt(number) % 7 !== 0 && parseInt(number) % 3 !== 0)) {
        return false;
    }

    if (restrictions.includes('positiveDigitsSum') && getDigitsSum(number) <= 0) {
        return false;
    }

    return true;
}

/**
 * Provjerava da li broj ima ponovljene znamenke.
 *
 * @param {string} number - Broj za provjeru.
 * @returns {boolean} - True ako broj ima ponovljene znamenke, false inače.
 */
function hasRepeatedDigits(number) {
    const digitSet = new Set(number);
    return digitSet.size !== number.length;
}

/**
 * Izračunava zbroj znamenki u broju.
 *
 * @param {string} number - Broj za izračun zbroja njegovih znamenki.
 * @returns {number} - zbroj znamenki u broju.
 */
function getDigitsSum(number) {
    return number.split('').reduce((sum, digit) => sum + parseInt(digit), 0);
}