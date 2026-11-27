import { Suspense } from "react";
import FormulaireConnexion from "./FormulaireConnexion";

export const metadata = { title: "Connexion" };

export default function Connexion() {
  return (
    <main className="admin-centre">
      <div className="admin-carte">
        <p className="admin-surtitre">MAISON MÉDICALE ESSEGHEM</p>
        <h1>Espace d&apos;administration</h1>
        <p className="admin-aide">
          Entrez votre adresse e-mail : vous recevrez un code de connexion. Seules les personnes invitées peuvent entrer.
        </p>
        <Suspense>
          <FormulaireConnexion />
        </Suspense>
      </div>
    </main>
  );
}
