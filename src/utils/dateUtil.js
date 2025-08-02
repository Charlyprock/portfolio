
function validateYearFormat(year) {
  const yearNow = new Date().getFullYear();
  const years = year.split('/');
  
  if (years.length === 2 && parseInt(years[1]) <= yearNow) {
    try {
      if (parseInt(years[0]) === parseInt(years[1]) - 1) {
        return true;
      }
    } catch (error) {
      return false;
    }
  }
  
  return false;
}

function validateBirthDate(dateString, options = {}) {
  const {
    format = 'DD/MM/YYYY',
    minAge = 0,             
    maxAge = 150
  } = options;
  
  
  if (!dateString || typeof dateString !== 'string') {
    return { isValid: false, error: 'Date requise' };
  }
  
  let day, month, year;
  
  if (format === 'DD/MM/YYYY') {
    const parts = dateString.split('/');
    if (parts.length !== 3) {
      return { isValid: false, error: 'Format invalide. Utilisez DD/MM/YYYY' };
    }
    [day, month, year] = parts.map(part => parseInt(part, 10));
  } else if (format === 'MM/DD/YYYY') {
    const parts = dateString.split('/');
    if (parts.length !== 3) {
      return { isValid: false, error: 'Format invalide. Utilisez MM/DD/YYYY' };
    }
    [month, day, year] = parts.map(part => parseInt(part, 10));
  } else if (format === 'YYYY-MM-DD') {
    const parts = dateString.split('-');
    if (parts.length !== 3) {
      return { isValid: false, error: 'Format invalide. Utilisez YYYY-MM-DD' };
    }
    [year, month, day] = parts.map(part => parseInt(part, 10));
  } else {
    return { isValid: false, error: 'Format non supporté' };
  }
  
  
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return { isValid: false, error: 'Date contient des caractères non numériques' };
  }
  
  if (year < 1900 || year > new Date().getFullYear()) {
    return { isValid: false, error: 'Année invalide' };
  }
  
  if (month < 1 || month > 12) {
    return { isValid: false, error: 'Mois invalide' };
  }
  
  if (day < 1 || day > 31) {
    return { isValid: false, error: 'Jour invalide' };
  }
  
  const birthDate = new Date(year, month - 1, day);
  
  
  if (birthDate.getFullYear() !== year || 
      birthDate.getMonth() !== month - 1 || 
      birthDate.getDate() !== day) {
    return { isValid: false, error: 'Date invalide' };
  }
  
  
  const today = new Date();
  if (birthDate > today) {
    return { isValid: false, error: 'La date de naissance ne peut pas être dans le futur' };
  }
  

  const age = calculateAge(birthDate);
  
  if (age < minAge) {
    return { isValid: false, error: `Âge minimum requis: ${minAge} ans` };
  }
  
  if (age > maxAge) {
    return { isValid: false, error: `Âge maximum autorisé: ${maxAge} ans` };
  }
  
  return { 
    isValid: true, 
    age: age,
    date: birthDate,
    formattedDate: formatDate(birthDate, format)
  };
}

function calculateAge(birthDate) {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

function formatDate(date, format) {
  // returns date in the specified format
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  switch (format) {
    case 'DD/MM/YYYY':
      return `${day}/${month}/${year}`;
    case 'MM/DD/YYYY':
      return `${month}/${day}/${year}`;
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`;
    default:
      return `${day}/${month}/${year}`;
  }
}

function SetformatDate(dateString) {
  // converts a date string to 'DD/MM/YYYY' format
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR')
}

export const DateUtil = {
  validateBirthDate,
  validateYearFormat,
  calculateAge,
  formatDate,
  SetformatDate,
}