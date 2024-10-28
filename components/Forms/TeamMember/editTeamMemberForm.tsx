'use client'

import { ButtonComp } from "@/components/FormsInput/Button/button";
import { Input, MultiSelect, Select } from "@/components/FormsInput/formsInput";
import { useState } from "react";
import { permissionsType as allPermissions } from "./newTeamMemberForm";
import { BusinessUser } from "@/components/Dashboard/Tables/MyTeam/columns";
import { editUser } from "@/app/lib/actions";
import { toast } from "react-toastify";

type FormErrors = {
  [key: string]: string[] | undefined;
} | null;

export default function EditTeamMemberForm(props: BusinessUser) {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(props.permissions);
  const [errorsMessage, setErrorsMessage] = useState<FormErrors>({})

  const userOptions = allPermissions.map(permission => ({
    value: permission.value,
    label: permission.label
  }));

  const handleSubmit = async (formData: FormData) => {
    const user_name = formData.get('user_name') as string
    const password = formData.get('password') as string

    const status = validationStatus(user_name, password)
    if(status){
      const response = await editUser(formData)

      if(response?.data){
        if(response?.data === "User name already registered"){
          toast.error("Usuário já cadastrado")
          return
        }
      }
    }

  }

  const validationStatus = (user_name: string, password: string) => {
    const newErrors: FormErrors = {};

    if (selectedPermissions.length > 0 && user_name){
      //check if password is included
      if (password && password.length < 6) {
        newErrors.password = ['A senha deve ter pelo menos 6 caracteres'];
      }else{
        return true
      }
    }

    if (selectedPermissions.length === 0) {
      newErrors.permissions = ['Selecione pelo menos uma opção']
    }
    if (!user_name) {
      newErrors.user_name = ['Este campo é obrigatório'];
    }
    if (password && password.length < 6) {
      newErrors.password = ['A senha deve ter pelo menos 6 caracteres'];
    }
    setErrorsMessage(newErrors);
    return false
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
      <input type="hidden" name="user_id" value={props.uuid} />
      <input type="hidden" name="permissions" value={JSON.stringify(selectedPermissions)} />

        <div>
          <label htmlFor="user_name">Nome de usuário</label>
          <Input
            type="text"
            id="user_name"
            name="user_name"
            defaultValue={props.user_name}
            onChange={(e) => handleRemoveError('user_name')}
          />
          {errorsMessage?.user_name && (
            <span style={{ color: 'red' }}>{errorsMessage.user_name}</span>
          )}
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <Input
            type="password"
            id="password"
            name="password"
            onChange={(e) => handleRemoveError('password')}

          />
          {errorsMessage?.password && (
            <span style={{ color: 'red' }}>{errorsMessage.password}</span>
          )}
        </div>
        <div>
          <label htmlFor="permissions">Alterar Status</label>
          <Select
            id="permissions"
            name="is_active"
          >
            <option selected={props.status === "active"} value="active">Ativo</option>
            <option selected={props.status === "inactive"} value="inactive">Inativo</option>
          </Select>
          {errorsMessage?.permissions && (
            <span style={{ color: 'red' }}>{errorsMessage.permissions}</span>
          )}
        </div>
        <div>
          <label htmlFor="permissions">Função</label>
          <MultiSelect
            id="permissions"
            options={userOptions}
            selectedValues={selectedPermissions}
            onChange={setSelectedPermissions}
            searchText="Buscar por permissão"
          />
          {errorsMessage?.permissions && (
            <span style={{ color: 'red' }}>{errorsMessage.permissions}</span>
          )}
        </div>
        <ButtonComp>Editar usuário</ButtonComp>
      </form>
    </section>
  )
}
