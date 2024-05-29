function findTempPreference() {
    const tempPreference = document.querySelector('.selected-measurement');
    if (tempPreference.textContent.includes('C')) {
        return 'c';
    }
    return 'f';
}

export default findTempPreference;
