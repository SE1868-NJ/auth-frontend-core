import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import instance from "../lib/axios";

const OperatorsDetailPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();

    const [operator, setOperator] = useState(state?.operator || null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedOperator, setUpdatedOperator] = useState({
        phoneNumber: "",
        personalEmail: "",
    });

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedOperator((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        try {
            const response = await instance.patch(
                `/operators/update/contact/${id}`,
                updatedOperator,
            );
            setOperator(response.data.operator);
            setIsEditing(false);
        } catch (error) {
            console.error("Lỗi khi cập nhật operator:", error);
        }
    };

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
                        <label
                            htmlFor="personalEmail"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email cá nhân
                        </label>
                        {isEditing ? (
                            <input
                                type="email"
                                name="personalEmail"
                                value={updatedOperator.personalEmail || operator.personalEmail}
                                onChange={handleChange}
                                className="px-3 py-2 mt-1 border rounded-md"
                            />
                        ) : (
                            <p className="px-3 py-2 mt-1 bg-gray-100 border rounded-md">
                                {operator.personalEmail}
                            </p>
                        )}
                    </div>
                    {/* Số điện thoại */}
                    <div>
                        <label
                            htmlFor="phoneNumber"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Số điện thoại
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="phoneNumber"
                                value={updatedOperator.phoneNumber || operator.phoneNumber}
                                onChange={handleChange}
                                className="px-3 py-2 mt-1 border rounded-md"
                            />
                        ) : (
                            <p className="px-3 py-2 mt-1 bg-gray-100 border rounded-md">
                                {operator.phoneNumber}
                            </p>
                        )}
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
                </div>
                <div className="flex justify-end space-x-2">
                    {isEditing ? (
                        <>
                            <button
                                type="button"
                                onClick={handleUpdate}
                                className="px-6 py-2 text-white bg-blue-600 rounded-md"
                            >
                                Lưu thay đổi
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="px-6 py-2 bg-gray-300 rounded-md"
                            >
                                Hủy
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            onClick={() => setIsEditing(true)}
                            className="px-6 py-2 bg-yellow-300 rounded-md"
                        >
                            Chỉnh sửa
                        </button>
                    )}
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
