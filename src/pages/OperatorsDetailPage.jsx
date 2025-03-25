import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import instance from "../lib/axios";

const OperatorsDetailPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();

    const [operator, setOperator] = useState(state?.operator || null);

    useEffect(() => {
        if (!operator) {
            const fetchOperator = async () => {
                try {
                    const response = await instance.get(`/operators/${id}`);
                    setOperator(response.data);
                } catch (error) {
                    console.error("Lỗi khi tải dữ liệu operator:", error);
                }
            };
            fetchOperator();
        }
    }, [operator, id]);

    if (!operator) return <div>Đang tải...</div>;

    return (
        <div className="container p-6 mx-auto">
            <h1 className="mb-6 text-2xl font-bold">Chi tiết Operator</h1>
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    {/* Avatar */}
                    <div className="flex justify-center col-span-2">
                        <img
                            src={operator.avatar}
                            alt="Avatar"
                            className="w-32 h-32 border rounded-full"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {/* Họ và Tên */}
                    <div>
                        <label
                            htmlFor="fullName"
                            inputMode="text"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Họ và Tên
                        </label>
                        <p className="px-3 py-2 mt-1 bg-gray-100 border rounded-md">{`${operator.lastName} ${operator.firstName}`}</p>
                    </div>
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <p className="px-3 py-2 mt-1 bg-gray-100 border rounded-md">
                            {operator.email}
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {/* Email cá nhân */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email cá nhân
                        </label>
                        <p className="px-3 py-2 mt-1 bg-gray-100 border rounded-md">
                            {operator.personalEmail}
                        </p>
                    </div>
                    {/* Số điện thoại */}
                    <div>
                        <label
                            htmlFor="phoneNumber"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Số điện thoại
                        </label>
                        <p className="px-3 py-2 mt-1 bg-gray-100 border rounded-md">
                            {operator.phoneNumber}
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {/* Ngày sinh */}
                    <div>
                        <label
                            htmlFor="dateOfBirth"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Ngày sinh
                        </label>
                        <p className="px-3 py-2 mt-1 bg-gray-100 border rounded-md">
                            {operator.dateOfBirth}
                        </p>
                    </div>
                    {/* Giới tính */}
                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                            Giới tính
                        </label>
                        <p className="px-3 py-2 mt-1 bg-gray-100 border rounded-md">
                            {operator.gender === "male"
                                ? "Nam"
                                : operator.gender === "female"
                                  ? "Nữ"
                                  : "Khác"}
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {/* Trạng thái */}
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                            Trạng thái
                        </label>
                        <p className="px-3 py-2 mt-1 bg-gray-100 border rounded-md">
                            {operator.status === "active" ? "Hoạt động" : "Không hoạt động"}
                        </p>
                    </div>
                    {/* Role */}
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                            Mã vai trò
                        </label>
                        <p className="px-3 py-2 mt-1 bg-gray-100 border rounded-md">
                            {operator.roleCode}
                        </p>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={() => navigate("/main/operators")}
                        className="px-6 py-2 bg-gray-300 rounded-md"
                    >
                        Quay lại
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OperatorsDetailPage;
