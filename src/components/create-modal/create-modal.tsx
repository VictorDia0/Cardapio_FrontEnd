import { useEffect, useState } from "react";
import { useFoodDataMutate } from "../../hooks/useFoodDataMutate";
import { FoodData } from "../../interface/FoodData";

import "./modal.css";

interface InputProps {
    label: string;
    value: string | number;
    updateValue(value: unknown): void;
}

interface ModalProps {
    closeModal(): void;
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <div>
            <label>{label}</label>
            <input
                value={value}
                onChange={(event) => updateValue(event.target.value)}
            />
        </div>
    );
};

export function CreateModal({ closeModal }: ModalProps) {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const { mutate, status, isSuccess } = useFoodDataMutate();

    const submit = () => {
        const foodData: FoodData = {
            title,
            price,
            image,
        };
        console.log("Submitting:", foodData);
        mutate(foodData);
    };

    useEffect(() => {
        console.log("Mutation status:", status);
        if (!isSuccess) return;
        closeModal();
    }, [isSuccess, closeModal, status]);

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Cadastre um novo item no cardápio</h2>
                <form className="input-container">
                    <Input label="Título" value={title} updateValue={setTitle} />
                    <Input label="Preço" value={price} updateValue={setPrice} />
                    <Input
                        label="URL da Imagem"
                        value={image}
                        updateValue={setImage}
                    />
                </form>
                <button onClick={submit} className="btn-secondary">
                    {status === "pending" ? "Postando..." : "Postar"}
                </button>
            </div>
        </div>
    );
}
