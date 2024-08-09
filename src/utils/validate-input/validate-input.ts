export function validateInput (input: string) {
  // El texto tiene entre 5 y 20 caracteres, no puede tener caracteres especiales (_,.*#/-), maximo puede tener 3 numeros el nombre, y no puede contener solo numeros
  const errors: string[] = []

  const text = input.trim()

  if (text.length < 5) {
    errors.push('Este campo debe tener al menos 5 caracteres.')
  }
  if (text.length > 20) {
    errors.push('Este campo no debe tener más de 20 caracteres.')
  }
  if (text.match(/[_.*#/-]/)) {
    errors.push('Este campo no puede contener caracteres especiales.')
  }
  if ((text.match(/\d/g) ?? []).length > 3) {
    errors.push('Este campo no puede tener más de 3 números.')
  }
  return errors
}
