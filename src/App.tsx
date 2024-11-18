import { useEffect, useState } from "react";
import "./App.css";
import { Card } from "./components/card/card";
import { useFoodData } from "./hooks/useFoodData";
import { CreateModal } from "./components/create-modal/create-modal";

function App() {
  const { data = [], isLoading, isError, error, refetch } = useFoodData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    refetch(); // Garante que os dados sejam buscados
  }, [refetch]);

  const handleOpenModal = () => setIsModalOpen((prev) => !prev);

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao carregar os dados: {error?.message || "Erro desconhecido"}</p>;

  return (
      <div className="container">
        <h1>Cardápio</h1>
        <div className="card-grid">
          {data.map((foodData) => (
            <Card
              key={foodData.id}
              price={foodData.price}
              title={foodData.title}
              image={foodData.image}
            />
          ))}
        </div>
        {isModalOpen && <CreateModal closeModal={handleOpenModal} />}
        <button onClick={handleOpenModal}>Novo</button>
      </div>
  );
}

export default App;
