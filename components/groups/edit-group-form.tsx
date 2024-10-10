'use client'

import React, { useState, useContext } from "react";
import { CurrencyInput, Input } from "@/components/FormsInput/formsInput";
import { MultiSelect } from "@/components/FormsInput/formsInput";
import { EmployeeContext } from "@/app/contexts/employeeContexts";
import { ButtonComp } from "../FormsInput/Button/button";

export type EditGroupProps = {
  uuid: string;
  value: number;
  business_info_uuid: string;
  group_name: string;
  created_at: string;
  employees: {
    employee_uuid: string
    document: string;
    full_name: string;
  }[];
  benefits: {
    benefit_uuid: string;
    benefit_name: string;
  }[];
}
export default function EditGroup(props: EditGroupProps) {
  const { employees, benefits } = useContext(EmployeeContext); // Use o contexto para obter os employees  const [value, setValue] = useState<string | undefined>("");
  const [groupName, setGroupName] = useState<string>("");
  const [value, setValue] = useState<string>(props.value.toLocaleString());

  const [selectedUsers, setSelectedUsers] = useState<string[]>(
    props.employees.map(benefit => benefit.employee_uuid)

  );
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>(
    props.benefits.map(benefit => benefit.benefit_uuid)
  );

  const [errors, setErrors] = useState<{ groupName?: string, value?: string }>({});

  // const validateForm = () => {
  //   const newErrors: { groupName?: string, value?: string } = {};
  //   if (!groupName) newErrors.groupName = "Nome do grupo é obrigatório.";
  //   if (!value) newErrors.value = "Valor é obrigatório.";
  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // if (!validateForm()) return;

    // const groupData = {
    //   name: groupName,
    //   value: parseFloat(value!.replace(/[R$.\s]/g, '').replace(',', '.')),
    //   users: selectedUsers
    // };

    // // Enviar dados para o servidor
    // try {
    //   const response = await fetch('/api/groups', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(groupData)
    //   });

    //   if (!response.ok) {
    //     throw new Error('Erro ao criar grupo');
    //   }

    //   alert('Grupo criado com sucesso!');
    //   setGroupName("");
    //   setValue("");
    //   setSelectedUsers([]);
    // } catch (error) {
    //   console.error(error);
    //   alert('Erro ao criar grupo');
    // }
  };
  // Filtre os employees para excluir aqueles que já possuem um grupo definido
  //const filteredEmployees = employees.filter(employee => employee.status !== 'pending');

  // Mapeie os employees para o formato esperado pelo MultiSelect
  const userOptions = employees.map(employee => ({
    value: employee.uuid,
    label: employee.full_name
  }));

  const benefitOptions = benefits.map(benefit => ({
    value: benefit.uuid,
    label: benefit.Item.name
  }));



  return (
    <section>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="groupName"><strong>Nome do grupo *</strong></label>
          <Input
            type="text"
            id="groupName"
            name="name"
            //placeholder={props.group_name}
            value={props.group_name}
            onChange={(e) => setGroupName(e.target.value)}
            //defaultValue={props.group_name}
          />
          {errors.groupName && <span className="text-red-500">{errors.groupName}</span>}
        </div>
        <div>
          <label htmlFor="benefits"><strong>Benefícios *</strong></label>
          <MultiSelect
            options={benefitOptions}
            selectedValues={selectedBenefits}
            onChange={setSelectedBenefits}
            searchText="Buscar por nome"
            defaultValue={selectedBenefits}
            id="benefits"
          />
        </div>
        <div>
          <label htmlFor="value"><strong>Valor *</strong></label>
          <CurrencyInput
            name="value"
            onValueChange={setValue}
            defaultValue={value}
            placeholder={`R$ ${value}`}
            id="value"
            value={value}

          />
          {errors.value && <span className="text-red-500">{errors.value}</span>}
        </div>
        <div>
          <label htmlFor="users"><strong>Colaboradores *</strong></label>
          <MultiSelect
            options={userOptions}
            selectedValues={selectedUsers}
            onChange={setSelectedUsers}
            searchText="Buscar por nome"
            id="users"
          />
        </div>
        <ButtonComp>Criar Grupo</ButtonComp>
      </form>
    </section>
  );
}
