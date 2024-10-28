'use client'

import { registerSingleEmployee } from "@/app/lib/actions"
import { ButtonComp } from "@/components/FormsInput/Button/button"
import { DateSelect, Input, MaskedCPFInput, MaskedDocumentInput, Select } from "@/components/FormsInput/formsInput"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useFormStatus } from "react-dom"
import { toast } from "react-toastify"
import { ZodIssue } from "zod"

type FormErrors = {
  [key: string]: string[] | undefined;
} | null;


export default function NewEmployee() {
  const [errorsMessage, setErrorsMessage] = useState<FormErrors>(null);
  const [salary, setSalary] = useState<string>('');

  const router = useRouter()
  const addNew = async (formData: FormData) => {

    const numericSalary = parseInt(salary.replace(/[^\d,]/g, ''), 10) * 100;
    formData.set('salary', numericSalary.toString());

    // Certifique-se de que o campo date_of_birth está sempre presente
    if (!formData.has('date_of_birth') || formData.get('date_of_birth') === "") {
      formData.set('date_of_birth', ''); // Define um valor padrão vazio
    }
    const response = await registerSingleEmployee(formData)

    if (response?.error) {
      const formattedErrors: FormErrors = {};

      response.error.forEach((issue: ZodIssue) => {
        const fieldName = issue.path[0];
        const errorMessage = issue.message;

        if (!formattedErrors[fieldName]) {
          formattedErrors[fieldName] = [];
        }

        formattedErrors[fieldName]?.push(errorMessage);
      });

      setErrorsMessage(formattedErrors);

      return

    }
    if (response?.status !== 201) {
      if (response.data === "Invalid Document") {
        toast.error("CPF inválido")

        return
      }
      toast.error("Erro ao registrar colaborador")

      return
    }

    toast.success("Colaborador registrado com sucesso")
    router.replace("/dashboard/colaboradores")
  }


  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };


  const parseCurrency = (value: string): number => {
    const cleanedValue = value.replace(/\D/g, '');
    return Number(cleanedValue) / 100;
  };

  const handleSalaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const numericValue = parseCurrency(inputValue);
    setSalary(formatCurrency(numericValue));

  };


  //Remove mensagen de erro ao editar o campo
  const handleFieldChange = (fieldName: string) => {
    setErrorsMessage((prevErrors) => {
      if (!prevErrors) return null; // Se não há erros, não faça nada
      const newErrors = { ...prevErrors };
      delete newErrors[fieldName]; // Remove o erro do campo específico
      return newErrors;
    });
  };
  return (
    <section className="flex flex-col gap-3">
      <h1 className="font-bold w-full">Novo Colaborador</h1>
      <form action={addNew} className="flex flex-col gap-3">
        <div className="">
          <label htmlFor="">Nome completo *</label>
          <Input
            type="text"
            name="full_name"
            onChange={(e) => { handleFieldChange('full_name') }}
          />
          {errorsMessage?.full_name && (
            <p className="text-red-600">{errorsMessage.full_name.map((error, index) => (
              <span key={index}>{error}</span>
            ))}</p>)}
        </div>
        <div className="">
          <label htmlFor="">Código Interno</label>
          <Input
            type="text"
            name="internal_code"
          />
        </div>
        <div className="">
          <label htmlFor="">CPF *</label>
          <MaskedCPFInput
            type="text"
            name="document"
            readOnly={false}
            onChange={(e) => { handleFieldChange('document') }}

          />
          {errorsMessage?.document && (
            <p className="text-red-600">{errorsMessage.document.map((error, index) => (
              <span key={index}>{error}</span>
            ))}</p>)}
        </div>
        <div className="">
          <label htmlFor="">Gênero *</label>
          <Select
            name="gender"
            onChange={(e) => { handleFieldChange('gender') }}
          >
            <option value="">Escolha uma opção</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
          </Select>
          {errorsMessage?.gender && (
            <p className="text-red-600">{errorsMessage.gender.map((error, index) => (
              <span key={index}>{error}</span>
            ))}</p>)}
        </div>
        <div className="">
          <label htmlFor="">Data de Nascimento *</label>
          <DateSelect
            name="date_of_birth"
            onChange={(e) => { handleFieldChange('date_of_birth') }}
          />
          {errorsMessage?.date_of_birth && (
            <p className="text-red-600">{errorsMessage.date_of_birth.map((error, index) => (
              <span key={index}>{error}</span>
            ))}</p>)}
        </div>
        <div className="">
          <label htmlFor="">Total de dependentes *</label>
          <Input
            type="number"
            name="dependents_quantity"
            onChange={(e) => { handleFieldChange('dependents_quantity') }}

          />
          {errorsMessage?.dependents_quantity && (
            <p className="text-red-600">{errorsMessage.dependents_quantity.map((error, index) => (
              <span key={index}>{error}</span>
            ))}</p>)}
        </div>
        <div className="">
          <label htmlFor="">Estado Civil *</label>
          <Select
            name="marital_status"
            onChange={(e) => { handleFieldChange('marital_status') }}

          >
            <option value="">Escolha uma opção</option>
            <option value="Solteiro">Solteiro</option>
            <option value="Casado">Casado</option>
            <option value="Viuvo">Divorciado</option>
            <option value="Divorciado">Viúvo</option>
          </Select>
          {errorsMessage?.marital_status && (
            <p className="text-red-600">{errorsMessage.marital_status.map((error, index) => (
              <span key={index}>{error}</span>
            ))}</p>)}
        </div>
        <div className="">
          <label htmlFor="">Cargo *</label>
          <Input
            type="text"
            name="job_function"
            onChange={(e) => { handleFieldChange('job_function') }}

          />
          {errorsMessage?.job_function && (
            <p className="text-red-600">{errorsMessage.job_function.map((error, index) => (
              <span key={index}>{error}</span>
            ))}</p>)}
        </div>

        <div className="">
          <label htmlFor="">Salário *</label>
          <Input
            type="text"
            name="salary"
            onChange={handleSalaryChange}
            placeholder="R$"
            value={salary}
          />
          {errorsMessage?.salary && (
            <p className="text-red-600">{errorsMessage.salary.map((error, index) => (
              <span key={index}>{error}</span>
            ))}</p>)}

        </div>
        <ButtonComp>Cadastrar</ButtonComp>
      </form>
    </section>
  )
}
