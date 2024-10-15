import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "./Select";
import { Input } from "./Input";
import { Formik, Form, Field } from "formik";
import { TrainerInfo } from "../types";
import { trainerDetailsSchema } from "../validators/TrainerDetails";
import { Button } from "./Button";

interface TrainerDetailsProps {
  trainerInfo: TrainerInfo | null;
  setTrainerInfo: React.Dispatch<React.SetStateAction<TrainerInfo | null>>;
  nextStep: () => void;
}

const TrainerDetails: React.FC<TrainerDetailsProps> = ({ trainerInfo, setTrainerInfo, nextStep }) => {
  const initialValues: TrainerInfo = {
    playerName: trainerInfo?.playerName || "",
    teamName: trainerInfo?.teamName || "",
    favoriteType: trainerInfo?.favoriteType || "",
  };
  const [types, setTypes] = useState<{ name: string }[]>([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/type")
      .then((response) => setTypes(response.data.results))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={trainerDetailsSchema}
      onSubmit={(values) => {
        setTrainerInfo(values);
        nextStep();
      }}
    >
      {({ errors, touched }) => (
        <Form className="max-w-md mx-auto flex flex-col gap-y-2 mt-40">
          <Field as={Input} label="Player Name" name="playerName" errorMessage={touched.playerName && errors.playerName} />
          <Field as={Input} label="Team Name" name="teamName" errorMessage={touched.teamName && errors.teamName} />
          <Field as={Select} placeholder="Pick one" name="favoriteType" options={types.map((type) => ({ value: type.name, label: type.name }))} label="Favorite Type" errorMessage={(touched.favoriteType && errors.favoriteType) || ""} />
          <Button type="submit">Next</Button>
        </Form>
      )}
    </Formik>
  );
};

export default TrainerDetails;
