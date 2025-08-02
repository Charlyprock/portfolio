import { DateUtil } from "./dateUtil"
  
const validationRules = {
  email: {
    required: false,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Email invalide'
  },
  password: {
    required: true,
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    message: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial'
  },
  first_name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-ZÀ-ÿ\s'-]+$/,
    message: 'Prénom invalide (2-50 caractères, lettres uniquement)'
  },
  last_name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-ZÀ-ÿ\s'-]+$/,
    message: 'Nom invalide (2-50 caractères, lettres uniquement)'
  },
  code: {
    required: false,
    pattern: /^[A-Za-z0-9]{6,20}$/,
    message: 'Code invalide (6-10 caractères alphanumériques)'
  },
  phone: {
    required: false,
    pattern: /^(\+237|237)?[2-9]\d{8}$/,
    message: 'Numéro de téléphone camerounais invalide'
  },
  address: {
    required: false,
    minLength: 10,
    maxLength: 200,
    message: 'Adresse invalide (10-200 caractères)'
  },
  genre: {
    required: false,
    options: ['m', 'f'],
    message: 'Genre requis (m, f)'
  },
  nationnality: {
    required: false,
    minLength: 2,
    maxLength: 50,
    message: 'Nationalité requise'
  },
  image: {
    required: false,
    fileTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    maxSize: 5 * 1024 * 1024, // 5MB
    message: 'Image invalide (JPEG, PNG, GIF, WebP, max 5MB)'
  },
  level: {
    required: true,
    message: 'Niveau d\'études requis'
  },
  speciality: {
    required: true,
    minLength: 2,
    maxLength: 100,
    message: 'Spécialité requise (2-100 caractères)'
  },
  classe: {
    required: true,
    minLength: 2,
    maxLength: 50,
    message: 'Classe requise (2-50 caractères)'
  },
  year: {
    required: true,
    custom: (value) => DateUtil.validateYearFormat(value),
    message: 'Année académique invalide (format: YYYY/YYYY+1)'
  },
  is_delegate: {
    required: false,
    type: 'boolean',
    message: 'Statut de délégué requis'
  },
  birth_date: {
    required: false,
    custom: (value) => DateUtil.validateBirthDate(value, { minAge: 16, maxAge: 60, format: 'YYYY-MM-DD' }),
    message: 'Date de naissance invalide (âge entre 16 et 60 ans)'
  },
  birth_place: {
    required: false,
    minLength: 2,
    maxLength: 100,
    message: 'Lieu de naissance requis (2-100 caractères)'
  },
  is_work: {
    required: false,
    type: 'boolean',
    message: 'Statut professionnel requis'
  }
}

// Fonction de validation d'un champ
function validateField(fieldName, value, rule) {
  const fieldErrors = []

  
  // Vérifier si requis
  if (rule.required && (value === null || value === undefined || value === '')) {
    fieldErrors.push(`${fieldName} est requis`)
    return fieldErrors
  }
  
  // Si pas requis et vide, pas d'autres validations
  if (!rule.required && (value === null || value === undefined || value === '')) {
    return fieldErrors
  }
  
  // Validation du type
  if (rule.type === 'boolean' && typeof value !== 'boolean') {
    fieldErrors.push(`${fieldName} doit être vrai ou faux`)
  }
  
  // Validation de la longueur minimale
  if (rule.minLength && value && value.length < rule.minLength) {
    fieldErrors.push(`${fieldName} doit contenir au moins ${rule.minLength} caractères`)
  }
  
  // Validation de la longueur maximale
  if (rule.maxLength && value && value.length > rule.maxLength) {
    fieldErrors.push(`${fieldName} ne peut pas dépasser ${rule.maxLength} caractères`)
  }
  
  // Validation du pattern
  if (rule.pattern && value && !rule.pattern.test(value)) {
    fieldErrors.push(rule.message || `${fieldName} a un format invalide`)
  }
  
  // Validation des options
  if (rule.options && value && !rule.options.includes(value)) {
    fieldErrors.push(`${fieldName} doit être l'une des valeurs: ${rule.options.join(', ')}`)
  }
  
  // Validation des fichiers
  if (rule.fileTypes && value instanceof File) {
    if (!rule.fileTypes.includes(value.type)) {
      fieldErrors.push(`${fieldName} doit être de type: ${rule.fileTypes.join(', ')}`)
    }
    if (rule.maxSize && value.size > rule.maxSize) {
      fieldErrors.push(`${fieldName} ne peut pas dépasser ${Math.round(rule.maxSize / 1024 / 1024)}MB`)
    }
  }
  
  // Validation personnalisée
  if (rule.custom && value) {
    const customResult = rule.custom(value)
    if (typeof customResult === 'boolean' && !customResult) {
      fieldErrors.push(rule.message || `${fieldName} est invalide`)
    } else if (typeof customResult === 'object' && !customResult.isValid) {
      fieldErrors.push(customResult.error || rule.message || `${fieldName} est invalide`)
    }
  }
  
  return fieldErrors
}

// Fonction de validation complète du formulaire
function validateForm(validationRules, form) {
  const formErrors = {}
  let isValid = true
  
  // Valider chaque champ
  Object.keys(form).forEach(fieldName => {
    const fieldValue = form[fieldName]
    const rule = validationRules[fieldName]
    const fieldErrors = validateField(fieldName, fieldValue, rule)
    
    if (fieldErrors.length > 0) {
      formErrors[fieldName] = fieldErrors
      isValid = false
    }
  })
  
  return { isValid, formErrors }
}

// Fonction pour créer le FormData
function createFormData(form) {
  const formData = new FormData()
  
  Object.keys(form).forEach(key => {
    const value = form[key]
    
    if (value !== null && value !== undefined) {
      if (value instanceof File) {
        
        formData.append(key, value)
      } else if (typeof value === 'boolean') {
        
        formData.append(key, value.toString())
      } else {
        
        formData.append(key, value)
      }
    }
  })
  
  return formData
}

// Fonction principale pour valider et créer FormData
function processForm(validationRules, form) {
  const { isValid, formErrors } = validateForm(validationRules, form)
  
  if (!isValid) {
    return {
      success: false,
      errors: formErrors,
      formData: null
    }
  }
  
  const formData = createFormData(form)
  
  return {
    success: true,
    errors: {},
    formData: formData
  }
}

// Fonction pour valider un champ en temps réel
function validateSingleField(fieldName, validationRules, form) {
  if (!validationRules[fieldName]) return
  
  const fieldValue = form[fieldName]
  const rule = validationRules[fieldName]
  const fieldErrors = validateField(fieldName, fieldValue, rule)
  
  if (fieldErrors.length > 0) {
    return fieldErrors
  }
}

function clearFormData(formData){
  const form = {}
  Object.keys(formData).forEach(key => {
    form[key] = null
  })
  return form
}

// Exemple d'utilisation
function submitForm() {
  const result = processForm(validationRules, form)
  
  if (result.success) {
    console.log('Formulaire valide!')
    // Envoyer result.formData à votre API
    // fetch('/api/submit', { method: 'POST', body: result.formData })
    return result.formData
  } else {
    console.log('Erreurs de validation:', result.errors)
    // Afficher les erreurs à l'utilisateur
    return null
  }
}


export const ValidatedUtil = {
  validateForm,
  validateSingleField,
  createFormData,
  clearFormData,
  processForm,
  validationRules,
}