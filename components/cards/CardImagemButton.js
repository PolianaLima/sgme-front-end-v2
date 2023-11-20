import React from 'react';
import Image from "next/image";
import Link from "next/link";

function CardImagemButton({img, link, titleLink}) {
    return (
        <div className="col-sm-2 container-sm d-sm-flex flex-column align-items-center">
            <Image src={img} width={300} height={200} alt="Icone de Blog"/>
            <Link href={link} className="btn bg-primary w-100">{titleLink}</Link>
        </div>
    );
}

export default CardImagemButton;