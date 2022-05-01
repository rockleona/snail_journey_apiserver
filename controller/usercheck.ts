import { isMissing } from "./valuecheck.ts";
import { UserTable } from "./../dbconnector.ts";


const dateCheck = (first: boolean) =>{
    const time = new Date(Date.now());
    const datestring = time.toDateString();
}

const GetUserData = async (
    form: {
        username: string
    }
) => {
    let existData: any = await UserTable.where('username', form.username).get();
    if (existData.length == 0) {
        return false;
    } else {

        return existData[0].id
    }
}

const LoginCheck = async (
    form: {
        username: string,
        password: string
    }
) => {
    const existData: any = await UserTable.where('username', form.username).get();
    if (existData.length == 0) {
        return false;
    } else {
        if (existData[0].password === form.password) {
            return true;
        } else {
            return false;
        }
    }
}

export const LoginHandler = async ({
    request,
    response,
}: {
    request: any;
    response: any;
}) => {
    if (!request.hasBody) {
        response.body = { msg: "No request body", };
        response.status = 400;
    }

    const body = request.body();
    const value = await body.value;

    if (isMissing(value.username) || isMissing(value.password)) {
        response.body = { msg: "Request body error", };
        response.status = 400;
        return;
    } else {
        if (await LoginCheck(value)) {
            const user_id = await GetUserData({
                username: value.username,
            })
            response.body = { status: 1, msg: "Succeed", id: user_id };
        } else {
            response.body = { status: 0, msg: "Failed", };
        }
        response.status = 200;
        return;
    }
};

const RegisterCheck = async (
    form: {
        username: string,
        password: string,
        email: string,
        nickname: string,
        continue?: number,
        lastlogin?: string,
    }
) => {
    const existData = await UserTable.where('username', form.username).get();
    if (existData.length == 0) {
        let writer = form;
        writer.continue = 1;
        const time = new Date(Date.now());
        const datestring = time.toDateString();
        writer.lastlogin = datestring;

        await UserTable.create(form);
        console.log("Registered!");
        return true;
    } else {
        return false;
    }
}

export const RegisterHandler = async ({
    request,
    response,
}: {
    request: any;
    response: any;
}) => {
    if (!request.hasBody) {
        response.body = { msg: "No request body", };
        response.status = 400;
    }

    const body = request.body();
    const value = await body.value;

    if (isMissing(value.username) || isMissing(value.password) || isMissing(value.email) || isMissing(value.nickname)) {
        response.body = { msg: "Request body error", };
        response.status = 400;
        return;
    } else {
        if (await RegisterCheck(value)) {
            const user_id = await GetUserData({
                username: value.username,
            })
            response.body = { status: 1, msg: "Succeed Register!", id: user_id };
        } else {
            response.body = { status: 0, msg: "Failed Register!", };
        }
        response.status = 200;
        return;
    }
};