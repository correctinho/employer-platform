'use client'

import styles from './companyForm.module.css'


import { classificationOptions } from '@/utils/company-options.utils'
import { stateOptions } from '@/utils/company-options.utils'

import { useState } from 'react'
import React from 'react'

import { updateData } from '@/app/lib/actions'
import { toast } from 'react-toastify'
import { ZodIssue } from 'zod'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input, MaskedDocumentInput, MaskedPhoneInput, MaskedZipInput, Select } from '@/components/FormsInput/formsInput'


type FormErrors = {
    [key: string]: string[] | undefined;
} | null;


export type CompanyDataProps = {
    dataUuid: string
    addressUuid: string
    line1: string
    line2: string
    line3: string | null
    postal_code: string
    neighborhood: string
    city: string
    state: string
    country: string
    fantasy_name: string;
    availableData: boolean
    document: string;
    classification: string;
    colaborators_number: number;
    phone_1: string;
    phone_2: string | null;

}
export default function BusinessInfoForm(props: CompanyDataProps) {
    const [editMode, setEditMode] = useState(props.availableData)

    const [errorsMessage, setErrorsMessage] = useState<FormErrors>(null);

    const router = useRouter()
    async function registerData(formData: FormData) {
        const response = await updateData(formData)
        type FormErrors = {
            [key: string]: string[] | undefined;
        } | null;


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

        if(response?.status !== 200) {
          toast.error("Erro ao atualizar dados")
          return
        }


        toast.success("Dados atualizados com sucesso")


        handleEditMode()

    }

    function handleEditMode() {
        if (editMode) {
            setEditMode(false)
        } else {
            setEditMode(true)
        }
    }


    return (
        <div className="mt-4">
            <form action={registerData}>
                <input type="hidden" name='data_uuid' value={props.dataUuid} />
                <input type="hidden" name='address_uuid' value={props.addressUuid} />

                <article className={styles.containerData}>
                    <div className={styles.top}>
                        <h3>Informações Gerais</h3>
                        <a onClick={handleEditMode}>Editar</a>
                    </div>
                    <section className="w-full flex flex-col gap-3">
                        <div className="grid min-lg:grid-cols-[1fr_2fr] gap-2">
                            <div>
                                <label htmlFor='document'>CNPJ / CPF*</label>
                                <MaskedDocumentInput
                                    type='text'
                                    name='document'
                                    id='document'
                                    readOnly
                                    defaultValue={props.document}
                                />
                                {errorsMessage?.document && (
                                    <p className={styles.errorMessage}>{errorsMessage.document.map((error, index) => (
                                        <span key={index}>{error}</span>
                                    ))}</p>)}
                            </div>
                            <div>
                                <label htmlFor='fantasy_name'>Nome Fantasia *</label>
                                <Input
                                    type='text'
                                    name='fantasy_name'
                                    defaultValue={props.fantasy_name}
                                    readOnly={editMode}
                                    style={{
                                        backgroundColor: !editMode ? '' : 'rgba(101, 98, 143, 0.219)',

                                    }}

                                />
                                {errorsMessage?.fantasy_name && (
                                    <p className={styles.errorMessage}>{errorsMessage.fantasy_name.map((error, index) => (
                                        <span key={index}>{error}</span>
                                    ))}</p>)}
                            </div>

                        </div>

                        <div className="grid sm:grid-cols-[2fr_1fr] gap-2">
                            <div className='flex flex-col'>
                                <label htmlFor='classification'>Classificação da Empresa * </label>
                                <Select
                                    name="classification"
                                    defaultValue={props.classification}
                                    disabled={editMode}
                                >
                                    {classificationOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                            <div>

                                <label className="text-nowrap" htmlFor='colaborators_number'>Nº Colaboradores *</label>
                                <Input
                                    type='number'
                                    name='colaborators_number'
                                    defaultValue={props.colaborators_number}
                                    readOnly={editMode}
                                    style={{
                                        backgroundColor: !editMode ? '' : 'rgba(101, 98, 143, 0.219)',

                                    }}

                                />
                                {errorsMessage?.colaborators_number && (
                                    <p className={styles.errorMessage}>{errorsMessage.colaborators_number.map((error, index) => (
                                        <span key={index}>{error}</span>
                                    ))}</p>)}
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-2">
                            <div>
                                <label htmlFor='phone_1'>Telefone 1 *</label>
                                <MaskedPhoneInput
                                    placeholder={props.phone_1}
                                    name='phone_1'
                                    type='tel'
                                    id='phone_1'
                                    autoComplete='phone_1'
                                    readOnly={editMode}
                                    defaultValue={props.phone_1}

                                />
                                {errorsMessage?.phone_1 && (
                                    <p className={styles.errorMessage}>{errorsMessage.phone_1.map((error, index) => (
                                        <span key={index}>{error}</span>
                                    ))}</p>)}
                            </div>

                            <div>
                                <label htmlFor='phone_2'>Telefone 2</label>
                                <MaskedPhoneInput
                                    placeholder='(00) 9 0000-0000'
                                    type='tel'
                                    name='phone_2'
                                    id='phone_2'
                                    autoComplete='phone_2'
                                    defaultValue={props.phone_2 ? props.phone_2 : ''}
                                    readOnly={editMode}

                                />
                            </div>
                        </div>


                    </section>
                    <div>
                        <h3>Endereço</h3>
                    </div>
                    <section className="w-full flex flex-col gap-3">

                        <div>
                            <label htmlFor='postal_code'>CEP *</label>
                            <MaskedZipInput
                                type='text'
                                name='postal_code'
                                id='postal_code'
                                autoComplete='postal_code'
                                defaultValue={props.postal_code}
                                readOnly={editMode}
                                placeholder={props.postal_code}
                            />
                            {errorsMessage?.zip_code && (
                                <p className={styles.errorMessage}>{errorsMessage.zip_code.map((error, index) => (
                                    <span key={index}>{error}</span>
                                ))}</p>)}
                        </div>

                        <div className="grid md:grid-cols-[3fr_1fr] gap-2">

                            <div >
                                <label htmlFor='street'>Rua  *</label>
                                <Input
                                    type='text'
                                    name='line1'
                                    readOnly={editMode}
                                    defaultValue={props.line1}
                                    style={{
                                        backgroundColor: !editMode ? '' : 'rgba(101, 98, 143, 0.219)',

                                    }}
                                />
                                {errorsMessage?.street && (
                                    <p className={styles.errorMessage}>{errorsMessage.street.map((error, index) => (
                                        <span key={index}>{error}</span>
                                    ))}</p>)}
                            </div>
                            <div>
                                <label htmlFor='number'>Número  *</label>
                                <Input
                                    type='text'
                                    name='line2'
                                    defaultValue={props.line2}
                                    readOnly={editMode}
                                    style={{
                                        backgroundColor: !editMode ? '' : 'rgba(101, 98, 143, 0.219)',

                                    }}
                                />
                                {errorsMessage?.number && (
                                    <p className={styles.errorMessage}>{errorsMessage.number.map((error, index) => (
                                        <span key={index}>{error}</span>
                                    ))}</p>)}
                            </div>
                        </div>

                        <div className='grid md:grid-cols-2 gap-2'>

                            <div>
                                <label htmlFor='complement'>Complemento</label>
                                <Input
                                    type='text'
                                    name='line3'
                                    defaultValue={props.line3 ? props.line3 : ''}
                                    readOnly={editMode}
                                    style={{
                                        backgroundColor: !editMode ? '' : 'rgba(101, 98, 143, 0.219)',

                                    }}
                                />

                            </div>
                            <div>
                                <label htmlFor='neighborhood'>Bairro *</label>
                                <Input
                                    type='text'
                                    name='neighborhood'
                                    defaultValue={props.neighborhood}
                                    readOnly={editMode}
                                    style={{
                                        backgroundColor: !editMode ? '' : 'rgba(101, 98, 143, 0.219)',

                                    }}
                                />
                                {errorsMessage?.neighborhood && (
                                    <p className={styles.errorMessage}>{errorsMessage.neighborhood.map((error, index) => (
                                        <span key={index}>{error}</span>
                                    ))}</p>)}

                            </div>
                        </div>
                        <div className='grid md:grid-cols-[3fr_1fr] gap-2'>
                            <div>
                                <label htmlFor='city'>Cidade *</label>
                                <Input
                                    type='text'
                                    name='city'
                                    defaultValue={props.city}
                                    readOnly={editMode}
                                    style={{
                                        backgroundColor: !editMode ? '' : 'rgba(101, 98, 143, 0.219)',

                                    }}
                                />
                                {errorsMessage?.city && (
                                    <p className={styles.errorMessage}>{errorsMessage.city.map((error, index) => (
                                        <span key={index}>{error}</span>
                                    ))}</p>)}

                            </div>
                            <div>
                                <label htmlFor="state">UF *</label>
                                <Select name="state"
                                    disabled={editMode}
                                    defaultValue={props.state}
                                    style={{
                                        backgroundColor: !editMode ? '' : 'rgba(101, 98, 143, 0.219)',

                                    }}
                                >
                                    {stateOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </Select>
                                {errorsMessage?.state && (
                                    <p className={styles.errorMessage}>{errorsMessage.state.map((error, index) => (
                                        <span key={index}>{error}</span>
                                    ))}</p>)}
                            </div>

                        </div>

                        <div>
                            <label htmlFor='city'>País *</label>
                            <Input
                                type='text'
                                name='country'
                                defaultValue={props.country}
                                readOnly={editMode}
                                style={{
                                    backgroundColor: !editMode ? '' : 'rgba(101, 98, 143, 0.219)',

                                }}
                            />

                            {errorsMessage?.country && (
                                <p className={styles.errorMessage}>{errorsMessage.country.map((error, index) => (
                                    <span key={index}>{error}</span>
                                ))}</p>)}
                        </div>
                    </section>
                </article>
                <div className={styles.buttons}>
                    <p onClick={() => router.back()} style={{ cursor: 'pointer' }}>Voltar</p>

                    <Button type='submit'
                        style={{
                            backgroundColor: !editMode ? '' : 'rgba(101, 98, 143, 0.945)',
                            cursor: !editMode ? 'pointer' : 'auto'

                        }}
                        disabled={editMode}
                    >Salvar Dados</Button>

                </div>
            </form>
        </div>
    )
}
