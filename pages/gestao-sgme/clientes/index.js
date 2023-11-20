import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {http} from "@/utils/http";
import Paginacao from "@/components/Paginacao";

function Index() {

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const [clientes, seteClientes] = useState([]);

    useEffect(() => {
        http.get(`/clientes?page=${page}&size=10`,  { params: { page } })
            .then((response) => {
                seteClientes(response.data.content)
                setTotalPages(response.data.totalPages)
            })
            .catch((error) => {
                console.error("Erro ao buscar a lista de clientes", error)
            });
    }, [page]);


    return (
        <main className="container border mb-5">

            <div className="container d-sm-flex flex-row justify-content-between mb-3 mt-5">
                <h3>Clientes</h3>
                <Link href="/gestao-sgme/clientes/cadastro" className="btn btn-success">Novo Cliente</Link>
            </div>
            <table className="table">


                <thead>
                <tr className="border border-2 border-warning">
                    <th scope="col">Nome</th>
                    <th scope="col"  className=" d-flex justify-content-end">Ações</th>

                </tr>
                </thead>
                <tbody>

                {clientes && clientes.length> 0 ? (
                    clientes.map(cliente =>
                        <tr key={cliente.id}>

                            <td >
                                {cliente.nome}
                            </td>
                            <td className="d-flex justify-content-end">
                                <Link href={`/gestao-sgme/clientes/update/${cliente.id}`} className="btn btn-success me-2">EDITAR</Link>
                            </td>
                        </tr>
                )):(
                    <tr>
                        <td colSpan="6">Nenhum cliente encontrado.</td>
                    </tr>
                )}

                </tbody>
            </table>

            <Paginacao  page={page} totalPages={totalPages} setPage={setPage}/>

        </main>
    );
}

export default Index;