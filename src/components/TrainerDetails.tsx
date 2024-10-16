import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "./Select";
import { Input } from "./Input";
import { Formik, Form, Field } from "formik";
import { TrainerInfo } from "../types";
import { trainerDetailsSchema } from "../validators/TrainerDetails";
import { Button } from "./Button";
import { Typography } from "./Typography";

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
    <div className="w-full max-w-md mx-auto p-6 bg-white shadow-md rounded-2xl mt-16 lg:mt-20">
      <Typography variant="h2" align="center" weight="bold" className="mb-6 text-3xl text-primary">
        Trainer Details
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={trainerDetailsSchema}
        onSubmit={(values) => {
          setTrainerInfo(values);
          nextStep();
        }}
      >
        {({ errors, touched }) => (
          <Form className="space-y-6">
            <Field as={Input} label="Player Name" name="playerName" errorMessage={touched.playerName && errors.playerName} className="w-full" />
            <Field as={Input} label="Team Name" name="teamName" errorMessage={touched.teamName && errors.teamName} className="w-full" />
            <Field as={Select} placeholder="Select your favorite type" name="favoriteType" options={types.map((type) => ({ value: type.name, label: type.name }))} label="Favorite Type" errorMessage={(touched.favoriteType && errors.favoriteType) || ""} className="w-full" />
            <Button type="submit" className="w-full py-3 mt-4 text-base" disabled={Object.keys(errors).length > 0}>
              Next Step
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TrainerDetails;
