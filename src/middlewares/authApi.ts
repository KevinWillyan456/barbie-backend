import { Request, Response, NextFunction } from "express";

export const apiKeyMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const apiKey = req.headers.authorization;

    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(403).json({ message: "Acesso negado" });
    }

    next();
};
