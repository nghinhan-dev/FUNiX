import { useAuth } from "../../context/AuthContext";
import classes from "./StartingPageContent.module.css";

export default function StartingPageContent() {
  const currentUser = useAuth();

  return (
    <section className={classes.starting}>
      <h1>Welcome {currentUser?.displayName}!</h1>
    </section>
  );
}
