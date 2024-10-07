import { z } from 'zod'


export const registerEmployeedataSchemaZod = z.object({
  full_name: z
    .string()
    .min(1, { message: "Nome é obrigatório" }),
  internal_code: z
    .string(),
  document: z
    .string()
    .min(1, { message: "CPF é obrigatório" })
    .trim()
    .transform((value) => value.replace(/[^\d]/g, '')),
  gender: z
    .string()
    .min(1, { message: "Gênero é obrigatório" }),
  date_of_birth: z
    .string()
    .min(1, { message: "Data de nascimento é obrigatório" }),
  dependents_quantity: z
    .number()
    .int({ message: "Total de dependentes deve ser um número inteiro" })
    .nonnegative({ message: "Total de dependentes deve ser um número maior ou igual a 0" })
    .or(z.undefined().refine(value => value !== undefined, {
      message: "Total de dependentes é obrigatório",
    })),
  marital_status: z
    .string()
    .min(1, { message: "Estado civil é obrigatório" }),
  job_function: z
    .string()
    .min(1, { message: "Cargo é obrigatório" }),
  salary: z
    .optional(z.number()),
})
