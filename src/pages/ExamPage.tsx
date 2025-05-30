
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ExamNoQuestions } from "@/components/exam/ExamNoQuestions";
import ExamLayout from "@/components/exam/ExamLayout";

// Importar bancos de preguntas
import { ANATOMIA_U1_QUESTIONS } from "@/data/exams/anatomia_unidad1";
import { FARMACOLOGIA_U1_QUESTIONS } from "@/data/exams/farmacologia_unidad1";
import { FISIOLOGIA_U1_QUESTIONS } from "@/data/exams/fisiologia_unidad1";
import { INMUNOLOGIA_U1_QUESTIONS } from "@/data/exams/inmunologia_unidad1";
import { MICROBIOLOGIA_U1_QUESTIONS } from "@/data/exams/microbiologia_unidad1";
import { BIOQUIMICA_U1_QUESTIONS } from "@/data/exams/bioquimica_unidad1";
import { EMBRIOLOGIA_U1_QUESTIONS } from "@/data/exams/embriologia_unidad1";
import { HISTOLOGIA_U1_QUESTIONS } from "@/data/exams/histologia_unidad1";

// Config
const questionBanks: Record<string, any[]> = {
  "Anatomía": ANATOMIA_U1_QUESTIONS,
  "Farmacología": FARMACOLOGIA_U1_QUESTIONS,
  "Fisiología": FISIOLOGIA_U1_QUESTIONS,
  "Inmunología": INMUNOLOGIA_U1_QUESTIONS,
  "Microbiología y Parasitología": MICROBIOLOGIA_U1_QUESTIONS,
  "Bioquímica": BIOQUIMICA_U1_QUESTIONS,
  "Embriología": EMBRIOLOGIA_U1_QUESTIONS,
  "Histología": HISTOLOGIA_U1_QUESTIONS,
};

const ExamPage: React.FC = () => {
  const navigate = useNavigate();
  const { materia = "", unidad = "1" } = useParams();
  const questions = questionBanks[materia] ?? [];

  const handleClose = () => {
    navigate('/dashboard');
  };

  if (!questions.length) {
    return <ExamNoQuestions />;
  }

  return (
    <ExamLayout 
      materia={materia} 
      unidad={unidad} 
      unidadNombre={`Unidad ${unidad}`}
      questions={questions} 
      onClose={handleClose}
    />
  );
};

export default ExamPage;