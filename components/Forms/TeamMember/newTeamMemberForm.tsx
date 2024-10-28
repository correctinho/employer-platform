'use client'

import { addUser } from "@/app/lib/actions";
import { ButtonComp } from "@/components/FormsInput/Button/button";
import { Input, MultiSelect } from "@/components/FormsInput/formsInput";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export const permissionsType = [
  {
    label: "Vendas",
    value: "sales"
  },
  {
    label: "Finanças",
    value: "finances"
  },
  {
    label: "Marketing",
    value: "marketing"
  },
]

type FormErrors = {
  [key: string]: string[] | undefined;
} | null;

export default function NewTeamMemberForm() {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [errorsMessage, setErrorsMessage] = useState<FormErrors>({})

  const router = useRouter()
  const userOptions = permissionsType.map(permission => ({
    value: permission.value,
    label: permission.label
  }));

  const validationStatus = (user_name: string, password: string) => {
    const newErrors: FormErrors = {};

    if (selectedPermissions.length > 0 && user_name && password) return true

    if (selectedPermissions.length === 0) {
      newErrors.permissions = ['Selecione pelo menos uma opção']
    }
    if (!user_name) {
      newErrors.user_name = ['Este campo é obrigatório'];
    }
    if (!password) {
      newErrors.password = ['Este campo é obrigatório'];
    } else if (password.length < 6) {
      newErrors.password = ['A senha deve ter pelo menos 6 caracteres'];
    }
    setErrorsMessage(newErrors);
    return false
  }

  const handleSubmit = async (formData: FormData) => {
    const user_name = formData.get('user_name') as string
    const password = formData.get('password') as string

    const status = validationStatus(user_name, password)
    if (!status) return


    const response = await addUser(formData)
    if (response?.status === 201) {
      router.replace("/dashboard/minha-equipe")
      return
    } else {
      if (response?.data === "User name already registered") {
        toast.error("Nome de usuário já cadastrado")
        router.refresh() //refreshe to make sure that user will not press many times
        return
      }
    }

    //refresh in case some unexpected error happens
    router.refresh()

  }

  const handleRemoveError = (field: string) => {
    if (errorsMessage) {
      const updatedErrors = { ...errorsMessage };
      delete updatedErrors[field];
      setErrorsMessage(updatedErrors);
    }
  };
  return (
    <section>
      <form className="flex flex-col gap-3" action={handleSubmit}>
        <input type="hidden" name="permissions" value={JSON.stringify(selectedPermissions)} />

        <div>
          <label htmlFor="">Nome de usuário *</label>
          <Input
            type="text"
            name="user_name"
            onChange={(e) => handleRemoveError('user_name')}
          />
          {errorsMessage?.user_name && (
            <span style={{ color: 'red' }}>{errorsMessage.user_name}</span>
          )}
        </div>


        <div>
          <label htmlFor="">Senha *</label>
          <Input
            type="password"
            name="password"
            onChange={(e) => handleRemoveError('password')}
          />
          {errorsMessage?.password && (
            <span style={{ color: 'red' }}>{errorsMessage.password}</span>
          )}
        </div>
        <div>
          <label htmlFor="roles">Função *</label>
          <MultiSelect
            id="roles"
            options={userOptions}
            selectedValues={selectedPermissions}
            onChange={setSelectedPermissions}
            searchText="Buscar por permissão"
          />
          {errorsMessage?.permissions && (
            <span style={{ color: 'red' }}>{errorsMessage.permissions}</span>
          )}
        </div>
        <ButtonComp>Criar usuário</ButtonComp>
      </form>
    </section>
  )
}
