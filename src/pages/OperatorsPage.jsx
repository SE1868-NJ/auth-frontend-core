import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import instance from "../lib/axios";
import AuthService from "../services/Auth";

const OperatorsPage = () => {
    const [operators, setOperators] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const translateStatus = (status) => {
        if (status === "active") return "Hoạt động";
        if (status === "pending") return "Đang duyệt";
        if (status === "inactive") return "Dừng hoạt động";
    };

    const [opened, { open, close }] = useDisclosure(false);

    useEffect(() => {
        const fetchOperators = async () => {
            try {
                const response = await instance.get("/operators/list");
                console.log("API Response List:", response.data);

                if (Array.isArray(response.data.data)) {
                    setOperators(response.data.data);
                } else {
                    setOperators([]);
                    console.error("Invalid data format:", response.data);
                }
            } catch (error) {
                console.error("Error fetching operators:", error);
            }
        };

        fetchOperators();
    }, []);

    const generateRandomString = (length) => {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await AuthService.addOperator(data);
            console.log("API Response:", response);
            setErrorMessage("");
        } catch (error) {
            console.error("Error adding operator:", error);
            setErrorMessage(error.message);
        }
    };

    const handleViewDetails = (operator) => {
        navigate(`/main/operators/${operator.operatorID}`, { state: { operator } });
    };

    const translateGender = (gender) => {
        return gender === "male" ? "Nam" : gender === "female" ? "Nữ" : "Khác";
    };

    return (
        <div className="container p-6 mx-auto space-y-8">
            <h1 className="text-2xl font-bold">Quản lý Operator</h1>
            <button
                type="button"
                className="px-3 py-2 text-xl font-bold bg-green-400 rounded"
                onClick={() => open()}
            >
                Add operator
            </button>
            <Modal opened={opened} onClose={close} title="Thêm Operator" centered size="lg">
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {/* Email */}
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                {...register("email", { required: "Email không được để trống" })}
                                placeholder="Nhập email"
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.email && (
                                <span className="text-sm text-red-500">{errors.email.message}</span>
                            )}
                        </div>
                        {/* Password (hidden) */}
                        <input type="hidden" {...register("password")} />

                        {/* Personal Email */}
                        <div className="flex flex-col">
                            <label
                                htmlFor="personalEmail"
                                className="text-sm font-semibold text-gray-700"
                            >
                                Email cá nhân <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="personalEmail"
                                {...register("personalEmail", {
                                    required: "Email cá nhân không được để trống",
                                })}
                                placeholder="Nhập email cá nhân"
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.personalEmail && (
                                <span className="text-sm text-red-500">
                                    {errors.personalEmail.message}
                                </span>
                            )}
                        </div>

                        {/* First Name */}
                        <div className="flex flex-col">
                            <label
                                htmlFor="firstName"
                                className="text-sm font-semibold text-gray-700"
                            >
                                Họ <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                {...register("firstName", { required: "Họ không được để trống" })}
                                placeholder="Nhập họ"
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.firstName && (
                                <span className="text-sm text-red-500">
                                    {errors.firstName.message}
                                </span>
                            )}
                        </div>

                        {/* Last Name */}
                        <div className="flex flex-col">
                            <label
                                htmlFor="lastName"
                                className="text-sm font-semibold text-gray-700"
                            >
                                Tên <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                {...register("lastName", { required: "Tên không được để trống" })}
                                placeholder="Nhập tên"
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.lastName && (
                                <span className="text-sm text-red-500">
                                    {errors.lastName.message}
                                </span>
                            )}
                        </div>

                        {/* Phone Number */}
                        <div className="flex flex-col">
                            <label
                                htmlFor="phoneNumber"
                                className="text-sm font-semibold text-gray-700"
                            >
                                Số điện thoại <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="phoneNumber"
                                {...register("phoneNumber", {
                                    required: "Số điện thoại không được để trống",
                                })}
                                placeholder="Nhập số điện thoại"
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.phoneNumber && (
                                <span className="text-sm text-red-500">
                                    {errors.phoneNumber.message}
                                </span>
                            )}
                        </div>

                        {/* Birthday */}
                        <div className="flex flex-col">
                            <label
                                htmlFor="dateOfBirth"
                                className="text-sm font-semibold text-gray-700"
                            >
                                Ngày sinh<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                id="dateOfBirth"
                                {...register("dateOfBirth", {
                                    required: "Ngày sinh không được để trống",
                                })}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        {/* Gender */}
                        <div className="flex flex-col">
                            <label htmlFor="gender" className="text-sm font-semibold text-gray-700">
                                Giới tính <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="gender"
                                {...register("gender", { required: "Vui lòng chọn giới tính" })}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                                <option value="other">Khác</option>
                            </select>
                            {errors.gender && (
                                <span className="text-sm text-red-500">
                                    {errors.gender.message}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Hidden Fields */}
                    <input type="hidden" {...register("status")} />

                    {errorMessage && (
                        <div className="mt-2 text-sm text-red-500">{errorMessage}</div>
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-2 text-white transition-all bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
                        >
                            Thêm Operator
                        </button>
                    </div>
                </form>
            </Modal>

            <table className="min-w-full border divide-y divide-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 text-center">ID</th>
                        <th className="p-2 text-center">Họ và tên</th>
                        <th className="p-2 text-center">Email</th>
                        <th className="p-2 text-center">SĐT</th>
                        <th className="p-2 text-center">Ngày sinh</th>
                        <th className="p-2 text-center">Giới tính</th>
                        <th className="p-2 text-center">Trạng thái</th>
                        <th className="p-2 text-center" />
                    </tr>
                </thead>
                <tbody>
                    {operators.length > 0 ? (
                        operators.map((operator, index) => (
                            <tr key={operator.operatorID} className="border-b">
                                <td className="p-2 text-center">{index + 1}</td>
                                <td className="p-2 text-center">
                                    {operator.lastName} {operator.firstName}
                                </td>
                                <td className="p-2 text-center">{operator.email}</td>
                                <td className="p-2 text-center">{operator.phoneNumber}</td>
                                <td className="p-2 text-center">{operator.dateOfBirth}</td>
                                <td className="p-2 text-center">
                                    {translateGender(operator.gender)}
                                </td>
                                <td className="p-2 text-center">
                                    <span
                                        className={`px-2 py-1 rounded-full ${operator.status === "active"
                                                ? "bg-green-100 text-green-800"
                                                : operator.status === "inactive"
                                                    ? "bg-red-100 text-red-800"
                                                    : "bg-yellow-100 text-yellow-800"
                                            }`}
                                    >
                                        {translateStatus(operator.status)}
                                    </span>
                                </td>
                                <td className="p-2 text-center">
                                    <button
                                        type="button"
                                        onClick={() => handleViewDetails(operator)}
                                        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                                    >
                                        Xem chi tiết
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="p-4 text-center">
                                No operators found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default OperatorsPage;
