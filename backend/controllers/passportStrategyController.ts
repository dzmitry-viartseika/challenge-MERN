import {Request, Response} from "express";
import passportStrategyService from "../services/passportStrategyService";


// Контроллер (Controller): Часто, код, который обрабатывает успешную аутентификацию и перенаправление пользователя, может быть вынесен в контроллер. Ваш контроллер будет выполнять определенные действия после успешной аутентификации, такие как создание или обновление сессии пользователя, отправка ответа клиенту и перенаправление пользователя на домашнюю страницу.
class PassportStrategyController {
    GoogleAuth = async () => {
        console.log('GoogleAuth')
        try {
            const result = await passportStrategyService.GoogleAuth();
            console.log('result', result)
        } catch (e) {
            console.log('e', e)
        }
    }

    GoogleAuthCallback = async () => {
        console.log('GoogleAuthCallback')
        try {
            const result = await passportStrategyService.GoogleAuthCallback();
            console.log('result', result)
        } catch (e) {
            console.log('e', e)
        }
    }
};

export default new PassportStrategyController()