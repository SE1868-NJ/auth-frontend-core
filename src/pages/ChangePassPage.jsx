import { Button, Input } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/Auth";
import { useUserStore } from "../stores/UserStore";

const ChangePassPage = () => {
  const { setToken } = useUserStore();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();

  //  if authenticated, navigate to dashboard
  // useEffect(() => {
  //     if (!isAuthenticated) navigate("/main");
  // }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    // destructuring
    const { password, newpassword, passwordconfirmation } = data;

    await AuthService.login(password, newpassword, passwordconfirmation)
      .then(({ token }) => {
        notifications.show({
          title: "Đổi mật khẩu thành công!",
        });
        navigate("/main");
        setToken(token);
      })
      .catch((err) => {
        console.error(err);
        notifications.show({
          color: "red",
          title: "Notification with custom styles",
          message: "It is red",
        });
      });
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full sm:w-5/6 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/4 bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">
          Change Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="my-8 text-sm">
          <div className="flex flex-col my-4">
            <label htmlFor="password" className="text-gray-700">
              Current Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Không được để trống mục này!",
              })}
              className="mt-2"
            />
            <p className="text-red-500 text-xs mt-1">
              {Boolean(errors?.password?.message) && errors?.password?.message}
            </p>
          </div>
          <div className="flex flex-col my-4">
            <label htmlFor="newpassword" className="text-gray-700">
              New Password
            </label>
            <Input
              id="newpassword"
              type="newpassword"
              placeholder="Enter your password"
              {...register("newpassword", {
                required: "Không được để trống mục này!",
              })}
              className="mt-2"
            />
            <p className="text-red-500 text-xs mt-1">
              {Boolean(errors?.newpassword?.message) &&
                errors?.newpassword?.message}
            </p>
          </div>
          <div className="flex flex-col my-4">
            <label htmlFor="passwordconfirmation" className="text-gray-700">
              Password Confirmation
            </label>
            <Input
              id="passwordconfirmation"
              type="passwordconfirmation"
              placeholder="Enter your password again"
              {...register("passwordconfirmation", {
                required: "Không được để trống mục này!",
              })}
              className="mt-2"
            />
            <p className="text-red-500 text-xs mt-1">
              {Boolean(errors?.passwordconfirmation?.message) &&
                errors?.passwordconfirmation?.message}
            </p>
          </div>
          <div className="my-4 flex items-center justify-end">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-2 text-white rounded-lg transition duration-150"
            >
              Change Password
            </Button>
          </div>
        </form>

        <div className="flex items-center justify-between my-4">
          <div className="w-full h-[1px] bg-gray-300" />
          <span className="text-sm uppercase mx-6 text-gray-400">Or</span>
          <div className="w-full h-[1px] bg-gray-300" />
        </div>

        <div className="text-sm">
          <a
            href="/"
            className="flex items-center justify-center space-x-2 text-gray-600 my-2 py-2 bg-gray-100 hover:bg-gray-200 rounded"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 326667 333333"
              shapeRendering="geometricPrecision"
              textRendering="geometricPrecision"
              imageRendering="optimizeQuality"
              fillRule="evenodd"
              clipRule="evenodd"
            >
              <title>Google logo</title>
              <path
                d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593m0 0z"
                fill="#4285f4"
              />
              <path
                d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z"
                fill="#34a853"
              />
              <path
                d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851m0 0z"
                fill="#fbbc04"
              />
              <path
                d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260m0 0z"
                fill="#ea4335"
              />
            </svg>
            <span>Sign in with Google</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ChangePassPage;
