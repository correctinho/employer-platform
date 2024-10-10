'use client'

import React, { useState, useContext } from "react";
import { CurrencyInput } from "@/components/FormsInput/formsInput";
import { Input, MultiSelect } from "@/components/FormsInput/formsInput";
import { EmployeeContext } from "@/app/contexts/employeeContexts";
import { ButtonComp } from "../FormsInput/Button/button";
import { createNewGroup } from "@/app/lib/actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function NewGroup() {
  const { employees, benefits } = useContext(EmployeeContext);
  const [value, setValue] = useState<string>("");
  const [groupName, setGroupName] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);

  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    formData.set("employerItemDetails_uuids", JSON.stringify(selectedBenefits));
    formData.set("user_info_uuids", JSON.stringify(selectedUsers));
    formData.set("value", value)

    if (!formData.get("group_name") || !formData.get("value")) {
      toast.warning("Todos os campos são obrigatórios");
      return;
    }

    const employerItemDetails = formData.get("employerItemDetails_uuids");
    let employerItemDetailsArray = [];

    if (typeof employerItemDetails === "string") {
      employerItemDetailsArray = JSON.parse(employerItemDetails);
    }

    if (employerItemDetailsArray.length === 0) {
      toast.warning("Selecione pelo menos um benefício!");
      return;
    }

    const userInfoUuids = formData.get("user_info_uuids");
    let userInfoUuidsArray = [];

    if (typeof userInfoUuids === "string") {
      userInfoUuidsArray = JSON.parse(userInfoUuids);
    }

    if (userInfoUuidsArray.length === 0) {
      toast.warning("Selecione pelo menos um usuário!");
      return;
    }

    const response = await createNewGroup(formData);

    if (response?.status !== 201) {
      toast.error("Erro ao criar grupo");
      return;
    }

    toast.success("Grupo criado com sucesso");
    router.push("/dashboard/colaboradores/grupos")
  };

  const benefitOptions = benefits.map(benefit => ({
    value: benefit.uuid,
    label: benefit.Item.name
  }));

  const userOptions = employees?.map(employee => ({
    value: employee.uuid,
    label: employee.full_name
  }));

  return (
    <section>
      <form action={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="groupName"><strong>Nome do grupo *</strong></label>
          <Input
            type="text"
            id="groupName"
            name="group_name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="users"><strong>Benefícios *</strong></label>
          <MultiSelect
            options={benefitOptions}
            selectedValues={selectedBenefits}
            onChange={setSelectedBenefits}
            searchText="Buscar por nome"
          />
        </div>

        <div>
          <label htmlFor="value"><strong>Valor *</strong></label>
          <CurrencyInput
            name="value"
            onValueChange={setValue}
          />
        </div>
        <div>
          <label htmlFor="users"><strong>Colaboradores *</strong></label>
          <MultiSelect
            options={userOptions}
            selectedValues={selectedUsers}
            onChange={setSelectedUsers}
            searchText="Buscar por nome"
          />
        </div>
        <ButtonComp>Criar Grupo</ButtonComp>
      </form>
    </section>
  );
}
