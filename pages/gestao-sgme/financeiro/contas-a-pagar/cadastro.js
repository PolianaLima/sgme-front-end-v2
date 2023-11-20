import React, {useEffect, useState} from 'react';
import {url} from "@/utils/url";
import axios from "axios";
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";
import Head from "next/head";
import {http} from "@/utils/http";
import ButtonFechar from "@/components/ButtonFechar";


function Cadastro() {

    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm();

    const [status, setStatus] = useState([false])

    /*CHAMADA DA API PARA LISTA DE CLIENTES*/
    const [fornecedores, setFornecedores] = useState([]);
    useEffect(() => {
        http.get(`${url}/fornecedoresLista`)
            .then((response) => {
                setFornecedores(response.data)
            })
            .catch((error) => {
                console.error("Erro ao buscar a lista de fornecedores", error)
            });
    }, []);


    const onSubmit = async (data) => {
        try {
            await http.post('/despesas', data)
                .then((response) => {
                    setStatus(true)
                    reset()
                    router.push('/gestao-sgme/financeiro/contas-a-pagar')
                });
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error('Erro na resposta da API:', error.response.data);
            } else {
                console.error('Erro ao enviar dados para a API:', error);
            }
        }
    }


    return (
        <>
            <Head>
                <title>SGME-Contas a pagar - nova conta</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <div className="container d-flex align-items-center justify-content-center mt-5">
                <form className="form-control p-5">
                    <ButtonFechar url="/gestao-sgme/financeiro/contas-a-pagar"/>
                    <h3 className="mb-4">Nova Despesa</h3>

                    <div className="d-flex flex-column ">
                        <label>Fornecedor</label>
                        <select className="form-select mb-3"
                                defaultValue="0"
                                {...register("fornecedor_id", {validate: (value) => (value !== "0")})}
                        >
                            <option value="0">Selecione um fornecedor</option>
                            {fornecedores.map((fornecedor) =>
                                <option value={fornecedor.id} key={fornecedor.id}>{fornecedor.nome}</option>
                            )}
                        </select>
                        {errors?.fornecedor_id?.type === "validate" && (
                            <p className="alert alert-danger">Fornecedor Obrigatorio</p>
                        )}
                    </div>

                    <div className="d-sm-flex flex-row justify-content-between mb-3">
                        <div className="d-sm-flex flex-column w-100 me-3">
                            <label htmlFor="valor">Valor: </label>
                            <input placeholder="R$"
                                   className="form-control"
                                   {...register("valor", {required: true})}
                            />
                            {errors?.valor?.type === "required" && (
                                <p className="alert alert-danger mt-3">Valor e obrigatorio!</p>
                            )}
                        </div>

                        <div className="d-sm-flex flex-column w-100">
                            <label htmlFor="data_vencimento">Data Vencimento: </label>
                            <input type="date"
                                   className="form-control"
                                   {...register("data_vencimento", {required: true})}
                            />
                            {errors?.data_vencimento?.type === "required" && (
                                <p className="alert alert-danger mt-3">Data de vencimento e obrigatorio!</p>
                            )}
                        </div>

                    </div>

                    <div className="d-sm-flex flex-row justify-content-between mb-3">

                        <div className="d-sm-flex flex-column w-100 me-3">
                            <label htmlFor="forma_pagamento">Forma de Pagamento</label>
                            <select className="form-select"
                                    defaultValue="0"
                                    {...register("forma_pagamento", {validate: (value) => (value !== "0")})}
                            >
                                <option value="0">Selecione forma de pagamento</option>
                                <option value="DINHEIRO">DINHEIRO</option>
                                <option value="PIX">PIX</option>
                                <option value="CARTAO">CARTAO</option>
                                <option value="BOLETO">BOLETO</option>
                            </select>
                            {errors?.forma_pagamento?.type === "validate" && (
                                <p className="alert alert-danger mt-3" role="alert">Selecione uma forma de pagamento</p>
                            )}

                        </div>

                        <div className="d-sm-flex flex-column w-100">
                            <label htmlFor="status">Status</label>
                            <select className="form-select"
                                    defaultValue="Selecione status"
                                    {...register("status", {validate: (value) => (value !== "0")})}
                            >
                                <option value="0">Selecione status</option>
                                <option value="A PAGAR">A PAGAR</option>
                                <option value="PAGA">PAGA</option>
                            </select>
                            {errors?.status?.type === "validate" && (
                                <p className="alert alert-danger mt-3">Selecione o status!</p>
                            )}
                        </div>

                    </div>

                    <button className="btn btn-warning "
                            onClick={(e) => {
                                e.preventDefault();
                                handleSubmit(onSubmit)();
                            }}>
                        SALVAR
                    </button>

                    {status === true ? (
                        <p>Despesa inserida com sucesso</p>
                    ) : ("")}
                </form>


            </div>
        </>

    );
}

export default Cadastro;