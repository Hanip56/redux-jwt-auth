import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutState, selectAuth } from "../app/features/auth/authSlice";
import { useLogoutMutation } from "../app/features/auth/authApiSlice";

const Home = () => {
  const { user } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const [logout, { isSuccess }] = useLogoutMutation();

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(logoutState());
    }
  }, [isSuccess]);

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold">User</h1>
        <p>
          Id : <span>{user?._id}</span>
        </p>
        <p>
          Username : <span>{user?.username}</span>
        </p>
        <p>
          Email : <span>{user?.email}</span>
        </p>
      </div>
      <button
        onClick={handleLogout}
        className="py-1 px-2 bg-redPin text-white font-bold hover:opacity-75"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
