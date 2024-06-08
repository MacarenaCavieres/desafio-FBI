import "dotenv/config";
import { agents } from "../data/agents.js";
import { generateToken, verifyToken } from "../utils/token.util.js";

const secretKey = process.env.SECRET_KEY;

const login = (req, res) => {
    const { email, password } = req.query;
    const agent = agents.find((a) => a.email === email && a.password === password);

    if (agent) {
        const token = generateToken(email, secretKey, "2m");

        res.send(`
        <h1>Bienvenido, ${email}</h1>
        <a href="/dashboard?token=${token}">Go to Dashboard</a>
        <script>
            sessionStorage.setItem('token', '${token}');
        </script>
        `);
    } else {
        res.status(401).send("Usuario o contraseña incorrecta");
    }
};

const dashboard = async (req, res) => {
    const { token } = req.query;
    try {
        const decoded = await verifyToken(token, secretKey);

        res.send(`
            Bienvenido al Dashboard ${decoded.data}
            <script>
            sessionStorage.setItem('email', "${decoded.data}")
            </script>
            `);
    } catch (error) {
        return res.status(401).send("Token inválido");
    }
};

export const agentMethod = {
    login,
    dashboard,
};
