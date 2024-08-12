import { Provider } from "react-redux";
import store from "./store/store";
import { useNavigate, useParams } from "react-router-dom";
import Main from "./components/main/main";

export default function JoinParty() {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    navigate("/");
  }

  return (
    <Provider store={store}>
      <Main partyId={id as string} />
    </Provider>
  );
}
