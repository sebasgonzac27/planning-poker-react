import { validateInput } from './validate-input'

describe('validateInput', () => {
  it('accept: should accept a valid name', () => {
    const errors = validateInput('John Doe')
    expect(errors).toEqual([])
  })

  it('reject: should reject a name with less than 5 characters', () => {
    const errors = validateInput('John')
    expect(errors).toContain('Este campo debe tener al menos 5 caracteres.')
  })

  it('reject: should reject a name with more than 20 characters', () => {
    const errors = validateInput('John Jacob Jingleheimer Schmidt')
    expect(errors).toContain('Este campo no debe tener más de 20 caracteres.')
  })

  it('reject: should reject a name with special characters', () => {
    const errors = validateInput('John_Doe')
    expect(errors).toContain('Este campo no puede contener caracteres especiales.')
  })

  it('reject: should reject a name with more than 3 numbers', () => {
    const errors = validateInput('John1234')
    expect(errors).toContain('Este campo no puede tener más de 3 números.')
  })
})
