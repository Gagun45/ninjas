import AllSuperpowersSection from "@/components/AllSuperpowersSection/AllSuperpowersSection";
import CreateSuperpowerForm from "@/forms/CreateSuperpowerForm/CreateSuperpowerForm";
import { Suspense } from "react";

const CreateSuperPowerPage = () => {
  return (
    <main>
      <h1>Create a superpower</h1>
      <CreateSuperpowerForm />
      <Suspense fallback={<div>Fetching all existing sueprpowers...</div>}>
        <AllSuperpowersSection />
      </Suspense>
    </main>
  );
};
export default CreateSuperPowerPage;
