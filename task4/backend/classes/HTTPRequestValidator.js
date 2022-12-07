function validateRequiredParams(requiredParams, params) {
    let badRequestErrors = [];

    const missedParams = requiredParams.filter(param => !Object.keys(params).includes(param));
    if (missedParams.length > 0) {
        badRequestErrors.push({message: 'Pominięto parametry: ' + missedParams.join()});
    }

    const redundantParams = Object.keys(params).filter(param => !requiredParams.includes(param));
    if (redundantParams.length > 0) {
        badRequestErrors.push({message: 'Nadmiarowe parametry: ' + redundantParams.join()});
    }
    badRequestErrors = validateParamsTypes(params, badRequestErrors);

    return badRequestErrors;
}

function validateAllowedParams(allowedParams, params) {
    let badRequestErrors = [];

    const notAllowedParams = Object.keys(params).filter(param => !allowedParams.includes(param));
    if (notAllowedParams.length > 0) {
        badRequestErrors.push({message: 'Niedozwolone parametry: ' + notAllowedParams.join()});
    }
    badRequestErrors = validateParamsTypes(params, badRequestErrors);

    return badRequestErrors;
}

function validateParamsTypes(params, badRequestErrors) {
    Object.entries(params).forEach(function (param) {
        if (typeof param[1] == 'string') {
            if (param[1] === '') {
                badRequestErrors.push({message: 'Parametr ' + param[0] + ' nie może być pusty.'});
            }
            params[param[0]] = '"' + param[1] + '"';
        }
        if (typeof param[1] == 'number' && param[1] <= 0) {
            badRequestErrors.push({message: 'Parametr ' + param[0] + ' musi być większy od 0.'});
        }
    });
    return badRequestErrors;
}

module.exports = {validateRequiredParams, validateAllowedParams}
