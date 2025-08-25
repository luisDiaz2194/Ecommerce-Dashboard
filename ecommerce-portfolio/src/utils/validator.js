//validador para formularios, según el type de regla creada en cada página (users, categories, products, etc)
export function validateForm(form, rules) {
  const errors = {};

  for (const field in rules) {
    const value = form[field]?.trim();
    const validations = rules[field];

    for (const rule of validations) {
      if (rule.type === "required" && !value) {
        errors[field] = rule.message || `${field} es requerido`;
        break;
      }

      if (rule.type === "email" && value && !/\S+@\S+\.\S+/.test(value)) {
        errors[field] = rule.message || "Email inválido";
        break;
      }

      if (rule.type === "minLength" && value.length < rule.value) {
        errors[field] =
          rule.message || `${field} debe tener al menos ${rule.value} caracteres`;
        break;
      }

      
    }
  }

  return errors;
}
