import signOutUser from "../../core/firebase/FirebaseAuth";
import { setAuthenticated, setUser } from "../../core/state/AuthSlice";
import { RoutesMap } from "../../core/routes/Routes";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TabGroup } from "../../widgets/form/TabGroup";
export default function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signOut = () => {
    signOutUser();
    dispatch(setAuthenticated(false));
    dispatch(setUser(null));
    navigate(RoutesMap.SignUp);
  };

  const tabGroups = {
    tabHeaders: ["Tab 1", " Tab 2", "Tab 3"],
    tabs: null,
    activeTabId: "Tab 1",
  };

  return (
    <div>
      <h1>Home Page</h1>
      <TabGroup tabGroups={tabGroups} />
      <h2>
        <span onClick={signOut}>Logout</span>
      </h2>
    </div>
  );
}
