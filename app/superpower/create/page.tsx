import AllSuperpowers from "@/components/AllSuperpowers/AllSuperpowers";
import CreateSuperpowerForm from "@/forms/CreateSuperpowerForm/CreateSuperpowerForm";

const CreateSuperPowerPage = () => {
  return (
    <section>
      <h1>Create a superpower</h1>
      <CreateSuperpowerForm />
      <AllSuperpowers />
    </section>
  );
};
export default CreateSuperPowerPage;
