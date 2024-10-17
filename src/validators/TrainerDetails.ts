import * as Yup from "yup";

export const trainerDetailsSchema = Yup.object({
  playerName: Yup.string().min(2, "Player name must be at least 2 characters").required("Player name is required"),
  teamName: Yup.string().min(2, "Team name must be at least 2 characters").required("Team name is required"),
  favoriteType: Yup.string().required("Favorite type is required"),
});
