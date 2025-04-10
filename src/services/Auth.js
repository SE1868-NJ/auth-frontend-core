import instance from "../lib/axios";

const AuthService = {
    async login(email, password) {
        const token = await instance
            .post("/auth/login/user", {
                email,
                password,
            })
            .then(({ data }) => {
                localStorage.setItem("token", data.token);
                return data;
            });
        return token;
    },
    async getSession() {
        const payload = instance.get("/auth/session").then(({ data }) => {
            return data;
        });
        return payload;
    },
    async register(data, date) {
        const { email, firstname, lastname, password, phone, gender } = data;
        const user = await instance
            .post("/auth/register", {
                email,
                firstname,
                lastname,
                password,
                phone,
                dob: date,
                gender,
            })
            .then(({ data }) => {
                return data;
            });
        return user;
    },
    async verifyOTP(email, otp) {
        await instance
            .post("/auth/verify-otp", {
                email,
                otp,
            })
            .then((res) => {
                console.log(res);
            });
    },
    async addOperator(data) {
        const {
            firstName,
            lastName,
            personalEmail,
            email,
            password,
            phoneNumber,
            dateOfBirth,
            gender,
            status,
            roleCode,
        } = data;
        console.log("Dữ liệu gửi lên API:", data);

        const operator = await instance
            .post("/operators/create", {
                firstName,
                lastName,
                personalEmail,
                email,
                password,
                phoneNumber,
                dateOfBirth,
                gender,
                status,
                roleCode,
            })
            .then(({ data }) => {
                return data;
            });
        return operator;
    },
};

export default AuthService;
