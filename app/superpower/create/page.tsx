import AllSuperpowersSection from "@/components/AllSuperpowersSection/AllSuperpowersSection";
import CreateSuperpowerForm from "@/forms/CreateSuperpowerForm/CreateSuperpowerForm";

const CreateSuperPowerPage = () => {
  return (
    <main>
      <h1>Create a superpower</h1>
      <CreateSuperpowerForm />
      <AllSuperpowersSection />
    </main>
  );
};
export default CreateSuperPowerPage;
